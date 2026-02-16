/**
 * Verbale Autorità — Authority report.
 * Used by: insurance.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, date, enumField, objectSchema, arrayOfObjects,
    targa,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const verbaleAutorita: DocumentTypeDef = {
    id: 'doc-verbale-autorita',
    name: 'Verbale Autorità',
    description: 'Verbale di Polizia Stradale, Carabinieri o Polizia Municipale',
    references: [
        {
            title: 'Codice della Strada — D.Lgs. 285/1992 Art. 11',
            url: 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1992-04-30;285',
            type: ReferenceType.REGULATION,
        },
    ],
    jsonSchema: objectSchema({
        autorita: text('Autorità che ha redatto il verbale'),
        dataVerbale: date('Data del verbale'),
        luogo: text("Luogo dell'intervento"),
        numeroVerbale: text('Numero protocollo verbale'),
        veicoliCoinvolti: arrayOfObjects({
            targa: targa(), conducente: text('Nome e cognome del conducente'),
        }, ['targa'], 'Veicoli coinvolti'),
        contravvenzioni: text('Eventuali contravvenzioni contestate'),
        rilievi: text("Rilievi e osservazioni dell'autorità — copia VERBATIM"),
        feriti: enumField('Feriti segnalati', ['sì', 'no']),
    }, ['autorita', 'dataVerbale', 'luogo']),
};
