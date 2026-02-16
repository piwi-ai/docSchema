/**
 * Hungary — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import {  DateFormat, DATE_PATTERNS , ReferenceType } from '../../constants.js';

export const hu: CountryMeta = {
        code: 'HU', name: 'Hungary', nativeName: 'Magyarország',
        dateFormat: DateFormat.YEAR_DOT, datePattern: DATE_PATTERNS[DateFormat.YEAR_DOT],
        personalIdName: 'Személyi szám',
        vatName: 'ÁFA szám',
        personalIdPattern: '^\\d{1}\\d{6}\\d{4}$',
        documentReferences: {
          identityCard: [
                    {
                              title: 'Kormányablak — Személyazonosító',
                              url: 'https://kormanyablak.hu/hu/feladatkorok/6',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          passport: [
                    {
                              title: 'Kormányablak — Útlevél',
                              url: 'https://kormanyablak.hu/hu/feladatkorok/10',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          driversLicense: [
                    {
                              title: 'Kormányablak — Vezetői engedély',
                              url: 'https://kormanyablak.hu/hu/feladatkorok/28',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          residencePermit: [
                    {
                              title: 'OIF — Residence',
                              url: 'http://www.bmbah.hu/index.php?lang=en',
                              type: ReferenceType.DOCUMENTATION
                    }
          ]
},
        identityCardLabels: {
            firstName: 'First name / Utónév',
            lastName: 'Last name / Vezetéknév',
            personalId: 'Personal ID number / Személyi szám',
            documentType: 'Document type / Dokumentum típusa',
            documentNumber: 'Document number / Okmányszám',
            issueDate: 'Issue date / Kiállítás dátuma',
            expirationDate: 'Expiration date / Érvényesség',
            issuingAuthority: 'Issuing authority / Kiállító hatóság',
            placeOfBirth: 'Place of birth / Születési hely',
            dateOfBirth: 'Date of birth / Születési dátum',
            address: 'Residential address / Lakcím',
            nationality: 'Nationality / Állampolgárság',
            sex: 'Sex / Nem',
            mrz: 'Machine Readable Zone (MRZ)',
        },
};
