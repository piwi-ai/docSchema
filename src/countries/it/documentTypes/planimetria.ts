/**
 * Planimetria Catastale — Cadastral floor plan.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, objectSchema, ref, datePattern,
} from '../../../helpers/it.js';

export const planimetria: DocumentTypeDef = {
    id: 'doc-planimetria',
    name: 'Planimetria Catastale',
    description: 'Dati identificativi della scheda grafica',
    references: [
        ref('Agenzia delle Entrate — Planimetria catastale', 'https://www.agenziaentrate.gov.it/portale/web/guest/schede/fabbricatiterreni/visura-catastale', 'documentation'),
    ],
    jsonSchema: objectSchema({
        foglio: { type: 'string' },
        particella: { type: 'string' },
        subalterno: { type: 'string' },
        protocollo: { type: 'string' },
        dataProtocollo: datePattern('Data del protocollo in formato europeo DD/MM/YYYY'),
        scala: text('Scala della planimetria (es. 1:100, 1:200, 1:50, 1:500)'),
    }, ['foglio', 'particella', 'subalterno', 'protocollo', 'dataProtocollo', 'scala']),
};
