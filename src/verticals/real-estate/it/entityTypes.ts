import type { EntityDataSource, ConditionalRequirement, EntityTypeDef } from '../../../types.js';

import { DOC_IDS } from './documentTypes.js';
import { F } from '../../../countries/it/fields.js';
import { cfMatch, catastoMatch } from '../../../countries/it/matchHelpers.js';

// ─── Entity Type IDs ────────────────────────────────────────────────────────

export const ENTITY_IDS = {
    VENDITORE: 'entity-venditore',
    ACQUIRENTE: 'entity-acquirente',
    IMMOBILE: 'entity-immobile',
    TRANSAZIONE: 'entity-transazione',
} as const;

// ─── Data Sources (Aggregation) ─────────────────────────────────────────────

const venditoreSources: EntityDataSource[] = [
    {
        docTypeId: DOC_IDS.IDENTITA,
        enabled: true,
        isRequired: true,
        fieldMappings: [
            { sourceField: F.NOME, targetField: F.NOME, matchFields: cfMatch() },
            { sourceField: F.COGNOME, targetField: F.COGNOME, matchFields: cfMatch() },
            {
                sourceField: F.CODICE_FISCALE,
                targetField: F.CODICE_FISCALE,
                matchFields: cfMatch(),
            },
            {
                sourceField: F.INDIRIZZO_RESIDENZA,
                targetField: F.INDIRIZZO_RESIDENZA,
                matchFields: cfMatch(),
            },
            { sourceField: F.LUOGO_NASCITA, targetField: F.LUOGO_NASCITA, matchFields: cfMatch() },
            { sourceField: F.DATA_NASCITA, targetField: F.DATA_NASCITA, matchFields: cfMatch() },
            { sourceField: F.STATO_CIVILE, targetField: F.STATO_CIVILE, matchFields: cfMatch() },
        ],
    },
    {
        docTypeId: DOC_IDS.CONTATTO,
        enabled: true,
        isRequired: true,
        fieldMappings: [
            { sourceField: F.TELEFONO_CELLULARE, targetField: F.TELEFONO, matchFields: cfMatch() },
            { sourceField: F.EMAIL, targetField: F.EMAIL, matchFields: cfMatch() },
        ],
    },
    {
        docTypeId: DOC_IDS.PROVENIENZA,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: 'acquirenti.nome', targetField: F.NOME, matchFields: cfMatch() },
            { sourceField: 'acquirenti.cognome', targetField: F.COGNOME, matchFields: cfMatch() },
            {
                sourceField: 'acquirenti.codiceFiscale',
                targetField: F.CODICE_FISCALE,
                matchFields: cfMatch(),
            },
            {
                sourceField: 'acquirenti.statoCivile',
                targetField: F.STATO_CIVILE,
                matchFields: cfMatch(),
            },
            {
                sourceField: 'acquirenti.regimePatrimoniale',
                targetField: F.REGIME_PATRIMONIALE,
                matchFields: cfMatch(),
            },
        ],
    },
    {
        docTypeId: DOC_IDS.PRELIMINARE,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: 'venditori.nome', targetField: F.NOME, matchFields: cfMatch() },
            { sourceField: 'venditori.cognome', targetField: F.COGNOME, matchFields: cfMatch() },
            {
                sourceField: 'venditori.codiceFiscale',
                targetField: F.CODICE_FISCALE,
                matchFields: cfMatch(),
            },
            {
                sourceField: 'venditori.statoCivile',
                targetField: F.STATO_CIVILE,
                matchFields: cfMatch(),
            },
        ],
    },
    {
        docTypeId: DOC_IDS.TESSERA_SAN,
        enabled: true,
        fieldMappings: [
            {
                sourceField: F.CODICE_FISCALE,
                targetField: F.CODICE_FISCALE,
                matchFields: cfMatch(),
            },
            { sourceField: F.COGNOME, targetField: F.COGNOME, matchFields: cfMatch() },
            { sourceField: F.NOME, targetField: F.NOME, matchFields: cfMatch() },
        ],
    },
    {
        docTypeId: DOC_IDS.VISURA,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            {
                sourceField: 'intestatiCatastali.cognome',
                targetField: F.COGNOME,
                matchFields: cfMatch(),
            },
            { sourceField: 'intestatiCatastali.nome', targetField: F.NOME, matchFields: cfMatch() },
            {
                sourceField: 'intestatiCatastali.codiceFiscale',
                targetField: F.CODICE_FISCALE,
                matchFields: cfMatch(),
            },
            {
                sourceField: 'intestatiCatastali.dataNascita',
                targetField: F.DATA_NASCITA,
                matchFields: cfMatch(),
            },
            {
                sourceField: 'intestatiCatastali.luogoNascita',
                targetField: F.LUOGO_NASCITA,
                matchFields: cfMatch(),
            },
        ],
    },
    // Conditional document sources — pull data when these docs are present
    {
        docTypeId: DOC_IDS.MATRIMONIO,
        enabled: true,
        fieldMappings: [
            {
                sourceField: F.REGIME_PATRIMONIALE,
                targetField: F.REGIME_PATRIMONIALE,
                matchFields: cfMatch(),
            },
        ],
    },
    {
        docTypeId: DOC_IDS.RESIDENZA,
        enabled: true,
        fieldMappings: [
            {
                sourceField: F.INDIRIZZO,
                targetField: F.INDIRIZZO_RESIDENZA,
                matchFields: cfMatch(),
            },
        ],
    },
    {
        docTypeId: DOC_IDS.PROCURA,
        enabled: true,
        fieldMappings: [
            { sourceField: 'nomeMandante', targetField: F.NOME, matchFields: cfMatch() },
            { sourceField: 'cognomeMandante', targetField: F.COGNOME, matchFields: cfMatch() },
            {
                sourceField: 'codiceFiscaleMandante',
                targetField: F.CODICE_FISCALE,
                matchFields: cfMatch(),
            },
        ],
    },
];

