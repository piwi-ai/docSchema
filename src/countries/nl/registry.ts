/**
 * Netherlands — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import {  DateFormat, DATE_PATTERNS , ReferenceType } from '../../constants.js';

export const nl: CountryMeta = {
        code: 'NL', name: 'Netherlands', nativeName: 'Nederland',
        dateFormat: DateFormat.EU_DASH, datePattern: DATE_PATTERNS[DateFormat.EU_DASH],
        personalIdName: 'BSN (Burgerservicenummer)',
        vatName: 'BTW',
        personalIdPattern: '^\\d{9}$',
        documentReferences: {
          identityCard: [
                    {
                              title: 'Rijksoverheid — Identiteitskaart',
                              url: 'https://www.rijksoverheid.nl/onderwerpen/paspoort-en-identiteitskaart/vraag-en-antwoord/wat-is-het-verschil-tussen-een-paspoort-en-een-identiteitskaart',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          passport: [
                    {
                              title: 'Rijksoverheid — Paspoort',
                              url: 'https://www.rijksoverheid.nl/onderwerpen/paspoort-en-identiteitskaart',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          driversLicense: [
                    {
                              title: 'RDW — Rijbewijs',
                              url: 'https://www.rdw.nl/particulier/voertuigen/auto/het-rijbewijs',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          residencePermit: [
                    {
                              title: 'IND — Residence permit',
                              url: 'https://ind.nl/en',
                              type: ReferenceType.DOCUMENTATION
                    }
          ]
},
        identityCardLabels: {
            firstName: 'First name / Voornamen',
            lastName: 'Last name / Achternaam',
            personalId: 'Personal ID number / BSN',
            documentType: 'Document type / Soort document',
            documentNumber: 'Document number / Documentnummer',
            issueDate: 'Issue date / Datum van afgifte',
            expirationDate: 'Expiration date / Geldig tot',
            issuingAuthority: 'Issuing authority / Autoriteit',
            placeOfBirth: 'Place of birth / Geboorteplaats',
            dateOfBirth: 'Date of birth / Geboortedatum',
            address: 'Residential address / Adres',
            nationality: 'Nationality / Nationaliteit',
            sex: 'Sex / Geslacht',
            mrz: 'Machine Readable Zone (MRZ)',
        },
};
