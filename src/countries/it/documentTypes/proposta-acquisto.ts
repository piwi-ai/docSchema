/**
 * Proposta di Acquisto — Purchase proposal.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, objectSchema, arrayOfObjects, ref,
    nome, cognome, codiceFiscale, statoCivile,
} from '../../../helpers/it.js';

const semplicePersonaProps = { nome: nome(), cognome: cognome(), codiceFiscale: codiceFiscale(), statoCivile: statoCivile() };
const semplicePersonaReq = ['nome', 'cognome', 'codiceFiscale'];

export const propostaAcquisto: DocumentTypeDef = {
    id: 'doc-proposta',
    name: 'Proposta di Acquisto',
    description: 'Proposta irrevocabile d\'acquisto',
    references: [
        ref('Art. 1326 Codice Civile — Proposta e accettazione', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:codice.civile:1942-03-16;262~art1326', 'regulation'),
    ],
    jsonSchema: objectSchema({
        proponenti: arrayOfObjects(semplicePersonaProps, semplicePersonaReq, 'Elenco di tutti i proponenti/acquirenti nella proposta'),
        prezzoOfferto: { type: 'number' },
        validitaProposta: text('Durata di irrevocabilità della proposta. Riporta SOLO il periodo (es. "15 giorni", "30 giorni"). NON aggiungere "dalla data odierna" o altre espressioni.'),
        condizioniSospensive: text('Eventuali condizioni sospensive (es. approvazione mutuo)'),
    }, ['proponenti', 'prezzoOfferto']),
};