const acquirenteSources: EntityDataSource[] = [
    {
        docTypeId: DOC_IDS.IDENTITA,
        enabled: true,
        isRequired: true,
        fieldMappings: [
            { sourceField: F.NOME, targetField: F.NOME, matchFields: cfMatch() },
            { sourceField: F.COGNOME, targetField: F.COGNOME, matchFields: cfMatch() },
            {
                sourceField: F.CODICE_FISCALE,
                targetField: F.CODICE_FISCALE,
                matchFields: cfMatch(),
            },
            {
                sourceField: F.INDIRIZZO_RESIDENZA,
                targetField: F.INDIRIZZO_RESIDENZA,
                matchFields: cfMatch(),
            },
            { sourceField: F.LUOGO_NASCITA, targetField: F.LUOGO_NASCITA, matchFields: cfMatch() },
            { sourceField: F.DATA_NASCITA, targetField: F.DATA_NASCITA, matchFields: cfMatch() },
            { sourceField: F.STATO_CIVILE, targetField: F.STATO_CIVILE, matchFields: cfMatch() },
        ],
    },
    {
        docTypeId: DOC_IDS.CONTATTO,
        enabled: true,
        isRequired: true,
        fieldMappings: [
            { sourceField: F.TELEFONO_CELLULARE, targetField: F.TELEFONO, matchFields: cfMatch() },
            { sourceField: F.EMAIL, targetField: F.EMAIL, matchFields: cfMatch() },
        ],
    },
    {
        docTypeId: DOC_IDS.PRELIMINARE,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: 'acquirenti.nome', targetField: F.NOME, matchFields: cfMatch() },
            { sourceField: 'acquirenti.cognome', targetField: F.COGNOME, matchFields: cfMatch() },
            {
                sourceField: 'acquirenti.codiceFiscale',
                targetField: F.CODICE_FISCALE,
                matchFields: cfMatch(),
            },
            {
                sourceField: 'acquirenti.statoCivile',
                targetField: F.STATO_CIVILE,
                matchFields: cfMatch(),
            },
        ],
    },
    {
        docTypeId: DOC_IDS.PROPOSTA,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: 'proponenti.nome', targetField: F.NOME, matchFields: cfMatch() },
            { sourceField: 'proponenti.cognome', targetField: F.COGNOME, matchFields: cfMatch() },
            {
                sourceField: 'proponenti.codiceFiscale',
                targetField: F.CODICE_FISCALE,
                matchFields: cfMatch(),
            },
        ],
    },
    {
        docTypeId: DOC_IDS.TESSERA_SAN,
        enabled: true,
        fieldMappings: [
            {
                sourceField: F.CODICE_FISCALE,
                targetField: F.CODICE_FISCALE,
                matchFields: cfMatch(),
            },
            { sourceField: F.COGNOME, targetField: F.COGNOME, matchFields: cfMatch() },
            { sourceField: F.NOME, targetField: F.NOME, matchFields: cfMatch() },
        ],
    },
    // Conditional document sources
    {
        docTypeId: DOC_IDS.MATRIMONIO,
        enabled: true,
        fieldMappings: [
            {
                sourceField: F.REGIME_PATRIMONIALE,
                targetField: F.REGIME_PATRIMONIALE,
                matchFields: cfMatch(),
            },
        ],
    },
    {
        docTypeId: DOC_IDS.RESIDENZA,
        enabled: true,
        fieldMappings: [
            {
                sourceField: F.INDIRIZZO,
                targetField: F.INDIRIZZO_RESIDENZA,
                matchFields: cfMatch(),
            },
        ],
    },
    {
        docTypeId: DOC_IDS.PROCURA,
        enabled: true,
        fieldMappings: [
            { sourceField: 'nomeMandante', targetField: F.NOME, matchFields: cfMatch() },
            { sourceField: 'cognomeMandante', targetField: F.COGNOME, matchFields: cfMatch() },
            {
                sourceField: 'codiceFiscaleMandante',
                targetField: F.CODICE_FISCALE,
                matchFields: cfMatch(),
            },
        ],
    },
    // Bank loan sources — link buyer to loan data
    {
        docTypeId: DOC_IDS.DELIBERA_MUTUO,
        enabled: true,
        fieldMappings: [
            {
                sourceField: 'codiceFiscaleMutuatario',
                targetField: F.CODICE_FISCALE,
                matchFields: cfMatch(),
            },
        ],
    },
    {
        docTypeId: DOC_IDS.CONTRATTO_MUTUO,
        enabled: true,
        fieldMappings: [
            {
                sourceField: 'codiceFiscaleMutuatario',
                targetField: F.CODICE_FISCALE,
                matchFields: cfMatch(),
            },
        ],
    },
];

