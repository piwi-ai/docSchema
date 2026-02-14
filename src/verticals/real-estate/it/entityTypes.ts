import type { EntityDataSource, ConditionalRequirement, MatchFieldConfig, EntityTypeDef } from '../../../types';
import { DOC_IDS } from './documentTypes';

// ─── Entity Type IDs ────────────────────────────────────────────────────────

export const ENTITY_IDS = {
    VENDITORE: 'entity-venditore',
    ACQUIRENTE: 'entity-acquirente',
    IMMOBILE: 'entity-immobile',
    TRANSAZIONE: 'entity-transazione',
} as const;

// ─── Shared Match Field Sets ────────────────────────────────────────────────

const CF_NOME_COGNOME: MatchFieldConfig[] = [
    { field: 'codiceFiscale', fuzzyThreshold: 0.2 },
    { field: 'nome', fuzzyThreshold: 0 },
    { field: 'cognome', fuzzyThreshold: 0 },
];
const CATASTO_MATCH: MatchFieldConfig[] = [
    { field: 'foglio', fuzzyThreshold: 0 },
    { field: 'particella', fuzzyThreshold: 0 },
    { field: 'subalterno', fuzzyThreshold: 0 },
];

// ─── Data Sources (Aggregation) ─────────────────────────────────────────────

const venditoreSources: EntityDataSource[] = [
    {
        docTypeId: DOC_IDS.IDENTITA,
        enabled: true,
        isRequired: true,
        fieldMappings: [
            { sourceField: 'nome', targetField: 'nome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'cognome', targetField: 'cognome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'codiceFiscale', targetField: 'codiceFiscale', matchFields: CF_NOME_COGNOME },
            { sourceField: 'indirizzoDiResidenza', targetField: 'indirizzoDiResidenza', matchFields: CF_NOME_COGNOME },
            { sourceField: 'luogoNascita', targetField: 'luogoNascita', matchFields: CF_NOME_COGNOME },
            { sourceField: 'dataNascita', targetField: 'dataNascita', matchFields: CF_NOME_COGNOME },
            { sourceField: 'statoCivile', targetField: 'statoCivile', matchFields: CF_NOME_COGNOME },
        ],
    },
    {
        docTypeId: DOC_IDS.CONTATTO,
        enabled: true,
        isRequired: true,
        fieldMappings: [
            { sourceField: 'telefonoCellulare', targetField: 'telefono', matchFields: CF_NOME_COGNOME },
            { sourceField: 'email', targetField: 'email', matchFields: CF_NOME_COGNOME },
        ],
    },
    {
        docTypeId: DOC_IDS.PROVENIENZA,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: 'acquirenti.nome', targetField: 'nome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'acquirenti.cognome', targetField: 'cognome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'acquirenti.codiceFiscale', targetField: 'codiceFiscale', matchFields: CF_NOME_COGNOME },
            { sourceField: 'acquirenti.statoCivile', targetField: 'statoCivile', matchFields: CF_NOME_COGNOME },
            { sourceField: 'acquirenti.regimePatrimoniale', targetField: 'regimePatrimoniale', matchFields: CF_NOME_COGNOME },
        ],
    },
    {
        docTypeId: DOC_IDS.PRELIMINARE,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: 'venditori.nome', targetField: 'nome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'venditori.cognome', targetField: 'cognome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'venditori.codiceFiscale', targetField: 'codiceFiscale', matchFields: CF_NOME_COGNOME },
            { sourceField: 'venditori.statoCivile', targetField: 'statoCivile', matchFields: CF_NOME_COGNOME },
        ],
    },
    {
        docTypeId: DOC_IDS.TESSERA_SAN,
        enabled: true,
        fieldMappings: [
            { sourceField: 'codiceFiscale', targetField: 'codiceFiscale', matchFields: CF_NOME_COGNOME },
            { sourceField: 'cognome', targetField: 'cognome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'nome', targetField: 'nome', matchFields: CF_NOME_COGNOME },
        ],
    },
    {
        docTypeId: DOC_IDS.VISURA,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: 'intestatiCatastali.cognome', targetField: 'cognome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'intestatiCatastali.nome', targetField: 'nome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'intestatiCatastali.codiceFiscale', targetField: 'codiceFiscale', matchFields: CF_NOME_COGNOME },
            { sourceField: 'intestatiCatastali.dataNascita', targetField: 'dataNascita', matchFields: CF_NOME_COGNOME },
            { sourceField: 'intestatiCatastali.luogoNascita', targetField: 'luogoNascita', matchFields: CF_NOME_COGNOME },
        ],
    },
    // Conditional document sources — pull data when these docs are present
    {
        docTypeId: DOC_IDS.MATRIMONIO,
        enabled: true,
        fieldMappings: [
            { sourceField: 'regimePatrimoniale', targetField: 'regimePatrimoniale', matchFields: CF_NOME_COGNOME },
        ],
    },
    {
        docTypeId: DOC_IDS.RESIDENZA,
        enabled: true,
        fieldMappings: [
            { sourceField: 'indirizzo', targetField: 'indirizzoDiResidenza', matchFields: CF_NOME_COGNOME },
        ],
    },
    {
        docTypeId: DOC_IDS.PROCURA,
        enabled: true,
        fieldMappings: [
            { sourceField: 'nomeMandante', targetField: 'nome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'cognomeMandante', targetField: 'cognome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'codiceFiscaleMandante', targetField: 'codiceFiscale', matchFields: CF_NOME_COGNOME },
        ],
    },
];

