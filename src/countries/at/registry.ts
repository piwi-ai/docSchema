/**
 * Austria — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import { DateFormat, DATE_PATTERNS, ReferenceType } from '../../constants.js';

export const at: CountryMeta = {
    code: 'AT',
    name: 'Austria',
    nativeName: 'Österreich',
    dateFormat: DateFormat.EU_DOT,
    datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
    personalIdName: 'Sozialversicherungsnummer',
    vatName: 'UID-Nummer',
    personalIdPattern: '^\\d{4}\\d{6}$',
    documentReferences: {
        identityCard: [
            {
                title: 'Oesterreich.gv.at — Personalausweis',
                url: 'https://www.oesterreich.gv.at/themen/dokumente_und_recht/personalausweis.html',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        passport: [
            {
                title: 'Oesterreich.gv.at — Reisepass',
                url: 'https://www.oesterreich.gv.at/themen/dokumente_und_recht/reisepass.html',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        driversLicense: [
            {
                title: 'Oesterreich.gv.at — Führerschein',
                url: 'https://www.oesterreich.gv.at/themen/dokumente_und_recht/fuehrerschein.html',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        residencePermit: [
            {
                title: 'Oesterreich.gv.at — Aufenthaltstitel',
                url: 'https://www.oesterreich.gv.at/themen/leben_in_oesterreich/aufenthalt.html',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
    },
    identityCardLabels: {
        firstName: 'First name / Vorname',
        lastName: 'Last name / Nachname',
        personalId: 'Personal ID number / Sozialversicherungsnummer',
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
