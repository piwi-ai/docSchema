/**
 * Certificato di Residenza — Residence certificate.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, date, objectSchema, ref, nome, cognome, codiceFiscale } from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const certificatoResidenza: DocumentTypeDef = {
    id: 'doc-residenza',
    name: 'Certificato di Residenza',
    description:
        "Certificato anagrafico che attesta la residenza attuale, richiesto quando l'indirizzo sull'identità differisce dalla residenza corrente",
    references: [
        ref(
            'ANPR — Anagrafe Nazionale Popolazione Residente',
            'https://www.anagrafenazionale.interno.it/',
            ReferenceType.DOCUMENTATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            nome: nome(),
            cognome: cognome(),
            codiceFiscale: codiceFiscale(),
            indirizzo: text('Indirizzo completo di residenza attuale'),
            comune: text('Comune di residenza'),
            provincia: text('Sigla Provincia'),
            cap: text('Codice Avviamento Postale'),
            dataRilascio: date('Data di rilascio in formato europeo DD.MM.YYYY'),
            comuneRilascio: text('Comune che ha rilasciato il certificato'),
        },
        ['nome', 'cognome', 'codiceFiscale', 'indirizzo', 'comune', 'dataRilascio'],
    ),
};
