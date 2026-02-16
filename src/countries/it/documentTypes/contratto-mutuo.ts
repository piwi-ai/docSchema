/**
 * Contratto di Mutuo — Mortgage contract.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, date, enumField, objectSchema, ref,
    codiceFiscale,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const contrattoMutuo: DocumentTypeDef = {
    id: 'doc-contratto-mutuo',
    name: 'Contratto di Mutuo',
    description: 'Contratto di mutuo ipotecario stipulato contestualmente al rogito',
    references: [
        ref('Art. 1813–1822 Codice Civile — Mutuo', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:codice.civile:1942-03-16;262~art1813', ReferenceType.REGULATION),
    ],
    jsonSchema: objectSchema({
        banca: text('Nome della banca o istituto di credito'),
        mutuatario: text('Nome e cognome del mutuatario'),
        codiceFiscaleMutuatario: codiceFiscale('Codice Fiscale del mutuatario (extract without spaces)'),
        importoMutuo: num('Importo del mutuo erogato in Euro'),
        durataAnni: num('Durata del mutuo in anni'),
        tassoInteresse: text('Tasso di interesse e percentuale'),
        tipoTasso: enumField('Tipo di tasso', ['fisso', 'variabile', 'misto']),
        rataMensile: num('Importo rata mensile in Euro'),
        notaio: text('Nome e cognome del notaio rogante'),
        dataStipula: date('Data di stipula in formato europeo DD.MM.YYYY'),
        numeroRepertorio: text('Numero di repertorio'),
        ipoteca: text('Grado e importo dell\'ipoteca iscritta'),
    }, ['banca', 'mutuatario', 'codiceFiscaleMutuatario', 'importoMutuo', 'dataStipula', 'notaio']),
};
