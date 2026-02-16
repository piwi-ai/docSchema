/**
 * Croatia — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import { DateFormat, DATE_PATTERNS, ReferenceType } from '../../constants.js';

export const hr: CountryMeta = {
    code: 'HR',
    name: 'Croatia',
    nativeName: 'Hrvatska',
    dateFormat: DateFormat.EU_DOT,
    datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
    personalIdName: 'OIB',
    vatName: 'PDV',
    personalIdPattern: '^\\d{11}$',
    documentReferences: {
        identityCard: [
            {
                title: 'MUP — Osobna iskaznica',
                url: 'https://mup.gov.hr/osobna-iskaznica-eoi/328',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        passport: [
            {
                title: 'MUP — Putovnica',
                url: 'https://mup.gov.hr/putovnica/327',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        driversLicense: [
            {
                title: 'MUP — Vozačka dozvola',
                url: 'https://mup.gov.hr/vozacka-dozvola/329',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        residencePermit: [
            {
                title: 'MUP — Boravak',
                url: 'https://mup.gov.hr/boravak-160/160',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
    },
    identityCardLabels: {
        firstName: 'First name / Ime',
        lastName: 'Last name / Prezime',
        personalId: 'Personal ID number / OIB',
        documentType: 'Document type / Vrsta dokumenta',
        documentNumber: 'Document number / Broj dokumenta',
        issueDate: 'Issue date / Datum izdavanja',
        expirationDate: 'Expiration date / Vrijedi do',
        issuingAuthority: 'Issuing authority / Izdao',
        placeOfBirth: 'Place of birth / Mjesto rođenja',
        dateOfBirth: 'Date of birth / Datum rođenja',
        address: 'Residential address / Adresa',
        nationality: 'Nationality / Državljanstvo',
        sex: 'Sex / Spol',
        mrz: 'Machine Readable Zone (MRZ)',
    },
};
