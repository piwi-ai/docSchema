# Certificato di Residenza

**ID**: `doc-residenza`
**Obbligatorio**: No (situazionale — quando l'indirizzo sull'identità differisce dalla residenza corrente)
**Base normativa**: D.P.R. 223/1989 (Regolamento anagrafico), Art. 33

## Descrizione

Certificato anagrafico rilasciato dal Comune che attesta la residenza attuale del cittadino. Viene richiesto dal notaio quando l'indirizzo riportato sul documento d'identità non corrisponde alla residenza dichiarata, oppure quando è necessario verificare la residenza ai fini fiscali (es. agevolazioni prima casa, che richiedono il trasferimento della residenza entro 18 mesi dall'acquisto).

## Campi

| Campo            | Tipo                | Obbligatorio | Descrizione                             |
| ---------------- | ------------------- | :----------: | --------------------------------------- |
| `nome`           | string              |      ✅      | Nome                                    |
| `cognome`        | string              |      ✅      | Cognome                                 |
| `codiceFiscale`  | string (pattern CF) |      ✅      | Codice Fiscale                          |
| `indirizzo`      | string              |      ✅      | Indirizzo completo di residenza attuale |
| `comune`         | string              |      ✅      | Comune di residenza                     |
| `provincia`      | string              |              | Sigla Provincia (es. MI, RM)            |
| `cap`            | string              |              | Codice Avviamento Postale               |
| `dataRilascio`   | date DD.MM.YYYY     |      ✅      | Data di rilascio                        |
| `comuneRilascio` | string              |              | Comune che ha rilasciato il certificato |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "nome": { "type": "string" },
        "cognome": { "type": "string" },
        "codiceFiscale": {
            "type": "string",
            "pattern": "^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$"
        },
        "indirizzo": { "type": "string" },
        "comune": { "type": "string" },
        "provincia": { "type": "string" },
        "cap": { "type": "string" },
        "dataRilascio": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "comuneRilascio": { "type": "string" }
    },
    "required": ["nome", "cognome", "codiceFiscale", "indirizzo", "comune", "dataRilascio"]
}
```

## Note Operative

- Il certificato ha validità **6 mesi** dalla data di rilascio (Art. 41 D.P.R. 445/2000)
- Per le agevolazioni **prima casa**, l'acquirente deve trasferire la residenza nel Comune dell'immobile entro 18 mesi dal rogito
- Può essere sostituito dall'autocertificazione (Art. 46 D.P.R. 445/2000) nei rapporti con la P.A., ma il notaio può richiedere il certificato originale
- In caso di discrepanza tra indirizzo su CI e residenza reale, il notaio utilizza questo certificato per verificare la situazione attuale
