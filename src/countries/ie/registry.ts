/**
 * Ireland — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import { DateFormat, DATE_PATTERNS, ReferenceType } from '../../constants.js';

export const ie: CountryMeta = {
    code: 'IE',
    name: 'Ireland',
    nativeName: 'Éire',
    dateFormat: DateFormat.EU_SLASH,
    datePattern: DATE_PATTERNS[DateFormat.EU_SLASH],
    personalIdName: 'PPS Number',
    vatName: 'VAT',
    personalIdPattern: '^\\d{7}[A-Z]{1,2}$',
    documentReferences: {
        identityCard: [
            {
                title: 'DFA — Passport Card',
                url: 'https://www.dfa.ie/passportcard/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        passport: [
            {
                title: 'DFA — Passports',
                url: 'https://www.dfa.ie/passports/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        driversLicense: [
            {
                title: 'NDLS — Driving Licence',
                url: 'https://www.ndls.ie/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        residencePermit: [
            {
                title: 'Immigration Service Delivery',
                url: 'https://www.irishimmigration.ie/registering-your-immigration-permission/how-to-register-your-immigration-permission/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
    },
    identityCardLabels: {
        firstName: 'First name / Céadainm',
        lastName: 'Last name / Sloinne',
        personalId: 'Personal ID number / PPS Number',
        documentType: 'Document type / Cineál cáipéise',
        documentNumber: 'Document number / Uimhir cáipéise',
        issueDate: 'Issue date / Dáta eisiúna',
        expirationDate: 'Expiration date / Dáta éaga',
        issuingAuthority: 'Issuing authority / Údarás eisiúna',
        placeOfBirth: 'Place of birth / Áit bhreithe',
        dateOfBirth: 'Date of birth / Dáta breithe',
        address: 'Residential address / Seoladh',
        nationality: 'Nationality / Náisiúntacht',
        sex: 'Sex / Gnéas',
        mrz: 'Machine Readable Zone (MRZ)',
    },
};
