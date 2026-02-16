# Certificato di Stato di Famiglia

**ID**: `doc-famiglia`
**Obbligatorio**: ⚡ Condizionale — quando `statoCivile` contiene "vedov" o `tipoProvenienza` = "donazione"
**Base normativa**: D.P.R. 223/1989 (Regolamento anagrafico), Art. 33-35

## Descrizione

Certificato anagrafico rilasciato dal Comune che attesta la composizione del nucleo familiare dell'interessato alla data di rilascio. Elenca tutti i componenti della famiglia anagrafica con il rapporto di parentela. È richiesto dal notaio in caso di vedovanza (per verificare la composizione familiare) e in caso di donazione (per valutare il rischio di revocatoria da parte di legittimari).

## Campi

| Campo                      | Tipo             | Obbligatorio | Descrizione                                                                                                                               |
| -------------------------- | ---------------- | :----------: | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `intestatario`             | string           |      ✅      | Nome e cognome dell'intestatario del nucleo familiare                                                                                     |
| `indirizzo`                | string           |      ✅      | Indirizzo di residenza del nucleo familiare                                                                                               |
| `comune`                   | string           |      ✅      | Comune di residenza                                                                                                                       |
| `componenti`               | array di oggetti |      ✅      | Elenco dei componenti del nucleo                                                                                                          |
| `componenti[].nome`        | string           |      ✅      | Nome                                                                                                                                      |
| `componenti[].cognome`     | string           |      ✅      | Cognome                                                                                                                                   |
| `componenti[].dataNascita` | string           |      ✅      | Data di nascita                                                                                                                           |
| `componenti[].relazione`   | enum             |      ✅      | Rapporto familiare: intestatario \| coniuge \| convivente \| figlio/a \| padre \| madre \| fratello/sorella \| nonno/a \| nipote \| altro |
| `dataRilascio`             | date DD.MM.YYYY  |      ✅      | Data di rilascio del certificato                                                                                                          |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "intestatario": { "type": "string" },
        "indirizzo": { "type": "string" },
        "comune": { "type": "string" },
        "componenti": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "nome": { "type": "string" },
                    "cognome": { "type": "string" },
                    "dataNascita": { "type": "string" },
                    "relazione": {
                        "type": "string",
                        "enum": [
                            "intestatario",
                            "coniuge",
                            "convivente",
                            "figlio",
                            "figlia",
                            "padre",
                            "madre",
                            "fratello",
                            "sorella",
                            "nonno",
                            "nonna",
                            "nipote",
                            "altro",
                            null
                        ]
                    }
                },
                "required": ["nome", "cognome", "dataNascita", "relazione"]
            }
        },
        "dataRilascio": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" }
    },
    "required": ["intestatario", "indirizzo", "comune", "componenti", "dataRilascio"]
}
```

## Note Operative

- Il certificato ha validità **6 mesi** dalla data di rilascio (Art. 41 D.P.R. 445/2000)
- In caso di **donazione**: il notaio verifica l'esistenza di legittimari (coniuge, figli) che potrebbero esercitare l'azione di riduzione (Art. 553-564 c.c.)
- In caso di **vedovanza**: conferma lo stato di vedovanza e l'eventuale nuova composizione familiare
- Può essere sostituito da un'autocertificazione in molti contesti, ma il notaio può richiedere il certificato originale
