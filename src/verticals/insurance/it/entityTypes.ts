/**
 * Insurance Agency Italy — Entity Type Definitions
 *
 * 4 entity types: Assicurato, Veicolo, Sinistro, Polizza.
 * Aggregates data from identity, policies, claims, assessments, and medical certificates.
 */
import type { EntityTypeDef } from '../../../types.js';
import { F } from '../../../countries/it/fields.js';
import {
    cfMatch,
    targaMatch,
    polizzaMatch,
    sinistroMatch,
    fm,
} from '../../../countries/it/matchHelpers.js';
import { DOC_IDS } from './documentTypes.js';

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
        fieldOrder: [
            F.NOME,
            F.COGNOME,
            F.CODICE_FISCALE,
            F.INDIRIZZO_RESIDENZA,
            F.DATA_NASCITA,
            F.LUOGO_NASCITA,
        ],
        dataSources: [
            {
                docTypeId: DOC_IDS.IDENTITA,
                enabled: true,
                isRequired: true,
                canCreateEntity: true,
                fieldMappings: [
                    fm(F.NOME, F.NOME, cfMatch()),
                    fm(F.COGNOME, F.COGNOME, cfMatch()),
                    fm(F.CODICE_FISCALE, F.CODICE_FISCALE, cfMatch()),
                    fm(F.DATA_NASCITA, F.DATA_NASCITA, cfMatch()),
                    fm(F.LUOGO_NASCITA, F.LUOGO_NASCITA, cfMatch()),
                    fm(F.INDIRIZZO_RESIDENZA, F.INDIRIZZO_RESIDENZA, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.TESSERA_SANITARIA,
                enabled: true,
                fieldMappings: [
                    fm(F.NOME, F.NOME, cfMatch()),
                    fm(F.COGNOME, F.COGNOME, cfMatch()),
                    fm(F.CODICE_FISCALE, F.CODICE_FISCALE, cfMatch()),
                    fm(F.DATA_NASCITA, F.DATA_NASCITA, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.POLIZZA,
                enabled: true,
                canCreateEntity: true,
                fieldMappings: [
                    fm('contraente.nome', F.NOME, cfMatch()),
                    fm('contraente.cognome', F.COGNOME, cfMatch()),
                    fm('contraente.codiceFiscale', F.CODICE_FISCALE, cfMatch()),
                    fm('contraente.indirizzo', F.INDIRIZZO_RESIDENZA, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.DENUNCIA_SINISTRO,
                enabled: true,
                canCreateEntity: true,
                fieldMappings: [
                    fm('veicoloA.contraente', F.NOME, cfMatch()),
                    fm('veicoloA.codiceFiscale', F.CODICE_FISCALE, cfMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CERTIFICATO_MEDICO,
                enabled: true,
                fieldMappings: [
                    fm('paziente.nome', F.NOME, cfMatch()),
                    fm('paziente.cognome', F.COGNOME, cfMatch()),
                    fm('paziente.codiceFiscale', F.CODICE_FISCALE, cfMatch()),
                    fm('paziente.dataNascita', F.DATA_NASCITA, cfMatch()),
                ],
            },
        ],
        conditionalRequirements: [
            {
                docTypeId: DOC_IDS.CERTIFICATO_MORTE,
                enabled: true,
                conditions: [
                    {
                        sourceDocTypeId: DOC_IDS.POLIZZA,
                        field: F.RAMO,
                        operator: 'equals',
                        value: 'vita',
                    },
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
        fieldOrder: [
            F.TARGA,
            F.TELAIO,
            F.MARCA,
            F.MODELLO,
            F.DATA_IMMATRICOLAZIONE,
            F.CILINDRATA,
            F.POTENZA_KW,
            F.ALIMENTAZIONE,
        ],
        dataSources: [
            {
                docTypeId: DOC_IDS.LIBRETTO,
                enabled: true,
                isRequired: true,
                canCreateEntity: true,
                fieldMappings: [
                    fm(F.TARGA, F.TARGA, targaMatch()),
                    fm(F.TELAIO, F.TELAIO, targaMatch()),
                    fm(F.MARCA, F.MARCA, targaMatch()),
                    fm(F.MODELLO, F.MODELLO, targaMatch()),
                    fm(F.DATA_IMMATRICOLAZIONE, F.DATA_IMMATRICOLAZIONE, targaMatch()),
                    fm(F.CILINDRATA, F.CILINDRATA, targaMatch()),
                    fm(F.POTENZA_KW, F.POTENZA_KW, targaMatch()),
                    fm(F.ALIMENTAZIONE, F.ALIMENTAZIONE, targaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.POLIZZA,
                enabled: true,
                canCreateEntity: true,
                fieldMappings: [fm(F.TARGA, F.TARGA, targaMatch())],
            },
            {
                docTypeId: DOC_IDS.ATTESTATO_RISCHIO,
                enabled: true,
                fieldMappings: [fm(F.TARGA, F.TARGA, targaMatch())],
            },
            {
                docTypeId: DOC_IDS.DENUNCIA_SINISTRO,
                enabled: true,
                fieldMappings: [
                    fm('veicoloA.targa', F.TARGA, targaMatch()),
                    fm('veicoloA.marca', F.MARCA, targaMatch()),
                    fm('veicoloA.modello', F.MODELLO, targaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.PERIZIA_DANNI,
                enabled: true,
                fieldMappings: [fm(F.TARGA, F.TARGA, targaMatch())],
            },
            {
                docTypeId: DOC_IDS.FATTURA_RIPARAZIONE,
                enabled: true,
                fieldMappings: [fm(F.TARGA, F.TARGA, targaMatch())],
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
        fieldOrder: [
            F.NUMERO_SINISTRO,
            F.DATA_SINISTRO,
            F.LUOGO_SINISTRO,
            F.DINAMICA,
            F.IMPORTO_RIPARAZIONE,
            F.IMPORTO_LIQUIDAZIONE,
        ],
        dataSources: [
            {
                docTypeId: DOC_IDS.DENUNCIA_SINISTRO,
                enabled: true,
                isRequired: true,
                canCreateEntity: true,
                fieldMappings: [
                    fm(F.NUMERO_SINISTRO, F.NUMERO_SINISTRO, sinistroMatch()),
                    fm(F.DATA_SINISTRO, F.DATA_SINISTRO, sinistroMatch()),
                    fm(F.LUOGO_SINISTRO, F.LUOGO_SINISTRO, sinistroMatch()),
                    fm(F.DINAMICA, F.DINAMICA, sinistroMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.PERIZIA_DANNI,
                enabled: true,
                isRequired: true,
                fieldMappings: [
                    fm(F.NUMERO_SINISTRO, F.NUMERO_SINISTRO, sinistroMatch()),
                    fm(F.IMPORTO_RIPARAZIONE, F.IMPORTO_RIPARAZIONE, sinistroMatch()),
                    fm(F.IMPORTO_LIQUIDAZIONE, F.IMPORTO_LIQUIDAZIONE, sinistroMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.FATTURA_RIPARAZIONE,
                enabled: true,
                fieldMappings: [fm('totale', F.COSTO_RIPARAZIONE_EFFETTIVO, sinistroMatch())],
            },
            {
                docTypeId: DOC_IDS.VERBALE_AUTORITA,
                enabled: true,
                fieldMappings: [fm(F.NUMERO_VERBALE, F.NUMERO_VERBALE, sinistroMatch())],
            },
            {
                docTypeId: DOC_IDS.CERTIFICATO_MEDICO,
                enabled: true,
                fieldMappings: [
                    fm('diagnosi', F.DIAGNOSI_LESIONI, sinistroMatch()),
                    fm('giorniPrognosi', F.GIORNI_PROGNOSI, sinistroMatch()),
                    fm('invaliditaPermanente', F.INVALIDITA_PERMANENTE, sinistroMatch()),
                ],
            },
        ],
        conditionalRequirements: [
            {
                docTypeId: DOC_IDS.CERTIFICATO_MEDICO,
                enabled: true,
                conditions: [
                    {
                        sourceDocTypeId: DOC_IDS.DENUNCIA_SINISTRO,
                        field: 'feriti',
                        operator: 'equals',
                        value: 'sì',
                    },
                ],
            },
            {
                docTypeId: DOC_IDS.VERBALE_AUTORITA,
                enabled: true,
                conditions: [
                    {
                        sourceDocTypeId: DOC_IDS.DENUNCIA_SINISTRO,
                        field: 'autoritaIntervenuta',
                        operator: 'exists',
                    },
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
        fieldOrder: [
            F.NUMERO_POLIZZA,
            F.COMPAGNIA,
            F.RAMO,
            F.PREMIO_ANNUO,
            F.DECORRENZA,
            F.SCADENZA,
            F.MASSIMALE,
            F.CLASSE_MERITO,
        ],
        dataSources: [
            {
                docTypeId: DOC_IDS.POLIZZA,
                enabled: true,
                isRequired: true,
                canCreateEntity: true,
                fieldMappings: [
                    fm(F.NUMERO_POLIZZA, F.NUMERO_POLIZZA, polizzaMatch()),
                    fm(F.COMPAGNIA, F.COMPAGNIA, polizzaMatch()),
                    fm(F.RAMO, F.RAMO, polizzaMatch()),
                    fm(F.PREMIO_ANNUO, F.PREMIO_ANNUO, polizzaMatch()),
                    fm(F.DECORRENZA, F.DECORRENZA, polizzaMatch()),
                    fm(F.SCADENZA, F.SCADENZA, polizzaMatch()),
                    fm(F.MASSIMALE, F.MASSIMALE, polizzaMatch()),
                    fm(F.GARANZIE, F.GARANZIE, polizzaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.ATTESTATO_RISCHIO,
                enabled: true,
                fieldMappings: [
                    fm('classeMeritoAssegnazione', F.CLASSE_MERITO, polizzaMatch()),
                    fm('classeMeritoProvenienza', F.CLASSE_MERITO_PROVENIENZA, polizzaMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.QUIETANZA,
                enabled: true,
                fieldMappings: [
                    fm('importo', F.ULTIMO_PREMIO, polizzaMatch()),
                    fm('dataPagamento', F.ULTIMO_PAGAMENTO, polizzaMatch()),
                ],
            },
        ],
        conditionalRequirements: [],
    },
];
