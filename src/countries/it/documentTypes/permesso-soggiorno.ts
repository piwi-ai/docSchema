/**
 * Permesso di Soggiorno — Residence permit.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, date, objectSchema, ref,
    nome, cognome, codiceFiscale,
} from '../../../helpers/it.js';

export const permessoSoggiorno: DocumentTypeDef = {
    id: 'doc-permesso-soggiorno',
    name: 'Permesso di Soggiorno',
    description: 'Documento rilasciato dalla Questura per cittadini extracomunitari — richiesto per acquirenti/venditori non-UE',
    references: [
        ref('Questura — Permesso di soggiorno', 'https://questure.poliziadistato.it/stranieri', 'documentation'),
        ref('D.Lgs. 286/1998 — Testo Unico Immigrazione', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1998-07-25;286', 'regulation'),
    ],
    jsonSchema: objectSchema({
        nome: nome(),
        cognome: cognome(),
        codiceFiscale: codiceFiscale(),
        cittadinanza: text('Cittadinanza del titolare'),
        tipoPermesso: text('Tipo di permesso (es. lavoro subordinato, famiglia, lungo soggiorno)'),
        numeroPermesso: text('Numero del permesso di soggiorno'),
        dataRilascio: date('Data di rilascio in formato europeo DD.MM.YYYY'),
        dataScadenza: date('Data di scadenza in formato europeo DD.MM.YYYY'),
        questura: text('Questura rilasciante'),
    }, ['nome', 'cognome', 'codiceFiscale', 'tipoPermesso', 'dataRilascio', 'dataScadenza']),
};
