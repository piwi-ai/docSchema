# Sentenza di Separazione / Divorzio

**ID**: `doc-separazione`
**Obbligatorio**: ⚡ Condizionale — quando `statoCivile` contiene "separat" o "divorziat"
**Base normativa**: Art. 149-151 c.c. (Separazione), L. 898/1970 (Divorzio), Art. 191 c.c. (Scioglimento comunione)

## Descrizione

Provvedimento giudiziario di separazione legale o divorzio emesso dal Tribunale competente. Il notaio lo richiede per verificare lo scioglimento della comunione dei beni e le eventuali disposizioni patrimoniali riguardanti l'immobile (assegnazione della casa coniugale, trasferimenti immobiliari). La separazione può essere consensuale (omologata dal Tribunale) o giudiziale (pronunciata con sentenza).

## Campi

| Campo                      | Tipo            | Obbligatorio | Descrizione                                                              |
| -------------------------- | --------------- | :----------: | ------------------------------------------------------------------------ |
| `tribunale`                | string          |      ✅      | Tribunale competente che ha emesso la sentenza                           |
| `numeroSentenza`           | string          |              | Numero di ruolo/sentenza                                                 |
| `dataSentenza`             | date DD.MM.YYYY |      ✅      | Data della sentenza/omologazione                                         |
| `coniuge1`                 | string          |      ✅      | Nome e cognome del primo coniuge                                         |
| `coniuge2`                 | string          |      ✅      | Nome e cognome del secondo coniuge                                       |
| `tipoProvvedimento`        | enum            |      ✅      | separazione consensuale \| separazione giudiziale \| divorzio            |
| `disposizioniPatrimoniali` | string          |              | Disposizioni relative ai beni immobili (es. assegnazione casa coniugale) |
| `passaggioInGiudicato`     | date DD.MM.YYYY |              | Data di passaggio in giudicato                                           |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "tribunale": { "type": "string" },
        "numeroSentenza": { "type": "string" },
        "dataSentenza": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "coniuge1": { "type": "string" },
        "coniuge2": { "type": "string" },
        "tipoProvvedimento": {
            "type": "string",
            "enum": ["separazione consensuale", "separazione giudiziale", "divorzio", null]
        },
        "disposizioniPatrimoniali": { "type": "string" },
        "passaggioInGiudicato": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" }
    },
    "required": ["tribunale", "dataSentenza", "coniuge1", "coniuge2", "tipoProvvedimento"]
}
```

## Note Operative

- La separazione **scioglie la comunione dei beni** (Art. 191 c.c.) dalla data di omologazione/sentenza
- I beni acquistati PRIMA della separazione/divorzio in regime di comunione sono già di proprietà comune 50/50
- L'assegnazione della **casa coniugale** è opponibile a terzi anche se non trascritta (fino alla maggiore età dei figli)
- Dal 2021 (Cass. SS.UU. 21761/2021), i trasferimenti immobiliari nella separazione/divorzio possono essere trascritti senza atto notarile
- I trasferimenti tra ex coniugi in sede di separazione/divorzio sono **esenti da imposte** (Art. 19 L. 74/1987)
- Dal 2014, la separazione/divorzio può avvenire anche tramite **negoziazione assistita** con avvocati (D.L. 132/2014)
