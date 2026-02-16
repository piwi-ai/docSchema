/**
 * Italy — Shared Match Helpers for Entity Aggregation
 *
 * Reusable match-field sets and the `fm()` shorthand, shared across all
 * Italian verticals.  Import from this module instead of duplicating
 * match helpers in each vertical's entityTypes.ts.
 */
import type { MatchFieldConfig } from '../../types.js';
import { F } from './fields.js';

// ─── Match-field sets ───────────────────────────────────────────────────────

/** Match by codice fiscale + nome + cognome (person identity) */
export const cfMatch = (): MatchFieldConfig[] => [
    { field: F.CODICE_FISCALE, fuzzyThreshold: 0.2 },
    { field: F.NOME, fuzzyThreshold: 0 },
    { field: F.COGNOME, fuzzyThreshold: 0 },
];

/** Match by partita IVA + ragione sociale (business identity) */
export const pivaMatch = (): MatchFieldConfig[] => [
    { field: F.PARTITA_IVA, fuzzyThreshold: 0 },
    { field: F.RAGIONE_SOCIALE, fuzzyThreshold: 0.2 },
];

/** Match by anno (fiscal year) */
export const annoMatch = (): MatchFieldConfig[] => [{ field: F.ANNO, fuzzyThreshold: 0 }];

/** Match by targa (vehicle plate only — insurance) */
export const targaMatch = (): MatchFieldConfig[] => [{ field: F.TARGA, fuzzyThreshold: 0 }];

/** Match by targa + telaio (vehicle plate + chassis — car-dealership) */
export const targaTelaioMatch = (): MatchFieldConfig[] => [
    { field: F.TARGA, fuzzyThreshold: 0 },
    { field: F.TELAIO, fuzzyThreshold: 0 },
];

/** Match by numero polizza */
export const polizzaMatch = (): MatchFieldConfig[] => [
    { field: F.NUMERO_POLIZZA, fuzzyThreshold: 0 },
];

/** Match by numero sinistro */
export const sinistroMatch = (): MatchFieldConfig[] => [
    { field: F.NUMERO_SINISTRO, fuzzyThreshold: 0 },
];

/** Match by foglio + particella + subalterno (cadastral) */
export const catastoMatch = (): MatchFieldConfig[] => [
    { field: F.FOGLIO, fuzzyThreshold: 0 },
    { field: F.PARTICELLA, fuzzyThreshold: 0 },
    { field: F.SUBALTERNO, fuzzyThreshold: 0 },
];

// ─── Field-mapping shorthand ────────────────────────────────────────────────

/** Shorthand for creating a field mapping entry */
export const fm = (sourceField: string, targetField: string, matchFields?: MatchFieldConfig[]) => ({
    sourceField,
    targetField,
    ...(matchFields ? { matchFields } : {}),
});
