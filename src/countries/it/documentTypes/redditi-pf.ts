/**
 * Modello Redditi PF — Income tax return for individuals with VAT.
 * Used by: accountant.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, enumField, objectSchema, ref,
    nome, cognome, codiceFiscale, partitaIva,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const redditiPf: DocumentTypeDef = {
    id: 'doc-redditi-pf',
    name: 'Modello Redditi PF',
    description: 'Dichiarazione dei redditi per persone fisiche con P.IVA o redditi complessi',
    references: [
        ref('Agenzia delle Entrate — Modello Redditi PF', 'https://www.agenziaentrate.gov.it/portale/web/guest/modello-redditi-pf', ReferenceType.DOCUMENTATION),
    ],
    jsonSchema: objectSchema({
        anno: num('Anno fiscale di riferimento'),
        contribuente: objectSchema({
            nome: nome(), cognome: cognome(), codiceFiscale: codiceFiscale(),
            partitaIva: partitaIva(),
        }, ['nome', 'cognome', 'codiceFiscale']),
        regime: enumField('Regime fiscale', ['ordinario', 'forfettario', 'semplificato']),
        redditoComplessivo: num('Reddito complessivo in Euro'),
        impostaNetta: num('Imposta netta in Euro'),
        quadriCompilati: text('Elenco dei quadri compilati'),
        volumeAffari: num('Volume d\'affari in Euro'),
    }, ['anno', 'contribuente', 'redditoComplessivo']),
};
