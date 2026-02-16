/**
 * Belgium — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import { DateFormat, DATE_PATTERNS, ReferenceType } from '../../constants.js';

export const be: CountryMeta = {
    code: 'BE',
    name: 'Belgium',
    nativeName: 'België / Belgique',
    dateFormat: DateFormat.EU_DOT,
    datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
    personalIdName: 'Numéro de registre national',
    vatName: 'TVA / BTW',
    personalIdPattern: '^\\d{2}\\.\\d{2}\\.\\d{2}-\\d{3}\\.\\d{2}$',
    documentReferences: {
        identityCard: [
            {
                title: 'Belgium.be — Identity card',
                url: 'https://www.belgium.be/en/family/identity_card_and_passport',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        passport: [
            {
                title: 'Belgium.be — Passport',
                url: 'https://diplomatie.belgium.be/en/services/travel-document/passport',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        driversLicense: [
            {
                title: 'Belgium.be — Driving license',
                url: 'https://mobilit.belgium.be/en/road/driving-licence',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        residencePermit: [
            {
                title: 'Foreigners Office — Residence',
                url: 'https://dofi.ibz.be/en',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
    },
    identityCardLabels: {
        firstName: 'First name / Prénom / Voornaam',
        lastName: 'Last name / Nom / Achternaam',
        personalId: 'Personal ID number / Numéro de registre national',
        documentType: 'Document type / Type de document',
        documentNumber: 'Document number / Numéro du document',
        issueDate: 'Issue date / Date de délivrance',
        expirationDate: "Expiration date / Date d'expiration",
        issuingAuthority: 'Issuing authority / Autorité de délivrance',
        placeOfBirth: 'Place of birth / Lieu de naissance',
        dateOfBirth: 'Date of birth / Date de naissance',
        address: 'Residential address / Adresse',
        nationality: 'Nationality / Nationalité',
        sex: 'Sex / Sexe',
        mrz: 'Machine Readable Zone (MRZ)',
    },
};
