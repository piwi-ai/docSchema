/**
 * Quietanza di Premio — Insurance premium receipt.
 * Used by: insurance.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, date, objectSchema,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const quietanza: DocumentTypeDef = {
    id: 'doc-quietanza',
    name: 'Quietanza di Premio',
    description: 'Ricevuta di pagamento del premio assicurativo',
    references: [
        {
            title: 'IVASS — Regolamento n. 40/2018 (Obblighi informativi)',
            url: 'https://www.ivass.it/normativa/nazionale/secondaria-ivass/regolamenti/2018/n40/index.html',
            type: ReferenceType.REGULATION,
        },
    ],
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