const immobileSources: EntityDataSource[] = [
    {
        docTypeId: DOC_IDS.PROVENIENZA,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: 'immobili.foglio', targetField: F.FOGLIO, matchFields: catastoMatch() },
            {
                sourceField: 'immobili.particella',
                targetField: F.PARTICELLA,
                matchFields: catastoMatch(),
            },
            {
                sourceField: 'immobili.subalterno',
                targetField: F.SUBALTERNO,
                matchFields: catastoMatch(),
            },
            { sourceField: F.INDIRIZZO, targetField: F.INDIRIZZO, matchFields: catastoMatch() },
            {
                sourceField: 'immobili.categoria',
                targetField: F.CATEGORIA,
                matchFields: catastoMatch(),
            },
            { sourceField: 'immobili.piano', targetField: F.PIANO, matchFields: catastoMatch() },
            {
                sourceField: 'immobili.consistenza',
                targetField: F.CONSISTENZA,
                matchFields: catastoMatch(),
            },
            {
                sourceField: 'immobili.rendita',
                targetField: F.RENDITA,
                matchFields: catastoMatch(),
            },
        ],
    },
    {
        docTypeId: DOC_IDS.VISURA,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: F.FOGLIO, targetField: F.FOGLIO, matchFields: catastoMatch() },
            { sourceField: F.PARTICELLA, targetField: F.PARTICELLA, matchFields: catastoMatch() },
            { sourceField: F.SUBALTERNO, targetField: F.SUBALTERNO, matchFields: catastoMatch() },
            { sourceField: F.SEZIONE, targetField: F.SEZIONE, matchFields: catastoMatch() },
            {
                sourceField: F.COMUNE_CATASTALE,
                targetField: F.COMUNE_CATASTALE,
                matchFields: catastoMatch(),
            },
            {
                sourceField: 'indirizzoCatastale',
                targetField: F.INDIRIZZO,
                matchFields: catastoMatch(),
            },
            { sourceField: F.PIANO, targetField: F.PIANO, matchFields: catastoMatch() },
            {
                sourceField: 'categoriaCatastale',
                targetField: F.CATEGORIA,
                matchFields: catastoMatch(),
            },
            { sourceField: F.CLASSE, targetField: F.CLASSE, matchFields: catastoMatch() },
            {
                sourceField: 'renditaCatastale',
                targetField: F.RENDITA,
                matchFields: catastoMatch(),
            },
            { sourceField: F.CONSISTENZA, targetField: F.CONSISTENZA, matchFields: catastoMatch() },
            { sourceField: F.SUPERFICIE, targetField: F.SUPERFICIE, matchFields: catastoMatch() },
        ],
    },
    {
        docTypeId: DOC_IDS.PLANIMETRIA,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: F.FOGLIO, targetField: F.FOGLIO, matchFields: catastoMatch() },
            { sourceField: F.PARTICELLA, targetField: F.PARTICELLA, matchFields: catastoMatch() },
            { sourceField: F.SUBALTERNO, targetField: F.SUBALTERNO, matchFields: catastoMatch() },
        ],
    },
    {
        docTypeId: DOC_IDS.APE,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: F.FOGLIO, targetField: F.FOGLIO, matchFields: catastoMatch() },
            { sourceField: F.PARTICELLA, targetField: F.PARTICELLA, matchFields: catastoMatch() },
            { sourceField: 'subalterni', targetField: F.SUBALTERNO, matchFields: catastoMatch() },
            { sourceField: F.INDIRIZZO, targetField: F.INDIRIZZO, matchFields: catastoMatch() },
            {
                sourceField: F.CLASSE_ENERGETICA,
                targetField: F.CLASSE_ENERGETICA,
                matchFields: catastoMatch(),
            },
        ],
    },
    {
        docTypeId: DOC_IDS.IPOTECARIA,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: F.FOGLIO, targetField: F.FOGLIO, matchFields: catastoMatch() },
            { sourceField: F.PARTICELLA, targetField: F.PARTICELLA, matchFields: catastoMatch() },
            { sourceField: F.SUBALTERNO, targetField: F.SUBALTERNO, matchFields: catastoMatch() },
            { sourceField: F.INDIRIZZO, targetField: F.INDIRIZZO, matchFields: catastoMatch() },
        ],
    },
    {
        docTypeId: DOC_IDS.AGIBILITA,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: F.FOGLIO, targetField: F.FOGLIO, matchFields: catastoMatch() },
            { sourceField: F.PARTICELLA, targetField: F.PARTICELLA, matchFields: catastoMatch() },
            { sourceField: F.SUBALTERNO, targetField: F.SUBALTERNO, matchFields: catastoMatch() },
            { sourceField: F.INDIRIZZO, targetField: F.INDIRIZZO, matchFields: catastoMatch() },
            {
                sourceField: F.DESTINAZIONE_USO,
                targetField: F.DESTINAZIONE_USO,
                matchFields: catastoMatch(),
            },
        ],
    },
    {
        docTypeId: DOC_IDS.CONFORMITA_URB,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: F.FOGLIO, targetField: F.FOGLIO, matchFields: catastoMatch() },
            { sourceField: F.PARTICELLA, targetField: F.PARTICELLA, matchFields: catastoMatch() },
            { sourceField: F.SUBALTERNO, targetField: F.SUBALTERNO, matchFields: catastoMatch() },
            { sourceField: F.INDIRIZZO, targetField: F.INDIRIZZO, matchFields: catastoMatch() },
        ],
    },
    {
        docTypeId: DOC_IDS.CONFORMITA_IMP,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: F.FOGLIO, targetField: F.FOGLIO, matchFields: catastoMatch() },
            { sourceField: F.PARTICELLA, targetField: F.PARTICELLA, matchFields: catastoMatch() },
            { sourceField: F.SUBALTERNO, targetField: F.SUBALTERNO, matchFields: catastoMatch() },
            { sourceField: F.INDIRIZZO, targetField: F.INDIRIZZO, matchFields: catastoMatch() },
        ],
    },
    // Conditional document sources
    {
        docTypeId: DOC_IDS.SUCCESSIONE,
        enabled: true,
        fieldMappings: [
            { sourceField: F.FOGLIO, targetField: F.FOGLIO, matchFields: catastoMatch() },
            { sourceField: F.PARTICELLA, targetField: F.PARTICELLA, matchFields: catastoMatch() },
            { sourceField: F.SUBALTERNO, targetField: F.SUBALTERNO, matchFields: catastoMatch() },
        ],
    },
    {
        docTypeId: DOC_IDS.CONDOMINIALE,
        enabled: true,
        fieldMappings: [
            {
                sourceField: F.INDIRIZZO,
                targetField: F.INDIRIZZO,
                matchFields: [{ field: F.INDIRIZZO, fuzzyThreshold: 0.3 }],
            },
        ],
    },
    {
        docTypeId: DOC_IDS.CDU,
        enabled: true,
        fieldMappings: [
            { sourceField: F.FOGLIO, targetField: F.FOGLIO, matchFields: catastoMatch() },
            { sourceField: F.PARTICELLA, targetField: F.PARTICELLA, matchFields: catastoMatch() },
            {
                sourceField: F.DESTINAZIONE_URBANISTICA,
                targetField: F.DESTINAZIONE_URBANISTICA,
                matchFields: catastoMatch(),
            },
        ],
    },
    // Bank loan sources — link property to appraisal
    {
        docTypeId: DOC_IDS.PERIZIA_BANCARIA,
        enabled: true,
        fieldMappings: [
            { sourceField: F.FOGLIO, targetField: F.FOGLIO, matchFields: catastoMatch() },
            { sourceField: F.PARTICELLA, targetField: F.PARTICELLA, matchFields: catastoMatch() },
            { sourceField: F.SUBALTERNO, targetField: F.SUBALTERNO, matchFields: catastoMatch() },
            { sourceField: F.INDIRIZZO, targetField: F.INDIRIZZO, matchFields: catastoMatch() },
        ],
    },
];

