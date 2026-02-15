import { useEffect } from 'react';
import { verticals, getStats, type VerticalMeta } from '../data/configs';

/**
 * WebMCP integration — exposes DocSchema data as structured tools
 * so AI agents can discover and query schemas via navigator.modelContext.
 *
 * @see https://anthropic.github.io/anthropic-tools/web-mcp/spec.html
 */

declare global {
    interface Navigator {
        modelContext?: {
            registerTool: (tool: {
                name: string;
                description: string;
                parameters?: Record<string, unknown>;
                execute: (...args: unknown[]) => unknown;
            }) => void;
            provideContext?: (options: { tools: unknown[] }) => void;
        };
    }
}

function getVerticalData(slug: string): VerticalMeta | undefined {
    return verticals.find(v => v.slug === slug);
}

export default function WebMCP() {
    useEffect(() => {
        const mc = navigator.modelContext;
        if (!mc) return;

        // Tool 1: List all available verticals
        mc.registerTool({
            name: 'list_verticals',
            description:
                'List all DocSchema business verticals with their stats (document type count, entity type count, country, and slug identifier).',
            execute: () => {
                return verticals.map(v => ({
                    slug: v.slug,
                    name: v.vertical,
                    country: v.country,
                    flag: v.flag,
                    documentTypeCount: v.config.documentTypes.length,
                    entityTypeCount: v.config.entityTypes.length,
                }));
            },
        });

        // Tool 2: Get overall stats
        mc.registerTool({
            name: 'get_stats',
            description:
                'Get aggregate statistics for the DocSchema standard: total verticals, document types, entity types, and defined fields.',
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
                        enum: verticals.map(v => v.slug),
                    },
                },
                required: ['slug'],
            },
            execute: (args: unknown) => {
                const { slug } = args as { slug: string };
                const v = getVerticalData(slug);
                if (!v) return { error: `Vertical "${slug}" not found` };
                return v.config.documentTypes.map(dt => ({
                    id: dt.id,
                    name: dt.name,
                    description: dt.description,
                    isArrayExtraction: dt.isArrayExtraction || false,
                    fieldCount: Object.keys(dt.jsonSchema.properties).length,
                    requiredFields: dt.jsonSchema.required || [],
                }));
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
                        enum: verticals.map(v => v.slug),
                    },
                    docTypeId: {
                        type: 'string',
                        description: 'Document type ID, e.g. "doc-fattura"',
                    },
                },
                required: ['slug', 'docTypeId'],
            },
            execute: (args: unknown) => {
                const { slug, docTypeId } = args as { slug: string; docTypeId: string };
                const v = getVerticalData(slug);
                if (!v) return { error: `Vertical "${slug}" not found` };
                const dt = v.config.documentTypes.find(d => d.id === docTypeId);
                if (!dt) return { error: `Document type "${docTypeId}" not found in "${slug}"` };
                return dt;
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
                        enum: verticals.map(v => v.slug),
                    },
                },
                required: ['slug'],
            },
            execute: (args: unknown) => {
                const { slug } = args as { slug: string };
                const v = getVerticalData(slug);
                if (!v) return { error: `Vertical "${slug}" not found` };
                return v.config.entityTypes;
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
                        enum: verticals.map(v => v.slug),
                    },
                },
                required: ['slug'],
            },
            execute: (args: unknown) => {
                const { slug } = args as { slug: string };
                const v = getVerticalData(slug);
                if (!v) return { error: `Vertical "${slug}" not found` };
                return v.config;
            },
        });

    }, []);

    return null; // No UI — headless tool registration
}
