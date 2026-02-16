/**
 * Certificato di Morte — Death certificate.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, date, enumField, objectSchema, ref,
    codiceFiscale,
    STATO_CIVILE_VALUES,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const certificatoMorte: DocumentTypeDef = {
    id: 'doc-morte',
    name: 'Certificato di Morte',
    description: 'Certificato/Estratto che attesta il decesso, richiesto quando il venditore/acquirente è vedovo/a',
    references: [
        ref('Ministero dell\'Interno — Servizi demografici', 'https://dait.interno.gov.it/servizi-demografici', ReferenceType.DOCUMENTATION),
    ],
    jsonSchema: objectSchema({
        nomeDefunto: text('Nome del defunto'),
        cognomeDefunto: text('Cognome del defunto'),
        codiceFiscaleDefunto: codiceFiscale('Codice Fiscale del defunto — fondamentale per cross-reference con successione (extract without spaces)'),
        dataNascita: date('Data di nascita del defunto in formato europeo DD.MM.YYYY'),
        luogoNascita: text('Comune di nascita del defunto'),
        dataDecesso: date('Data del decesso in formato europeo DD.MM.YYYY'),
        oraDecesso: text('Ora del decesso, se indicata'),
        luogoMorte: text('Comune di decesso'),
        ultimaResidenza: text('Ultimo comune di residenza del defunto'),
        statoCivile: enumField('Stato civile del defunto al momento del decesso', STATO_CIVILE_VALUES),
        nomeConiuge: text('Nome e cognome del coniuge superstite, se presente'),
        comuneRegistrazione: text("Comune dove è stato registrato l'atto di morte"),
        parteSerie: text("Parte e serie dell'atto"),
        numero: text("Numero dell'atto di morte"),
    }, ['nomeDefunto', 'cognomeDefunto', 'dataDecesso', 'luogoMorte', 'comuneRegistrazione']),
};
