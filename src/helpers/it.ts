/**
 * Italian-specific field helpers.
 *
 * Re-exports universal primitives so Italian verticals can import
 * everything from a single module, plus adds Italy-specific fields:
 * nome, cognome, codiceFiscale, partitaIva, date (DD.MM.YYYY),
 * statoCivile, targa, telaio.
 */
import { enumField as _enumField } from './schema.js';
export { text, num, enumField, email, datePattern, objectSchema, arrayOfObjects, ref } from './schema.js';

// Local alias for use within this module
const enumField = _enumField;

// ─── Italian Date ───────────────────────────────────────────────────────────

/** Date field (European DD.MM.YYYY — dots only, never slashes) */
export const date = (desc = 'Data in formato DD.MM.YYYY — ALWAYS use dots as separator (es. 15.01.2021), NEVER use slashes (15/01/2021 is WRONG)') =>
    ({ type: 'string' as const, description: desc, pattern: '^\\d{2}\\.\\d{2}\\.\\d{4}$' });

// ─── Italian Person Fields ──────────────────────────────────────────────────

/** Italian nome (first name) field — standardized description */
export const nome = () =>
    ({ type: 'string' as const, description: "Nome (first name). In Italia, l'ordine standard è: nome prima, cognome dopo (es. Mario Rossi)." });

/** Italian cognome (surname) field — standardized description */
export const cognome = () =>
    ({ type: 'string' as const, description: "Cognome (surname/family name). In Italia, l'ordine standard è: nome prima, cognome dopo (es. Mario Rossi)." });

/**
 * Codice Fiscale — 16 alphanumeric characters.
 * Structure: 3 letters (surname) + 3 letters (name) + 2 digits (year)
 * + 1 letter (month) + 2 digits (day/gender) + 4 chars (municipality) + 1 check letter.
 * Example: RSSMRA80A01H501U
 */
export const codiceFiscale = (desc = 'Codice Fiscale di 16 caratteri (extract without spaces - remove all spacing if present)') =>
    ({ type: 'string' as const, description: desc, pattern: '^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$' });

/** Italian Partita IVA field */
export const partitaIva = (desc = 'Partita IVA — 11 cifre numeriche') =>
    ({ type: 'string' as const, description: desc });

// ─── Italian Civil Status ───────────────────────────────────────────────────

/** Stato civile enum values */
export const STATO_CIVILE_VALUES = [
    'celibe', 'nubile', 'coniugato', 'coniugata',
    'vedovo', 'vedova', 'divorziato', 'divorziata',
    'separato', 'separata',
];

/** Stato civile field with enum constraint */
export const statoCivile = (desc = 'Stato civile') =>
    enumField(desc, STATO_CIVILE_VALUES);

// ─── Italian Vehicle Fields ─────────────────────────────────────────────────

/** Italian vehicle plate number */
export const targa = (desc = 'Numero di targa del veicolo (es. AB123CD)') =>
    ({ type: 'string' as const, description: desc });

/** Italian chassis / VIN number */
export const telaio = (desc = 'Numero di telaio / VIN (Vehicle Identification Number) — 17 caratteri alfanumerici') =>
    ({ type: 'string' as const, description: desc });
