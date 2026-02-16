/**
 * Perizia Bancaria — Bank appraisal.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, date, objectSchema, ref,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const periziaBancaria: DocumentTypeDef = {
    id: 'doc-perizia-bancaria',
    name: 'Perizia Bancaria',
    description: 'Perizia estimativa dell\'immobile richiesta dalla banca per la concessione del mutuo',
    references: [
        ref('ABI — Linee guida valuazione immobiliare', 'https://www.abi.it/', ReferenceType.SPECIFICATION),
    ],
    jsonSchema: objectSchema({
        perito: text('Nome e cognome del perito incaricato'),
        dataPerizia: date('Data della perizia in formato europeo DD.MM.YYYY'),
        indirizzo: text('Indirizzo completo dell\'immobile periziato'),
        foglio: text('Foglio catastale'),
        particella: text('Particella catastale'),
        subalterno: text('Subalterno'),
        valoreStimato: num('Valore di stima dell\'immobile in Euro'),
        superficieCommerciale: num('Superficie commerciale in mq'),
        statoConservazione: text('Stato di conservazione (es. buono, ottimo, da ristrutturare)'),
        conformitaCatastale: text('Esito verifica conformità catastale'),
        conformitaUrbanistica: text('Esito verifica conformità urbanistica'),
        note: text('Note o osservazioni del perito — copiare TESTUALMENTE dal documento. Se non ci sono note, restituire stringa vuota.'),
    }, ['perito', 'dataPerizia', 'indirizzo', 'valoreStimato']),
};
