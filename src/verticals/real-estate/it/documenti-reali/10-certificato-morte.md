# Certificato di Morte (Estratto Atto di Morte)

**ID**: `doc-morte`
**Obbligatorio**: ⚡ Condizionale — quando `statoCivile` contiene "vedov"
**Base normativa**: D.P.R. 396/2000 (Ordinamento dello Stato Civile), Art. 72-73

## Descrizione

Certificato o estratto per riassunto dell'atto di morte rilasciato dal Comune di registrazione del decesso. Richiesto dal notaio quando un venditore o acquirente è vedovo/a, per verificare la circostanza del decesso del coniuge e le eventuali implicazioni sul regime patrimoniale e la catena di titolarità dell'immobile.

## Campi

| Campo                  | Tipo                | Obbligatorio | Descrizione                                      |
| ---------------------- | ------------------- | :----------: | ------------------------------------------------ |
| `nomeDefunto`          | string              |      ✅      | Nome del defunto                                 |
| `cognomeDefunto`       | string              |      ✅      | Cognome del defunto                              |
| `codiceFiscaleDefunto` | string (pattern CF) |      ✅      | Codice Fiscale del defunto — per cross-reference |
| `dataNascita`          | date DD.MM.YYYY     |              | Data di nascita del defunto                      |
| `luogoNascita`         | string              |              | Comune di nascita del defunto                    |
| `dataDecesso`          | date DD.MM.YYYY     |      ✅      | Data del decesso                                 |
| `oraDecesso`           | string              |              | Ora del decesso                                  |
| `luogoMorte`           | string              |      ✅      | Comune di decesso                                |
| `ultimaResidenza`      | string              |              | Ultimo comune di residenza del defunto           |
| `statoCivile`          | enum                |              | Stato civile del defunto al momento del decesso  |
| `nomeConiuge`          | string              |              | Nome e cognome del coniuge superstite            |
| `comuneRegistrazione`  | string              |      ✅      | Comune dove è stato registrato l'atto            |
| `parteSerie`           | string              |              | Parte e serie dell'atto                          |
| `numero`               | string              |              | Numero dell'atto di morte                        |
| `statoCivile`          | enum                |              | Stato civile del defunto al momento del decesso  |
| `comuneRegistrazione`  | string              |      ✅      | Comune dove è stato registrato l'atto            |
| `parteSerie`           | string              |              | Parte e serie dell'atto                          |
| `numero`               | string              |              | Numero dell'atto di morte                        |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "nomeDefunto": { "type": "string" },
        "cognomeDefunto": { "type": "string" },
        "codiceFiscaleDefunto": {
            "type": "string",
            "pattern": "^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$"
        },
        "dataNascita": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "luogoNascita": { "type": "string" },
        "dataDecesso": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "oraDecesso": { "type": "string" },
        "luogoMorte": { "type": "string" },
        "ultimaResidenza": { "type": "string" },
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
        },
        "nomeConiuge": { "type": "string" },
        "comuneRegistrazione": { "type": "string" },
        "parteSerie": { "type": "string" },
        "numero": { "type": "string" }
    },
    "required": [
        "nomeDefunto",
        "cognomeDefunto",
        "dataDecesso",
        "luogoMorte",
        "comuneRegistrazione"
    ]
}
```

## Note Operative

- L'estratto di morte ha **validità illimitata** (a differenza di molti certificati anagrafici)
- L'estratto è più dettagliato del semplice certificato: include annotazioni, paternità/maternità, coniuge
- Si richiede all'Ufficio di Stato Civile del Comune dove è avvenuto il decesso
- Questo documento innesca la verifica della catena ereditaria: servono anche la dichiarazione di successione e l'accettazione dell'eredità se l'immobile è pervenuto per successione
