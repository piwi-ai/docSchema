/**
 * Documentazione Condominiale — Condominium documentation.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, date, enumField, objectSchema, ref,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const documentazioneCondominiale: DocumentTypeDef = {
    id: 'doc-condominiale',
    name: 'Documentazione Condominiale',
    description: 'Dichiarazione dell\'amministratore di condominio sulle spese e regolamento condominiale',
    references: [
        ref('Art. 1117–1139 Codice Civile — Condominio', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:codice.civile:1942-03-16;262~art1117', ReferenceType.REGULATION),
        ref('L. 220/2012 — Riforma del condominio', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2012-12-11;220', ReferenceType.REGULATION),
    ],
    jsonSchema: objectSchema({
        amministratore: text('Nome e cognome o ragione sociale dell\'amministratore'),
        condominio: text('Denominazione del condominio'),
        indirizzo: text('Indirizzo del condominio'),
        unitaImmobiliare: text('Identificazione dell\'unità immobiliare (es. Scala A, Piano 3, Int. 5)'),
        quoteRegolari: enumField('Le quote condominiali sono regolarmente pagate', ['sì', 'no']),
        importoArretrati: text('Eventuali arretrati dovuti'),
        speseStraodinarie: text('Spese straordinarie deliberate o in corso'),
        millesimi: text('Millesimi di proprietà dell\'unità'),
        dataRilascio: date('Data di rilascio della dichiarazione in formato europeo DD.MM.YYYY'),
    }, ['amministratore', 'condominio', 'indirizzo', 'unitaImmobiliare', 'quoteRegolari', 'dataRilascio']),
};
