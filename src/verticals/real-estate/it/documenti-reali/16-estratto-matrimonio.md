# Estratto Atto di Matrimonio

**ID**: `doc-matrimonio`
**Obbligatorio**: ⚡ Condizionale — quando `statoCivile` contiene "coniugat" o "separat"/"divorziat"
**Base normativa**: D.P.R. 396/2000 (Ordinamento dello Stato Civile), Art. 107-115

## Descrizione

Estratto dell'atto di matrimonio rilasciato dal Comune di celebrazione. È un documento più dettagliato del semplice certificato di matrimonio: include annotazioni marginali che "raccontano la storia" del matrimonio, come la scelta del regime patrimoniale, eventuali convenzioni matrimoniali, o sentenze di separazione/divorzio. Il notaio lo richiede per accertare il regime patrimoniale (comunione o separazione dei beni) e quindi la legittimazione a vendere.

## Campi

| Campo                 | Tipo            | Obbligatorio | Descrizione                                                             |
| --------------------- | --------------- | :----------: | ----------------------------------------------------------------------- |
| `coniuge1`            | string          |      ✅      | Nome e cognome del primo coniuge                                        |
| `coniuge2`            | string          |      ✅      | Nome e cognome del secondo coniuge                                      |
| `dataMatrimonio`      | date DD.MM.YYYY |      ✅      | Data di celebrazione del matrimonio                                     |
| `luogoMatrimonio`     | string          |      ✅      | Comune di celebrazione                                                  |
| `regimePatrimoniale`  | enum            |      ✅      | comunione dei beni \| separazione dei beni                              |
| `annotazioni`         | string          |              | Annotazioni marginali (separazione, divorzio, convenzioni patrimoniali) |
| `comuneRegistrazione` | string          |              | Comune dove è stato registrato l'atto                                   |
| `parte`               | string          |              | Parte e numero dell'atto                                                |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "coniuge1": { "type": "string" },
        "coniuge2": { "type": "string" },
        "dataMatrimonio": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "luogoMatrimonio": { "type": "string" },
        "regimePatrimoniale": {
            "type": "string",
            "enum": ["comunione dei beni", "separazione dei beni", null]
        },
        "annotazioni": { "type": "string" },
        "comuneRegistrazione": { "type": "string" },
        "parte": { "type": "string" }
    },
    "required": ["coniuge1", "coniuge2", "dataMatrimonio", "luogoMatrimonio", "regimePatrimoniale"]
}
```

## Note Operative

- In Italia, il regime patrimoniale legale (default dal 1975) è la **comunione dei beni**
- In comunione dei beni, un immobile acquistato durante il matrimonio è di proprietà comune 50/50, anche se intestato a un solo coniuge → **entrambi devono firmare la vendita**
- L'estratto contiene le **annotazioni marginali**: fondamentali per verificare cambi di regime, separazioni, divorzi
- Si richiede al Comune dove è stato celebrato il matrimonio
- Per i matrimoni celebrati all'estero, serve l'atto di matrimonio trascritto in Italia (AIRE)
