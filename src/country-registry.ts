/**
 * Country Registry — EU/EEA Country Metadata.
 *
 * This is the public API for accessing country data. It re-exports
 * individual country metadata from `src/registry/` and aggregates
 * them into the `EU_COUNTRIES` map.
 *
 * To add a new country, create a file in `src/registry/<cc>.ts`
 * and add it to `src/registry/index.ts`, then import below.
 */
import { DateFormat } from './constants.js';
import type { DocumentReference } from './types.js';

import * as registry from './registry/index.js';

// ─── Types ──────────────────────────────────────────────────────────────────

/** Labels for identity card fields (localized per country) */
export interface IdentityCardLabels {
    firstName: string;
    lastName: string;
    personalId: string;
    documentType: string;
    documentNumber: string;
    issueDate: string;
    expirationDate: string;
    issuingAuthority: string;
    placeOfBirth: string;
    dateOfBirth: string;
    address: string;
    nationality: string;
    sex: string;
    mrz: string;
}

/** Official reference links for each standard document type */
export interface CountryDocumentReferences {
    identityCard: DocumentReference[];
    passport: DocumentReference[];
    driversLicense: DocumentReference[];
    residencePermit: DocumentReference[];
}

/** Per-country metadata */
export interface CountryMeta {
    /** ISO 3166-1 alpha-2 country code (uppercase) */
    code: string;
    /** English country name */
    name: string;
    /** Native-language country name */
    nativeName: string;
    /** Human-readable date format used on official documents */
    dateFormat: DateFormat;
    /** Regex pattern for the date format (JSON Schema compatible) */
    datePattern: string;
    /** Local name for the personal identification number */
    personalIdName: string;
    /** Regex pattern for the personal ID (JSON Schema compatible, optional) */
    personalIdPattern?: string;
    /** Local name for the VAT / tax identification number */
    vatName: string;
    /** Localized labels for identity card fields */
    identityCardLabels: IdentityCardLabels;
    /** Official reference links for standard document types */
    documentReferences: CountryDocumentReferences;
}

// ─── Registry ───────────────────────────────────────────────────────────────

/**
 * All EU/EEA countries, indexed by lowercase ISO 3166-1 alpha-2 code.
 *
 * Each country's metadata lives in its own file under `src/registry/`.
 */
export const EU_COUNTRIES: Record<string, CountryMeta> = {
    at: registry.at,
    be: registry.be,
    bg: registry.bg,
    ch: registry.ch,
    cy: registry.cy,
    cz: registry.cz,
    de: registry.de,
    dk: registry.dk,
    ee: registry.ee,
    es: registry.es,
    fi: registry.fi,
    fr: registry.fr,
    gb: registry.gb,
    gr: registry.gr,
    hr: registry.hr,
    hu: registry.hu,
    ie: registry.ie,
    is: registry.is,
    it: registry.it,
    li: registry.li,
    lt: registry.lt,
    lu: registry.lu,
    lv: registry.lv,
    mt: registry.mt,
    nl: registry.nl,
    no: registry.no,
    pl: registry.pl,
    pt: registry.pt,
    ro: registry.ro,
    se: registry.se,
    si: registry.si,
    sk: registry.sk,
};

/** All supported country codes */
export const ALL_COUNTRY_CODES = Object.keys(EU_COUNTRIES);

/** Get a single country's metadata by code, or throw if unknown */
export function getCountry(code: string): CountryMeta {
    const c = EU_COUNTRIES[code.toLowerCase()];
    if (!c) throw new Error(`Unknown country code: ${code}`);
    return c;
}
