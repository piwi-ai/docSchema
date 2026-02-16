/**
 * Sweden — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import { DateFormat, DATE_PATTERNS, ReferenceType } from '../../constants.js';

export const se: CountryMeta = {
    code: 'SE',
    name: 'Sweden',
    nativeName: 'Sverige',
    dateFormat: DateFormat.ISO_8601,
    datePattern: DATE_PATTERNS[DateFormat.ISO_8601],
    personalIdName: 'Personnummer',
    vatName: 'Momsnummer',
    personalIdPattern: '^\\d{8}-?\\d{4}$',
    documentReferences: {
        identityCard: [
            {
                title: 'Polisen — Nationellt id-kort',
                url: 'https://polisen.se/tjanster-tillstand/pass-och-nationellt-id-kort/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        passport: [
            {
                title: 'Polisen — Pass',
                url: 'https://polisen.se/tjanster-tillstand/pass-och-nationellt-id-kort/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        driversLicense: [
            {
                title: 'Transportstyrelsen — Körkort',
                url: 'https://www.transportstyrelsen.se/sv/vagtrafik/Korkort/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        residencePermit: [
            {
                title: 'Migrationsverket',
                url: 'https://www.migrationsverket.se/English/Private-individuals.html',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
    },
    identityCardLabels: {
        firstName: 'First name / Förnamn',
        lastName: 'Last name / Efternamn',
        personalId: 'Personal ID number / Personnummer',
        documentType: 'Document type / Dokumenttyp',
        documentNumber: 'Document number / Dokumentnummer',
        issueDate: 'Issue date / Utfärdandedatum',
        expirationDate: 'Expiration date / Giltighetstid',
        issuingAuthority: 'Issuing authority / Utfärdande myndighet',
        placeOfBirth: 'Place of birth / Födelseort',
        dateOfBirth: 'Date of birth / Födelsedatum',
        address: 'Residential address / Adress',
        nationality: 'Nationality / Medborgarskap',
        sex: 'Sex / Kön',
        mrz: 'Machine Readable Zone (MRZ)',
    },
};
