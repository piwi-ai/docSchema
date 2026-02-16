/**
 * Liechtenstein — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import { DateFormat, DATE_PATTERNS, ReferenceType } from '../../constants.js';

export const li: CountryMeta = {
    code: 'LI',
    name: 'Liechtenstein',
    nativeName: 'Liechtenstein',
    dateFormat: DateFormat.EU_DOT,
    datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
    personalIdName: 'PEID-Nr.',
    vatName: 'MWST-Nr.',
    personalIdPattern: '^756\\.\\d{4}\\.\\d{4}\\.\\d{2}$',
    documentReferences: {
        identityCard: [
            {
                title: 'LLV — Identitätskarte',
                url: 'https://www.llv.li/de/privatpersonen/reisen-und-verkehr/reisedokumente/identitaetskarte',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        passport: [
            {
                title: 'LLV — Reisepass',
                url: 'https://www.llv.li/de/privatpersonen/reisen-und-verkehr/reisedokumente/reisepass',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        driversLicense: [
            {
                title: 'LLV — Führerausweis',
                url: 'https://www.llv.li/de/privatpersonen/reisen-und-verkehr/fuehrerausweis',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        residencePermit: [
            {
                title: 'LLV — Ausländer',
                url: 'https://www.llv.li/de/privatpersonen/zuwanderung-und-aufenthalt',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
    },
    identityCardLabels: {
        firstName: 'First name / Vorname',
        lastName: 'Last name / Nachname',
        personalId: 'Personal ID number / PEID-Nr.',
        documentType: 'Document type / Dokumentart',
        documentNumber: 'Document number / Dokumentennummer',
        issueDate: 'Issue date / Ausstellungsdatum',
        expirationDate: 'Expiration date / Gültig bis',
        issuingAuthority: 'Issuing authority / Ausstellende Behörde',
        placeOfBirth: 'Place of birth / Geburtsort',
        dateOfBirth: 'Date of birth / Geburtsdatum',
        address: 'Residential address / Anschrift',
        nationality: 'Nationality / Staatsangehörigkeit',
        sex: 'Sex / Geschlecht',
        mrz: 'Machine Readable Zone (MRZ)',
    },
};
