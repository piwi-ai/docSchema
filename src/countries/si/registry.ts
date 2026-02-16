/**
 * Slovenia — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import {  DateFormat, DATE_PATTERNS , ReferenceType } from '../../constants.js';

export const si: CountryMeta = {
        code: 'SI', name: 'Slovenia', nativeName: 'Slovenija',
        dateFormat: DateFormat.EU_DOT, datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
        personalIdName: 'EMŠO',
        vatName: 'DDV',
        personalIdPattern: '^\\d{13}$',
        documentReferences: {
          identityCard: [
                    {
                              title: 'Gov.si — Osebna izkaznica',
                              url: 'https://www.gov.si/teme/osebna-izkaznica/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          passport: [
                    {
                              title: 'Gov.si — Potni list',
                              url: 'https://www.gov.si/teme/potni-list/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          driversLicense: [
                    {
                              title: 'Gov.si — Vozniško dovoljenje',
                              url: 'https://www.gov.si/podrocja/promet-in-energetika/cestni-promet/voznisko-dovoljenje/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          residencePermit: [
                    {
                              title: 'Gov.si — Bivanje tujcev',
                              url: 'https://www.gov.si/teme/bivanje-tujcev/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ]
},
        identityCardLabels: {
            firstName: 'First name / Ime',
            lastName: 'Last name / Priimek',
            personalId: 'Personal ID number / EMŠO',
            documentType: 'Document type / Vrsta dokumenta',
            documentNumber: 'Document number / Številka dokumenta',
            issueDate: 'Issue date / Datum izdaje',
            expirationDate: 'Expiration date / Velja do',
            issuingAuthority: 'Issuing authority / Izdajatelj',
            placeOfBirth: 'Place of birth / Kraj rojstva',
            dateOfBirth: 'Date of birth / Datum rojstva',
            address: 'Residential address / Naslov',
            nationality: 'Nationality / Državljanstvo',
            sex: 'Sex / Spol',
            mrz: 'Machine Readable Zone (MRZ)',
        },
};
