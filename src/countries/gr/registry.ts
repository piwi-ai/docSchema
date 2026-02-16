/**
 * Greece — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import {  DateFormat, DATE_PATTERNS , ReferenceType } from '../../constants.js';

export const gr: CountryMeta = {
        code: 'GR', name: 'Greece', nativeName: 'Ελλάδα',
        dateFormat: DateFormat.EU_SLASH, datePattern: DATE_PATTERNS[DateFormat.EU_SLASH],
        personalIdName: 'ΑΔΤ (ADT)',
        vatName: 'ΑΦΜ (AFM)',
        personalIdPattern: '^\\d{9}$',
        documentReferences: {
          identityCard: [
                    {
                              title: 'Hellenic Police — Identity Card',
                              url: 'http://www.astynomia.gr/index.php?option=ozo_content&lang=\'..\'&perform=view&id=139&Itemid=132&lang=EN',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          passport: [
                    {
                              title: 'Hellenic Passport Center',
                              url: 'http://www.passport.gov.gr/en/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          driversLicense: [
                    {
                              title: 'Ministry of Infrastructure and Transport',
                              url: 'https://www.yme.gr/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          residencePermit: [
                    {
                              title: 'Ministry of Migration and Asylum',
                              url: 'https://migration.gov.gr/en/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ]
},
        identityCardLabels: {
            firstName: 'First name / Όνομα',
            lastName: 'Last name / Επώνυμο',
            personalId: 'Personal ID number / ΑΔΤ',
            documentType: 'Document type / Τύπος εγγράφου',
            documentNumber: 'Document number / Αριθμός εγγράφου',
            issueDate: 'Issue date / Ημερομηνία έκδοσης',
            expirationDate: 'Expiration date / Ημερομηνία λήξης',
            issuingAuthority: 'Issuing authority / Αρχή έκδοσης',
            placeOfBirth: 'Place of birth / Τόπος γέννησης',
            dateOfBirth: 'Date of birth / Ημερομηνία γέννησης',
            address: 'Residential address / Διεύθυνση',
            nationality: 'Nationality / Υπηκοότητα',
            sex: 'Sex / Φύλο',
            mrz: 'Machine Readable Zone (MRZ)',
        },
};
