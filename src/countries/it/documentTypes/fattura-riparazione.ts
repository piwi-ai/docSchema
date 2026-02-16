/**
 * Fattura di Riparazione — Repair invoice.
 * Used by: insurance.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, date, objectSchema, ref,
    targa,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const fatturaRiparazione: DocumentTypeDef = {
    id: 'doc-fattura-riparazione',
    name: 'Fattura di Riparazione',
    description: "Fattura dell'officina/carrozzeria per riparazione danni",
    references: [
        ref('FatturaPA — Formato Fattura Elettronica', 'https://www.fatturapa.gov.it/it/norme-e-regole/documentazione-fatturapa/', ReferenceType.SPECIFICATION),
    ],
    jsonSchema: objectSchema({
        officina: text('Denominazione officina/carrozzeria'),
        partitaIva: text('Partita IVA officina'),
        numero: text('Numero fattura'),
        data: date('Data fattura'),
        targa: targa(),
        lavorazioni: text('Descrizione lavorazioni eseguite'),
        ricambi: text('Elenco ricambi utilizzati'),
        manodopera: num('Costo manodopera in Euro'),
        costoRicambi: num('Costo ricambi in Euro'),
        imponibile: num('Totale imponibile in Euro'),
        iva: num('IVA in Euro'),
        totale: num('Totale fattura in Euro'),
    }, ['officina', 'numero', 'data', 'targa', 'totale']),
};
