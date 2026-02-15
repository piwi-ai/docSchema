/**
 * Lettera di Disdetta — Policy cancellation letter.
 * Used by: insurance.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, date, objectSchema,
    codiceFiscale,
} from '../../../helpers/it.js';

export const disdetta: DocumentTypeDef = {
    id: 'doc-disdetta',
    name: 'Lettera di Disdetta',
    description: 'Comunicazione di disdetta della polizza assicurativa',
    jsonSchema: objectSchema({
        mittente: text('Nome e cognome / ragione sociale del mittente'),
        codiceFiscaleMittente: codiceFiscale(),
        destinatario: text('Compagnia assicurativa destinataria'),
        numeroPolizza: text('Numero polizza da disdettare'),
        dataEffettoDisdetta: date('Data effetto della disdetta'),
        motivo: text('Motivo della disdetta (se dichiarato)'),
        dataLettera: date('Data della lettera'),
    }, ['mittente', 'numeroPolizza', 'dataEffettoDisdetta']),
};
