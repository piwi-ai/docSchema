/**
 * Libretto di Circolazione — Vehicle registration document (car-dealership version).
 * Used by: car-dealership.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, date, enumField, objectSchema, ref,
    codiceFiscale, targa, telaio,
} from '../../../helpers/it.js';

export const librettoCircolazione: DocumentTypeDef = {
    id: 'doc-libretto-circolazione',
    name: 'Libretto di Circolazione',
    description: 'Carta di circolazione del veicolo con dati tecnici e intestatario',
    references: [
        ref('Motorizzazione Civile — Carta di Circolazione', 'https://www.mit.gov.it/temi/trasporti/motorizzazione', 'documentation'),
    ],
    jsonSchema: objectSchema({
        targa: targa(), telaio: telaio(),
        marca: text('Marca del veicolo (es. FIAT, BMW, Audi)'),
        modello: text('Modello del veicolo (es. Panda, Serie 3, A4)'),
        allestimento: text('Versione/allestimento se presente'),
        cilindrata: num('Cilindrata in cc'),
        potenzaKw: num('Potenza in kW'),
        alimentazione: enumField('Tipo alimentazione', ['benzina', 'diesel', 'GPL', 'metano', 'ibrido', 'elettrico']),
        dataImmatricolazione: date('Data di prima immatricolazione'),
        massamassimaKg: num('Massa complessiva in kg'),
        posti: num('Numero posti a sedere'),
        intestatario: text('Nome e cognome/ragione sociale intestatario'),
        codiceFiscaleIntestatario: codiceFiscale(),
        classeAmbientale: text('Classe ambientale (es. Euro 6, Euro 5)'),
    }, ['targa', 'telaio', 'marca', 'modello', 'dataImmatricolazione', 'intestatario', 'codiceFiscaleIntestatario']),
};
