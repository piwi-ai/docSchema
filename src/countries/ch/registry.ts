/**
 * Switzerland — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import {  DateFormat, DATE_PATTERNS , ReferenceType } from '../../constants.js';

export const ch: CountryMeta = {
        code: 'CH', name: 'Switzerland', nativeName: 'Schweiz / Suisse / Svizzera',
        dateFormat: DateFormat.EU_DOT, datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
        personalIdName: 'AHV-Nr. / AVS',
        vatName: 'MWST / TVA',
        personalIdPattern: '^756\\.\\d{4}\\.\\d{4}\\.\\d{2}$',
        documentReferences: {
          identityCard: [
                    {
                              title: 'ch.ch — Identity card',
                              url: 'https://www.ch.ch/en/documents-and-register-extracts/identity-card/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          passport: [
                    {
                              title: 'ch.ch — Passport',
                              url: 'https://www.ch.ch/en/documents-and-register-extracts/passport/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          driversLicense: [
                    {
                              title: 'ch.ch — Driving licence',
                              url: 'https://www.ch.ch/en/vehicles-and-traffic/driving-licence/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          residencePermit: [
                    {
                              title: 'SEM — Residence',
                              url: 'https://www.sem.admin.ch/sem/en/home.html',
                              type: ReferenceType.DOCUMENTATION
                    }
          ]
},
        identityCardLabels: {
            firstName: 'First name / Vorname / Prénom',
            lastName: 'Last name / Nachname / Nom',
            personalId: 'Personal ID number / AHV-Nr.',
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
