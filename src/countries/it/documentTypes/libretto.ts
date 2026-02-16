/**
 * Libretto di Circolazione — Vehicle registration document (insurance version).
 * Used by: insurance.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, date, enumField, objectSchema, ref,
    codiceFiscale, targa, telaio,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const libretto: DocumentTypeDef = {
    id: 'doc-libretto',
    name: 'Libretto di Circolazione',
    description: 'Carta di circolazione del veicolo assicurato',
    references: [
        ref('Motorizzazione Civile — Carta di Circolazione', 'https://www.mit.gov.it/temi/trasporti/motorizzazione', ReferenceType.DOCUMENTATION),
    ],
    jsonSchema: objectSchema({
        targa: targa(), telaio: telaio(),
        marca: text('Marca del veicolo'), modello: text('Modello del veicolo'),
        cilindrata: num('Cilindrata in cc'),
        potenzaKw: num('Potenza in kW'),
        alimentazione: enumField('Tipo alimentazione', ['benzina', 'diesel', 'GPL', 'metano', 'ibrido', 'elettrico']),
        dataImmatricolazione: date('Data di prima immatricolazione'),
        intestatario: text('Nome e cognome/ragione sociale intestatario'),
        codiceFiscaleIntestatario: codiceFiscale(),
    }, ['targa', 'telaio', 'marca', 'modello', 'dataImmatricolazione', 'intestatario']),
};
