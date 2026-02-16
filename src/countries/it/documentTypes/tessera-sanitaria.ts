/**
 * Tessera Sanitaria — Italian health card / tax ID.
 * Shared by: car-dealership, insurance, real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text,
    date,
    enumField,
    objectSchema,
    ref,
    nome,
    cognome,
    codiceFiscale,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const tesseraSanitaria: DocumentTypeDef = {
    id: 'doc-tessera-sanitaria',
    name: 'Tessera Sanitaria',
    description: 'Tessera sanitaria / Codice Fiscale — conferma CF e dati anagrafici',
    references: [
        ref(
            'Agenzia delle Entrate — Tessera Sanitaria',
            'https://sistemats1.sanita.finanze.it/portale/tessera-sanitaria',
            ReferenceType.DOCUMENTATION,
        ),
    ],
    isArrayExtraction: true,
    jsonSchema: objectSchema(
        {
            nome: nome(),
            cognome: cognome(),
            codiceFiscale: codiceFiscale(),
            sesso: enumField('Sesso', ['M', 'F']),
            dataNascita: date('Data di nascita'),
            luogoNascita: text('Comune di nascita'),
            provincia: text('Sigla provincia di nascita'),
            dataScadenza: date('Data di scadenza'),
            dataEmissione: date('Data di emissione'),
        },
        ['nome', 'cognome', 'codiceFiscale', 'sesso', 'dataNascita'],
    ),
};
