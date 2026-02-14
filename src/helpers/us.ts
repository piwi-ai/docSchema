/**
 * US-specific field helpers.
 *
 * Re-exports universal primitives so US verticals can import
 * everything from a single module, plus adds US-specific fields:
 * firstName, lastName, ssn, ein, dateUS (MM/DD/YYYY),
 * currency, address, parcelNumber.
 */
export { text, num, enumField, email, datePattern, objectSchema, arrayOfObjects } from './schema';

// ─── US Date ────────────────────────────────────────────────────────────────

/** Date field (US MM/DD/YYYY format) */
export const dateUS = (desc = 'Date in MM/DD/YYYY format') =>
    ({ type: 'string' as const, description: desc, pattern: '^\\\\d{2}/\\\\d{2}/\\\\d{4}$' });

// ─── US Person Fields ───────────────────────────────────────────────────────

/** First name field (US) */
export const firstName = (desc = 'First name (given name)') =>
    ({ type: 'string' as const, description: desc });

/** Last name field (US) */
export const lastName = (desc = 'Last name (surname / family name)') =>
    ({ type: 'string' as const, description: desc });

/** US Social Security Number */
export const ssn = () => ({
    type: 'string' as const,
    description: 'Social Security Number — 9 digits, format XXX-XX-XXXX (extract with dashes)',
    pattern: '^\\\\d{3}-\\\\d{2}-\\\\d{4}$',
});

/** Employer Identification Number (US) */
export const ein = (desc = 'Employer Identification Number (EIN) — format XX-XXXXXXX') =>
    ({ type: 'string' as const, description: desc });

// ─── US Financial & Address Fields ──────────────────────────────────────────

/** Currency field (US — numbers only, no dollar sign) */
export const currency = (desc: string) => ({
    type: 'number' as const,
    description: `${desc} (USD, numbers only, no dollar sign)`,
});

/** Full US address */
export const address = (desc = 'Full address: Street, City, State ZIP (e.g. 123 Main St, Springfield, IL 62704)') =>
    ({ type: 'string' as const, description: desc });

/** US Assessor Parcel Number */
export const parcelNumber = (desc = 'Assessor Parcel Number (APN) or Tax ID number') =>
    ({ type: 'string' as const, description: desc });
