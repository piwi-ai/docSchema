/**
 * Dichiarazione Mezzi di Pagamento — Payment instruments declaration.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, num, date, objectSchema, arrayOfObjects, ref } from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const mezziPagamento: DocumentTypeDef = {
    id: 'doc-mezzi-pagamento',
    name: 'Dichiarazione Mezzi di Pagamento',
    description:
        'Dichiarazione analitica dei mezzi di pagamento utilizzati nella compravendita (Art. 35 D.Lgs. 223/2006)',
    references: [
        ref(
            'Art. 35 D.Lgs. 223/2006 — Tracciabilità compravendite',
            'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legge:2006-07-04;223~art35',
            ReferenceType.REGULATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            pagamenti: arrayOfObjects(
                {
                    tipo: text(
                        'Tipo di pagamento (es. assegno circolare, bonifico bancario, mutuo fondiario)',
                    ),
                    importo: num('Importo in Euro'),
                    numeroBonifico: text('Numero CRO/TRN del bonifico o numero assegno'),
                    bancaEmittente: text("Banca emittente dell'assegno o ordinante del bonifico"),
                    dataPagamento: date('Data del pagamento in formato europeo DD.MM.YYYY'),
                    intestatario: text('Intestatario del mezzo di pagamento'),
                },
                ['tipo', 'importo'],
                'Elenco analitico di tutti i mezzi di pagamento',
            ),
            importoTotale: num('Importo totale dei pagamenti in Euro'),
            mediatore: text("Nome dell'agenzia o mediatore, se presente"),
            provvigione: num('Importo della provvigione del mediatore in Euro'),
        },
        ['pagamenti', 'importoTotale'],
    ),
};
