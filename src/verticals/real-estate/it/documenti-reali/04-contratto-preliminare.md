# Contratto Preliminare (Compromesso)

**ID**: `doc-preliminare`
**Obbligatorio**: ✅ Sì
**Base normativa**: Art. 1351 c.c. e Art. 2645-bis c.c. (Trascrizione del preliminare)

## Descrizione

Il compromesso di compravendita è l'accordo con cui venditore e acquirente si impegnano a stipulare il rogito definitivo. Deve essere registrato all'Agenzia delle Entrate entro 20 giorni dalla firma (30 se fatto con atto notarile) e può essere trascritto nei registri immobiliari per maggiore tutela dell'acquirente.

## Campi

| Campo                        | Tipo             | Obbligatorio | Descrizione                          |
| ---------------------------- | ---------------- | :----------: | ------------------------------------ |
| `acquirenti`                 | array di oggetti |      ✅      | Parti acquirenti                     |
| `acquirenti[].nome`          | string           |      ✅      | Nome                                 |
| `acquirenti[].cognome`       | string           |      ✅      | Cognome                              |
| `acquirenti[].codiceFiscale` | string (CF)      |      ✅      | Codice Fiscale                       |
| `acquirenti[].statoCivile`   | enum             |              | Stato civile                         |
| `venditori`                  | array di oggetti |      ✅      | Parti venditrici                     |
| `venditori[].nome`           | string           |      ✅      | Nome                                 |
| `venditori[].cognome`        | string           |      ✅      | Cognome                              |
| `venditori[].codiceFiscale`  | string (CF)      |      ✅      | Codice Fiscale                       |
| `venditori[].statoCivile`    | enum             |              | Stato civile                         |
| `prezzo`                     | number           |      ✅      | Prezzo di vendita concordato in Euro |
| `dataStipula`                | date DD.MM.YYYY  |      ✅      | Data di firma del preliminare        |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "acquirenti": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "nome": { "type": "string" },
                    "cognome": { "type": "string" },
                    "codiceFiscale": {
                        "type": "string",
                        "pattern": "^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$"
                    },
                    "statoCivile": {
                        "type": "string",
                        "enum": [
                            "celibe",
                            "nubile",
                            "coniugato",
                            "coniugata",
                            "vedovo",
                            "vedova",
                            "divorziato",
                            "divorziata",
                            "separato",
                            "separata",
                            null
                        ]
                    }
                },
                "required": ["nome", "cognome", "codiceFiscale"]
            }
        },
        "venditori": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "nome": { "type": "string" },
                    "cognome": { "type": "string" },
                    "codiceFiscale": {
                        "type": "string",
                        "pattern": "^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$"
                    },
                    "statoCivile": {
                        "type": "string",
                        "enum": [
                            "celibe",
                            "nubile",
                            "coniugato",
                            "coniugata",
                            "vedovo",
                            "vedova",
                            "divorziato",
                            "divorziata",
                            "separato",
                            "separata",
                            null
                        ]
                    }
                },
                "required": ["nome", "cognome", "codiceFiscale"]
            }
        },
        "prezzo": { "type": "number" },
        "dataStipula": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" }
    },
    "required": ["acquirenti", "venditori", "prezzo", "dataStipula"]
}
```

## Note Operative

- Il preliminare deve essere registrato all'Agenzia delle Entrate (imposta di registro 0.5% sulla caparra confirmatoria, 3% sugli acconti sul prezzo)
- La trascrizione ex Art. 2645-bis protegge l'acquirente da vendite a terzi o ipoteche successive
- Il prezzo nel preliminare deve corrispondere a quello indicato nel rogito (Art. 35, c.22, D.L. 223/2006)
