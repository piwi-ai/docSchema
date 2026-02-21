/**
 * US — Shared Match Helpers for Entity Aggregation
 *
 * Reusable match-field sets and the `fm()` shorthand, shared across all
 * US verticals.
 */
import type { MatchFieldConfig } from '../../types.js';
import { F } from './fields.js';

// ─── Match-field sets ───────────────────────────────────────────────────────

/** Match by firstName + lastName (person identity) */
export const nameMatch = (): MatchFieldConfig[] => [
    { field: F.FIRST_NAME, fuzzyThreshold: 0.2 },
    { field: F.LAST_NAME, fuzzyThreshold: 0.2 },
];

/** Match by propertyAddress (property identity) */
export const addressMatch = (): MatchFieldConfig[] => [
    { field: F.PROPERTY_ADDRESS, fuzzyThreshold: 0.3 },
];

/** Match by generic address (contact/business identity) */
export const contactAddressMatch = (): MatchFieldConfig[] => [
    { field: F.ADDRESS, fuzzyThreshold: 0.3 },
];

/** Match by parcelNumber (property identity — exact) */
export const parcelMatch = (): MatchFieldConfig[] => [
    { field: F.PARCEL_NUMBER, fuzzyThreshold: 0 },
];

/** Match by taxId/SSN/EIN (exact) */
export const taxIdMatch = (): MatchFieldConfig[] => [
    { field: F.TAX_ID, fuzzyThreshold: 0 },
];

/** Match by accountNumber (exact) */
export const accountMatch = (): MatchFieldConfig[] => [
    { field: F.ACCOUNT_NUMBER, fuzzyThreshold: 0 },
];

/** Match by poNumber (exact) */
export const poMatch = (): MatchFieldConfig[] => [
    { field: F.PO_NUMBER, fuzzyThreshold: 0 },
];

/** Match by invoiceNumber (exact) */
export const invoiceMatch = (): MatchFieldConfig[] => [
    { field: F.INVOICE_NUMBER, fuzzyThreshold: 0 },
];

/** Match by Bill of Lading Number (exact) */
export const bolMatch = (): MatchFieldConfig[] => [
    { field: 'bolNumber', fuzzyThreshold: 0 },
];

// ─── Field-mapping shorthand ────────────────────────────────────────────────

/** Shorthand for creating a field mapping entry */
export const fm = (sourceField: string, targetField: string, matchFields?: MatchFieldConfig[]) => ({
    sourceField,
    targetField,
    ...(matchFields ? { matchFields } : {}),
});
