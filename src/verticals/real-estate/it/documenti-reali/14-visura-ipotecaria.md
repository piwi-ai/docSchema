# Visura Ipotecaria (Ispezione Ipotecaria)

**ID**: `doc-visura-ipotecaria`
**Obbligatorio**: ✅ Sì
**Base normativa**: Art. 2673-2674 c.c., R.D. 2440/1923 (Conservatoria)

## Descrizione

Ispezione dei Registri Immobiliari (ex Conservatoria) presso l'Agenzia delle Entrate che riporta la situazione giuridica dell'immobile: passaggi di proprietà, ipoteche (volontarie, giudiziarie, legali), pignoramenti, sequestri e altri vincoli. A differenza della visura catastale (che ha valore fiscale), la visura ipotecaria ha **valore probatorio** della proprietà.

## Campi

| Campo                      | Tipo             | Obbligatorio | Descrizione                                                   |
| -------------------------- | ---------------- | :----------: | ------------------------------------------------------------- |
| `tipoFormalita`            | enum             |      ✅      | Tipo di formalità registrata                                  |
| `dataRegistrazione`        | date DD.MM.YYYY  |      ✅      | Data di registrazione                                         |
| `numeroRegistrazione`      | string           |      ✅      | Numero di registro (Registro Generale + Registro Particolare) |
| `soggetti`                 | array di oggetti |      ✅      | Soggetti coinvolti                                            |
| `soggetti[].nome`          | string           |      ✅      | Nome                                                          |
| `soggetti[].cognome`       | string           |      ✅      | Cognome                                                       |
| `soggetti[].codiceFiscale` | string           |      ✅      | Codice Fiscale                                                |
| `soggetti[].ruolo`         | enum             |      ✅      | proprietario \| creditore \| debitore \| garante              |
| `immobile`                 | string           |      ✅      | Identificazione catastale (foglio, particella, subalterno)    |
| `importo`                  | string           |              | Importo dell'ipoteca o del credito                            |
| `note`                     | string           |              | Annotazioni (es. cancellazione, restrizione)                  |

### Valori `tipoFormalita`

| Valore                   | Descrizione                                   |
| ------------------------ | --------------------------------------------- |
| `compravendita`          | Atto di trasferimento proprietà               |
| `ipoteca volontaria`     | Garanzia per mutuo bancario                   |
| `ipoteca giudiziale`     | Iscritta su ordine del giudice                |
| `ipoteca legale`         | Per legge (es. venditore su immobile venduto) |
| `ipoteca esattoriale`    | Iscritta dall'Agenzia Riscossione             |
| `pignoramento`           | Sequestro creditori                           |
| `sequestro conservativo` | Misura cautelare                              |
| `citazione`              | Atto di citazione trascritto                  |
| `domanda giudiziale`     | Domanda trascritta                            |
| `cancellazione`          | Cancellazione di una precedente formalità     |
| `annotazione`            | Modifica di una precedente formalità          |
| `altro`                  | Altre formalità                               |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "tipoFormalita": {
            "type": "string",
            "enum": [
                "compravendita",
                "ipoteca volontaria",
                "ipoteca giudiziale",
                "ipoteca legale",
                "ipoteca esattoriale",
                "pignoramento",
                "sequestro conservativo",
                "citazione",
                "domanda giudiziale",
                "cancellazione",
                "annotazione",
                "altro",
                null
            ]
        },
        "dataRegistrazione": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "numeroRegistrazione": { "type": "string" },
        "soggetti": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "nome": { "type": "string" },
                    "cognome": { "type": "string" },
                    "codiceFiscale": { "type": "string" },
                    "ruolo": {
                        "type": "string",
                        "enum": ["proprietario", "creditore", "debitore", "garante", null]
                    }
                },
                "required": ["nome", "cognome", "codiceFiscale", "ruolo"]
            }
        },
        "immobile": { "type": "string" },
        "importo": { "type": "string" },
        "note": { "type": "string" }
    },
    "required": [
        "tipoFormalita",
        "dataRegistrazione",
        "numeroRegistrazione",
        "soggetti",
        "immobile"
    ]
}
```

## Note Operative

- La visura ipotecaria è la **prova giuridica** della proprietà (a differenza del catasto che è solo fiscale)
- Il notaio la richiede per verificare la "libertà" dell'immobile da ipoteche, pignoramenti e vincoli
- Un'ipoteca attiva NON impedisce la vendita, ma deve essere cancellata o accollata all'acquirente
- Le ipoteche per mutuo estinto possono rimanere iscritte: il notaio provvede alla cancellazione semplificata (Art. 13, c.8-sexies, D.L. 7/2007)
