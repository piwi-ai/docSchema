/**
 * Denmark — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import {  DateFormat, DATE_PATTERNS , ReferenceType } from '../../constants.js';

export const dk: CountryMeta = {
        code: 'DK', name: 'Denmark', nativeName: 'Danmark',
        dateFormat: DateFormat.EU_DOT, datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
        personalIdName: 'CPR-nummer',
        vatName: 'CVR / Momsnummer',
        personalIdPattern: '^\\d{6}-?\\d{4}$',
        documentReferences: {
          identityCard: [
                    {
                              title: 'Borger.dk — Legitimationskort',
                              url: 'https://www.borger.dk/samfund-og-rettigheder/Folkeregister-og-cpr/legitimationskort',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          passport: [
                    {
                              title: 'Borger.dk — Pas',
                              url: 'https://www.borger.dk/transport-trafik-rejser/Pas/Ansoeg-om-eller-forny-dansk-pas',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          driversLicense: [
                    {
                              title: 'Borger.dk — Kørekort',
                              url: 'https://www.borger.dk/transport-trafik-rejser/Biler-og-koerekort/Koerekort',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          residencePermit: [
                    {
                              title: 'New to Denmark',
                              url: 'https://www.nyidanmark.dk/en-GB',
                              type: ReferenceType.DOCUMENTATION
                    }
          ]
},
        identityCardLabels: {
            firstName: 'First name / Fornavn',
            lastName: 'Last name / Efternavn',
            personalId: 'Personal ID number / CPR-nummer',
            documentType: 'Document type / Dokumenttype',
            documentNumber: 'Document number / Dokumentnummer',
            issueDate: 'Issue date / Udstedelsesdato',
            expirationDate: 'Expiration date / Udløbsdato',
            issuingAuthority: 'Issuing authority / Udstedende myndighed',
            placeOfBirth: 'Place of birth / Fødested',
            dateOfBirth: 'Date of birth / Fødselsdato',
            address: 'Residential address / Adresse',
            nationality: 'Nationality / Nationalitet',
            sex: 'Sex / Køn',
            mrz: 'Machine Readable Zone (MRZ)',
        },
};
