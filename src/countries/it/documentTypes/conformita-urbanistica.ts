/**
 * Conformità Urbanistica ed Edilizia — Urban planning compliance.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, date, objectSchema, ref } from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const conformitaUrbanistica: DocumentTypeDef = {
    id: 'doc-conformita-urbanistica',
    name: 'Conformità Urbanistica ed Edilizia',
    description:
        "Relazione tecnica che attesta la corrispondenza tra lo stato di fatto dell'immobile e i titoli abilitativi depositati in Comune",
    references: [
        ref(
            'D.P.R. 380/2001 — Testo Unico Edilizia',
            'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.del.presidente.della.repubblica:2001-06-06;380',
            ReferenceType.REGULATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            tecnico: text('Nome del tecnico abilitato (architetto, ingegnere, geometra)'),
            dataRelazione: date('Data della relazione in formato europeo DD.MM.YYYY'),
            indirizzo: text("Indirizzo completo dell'immobile"),
            foglio: { type: 'string' },
            particella: { type: 'string' },
            subalterno: { type: 'string' },
            titoliAbilitativi: text(
                'Elenco dei titoli edilizi (licenza edilizia, concessione, permesso di costruire, SCIA, CILA)',
            ),
            esito: text(
                'Esito della verifica (es. conforme, non conforme, conforme con riserva, conforme con prescrizioni)',
            ),
            difformita: text(
                'Descrizione di eventuali difformità riscontrate — copiare TESTUALMENTE dal documento',
            ),
            condoni: text(
                'Eventuali domande di condono edilizio presentate — copiare TESTUALMENTE dal documento',
            ),
        },
        ['tecnico', 'dataRelazione', 'indirizzo', 'esito'],
    ),
};
