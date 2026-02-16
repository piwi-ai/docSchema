/**
 * Certificato di Destinazione Urbanistica (CDU) — Urban planning certificate.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, date, objectSchema, ref } from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const certificatoCDU: DocumentTypeDef = {
    id: 'doc-cdu',
    name: 'Certificato di Destinazione Urbanistica (CDU)',
    description:
        'Certificato rilasciato dal Comune che attesta la destinazione urbanistica di un terreno — obbligatorio per terreni >5000 mq (Art. 30 D.P.R. 380/2001)',
    references: [
        ref(
            'Art. 30 D.P.R. 380/2001 — CDU',
            'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.del.presidente.della.repubblica:2001-06-06;380~art30',
            ReferenceType.REGULATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            foglio: text('Foglio catastale'),
            particella: text('Particella catastale'),
            comune: text('Comune di ubicazione'),
            destinazioneUrbanistica: text(
                'Destinazione urbanistica (es. Zona Residenziale B2, Zona Agricola E1)',
            ),
            estremiPRG: text('Estremi del Piano Regolatore o Piano Urbanistico vigente'),
            dataRilascio: date('Data di rilascio in formato europeo DD.MM.YYYY'),
            validita: text('Validità del certificato (1 anno dalla data di rilascio)'),
        },
        ['foglio', 'particella', 'comune', 'destinazioneUrbanistica', 'dataRilascio'],
    ),
};
