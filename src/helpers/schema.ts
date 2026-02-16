/**
 * Universal JSON Schema DSL primitives.
 *
 * These helpers work for any country or business vertical — they wrap
 * raw JSON Schema constructs (`string`, `number`, `object`, `array`)
 * into concise builder functions.
 *
 * @example
 * ```typescript
 * import { text, num, objectSchema } from '../helpers/schema';
 *
 * const invoiceSchema = objectSchema({
 *     number: text('Invoice number'),
 *     amount: num('Total amount'),
 * }, ['number', 'amount']);
 * ```
 */

// ─── Field Primitives ───────────────────────────────────────────────────────

/** Simple text/string field */
export const text = (desc = '') => ({ type: 'string' as const, description: desc });

/** Number field */
export const num = (desc = '') => ({ type: 'number' as const, description: desc });

/** String field with enum constraint — includes null to avoid forcing the AI to pick a value */
export const enumField = (desc: string, values: string[]) => ({
    type: 'string' as const,
    description: desc,
    enum: [...values, null],
    nullable: true,
});

/** Email field */
export const email = (desc = '') => ({
    type: 'string' as const,
    format: 'email' as const,
    description: desc,
});

/** String with date pattern (generic — caller provides format description) */
export const datePattern = (desc: string) => ({
    type: 'string' as const,
    description: desc,
    pattern: '^\\d{2}[./]\\d{2}[./]\\d{4}$',
});

// ─── Structure Builders ─────────────────────────────────────────────────────

/** Build a JSON schema object (type: "object" wrapper) */
export function objectSchema(
    properties: Record<string, unknown>,
    required: string[],
): Record<string, unknown> {
    return { type: 'object', properties, required };
}

/** Build an array schema with object items */
export function arrayOfObjects(
    properties: Record<string, unknown>,
    required: string[],
    description?: string,
): Record<string, unknown> {
    return {
        type: 'array',
        ...(description ? { description } : {}),
        items: { type: 'object', properties, required },
    };
}

// ─── Reference Builder ──────────────────────────────────────────────────────

import type { DocumentReference } from '../types.js';

type RefType = NonNullable<DocumentReference['type']>;

/** Create a typed DocumentReference (preserves literal type inference) */
export const ref = (title: string, url: string, type?: RefType): DocumentReference =>
    type ? { title, url, type } : { title, url };
