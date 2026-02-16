/**
 * Visura Camerale — Chamber of Commerce registration document.
 * Shared by: accountant, car-dealership, real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, date, enumField, objectSchema, ref, codiceFiscale } from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const visuraCamerale: DocumentTypeDef = {
    id: 'doc-visura-camerale',
    name: 'Visura Camerale',
    description:
        'Visura della Camera di Commercio — dati societari, legale rappresentante, codice ATECO',
    references: [
        ref(
            'Registro Imprese — Camera di Commercio',
            'https://www.registroimprese.it/',
            ReferenceType.DOCUMENTATION,
        ),
        ref('InfoCamere — Visure', 'https://www.infocamere.it/visure', ReferenceType.DOCUMENTATION),
    ],
    jsonSchema: objectSchema(
        {
            ragioneSociale: text('Ragione sociale / denominazione'),
            partitaIva: text('Partita IVA'),
            codiceFiscale: text("Codice fiscale dell'impresa"),
            sedeLegale: text('Indirizzo sede legale'),
            legaleRappresentante: text('Nome e cognome del legale rappresentante'),
            cfLegaleRappresentante: codiceFiscale(),
            codiceAteco: text('Codice ATECO principale'),
            descrizioneAteco: text('Descrizione attività ATECO'),
            formaGiuridica: text('Forma giuridica (es. S.r.l., S.p.A., S.a.s.)'),
            capitaleSociale: { type: 'number', description: 'Capitale sociale in Euro' },
            statoImpresa: enumField("Stato dell'impresa", [
                'attiva',
                'inattiva',
                'cessata',
                'in liquidazione',
            ]),
            dataIscrizione: date('Data iscrizione alla Camera di Commercio'),
            rea: text('Numero REA'),
            oggettoSociale: text('Oggetto sociale della società'),
        },
        ['ragioneSociale', 'partitaIva', 'legaleRappresentante', 'codiceAteco'],
    ),
};
