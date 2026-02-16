import { useEffect } from 'react';
import { verticals, getStats, type VerticalMeta } from '../data/configs';
import { countryList, getDocsByCountry, getDocLibraryStats } from '../data/documents';
import type { DocTypeDef } from '../data/configs';

/**
 * WebMCP integration — exposes DocSchema data as structured tools
 * so AI agents can discover and query schemas via navigator.modelContext.
 *
 * @see https://webmachinelearning.github.io/webmcp/
 */

declare global {
    interface Navigator {
        modelContext?: {
            registerTool: (tool: {
                name: string;
                description: string;
                parameters?: Record<string, unknown>;
                inputSchema?: Record<string, unknown>;
                annotations?: { readOnlyHint?: boolean };
                execute: (...args: unknown[]) => unknown;
            }) => void;
            provideContext?: (options: { tools: unknown[] }) => void;
        };
    }
}

/* ── Helper functions (exported for testing) ──────────────────── */

export function getVerticalData(slug: string): VerticalMeta | undefined {
    return verticals.find((v) => v.slug === slug);
}

export function listVerticals() {
    return verticals.map((v) => ({
        slug: v.slug,
        name: v.vertical,
        country: v.country,
        flag: v.flag,
        documentTypeCount: v.config.documentTypes.length,
        entityTypeCount: v.config.entityTypes.length,
    }));
}

export function getDocumentTypes(slug: string) {
    const v = getVerticalData(slug);
    if (!v) return { error: `Vertical "${slug}" not found` };
    return v.config.documentTypes.map((dt) => ({
        id: dt.id,
        name: dt.name,
        description: dt.description,
        isArrayExtraction: dt.isArrayExtraction || false,
        fieldCount: Object.keys(dt.jsonSchema.properties).length,
        requiredFields: dt.jsonSchema.required || [],
    }));
}

export function getDocumentSchema(slug: string, docTypeId: string) {
    const v = getVerticalData(slug);
    if (!v) return { error: `Vertical "${slug}" not found` };
    const dt = v.config.documentTypes.find((d) => d.id === docTypeId);
    if (!dt) return { error: `Document type "${docTypeId}" not found in "${slug}"` };
    return dt;
}

export function getEntityTypes(slug: string) {
    const v = getVerticalData(slug);
    if (!v) return { error: `Vertical "${slug}" not found` };
    return v.config.entityTypes;
}

export function getFullConfig(slug: string) {
    const v = getVerticalData(slug);
    if (!v) return { error: `Vertical "${slug}" not found` };
    return v.config;
}

export function listCountries() {
    return countryList.map((c) => ({
        code: c.code,
        name: c.name,
        flag: c.flag,
        documentCount: c.docCount,
    }));
}

export function getDocumentsByCountry(countryCode: string) {
    const docs = getDocsByCountry(countryCode);
    if (docs.length === 0) return { error: `No documents found for country code "${countryCode}"` };
    return docs.map((d) => ({
        id: d.id,
        name: d.name,
        description: d.description,
        fieldCount: Object.keys(d.jsonSchema.properties).length,
        requiredFields: d.jsonSchema.required || [],
    }));
}

export function searchDocuments(query: string) {
    const q = query.toLowerCase();
    const results: { countryCode: string; id: string; name: string; description: string }[] = [];

    for (const country of countryList) {
        const docs = getDocsByCountry(country.code);
        for (const doc of docs) {
            if (
                doc.name.toLowerCase().includes(q) ||
                doc.description.toLowerCase().includes(q) ||
                doc.id.toLowerCase().includes(q)
            ) {
                results.push({
                    countryCode: country.code,
                    id: doc.id,
                    name: doc.name,
                    description: doc.description,
                });
            }
        }
    }
    return results;
}

export function getDocumentDetail(countryCode: string, docId: string): DocTypeDef | { error: string } {
    const docs = getDocsByCountry(countryCode);
    const doc = docs.find((d) => d.id === docId);
    if (!doc) return { error: `Document "${docId}" not found for country "${countryCode}"` };
    return doc;
}

/* ── Component: registers tools with navigator.modelContext ───── */

