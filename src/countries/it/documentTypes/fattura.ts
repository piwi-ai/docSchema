/**
 * Fattura — Invoice.
 * Used by: accountant.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, num, date, objectSchema, arrayOfObjects, ref, partitaIva } from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const fattura: DocumentTypeDef = {
    id: 'doc-fattura',
    name: 'Fattura',
    description: 'Fattura attiva o passiva — dati emittente, destinatario, imponibile, IVA',
    references: [
        ref(
            'FatturaPA — Specifiche tecniche',
            'https://www.fatturapa.gov.it/it/norme-e-regole/documentazione-fatturapa/',
            ReferenceType.SPECIFICATION,
        ),
        ref(
            'FatturaPA XML Schema (SDI)',
            'https://www.fatturapa.gov.it/it/norme-e-regole/documentazione-fatturapa/formato-fatturapa/',
            ReferenceType.SCHEMA,
        ),
        ref(
            'Agenzia delle Entrate — Fatturazione Elettronica',
            'https://www.agenziaentrate.gov.it/portale/web/guest/aree-tematiche/fatturazione-elettronica',
            ReferenceType.DOCUMENTATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            numero: text('Numero fattura'),
            data: date('Data di emissione fattura'),
            emittente: objectSchema(
                {
                    ragioneSociale: text("Ragione sociale o nome dell'emittente"),
                    partitaIva: partitaIva(),
                    codiceFiscale: text("Codice fiscale dell'emittente"),
                    indirizzo: text("Indirizzo dell'emittente"),
                },
                ['ragioneSociale', 'partitaIva'],
            ),
            destinatario: objectSchema(
                {
                    ragioneSociale: text('Ragione sociale o nome del destinatario'),
                    partitaIva: partitaIva(),
                    codiceFiscale: text('Codice fiscale del destinatario'),
                    indirizzo: text('Indirizzo del destinatario'),
                },
                ['ragioneSociale'],
            ),
            righe: arrayOfObjects(
                {
                    descrizione: text('Descrizione del bene/servizio'),
                    quantita: num('Quantità'),
                    prezzoUnitario: num('Prezzo unitario in Euro'),
                    aliquotaIva: num('Aliquota IVA in %'),
                    importo: num('Importo totale riga in Euro'),
                },
                ['descrizione', 'importo'],
                'Righe della fattura',
            ),
            imponibile: num('Totale imponibile in Euro'),
            iva: num('Totale IVA in Euro'),
            totale: num('Totale fattura in Euro'),
            modalitaPagamento: text('Modalità di pagamento'),
            scadenzaPagamento: date('Data scadenza pagamento'),
        },
        ['numero', 'data', 'emittente', 'destinatario', 'imponibile', 'totale'],
    ),
};
