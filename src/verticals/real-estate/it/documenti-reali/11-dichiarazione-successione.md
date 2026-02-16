# Dichiarazione di Successione

**ID**: `doc-successione`
**Obbligatorio**: ⚡ Condizionale — quando `tipoProvenienza` = "successione"
**Base normativa**: D.Lgs. 346/1990 (TUS — Testo Unico Successioni), Art. 28-33

## Descrizione

Atto fiscale presentato dagli eredi all'Agenzia delle Entrate entro 12 mesi dalla data del decesso. Certifica il trasferimento della proprietà dal defunto agli eredi e costituisce il presupposto indispensabile per formalizzare la titolarità dei beni ereditati. Senza dichiarazione di successione regolarmente presentata, non è possibile procedere alla vendita dell'immobile ereditato.

## Campi

| Campo                     | Tipo             | Obbligatorio | Descrizione                                     |
| ------------------------- | ---------------- | :----------: | ----------------------------------------------- |
| `defunto`                 | string           |      ✅      | Nome e cognome del defunto (de cuius)           |
| `dataDecesso`             | date DD.MM.YYYY  |      ✅      | Data del decesso                                |
| `dataPresentazione`       | string           |      ✅      | Data di presentazione all'Agenzia delle Entrate |
| `eredi`                   | array di oggetti |      ✅      | Elenco degli eredi                              |
| `eredi[].nome`            | string           |      ✅      | Nome dell'erede                                 |
| `eredi[].cognome`         | string           |      ✅      | Cognome dell'erede                              |
| `eredi[].codiceFiscale`   | string           |      ✅      | Codice Fiscale dell'erede                       |
| `eredi[].quotaEreditaria` | string           |      ✅      | Quota di eredità (es. 1/2, 1/3, 1/1)            |
| `foglio`                  | string           |      ✅      | Foglio catastale dell'immobile ereditato        |
| `particella`              | string           |      ✅      | Particella catastale                            |
| `subalterno`              | string           |      ✅      | Subalterno                                      |
| `volumeAtti`              | string           |              | Volume e numero di registrazione                |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "defunto": { "type": "string" },
        "dataDecesso": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "dataPresentazione": { "type": "string" },
        "eredi": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "nome": { "type": "string" },
                    "cognome": { "type": "string" },
                    "codiceFiscale": { "type": "string" },
                    "quotaEreditaria": { "type": "string" }
                },
                "required": ["nome", "cognome", "codiceFiscale", "quotaEreditaria"]
            }
        },
        "foglio": { "type": "string" },
        "particella": { "type": "string" },
        "subalterno": { "type": "string" },
        "volumeAtti": { "type": "string" }
    },
    "required": [
        "defunto",
        "dataDecesso",
        "dataPresentazione",
        "eredi",
        "foglio",
        "particella",
        "subalterno"
    ]
}
```

## Note Operative

- Deve essere presentata **entro 12 mesi** dal decesso (Art. 31 D.Lgs. 346/1990)
- Le imposte ipotecaria (2%) e catastale (1%) devono essere pagate prima della vendita
- Dal 2019 la dichiarazione si presenta telematicamente tramite il portale dell'Agenzia delle Entrate
- La dichiarazione ha valenza **fiscale** — per la prova della proprietà serve l'accettazione dell'eredità
- La `quotaEreditaria` dipende dal grado di parentela e dall'eventuale testamento
