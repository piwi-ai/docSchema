/**
 * Italy — Country Metadata
 */
import type { CountryMeta } from '../../country-registry.js';
import { DateFormat, DATE_PATTERNS, ReferenceType } from '../../constants.js';

export const it: CountryMeta = {
    code: 'IT',
    name: 'Italy',
    nativeName: 'Italia',
    dateFormat: DateFormat.EU_DOT,
    datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
    personalIdName: 'Codice Fiscale',
    vatName: 'Partita IVA',
    personalIdPattern: '^[A-Z]{6}\\d{2}[A-Z]\\d{2}[A-Z]\\d{3}[A-Z]$',
    documentReferences: {
        identityCard: [
            {
                title: "Carta d'Identità Elettronica (CIE)",
                url: 'https://www.cartaidentita.interno.gov.it/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        passport: [
            {
                title: 'Polizia di Stato — Passaporto',
                url: 'https://www.poliziadistato.it/articolo/1087',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        driversLicense: [
            {
                title: "Il Portale dell'Automobilista",
                url: 'https://www.ilportaledellautomobilista.it/web/portale-automobilista/home',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        residencePermit: [
            {
                title: 'Polizia di Stato — Permesso di Soggiorno',
                url: 'https://www.poliziadistato.it/articolo/10617',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
    },
    identityCardLabels: {
        firstName: 'First name / Nome',
        lastName: 'Last name / Cognome',
        personalId: 'Personal ID / Codice Fiscale',
        documentType: 'Document type / Tipo documento',
        documentNumber: 'Document number / Numero documento',
        issueDate: 'Issue date / Data di emissione',
        expirationDate: 'Expiration date / Data di scadenza',
        issuingAuthority: 'Issuing authority / Rilasciato da',
        placeOfBirth: 'Place of birth / Luogo di nascita',
        dateOfBirth: 'Date of birth / Data di nascita',
        address: 'Residential address / Indirizzo di residenza',
        nationality: 'Nationality / Nazionalità',
        sex: 'Sex / Sesso',
        mrz: 'Machine Readable Zone (MRZ)',
    },
};
