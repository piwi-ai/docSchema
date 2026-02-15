/**
 * Netherlands specific field helpers.
 */
export { text, num, enumField, email, datePattern, objectSchema, arrayOfObjects, ref } from './schema.js';

// ─── Date ───────────────────────────────────────────────────────────────────

/** Date field (DD-MM-YYYY format) */
export const date = (desc = 'Date in DD-MM-YYYY format') =>
    ({ type: 'string' as const, description: desc, pattern: '^\\d{2}-\\d{2}-\\d{4}$' });

// ─── Person Fields ──────────────────────────────────────────────────────────

/** Given name (First name) */
export const firstName = (desc = 'First name') =>
    ({ type: 'string' as const, description: desc });

/** Family name (Surname) */
export const lastName = (desc = 'Last name') =>
    ({ type: 'string' as const, description: desc });

/** BSN (Burgerservicenummer) (National ID) */
export const personalId = (desc = 'BSN (Burgerservicenummer)') =>
    ({ type: 'string' as const, description: desc });

/** BTW (VAT Number) */
export const vat = (desc = 'BTW') =>
    ({ type: 'string' as const, description: desc });