export default function WebMCP() {
    useEffect(() => {
        const mc = navigator.modelContext;
        if (!mc) return;

        const readOnly = { readOnlyHint: true };

        // Tool 1: List all available verticals
        mc.registerTool({
            name: 'list_verticals',
            description:
                'List all DocSchema business verticals with their stats (document type count, entity type count, country, and slug identifier).',
            annotations: readOnly,
            execute: () => listVerticals(),
        });

        // Tool 2: Get overall stats
        mc.registerTool({
            name: 'get_stats',
            description:
                'Get aggregate statistics for the DocSchema standard: total verticals, document types, entity types, and defined fields.',
            annotations: readOnly,
            execute: () => getStats(),
        });

        // Tool 3: Get document types for a vertical
        mc.registerTool({
            name: 'get_document_types',
            description:
                'Get all document type definitions for a specific vertical. Returns id, name, description, field count, required fields, and whether it uses array extraction. Pass the vertical slug (e.g. "real-estate-it", "accountant-it").',
            parameters: {
                type: 'object',
                properties: {
                    slug: {
                        type: 'string',
                        description: 'Vertical slug identifier, e.g. "real-estate-it"',
                        enum: verticals.map((v) => v.slug),
                    },
                },
                required: ['slug'],
            },
            annotations: readOnly,
            execute: (args: unknown) => {
                const { slug } = args as { slug: string };
                return getDocumentTypes(slug);
            },
        });

        // Tool 4: Get full JSON Schema for a specific document type
        mc.registerTool({
            name: 'get_document_schema',
            description:
                'Get the complete JSON Schema for a specific document type within a vertical. Returns the full extraction schema with all field definitions, types, patterns, and validation rules. Pass the vertical slug and document type ID.',
            parameters: {
                type: 'object',
                properties: {
                    slug: {
                        type: 'string',
                        description: 'Vertical slug identifier',
                        enum: verticals.map((v) => v.slug),
                    },
                    docTypeId: {
                        type: 'string',
                        description: 'Document type ID, e.g. "doc-fattura"',
                    },
                },
                required: ['slug', 'docTypeId'],
            },
            annotations: readOnly,
            execute: (args: unknown) => {
                const { slug, docTypeId } = args as { slug: string; docTypeId: string };
                return getDocumentSchema(slug, docTypeId);
            },
        });

        // Tool 5: Get entity types for a vertical
        mc.registerTool({
            name: 'get_entity_types',
            description:
                'Get all entity type definitions for a vertical, including data sources (which documents feed into each entity), field mappings, match rules, and conditional requirements (IF-THEN logic). Pass the vertical slug.',
            parameters: {
                type: 'object',
                properties: {
                    slug: {
                        type: 'string',
                        description: 'Vertical slug identifier',
                        enum: verticals.map((v) => v.slug),
                    },
                },
                required: ['slug'],
            },
            annotations: readOnly,
            execute: (args: unknown) => {
                const { slug } = args as { slug: string };
                return getEntityTypes(slug);
            },
        });

        // Tool 6: Get full configuration JSON
        mc.registerTool({
            name: 'get_full_config',
            description:
                'Get the complete raw DocSchema configuration JSON for a vertical. Includes all document types, entity types, and conditional logic. Pass the vertical slug.',
            parameters: {
                type: 'object',
                properties: {
                    slug: {
                        type: 'string',
                        description: 'Vertical slug identifier',
                        enum: verticals.map((v) => v.slug),
                    },
                },
                required: ['slug'],
            },
            annotations: readOnly,
            execute: (args: unknown) => {
                const { slug } = args as { slug: string };
                return getFullConfig(slug);
            },
        });

        // Tool 7: List all countries in the document library
        mc.registerTool({
            name: 'list_countries',
            description:
                'List all countries in the DocSchema document library with their document counts. Returns country codes, names, flags, and total documents available per country.',
            annotations: readOnly,
            execute: () => listCountries(),
        });

        // Tool 8: Get documents by country
        mc.registerTool({
            name: 'get_documents_by_country',
            description:
                'Get all document type schemas for a specific country from the document library. Pass a 2-letter country code (e.g. "it" for Italy, "us" for USA, "de" for Germany). Returns id, name, description, field count, and required fields for each document.',
            parameters: {
                type: 'object',
                properties: {
                    countryCode: {
                        type: 'string',
                        description: 'ISO 3166-1 alpha-2 country code, e.g. "it", "us", "de"',
                    },
                },
                required: ['countryCode'],
            },
            annotations: readOnly,
            execute: (args: unknown) => {
                const { countryCode } = args as { countryCode: string };
                return getDocumentsByCountry(countryCode);
            },
        });

        // Tool 9: Search documents across all countries
        mc.registerTool({
            name: 'search_documents',
            description:
                'Search for document types across all countries in the DocSchema library by name, description, or ID. Returns matching documents with their country code. Pass a search query string.',
            parameters: {
                type: 'object',
                properties: {
                    query: {
                        type: 'string',
                        description: 'Search query to match against document name, description, or ID',
                    },
                },
                required: ['query'],
            },
            annotations: readOnly,
            execute: (args: unknown) => {
                const { query } = args as { query: string };
                return searchDocuments(query);
            },
        });

        // Tool 10: Get full document detail
        mc.registerTool({
            name: 'get_document_detail',
            description:
                'Get the complete JSON Schema for a specific document from the document library. Pass the country code and document ID. Returns the full schema with all field definitions, types, patterns, and validation constraints.',
            parameters: {
                type: 'object',
                properties: {
                    countryCode: {
                        type: 'string',
                        description: 'ISO 3166-1 alpha-2 country code, e.g. "it"',
                    },
                    docId: {
                        type: 'string',
                        description: 'Document type ID, e.g. "doc-fattura"',
                    },
                },
                required: ['countryCode', 'docId'],
            },
            annotations: readOnly,
            execute: (args: unknown) => {
                const { countryCode, docId } = args as { countryCode: string; docId: string };
                return getDocumentDetail(countryCode, docId);
            },
        });

        // Tool 11: Get document library stats
        mc.registerTool({
            name: 'get_doc_library_stats',
            description:
                'Get aggregate statistics for the DocSchema document library: total number of countries and total number of document schemas.',
            annotations: readOnly,
            execute: () => getDocLibraryStats(),
        });
    }, []);

    return null; // No UI — headless tool registration
}
