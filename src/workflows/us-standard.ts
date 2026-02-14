/**
 * Standard US document processing workflows.
 *
 * English-language prompts, US date formats (MM/DD/YYYY), and
 * US-specific extraction conventions.
 */
import type { WorkflowNode, WorkflowEdge, WorkflowDef } from '../types';
import { JobStatus } from '../types';

// ─── Shared AI Prompts ──────────────────────────────────────────────────────

const EXTRACTION_PROMPT = `You are a document processing system helping with legitimate data extraction for record keeping purposes. Extract all visible field values from this official document according to the provided JSON schema.

CRITICAL ACCURACY REQUIREMENTS:
- Transcribe ALL text EXACTLY as it appears on the document, character-by-character
- Do NOT modify, correct, or reformat any values
- Preserve exact capitalization, spacing, and punctuation
- For codes/IDs: copy every character precisely (numbers, letters, special characters)
- If a field is not visible or empty, use empty string "" (NOT null, NOT the word "null")
- Double-check each value before including it

CHARACTER CONFUSION PREVENTION (VERY IMPORTANT):
- Carefully distinguish between similar-looking characters
- Letter 'I' (uppercase i) vs Number '1' (one)
- Letter 'O' (uppercase o) vs Number '0' (zero)
- Letter 'T' vs Number '7'
- Letter 'S' vs Number '5'
- Letter 'B' vs Number '8'
- Letter 'Z' vs Number '2'
- Letter 'G' vs Number '6'
- For SSN: format as XXX-XX-XXXX with dashes
- For dates: use MM/DD/YYYY format unless the document shows otherwise

FREE-TEXT / SUMMARY FIELDS:
- Copy text VERBATIM from the document — do NOT paraphrase, summarize, or rephrase
- Keep the original punctuation, list format (dashes, semicolons), and paragraph structure
- Do NOT add information not explicitly present in the document
- Do NOT reorder content or change list bullet styles

VALUE NORMALIZATION:
- For dollar amounts: numbers only, no dollar sign or commas (e.g. 150000 not $150,000)
- For state abbreviations: use 2-letter form (CA, NY, TX)
- For addresses: copy as printed on the document

Return ONLY valid JSON matching the schema structure. This is an authorized document processing request.`;

const VERIFICATION_PROMPT = `You are a document verification system. You have been given:
1. A document (images/PDF)
2. A previous extraction attempt (JSON) from another AI

Your task:
- Cross-reference EVERY field in the previous extraction against the actual document
- Correct any errors: typos, OCR misreads, formatting inconsistencies, missing values
- Fill in any fields that were missed (use "" for genuinely absent fields)
- Apply the same extraction rules: character-by-character accuracy, no modification of original values, proper normalization

For each field, assign a confidence score (0.0 to 1.0):
- 1.0 = clearly legible, no ambiguity
- 0.7-0.9 = legible but minor ambiguity (e.g. similar-looking characters)
- 0.3-0.6 = partially legible or context-dependent
- 0.0-0.2 = guessed or not visible in document

Return a JSON object with:
- "data": the corrected extraction matching the schema
- "corrections": array of { field, original, corrected, reason } for each change made
- "confidence": object mapping field names to confidence scores (0.0-1.0)

Return ONLY valid JSON.`;

const IDENTIFICATION_PROMPT =
    "You are a document classification system. Analyze the document structure and content to identify its type. You MUST select one of the valid types from the provided schema. Classify this document.";

// ─── Node builders ──────────────────────────────────────────────────────────

function serviceNode(
    id: string, label: string,
    serviceName: string, methodName: string,
    args: Record<string, unknown>,
    x: number, y: number,
    opts?: { outputMapping?: unknown }
): WorkflowNode {
    return {
        id,
        type: 'serviceCall',
        position: { x, y },
        data: {
            nodeType: 'serviceCall',
            label,
            status: JobStatus.IDLE,
            config: {
                serviceName,
                methodName,
                arguments: args,
                ...(opts?.outputMapping !== undefined ? { outputMapping: opts.outputMapping } : {}),
            },
        },
    };
}

function ifElseNode(id: string, label: string, condition: string, x: number, y: number): WorkflowNode {
    return {
        id,
        type: 'ifElse',
        position: { x, y },
        data: { nodeType: 'ifElse', label, status: JobStatus.IDLE, config: { condition } },
    };
}

