/**
 * Certificato di Agibilità — Habitability certificate.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, date, objectSchema, ref } from '../helpers.js';
import { DESTINAZIONE_USO_DESC } from './ape.js';
import { ReferenceType } from '../../../constants.js';

export const certificatoAgibilita: DocumentTypeDef = {
    id: 'doc-agibilita',
    name: 'Certificato di Agibilità',
    description:
        "Attesta che l'immobile soddisfa requisiti di sicurezza, igiene, salubrità e risparmio energetico",
    references: [
        ref(
            'Art. 24 D.P.R. 380/2001 — Agibilità',
            'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.del.presidente.della.repubblica:2001-06-06;380~art24',
            ReferenceType.REGULATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            numeroProtocollo: text('Numero di protocollo del certificato'),
            dataRilascio: date('Data di rilascio in formato europeo DD.MM.YYYY'),
            comuneRilascio: text('Comune che ha rilasciato il certificato'),
            richiedente: text('Nome e cognome del richiedente'),
            indirizzo: text("Indirizzo completo dell'immobile"),
            foglio: { type: 'string' },
            particella: { type: 'string' },
            subalterno: { type: 'string' },
            destinazioneUso: text(DESTINAZIONE_USO_DESC),
            tecnicoAsseverante: text('Nome del tecnico che ha asseverato la conformità'),
        },
        ['numeroProtocollo', 'dataRilascio', 'comuneRilascio', 'indirizzo', 'destinazioneUso'],
    ),
};
