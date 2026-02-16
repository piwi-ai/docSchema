/**
 * Modello 730 — Simplified tax return for employees/retirees.
 * Used by: accountant.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, date, enumField, objectSchema, arrayOfObjects, ref,
    nome, cognome, codiceFiscale,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const mod730: DocumentTypeDef = {
    id: 'doc-730',
    name: 'Modello 730',
    description: 'Dichiarazione dei redditi semplificata per lavoratori dipendenti e pensionati',
    references: [
        ref('Agenzia delle Entrate — Modello 730', 'https://www.agenziaentrate.gov.it/portale/web/guest/modello-730', ReferenceType.DOCUMENTATION),
        ref('Istruzioni 730 (PDF)', 'https://www.agenziaentrate.gov.it/portale/web/guest/modello-730/istruzioni-modello-730', ReferenceType.SPECIFICATION),
    ],
    jsonSchema: objectSchema({
        anno: num('Anno fiscale di riferimento'),
        contribuente: objectSchema({
            nome: nome(), cognome: cognome(), codiceFiscale: codiceFiscale(),
            dataNascita: date('Data di nascita'),
        }, ['nome', 'cognome', 'codiceFiscale']),
        redditoComplessivo: num('Reddito complessivo in Euro'),
        impostaNetta: num('Imposta netta in Euro'),
        detrazioni: num('Totale detrazioni in Euro'),
        risultato: enumField('Risultato della dichiarazione', ['credito', 'debito']),
        importoRimborsoDebito: num('Importo rimborso o debito in Euro'),
        quadriCompilati: text('Elenco dei quadri compilati (es. A, B, C, D, E)'),
        familiari: arrayOfObjects({
            nome: nome(), cognome: cognome(), codiceFiscale: codiceFiscale(),
            relazione: enumField('Relazione', ['coniuge', 'figlio', 'altro familiare']),
            percentualeCarico: num('Percentuale a carico (es. 100, 50)'),
        }, ['codiceFiscale', 'relazione'], 'Familiari a carico'),
    }, ['anno', 'contribuente', 'redditoComplessivo', 'impostaNetta']),
};
