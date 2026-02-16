/**
 * Slovakia — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import {  DateFormat, DATE_PATTERNS , ReferenceType } from '../../constants.js';

export const sk: CountryMeta = {
        code: 'SK', name: 'Slovakia', nativeName: 'Slovensko',
        dateFormat: DateFormat.EU_DOT, datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
        personalIdName: 'Rodné číslo',
        vatName: 'IČ DPH',
        personalIdPattern: '^\\d{6}/?\\d{3,4}$',
        documentReferences: {
          identityCard: [
                    {
                              title: 'MINV — Občiansky preukaz',
                              url: 'https://www.minv.sk/?obcianske-preukazy',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          passport: [
                    {
                              title: 'MINV — Cestovné pasy',
                              url: 'https://www.minv.sk/?cestovne-pasy',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          driversLicense: [
                    {
                              title: 'MINV — Vodičské preukazy',
                              url: 'https://www.minv.sk/?vodicske-preukazy',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          residencePermit: [
                    {
                              title: 'MINV — Pobyt cudzincov',
                              url: 'https://www.minv.sk/?pobyt-cudzincov',
                              type: ReferenceType.DOCUMENTATION
                    }
          ]
},
        identityCardLabels: {
            firstName: 'First name / Meno',
            lastName: 'Last name / Priezvisko',
            personalId: 'Personal ID number / Rodné číslo',
            documentType: 'Document type / Typ dokumentu',
            documentNumber: 'Document number / Číslo dokumentu',
            issueDate: 'Issue date / Dátum vydania',
            expirationDate: 'Expiration date / Platnosť do',
            issuingAuthority: 'Issuing authority / Vydal',
            placeOfBirth: 'Place of birth / Miesto narodenia',
            dateOfBirth: 'Date of birth / Dátum narodenia',
            address: 'Residential address / Adresa',
            nationality: 'Nationality / Štátna príslušnosť',
            sex: 'Sex / Pohlavie',
            mrz: 'Machine Readable Zone (MRZ)',
        },
};
