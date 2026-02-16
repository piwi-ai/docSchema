/**
 * Finland — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import { DateFormat, DATE_PATTERNS, ReferenceType } from '../../constants.js';

export const fi: CountryMeta = {
    code: 'FI',
    name: 'Finland',
    nativeName: 'Suomi',
    dateFormat: DateFormat.EU_DOT,
    datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
    personalIdName: 'Henkilötunnus (HETU)',
    vatName: 'ALV-numero',
    personalIdPattern: '^\\d{6}[-+A]\\d{3}[0-9A-Z]$',
    documentReferences: {
        identityCard: [
            {
                title: 'Poliisi — Identity card',
                url: 'https://poliisi.fi/en/identity-card',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        passport: [
            {
                title: 'Poliisi — Passport',
                url: 'https://poliisi.fi/en/passport',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        driversLicense: [
            {
                title: 'Traficom — Driving licence',
                url: 'https://www.traficom.fi/en/services/driving-licence',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        residencePermit: [
            {
                title: 'Migri — Residence permit',
                url: 'https://migri.fi/en/residence-permit',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
    },
    identityCardLabels: {
        firstName: 'First name / Etunimi',
        lastName: 'Last name / Sukunimi',
        personalId: 'Personal ID number / Henkilötunnus',
        documentType: 'Document type / Asiakirjatyyppi',
        documentNumber: 'Document number / Asiakirjan numero',
        issueDate: 'Issue date / Myöntämispäivä',
        expirationDate: 'Expiration date / Viimeinen voimassaolopäivä',
        issuingAuthority: 'Issuing authority / Myöntäjä',
        placeOfBirth: 'Place of birth / Syntymäpaikka',
        dateOfBirth: 'Date of birth / Syntymäaika',
        address: 'Residential address / Osoite',
        nationality: 'Nationality / Kansalaisuus',
        sex: 'Sex / Sukupuoli',
        mrz: 'Machine Readable Zone (MRZ)',
    },
};
