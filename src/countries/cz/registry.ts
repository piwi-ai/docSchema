/**
 * Czech Republic — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import {  DateFormat, DATE_PATTERNS , ReferenceType } from '../../constants.js';

export const cz: CountryMeta = {
        code: 'CZ', name: 'Czech Republic', nativeName: 'Česká republika',
        dateFormat: DateFormat.EU_DOT, datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
        personalIdName: 'Rodné číslo',
        vatName: 'DIČ',
        personalIdPattern: '^\\d{6}/?\\d{3,4}$',
        documentReferences: {
          identityCard: [
                    {
                              title: 'Ministry of Interior — ID Card',
                              url: 'https://www.mvcr.cz/mvcren/article/identity-cards.aspx',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          passport: [
                    {
                              title: 'Ministry of Interior — Travel Documents',
                              url: 'https://www.mvcr.cz/mvcren/article/travel-documents.aspx',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          driversLicense: [
                    {
                              title: 'Ministry of Transport',
                              url: 'https://www.mdcr.cz/?lang=en-GB',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          residencePermit: [
                    {
                              title: 'Ministry of Interior — Residence',
                              url: 'https://www.mvcr.cz/mvcren/article/third-country-nationals-residence-permits.aspx',
                              type: ReferenceType.DOCUMENTATION
                    }
          ]
},
        identityCardLabels: {
            firstName: 'First name / Jméno',
            lastName: 'Last name / Příjmení',
            personalId: 'Personal ID number / Rodné číslo',
            documentType: 'Document type / Typ dokumentu',
            documentNumber: 'Document number / Číslo dokumentu',
            issueDate: 'Issue date / Datum vydání',
            expirationDate: 'Expiration date / Platnost do',
            issuingAuthority: 'Issuing authority / Vydal',
            placeOfBirth: 'Place of birth / Místo narození',
            dateOfBirth: 'Date of birth / Datum narození',
            address: 'Residential address / Adresa',
            nationality: 'Nationality / Státní příslušnost',
            sex: 'Sex / Pohlaví',
            mrz: 'Machine Readable Zone (MRZ)',
        },
};