// ─── Conditional Requirements (IF-THEN validation) ─────────────────────────

/** Shared conditional trigger: check stato civile from identity doc and atto provenienza */
const vedovanzaConditions = [
    {
        sourceDocTypeId: DOC_IDS.PROVENIENZA,
        field: 'acquirenti.statoCivile',
        operator: 'contains' as const,
        value: 'vedov',
    },
    {
        sourceDocTypeId: DOC_IDS.IDENTITA,
        field: F.STATO_CIVILE,
        operator: 'contains' as const,
        value: 'vedov',
    },
];

const coniugatoConditions = [
    {
        sourceDocTypeId: DOC_IDS.PROVENIENZA,
        field: 'acquirenti.statoCivile',
        operator: 'contains' as const,
        value: 'coniugat',
    },
    {
        sourceDocTypeId: DOC_IDS.IDENTITA,
        field: F.STATO_CIVILE,
        operator: 'contains' as const,
        value: 'coniugat',
    },
];

const separazioneDivorzioConditions = [
    {
        sourceDocTypeId: DOC_IDS.PROVENIENZA,
        field: 'acquirenti.statoCivile',
        operator: 'contains' as const,
        value: 'separat',
    },
    {
        sourceDocTypeId: DOC_IDS.PROVENIENZA,
        field: 'acquirenti.statoCivile',
        operator: 'contains' as const,
        value: 'divorziat',
    },
    {
        sourceDocTypeId: DOC_IDS.IDENTITA,
        field: F.STATO_CIVILE,
        operator: 'contains' as const,
        value: 'separat',
    },
    {
        sourceDocTypeId: DOC_IDS.IDENTITA,
        field: F.STATO_CIVILE,
        operator: 'contains' as const,
        value: 'divorziat',
    },
];

