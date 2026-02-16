/**
 * Bulgaria — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import {  DateFormat, DATE_PATTERNS , ReferenceType } from '../../constants.js';

export const bg: CountryMeta = {
        code: 'BG', name: 'Bulgaria', nativeName: 'България',
        dateFormat: DateFormat.EU_DOT, datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
        personalIdName: 'ЕГН (EGN)',
        vatName: 'ДДС (DDS)',
        personalIdPattern: '^\\d{10}$',
        documentReferences: {
          identityCard: [
                    {
                              title: 'Ministry of Interior — Identity Documents',
                              url: 'https://www.mvr.bg/en/administrative-services/issuing-identity-documents',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          passport: [
                    {
                              title: 'Ministry of Interior — Passports',
                              url: 'https://www.mvr.bg/en/administrative-services',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          driversLicense: [
                    {
                              title: 'Ministry of Interior — Driving License',
                              url: 'https://www.mvr.bg/en',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          residencePermit: [
                    {
                              title: 'Migration Directorate',
                              url: 'https://www.mvr.bg/migration/en',
                              type: ReferenceType.DOCUMENTATION
                    }
          ]
},
        identityCardLabels: {
            firstName: 'First name / Име',
            lastName: 'Last name / Фамилия',
            personalId: 'Personal ID number / ЕГН',
            documentType: 'Document type / Вид на документа',
            documentNumber: 'Document number / Номер на документа',
            issueDate: 'Issue date / Дата на издаване',
            expirationDate: 'Expiration date / Валидна до',
            issuingAuthority: 'Issuing authority / Издаден от',
            placeOfBirth: 'Place of birth / Място на раждане',
            dateOfBirth: 'Date of birth / Дата на раждане',
            address: 'Residential address / Адрес',
            nationality: 'Nationality / Гражданство',
            sex: 'Sex / Пол',
            mrz: 'Machine Readable Zone (MRZ)',
        },
};
