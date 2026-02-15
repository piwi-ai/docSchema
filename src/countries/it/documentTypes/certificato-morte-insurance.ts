/**
 * Certificato di Morte (versione assicurativa) — Death certificate for life insurance.
 * Used by: insurance.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, date, objectSchema, ref,
    nome, cognome, codiceFiscale,
} from '../../../helpers/it.js';

export const certificatoMorteInsurance: DocumentTypeDef = {
    id: 'doc-certificato-morte',
    name: 'Certificato di Morte',
    description: 'Certificato di morte — per liquidazione polizza vita caso morte',
    references: [
        ref('Ministero dell\'Interno — Servizi demografici', 'https://dait.interno.gov.it/servizi-demografici', 'documentation'),
    ],
    jsonSchema: objectSchema({
        defunto: objectSchema({
            nome: nome(), cognome: cognome(), codiceFiscale: codiceFiscale(),
            dataNascita: date('Data di nascita'),
            luogoNascita: text('Luogo di nascita'),
        }, ['nome', 'cognome', 'codiceFiscale']),
        dataDecesso: date('Data del decesso'),
        luogoDecesso: text('Luogo del decesso'),
        causaDecesso: text('Causa del decesso (se indicata)'),
        comune: text('Comune che ha rilasciato il certificato'),
        dataRilascio: date('Data di rilascio'),
    }, ['defunto', 'dataDecesso', 'luogoDecesso']),
};