const venditoreRequired: ConditionalRequirement[] = [
    {
        docTypeId: DOC_IDS.MORTE,
        enabled: true,
        conditions: vedovanzaConditions,
    },
    {
        docTypeId: DOC_IDS.FAMIGLIA,
        enabled: true,
        conditions: vedovanzaConditions,
    },
    {
        docTypeId: DOC_IDS.MATRIMONIO,
        enabled: true,
        conditions: coniugatoConditions,
    },
    {
        docTypeId: DOC_IDS.SEPARAZIONE,
        enabled: true,
        conditions: separazioneDivorzioConditions,
    },
    {
        docTypeId: DOC_IDS.MATRIMONIO,
        enabled: true,
        conditions: separazioneDivorzioConditions,
    },
];

const acquirenteRequired: ConditionalRequirement[] = [
    {
        docTypeId: DOC_IDS.MORTE,
        enabled: true,
        conditions: [
            {
                sourceDocTypeId: DOC_IDS.PRELIMINARE,
                field: 'acquirenti.statoCivile',
                operator: 'contains',
                value: 'vedov',
            },
            {
                sourceDocTypeId: DOC_IDS.IDENTITA,
                field: F.STATO_CIVILE,
                operator: 'contains',
                value: 'vedov',
            },
        ],
    },
    {
        docTypeId: DOC_IDS.FAMIGLIA,
        enabled: true,
        conditions: [
            {
                sourceDocTypeId: DOC_IDS.PRELIMINARE,
                field: 'acquirenti.statoCivile',
                operator: 'contains',
                value: 'vedov',
            },
            {
                sourceDocTypeId: DOC_IDS.IDENTITA,
                field: F.STATO_CIVILE,
                operator: 'contains',
                value: 'vedov',
            },
        ],
    },
    {
        docTypeId: DOC_IDS.MATRIMONIO,
        enabled: true,
        conditions: [
            {
                sourceDocTypeId: DOC_IDS.PRELIMINARE,
                field: 'acquirenti.statoCivile',
                operator: 'contains',
                value: 'coniugat',
            },
            {
                sourceDocTypeId: DOC_IDS.IDENTITA,
                field: F.STATO_CIVILE,
                operator: 'contains',
                value: 'coniugat',
            },
        ],
    },
    {
        docTypeId: DOC_IDS.SEPARAZIONE,
        enabled: true,
        conditions: [
            {
                sourceDocTypeId: DOC_IDS.PRELIMINARE,
                field: 'acquirenti.statoCivile',
                operator: 'contains',
                value: 'separat',
            },
            {
                sourceDocTypeId: DOC_IDS.PRELIMINARE,
                field: 'acquirenti.statoCivile',
                operator: 'contains',
                value: 'divorziat',
            },
            {
                sourceDocTypeId: DOC_IDS.IDENTITA,
                field: F.STATO_CIVILE,
                operator: 'contains',
                value: 'separat',
            },
            {
                sourceDocTypeId: DOC_IDS.IDENTITA,
                field: F.STATO_CIVILE,
                operator: 'contains',
                value: 'divorziat',
            },
        ],
    },
    {
        docTypeId: DOC_IDS.MATRIMONIO,
        enabled: true,
        conditions: [
            {
                sourceDocTypeId: DOC_IDS.PRELIMINARE,
                field: 'acquirenti.statoCivile',
                operator: 'contains',
                value: 'separat',
            },
            {
                sourceDocTypeId: DOC_IDS.PRELIMINARE,
                field: 'acquirenti.statoCivile',
                operator: 'contains',
                value: 'divorziat',
            },
            {
                sourceDocTypeId: DOC_IDS.IDENTITA,
                field: F.STATO_CIVILE,
                operator: 'contains',
                value: 'separat',
            },
            {
                sourceDocTypeId: DOC_IDS.IDENTITA,
                field: F.STATO_CIVILE,
                operator: 'contains',
                value: 'divorziat',
            },
        ],
    },
];

