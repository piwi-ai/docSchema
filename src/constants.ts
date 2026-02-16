/**
 * Shared constants and enums for the DocSchema standard.
 *
 * Uses ISO standards where applicable:
 * - Date formats: ISO 8601 and common European conventions
 * - Sex/Gender:   ICAO 9303 (Machine Readable Travel Documents)
 * - Country codes: ISO 3166-1 alpha-2
 */

// ─── Date Formats ───────────────────────────────────────────────────────────

/**
 * Standard date format patterns used across European documents.
 *
 * ISO 8601 defines YYYY-MM-DD as the international standard.
 * Most EU countries use day-first ordering with varying separators.
 */
export enum DateFormat {
    /** ISO 8601 — Sweden, Lithuania */
    ISO_8601 = 'YYYY-MM-DD',
    /** Day.Month.Year — Germany, Austria, Switzerland, Italy, Poland, etc. */
    EU_DOT = 'DD.MM.YYYY',
    /** Day/Month/Year — France, Spain, UK, Ireland, Greece, etc. */
    EU_SLASH = 'DD/MM/YYYY',
    /** Day-Month-Year — Netherlands */
    EU_DASH = 'DD-MM-YYYY',
    /** Year.Month.Day — Hungary */
    YEAR_DOT = 'YYYY.MM.DD',
}

/**
 * Regex patterns corresponding to each DateFormat.
 *
 * Used in JSON Schema `pattern` fields for validation.
 * Each pattern is a string suitable for `new RegExp()`.
 */
export const DATE_PATTERNS: Record<DateFormat, string> = {
    [DateFormat.ISO_8601]: '^\\d{4}-\\d{2}-\\d{2}$',
    [DateFormat.EU_DOT]: '^\\d{2}\\.\\d{2}\\.\\d{4}$',
    [DateFormat.EU_SLASH]: '^\\d{2}/\\d{2}/\\d{4}$',
    [DateFormat.EU_DASH]: '^\\d{2}-\\d{2}-\\d{4}$',
    [DateFormat.YEAR_DOT]: '^\\d{4}\\.\\d{2}\\.\\d{2}$',
};

// ─── Sex / Gender (ICAO 9303) ───────────────────────────────────────────────

/**
 * ICAO 9303 sex codes used on Machine Readable Travel Documents.
 *
 * @see https://www.icao.int/publications/pages/publication.aspx?docnum=9303
 */
export enum Sex {
    MALE = 'M',
    FEMALE = 'F',
    /** Unspecified / Non-binary (ICAO "X") */
    OTHER = 'X',
}

/** All sex values as an array — for use in enumField() */
export const SEX_VALUES = Object.values(Sex);

// ─── Document Type IDs ──────────────────────────────────────────────────────

/**
 * Standard document type identifiers for cross-country schemas.
 *
 * Using constants prevents typos when referencing doc types
 * across countries, verticals, and configurations.
 */
export enum DocTypeId {
    IDENTITY_CARD = 'doc-identity-card',
    PASSPORT = 'doc-passport',
    DRIVERS_LICENSE = 'doc-drivers-license',
    RESIDENCE_PERMIT = 'doc-residence-permit',
}

// ─── Reference Types ────────────────────────────────────────────────────────

/**
 * Types of official reference links for documents.
 */
export enum ReferenceType {
    DOCUMENTATION = 'documentation',
    SCHEMA = 'schema',
    REGULATION = 'regulation',
    SPECIFICATION = 'specification',
}

// ─── Field Names ────────────────────────────────────────────────────────────

/**
 * Standard field names used in identity document schemas.
 */
export enum IdentityField {
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    PERSONAL_ID = 'personalId',
    DOCUMENT_TYPE = 'documentType',
    DOCUMENT_NUMBER = 'documentNumber',
    ISSUE_DATE = 'issueDate',
    EXPIRATION_DATE = 'expirationDate',
    ISSUING_AUTHORITY = 'issuingAuthority',
    PLACE_OF_BIRTH = 'placeOfBirth',
    DATE_OF_BIRTH = 'dateOfBirth',
    ADDRESS = 'address',
    NATIONALITY = 'nationality',
    SEX = 'sex',
    MRZ = 'mrz',
}

