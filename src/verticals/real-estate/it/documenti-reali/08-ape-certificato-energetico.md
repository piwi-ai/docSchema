# APE — Attestato di Prestazione Energetica

**ID**: `doc-ape`
**Obbligatorio**: ✅ Sì
**Base normativa**: D.Lgs. 192/2005, DM 26/06/2015 (Linee guida nazionali), D.L. 63/2013

## Descrizione

Certificato che descrive la prestazione energetica di un edificio o unità immobiliare, obbligatorio per compravendite e locazioni. Deve essere redatto da un tecnico abilitato (certificatore energetico), registrato nel catasto energetico regionale (SIAPE), e allegato all'atto notarile. L'assenza dell'APE comporta una sanzione da 3.000€ a 18.000€.

## Campi

| Campo                  | Tipo            | Obbligatorio | Descrizione                                                                                            |
| ---------------------- | --------------- | :----------: | ------------------------------------------------------------------------------------------------------ |
| `classeEnergetica`     | enum            |      ✅      | A4 \| A3 \| A2 \| A1 \| B \| C \| D \| E \| F \| G                                                     |
| `indiceEpgl`           | number          |      ✅      | EPgl,nren — Indice di Prestazione Energetica globale (kWh/m²anno)                                      |
| `codiceIdentificativo` | string          |      ✅      | Codice identificativo nel catasto energetico regionale                                                 |
| `validoFinoA`          | date            |      ✅      | Data di scadenza (validità 10 anni dalla data di emissione)                                            |
| `regione`              | string          |      ✅      | Regione di ubicazione                                                                                  |
| `comune`               | string          |      ✅      | Comune di ubicazione                                                                                   |
| `indirizzo`            | string          |      ✅      | Indirizzo dell'immobile                                                                                |
| `piano`                | string          |      ✅      | Piano dell'unità                                                                                       |
| `interno`              | string          |      ✅      | Numero interno                                                                                         |
| `comuneCatastale`      | string          |      ✅      | Comune catastale                                                                                       |
| `sezione`              | string          |      ✅      | Sezione catastale                                                                                      |
| `foglio`               | string          |      ✅      | Foglio catastale                                                                                       |
| `particella`           | string          |      ✅      | Particella catastale                                                                                   |
| `subalterni`           | array di string |      ✅      | Subalterni (può coprire più subalterni)                                                                |
| `destinazioneUso`      | enum            |      ✅      | residenziale \| ufficio \| commerciale \| industriale \| agricolo \| magazzino \| autorimessa \| altro |
| `oggettoAttestato`     | string          |      ✅      | Descrizione dell'oggetto dell'attestato                                                                |
| `dataScadenza`         | date            |      ✅      | Data di scadenza dell'attestato                                                                        |
| `codiceUnivoco`        | string          |      ✅      | Codice univoco nazionale                                                                               |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "classeEnergetica": {
            "type": "string",
            "enum": ["A4", "A3", "A2", "A1", "B", "C", "D", "E", "F", "G", null]
        },
        "indiceEpgl": { "type": "number" },
        "codiceIdentificativo": { "type": "string" },
        "validoFinoA": { "type": "string", "pattern": "" },
        "regione": { "type": "string" },
        "comune": { "type": "string" },
        "indirizzo": { "type": "string" },
        "piano": { "type": "string" },
        "interno": { "type": "string" },
        "comuneCatastale": { "type": "string" },
        "sezione": { "type": "string" },
        "foglio": { "type": "string" },
        "particella": { "type": "string" },
        "subalterni": { "type": "array", "items": { "type": "string" } },
        "destinazioneUso": {
            "type": "string",
            "enum": [
                "residenziale",
                "ufficio",
                "commerciale",
                "industriale",
                "agricolo",
                "magazzino",
                "autorimessa",
                "altro",
                null
            ]
        },
        "oggettoAttestato": { "type": "string" },
        "dataScadenza": { "type": "string", "pattern": "" },
        "codiceUnivoco": { "type": "string" }
    },
    "required": [
        "classeEnergetica",
        "indiceEpgl",
        "codiceIdentificativo",
        "validoFinoA",
        "regione",
        "comune",
        "indirizzo",
        "piano",
        "interno",
        "comuneCatastale",
        "sezione",
        "foglio",
        "particella",
        "subalterni",
        "destinazioneUso",
        "oggettoAttestato",
        "dataScadenza",
        "codiceUnivoco"
    ]
}
```

## Note Operative

- Validità **10 anni** dalla data di emissione, salvo lavori di ristrutturazione che modifichino la classe energetica
- La validità è subordinata alla regolare manutenzione degli impianti termici (caldaia)
- Il campo `subalterni` è un array perché un singolo APE può coprire più subalterni dello stesso fabbricato
- La scala va da **A4** (più efficiente) a **G** (meno efficiente)
- Dal 2024-2026, la Direttiva "Case Green" (EPBD IV) potrebbe modificare i parametri di classificazione
- Il certificatore deve effettuare obbligatoriamente un **sopralluogo** (Art. 4, DM 26/06/2015)
