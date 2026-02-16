/**
 * France — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import { DateFormat, DATE_PATTERNS, ReferenceType } from '../../constants.js';

export const fr: CountryMeta = {
    code: 'FR',
    name: 'France',
    nativeName: 'France',
    dateFormat: DateFormat.EU_SLASH,
    datePattern: DATE_PATTERNS[DateFormat.EU_SLASH],
    personalIdName: 'Numéro de sécurité sociale (NIR)',
    vatName: 'TVA',
    personalIdPattern: '^[12]\\d{12}\\d{2}$',
    documentReferences: {
        identityCard: [
            {
                title: "Service-Public.fr — Carte d'identité",
                url: 'https://www.service-public.fr/particuliers/vosdroits/N358',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        passport: [
            {
                title: 'Service-Public.fr — Passeport',
                url: 'https://www.service-public.fr/particuliers/vosdroits/N360',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        driversLicense: [
            {
                title: 'Service-Public.fr — Permis de conduire',
                url: 'https://www.service-public.fr/particuliers/vosdroits/N530',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        residencePermit: [
            {
                title: 'Service-Public.fr — Titre de séjour',
                url: 'https://www.service-public.fr/particuliers/vosdroits/N110',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
    },
    identityCardLabels: {
        firstName: 'First name / Prénom',
        lastName: 'Last name / Nom',
        personalId: 'Personal ID number / Numéro de sécurité sociale (NIR)',
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
