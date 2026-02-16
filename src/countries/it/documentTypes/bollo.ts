/**
 * Attestazione Pagamento Bollo — Vehicle tax payment receipt.
 * Used by: car-dealership.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    num, date, objectSchema, ref,
    targa,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const bollo: DocumentTypeDef = {
    id: 'doc-bollo',
    name: 'Attestazione Pagamento Bollo',
    description: 'Ricevuta pagamento tassa automobilistica',
    references: [
        ref('ACI — Bollo Auto', 'https://www.aci.it/i-servizi/servizi-online/bollo-auto.html', ReferenceType.DOCUMENTATION),
    ],
    jsonSchema: objectSchema({
        targa: targa(),
        anno: num('Anno di riferimento del bollo'),
        importo: num('Importo pagato in Euro'),
        dataScadenza: date('Data scadenza del bollo'),
        dataPagamento: date('Data del pagamento'),
    }, ['targa', 'anno', 'importo']),
};
