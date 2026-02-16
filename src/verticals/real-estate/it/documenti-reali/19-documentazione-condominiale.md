# Documentazione Condominiale

**ID**: `doc-condominiale`
**Obbligatorio**: ⚡ Condizionale — quando `categoriaCatastale` contiene "A/"
**Base normativa**: Art. 63 Disp. Att. c.c. (Riforma Condominio L. 220/2012), Art. 1118-1138 c.c.

## Descrizione

Dichiarazione dell'amministratore di condominio che attesta la situazione dell'unità immobiliare rispetto alle spese condominiali. Ai sensi dell'Art. 63, c.5, Disp. Att. c.c., chi subentra nei diritti di un condomino è obbligato solidalmente con il venditore al pagamento dei contributi relativi all'anno in corso e a quello precedente. Pertanto, il notaio richiede questa dichiarazione per tutelare l'acquirente.

## Campi

| Campo               | Tipo            | Obbligatorio | Descrizione                                               |
| ------------------- | --------------- | :----------: | --------------------------------------------------------- |
| `amministratore`    | string          |      ✅      | Nome/ragione sociale dell'amministratore                  |
| `condominio`        | string          |      ✅      | Denominazione del condominio                              |
| `indirizzo`         | string          |      ✅      | Indirizzo del condominio                                  |
| `unitaImmobiliare`  | string          |      ✅      | Identificazione dell'unità (es. Scala A, Piano 3, Int. 5) |
| `quoteRegolari`     | enum            |      ✅      | Le quote condominiali sono regolarmente pagate: sì \| no  |
| `importoArretrati`  | string          |              | Eventuali arretrati dovuti                                |
| `speseStraodinarie` | string          |              | Spese straordinarie deliberate o in corso                 |
| `millesimi`         | string          |              | Millesimi di proprietà dell'unità                         |
| `dataRilascio`      | date DD.MM.YYYY |      ✅      | Data di rilascio della dichiarazione                      |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "amministratore": { "type": "string" },
        "condominio": { "type": "string" },
        "indirizzo": { "type": "string" },
        "unitaImmobiliare": { "type": "string" },
        "quoteRegolari": { "type": "string", "enum": ["sì", "no", null] },
        "importoArretrati": { "type": "string" },
        "speseStraodinarie": { "type": "string" },
        "millesimi": { "type": "string" },
        "dataRilascio": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" }
    },
    "required": [
        "amministratore",
        "condominio",
        "indirizzo",
        "unitaImmobiliare",
        "quoteRegolari",
        "dataRilascio"
    ]
}
```

## Note Operative

- L'acquirente è **solidalmente responsabile** con il venditore per le spese condominiali dell'anno in corso e precedente (Art. 63, c.5 Disp. Att. c.c.)
- Le spese straordinarie deliberate **prima del rogito** sono a carico del venditore
- L'amministratore è obbligato a rilasciare la dichiarazione su richiesta (Riforma L. 220/2012)
- I **millesimi** determinano la quota di partecipazione alle spese comuni
- Se il condominio non ha amministratore (< 8 condomini), la dichiarazione è sostituita dall'autocertificazione del venditore
- Il trigger "A/" è pragmaticamente corretto: la maggior parte delle unità abitative (A/2, A/3, A/4, A/7) sono in condominio