const immobileRequired: ConditionalRequirement[] = [
    {
        docTypeId: DOC_IDS.SUCCESSIONE,
        enabled: true,
        conditions: [
            {
                sourceDocTypeId: DOC_IDS.PROVENIENZA,
                field: 'tipoProvenienza',
                operator: 'equals',
                value: 'successione',
            },
        ],
    },
    {
        docTypeId: DOC_IDS.EREDITA,
        enabled: true,
        conditions: [
            {
                sourceDocTypeId: DOC_IDS.PROVENIENZA,
                field: 'tipoProvenienza',
                operator: 'equals',
                value: 'successione',
            },
        ],
    },
    {
        docTypeId: DOC_IDS.FAMIGLIA,
        enabled: true,
        conditions: [
            {
                sourceDocTypeId: DOC_IDS.PROVENIENZA,
                field: 'tipoProvenienza',
                operator: 'equals',
                value: 'donazione',
            },
        ],
    },
    {
        docTypeId: DOC_IDS.CONDOMINIALE,
        enabled: true,
        conditions: [
            {
                sourceDocTypeId: DOC_IDS.VISURA,
                field: 'categoriaCatastale',
                operator: 'contains',
                value: 'A/',
            },
        ],
    },
    {
        docTypeId: DOC_IDS.CDU,
        enabled: true,
        conditions: [{ sourceDocTypeId: DOC_IDS.VISURA, field: 'qualita', operator: 'exists' }],
    },
    {
        docTypeId: DOC_IDS.PERIZIA_BANCARIA,
        enabled: true,
        conditions: [
            { sourceDocTypeId: DOC_IDS.DELIBERA_MUTUO, field: F.IMPORTO_MUTUO, operator: 'exists' },
        ],
    },
];

