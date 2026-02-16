/**
 * Certificato di Stato di Famiglia — Family status certificate.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, date, objectSchema, arrayOfObjects, ref,
    codiceFiscale,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

const RELAZIONE_FAMILIARE_DESC = 'Relazione familiare (es. intestatario, coniuge, convivente, figlio/a, padre, madre, fratello/sorella, nipote)';

export const certificatoFamiglia: DocumentTypeDef = {
    id: 'doc-famiglia',
    name: 'Certificato di Stato di Famiglia',
    description: 'Certificato anagrafico che attesta la composizione del nucleo familiare, utile per verifiche sul regime patrimoniale',
    references: [
        ref('Ministero dell\'Interno — Servizi demografici', 'https://dait.interno.gov.it/servizi-demografici', ReferenceType.DOCUMENTATION),
    ],
    jsonSchema: objectSchema({
        intestatario: text("Nome e cognome dell'intestatario del nucleo familiare"),
        codiceFiscaleIntestatario: codiceFiscale('Codice Fiscale dell\'intestatario (extract without spaces)'),
        indirizzo: text('Indirizzo di residenza del nucleo familiare'),
        comune: { type: 'string' },
        componenti: arrayOfObjects({
            nome: { type: 'string' },
            cognome: { type: 'string' },
            codiceFiscale: { type: 'string', description: 'Codice Fiscale del componente, se presente' },
            dataNascita: { type: 'string' },
            relazione: text(RELAZIONE_FAMILIARE_DESC),
        }, ['nome', 'cognome', 'dataNascita', 'relazione']),
        dataRilascio: date('Data di rilascio in formato europeo DD.MM.YYYY'),
    }, ['intestatario', 'indirizzo', 'comune', 'componenti', 'dataRilascio']),
};
