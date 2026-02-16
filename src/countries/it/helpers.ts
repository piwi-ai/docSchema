/**
 * Italian-specific field helpers.
 *
 * Uses the standard country-helpers factory for common fields,
 * plus adds Italy-specific fields: nome, cognome, codiceFiscale,
 * partitaIva, statoCivile, targa, telaio.
 */
import { EU_COUNTRIES } from '../../country-registry.js';
import { createCountryHelpers } from '../../factories/country-helpers.factory.js';
import { enumField as _enumField } from '../../helpers/schema.js';

const helpers = createCountryHelpers(EU_COUNTRIES['it']);

// ─── Standard (factory-generated) ───────────────────────────────────────────
export const { text, num, enumField, email, datePattern, objectSchema, arrayOfObjects, ref } = helpers;
export const { date, firstName, lastName, personalId, vat } = helpers;

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
    personalId(desc);

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
    _enumField(desc, STATO_CIVILE_VALUES);

// ─── Italian Vehicle Fields ─────────────────────────────────────────────────

/** Italian vehicle plate number */
export const targa = (desc = 'Numero di targa del veicolo (es. AB123CD)') =>
    ({ type: 'string' as const, description: desc });

/** Italian chassis / VIN number */
export const telaio = (desc = 'Numero di telaio / VIN (Vehicle Identification Number) — 17 caratteri alfanumerici') =>
    ({ type: 'string' as const, description: desc });
