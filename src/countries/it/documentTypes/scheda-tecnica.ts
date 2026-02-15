/**
 * Scheda Tecnica Veicolo — Vehicle technical/commercial spec sheet.
 * Used by: car-dealership.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, objectSchema,
} from '../../../helpers/it.js';

export const schedaTecnica: DocumentTypeDef = {
    id: 'doc-scheda-tecnica',
    name: 'Scheda Tecnica Veicolo',
    description: 'Scheda tecnica/commerciale del veicolo con optionals e allestimento',
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
