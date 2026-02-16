/**
 * Scheda Tecnica Veicolo — Vehicle technical/commercial spec sheet.
 * Used by: car-dealership.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, objectSchema,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const schedaTecnica: DocumentTypeDef = {
    id: 'doc-scheda-tecnica',
    name: 'Scheda Tecnica Veicolo',
    description: 'Scheda tecnica/commerciale del veicolo con optionals e allestimento',
    references: [
        {
            title: 'EU Reg. 2018/858 — Type Approval',
            url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32018R0858',
            type: ReferenceType.REGULATION,
        },
    ],
    jsonSchema: objectSchema({
        marca: text('Marca'), modello: text('Modello'),
        allestimento: text('Livello di allestimento (es. Lounge, Sport, Executive)'),
        annoModello: num('Anno modello'),
        coloreEsterno: text('Colore carrozzeria'),
        coloreInterno: text('Colore e materiale interni'),
        optionals: text('Lista optionals inclusi (separati da virgola)'),
        prezzoListino: num('Prezzo di listino in Euro'),
    }, ['marca', 'modello']),
};
