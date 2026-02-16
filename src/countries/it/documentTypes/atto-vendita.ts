/**
 * Atto di Vendita / Passaggio di Proprietà — Vehicle sale contract.
 * Used by: car-dealership.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, date, objectSchema, ref,
    nome, cognome, codiceFiscale, statoCivile, targa, telaio,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const attoVendita: DocumentTypeDef = {
    id: 'doc-atto-vendita',
    name: 'Atto di Vendita / Passaggio di Proprietà',
    description: 'Contratto di compravendita veicolo con dati delle parti e del veicolo',
    references: [
        ref('ACI — Passaggio di proprietà', 'https://www.aci.it/i-servizi/guide-utili/guida-pratiche-auto/passaggio-di-proprieta.html', ReferenceType.DOCUMENTATION),
    ],
    jsonSchema: objectSchema({
        venditore: objectSchema({
            nome: nome(), cognome: cognome(), codiceFiscale: codiceFiscale(),
            indirizzo: text('Indirizzo di residenza del venditore'),
            statoCivile: statoCivile(),
        }, ['nome', 'cognome', 'codiceFiscale']),
        acquirente: objectSchema({
            nome: nome(), cognome: cognome(), codiceFiscale: codiceFiscale(),
            indirizzo: text("Indirizzo di residenza dell'acquirente"),
            statoCivile: statoCivile(),
        }, ['nome', 'cognome', 'codiceFiscale']),
        targa: targa(), telaio: telaio(),
        marca: text('Marca del veicolo'),
        modello: text('Modello del veicolo'),
        prezzo: num('Prezzo di vendita in Euro'),
        dataVendita: date("Data di stipula dell'atto"),
        km: num('Chilometraggio dichiarato al momento della vendita'),
        modalitaPagamento: text('Modalità di pagamento (contanti, bonifico, finanziamento, ecc.)'),
    }, ['venditore', 'acquirente', 'targa', 'prezzo', 'dataVendita']),
};
