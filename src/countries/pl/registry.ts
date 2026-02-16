/**
 * Poland — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import {  DateFormat, DATE_PATTERNS , ReferenceType } from '../../constants.js';

export const pl: CountryMeta = {
        code: 'PL', name: 'Poland', nativeName: 'Polska',
        dateFormat: DateFormat.EU_DOT, datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
        personalIdName: 'PESEL',
        vatName: 'NIP',
        personalIdPattern: '^\\d{11}$',
        documentReferences: {
          identityCard: [
                    {
                              title: 'Gov.pl — Dowód osobisty',
                              url: 'https://www.gov.pl/web/gov/dowod-osobisty-informacje',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          passport: [
                    {
                              title: 'Gov.pl — Paszport',
                              url: 'https://www.gov.pl/web/gov/paszport-informacje',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          driversLicense: [
                    {
                              title: 'Gov.pl — Prawo jazdy',
                              url: 'https://www.gov.pl/web/gov/prawo-jazdy',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          residencePermit: [
                    {
                              title: 'Urząd do Spraw Cudzoziemców',
                              url: 'https://www.gov.pl/web/udsc-en',
                              type: ReferenceType.DOCUMENTATION
                    }
          ]
},
        identityCardLabels: {
            firstName: 'First name / Imię',
            lastName: 'Last name / Nazwisko',
            personalId: 'Personal ID number / PESEL',
            documentType: 'Document type / Rodzaj dokumentu',
            documentNumber: 'Document number / Numer dokumentu',
            issueDate: 'Issue date / Data wydania',
            expirationDate: 'Expiration date / Data ważności',
            issuingAuthority: 'Issuing authority / Organ wydający',
            placeOfBirth: 'Place of birth / Miejsce urodzenia',
            dateOfBirth: 'Date of birth / Data urodzenia',
            address: 'Residential address / Adres zameldowania',
            nationality: 'Nationality / Obywatelstwo',
            sex: 'Sex / Płeć',
            mrz: 'Machine Readable Zone (MRZ)',
        },
};
