/**
 * Latvia — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import { DateFormat, DATE_PATTERNS, ReferenceType } from '../../constants.js';

export const lv: CountryMeta = {
    code: 'LV',
    name: 'Latvia',
    nativeName: 'Latvija',
    dateFormat: DateFormat.EU_DOT,
    datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
    personalIdName: 'Personas kods',
    vatName: 'PVN reģistrācijas numurs',
    personalIdPattern: '^\\d{6}-?\\d{5}$',
    documentReferences: {
        identityCard: [
            {
                title: 'PMLP — eID Card',
                url: 'https://www.pmlp.gov.lv/en/identity-card-eid-card',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        passport: [
            {
                title: 'PMLP — Passport',
                url: 'https://www.pmlp.gov.lv/en/passport',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        driversLicense: [
            {
                title: 'CSDD',
                url: 'https://www.csdd.lv/en/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        residencePermit: [
            {
                title: 'PMLP — Residence Permit',
                url: 'https://www.pmlp.gov.lv/en/residence-permit',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
    },
    identityCardLabels: {
        firstName: 'First name / Vārds',
        lastName: 'Last name / Uzvārds',
        personalId: 'Personal ID number / Personas kods',
        documentType: 'Document type / Dokumenta veids',
        documentNumber: 'Document number / Dokumenta numurs',
        issueDate: 'Issue date / Izsniegšanas datums',
        expirationDate: 'Expiration date / Derīgs līdz',
        issuingAuthority: 'Issuing authority / Izsniedzējiestāde',
        placeOfBirth: 'Place of birth / Dzimšanas vieta',
        dateOfBirth: 'Date of birth / Dzimšanas datums',
        address: 'Residential address / Adrese',
        nationality: 'Nationality / Pilsonība',
        sex: 'Sex / Dzimums',
        mrz: 'Machine Readable Zone (MRZ)',
    },
};
