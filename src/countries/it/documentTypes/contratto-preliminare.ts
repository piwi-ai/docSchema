/**
 * Contratto Preliminare — Preliminary purchase agreement.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    num, date, text, objectSchema, ref,
    nome, cognome, codiceFiscale, statoCivile, datePattern,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

const semplicePersonaProps = { nome: nome(), cognome: cognome(), codiceFiscale: codiceFiscale(), statoCivile: statoCivile() };
const semplicePersonaReq = ['nome', 'cognome', 'codiceFiscale'];

export const contrattoPrelim: DocumentTypeDef = {
    id: 'doc-preliminare',
    name: 'Contratto Preliminare',
    description: 'Compromesso di compravendita',
    references: [
        ref('Art. 1351 Codice Civile — Contratto preliminare', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:codice.civile:1942-03-16;262~art1351', ReferenceType.REGULATION),
        ref('Agenzia delle Entrate — Registrazione preliminare', 'https://www.agenziaentrate.gov.it/portale/web/guest/schede/registrazione/registrazione-preliminare', ReferenceType.DOCUMENTATION),
    ],
    jsonSchema: objectSchema({
        acquirenti: { type: 'array', items: { type: 'object', properties: semplicePersonaProps, required: semplicePersonaReq } },
        venditori: { type: 'array', items: { type: 'object', properties: semplicePersonaProps, required: semplicePersonaReq } },
        prezzo: { type: 'number' },
        dataStipula: datePattern('Data di stipula in formato europeo DD/MM/YYYY'),
        caparra: num('Importo della caparra confirmatoria in Euro'),
        dataRogito: datePattern('Data prevista per il rogito definitivo in formato europeo DD/MM/YYYY'),
        mediatore: text('Nome dell\'agenzia immobiliare o del mediatore (Art. 35 D.Lgs. 223/2006)'),
        modalitaPagamento: text('Modalità di pagamento previste'),
    }, ['acquirenti', 'venditori', 'prezzo', 'dataStipula']),
};
