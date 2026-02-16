/**
 * Lettera di Disdetta — Policy cancellation letter.
 * Used by: insurance.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, date, objectSchema, codiceFiscale } from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const disdetta: DocumentTypeDef = {
    id: 'doc-disdetta',
    name: 'Lettera di Disdetta',
    description: 'Comunicazione di disdetta della polizza assicurativa',
    references: [
        {
            title: 'Codice delle Assicurazioni Private — D.Lgs. 209/2005 Art. 172',
            url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2005-09-07;209',
            type: ReferenceType.REGULATION,
        },
    ],
    jsonSchema: objectSchema(
        {
            mittente: text('Nome e cognome / ragione sociale del mittente'),
            codiceFiscaleMittente: codiceFiscale(),
            destinatario: text('Compagnia assicurativa destinataria'),
            numeroPolizza: text('Numero polizza da disdettare'),
            dataEffettoDisdetta: date('Data effetto della disdetta'),
            motivo: text('Motivo della disdetta (se dichiarato)'),
            dataLettera: date('Data della lettera'),
        },
        ['mittente', 'numeroPolizza', 'dataEffettoDisdetta'],
    ),
};