// ─── Entity Types ───────────────────────────────────────────────────────────

const venditore: EntityTypeDef = {
    id: ENTITY_IDS.VENDITORE,
    name: 'Venditore',
    icon: 'user-minus',
    color: '#ef4444',
    displayOrder: 0,
    fieldOrder: [
        F.NOME,
        F.COGNOME,
        F.CODICE_FISCALE,
        F.DATA_NASCITA,
        F.LUOGO_NASCITA,
        F.INDIRIZZO_RESIDENZA,
        F.STATO_CIVILE,
        F.REGIME_PATRIMONIALE,
        F.TELEFONO,
        F.EMAIL,
    ],
    dataSources: venditoreSources,
    conditionalRequirements: venditoreRequired,
};

const acquirente: EntityTypeDef = {
    id: ENTITY_IDS.ACQUIRENTE,
    name: 'Acquirente',
    icon: 'user-plus',
    color: '#22c55e',
    displayOrder: 2,
    fieldOrder: [
        F.NOME,
        F.COGNOME,
        F.CODICE_FISCALE,
        F.DATA_NASCITA,
        F.LUOGO_NASCITA,
        F.INDIRIZZO_RESIDENZA,
        F.STATO_CIVILE,
        F.REGIME_PATRIMONIALE,
        F.TELEFONO,
        F.EMAIL,
    ],
    dataSources: acquirenteSources,
    conditionalRequirements: acquirenteRequired,
};

