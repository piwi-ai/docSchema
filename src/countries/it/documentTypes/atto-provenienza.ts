/**
 * Atto di Provenienza Notarile — Notarial deed of provenance.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, date, enumField, objectSchema, arrayOfObjects, ref,
    nome, cognome,
    STATO_CIVILE_VALUES,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

const TIPO_PROVENIENZA_VALUES = [
    'compravendita', 'donazione', 'successione',
    'divisione', 'usucapione', 'altro',
];

const REGIME_PATRIMONIALE_VALUES = ['comunione dei beni', 'separazione dei beni'];

export const CATEGORIA_CATASTALE_VALUES = [
    'A/1', 'A/2', 'A/3', 'A/4', 'A/5', 'A/6', 'A/7', 'A/8', 'A/9', 'A/10', 'A/11',
    'B/1', 'B/2', 'B/3', 'B/4', 'B/5', 'B/6', 'B/7', 'B/8',
    'C/1', 'C/2', 'C/3', 'C/4', 'C/5', 'C/6', 'C/7',
    'D/1', 'D/2', 'D/3', 'D/4', 'D/5', 'D/6', 'D/7', 'D/8', 'D/9', 'D/10',
    'E/1', 'E/2', 'E/3', 'E/4', 'E/5', 'E/6', 'E/7', 'E/8', 'E/9',
    'F/1', 'F/2', 'F/3', 'F/4', 'F/5',
];

const venditoreAcquirenteProps = {
    nome: nome(),
    cognome: cognome(),
    quota: text('Quota di proprietà venduta (es. 100%, 50/100)'),
    codiceFiscale: text('Codice Fiscale del venditore (extract without spaces)'),
    statoCivile: enumField('Stato civile come scritto nell\'atto (es. coniugato, vedova del fu...)', STATO_CIVILE_VALUES),
    regimePatrimoniale: enumField('Regime patrimoniale', REGIME_PATRIMONIALE_VALUES),
};
const venditoreAcquirenteRequired = ['nome', 'cognome', 'quota', 'codiceFiscale', 'statoCivile', 'regimePatrimoniale'];

export const attoProvenienza: DocumentTypeDef = {
    id: 'doc-provenienza',
    name: 'Atto di Provenienza Notarile',
    description: 'Rogito che attesta la proprietà. Include dati venditori, acquirenti e catastali.',
    references: [
        ref('Consiglio Nazionale del Notariato', 'https://www.notariato.it/', ReferenceType.DOCUMENTATION),
        ref('Art. 2643 Codice Civile — Trascrizione', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:codice.civile:1942-03-16;262~art2643', ReferenceType.REGULATION),
    ],
    jsonSchema: objectSchema({
        venditori: arrayOfObjects(venditoreAcquirenteProps, venditoreAcquirenteRequired, "Elenco di tutti i venditori nell'atto"),
        acquirenti: arrayOfObjects({
            ...venditoreAcquirenteProps,
            quota: text('Quota di proprietà acquistata (es. 100%, 50/100)'),
            codiceFiscale: text("Codice Fiscale dell'acquirente (extract without spaces)"),
        }, venditoreAcquirenteRequired, "Elenco di tutti gli acquirenti nell'atto"),
        notaio: text('Nome e cognome del notaio rogante'),
        dataAtto: text(''),
        numeroRepertorio: text(''),
        numeroRaccolta: text(''),
        indirizzo: text('Indirizzo completo del complesso edilizio o dell\'immobile'),
        immobili: arrayOfObjects({
            foglio: text('Foglio catastale'),
            particella: text('Particella catastale'),
            subalterno: text('Subalterno'),
            categoria: enumField('Categoria catastale (es. A/3, C/6)', CATEGORIA_CATASTALE_VALUES),
            piano: text('Piano (es. S1, T, S1-T-1-2)'),
            consistenza: text('Consistenza: vani o mq (es. 7 vani, 37 mq)'),
            rendita: num('Rendita catastale in Euro'),
        }, ['foglio', 'particella', 'subalterno'], 'Elenco delle unità immobiliari oggetto dell\'atto con i dati catastali'),
        tipoProvenienza: enumField(
            "Come il proprietario attuale ha acquisito l'immobile: compravendita, donazione, successione, divisione, usucapione, altro",
            TIPO_PROVENIENZA_VALUES
        ),
    }, ['venditori', 'acquirenti', 'notaio', 'dataAtto', 'immobili', 'tipoProvenienza', 'indirizzo']),
};
