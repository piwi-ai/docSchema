/**
 * Ricevuta / Scontrino — Receipt.
 * Used by: accountant.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, date, enumField, objectSchema, ref,
    partitaIva,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const ricevuta: DocumentTypeDef = {
    id: 'doc-ricevuta',
    name: 'Ricevuta / Scontrino',
    description: 'Ricevuta fiscale o scontrino per spese deducibili/detraibili',
    references: [
        ref('Agenzia delle Entrate — Corrispettivi Telematici', 'https://www.agenziaentrate.gov.it/portale/web/guest/aree-tematiche/corrispettivi-telematici', ReferenceType.DOCUMENTATION),
    ],
    jsonSchema: objectSchema({
        data: date('Data della ricevuta/scontrino'),
        esercente: text('Nome/ragione sociale dell\'esercente'),
        partitaIva: partitaIva(),
        importo: num('Importo totale in Euro'),
        descrizione: text('Descrizione della spesa'),
        tipoPagamento: enumField('Tipo pagamento', ['contanti', 'carta', 'bonifico', 'assegno']),
    }, ['data', 'importo', 'descrizione']),
};
