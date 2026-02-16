/**
 * Sentenza di Separazione/Divorzio — Separation/divorce ruling.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, date, enumField, objectSchema, ref,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const sentenzaSeparazione: DocumentTypeDef = {
    id: 'doc-separazione',
    name: 'Sentenza di Separazione/Divorzio',
    description: 'Provvedimento giudiziario di separazione legale o divorzio, rilevante per la determinazione dei diritti patrimoniali sull\'immobile',
    references: [
        ref('Art. 150–158 Codice Civile — Separazione', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:codice.civile:1942-03-16;262~art150', ReferenceType.REGULATION),
    ],
    jsonSchema: objectSchema({
        tribunale: text('Tribunale competente che ha emesso la sentenza'),
        numeroSentenza: text('Numero di ruolo/sentenza'),
        dataSentenza: date('Data della sentenza in formato europeo DD.MM.YYYY'),
        coniuge1: text('Nome e cognome del primo coniuge'),
        coniuge2: text('Nome e cognome del secondo coniuge'),
        tipoProvvedimento: enumField('Tipo di provvedimento', ['separazione consensuale', 'separazione giudiziale', 'divorzio']),
        disposizioniPatrimoniali: text('Disposizioni relative ai beni immobili — copiare TESTUALMENTE dal documento, senza riformulare o riassumere (es. assegnazione casa coniugale)'),
        passaggioInGiudicato: date('Data di passaggio in giudicato in formato europeo DD.MM.YYYY'),
    }, ['tribunale', 'dataSentenza', 'coniuge1', 'coniuge2', 'tipoProvvedimento']),
};
