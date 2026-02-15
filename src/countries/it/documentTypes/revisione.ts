/**
 * Certificato di Revisione — Vehicle inspection certificate.
 * Used by: car-dealership.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, date, enumField, objectSchema, ref,
    targa,
} from '../../../helpers/it.js';

export const revisione: DocumentTypeDef = {
    id: 'doc-revisione',
    name: 'Certificato di Revisione',
    description: 'Esito della revisione ministeriale del veicolo',
    references: [
        ref('Portale dell\'Automobilista — Revisione', 'https://www.ilportaledellautomobilista.it/web/portale-automobilista/revisioni', 'documentation'),
    ],
    jsonSchema: objectSchema({
        targa: targa(),
        dataRevisione: date('Data della revisione'),
        esito: enumField('Esito della revisione', ['REGOLARE', 'RIPETERE', 'SOSPESO']),
        kmRevisione: num('Chilometraggio alla revisione'),
        scadenzaProssimaRevisione: date('Data scadenza prossima revisione'),
        centroRevisione: text('Denominazione del centro revisione'),
    }, ['targa', 'dataRevisione', 'esito']),
};