function aiNode(
    id: string, label: string,
    prompt: string, outputKey: string,
    x: number, y: number,
    opts?: {
        pages?: number | string;
        model?: string;
        thinkingLevel?: 'minimal' | 'low' | 'medium' | 'high';
        contextInput?: string;
        verificationMode?: boolean;
    }
): WorkflowNode {
    return {
        id,
        type: 'aiInteraction',
        position: { x, y },
        data: {
            nodeType: 'aiInteraction',
            label,
            status: JobStatus.IDLE,
            config: {
                aiConfig: {
                    provider: 'vertex',
                    model: opts?.model ?? 'gemini-3-flash-preview',
                    prompt,
                    input: 'context.docId',
                    inputType: 'pdf',
                    pages: opts?.pages ?? 'all',
                    jsonSchema: 'data.schema',
                    outputKey,
                    isJson: true,
                    thinkingLevel: opts?.thinkingLevel ?? 'low',
                    ...(opts?.contextInput && { contextInput: opts.contextInput }),
                    ...(opts?.verificationMode && { verificationMode: true }),
                },
            },
        },
    };
}

function validateNode(
    id: string, label: string,
    data1Key: string, data2Key: string, outputKey: string,
    x: number, y: number
): WorkflowNode {
    return {
        id,
        type: 'validateExtraction',
        position: { x, y },
        data: {
            nodeType: 'validateExtraction',
            label,
            status: JobStatus.IDLE,
            config: { data1Key, data2Key, outputKey },
        },
    };
}

function edge(id: string, source: string, target: string, sourceHandle?: string): WorkflowEdge {
    return {
        id,
        source,
        ...(sourceHandle ? { sourceHandle } : {}),
        target,
        type: 'default',
    };
}

// ─── Document Extraction Workflow ───────────────────────────────────────────

const extractionWorkflow: WorkflowDef = {
    id: 'wf-doc-extraction',
    name: 'Document Extraction',
    isDefault: true,
    enabled: true,
    priority: 2,
    nodes: [
        serviceNode('load-document', 'Load Document', 'documentService', 'getById',
            { id: 'context.docId' }, 300, 50, { outputMapping: { doc: 'doc' } }),

        ifElseNode('check-doctype', 'Has DocumentType?',
            'context.doc.docTypeId && context.doc.docTypeId !== null', 300, 200),

        serviceNode('notify-no-doctype', 'Notify: No DocType', 'notificationService', 'create', {
            notification: { title: 'Extraction Stopped', message: 'No DocumentType set for this document. Cannot extract data.', type: 'error' },
        }, 650, 200),

        serviceNode('load-schema', 'Load Extraction Schema', 'projectService', 'getExtractionSchema',
            { id: 'context.doc.docTypeId' }, 300, 350, { outputMapping: 'data.schema' }),

        aiNode('ai-extract', 'AI: Extract Data', EXTRACTION_PROMPT, 'data.data1', 300, 500, { thinkingLevel: 'low' }),
        aiNode('ai-verify', 'AI: Verify Extraction', VERIFICATION_PROMPT, 'data.data2', 300, 700, {
            thinkingLevel: 'medium',
            contextInput: 'data.data1',
            verificationMode: true,
        }),

        validateNode('validate-extraction', 'Validate & Score', 'data.data1', 'data.data2', 'data.extractedData', 300, 900),

        serviceNode('save-results', 'Save Results', 'documentService', 'update', {
            id: 'context.docId',
            updates: {
                extractedData: 'context.data.extractedData',
                doubleValidation: 'context.data.doubleValidation',
                extractionConflicts: 'context.data.extractionConflicts',
                confidenceScore: 'context.data.confidenceScore',
                fieldConfidence: 'context.data.fieldConfidence',
                error: 'context.data.error'
            },
        }, 300, 1100),

        serviceNode('notify-success', 'Notify Success', 'notificationService', 'create', {
            notification: {
                title: 'Document Processing Complete',
                message: 'Document "{{doc.name}}" has been successfully processed.',
                type: 'success',
                actionUrl: '/documents/{{docId}}',
            },
        }, 300, 1150),
    ],
    edges: [
        edge('e-load-doc-check', 'load-document', 'check-doctype'),
        edge('e-check-load-schema', 'check-doctype', 'load-schema', 'true'),
        edge('e-check-notify-no', 'check-doctype', 'notify-no-doctype', 'false'),
        edge('e-schema-extract', 'load-schema', 'ai-extract'),
        edge('e-extract-verify', 'ai-extract', 'ai-verify'),
        edge('e-verify-validate', 'ai-verify', 'validate-extraction'),
        edge('e-validate-save', 'validate-extraction', 'save-results'),
        edge('e-save-notify', 'save-results', 'notify-success'),
    ],
};

