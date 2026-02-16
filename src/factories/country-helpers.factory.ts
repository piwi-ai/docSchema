/**
 * Country Helpers Factory.
 *
 * Generates per-country schema helper functions (date, firstName, lastName,
 * personalId, vat) from the country registry metadata, eliminating 31
 * near-identical helper files.
 */
import type { CountryMeta } from '../country-registry.js';
import {
    text,
    num,
    enumField,
    email,
    datePattern,
    objectSchema,
    arrayOfObjects,
    ref,
} from '../helpers/schema.js';

/**
 * Create country-specific field helpers.
 *
 * The universal primitives (text, num, enumField, etc.) are re-exported
 * as-is from schema.js. Country-specific helpers (date, firstName,
 * lastName, personalId, vat) are parameterised from the registry metadata.
 */
export function createCountryHelpers(meta: CountryMeta) {
    return {
        // Universal (re-exported)
        text,
        num,
        enumField,
        email,
        datePattern,
        objectSchema,
        arrayOfObjects,
        ref,

        // Country-specific
        date: (desc?: string) => ({
            type: 'string' as const,
            description: desc ?? `Date in ${meta.dateFormat} format`,
            pattern: meta.datePattern,
        }),

        firstName: (desc?: string) => ({
            type: 'string' as const,
            description: desc ?? 'First name',
        }),

        lastName: (desc?: string) => ({
            type: 'string' as const,
            description: desc ?? 'Last name',
        }),

        personalId: (desc?: string) => ({
            type: 'string' as const,
            description: desc ?? meta.personalIdName,
            ...(meta.personalIdPattern ? { pattern: meta.personalIdPattern } : {}),
        }),

        vat: (desc?: string) => ({
            type: 'string' as const,
            description: desc ?? meta.vatName,
        }),
    };
}