const acquirenteSources: EntityDataSource[] = [
    {
        docTypeId: DOC_IDS.IDENTITA,
        enabled: true,
        isRequired: true,
        fieldMappings: [
            { sourceField: 'nome', targetField: 'nome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'cognome', targetField: 'cognome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'codiceFiscale', targetField: 'codiceFiscale', matchFields: CF_NOME_COGNOME },
            { sourceField: 'indirizzoDiResidenza', targetField: 'indirizzoDiResidenza', matchFields: CF_NOME_COGNOME },
            { sourceField: 'luogoNascita', targetField: 'luogoNascita', matchFields: CF_NOME_COGNOME },
            { sourceField: 'dataNascita', targetField: 'dataNascita', matchFields: CF_NOME_COGNOME },
            { sourceField: 'statoCivile', targetField: 'statoCivile', matchFields: CF_NOME_COGNOME },
        ],
    },
    {
        docTypeId: DOC_IDS.CONTATTO,
        enabled: true,
        isRequired: true,
        fieldMappings: [
            { sourceField: 'telefonoCellulare', targetField: 'telefono', matchFields: CF_NOME_COGNOME },
            { sourceField: 'email', targetField: 'email', matchFields: CF_NOME_COGNOME },
        ],
    },
    {
        docTypeId: DOC_IDS.PRELIMINARE,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: 'acquirenti.nome', targetField: 'nome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'acquirenti.cognome', targetField: 'cognome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'acquirenti.codiceFiscale', targetField: 'codiceFiscale', matchFields: CF_NOME_COGNOME },
            { sourceField: 'acquirenti.statoCivile', targetField: 'statoCivile', matchFields: CF_NOME_COGNOME },
        ],
    },
    {
        docTypeId: DOC_IDS.PROPOSTA,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: 'proponenti.nome', targetField: 'nome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'proponenti.cognome', targetField: 'cognome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'proponenti.codiceFiscale', targetField: 'codiceFiscale', matchFields: CF_NOME_COGNOME },
        ],
    },
    {
        docTypeId: DOC_IDS.TESSERA_SAN,
        enabled: true,
        fieldMappings: [
            { sourceField: 'codiceFiscale', targetField: 'codiceFiscale', matchFields: CF_NOME_COGNOME },
            { sourceField: 'cognome', targetField: 'cognome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'nome', targetField: 'nome', matchFields: CF_NOME_COGNOME },
        ],
    },
    // Conditional document sources
    {
        docTypeId: DOC_IDS.MATRIMONIO,
        enabled: true,
        fieldMappings: [
            { sourceField: 'regimePatrimoniale', targetField: 'regimePatrimoniale', matchFields: CF_NOME_COGNOME },
        ],
    },
    {
        docTypeId: DOC_IDS.RESIDENZA,
        enabled: true,
        fieldMappings: [
            { sourceField: 'indirizzo', targetField: 'indirizzoDiResidenza', matchFields: CF_NOME_COGNOME },
        ],
    },
    {
        docTypeId: DOC_IDS.PROCURA,
        enabled: true,
        fieldMappings: [
            { sourceField: 'nomeMandante', targetField: 'nome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'cognomeMandante', targetField: 'cognome', matchFields: CF_NOME_COGNOME },
            { sourceField: 'codiceFiscaleMandante', targetField: 'codiceFiscale', matchFields: CF_NOME_COGNOME },
        ],
    },
    // Bank loan sources — link buyer to loan data
    {
        docTypeId: DOC_IDS.DELIBERA_MUTUO,
        enabled: true,
        fieldMappings: [
            { sourceField: 'codiceFiscaleMutuatario', targetField: 'codiceFiscale', matchFields: CF_NOME_COGNOME },
        ],
    },
    {
        docTypeId: DOC_IDS.CONTRATTO_MUTUO,
        enabled: true,
        fieldMappings: [
            { sourceField: 'codiceFiscaleMutuatario', targetField: 'codiceFiscale', matchFields: CF_NOME_COGNOME },
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
            { sourceField: 'immobili.foglio', targetField: 'foglio', matchFields: CATASTO_MATCH },
            { sourceField: 'immobili.particella', targetField: 'particella', matchFields: CATASTO_MATCH },
            { sourceField: 'immobili.subalterno', targetField: 'subalterno', matchFields: CATASTO_MATCH },
            { sourceField: 'indirizzo', targetField: 'indirizzo', matchFields: CATASTO_MATCH },
            { sourceField: 'immobili.categoria', targetField: 'categoria', matchFields: CATASTO_MATCH },
            { sourceField: 'immobili.piano', targetField: 'piano', matchFields: CATASTO_MATCH },
            { sourceField: 'immobili.consistenza', targetField: 'consistenza', matchFields: CATASTO_MATCH },
            { sourceField: 'immobili.rendita', targetField: 'rendita', matchFields: CATASTO_MATCH },
        ],
    },
    {
        docTypeId: DOC_IDS.VISURA,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: 'foglio', targetField: 'foglio', matchFields: CATASTO_MATCH },
            { sourceField: 'particella', targetField: 'particella', matchFields: CATASTO_MATCH },
            { sourceField: 'subalterno', targetField: 'subalterno', matchFields: CATASTO_MATCH },
            { sourceField: 'sezione', targetField: 'sezione', matchFields: CATASTO_MATCH },
            { sourceField: 'comuneCatastale', targetField: 'comuneCatastale', matchFields: CATASTO_MATCH },
            { sourceField: 'indirizzoCatastale', targetField: 'indirizzo', matchFields: CATASTO_MATCH },
            { sourceField: 'piano', targetField: 'piano', matchFields: CATASTO_MATCH },
            { sourceField: 'categoriaCatastale', targetField: 'categoria', matchFields: CATASTO_MATCH },
            { sourceField: 'classe', targetField: 'classe', matchFields: CATASTO_MATCH },
            { sourceField: 'renditaCatastale', targetField: 'rendita', matchFields: CATASTO_MATCH },
            { sourceField: 'consistenza', targetField: 'consistenza', matchFields: CATASTO_MATCH },
            { sourceField: 'superficie', targetField: 'superficie', matchFields: CATASTO_MATCH },
        ],
    },
    {
        docTypeId: DOC_IDS.PLANIMETRIA,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: 'foglio', targetField: 'foglio', matchFields: CATASTO_MATCH },
            { sourceField: 'particella', targetField: 'particella', matchFields: CATASTO_MATCH },
            { sourceField: 'subalterno', targetField: 'subalterno', matchFields: CATASTO_MATCH },
        ],
    },
    {
        docTypeId: DOC_IDS.APE,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: 'foglio', targetField: 'foglio', matchFields: CATASTO_MATCH },
            { sourceField: 'particella', targetField: 'particella', matchFields: CATASTO_MATCH },
            { sourceField: 'subalterni', targetField: 'subalterno', matchFields: CATASTO_MATCH },
            { sourceField: 'indirizzo', targetField: 'indirizzo', matchFields: CATASTO_MATCH },
            { sourceField: 'classeEnergetica', targetField: 'classeEnergetica', matchFields: CATASTO_MATCH },
        ],
    },
    {
        docTypeId: DOC_IDS.IPOTECARIA,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: 'foglio', targetField: 'foglio', matchFields: CATASTO_MATCH },
            { sourceField: 'particella', targetField: 'particella', matchFields: CATASTO_MATCH },
            { sourceField: 'subalterno', targetField: 'subalterno', matchFields: CATASTO_MATCH },
            { sourceField: 'indirizzo', targetField: 'indirizzo', matchFields: CATASTO_MATCH },
        ],
    },
    {
        docTypeId: DOC_IDS.AGIBILITA,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: 'foglio', targetField: 'foglio', matchFields: CATASTO_MATCH },
            { sourceField: 'particella', targetField: 'particella', matchFields: CATASTO_MATCH },
            { sourceField: 'subalterno', targetField: 'subalterno', matchFields: CATASTO_MATCH },
            { sourceField: 'indirizzo', targetField: 'indirizzo', matchFields: CATASTO_MATCH },
            { sourceField: 'destinazioneUso', targetField: 'destinazioneUso', matchFields: CATASTO_MATCH },
        ],
    },
    {
        docTypeId: DOC_IDS.CONFORMITA_URB,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: 'foglio', targetField: 'foglio', matchFields: CATASTO_MATCH },
            { sourceField: 'particella', targetField: 'particella', matchFields: CATASTO_MATCH },
            { sourceField: 'subalterno', targetField: 'subalterno', matchFields: CATASTO_MATCH },
            { sourceField: 'indirizzo', targetField: 'indirizzo', matchFields: CATASTO_MATCH },
        ],
    },
    {
        docTypeId: DOC_IDS.CONFORMITA_IMP,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: 'foglio', targetField: 'foglio', matchFields: CATASTO_MATCH },
            { sourceField: 'particella', targetField: 'particella', matchFields: CATASTO_MATCH },
            { sourceField: 'subalterno', targetField: 'subalterno', matchFields: CATASTO_MATCH },
            { sourceField: 'indirizzo', targetField: 'indirizzo', matchFields: CATASTO_MATCH },
        ],
    },
    // Conditional document sources
    {
        docTypeId: DOC_IDS.SUCCESSIONE,
        enabled: true,
        fieldMappings: [
            { sourceField: 'foglio', targetField: 'foglio', matchFields: CATASTO_MATCH },
            { sourceField: 'particella', targetField: 'particella', matchFields: CATASTO_MATCH },
            { sourceField: 'subalterno', targetField: 'subalterno', matchFields: CATASTO_MATCH },
        ],
    },
    {
        docTypeId: DOC_IDS.CONDOMINIALE,
        enabled: true,
        fieldMappings: [
            { sourceField: 'indirizzo', targetField: 'indirizzo', matchFields: [{ field: 'indirizzo', fuzzyThreshold: 0.3 }] },
        ],
    },
    {
        docTypeId: DOC_IDS.CDU,
        enabled: true,
        fieldMappings: [
            { sourceField: 'foglio', targetField: 'foglio', matchFields: CATASTO_MATCH },
            { sourceField: 'particella', targetField: 'particella', matchFields: CATASTO_MATCH },
            { sourceField: 'destinazioneUrbanistica', targetField: 'destinazioneUrbanistica', matchFields: CATASTO_MATCH },
        ],
    },
    // Bank loan sources — link property to appraisal
    {
        docTypeId: DOC_IDS.PERIZIA_BANCARIA,
        enabled: true,
        fieldMappings: [
            { sourceField: 'foglio', targetField: 'foglio', matchFields: CATASTO_MATCH },
            { sourceField: 'particella', targetField: 'particella', matchFields: CATASTO_MATCH },
            { sourceField: 'subalterno', targetField: 'subalterno', matchFields: CATASTO_MATCH },
            { sourceField: 'indirizzo', targetField: 'indirizzo', matchFields: CATASTO_MATCH },
        ],
    },
];

