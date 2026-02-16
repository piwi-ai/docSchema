/**
 * Visura Ipotecaria — Mortgage/lien registry inspection.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, date, objectSchema, arrayOfObjects, ref,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

const TIPO_FORMALITA_DESC = 'Tipo di formalità (es. compravendita, ipoteca volontaria, ipoteca giudiziale, ipoteca legale, pignoramento, sequestro conservativo, successione ereditaria, donazione, trascrizione, servitù, cancellazione, annotazione)';

export const visuraIpotecaria: DocumentTypeDef = {
    id: 'doc-visura-ipotecaria',
    name: 'Visura Ipotecaria',
    description: 'Ispezione ipotecaria che riporta la situazione giuridica dell\'immobile: proprietà, ipoteche, pignoramenti e vincoli',
    references: [
        ref('Agenzia delle Entrate — Ispezione ipotecaria', 'https://www.agenziaentrate.gov.it/portale/web/guest/schede/fabbricatiterreni/ispezione-ipotecaria', ReferenceType.DOCUMENTATION),
        ref('Conservatoria dei Registri Immobiliari', 'https://sister.agenziaentrate.gov.it/', ReferenceType.DOCUMENTATION),
    ],
    jsonSchema: objectSchema({
        tipoFormalita: text(TIPO_FORMALITA_DESC),
        dataRegistrazione: date('Data di registrazione in formato europeo DD.MM.YYYY'),
        numeroRegistrazione: text('Numero di registro (Registro Generale e Registro Particolare)'),
        soggetti: arrayOfObjects({
            nome: { type: 'string' },
            cognome: { type: 'string' },
            codiceFiscale: { type: 'string' },
            ruolo: text('Ruolo del soggetto (es. proprietario, creditore, debitore, garante, dante causa, avente causa)'),
        }, ['nome', 'cognome', 'codiceFiscale', 'ruolo'], 'Soggetti coinvolti nella formalità'),
        foglio: text('Foglio catastale dell\'immobile'),
        particella: text('Particella catastale dell\'immobile'),
        subalterno: text('Subalterno dell\'immobile'),
        indirizzo: text('Indirizzo dell\'immobile, se presente'),
        importo: text('Importo dell\'ipoteca o del credito, se applicabile'),
        note: text('Note o annotazioni aggiuntive — copiare TESTUALMENTE dal documento (es. cancellazione, restrizione). Se non ci sono note, restituire stringa vuota. NON scrivere frasi come "Nessuna ipoteca" o "Nessun vincolo".'),
    }, ['tipoFormalita', 'dataRegistrazione', 'numeroRegistrazione', 'soggetti', 'foglio', 'particella']),
};
