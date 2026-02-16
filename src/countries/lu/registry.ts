/**
 * Luxembourg — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import {  DateFormat, DATE_PATTERNS , ReferenceType } from '../../constants.js';

export const lu: CountryMeta = {
        code: 'LU', name: 'Luxembourg', nativeName: 'Lëtzebuerg',
        dateFormat: DateFormat.EU_DOT, datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
        personalIdName: 'Matricule national',
        vatName: 'TVA',
        personalIdPattern: '^\\d{13}$',
        documentReferences: {
          identityCard: [
                    {
                              title: 'Guichet.lu — Identity card',
                              url: 'https://guichet.public.lu/en/citoyens/citoyennete/papiers-identite/carte-identite.html',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          passport: [
                    {
                              title: 'Guichet.lu — Passport',
                              url: 'https://guichet.public.lu/en/citoyens/citoyennete/papiers-identite/titre-voyage.html',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          driversLicense: [
                    {
                              title: 'Guichet.lu — Driving licence',
                              url: 'https://guichet.public.lu/en/citoyens/transports-mobilite/transports-individuels/permis-conduire.html',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          residencePermit: [
                    {
                              title: 'Guichet.lu — Immigration',
                              url: 'https://guichet.public.lu/en/citoyens/immigration.html',
                              type: ReferenceType.DOCUMENTATION
                    }
          ]
},
        identityCardLabels: {
            firstName: 'First name / Prénom',
            lastName: 'Last name / Nom',
            personalId: 'Personal ID number / Matricule national',
            documentType: 'Document type / Type de document',
            documentNumber: 'Document number / Numéro du document',
            issueDate: 'Issue date / Date de délivrance',
            expirationDate: 'Expiration date / Date d\'expiration',
            issuingAuthority: 'Issuing authority / Autorité de délivrance',
            placeOfBirth: 'Place of birth / Lieu de naissance',
            dateOfBirth: 'Date of birth / Date de naissance',
            address: 'Residential address / Adresse',
            nationality: 'Nationality / Nationalité',
            sex: 'Sex / Sexe',
            mrz: 'Machine Readable Zone (MRZ)',
        },
};