// ─── Document Identification Workflow ───────────────────────────────────────

const identificationWorkflow: WorkflowDef = {
    id: 'wf-doc-identification',
    name: 'Document Identification',
    isDefault: true,
    enabled: true,
    priority: 1,
    nodes: [
        serviceNode('get-document', 'Get Document', 'documentService', 'getById',
            { id: 'context.docId' }, 300, 50, { outputMapping: { doc: 'doc' } }),

        ifElseNode('check-has-doctype', 'Has DocumentType?',
            '!context.doc.docTypeId || context.doc.docTypeId === null', 300, 250),

        serviceNode('notify-already-exists', 'Notify: Already Exists', 'notificationService', 'create', {
            notification: { title: 'Document Processing Stopped', message: 'DocumentType already exists for this document.', type: 'warning' },
        }, 650, 250),

        serviceNode('get-doctypes', 'Get Type Names', 'projectService', 'getIdentificationJSONSchema',
            {}, 300, 650, { outputMapping: 'data.schema' }),

        aiNode('ai-identify-1', 'AI: Identify Type #1', IDENTIFICATION_PROMPT, 'data.type1', 100, 850, { pages: 1, thinkingLevel: 'minimal' }),
        aiNode('ai-identify-2', 'AI: Identify Type #2', IDENTIFICATION_PROMPT, 'data.type2', 500, 850, { pages: 1, thinkingLevel: 'minimal' }),

        validateNode('validate-type-match', 'Validate Type Match', 'data.type1.documentType', 'data.type2.documentType', 'data.identifiedType', 300, 1050),

        serviceNode('lookup-doctype', 'Lookup Document Type', 'projectService', 'getDocumentTypeByName',
            { name: '{{data.identifiedType}}' }, 300, 1250, { outputMapping: 'data.foundDocType' }),

        ifElseNode('check-type-exists', 'Type Exists?',
            '!!context.data.foundDocType && !!context.data.foundDocType.id', 300, 1450),

        serviceNode('notify-type-not-found', 'Notify: Type Not Found', 'notificationService', 'create', {
            notification: { title: 'Document Type Not Found', message: "Identified type '{{data.identifiedType}}' does not exist in the system.", type: 'warning' },
        }, 550, 1650),

        serviceNode('assign-doctype', 'Assign DocType', 'documentService', 'update', {
            id: 'context.docId',
            updates: { docTypeId: '{{data.foundDocType.id}}' },
        }, 50, 1650),
    ],
    edges: [
        edge('e-get-check', 'get-document', 'check-has-doctype'),
        edge('e-check-gettypes', 'check-has-doctype', 'get-doctypes', 'true'),
        edge('e-check-exists', 'check-has-doctype', 'notify-already-exists', 'false'),
        edge('e-gettypes-ai1', 'get-doctypes', 'ai-identify-1'),
        edge('e-ai1-ai2', 'ai-identify-1', 'ai-identify-2'),
        edge('e-ai2-validate', 'ai-identify-2', 'validate-type-match'),
        edge('e-validate-lookup', 'validate-type-match', 'lookup-doctype'),
        edge('e-lookup-check', 'lookup-doctype', 'check-type-exists'),
        edge('e-check-assign', 'check-type-exists', 'assign-doctype', 'true'),
        edge('e-check-notfound', 'check-type-exists', 'notify-type-not-found', 'false'),
    ],
};

// ─── Export ─────────────────────────────────────────────────────────────────

/** US extraction + identification workflows with English prompts and US conventions. */
export const usWorkflows: WorkflowDef[] = [extractionWorkflow, identificationWorkflow];
