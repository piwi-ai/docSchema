/**
 * Polizza Assicurativa RCA — Compulsory motor liability insurance.
 * Used by: car-dealership.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, date, objectSchema, ref,
    codiceFiscale, targa,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const assicurazioneRca: DocumentTypeDef = {
    id: 'doc-assicurazione',
    name: 'Polizza Assicurativa RCA',
    description: 'Certificato di assicurazione obbligatoria RC Auto',
    references: [
        ref('IVASS — Codice delle Assicurazioni', 'https://www.ivass.it/normativa/nazionale/primaria/index.html', ReferenceType.REGULATION),
        ref('ANIA — Attestato di Rischio', 'https://www.ania.it/', ReferenceType.DOCUMENTATION),
    ],
    jsonSchema: objectSchema({
        compagnia: text('Compagnia assicurativa'),
        numeroPolizza: text('Numero polizza'),
        targa: targa(),
        contraente: text('Nome e cognome / ragione sociale del contraente'),
        codiceFiscaleContraente: codiceFiscale(),
        decorrenza: date('Data decorrenza copertura'),
        scadenza: date('Data scadenza copertura'),
        massimale: text('Massimale di copertura'),
        premio: num('Premio annuale in Euro'),
        classeMerito: text('Classe di merito (classe bonus/malus)'),
    }, ['compagnia', 'numeroPolizza', 'targa', 'contraente', 'scadenza']),
};
