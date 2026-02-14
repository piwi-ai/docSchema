/**
 * Car Dealership Italy — Entity Type Definitions
 *
 * 4 entity types: Venditore, Acquirente, Veicolo, Transazione.
 * Aggregates data from identity documents, vehicle records, sales contracts, and financing.
 */
import type { EntityTypeDef } from '../../../types';
import { DOC_IDS } from './documentTypes';

// ─── Match helpers ──────────────────────────────────────────────────────────

const cfMatch = () => [
    { field: 'codiceFiscale', fuzzyThreshold: 0.2 },
    { field: 'nome', fuzzyThreshold: 0 },
    { field: 'cognome', fuzzyThreshold: 0 },
];
const targaMatch = () => [
    { field: 'targa', fuzzyThreshold: 0 },
    { field: 'telaio', fuzzyThreshold: 0 },
];
const fm = (sourceField: string, targetField: string, matchFields?: Array<{ field: string; fuzzyThreshold: number }>) =>
    ({ sourceField, targetField, ...(matchFields ? { matchFields } : {}) });

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
        fieldOrder: ['nome', 'cognome', 'codiceFiscale', 'indirizzoDiResidenza', 'dataNascita', 'luogoNascita', 'statoCivile'],
        dataSources: [
            {
                docTypeId: DOC_IDS.IDENTITA, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm('nome', 'nome', cfMatch()), fm('cognome', 'cognome', cfMatch()),
                    fm('codiceFiscale', 'codiceFiscale', cfMatch()),
                    fm('dataNascita', 'dataNascita', cfMatch()), fm('luogoNascita', 'luogoNascita', cfMatch()),
                    fm('indirizzoDiResidenza', 'indirizzoDiResidenza', cfMatch()),
                    fm('statoCivile', 'statoCivile', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.TESSERA_SANITARIA, enabled: true,
                fieldMappings: [
                    fm('nome', 'nome', cfMatch()), fm('cognome', 'cognome', cfMatch()),
                    fm('codiceFiscale', 'codiceFiscale', cfMatch()),
                    fm('dataNascita', 'dataNascita', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.ATTO_VENDITA, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('venditore.nome', 'nome', cfMatch()), fm('venditore.cognome', 'cognome', cfMatch()),
                    fm('venditore.codiceFiscale', 'codiceFiscale', cfMatch()),
                    fm('venditore.indirizzo', 'indirizzoDiResidenza', cfMatch()),
                    fm('venditore.statoCivile', 'statoCivile', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CDP, enabled: true,
                fieldMappings: [
                    fm('proprietario', 'nome', cfMatch()),
                    fm('codiceFiscaleProprietario', 'codiceFiscale', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CONTATTO, enabled: true,
                fieldMappings: [
                    fm('nome', 'nome', cfMatch()), fm('cognome', 'cognome', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.PROCURA, enabled: true,
                fieldMappings: [
                    fm('nomeMandante', 'nome', cfMatch()), fm('cognomeMandante', 'cognome', cfMatch()),
                    fm('codiceFiscaleMandante', 'codiceFiscale', cfMatch()),
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
        fieldOrder: ['nome', 'cognome', 'codiceFiscale', 'indirizzoDiResidenza', 'dataNascita', 'luogoNascita', 'statoCivile'],
        dataSources: [
            {
                docTypeId: DOC_IDS.IDENTITA, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm('nome', 'nome', cfMatch()), fm('cognome', 'cognome', cfMatch()),
                    fm('codiceFiscale', 'codiceFiscale', cfMatch()),
                    fm('dataNascita', 'dataNascita', cfMatch()), fm('luogoNascita', 'luogoNascita', cfMatch()),
                    fm('indirizzoDiResidenza', 'indirizzoDiResidenza', cfMatch()),
                    fm('statoCivile', 'statoCivile', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.TESSERA_SANITARIA, enabled: true,
                fieldMappings: [
                    fm('nome', 'nome', cfMatch()), fm('cognome', 'cognome', cfMatch()),
                    fm('codiceFiscale', 'codiceFiscale', cfMatch()),
                    fm('dataNascita', 'dataNascita', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.ATTO_VENDITA, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('acquirente.nome', 'nome', cfMatch()), fm('acquirente.cognome', 'cognome', cfMatch()),
                    fm('acquirente.codiceFiscale', 'codiceFiscale', cfMatch()),
                    fm('acquirente.indirizzo', 'indirizzoDiResidenza', cfMatch()),
                    fm('acquirente.statoCivile', 'statoCivile', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.FINANZIAMENTO, enabled: true,
                fieldMappings: [
                    fm('nomeCliente', 'nome', cfMatch()),
                    fm('codiceFiscaleCliente', 'codiceFiscale', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CONTATTO, enabled: true,
                fieldMappings: [
                    fm('nome', 'nome', cfMatch()), fm('cognome', 'cognome', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.PROCURA, enabled: true,
                fieldMappings: [
                    fm('nomeMandante', 'nome', cfMatch()), fm('cognomeMandante', 'cognome', cfMatch()),
                    fm('codiceFiscaleMandante', 'codiceFiscale', cfMatch()),
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
                    { sourceDocTypeId: DOC_IDS.ATTO_VENDITA, field: 'modalitaPagamento', operator: 'contains', value: 'finanz' },
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
        fieldOrder: ['targa', 'telaio', 'marca', 'modello', 'allestimento', 'dataImmatricolazione', 'cilindrata', 'potenzaKw', 'alimentazione', 'classeAmbientale', 'km'],
        dataSources: [
            {
                docTypeId: DOC_IDS.LIBRETTO, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm('targa', 'targa', targaMatch()), fm('telaio', 'telaio', targaMatch()),
                    fm('marca', 'marca', targaMatch()), fm('modello', 'modello', targaMatch()),
                    fm('allestimento', 'allestimento', targaMatch()),
                    fm('dataImmatricolazione', 'dataImmatricolazione', targaMatch()),
                    fm('cilindrata', 'cilindrata', targaMatch()), fm('potenzaKw', 'potenzaKw', targaMatch()),
                    fm('alimentazione', 'alimentazione', targaMatch()),
                    fm('classeAmbientale', 'classeAmbientale', targaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CDP, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm('targa', 'targa', targaMatch()), fm('telaio', 'telaio', targaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.VISURA_PRA, enabled: true, isRequired: true,
                fieldMappings: [
                    fm('targa', 'targa', targaMatch()), fm('telaio', 'telaio', targaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.ATTO_VENDITA, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('targa', 'targa', targaMatch()), fm('telaio', 'telaio', targaMatch()),
                    fm('marca', 'marca', targaMatch()), fm('modello', 'modello', targaMatch()),
                    fm('km', 'km', targaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.ASSICURAZIONE, enabled: true,
                fieldMappings: [
                    fm('targa', 'targa', targaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.REVISIONE, enabled: true,
                fieldMappings: [
                    fm('targa', 'targa', targaMatch()),
                    fm('kmRevisione', 'km', targaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.GARANZIA, enabled: true,
                fieldMappings: [
                    fm('targa', 'targa', targaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.SCHEDA_TECNICA, enabled: true,
                fieldMappings: [
                    fm('marca', 'marca', targaMatch()), fm('modello', 'modello', targaMatch()),
                    fm('allestimento', 'allestimento', targaMatch()),
                ],
            },
        ],
        conditionalRequirements: [
            {
                docTypeId: DOC_IDS.REVISIONE, enabled: true,
                conditions: [
                    { sourceDocTypeId: DOC_IDS.LIBRETTO, field: 'dataImmatricolazione', operator: 'exists', value: 'true' },
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
        fieldOrder: ['prezzo', 'modalitaPagamento', 'dataVendita', 'km', 'valorePermuta', 'importoFinanziato', 'importoRata', 'durataRateMesi'],
        dataSources: [
            {
                docTypeId: DOC_IDS.ATTO_VENDITA, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm('prezzo', 'prezzo'), fm('dataVendita', 'dataVendita'),
                    fm('km', 'km'), fm('modalitaPagamento', 'modalitaPagamento'),
                ],
            },
            {
                docTypeId: DOC_IDS.FINANZIAMENTO, enabled: true,
                fieldMappings: [
                    fm('importoFinanziato', 'importoFinanziato'), fm('importoRata', 'importoRata'),
                    fm('durataRateMesi', 'durataRateMesi'), fm('tan', 'tan'), fm('taeg', 'taeg'),
                ],
            },
            {
                docTypeId: DOC_IDS.PERMUTA, enabled: true,
                fieldMappings: [
                    fm('valorePermuta', 'valorePermuta'),
                ],
            },
        ],
        conditionalRequirements: [],
    },
];