// ─── Conditional Requirements (IF-THEN validation) ─────────────────────────
// Always-required docs are now handled via isRequired on data sources above.
// Only conditional (IF-THEN) requirements remain here.

/** Shared conditional trigger: check stato civile from identity doc and atto provenienza */
const vedovanzaConditions = [
    { sourceDocTypeId: DOC_IDS.PROVENIENZA, field: 'acquirenti.statoCivile', operator: 'contains' as const, value: 'vedov' },
    { sourceDocTypeId: DOC_IDS.IDENTITA, field: 'statoCivile', operator: 'contains' as const, value: 'vedov' },
];

const coniugatoConditions = [
    { sourceDocTypeId: DOC_IDS.PROVENIENZA, field: 'acquirenti.statoCivile', operator: 'contains' as const, value: 'coniugat' },
    { sourceDocTypeId: DOC_IDS.IDENTITA, field: 'statoCivile', operator: 'contains' as const, value: 'coniugat' },
];

const separazioneDivorzioConditions = [
    { sourceDocTypeId: DOC_IDS.PROVENIENZA, field: 'acquirenti.statoCivile', operator: 'contains' as const, value: 'separat' },
    { sourceDocTypeId: DOC_IDS.PROVENIENZA, field: 'acquirenti.statoCivile', operator: 'contains' as const, value: 'divorziat' },
    { sourceDocTypeId: DOC_IDS.IDENTITA, field: 'statoCivile', operator: 'contains' as const, value: 'separat' },
    { sourceDocTypeId: DOC_IDS.IDENTITA, field: 'statoCivile', operator: 'contains' as const, value: 'divorziat' },
];

