# Atto di Provenienza Notarile

**ID**: `doc-provenienza`
**Obbligatorio**: ✅ Sì
**Base normativa**: Art. 2643-2645 c.c. (Trascrizione), Art. 29 L. 52/1985

## Descrizione

Rogito notarile o altro atto pubblico che attesta come l'attuale proprietario ha acquisito la titolarità dell'immobile. È il documento fondamentale della compravendita: senza atto di provenienza valido il notaio non può procedere. Può essere un atto di compravendita, donazione, dichiarazione di successione, sentenza giudiziale, divisione ereditaria, o decreto di usucapione.

## Campi

| Campo                             | Tipo             | Obbligatorio | Descrizione                                                                   |
| --------------------------------- | ---------------- | :----------: | ----------------------------------------------------------------------------- |
| `venditori`                       | array di oggetti |      ✅      | Elenco di tutti i venditori nell'atto                                         |
| `venditori[].nome`                | string           |      ✅      | Nome del venditore                                                            |
| `venditori[].cognome`             | string           |      ✅      | Cognome del venditore                                                         |
| `venditori[].quota`               | string           |      ✅      | Quota di proprietà venduta (es. 100%, 50/100)                                 |
| `venditori[].codiceFiscale`       | string           |      ✅      | Codice Fiscale del venditore                                                  |
| `venditori[].statoCivile`         | enum             |      ✅      | Stato civile come scritto nell'atto                                           |
| `venditori[].regimePatrimoniale`  | enum             |      ✅      | comunione dei beni \| separazione dei beni                                    |
| `acquirenti`                      | array di oggetti |      ✅      | Elenco di tutti gli acquirenti nell'atto                                      |
| `acquirenti[].nome`               | string           |      ✅      | Nome dell'acquirente                                                          |
| `acquirenti[].cognome`            | string           |      ✅      | Cognome dell'acquirente                                                       |
| `acquirenti[].quota`              | string           |      ✅      | Quota di proprietà acquistata                                                 |
| `acquirenti[].codiceFiscale`      | string           |      ✅      | Codice Fiscale dell'acquirente                                                |
| `acquirenti[].statoCivile`        | enum             |      ✅      | Stato civile                                                                  |
| `acquirenti[].regimePatrimoniale` | enum             |      ✅      | Regime patrimoniale                                                           |
| `notaio`                          | string           |      ✅      | Nome e cognome del notaio rogante                                             |
| `dataAtto`                        | string           |      ✅      | Data dell'atto                                                                |
| `numeroRepertorio`                | string           |              | Numero di repertorio del notaio                                               |
| `numeroRaccolta`                  | string           |              | Numero di raccolta                                                            |
| `indirizzo`                       | string           |      ✅      | Indirizzo completo dell'immobile                                              |
| `immobili`                        | array di oggetti |      ✅      | Unità immobiliari oggetto dell'atto                                           |
| `immobili[].foglio`               | string           |      ✅      | Foglio catastale                                                              |
| `immobili[].particella`           | string           |      ✅      | Particella catastale                                                          |
| `immobili[].subalterno`           | string           |      ✅      | Subalterno                                                                    |
| `immobili[].categoria`            | enum             |              | Categoria catastale (A/1-A/11, B/1-B/8, ecc.)                                 |
| `immobili[].piano`                | string           |              | Piano (es. S1, T, 1, 2)                                                       |
| `immobili[].consistenza`          | string           |              | Vani o mq (es. 7 vani, 37 mq)                                                 |
| `immobili[].rendita`              | number           |              | Rendita catastale in Euro                                                     |
| `tipoProvenienza`                 | enum             |      ✅      | compravendita \| donazione \| successione \| divisione \| usucapione \| altro |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "venditori": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "nome": { "type": "string" },
                    "cognome": { "type": "string" },
                    "quota": { "type": "string" },
                    "codiceFiscale": { "type": "string" },
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
                    "regimePatrimoniale": {
                        "type": "string",
                        "enum": ["comunione dei beni", "separazione dei beni", null]
                    }
                },
                "required": [
                    "nome",
                    "cognome",
                    "quota",
                    "codiceFiscale",
                    "statoCivile",
                    "regimePatrimoniale"
                ]
            }
        },
        "acquirenti": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "nome": { "type": "string" },
                    "cognome": { "type": "string" },
                    "quota": { "type": "string" },
                    "codiceFiscale": { "type": "string" },
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
                    "regimePatrimoniale": {
                        "type": "string",
                        "enum": ["comunione dei beni", "separazione dei beni", null]
                    }
                },
                "required": [
                    "nome",
                    "cognome",
                    "quota",
                    "codiceFiscale",
                    "statoCivile",
                    "regimePatrimoniale"
                ]
            }
        },
        "notaio": { "type": "string" },
        "dataAtto": { "type": "string" },
        "numeroRepertorio": { "type": "string" },
        "numeroRaccolta": { "type": "string" },
        "indirizzo": { "type": "string" },
        "immobili": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "foglio": { "type": "string" },
                    "particella": { "type": "string" },
                    "subalterno": { "type": "string" },
                    "categoria": {
                        "type": "string",
                        "enum": [
                            "A/1",
                            "A/2",
                            "A/3",
                            "A/4",
                            "A/5",
                            "A/6",
                            "A/7",
                            "A/8",
                            "A/9",
                            "A/10",
                            "A/11",
                            "B/1",
                            "B/2",
                            "B/3",
                            "B/4",
                            "B/5",
                            "B/6",
                            "B/7",
                            "B/8",
                            "C/1",
                            "C/2",
                            "C/3",
                            "C/4",
                            "C/5",
                            "C/6",
                            "C/7",
                            "D/1",
                            "D/2",
                            "D/3",
                            "D/4",
                            "D/5",
                            "D/6",
                            "D/7",
                            "D/8",
                            "D/9",
                            "D/10",
                            "E/1",
                            "E/2",
                            "E/3",
                            "E/4",
                            "E/5",
                            "E/6",
                            "E/7",
                            "E/8",
                            "E/9",
                            "F/1",
                            "F/2",
                            "F/3",
                            "F/4",
                            "F/5",
                            null
                        ]
                    },
                    "piano": { "type": "string" },
                    "consistenza": { "type": "string" },
                    "rendita": { "type": "number" }
                },
                "required": ["foglio", "particella", "subalterno"]
            }
        },
        "tipoProvenienza": {
            "type": "string",
            "enum": [
                "compravendita",
                "donazione",
                "successione",
                "divisione",
                "usucapione",
                "altro",
                null
            ]
        }
    },
    "required": [
        "venditori",
        "acquirenti",
        "notaio",
        "dataAtto",
        "immobili",
        "tipoProvenienza",
        "indirizzo"
    ]
}
```

## Note Operative

- Il `tipoProvenienza` innesca la logica condizionale per documenti aggiuntivi:
    - **successione** → richiede Dichiarazione di Successione + Accettazione Eredità
    - **donazione** → richiede Certificato di Stato di Famiglia (per rischio revocatoria)
- Lo `statoCivile` dei venditori/acquirenti innesca:
    - **vedovo/a** → richiede Certificato di Morte + Certificato di Stato di Famiglia
    - **coniugato/a** → richiede Estratto Atto di Matrimonio
    - **separato/a o divorziato/a** → richiede Sentenza di Separazione/Divorzio + Estratto Atto di Matrimonio
- Il campo `regimePatrimoniale` è critico: in comunione dei beni, ENTRAMBI i coniugi devono firmare la vendita
