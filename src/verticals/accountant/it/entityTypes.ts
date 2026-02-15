/**
 * Accountant / Tax Firm Italy — Entity Type Definitions
 *
 * 3 entity types: Cliente, Azienda, Anno Fiscale.
 * Aggregates data from identity docs, invoices, tax declarations,
 * payroll, balance sheets, and fiscal documents.
 */
import type { EntityTypeDef } from '../../../types.js';
import { F } from '../../../countries/it/fields.js';
import { cfMatch, pivaMatch, annoMatch, fm } from '../../../countries/it/matchHelpers.js';
import { DOC_IDS } from './documentTypes.js';

// ─── Entity IDs ─────────────────────────────────────────────────────────────

export const ENTITY_IDS = {
    CLIENTE: 'entity-cliente',
    AZIENDA: 'entity-azienda',
    ANNO_FISCALE: 'entity-anno-fiscale',
} as const;

// ─── Entity Types ───────────────────────────────────────────────────────────

export const entityTypes: EntityTypeDef[] = [
    {
        id: ENTITY_IDS.CLIENTE,
        name: 'Cliente',
        icon: 'user',
        color: '#3b82f6',
        displayOrder: 0,
        fieldOrder: [F.NOME, F.COGNOME, F.CODICE_FISCALE, F.DATA_NASCITA, F.LUOGO_NASCITA, F.INDIRIZZO_RESIDENZA, F.PARTITA_IVA, F.REGIME],
        dataSources: [
            {
                docTypeId: DOC_IDS.IDENTITA, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.NOME, F.NOME, cfMatch()), fm(F.COGNOME, F.COGNOME, cfMatch()),
                    fm(F.CODICE_FISCALE, F.CODICE_FISCALE, cfMatch()),
                    fm(F.DATA_NASCITA, F.DATA_NASCITA, cfMatch()), fm(F.LUOGO_NASCITA, F.LUOGO_NASCITA, cfMatch()),
                    fm(F.INDIRIZZO_RESIDENZA, F.INDIRIZZO_RESIDENZA, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CU, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('percipiente.nome', F.NOME, cfMatch()), fm('percipiente.cognome', F.COGNOME, cfMatch()),
                    fm('percipiente.codiceFiscale', F.CODICE_FISCALE, cfMatch()),
                    fm('percipiente.dataNascita', F.DATA_NASCITA, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.MOD_730, enabled: true,
                fieldMappings: [
                    fm('contribuente.nome', F.NOME, cfMatch()), fm('contribuente.cognome', F.COGNOME, cfMatch()),
                    fm('contribuente.codiceFiscale', F.CODICE_FISCALE, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.REDDITI_PF, enabled: true,
                fieldMappings: [
                    fm('contribuente.nome', F.NOME, cfMatch()), fm('contribuente.cognome', F.COGNOME, cfMatch()),
                    fm('contribuente.codiceFiscale', F.CODICE_FISCALE, cfMatch()),
                    fm('contribuente.partitaIva', F.PARTITA_IVA, cfMatch()),
                    fm(F.REGIME, F.REGIME, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.BUSTA_PAGA, enabled: true,
                fieldMappings: [
                    fm('dipendente.nome', F.NOME, cfMatch()), fm('dipendente.cognome', F.COGNOME, cfMatch()),
                    fm('dipendente.codiceFiscale', F.CODICE_FISCALE, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CONTRATTO_LAVORO, enabled: true,
                fieldMappings: [
                    fm('dipendente.nome', F.NOME, cfMatch()), fm('dipendente.cognome', F.COGNOME, cfMatch()),
                    fm('dipendente.codiceFiscale', F.CODICE_FISCALE, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.ISEE, enabled: true,
                fieldMappings: [
                    fm('dichiarante.nome', F.NOME, cfMatch()), fm('dichiarante.cognome', F.COGNOME, cfMatch()),
                    fm('dichiarante.codiceFiscale', F.CODICE_FISCALE, cfMatch()),
                ],
            },
        ],
        conditionalRequirements: [
            {
                docTypeId: DOC_IDS.MOD_730, enabled: true,
                conditions: [
                    { sourceDocTypeId: DOC_IDS.CU, field: F.REDDITO_LORDO, operator: 'exists', value: 'true' },
                ],
            },
            {
                docTypeId: DOC_IDS.REDDITI_PF, enabled: true,
                conditions: [
                    { sourceDocTypeId: DOC_IDS.FATTURA, field: 'emittente.partitaIva', operator: 'exists', value: 'true' },
                ],
            },
        ],
    },
    {
        id: ENTITY_IDS.AZIENDA,
        name: 'Azienda',
        icon: 'building',
        color: '#8b5cf6',
        displayOrder: 1,
        fieldOrder: [F.RAGIONE_SOCIALE, F.PARTITA_IVA, F.CODICE_FISCALE, F.SEDE_LEGALE, F.CODICE_ATECO, F.FORMA_GIURIDICA, F.LEGALE_RAPPRESENTANTE],
        dataSources: [
            {
                docTypeId: DOC_IDS.VISURA_CAMERALE, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.RAGIONE_SOCIALE, F.RAGIONE_SOCIALE, pivaMatch()),
                    fm(F.PARTITA_IVA, F.PARTITA_IVA, pivaMatch()),
                    fm(F.CODICE_FISCALE, F.CODICE_FISCALE, pivaMatch()),
                    fm(F.SEDE_LEGALE, F.SEDE_LEGALE, pivaMatch()),
                    fm(F.CODICE_ATECO, F.CODICE_ATECO, pivaMatch()),
                    fm(F.DESCRIZIONE_ATECO, F.DESCRIZIONE_ATECO, pivaMatch()),
                    fm(F.FORMA_GIURIDICA, F.FORMA_GIURIDICA, pivaMatch()),
                    fm(F.CAPITALE_SOCIALE, F.CAPITALE_SOCIALE, pivaMatch()),
                    fm(F.LEGALE_RAPPRESENTANTE, F.LEGALE_RAPPRESENTANTE, pivaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.BILANCIO, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.RAGIONE_SOCIALE, F.RAGIONE_SOCIALE, pivaMatch()),
                    fm(F.PARTITA_IVA, F.PARTITA_IVA, pivaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.FATTURA, enabled: true,
                fieldMappings: [
                    fm('emittente.ragioneSociale', F.RAGIONE_SOCIALE, pivaMatch()),
                    fm('emittente.partitaIva', F.PARTITA_IVA, pivaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.IVA_PERIODICA, enabled: true,
                fieldMappings: [
                    fm('contribuente.denominazione', F.RAGIONE_SOCIALE, pivaMatch()),
                    fm('contribuente.partitaIva', F.PARTITA_IVA, pivaMatch()),
                ],
            },
        ],
        conditionalRequirements: [
            {
                docTypeId: DOC_IDS.BILANCIO, enabled: true,
                conditions: [
                    { sourceDocTypeId: DOC_IDS.VISURA_CAMERALE, field: F.FORMA_GIURIDICA, operator: 'contains', value: 'SR' },
                ],
            },
        ],
    },
    {
        id: ENTITY_IDS.ANNO_FISCALE,
        name: 'Anno Fiscale',
        icon: 'calendar',
        color: '#f59e0b',
        displayOrder: 2,
        fieldOrder: [F.ANNO, F.REDDITO_COMPLESSIVO, F.IMPOSTA_NETTA, F.FATTURATO, F.UTILE_ESERCIZIO, 'ivaAnnuale'],
        dataSources: [
            {
                docTypeId: DOC_IDS.MOD_730, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.ANNO, F.ANNO, annoMatch()),
                    fm(F.REDDITO_COMPLESSIVO, F.REDDITO_COMPLESSIVO, annoMatch()),
                    fm(F.IMPOSTA_NETTA, F.IMPOSTA_NETTA, annoMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.REDDITI_PF, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.ANNO, F.ANNO, annoMatch()),
                    fm(F.REDDITO_COMPLESSIVO, F.REDDITO_COMPLESSIVO, annoMatch()),
                    fm(F.IMPOSTA_NETTA, F.IMPOSTA_NETTA, annoMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CU, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.ANNO, F.ANNO, annoMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.BILANCIO, enabled: true,
                fieldMappings: [
                    fm(F.ANNO, F.ANNO, annoMatch()),
                    fm(F.FATTURATO, F.FATTURATO, annoMatch()),
                    fm(F.UTILE_ESERCIZIO, F.UTILE_ESERCIZIO, annoMatch()),
                ],
            },
        ],
        conditionalRequirements: [],
    },
];
