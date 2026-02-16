/**
 * Germany — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import { DateFormat, DATE_PATTERNS, ReferenceType } from '../../constants.js';

export const de: CountryMeta = {
    code: 'DE',
    name: 'Germany',
    nativeName: 'Deutschland',
    dateFormat: DateFormat.EU_DOT,
    datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
    personalIdName: 'Steuer-ID / Ausweisnummer',
    vatName: 'USt-IdNr.',
    personalIdPattern: '^\\d{11}$',
    documentReferences: {
        identityCard: [
            {
                title: 'BMI — Personalausweis',
                url: 'https://www.personalausweisportal.de/Webs/PA/DE/buergerinnen-und-buerger/der-personalausweis/der-personalausweis-node.html',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        passport: [
            {
                title: 'BMI — Reisepass',
                url: 'https://www.bmi.bund.de/DE/themen/moderne-verwaltung/ausweise-und-paesse/reisepass/reisepass-node.html',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        driversLicense: [
            {
                title: 'BMDV — Führerschein',
                url: 'https://bmdv.bund.de/DE/Themen/Mobilitaet/Strassenverkehr/Fahrerlaubnis/fahrerlaubnis.html',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        residencePermit: [
            {
                title: 'BAMF — Aufenthaltstitel',
                url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Migrathek/Aufenthaltstitel/aufenthaltstitel-node.html',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
    },
    identityCardLabels: {
        firstName: 'First name / Vorname',
        lastName: 'Last name / Nachname',
        personalId: 'Personal ID number / Steuer-ID / Ausweisnummer',
        documentType: 'Document type / Dokumentart',
        documentNumber: 'Document number / Dokumentennummer',
        issueDate: 'Issue date / Ausstellungsdatum',
        expirationDate: 'Expiration date / Gültig bis',
        issuingAuthority: 'Issuing authority / Ausstellende Behörde',
        placeOfBirth: 'Place of birth / Geburtsort',
        dateOfBirth: 'Date of birth / Geburtsdatum',
        address: 'Residential address / Anschrift',
        nationality: 'Nationality / Staatsangehörigkeit',
        sex: 'Sex / Geschlecht',
        mrz: 'Machine Readable Zone (MRZ)',
    },
};
