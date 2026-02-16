/**
 * Attestazione ISEE — Financial situation indicator.
 * Used by: accountant.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    num, date, objectSchema, ref,
    nome, cognome, codiceFiscale,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const isee: DocumentTypeDef = {
    id: 'doc-isee',
    name: 'Attestazione ISEE',
    description: 'Attestazione ISEE — indicatore della situazione economica equivalente',
    references: [
        ref('INPS — ISEE', 'https://www.inps.it/it/it/dettaglio-scheda.schede-servizio-strumento.schede-servizi.isee-indicatore-della-situazione-economica-equivalente-50498.isee-indicatore-della-situazione-economica-equivalente.html', ReferenceType.DOCUMENTATION),
        ref('DSU — Modulo e istruzioni', 'https://servizi2.inps.it/servizi/CircMessStworker/VisualizzaDoc.aspx?inpsdoc=Circolare%20numero%20137%20del%2007-10-2016.htm', ReferenceType.SPECIFICATION),
    ],
    jsonSchema: objectSchema({
        anno: num('Anno di riferimento'),
        dichiarante: objectSchema({
            nome: nome(), cognome: cognome(), codiceFiscale: codiceFiscale(),
        }, ['nome', 'cognome', 'codiceFiscale']),
        valoreIsee: num('Valore ISEE in Euro'),
        valoreIse: num('Valore ISE in Euro'),
        patrimonioMob: num('Patrimonio mobiliare totale in Euro'),
        patrimonioImm: num('Patrimonio immobiliare totale in Euro'),
        redditoNucleoFamiliare: num('Reddito complessivo del nucleo familiare in Euro'),
        numComponenti: num('Numero componenti nucleo familiare'),
        scalaDiEquivalenza: num('Scala di equivalenza'),
        dataRilascio: date('Data di rilascio attestazione'),
        validita: date('Data di scadenza validità'),
    }, ['anno', 'dichiarante', 'valoreIsee']),
};
