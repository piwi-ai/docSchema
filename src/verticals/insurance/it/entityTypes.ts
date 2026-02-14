/**
 * Insurance Agency Italy — Entity Type Definitions
 *
 * 4 entity types: Assicurato, Veicolo, Sinistro, Polizza.
 * Aggregates data from identity, policies, claims, assessments, and medical certificates.
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
];
const polizzaMatch = () => [
    { field: 'numeroPolizza', fuzzyThreshold: 0 },
];
const sinistroMatch = () => [
    { field: 'numeroSinistro', fuzzyThreshold: 0 },
];
const fm = (sourceField: string, targetField: string, matchFields?: Array<{ field: string; fuzzyThreshold: number }>) =>
    ({ sourceField, targetField, ...(matchFields ? { matchFields } : {}) });

// ─── Entity IDs ─────────────────────────────────────────────────────────────

export const ENTITY_IDS = {
    ASSICURATO: 'entity-assicurato',
    VEICOLO: 'entity-veicolo',
    SINISTRO: 'entity-sinistro',
    POLIZZA: 'entity-polizza',
} as const;

// ─── Entity Types ───────────────────────────────────────────────────────────

export const entityTypes: EntityTypeDef[] = [
    {
        id: ENTITY_IDS.ASSICURATO,
        name: 'Assicurato',
        icon: 'shield-check',
        color: '#3b82f6',
        displayOrder: 0,
        fieldOrder: ['nome', 'cognome', 'codiceFiscale', 'indirizzoDiResidenza', 'dataNascita', 'luogoNascita'],
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
                docTypeId: DOC_IDS.TESSERA_SANITARIA, enabled: true,
                fieldMappings: [
                    fm('nome', 'nome', cfMatch()), fm('cognome', 'cognome', cfMatch()),
                    fm('codiceFiscale', 'codiceFiscale', cfMatch()),
                    fm('dataNascita', 'dataNascita', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.POLIZZA, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('contraente.nome', 'nome', cfMatch()), fm('contraente.cognome', 'cognome', cfMatch()),
                    fm('contraente.codiceFiscale', 'codiceFiscale', cfMatch()),
                    fm('contraente.indirizzo', 'indirizzoDiResidenza', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.DENUNCIA_SINISTRO, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('veicoloA.contraente', 'nome', cfMatch()),
                    fm('veicoloA.codiceFiscale', 'codiceFiscale', cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CERTIFICATO_MEDICO, enabled: true,
                fieldMappings: [
                    fm('paziente.nome', 'nome', cfMatch()), fm('paziente.cognome', 'cognome', cfMatch()),
                    fm('paziente.codiceFiscale', 'codiceFiscale', cfMatch()),
                    fm('paziente.dataNascita', 'dataNascita', cfMatch()),
                ],
            },
        ],
        conditionalRequirements: [
            {
                docTypeId: DOC_IDS.CERTIFICATO_MORTE, enabled: true,
                conditions: [
                    { sourceDocTypeId: DOC_IDS.POLIZZA, field: 'ramo', operator: 'equals', value: 'vita' },
                ],
            },
        ],
    },
    {
        id: ENTITY_IDS.VEICOLO,
        name: 'Veicolo',
        icon: 'car',
        color: '#6366f1',
        displayOrder: 1,
        fieldOrder: ['targa', 'telaio', 'marca', 'modello', 'dataImmatricolazione', 'cilindrata', 'potenzaKw', 'alimentazione'],
        dataSources: [
            {
                docTypeId: DOC_IDS.LIBRETTO, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm('targa', 'targa', targaMatch()), fm('telaio', 'telaio', targaMatch()),
                    fm('marca', 'marca', targaMatch()), fm('modello', 'modello', targaMatch()),
                    fm('dataImmatricolazione', 'dataImmatricolazione', targaMatch()),
                    fm('cilindrata', 'cilindrata', targaMatch()), fm('potenzaKw', 'potenzaKw', targaMatch()),
                    fm('alimentazione', 'alimentazione', targaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.POLIZZA, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('targa', 'targa', targaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.ATTESTATO_RISCHIO, enabled: true,
                fieldMappings: [
                    fm('targa', 'targa', targaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.DENUNCIA_SINISTRO, enabled: true,
                fieldMappings: [
                    fm('veicoloA.targa', 'targa', targaMatch()),
                    fm('veicoloA.marca', 'marca', targaMatch()),
                    fm('veicoloA.modello', 'modello', targaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.PERIZIA_DANNI, enabled: true,
                fieldMappings: [
                    fm('targa', 'targa', targaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.FATTURA_RIPARAZIONE, enabled: true,
                fieldMappings: [
                    fm('targa', 'targa', targaMatch()),
                ],
            },
        ],
        conditionalRequirements: [],
    },
    {
        id: ENTITY_IDS.SINISTRO,
        name: 'Sinistro',
        icon: 'alert-triangle',
        color: '#ef4444',
        displayOrder: 2,
        fieldOrder: ['numeroSinistro', 'dataSinistro', 'luogoSinistro', 'dinamica', 'importoRiparazione', 'importoLiquidazione'],
        dataSources: [
            {
                docTypeId: DOC_IDS.DENUNCIA_SINISTRO, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm('numeroSinistro', 'numeroSinistro', sinistroMatch()),
                    fm('dataSinistro', 'dataSinistro', sinistroMatch()),
                    fm('luogoSinistro', 'luogoSinistro', sinistroMatch()),
                    fm('dinamica', 'dinamica', sinistroMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.PERIZIA_DANNI, enabled: true, isRequired: true,
                fieldMappings: [
                    fm('numeroSinistro', 'numeroSinistro', sinistroMatch()),
                    fm('importoRiparazione', 'importoRiparazione', sinistroMatch()),
                    fm('importoLiquidazione', 'importoLiquidazione', sinistroMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.FATTURA_RIPARAZIONE, enabled: true,
                fieldMappings: [
                    fm('totale', 'costoRiparazioneEffettivo', sinistroMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.VERBALE_AUTORITA, enabled: true,
                fieldMappings: [
                    fm('numeroVerbale', 'numeroVerbale', sinistroMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CERTIFICATO_MEDICO, enabled: true,
                fieldMappings: [
                    fm('diagnosi', 'diagnosiLesioni', sinistroMatch()),
                    fm('giorniPrognosi', 'giorniPrognosi', sinistroMatch()),
                    fm('invaliditaPermanente', 'invaliditaPermanente', sinistroMatch()),
                ],
            },
        ],
        conditionalRequirements: [
            {
                docTypeId: DOC_IDS.CERTIFICATO_MEDICO, enabled: true,
                conditions: [
                    { sourceDocTypeId: DOC_IDS.DENUNCIA_SINISTRO, field: 'feriti', operator: 'equals', value: 'sì' },
                ],
            },
            {
                docTypeId: DOC_IDS.VERBALE_AUTORITA, enabled: true,
                conditions: [
                    { sourceDocTypeId: DOC_IDS.DENUNCIA_SINISTRO, field: 'autoritaIntervenuta', operator: 'exists' },
                ],
            },
        ],
    },
    {
        id: ENTITY_IDS.POLIZZA,
        name: 'Polizza',
        icon: 'file-shield',
        color: '#22c55e',
        displayOrder: 3,
        fieldOrder: ['numeroPolizza', 'compagnia', 'ramo', 'premioAnnuo', 'decorrenza', 'scadenza', 'massimale', 'classeMerito'],
        dataSources: [
            {
                docTypeId: DOC_IDS.POLIZZA, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm('numeroPolizza', 'numeroPolizza', polizzaMatch()),
                    fm('compagnia', 'compagnia', polizzaMatch()),
                    fm('ramo', 'ramo', polizzaMatch()),
                    fm('premioAnnuo', 'premioAnnuo', polizzaMatch()),
                    fm('decorrenza', 'decorrenza', polizzaMatch()),
                    fm('scadenza', 'scadenza', polizzaMatch()),
                    fm('massimale', 'massimale', polizzaMatch()),
                    fm('garanzie', 'garanzie', polizzaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.ATTESTATO_RISCHIO, enabled: true,
                fieldMappings: [
                    fm('classeMeritoAssegnazione', 'classeMerito', polizzaMatch()),
                    fm('classeMeritoProvenienza', 'classeMeritoProvenienza', polizzaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.QUIETANZA, enabled: true,
                fieldMappings: [
                    fm('importo', 'ultimoPremio', polizzaMatch()),
                    fm('dataPagamento', 'ultimoPagamento', polizzaMatch()),
                ],
            },
        ],
        conditionalRequirements: [],
    },
];
