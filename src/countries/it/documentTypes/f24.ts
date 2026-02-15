/**
 * Modello F24 — Unified tax payment form.
 * Used by: accountant.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, date, objectSchema, arrayOfObjects, ref,
} from '../../../helpers/it.js';

export const f24: DocumentTypeDef = {
    id: 'doc-f24',
    name: 'Modello F24',
    description: 'Modello di pagamento unificato per imposte, contributi e premi',
    references: [
        ref('Agenzia delle Entrate — Modello F24', 'https://www.agenziaentrate.gov.it/portale/web/guest/schede/pagamenti/f24', 'documentation'),
        ref('Tabella codici tributo', 'https://www.agenziaentrate.gov.it/portale/web/guest/codici-tributo', 'specification'),
    ],
    jsonSchema: objectSchema({
        contribuente: objectSchema({
            codiceFiscale: text('Codice fiscale del contribuente'),
            denominazione: text('Cognome e nome o ragione sociale'),
        }, ['codiceFiscale']),
        dataVersamento: date('Data del versamento'),
        tributi: arrayOfObjects({
            sezione: text('Sezione (Erario, Regioni, IMU, INPS, ecc.)'),
            codiceTributo: text('Codice tributo (es. 4001, 3844, 1040)'),
            rateazione: text('Rateazione/regione/prov./mese rif.'),
            annoRiferimento: text('Anno di riferimento'),
            importoDebito: num('Importo a debito in Euro'),
            importoCredito: num('Importo a credito in Euro'),
        }, ['codiceTributo', 'importoDebito'], 'Elenco tributi/contributi versati'),
        totaleVersato: num('Totale versato in Euro'),
        banca: text('Banca/Posta delegata al pagamento'),
    }, ['contribuente', 'dataVersamento', 'tributi', 'totaleVersato']),
};
