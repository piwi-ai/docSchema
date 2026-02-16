/**
 * Iceland — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import {  DateFormat, DATE_PATTERNS , ReferenceType } from '../../constants.js';

export const is: CountryMeta = {
        code: 'IS', name: 'Iceland', nativeName: 'Ísland',
        dateFormat: DateFormat.EU_DOT, datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
        personalIdName: 'Kennitala',
        vatName: 'VSK-númer',
        personalIdPattern: '^\\d{6}-?\\d{4}$',
        documentReferences: {
          identityCard: [
                    {
                              title: 'Registers Iceland — ID',
                              url: 'https://www.skra.is/english/individuals/passport-and-id-card/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          passport: [
                    {
                              title: 'Registers Iceland — Passport',
                              url: 'https://www.skra.is/english/individuals/passport-and-id-card/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          driversLicense: [
                    {
                              title: 'Island.is — Driving licence',
                              url: 'https://island.is/en/driving-licence',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          residencePermit: [
                    {
                              title: 'Directorate of Immigration',
                              url: 'https://island.is/en/o/directorate-of-immigration',
                              type: ReferenceType.DOCUMENTATION
                    }
          ]
},
        identityCardLabels: {
            firstName: 'First name / Fornafn',
            lastName: 'Last name / Eftirnafn',
            personalId: 'Personal ID number / Kennitala',
            documentType: 'Document type / Tegund skjals',
            documentNumber: 'Document number / Númer skjals',
            issueDate: 'Issue date / Útgáfudagur',
            expirationDate: 'Expiration date / Gildir til',
            issuingAuthority: 'Issuing authority / Útgefandi',
            placeOfBirth: 'Place of birth / Fæðingarstaður',
            dateOfBirth: 'Date of birth / Fæðingardagur',
            address: 'Residential address / Heimilisfang',
            nationality: 'Nationality / Ríkisfang',
            sex: 'Sex / Kyn',
            mrz: 'Machine Readable Zone (MRZ)',
        },
};
