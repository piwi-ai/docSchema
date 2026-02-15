/**
 * Scheda Fabbricato / Immobile — Building record for property insurance.
 * Used by: insurance.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, enumField, objectSchema,
    nome, cognome, codiceFiscale,
} from '../../../helpers/it.js';

export const schedaFabbricato: DocumentTypeDef = {
    id: 'doc-scheda-fabbricato',
    name: 'Scheda Fabbricato / Immobile',
    description: "Dati dell'immobile assicurato — per polizze casa/incendio",
    jsonSchema: objectSchema({
        proprietario: objectSchema({
            nome: nome(), cognome: cognome(), codiceFiscale: codiceFiscale(),
        }, ['nome', 'cognome', 'codiceFiscale']),
        indirizzo: text("Indirizzo completo dell'immobile"),
        comune: text('Comune'), provincia: text('Provincia'),
        tipoImmobile: enumField('Tipo immobile', ['appartamento', 'villa', 'villetta a schiera', 'ufficio', 'negozio', 'capannone', 'altro']),
        superficie: num('Superficie in mq'),
        annoCostruzione: num('Anno di costruzione'),
        valoreRicostruzione: num('Valore di ricostruzione a nuovo in Euro'),
        valoreContenuto: num('Valore del contenuto assicurato in Euro'),
        sistemaAllarme: enumField('Sistema di allarme presente', ['sì', 'no']),
        pianterreno: enumField('Al pianterreno', ['sì', 'no']),
    }, ['proprietario', 'indirizzo', 'tipoImmobile', 'superficie']),
};
