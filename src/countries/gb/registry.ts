/**
 * United Kingdom — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import { DateFormat, DATE_PATTERNS, ReferenceType } from '../../constants.js';

export const gb: CountryMeta = {
    code: 'GB',
    name: 'United Kingdom',
    nativeName: 'United Kingdom',
    dateFormat: DateFormat.EU_SLASH,
    datePattern: DATE_PATTERNS[DateFormat.EU_SLASH],
    personalIdName: 'National Insurance Number',
    vatName: 'VAT',
    personalIdPattern: '^[A-Z]{2}\\d{6}[A-D]$',
    documentReferences: {
        identityCard: [
            {
                title: 'GOV.UK — Identity documents',
                url: 'https://www.gov.uk/identity-checks-for-employers/accepted-documents',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        passport: [
            {
                title: 'GOV.UK — Passports',
                url: 'https://www.gov.uk/browse/abroad/passports',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        driversLicense: [
            {
                title: 'GOV.UK — Driving licences',
                url: 'https://www.gov.uk/browse/driving/driving-licences',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        residencePermit: [
            {
                title: 'GOV.UK — Biometric Residence Permit',
                url: 'https://www.gov.uk/biometric-residence-permits',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
    },
    identityCardLabels: {
        firstName: 'First name / Given name',
        lastName: 'Last name / Surname',
        personalId: 'Personal ID number / National Insurance Number',
        documentType: 'Document type',
        documentNumber: 'Document number',
        issueDate: 'Issue date',
        expirationDate: 'Expiration date',
        issuingAuthority: 'Issuing authority',
        placeOfBirth: 'Place of birth',
        dateOfBirth: 'Date of birth',
        address: 'Residential address',
        nationality: 'Nationality',
        sex: 'Sex',
        mrz: 'Machine Readable Zone (MRZ)',
    },
};
