/**
 * Certificato di Garanzia — Vehicle warranty certificate.
 * Used by: car-dealership.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, num, date, enumField, objectSchema, targa } from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const garanzia: DocumentTypeDef = {
    id: 'doc-garanzia',
    name: 'Certificato di Garanzia',
    description: 'Garanzia convenzionale o legale sul veicolo (nuovi e usati)',
    references: [
        {
            title: 'Codice del Consumo — Garanzia legale (D.Lgs. 206/2005)',
            url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2005-09-06;206',
            type: ReferenceType.REGULATION,
        },
    ],
    jsonSchema: objectSchema(
        {
            tipoGaranzia: enumField('Tipo garanzia', ['legale', 'convenzionale', 'estesa']),
            durataMesi: num('Durata garanzia in mesi'),
            kmLimite: num('Limite chilometrico della garanzia'),
            copertura: text('Descrizione della copertura (motore, cambio, elettronica, ecc.)'),
            esclusioni: text('Eventuali esclusioni dalla garanzia'),
            targa: targa(),
            dataDecorrenza: date('Data decorrenza garanzia'),
        },
        ['tipoGaranzia', 'durataMesi', 'targa'],
    ),
};
