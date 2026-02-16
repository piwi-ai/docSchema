/**
 * Romania — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import { DateFormat, DATE_PATTERNS, ReferenceType } from '../../constants.js';

export const ro: CountryMeta = {
    code: 'RO',
    name: 'Romania',
    nativeName: 'România',
    dateFormat: DateFormat.EU_DOT,
    datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
    personalIdName: 'CNP',
    vatName: 'CUI / CIF',
    personalIdPattern: '^\\d{13}$',
    documentReferences: {
        identityCard: [
            {
                title: 'DGEP — Carte de identitate',
                url: 'http://depabd.mai.gov.ro/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        passport: [
            {
                title: 'DGP — Pașapoarte',
                url: 'https://pasapoarte.mai.gov.ro/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        driversLicense: [
            {
                title: 'DGPCI — Permise',
                url: 'https://dgpci.mai.gov.ro/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        residencePermit: [
            {
                title: 'IGI — Permis de ședere',
                url: 'https://igi.mai.gov.ro/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
    },
    identityCardLabels: {
        firstName: 'First name / Prenume',
        lastName: 'Last name / Nume',
        personalId: 'Personal ID number / CNP',
        documentType: 'Document type / Tipul documentului',
        documentNumber: 'Document number / Numărul documentului',
        issueDate: 'Issue date / Data eliberării',
        expirationDate: 'Expiration date / Data expirării',
        issuingAuthority: 'Issuing authority / Emis de',
        placeOfBirth: 'Place of birth / Locul nașterii',
        dateOfBirth: 'Date of birth / Data nașterii',
        address: 'Residential address / Adresa',
        nationality: 'Nationality / Cetățenie',
        sex: 'Sex / Sex',
        mrz: 'Machine Readable Zone (MRZ)',
    },
};
