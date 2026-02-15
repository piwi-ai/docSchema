/**
 * Dichiarazione di Permuta — Trade-in declaration.
 * Used by: car-dealership.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, objectSchema,
    codiceFiscale, targa,
} from '../../../helpers/it.js';

export const permuta: DocumentTypeDef = {
    id: 'doc-permuta',
    name: 'Dichiarazione di Permuta',
    description: 'Dichiarazione relativa al veicolo ritirato in permuta',
    jsonSchema: objectSchema({
        targaRitirato: targa(),
        marcaRitirato: text('Marca del veicolo ritirato'),
        modelloRitirato: text('Modello del veicolo ritirato'),
        kmRitirato: num('Chilometraggio del veicolo ritirato'),
        valorePermuta: num('Valore riconosciuto per la permuta in Euro'),
        proprietarioRitirato: text('Nome e cognome proprietario del veicolo ritirato'),
        codiceFiscaleProprietario: codiceFiscale(),
    }, ['targaRitirato', 'marcaRitirato', 'modelloRitirato', 'valorePermuta', 'proprietarioRitirato']),
};
