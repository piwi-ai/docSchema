/**
 * Dichiarazione di Permuta — Trade-in declaration.
 * Used by: car-dealership.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, num, objectSchema, codiceFiscale, targa } from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const permuta: DocumentTypeDef = {
    id: 'doc-permuta',
    name: 'Dichiarazione di Permuta',
    description: 'Dichiarazione relativa al veicolo ritirato in permuta',
    references: [
        {
            title: 'Codice Civile Art. 1552 — Permuta',
            url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:regio.decreto:1942-03-16;262',
            type: ReferenceType.REGULATION,
        },
    ],
    jsonSchema: objectSchema(
        {
            targaRitirato: targa(),
            marcaRitirato: text('Marca del veicolo ritirato'),
            modelloRitirato: text('Modello del veicolo ritirato'),
            kmRitirato: num('Chilometraggio del veicolo ritirato'),
            valorePermuta: num('Valore riconosciuto per la permuta in Euro'),
            proprietarioRitirato: text('Nome e cognome proprietario del veicolo ritirato'),
            codiceFiscaleProprietario: codiceFiscale(),
        },
        [
            'targaRitirato',
            'marcaRitirato',
            'modelloRitirato',
            'valorePermuta',
            'proprietarioRitirato',
        ],
    ),
};