const immobile: EntityTypeDef = {
    id: ENTITY_IDS.IMMOBILE,
    name: 'Immobile',
    icon: 'home',
    color: '#3b82f6',
    displayOrder: 1,
    fieldOrder: [
        F.FOGLIO,
        F.PARTICELLA,
        F.SUBALTERNO,
        F.INDIRIZZO,
        F.COMUNE_CATASTALE,
        F.SEZIONE,
        F.CATEGORIA,
        F.CLASSE,
        F.PIANO,
        F.CONSISTENZA,
        F.RENDITA,
        F.SUPERFICIE,
        F.CLASSE_ENERGETICA,
        F.DESTINAZIONE_USO,
        F.DESTINAZIONE_URBANISTICA,
    ],
    dataSources: immobileSources,
    conditionalRequirements: immobileRequired,
};

// ─── Transazione Data Sources ───────────────────────────────────────────────

const transazioneSources: EntityDataSource[] = [
    {
        docTypeId: DOC_IDS.PRELIMINARE,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: F.PREZZO, targetField: F.PREZZO },
            { sourceField: F.CAPARRA, targetField: F.CAPARRA },
            { sourceField: 'dataStipula', targetField: F.DATA_STIPULA_PRELIM },
            { sourceField: F.MEDIATORE, targetField: F.MEDIATORE },
        ],
    },
    {
        docTypeId: DOC_IDS.PROPOSTA,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [{ sourceField: F.PREZZO_OFFERTO, targetField: F.PREZZO_OFFERTO }],
    },
    {
        docTypeId: DOC_IDS.DELIBERA_MUTUO,
        enabled: true,
        fieldMappings: [
            { sourceField: F.IMPORTO_MUTUO, targetField: F.IMPORTO_MUTUO },
            { sourceField: F.BANCA, targetField: F.BANCA },
            { sourceField: F.TIPO_TASSO, targetField: F.TIPO_TASSO },
        ],
    },
    {
        docTypeId: DOC_IDS.CONTRATTO_MUTUO,
        enabled: true,
        fieldMappings: [
            { sourceField: F.IMPORTO_MUTUO, targetField: F.IMPORTO_MUTUO_EROGATO },
            { sourceField: F.RATA_MENSILE, targetField: F.RATA_MENSILE },
            { sourceField: F.TASSO_INTERESSE, targetField: F.TASSO_INTERESSE },
        ],
    },
    {
        docTypeId: DOC_IDS.MEZZI_PAGAMENTO,
        enabled: true,
        isRequired: true,
        fieldMappings: [
            { sourceField: F.IMPORTO_TOTALE, targetField: F.IMPORTO_TOTALE },
            { sourceField: F.MEDIATORE, targetField: F.MEDIATORE },
            { sourceField: F.PROVVIGIONE, targetField: F.PROVVIGIONE },
        ],
    },
];

const transazione: EntityTypeDef = {
    id: ENTITY_IDS.TRANSAZIONE,
    name: 'Transazione',
    icon: 'banknote',
    color: '#f59e0b',
    displayOrder: 3,
    fieldOrder: [
        F.PREZZO,
        F.PREZZO_OFFERTO,
        F.CAPARRA,
        F.MEDIATORE,
        F.PROVVIGIONE,
        F.IMPORTO_MUTUO,
        F.BANCA,
        F.TIPO_TASSO,
        F.IMPORTO_MUTUO_EROGATO,
        F.RATA_MENSILE,
        F.TASSO_INTERESSE,
        F.IMPORTO_TOTALE,
        F.DATA_STIPULA_PRELIM,
    ],
    dataSources: transazioneSources,
    conditionalRequirements: [],
};

// ─── Export ─────────────────────────────────────────────────────────────────

export const entityTypes: EntityTypeDef[] = [venditore, immobile, acquirente, transazione];
