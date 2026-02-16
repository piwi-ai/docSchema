/**
 * Lithuania — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import {  DateFormat, DATE_PATTERNS , ReferenceType } from '../../constants.js';

export const lt: CountryMeta = {
        code: 'LT', name: 'Lithuania', nativeName: 'Lietuva',
        dateFormat: DateFormat.ISO_8601, datePattern: DATE_PATTERNS[DateFormat.ISO_8601],
        personalIdName: 'Asmens kodas',
        vatName: 'PVM mokėtojo kodas',
        personalIdPattern: '^\\d{11}$',
        documentReferences: {
          identityCard: [
                    {
                              title: 'ADIC — Identity Cards',
                              url: 'https://adic.lrv.lt/en/identity-documents/identity-card',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          passport: [
                    {
                              title: 'ADIC — Passport',
                              url: 'https://adic.lrv.lt/en/identity-documents/passport',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          driversLicense: [
                    {
                              title: 'Regitra',
                              url: 'https://www.regitra.lt/en/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          residencePermit: [
                    {
                              title: 'Migration Department',
                              url: 'https://migracija.lrv.lt/en/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ]
},
        identityCardLabels: {
            firstName: 'First name / Vardas',
            lastName: 'Last name / Pavardė',
            personalId: 'Personal ID number / Asmens kodas',
            documentType: 'Document type / Dokumento tipas',
            documentNumber: 'Document number / Dokumento numeris',
            issueDate: 'Issue date / Išdavimo data',
            expirationDate: 'Expiration date / Galioja iki',
            issuingAuthority: 'Issuing authority / Išdavusi institucija',
            placeOfBirth: 'Place of birth / Gimimo vieta',
            dateOfBirth: 'Date of birth / Gimimo data',
            address: 'Residential address / Adresas',
            nationality: 'Nationality / Pilietybė',
            sex: 'Sex / Lytis',
            mrz: 'Machine Readable Zone (MRZ)',
        },
};
