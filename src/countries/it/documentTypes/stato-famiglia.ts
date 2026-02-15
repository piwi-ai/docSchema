/**
 * Certificato Stato Famiglia (versione assicurativa) — Family status certificate.
 * Used by: insurance.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, date, objectSchema, arrayOfObjects, ref,
    nome, cognome, codiceFiscale,
} from '../../../helpers/it.js';

export const statoFamiglia: DocumentTypeDef = {
    id: 'doc-stato-famiglia',
    name: 'Certificato Stato Famiglia',
    description: 'Certificato stato di famiglia — per polizze vita e beneficiari',
    references: [
        ref('Ministero dell\'Interno — Servizi demografici', 'https://dait.interno.gov.it/servizi-demografici', 'documentation'),
    ],
    jsonSchema: objectSchema({
        intestatario: objectSchema({
            nome: nome(), cognome: cognome(), codiceFiscale: codiceFiscale(),
            indirizzo: text('Indirizzo di residenza'),
        }, ['nome', 'cognome', 'codiceFiscale']),
        componenti: arrayOfObjects({
            nome: nome(), cognome: cognome(), codiceFiscale: codiceFiscale(),
            relazione: text("Relazione con l'intestatario (coniuge, figlio, ecc.)"),
            dataNascita: date('Data di nascita'),
        }, ['nome', 'cognome', 'relazione'], 'Componenti del nucleo familiare'),
        dataRilascio: date('Data di rilascio del certificato'),
        comune: text('Comune che ha rilasciato il certificato'),
    }, ['intestatario', 'componenti']),
};
