# Dichiarazione Mezzi di Pagamento

**ID**: `doc-mezzi-pagamento`
**Obbligatorio**: Sì (per ogni compravendita immobiliare)
**Base normativa**: Art. 35, comma 22, D.Lgs. 223/2006 (Decreto Bersani-Visco); Art. 1, comma 63, L. 147/2013

## Descrizione

Dichiarazione analitica di tutti i mezzi di pagamento utilizzati nella compravendita immobiliare, obbligatoria per legge. Il notaio deve riportare nell'atto le modalità di pagamento del prezzo e degli eventuali conguagli, includendo per ciascun pagamento il tipo di strumento (assegno circolare, bonifico, finanziamento), gli estremi identificativi (numero CRO/TRN, numero assegno), la banca emittente e l'importo. La mancata o incompleta dichiarazione comporta sanzioni sia per le parti che per il notaio.

## Campi

| Campo                        | Tipo            | Obbligatorio | Descrizione                                                          |
| ---------------------------- | --------------- | :----------: | -------------------------------------------------------------------- |
| `pagamenti`                  | array           |      ✅      | Elenco analitico di tutti i mezzi di pagamento                       |
| `pagamenti[].tipo`           | string          |      ✅      | Tipo di pagamento (es. assegno circolare, bonifico, mutuo fondiario) |
| `pagamenti[].importo`        | number          |      ✅      | Importo in Euro                                                      |
| `pagamenti[].numeroBonifico` | string          |              | Numero CRO/TRN del bonifico o numero assegno                         |
| `pagamenti[].bancaEmittente` | string          |              | Banca emittente dell'assegno o ordinante del bonifico                |
| `pagamenti[].dataPagamento`  | date DD.MM.YYYY |              | Data del pagamento                                                   |
| `pagamenti[].intestatario`   | string          |              | Intestatario del mezzo di pagamento                                  |
| `importoTotale`              | number          |      ✅      | Importo totale dei pagamenti in Euro                                 |
| `mediatore`                  | string          |              | Nome dell'agenzia o mediatore, se presente                           |
| `provvigione`                | number          |              | Importo della provvigione del mediatore in Euro                      |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "pagamenti": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "tipo": { "type": "string" },
                    "importo": { "type": "number" },
                    "numeroBonifico": { "type": "string" },
                    "bancaEmittente": { "type": "string" },
                    "dataPagamento": {
                        "type": "string",
                        "pattern": "^\\d{2}[./]\\d{2}[./]\\d{4}$"
                    },
                    "intestatario": { "type": "string" }
                },
                "required": ["tipo", "importo"]
            }
        },
        "importoTotale": { "type": "number" },
        "mediatore": { "type": "string" },
        "provvigione": { "type": "number" }
    },
    "required": ["pagamenti", "importoTotale"]
}
```

## Note Operative

- La dichiarazione è **obbligatoria per legge** (Art. 35 D.Lgs. 223/2006) — la sua omissione comporta sanzioni da €500 a €10.000 per il notaio
- **Tutti** i pagamenti devono essere tracciabili: non è possibile dichiarare pagamenti in contanti per importi superiori alla soglia di legge (attualmente €5.000 dal 2023)
- L'`importoTotale` deve coincidere con la somma dei singoli `importo` nei pagamenti
- Quando l'acquisto avviene con **mutuo**, il finanziamento bancario deve comparire come uno dei mezzi di pagamento
- La **provvigione** dell'agenzia immobiliare deve essere dichiarata nell'atto notarile (Art. 35, comma 22, D.Lgs. 223/2006)
- Il notaio verifica la **congruenza** tra prezzo dichiarato nell'atto e somma dei mezzi di pagamento
- La caparra confirmatoria versata al preliminare deve essere inclusa tra i pagamenti, con i relativi estremi
- Pagamenti antecedenti al rogito (caparra, acconti) devono essere riportati con la data effettiva di esecuzione
