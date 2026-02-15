/**
 * Car Dealership Italy — Entity Type Definitions
 *
 * 4 entity types: Venditore, Acquirente, Veicolo, Transazione.
 * Aggregates data from identity documents, vehicle records, sales contracts, and financing.
 */
import type { EntityTypeDef } from '../../../types.js';
import { F } from '../../../countries/it/fields.js';
import { cfMatch, targaTelaioMatch, fm } from '../../../countries/it/matchHelpers.js';
import { DOC_IDS } from './documentTypes.js';

// ─── Entity IDs ─────────────────────────────────────────────────────────────

export const ENTITY_IDS = {
    VENDITORE: 'entity-venditore',
    ACQUIRENTE: 'entity-acquirente',
    VEICOLO: 'entity-veicolo',
    TRANSAZIONE: 'entity-transazione',
} as const;

// ─── Entity Types ───────────────────────────────────────────────────────────

export const entityTypes: EntityTypeDef[] = [
    {
        id: ENTITY_IDS.VENDITORE,
        name: 'Venditore',
        icon: 'user-minus',
        color: '#ef4444',
        displayOrder: 0,
        fieldOrder: [F.NOME, F.COGNOME, F.CODICE_FISCALE, F.INDIRIZZO_RESIDENZA, F.DATA_NASCITA, F.LUOGO_NASCITA, F.STATO_CIVILE],
        dataSources: [
            {
                docTypeId: DOC_IDS.IDENTITA, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.NOME, F.NOME, cfMatch()), fm(F.COGNOME, F.COGNOME, cfMatch()),
                    fm(F.CODICE_FISCALE, F.CODICE_FISCALE, cfMatch()),
                    fm(F.DATA_NASCITA, F.DATA_NASCITA, cfMatch()), fm(F.LUOGO_NASCITA, F.LUOGO_NASCITA, cfMatch()),
                    fm(F.INDIRIZZO_RESIDENZA, F.INDIRIZZO_RESIDENZA, cfMatch()),
                    fm(F.STATO_CIVILE, F.STATO_CIVILE, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.TESSERA_SANITARIA, enabled: true,
                fieldMappings: [
                    fm(F.NOME, F.NOME, cfMatch()), fm(F.COGNOME, F.COGNOME, cfMatch()),
                    fm(F.CODICE_FISCALE, F.CODICE_FISCALE, cfMatch()),
                    fm(F.DATA_NASCITA, F.DATA_NASCITA, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.ATTO_VENDITA, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('venditore.nome', F.NOME, cfMatch()), fm('venditore.cognome', F.COGNOME, cfMatch()),
                    fm('venditore.codiceFiscale', F.CODICE_FISCALE, cfMatch()),
                    fm('venditore.indirizzo', F.INDIRIZZO_RESIDENZA, cfMatch()),
                    fm('venditore.statoCivile', F.STATO_CIVILE, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CDP, enabled: true,
                fieldMappings: [
                    fm('proprietario', F.NOME, cfMatch()),
                    fm('codiceFiscaleProprietario', F.CODICE_FISCALE, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CONTATTO, enabled: true,
                fieldMappings: [
                    fm(F.NOME, F.NOME, cfMatch()), fm(F.COGNOME, F.COGNOME, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.PROCURA, enabled: true,
                fieldMappings: [
                    fm('nomeMandante', F.NOME, cfMatch()), fm('cognomeMandante', F.COGNOME, cfMatch()),
                    fm('codiceFiscaleMandante', F.CODICE_FISCALE, cfMatch()),
                ],
            },
        ],
        conditionalRequirements: [
            {
                docTypeId: DOC_IDS.VISURA_CAMERALE, enabled: true,
                conditions: [
                    { sourceDocTypeId: DOC_IDS.ATTO_VENDITA, field: 'venditore.codiceFiscale', operator: 'lengthGreaterThan' as any, value: '11' },
                ],
            },
        ],
    },
    {
        id: ENTITY_IDS.ACQUIRENTE,
        name: 'Acquirente',
        icon: 'user-plus',
        color: '#22c55e',
        displayOrder: 1,
        fieldOrder: [F.NOME, F.COGNOME, F.CODICE_FISCALE, F.INDIRIZZO_RESIDENZA, F.DATA_NASCITA, F.LUOGO_NASCITA, F.STATO_CIVILE],
        dataSources: [
            {
                docTypeId: DOC_IDS.IDENTITA, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.NOME, F.NOME, cfMatch()), fm(F.COGNOME, F.COGNOME, cfMatch()),
                    fm(F.CODICE_FISCALE, F.CODICE_FISCALE, cfMatch()),
                    fm(F.DATA_NASCITA, F.DATA_NASCITA, cfMatch()), fm(F.LUOGO_NASCITA, F.LUOGO_NASCITA, cfMatch()),
                    fm(F.INDIRIZZO_RESIDENZA, F.INDIRIZZO_RESIDENZA, cfMatch()),
                    fm(F.STATO_CIVILE, F.STATO_CIVILE, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.TESSERA_SANITARIA, enabled: true,
                fieldMappings: [
                    fm(F.NOME, F.NOME, cfMatch()), fm(F.COGNOME, F.COGNOME, cfMatch()),
                    fm(F.CODICE_FISCALE, F.CODICE_FISCALE, cfMatch()),
                    fm(F.DATA_NASCITA, F.DATA_NASCITA, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.ATTO_VENDITA, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('acquirente.nome', F.NOME, cfMatch()), fm('acquirente.cognome', F.COGNOME, cfMatch()),
                    fm('acquirente.codiceFiscale', F.CODICE_FISCALE, cfMatch()),
                    fm('acquirente.indirizzo', F.INDIRIZZO_RESIDENZA, cfMatch()),
                    fm('acquirente.statoCivile', F.STATO_CIVILE, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.FINANZIAMENTO, enabled: true,
                fieldMappings: [
                    fm('nomeCliente', F.NOME, cfMatch()),
                    fm('codiceFiscaleCliente', F.CODICE_FISCALE, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CONTATTO, enabled: true,
                fieldMappings: [
                    fm(F.NOME, F.NOME, cfMatch()), fm(F.COGNOME, F.COGNOME, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.PROCURA, enabled: true,
                fieldMappings: [
                    fm('nomeMandante', F.NOME, cfMatch()), fm('cognomeMandante', F.COGNOME, cfMatch()),
                    fm('codiceFiscaleMandante', F.CODICE_FISCALE, cfMatch()),
                ],
            },
        ],
        conditionalRequirements: [
            {
                docTypeId: DOC_IDS.VISURA_CAMERALE, enabled: true,
                conditions: [
                    { sourceDocTypeId: DOC_IDS.ATTO_VENDITA, field: 'acquirente.codiceFiscale', operator: 'lengthGreaterThan' as any, value: '11' },
                ],
            },
            {
                docTypeId: DOC_IDS.FINANZIAMENTO, enabled: true,
                conditions: [
                    { sourceDocTypeId: DOC_IDS.ATTO_VENDITA, field: F.MODALITA_PAGAMENTO, operator: 'contains', value: 'finanz' },
                ],
            },
        ],
    },
    {
        id: ENTITY_IDS.VEICOLO,
        name: 'Veicolo',
        icon: 'car',
        color: '#3b82f6',
        displayOrder: 2,
        fieldOrder: [F.TARGA, F.TELAIO, F.MARCA, F.MODELLO, F.ALLESTIMENTO, F.DATA_IMMATRICOLAZIONE, F.CILINDRATA, F.POTENZA_KW, F.ALIMENTAZIONE, F.CLASSE_AMBIENTALE, F.KM],
        dataSources: [
            {
                docTypeId: DOC_IDS.LIBRETTO, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.TARGA, F.TARGA, targaTelaioMatch()), fm(F.TELAIO, F.TELAIO, targaTelaioMatch()),
                    fm(F.MARCA, F.MARCA, targaTelaioMatch()), fm(F.MODELLO, F.MODELLO, targaTelaioMatch()),
                    fm(F.ALLESTIMENTO, F.ALLESTIMENTO, targaTelaioMatch()),
                    fm(F.DATA_IMMATRICOLAZIONE, F.DATA_IMMATRICOLAZIONE, targaTelaioMatch()),
                    fm(F.CILINDRATA, F.CILINDRATA, targaTelaioMatch()), fm(F.POTENZA_KW, F.POTENZA_KW, targaTelaioMatch()),
                    fm(F.ALIMENTAZIONE, F.ALIMENTAZIONE, targaTelaioMatch()),
                    fm(F.CLASSE_AMBIENTALE, F.CLASSE_AMBIENTALE, targaTelaioMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CDP, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.TARGA, F.TARGA, targaTelaioMatch()), fm(F.TELAIO, F.TELAIO, targaTelaioMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.VISURA_PRA, enabled: true, isRequired: true,
                fieldMappings: [
                    fm(F.TARGA, F.TARGA, targaTelaioMatch()), fm(F.TELAIO, F.TELAIO, targaTelaioMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.ATTO_VENDITA, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.TARGA, F.TARGA, targaTelaioMatch()), fm(F.TELAIO, F.TELAIO, targaTelaioMatch()),
                    fm(F.MARCA, F.MARCA, targaTelaioMatch()), fm(F.MODELLO, F.MODELLO, targaTelaioMatch()),
                    fm(F.KM, F.KM, targaTelaioMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.ASSICURAZIONE, enabled: true,
                fieldMappings: [
                    fm(F.TARGA, F.TARGA, targaTelaioMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.REVISIONE, enabled: true,
                fieldMappings: [
                    fm(F.TARGA, F.TARGA, targaTelaioMatch()),
                    fm('kmRevisione', F.KM, targaTelaioMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.GARANZIA, enabled: true,
                fieldMappings: [
                    fm(F.TARGA, F.TARGA, targaTelaioMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.SCHEDA_TECNICA, enabled: true,
                fieldMappings: [
                    fm(F.MARCA, F.MARCA, targaTelaioMatch()), fm(F.MODELLO, F.MODELLO, targaTelaioMatch()),
                    fm(F.ALLESTIMENTO, F.ALLESTIMENTO, targaTelaioMatch()),
                ],
            },
        ],
        conditionalRequirements: [
            {
                docTypeId: DOC_IDS.REVISIONE, enabled: true,
                conditions: [
                    { sourceDocTypeId: DOC_IDS.LIBRETTO, field: F.DATA_IMMATRICOLAZIONE, operator: 'exists', value: 'true' },
                ],
            },
        ],
    },
    {
        id: ENTITY_IDS.TRANSAZIONE,
        name: 'Transazione',
        icon: 'banknote',
        color: '#f59e0b',
        displayOrder: 3,
        fieldOrder: [F.PREZZO, F.MODALITA_PAGAMENTO, F.DATA_VENDITA, F.KM, F.VALORE_PERMUTA, F.IMPORTO_FINANZIATO, F.IMPORTO_RATA, F.DURATA_RATE_MESI],
        dataSources: [
            {
                docTypeId: DOC_IDS.ATTO_VENDITA, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.PREZZO, F.PREZZO), fm(F.DATA_VENDITA, F.DATA_VENDITA),
                    fm(F.KM, F.KM), fm(F.MODALITA_PAGAMENTO, F.MODALITA_PAGAMENTO),
                ],
            },
            {
                docTypeId: DOC_IDS.FINANZIAMENTO, enabled: true,
                fieldMappings: [
                    fm(F.IMPORTO_FINANZIATO, F.IMPORTO_FINANZIATO), fm(F.IMPORTO_RATA, F.IMPORTO_RATA),
                    fm(F.DURATA_RATE_MESI, F.DURATA_RATE_MESI), fm(F.TAN, F.TAN), fm(F.TAEG, F.TAEG),
                ],
            },
            {
                docTypeId: DOC_IDS.PERMUTA, enabled: true,
                fieldMappings: [
                    fm(F.VALORE_PERMUTA, F.VALORE_PERMUTA),
                ],
            },
        ],
        conditionalRequirements: [],
    },
];
