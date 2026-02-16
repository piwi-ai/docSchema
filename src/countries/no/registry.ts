/**
 * Norway — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import {  DateFormat, DATE_PATTERNS , ReferenceType } from '../../constants.js';

export const no: CountryMeta = {
        code: 'NO', name: 'Norway', nativeName: 'Norge',
        dateFormat: DateFormat.EU_DOT, datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
        personalIdName: 'Fødselsnummer',
        vatName: 'MVA-nummer',
        personalIdPattern: '^\\d{11}$',
        documentReferences: {
          identityCard: [
                    {
                              title: 'Politiet — National ID card',
                              url: 'https://www.politiet.no/en/services/passports-and-id-cards/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          passport: [
                    {
                              title: 'Politiet — Passport',
                              url: 'https://www.politiet.no/en/services/passports-and-id-cards/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          driversLicense: [
                    {
                              title: 'Statens vegvesen — Driving licence',
                              url: 'https://www.vegvesen.no/en/driving-licences/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          residencePermit: [
                    {
                              title: 'UDI — Residence permit',
                              url: 'https://www.udi.no/en/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ]
},
        identityCardLabels: {
            firstName: 'First name / Fornavn',
            lastName: 'Last name / Etternavn',
            personalId: 'Personal ID number / Fødselsnummer',
            documentType: 'Document type / Dokumenttype',
            documentNumber: 'Document number / Dokumentnummer',
            issueDate: 'Issue date / Utstedelsesdato',
            expirationDate: 'Expiration date / Utløpsdato',
            issuingAuthority: 'Issuing authority / Utstedende myndighet',
            placeOfBirth: 'Place of birth / Fødested',
            dateOfBirth: 'Date of birth / Fødselsdato',
            address: 'Residential address / Adresse',
            nationality: 'Nationality / Statsborgerskap',
            sex: 'Sex / Kjønn',
            mrz: 'Machine Readable Zone (MRZ)',
        },
};