const venditoreRequired: ConditionalRequirement[] = [
    // Conditional: vedovanza (from old atto acquirenti OR current identity)
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
    // Conditional: matrimonio (from old atto acquirenti OR current identity)
    {
        docTypeId: DOC_IDS.MATRIMONIO,
        enabled: true,
        conditions: coniugatoConditions,
    },
    // Conditional: separazione/divorzio (OR: any of the conditions triggers the requirement)
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

/** Acquirente conditional requirements — same marital-status triggers using
 *  the Preliminare acquirenti and the buyer's own identity document. */
const acquirenteRequired: ConditionalRequirement[] = [
    // Conditional: vedovanza
    {
        docTypeId: DOC_IDS.MORTE,
        enabled: true,
        conditions: [
            { sourceDocTypeId: DOC_IDS.PRELIMINARE, field: 'acquirenti.statoCivile', operator: 'contains', value: 'vedov' },
            { sourceDocTypeId: DOC_IDS.IDENTITA, field: 'statoCivile', operator: 'contains', value: 'vedov' },
        ],
    },
    {
        docTypeId: DOC_IDS.FAMIGLIA,
        enabled: true,
        conditions: [
            { sourceDocTypeId: DOC_IDS.PRELIMINARE, field: 'acquirenti.statoCivile', operator: 'contains', value: 'vedov' },
            { sourceDocTypeId: DOC_IDS.IDENTITA, field: 'statoCivile', operator: 'contains', value: 'vedov' },
        ],
    },
    // Conditional: matrimonio
    {
        docTypeId: DOC_IDS.MATRIMONIO,
        enabled: true,
        conditions: [
            { sourceDocTypeId: DOC_IDS.PRELIMINARE, field: 'acquirenti.statoCivile', operator: 'contains', value: 'coniugat' },
            { sourceDocTypeId: DOC_IDS.IDENTITA, field: 'statoCivile', operator: 'contains', value: 'coniugat' },
        ],
    },
    // Conditional: separazione/divorzio
    {
        docTypeId: DOC_IDS.SEPARAZIONE,
        enabled: true,
        conditions: [
            { sourceDocTypeId: DOC_IDS.PRELIMINARE, field: 'acquirenti.statoCivile', operator: 'contains', value: 'separat' },
            { sourceDocTypeId: DOC_IDS.PRELIMINARE, field: 'acquirenti.statoCivile', operator: 'contains', value: 'divorziat' },
            { sourceDocTypeId: DOC_IDS.IDENTITA, field: 'statoCivile', operator: 'contains', value: 'separat' },
            { sourceDocTypeId: DOC_IDS.IDENTITA, field: 'statoCivile', operator: 'contains', value: 'divorziat' },
        ],
    },
    {
        docTypeId: DOC_IDS.MATRIMONIO,
        enabled: true,
        conditions: [
            { sourceDocTypeId: DOC_IDS.PRELIMINARE, field: 'acquirenti.statoCivile', operator: 'contains', value: 'separat' },
            { sourceDocTypeId: DOC_IDS.PRELIMINARE, field: 'acquirenti.statoCivile', operator: 'contains', value: 'divorziat' },
            { sourceDocTypeId: DOC_IDS.IDENTITA, field: 'statoCivile', operator: 'contains', value: 'separat' },
            { sourceDocTypeId: DOC_IDS.IDENTITA, field: 'statoCivile', operator: 'contains', value: 'divorziat' },
        ],
    },
];

const immobileRequired: ConditionalRequirement[] = [
    // Conditional: eredità
    {
        docTypeId: DOC_IDS.SUCCESSIONE,
        enabled: true,
        conditions: [
            { sourceDocTypeId: DOC_IDS.PROVENIENZA, field: 'tipoProvenienza', operator: 'equals', value: 'successione' },
        ],
    },
    {
        docTypeId: DOC_IDS.EREDITA,
        enabled: true,
        conditions: [
            { sourceDocTypeId: DOC_IDS.PROVENIENZA, field: 'tipoProvenienza', operator: 'equals', value: 'successione' },
        ],
    },
    // Conditional: donazione (20-year revocation risk)
    {
        docTypeId: DOC_IDS.FAMIGLIA,
        enabled: true,
        conditions: [
            { sourceDocTypeId: DOC_IDS.PROVENIENZA, field: 'tipoProvenienza', operator: 'equals', value: 'donazione' },
        ],
    },
    // Conditional: condominio (residential apartment, categoria A/)
    {
        docTypeId: DOC_IDS.CONDOMINIALE,
        enabled: true,
        conditions: [
            { sourceDocTypeId: DOC_IDS.VISURA, field: 'categoriaCatastale', operator: 'contains', value: 'A/' },
        ],
    },
    // Conditional: terreno → CDU required for land parcels
    {
        docTypeId: DOC_IDS.CDU,
        enabled: true,
        conditions: [
            { sourceDocTypeId: DOC_IDS.VISURA, field: 'qualita', operator: 'exists' },
        ],
    },
    // Conditional: bank loan → perizia required when mutuo is present
    {
        docTypeId: DOC_IDS.PERIZIA_BANCARIA,
        enabled: true,
        conditions: [
            { sourceDocTypeId: DOC_IDS.DELIBERA_MUTUO, field: 'importoMutuo', operator: 'exists' },
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
    fieldOrder: ['nome', 'cognome', 'codiceFiscale', 'dataNascita', 'luogoNascita', 'indirizzoDiResidenza', 'statoCivile', 'regimePatrimoniale', 'telefono', 'email'],
    dataSources: venditoreSources,
    conditionalRequirements: venditoreRequired,
};

const acquirente: EntityTypeDef = {
    id: ENTITY_IDS.ACQUIRENTE,
    name: 'Acquirente',
    icon: 'user-plus',
    color: '#22c55e',
    displayOrder: 2,
    fieldOrder: ['nome', 'cognome', 'codiceFiscale', 'dataNascita', 'luogoNascita', 'indirizzoDiResidenza', 'statoCivile', 'regimePatrimoniale', 'telefono', 'email'],
    dataSources: acquirenteSources,
    conditionalRequirements: acquirenteRequired,
};

const immobile: EntityTypeDef = {
    id: ENTITY_IDS.IMMOBILE,
    name: 'Immobile',
    icon: 'home',
    color: '#3b82f6',
    displayOrder: 1,
    fieldOrder: ['foglio', 'particella', 'subalterno', 'indirizzo', 'comuneCatastale', 'sezione', 'categoria', 'classe', 'piano', 'consistenza', 'rendita', 'superficie', 'classeEnergetica', 'destinazioneUso', 'destinazioneUrbanistica'],
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
            { sourceField: 'prezzo', targetField: 'prezzo' },
            { sourceField: 'caparra', targetField: 'caparra' },
            { sourceField: 'dataStipula', targetField: 'dataStipulaPrelim' },
            { sourceField: 'mediatore', targetField: 'mediatore' },
        ],
    },
    {
        docTypeId: DOC_IDS.PROPOSTA,
        enabled: true,
        isRequired: true,
        canCreateEntity: true,
        fieldMappings: [
            { sourceField: 'prezzoOfferto', targetField: 'prezzoOfferto' },
        ],
    },
    {
        docTypeId: DOC_IDS.DELIBERA_MUTUO,
        enabled: true,
        fieldMappings: [
            { sourceField: 'importoMutuo', targetField: 'importoMutuo' },
            { sourceField: 'banca', targetField: 'banca' },
            { sourceField: 'tipoTasso', targetField: 'tipoTasso' },
        ],
    },
    {
        docTypeId: DOC_IDS.CONTRATTO_MUTUO,
        enabled: true,
        fieldMappings: [
            { sourceField: 'importoMutuo', targetField: 'importoMutuoErogato' },
            { sourceField: 'rataMensile', targetField: 'rataMensile' },
            { sourceField: 'tassoInteresse', targetField: 'tassoInteresse' },
        ],
    },
    {
        docTypeId: DOC_IDS.MEZZI_PAGAMENTO,
        enabled: true,
        isRequired: true,
        fieldMappings: [
            { sourceField: 'importoTotale', targetField: 'importoTotale' },
            { sourceField: 'mediatore', targetField: 'mediatore' },
            { sourceField: 'provvigione', targetField: 'provvigione' },
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
        'prezzo', 'prezzoOfferto', 'caparra', 'mediatore', 'provvigione',
        'importoMutuo', 'banca', 'tipoTasso', 'importoMutuoErogato',
        'rataMensile', 'tassoInteresse', 'importoTotale', 'dataStipulaPrelim',
    ],
    dataSources: transazioneSources,
    conditionalRequirements: [],
};

// ─── Export ─────────────────────────────────────────────────────────────────

export const entityTypes: EntityTypeDef[] = [venditore, immobile, acquirente, transazione];
