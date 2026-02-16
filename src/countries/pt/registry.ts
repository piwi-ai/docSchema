/**
 * Portugal — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import { DateFormat, DATE_PATTERNS, ReferenceType } from '../../constants.js';

export const pt: CountryMeta = {
    code: 'PT',
    name: 'Portugal',
    nativeName: 'Portugal',
    dateFormat: DateFormat.EU_DOT,
    datePattern: DATE_PATTERNS[DateFormat.EU_DOT],
    personalIdName: 'NIF / Cartão de Cidadão',
    vatName: 'NIF',
    personalIdPattern: '^\\d{9}$',
    documentReferences: {
        identityCard: [
            {
                title: 'ePortugal — Cartão de Cidadão',
                url: 'https://eportugal.gov.pt/servicos/pedir-o-cartao-de-cidadao',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        passport: [
            {
                title: 'PEP — Passaporte',
                url: 'https://www.pep.pt/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        driversLicense: [
            {
                title: 'IMT — Condutores',
                url: 'https://www.imt-ip.pt/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
        residencePermit: [
            {
                title: 'AIMA',
                url: 'https://aima.gov.pt/',
                type: ReferenceType.DOCUMENTATION,
            },
        ],
    },
    identityCardLabels: {
        firstName: 'First name / Nome próprio',
        lastName: 'Last name / Apelido',
        personalId: 'Personal ID number / NIF',
        documentType: 'Document type / Tipo de documento',
        documentNumber: 'Document number / Número do documento',
        issueDate: 'Issue date / Data de emissão',
        expirationDate: 'Expiration date / Data de validade',
        issuingAuthority: 'Issuing authority / Entidade emissora',
        placeOfBirth: 'Place of birth / Local de nascimento',
        dateOfBirth: 'Date of birth / Data de nascimento',
        address: 'Residential address / Morada',
        nationality: 'Nationality / Nacionalidade',
        sex: 'Sex / Sexo',
        mrz: 'Machine Readable Zone (MRZ)',
    },
};
