/**
 * Estonia — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import { DateFormat, DATE_PATTERNS, ReferenceType } from '../../constants.js';

export const ee: CountryMeta = {
    code: 'EE',
    name: 'Estonia',
    nativeName: 'Eesti',
    dateFormat: DateFormat.EU_DOT,
    datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
    personalIdName: 'Isikukood',
    vatName: 'KMKR number',
    personalIdPattern: '^\\d{11}$',
    documentReferences: {
        identityCard: [
            {
                title: 'PBGB — ID Card',
                url: 'https://www.politsei.ee/en/instructions/applying-for-an-id-card-for-an-adult',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        passport: [
            {
                title: 'PBGB — Passport',
                url: 'https://www.politsei.ee/en/instructions/applying-for-a-passport-for-an-adult',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        driversLicense: [
            {
                title: 'Transport Administration',
                url: 'https://www.transpordiamet.ee/en',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        residencePermit: [
            {
                title: 'PBGB — Residence',
                url: 'https://www.politsei.ee/en/instructions/applying-for-a-residence-permit-for-a-third-country-national',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
    },
    identityCardLabels: {
        firstName: 'First name / Eesnimi',
        lastName: 'Last name / Perekonnanimi',
        personalId: 'Personal ID number / Isikukood',
        documentType: 'Document type / Dokumendi liik',
        documentNumber: 'Document number / Dokumendi number',
        issueDate: 'Issue date / Väljaandmise kuupäev',
        expirationDate: 'Expiration date / Kehtiv kuni',
        issuingAuthority: 'Issuing authority / Väljaandja',
        placeOfBirth: 'Place of birth / Sünnikoht',
        dateOfBirth: 'Date of birth / Sünniaeg',
        address: 'Residential address / Aadress',
        nationality: 'Nationality / Kodakondsus',
        sex: 'Sex / Sugu',
        mrz: 'Machine Readable Zone (MRZ)',
    },
};
