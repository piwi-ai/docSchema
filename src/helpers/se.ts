/**
 * Sweden specific field helpers.
 */
export { text, num, enumField, email, datePattern, objectSchema, arrayOfObjects, ref } from './schema.js';

// ─── Date ───────────────────────────────────────────────────────────────────

/** Date field (YYYY-MM-DD format) */
export const date = (desc = 'Date in YYYY-MM-DD format') =>
    ({ type: 'string' as const, description: desc, pattern: '^\\d{4}-\\d{2}-\\d{2}$' });

// ─── Person Fields ──────────────────────────────────────────────────────────

/** Given name (First name) */
export const firstName = (desc = 'First name') =>
    ({ type: 'string' as const, description: desc });

/** Family name (Surname) */
export const lastName = (desc = 'Last name') =>
    ({ type: 'string' as const, description: desc });

/** Personnummer (National ID) */
export const personalId = (desc = 'Personnummer') =>
    ({ type: 'string' as const, description: desc });

/** Moms (VAT Number) */
export const vat = (desc = 'Moms') =>
    ({ type: 'string' as const, description: desc });
