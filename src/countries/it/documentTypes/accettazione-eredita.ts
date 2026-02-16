/**
 * Accettazione di Eredità — Inheritance acceptance.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, date, enumField, objectSchema, ref,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const accettazioneEredita: DocumentTypeDef = {
    id: 'doc-eredita',
    name: 'Accettazione di Eredità',
    description: "Atto di accettazione dell'eredità trascritto in Conservatoria, necessario per la vendita di immobili ereditati",
    references: [
        ref('Art. 459–511 Codice Civile — Successioni', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:codice.civile:1942-03-16;262~art459', ReferenceType.REGULATION),
    ],
    jsonSchema: objectSchema({
        erede: text("Nome e cognome dell'erede accettante"),
        codiceFiscaleErede: text("Codice Fiscale dell'erede"),
        defunto: text('Nome e cognome del defunto'),
        tipoAccettazione: enumField('Tipo di accettazione', ['pura e semplice', 'con beneficio d\'inventario']),
        dataTrascrizione: date('Data di trascrizione in formato europeo DD.MM.YYYY'),
        notaio: text('Notaio rogante'),
        numeroRepertorio: { type: 'string' },
        numeroTrascrizione: text('Numero di trascrizione in Conservatoria'),
    }, ['erede', 'codiceFiscaleErede', 'defunto', 'dataTrascrizione']),
};
