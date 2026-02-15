/**
 * Bilancio d'Esercizio — Annual financial statements.
 * Used by: accountant.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, objectSchema, ref,
    partitaIva,
} from '../../../helpers/it.js';

export const bilancio: DocumentTypeDef = {
    id: 'doc-bilancio',
    name: "Bilancio d'Esercizio",
    description: "Bilancio annuale: stato patrimoniale, conto economico, nota integrativa",
    references: [
        ref('Codice Civile Art. 2423–2435 — Bilancio', 'https://www.gazzettaufficiale.it/atto/serie_generale/caricaArticolo?art.versione=3&art.idGruppo=262&art.flagTipoArticolo=2&art.codiceRedazionale=042U0262&art.idArticolo=2423&art.idSottoArticolo=1&art.idSottoArticolo1=10&art.dataPubblicazioneGazzetta=1942-04-04&art.progressivo=0', 'regulation'),
        ref('XBRL Italia — Tassonomia Bilanci', 'https://www.xbrl.org/jurisdictions/italy/', 'schema'),
    ],
    jsonSchema: objectSchema({
        ragioneSociale: text('Ragione sociale'),
        partitaIva: partitaIva(),
        esercizio: text('Periodo di esercizio (es. 01.01.2025 - 31.12.2025)'),
        anno: num('Anno di competenza'),
        fatturato: num('Ricavi / fatturato in Euro'),
        costiProduzione: num('Costi della produzione in Euro'),
        utileEsercizio: num('Utile (o perdita) d\'esercizio in Euro'),
        totaleAttivo: num('Totale attivo stato patrimoniale in Euro'),
        totalePassivo: num('Totale passivo stato patrimoniale in Euro'),
        patrimonioNetto: num('Patrimonio netto in Euro'),
        risultatoOperativo: num('Risultato operativo (EBIT) in Euro'),
    }, ['ragioneSociale', 'anno', 'fatturato', 'utileEsercizio']),
};
