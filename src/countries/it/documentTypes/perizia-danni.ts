/**
 * Perizia Danni — Damage appraisal.
 * Used by: insurance.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, num, date, enumField, objectSchema, ref, targa } from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const periziaDanni: DocumentTypeDef = {
    id: 'doc-perizia-danni',
    name: 'Perizia Danni',
    description: 'Perizia tecnica dei danni — importo, descrizione danni, perito',
    references: [
        ref(
            'Art. 148 Codice delle Assicurazioni — Perizia',
            'https://www.ivass.it/normativa/nazionale/primaria/index.html',
            ReferenceType.REGULATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            numeroSinistro: text('Numero sinistro di riferimento'),
            perito: text('Nome e cognome del perito'),
            studioPeritale: text('Studio peritale incaricato'),
            targa: targa(),
            dataPerizia: date('Data della perizia'),
            danni: text('Descrizione dettagliata dei danni riscontrati'),
            importoRiparazione: num('Importo stimato per la riparazione in Euro'),
            importoLiquidazione: num('Importo proposto per la liquidazione in Euro'),
            demolizione: enumField('Veicolo da demolire', ['sì', 'no']),
            valoreAntesinistro: num('Valore del veicolo ante-sinistro in Euro'),
            fotografieAllegate: enumField('Fotografie allegate', ['sì', 'no']),
        },
        ['numeroSinistro', 'perito', 'targa', 'danni', 'importoRiparazione'],
    ),
};
