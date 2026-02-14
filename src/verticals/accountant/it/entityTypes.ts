/**
 * Accountant / Tax Firm Italy — Entity Type Definitions
 *
 * 3 entity types: Cliente, Azienda, Anno Fiscale.
 * Aggregates data from identity docs, invoices, tax declarations,
 * payroll, balance sheets, and fiscal documents.
 */
import type { EntityTypeDef } from '../../../types';
import { DOC_IDS } from './documentTypes';

// ─── Match helpers ──────────────────────────────────────────────────────────

const cfMatch = () => [
    { field: 'codiceFiscale', fuzzyThreshold: 0.2 },
    { field: 'nome', fuzzyThreshold: 0 },
    { field: 'cognome', fuzzyThreshold: 0 },
];
const pivaMatch = () => [
    { field: 'partitaIva', fuzzyThreshold: 0 },
    { field: 'ragioneSociale', fuzzyThreshold: 0.2 },
];
const annoMatch = () => [
    { field: 'anno', fuzzyThreshold: 0 },
];
const fm = (sourceField: string, targetField: string, matchFields?: Array<{ field: string; fuzzyThreshold: number }>) =>
    ({ sourceField, targetField, ...(matchFields ? { matchFields } : {}) });

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
        fieldOrder: ['nome', 'cognome', 'codiceFiscale', 'dataNascita', 'luogoNascita', 'indirizzoDiResidenza', 'partitaIva', 'regime'],
        dataSources: [
            {
                docTypeId: DOC_IDS.IDENTITA, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm('nome', 'nome', cfMatch()), fm('cognome', 'cognome', cfMatch()),
                    fm('codiceFiscale', 'codiceFiscale', cfMatch()),
                    fm('dataNascita', 'dataNascita', cfMatch()), fm('luogoNascita', 'luogoNascita', cfMatch()),
                    fm('indirizzoDiResidenza', 'indirizzoDiResidenza', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CU, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('percipiente.nome', 'nome', cfMatch()), fm('percipiente.cognome', 'cognome', cfMatch()),
                    fm('percipiente.codiceFiscale', 'codiceFiscale', cfMatch()),
                    fm('percipiente.dataNascita', 'dataNascita', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.MOD_730, enabled: true,
                fieldMappings: [
                    fm('contribuente.nome', 'nome', cfMatch()), fm('contribuente.cognome', 'cognome', cfMatch()),
                    fm('contribuente.codiceFiscale', 'codiceFiscale', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.REDDITI_PF, enabled: true,
                fieldMappings: [
                    fm('contribuente.nome', 'nome', cfMatch()), fm('contribuente.cognome', 'cognome', cfMatch()),
                    fm('contribuente.codiceFiscale', 'codiceFiscale', cfMatch()),
                    fm('contribuente.partitaIva', 'partitaIva', cfMatch()),
                    fm('regime', 'regime', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.BUSTA_PAGA, enabled: true,
                fieldMappings: [
                    fm('dipendente.nome', 'nome', cfMatch()), fm('dipendente.cognome', 'cognome', cfMatch()),
                    fm('dipendente.codiceFiscale', 'codiceFiscale', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CONTRATTO_LAVORO, enabled: true,
                fieldMappings: [
                    fm('dipendente.nome', 'nome', cfMatch()), fm('dipendente.cognome', 'cognome', cfMatch()),
                    fm('dipendente.codiceFiscale', 'codiceFiscale', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.ISEE, enabled: true,
                fieldMappings: [
                    fm('dichiarante.nome', 'nome', cfMatch()), fm('dichiarante.cognome', 'cognome', cfMatch()),
                    fm('dichiarante.codiceFiscale', 'codiceFiscale', cfMatch()),
                ],
            },
        ],
        conditionalRequirements: [
            {
                docTypeId: DOC_IDS.MOD_730, enabled: true,
                conditions: [
                    { sourceDocTypeId: DOC_IDS.CU, field: 'redditoLordo', operator: 'exists', value: 'true' },
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
        fieldOrder: ['ragioneSociale', 'partitaIva', 'codiceFiscale', 'sedeLegale', 'codiceAteco', 'formaGiuridica', 'legaleRappresentante'],
        dataSources: [
            {
                docTypeId: DOC_IDS.VISURA_CAMERALE, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm('ragioneSociale', 'ragioneSociale', pivaMatch()),
                    fm('partitaIva', 'partitaIva', pivaMatch()),
                    fm('codiceFiscale', 'codiceFiscale', pivaMatch()),
                    fm('sedeLegale', 'sedeLegale', pivaMatch()),
                    fm('codiceAteco', 'codiceAteco', pivaMatch()),
                    fm('descrizioneAteco', 'descrizioneAteco', pivaMatch()),
                    fm('formaGiuridica', 'formaGiuridica', pivaMatch()),
                    fm('capitaleSociale', 'capitaleSociale', pivaMatch()),
                    fm('legaleRappresentante', 'legaleRappresentante', pivaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.BILANCIO, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('ragioneSociale', 'ragioneSociale', pivaMatch()),
                    fm('partitaIva', 'partitaIva', pivaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.FATTURA, enabled: true,
                fieldMappings: [
                    fm('emittente.ragioneSociale', 'ragioneSociale', pivaMatch()),
                    fm('emittente.partitaIva', 'partitaIva', pivaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.IVA_PERIODICA, enabled: true,
                fieldMappings: [
                    fm('contribuente.denominazione', 'ragioneSociale', pivaMatch()),
                    fm('contribuente.partitaIva', 'partitaIva', pivaMatch()),
                ],
            },
        ],
        conditionalRequirements: [
            {
                docTypeId: DOC_IDS.BILANCIO, enabled: true,
                conditions: [
                    { sourceDocTypeId: DOC_IDS.VISURA_CAMERALE, field: 'formaGiuridica', operator: 'contains', value: 'SR' },
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
        fieldOrder: ['anno', 'redditoComplessivo', 'impostaNetta', 'fatturato', 'utileEsercizio', 'ivaAnnuale'],
        dataSources: [
            {
                docTypeId: DOC_IDS.MOD_730, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('anno', 'anno', annoMatch()),
                    fm('redditoComplessivo', 'redditoComplessivo', annoMatch()),
                    fm('impostaNetta', 'impostaNetta', annoMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.REDDITI_PF, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('anno', 'anno', annoMatch()),
                    fm('redditoComplessivo', 'redditoComplessivo', annoMatch()),
                    fm('impostaNetta', 'impostaNetta', annoMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CU, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('anno', 'anno', annoMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.BILANCIO, enabled: true,
                fieldMappings: [
                    fm('anno', 'anno', annoMatch()),
                    fm('fatturato', 'fatturato', annoMatch()),
                    fm('utileEsercizio', 'utileEsercizio', annoMatch()),
                ],
            },
        ],
        conditionalRequirements: [],
    },
];