export const IDENTITY_REQUIRED_FIELDS = [
    IdentityField.FIRST_NAME,
    IdentityField.LAST_NAME,
    IdentityField.PERSONAL_ID,
    IdentityField.DOCUMENT_TYPE,
    IdentityField.DOCUMENT_NUMBER,
    IdentityField.ISSUE_DATE,
    IdentityField.EXPIRATION_DATE,
] as const;

/**
 * Standard field names for passport schemas.
 */
export enum PassportField {
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    PASSPORT_NUMBER = 'passportNumber',
    NATIONALITY = 'nationality',
    DATE_OF_BIRTH = 'dateOfBirth',
    PLACE_OF_BIRTH = 'placeOfBirth',
    SEX = 'sex',
    ISSUE_DATE = 'issueDate',
    EXPIRATION_DATE = 'expirationDate',
    ISSUING_AUTHORITY = 'issuingAuthority',
    ISSUING_COUNTRY = 'issuingCountry',
    MRZ = 'mrz',
}

export const PASSPORT_REQUIRED_FIELDS = [
    PassportField.FIRST_NAME,
    PassportField.LAST_NAME,
    PassportField.PASSPORT_NUMBER,
    PassportField.NATIONALITY,
    PassportField.DATE_OF_BIRTH,
    PassportField.SEX,
    PassportField.ISSUE_DATE,
    PassportField.EXPIRATION_DATE,
] as const;

/**
 * Standard field names for driver's license schemas.
 */
export enum DriversLicenseField {
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    LICENSE_NUMBER = 'licenseNumber',
    CATEGORIES = 'categories',
    DATE_OF_BIRTH = 'dateOfBirth',
    PLACE_OF_BIRTH = 'placeOfBirth',
    ISSUE_DATE = 'issueDate',
    EXPIRATION_DATE = 'expirationDate',
    ISSUING_AUTHORITY = 'issuingAuthority',
    ADDRESS = 'address',
    NATIONALITY = 'nationality',
    SEX = 'sex',
}

export const DRIVERS_LICENSE_REQUIRED_FIELDS = [
    DriversLicenseField.FIRST_NAME,
    DriversLicenseField.LAST_NAME,
    DriversLicenseField.LICENSE_NUMBER,
    DriversLicenseField.CATEGORIES,
    DriversLicenseField.ISSUE_DATE,
    DriversLicenseField.EXPIRATION_DATE,
] as const;

/** EU driving license categories per Directive 2006/126/EC */
export const EU_LICENSE_CATEGORIES = [
    'AM',
    'A1',
    'A2',
    'A',
    'B1',
    'B',
    'BE',
    'C1',
    'C1E',
    'C',
    'CE',
    'D1',
    'D1E',
    'D',
    'DE',
];

/**
 * Standard field names for residence permit schemas.
 */
export enum ResidencePermitField {
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    PERMIT_NUMBER = 'permitNumber',
    PERMIT_TYPE = 'permitType',
    NATIONALITY = 'nationality',
    DATE_OF_BIRTH = 'dateOfBirth',
    PLACE_OF_BIRTH = 'placeOfBirth',
    SEX = 'sex',
    ISSUE_DATE = 'issueDate',
    EXPIRATION_DATE = 'expirationDate',
    ISSUING_AUTHORITY = 'issuingAuthority',
    ADDRESS = 'address',
    REMARKS = 'remarks',
    MRZ = 'mrz',
}

export const RESIDENCE_PERMIT_REQUIRED_FIELDS = [
    ResidencePermitField.FIRST_NAME,
    ResidencePermitField.LAST_NAME,
    ResidencePermitField.PERMIT_NUMBER,
    ResidencePermitField.PERMIT_TYPE,
    ResidencePermitField.NATIONALITY,
    ResidencePermitField.ISSUE_DATE,
    ResidencePermitField.EXPIRATION_DATE,
] as const;

/** Common EU residence permit types */
export const EU_PERMIT_TYPES = ['Temporary', 'Permanent', 'Long-term', 'Student', 'Work', 'Family'];
