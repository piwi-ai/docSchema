/**
 * Delibera di Mutuo — Mortgage approval letter.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, date, enumField, objectSchema, ref,
    codiceFiscale,
} from '../../../helpers/it.js';

export const deliberaMutuo: DocumentTypeDef = {
    id: 'doc-delibera-mutuo',
    name: 'Delibera di Mutuo',
    description: 'Lettera di delibera della banca che conferma l\'approvazione del mutuo ipotecario',
    references: [
        ref('Banca d\'Italia — Trasparenza bancaria', 'https://www.bancaditalia.it/compiti/vigilanza/normativa/archivio-norme/disposizioni/trasparenza/index.html', 'regulation'),
    ],
    jsonSchema: objectSchema({
        banca: text('Nome della banca o istituto di credito'),
        filiale: text('Filiale o agenzia'),
        mutuatario: text('Nome e cognome del mutuatario'),
        codiceFiscaleMutuatario: codiceFiscale('Codice Fiscale del mutuatario (extract without spaces)'),
        importoMutuo: num('Importo del mutuo deliberato in Euro'),
        durataAnni: num('Durata del mutuo in anni'),
        tassoInteresse: text('Tasso di interesse (fisso, variabile, misto) e percentuale'),
        tipoTasso: enumField('Tipo di tasso', ['fisso', 'variabile', 'misto']),
        dataDelibera: date('Data della delibera in formato europeo DD.MM.YYYY'),
        validitaDelibera: text('Validità temporale della delibera (es. 6 mesi)'),
        condizioniSospensive: text('Eventuali condizioni sospensive (es. ipoteca di primo grado)'),
    }, ['banca', 'mutuatario', 'codiceFiscaleMutuatario', 'importoMutuo', 'dataDelibera']),
};
