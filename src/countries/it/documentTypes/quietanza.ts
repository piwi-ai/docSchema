/**
 * Quietanza di Premio — Insurance premium receipt.
 * Used by: insurance.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, date, objectSchema,
} from '../../../helpers/it.js';

export const quietanza: DocumentTypeDef = {
    id: 'doc-quietanza',
    name: 'Quietanza di Premio',
    description: 'Ricevuta di pagamento del premio assicurativo',
    jsonSchema: objectSchema({
        compagnia: text('Compagnia assicurativa'),
        numeroPolizza: text('Numero polizza'),
        contraente: text('Nome e cognome del contraente'),
        importo: num('Importo pagato in Euro'),
        dataPagamento: date('Data del pagamento'),
        periodoRiferimento: text('Periodo di copertura (es. 01.01.2025 - 01.01.2026)'),
        modalitaPagamento: text('Modalità di pagamento'),
    }, ['compagnia', 'numeroPolizza', 'importo', 'dataPagamento']),
};
