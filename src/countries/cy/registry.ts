/**
 * Cyprus — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import { DateFormat, DATE_PATTERNS, ReferenceType } from '../../constants.js';

export const cy: CountryMeta = {
    code: 'CY',
    name: 'Cyprus',
    nativeName: 'Κύπρος / Kıbrıs',
    dateFormat: DateFormat.EU_SLASH,
    datePattern: DATE_PATTERNS[DateFormat.EU_SLASH],
    personalIdName: 'ARC (Alien Registration Card) / ID Number',
    vatName: 'ΦΠΑ (FPA)',
    personalIdPattern: '^\\d{1,10}$',
    documentReferences: {
        identityCard: [
            {
                title: 'Civil Registry — Identity Card',
                url: 'http://www.moi.gov.cy/moi/crmd/crmd.nsf/All/70577F32007F10EAC2257D2C0045501A',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        passport: [
            {
                title: 'Civil Registry — Passports',
                url: 'http://www.moi.gov.cy/moi/crmd/crmd.nsf/All/66E31238C96E2E80C2257D2C003B5279',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        driversLicense: [
            {
                title: 'Road Transport Department',
                url: 'http://www.mcw.gov.cy/mcw/rtd/rtd.nsf/index_en/index_en',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        residencePermit: [
            {
                title: 'Civil Registry — Residence',
                url: 'http://www.moi.gov.cy/moi/crmd/crmd.nsf/index_en/index_en',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
    },
    identityCardLabels: {
        firstName: 'First name / Όνομα',
        lastName: 'Last name / Επώνυμο',
        personalId: 'Personal ID number',
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
