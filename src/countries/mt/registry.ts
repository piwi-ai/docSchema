/**
 * Malta — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import { DateFormat, DATE_PATTERNS, ReferenceType } from '../../constants.js';

export const mt: CountryMeta = {
    code: 'MT',
    name: 'Malta',
    nativeName: 'Malta',
    dateFormat: DateFormat.EU_SLASH,
    datePattern: DATE_PATTERNS[DateFormat.EU_SLASH],
    personalIdName: 'ID Card Number',
    vatName: 'VAT',
    personalIdPattern: '^\\d{1,7}[A-Z]$',
    documentReferences: {
        identityCard: [
            {
                title: 'Identità Malta — ID Cards',
                url: 'https://identita.gov.mt/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        passport: [
            {
                title: 'Identità Malta — Passports',
                url: 'https://identita.gov.mt/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        driversLicense: [
            {
                title: 'Transport Malta',
                url: 'https://www.transport.gov.mt/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        residencePermit: [
            {
                title: 'Identità Malta — Expatriates',
                url: 'https://identita.gov.mt/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
    },
    identityCardLabels: {
        firstName: 'First name / Isem',
        lastName: 'Last name / Kunjom',
        personalId: 'Personal ID number / Numru tal-karta tal-identità',
        documentType: "Document type / Tip ta' dokument",
        documentNumber: 'Document number / Numru tad-dokument',
        issueDate: 'Issue date / Data tal-ħruġ',
        expirationDate: "Expiration date / Data ta' skadenza",
        issuingAuthority: 'Issuing authority / Awtorità li ħarġet',
        placeOfBirth: 'Place of birth / Post tat-twelid',
        dateOfBirth: 'Date of birth / Data tat-twelid',
        address: 'Residential address / Indirizz',
        nationality: 'Nationality / Nazzjonalità',
        sex: 'Sex / Sess',
        mrz: 'Machine Readable Zone (MRZ)',
    },
};
