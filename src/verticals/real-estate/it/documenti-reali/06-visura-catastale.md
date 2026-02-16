# Visura Catastale

**ID**: `doc-visura`
**Obbligatorio**: ✅ Sì
**Base normativa**: D.P.R. 138/1998, Art. 29 L. 52/1985, Testo Unico Catasto (R.D. 1572/1931)

## Descrizione

Documento ufficiale rilasciato dall'Agenzia delle Entrate — Catasto che descrive lo stato attuale dell'immobile: dati identificativi (foglio, particella, subalterno), classamento (categoria, classe, rendita/superficie) e intestatari con i relativi diritti e quote. Può riguardare fabbricati o terreni. L'intestazione catastale ha valore fiscale ma NON probatorio della proprietà (per cui serve la visura ipotecaria).

## Campi

| Campo                                | Tipo             | Obbligatorio | Descrizione                                                                  |
| ------------------------------------ | ---------------- | :----------: | ---------------------------------------------------------------------------- |
| `foglio`                             | string           |      ✅      | Foglio catastale — porzione di territorio comunale                           |
| `particella`                         | string           |      ✅      | Particella (o mappale) — suddivisione del foglio                             |
| `subalterno`                         | string           |      ✅      | Subalterno — singola unità immobiliare nel fabbricato                        |
| `sezione`                            | string           |              | Sezione catastale (es. ABBIATEGUAZZONE)                                      |
| `comuneCatastale`                    | string           |      ✅      | Comune catastale con codice (es. TRADATE (L319B))                            |
| `indirizzoCatastale`                 | string           |              | Indirizzo dell'immobile                                                      |
| `piano`                              | string           |              | Piano (es. S1, T, 1, 2)                                                      |
| `categoriaCatastale`                 | enum             |              | Categoria catastale (A/1–A/11, B/1–B/8, C/1–C/7, D/1–D/10, E/1–E/9, F/1–F/5) |
| `classe`                             | string           |              | Classe catastale (numero)                                                    |
| `renditaCatastale`                   | number           |              | Rendita catastale in Euro — base per calcolo imposte                         |
| `consistenza`                        | string           |              | Vani (abitazioni) o mq (altre categorie)                                     |
| `qualita`                            | string           |              | Qualità colturale — solo per terreni (semin arbor, prato, vigneto)           |
| `superficie`                         | string           |              | Superficie totale in mq                                                      |
| `superficieEscluseAreeScoperte`      | string           |              | Superficie escluse aree scoperte in mq                                       |
| `redditoDominicale`                  | number           |              | Reddito dominicale — solo per terreni                                        |
| `redditoAgrario`                     | number           |              | Reddito agrario — solo per terreni                                           |
| `intestatiCatastali`                 | array di oggetti |      ✅      | Intestatari con diritti e quote                                              |
| `intestatiCatastali[].cognome`       | string           |      ✅      | Cognome dell'intestatario                                                    |
| `intestatiCatastali[].nome`          | string           |      ✅      | Nome dell'intestatario                                                       |
| `intestatiCatastali[].codiceFiscale` | string (CF)      |      ✅      | Codice Fiscale                                                               |
| `intestatiCatastali[].dataNascita`   | string           |      ✅      | Data di nascita DD/MM/YYYY                                                   |
| `intestatiCatastali[].luogoNascita`  | string           |      ✅      | Città e sigla provincia                                                      |
| `intestatiCatastali[].diritto`       | string           |      ✅      | Tipo di diritto e quota (es. "Proprietà per 1/1", "Nuda proprietà per 1/2")  |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "foglio": { "type": "string" },
        "particella": { "type": "string" },
        "subalterno": { "type": "string" },
        "sezione": { "type": "string" },
        "comuneCatastale": { "type": "string" },
        "indirizzoCatastale": { "type": "string" },
        "piano": { "type": "string" },
        "categoriaCatastale": {
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
        "classe": { "type": "string" },
        "renditaCatastale": { "type": "number" },
        "consistenza": { "type": "string" },
        "qualita": { "type": "string" },
        "superficie": { "type": "string" },
        "superficieEscluseAreeScoperte": { "type": "string" },
        "redditoDominicale": { "type": "number" },
        "redditoAgrario": { "type": "number" },
        "intestatiCatastali": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "cognome": { "type": "string" },
                    "nome": { "type": "string" },
                    "codiceFiscale": {
                        "type": "string",
                        "pattern": "^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$"
                    },
                    "dataNascita": { "type": "string" },
                    "luogoNascita": { "type": "string" },
                    "diritto": { "type": "string" }
                },
                "required": [
                    "cognome",
                    "nome",
                    "codiceFiscale",
                    "dataNascita",
                    "luogoNascita",
                    "diritto"
                ]
            }
        }
    },
    "required": ["foglio", "particella", "subalterno", "comuneCatastale", "intestatiCatastali"]
}
```

## Note Operative

- La tripletta **foglio/particella/subalterno** identifica univocamente ogni unità immobiliare in Italia
- La **rendita catastale** è la base per il calcolo delle imposte (registro, IMU, TASI)
- L'intestazione catastale NON prova la proprietà — serve la visura ipotecaria per la prova giuridica
- Dopo il rogito il notaio provvede alla voltura catastale per aggiornare l'intestazione
- Il campo `categoriaCatastale` "A/" è usato come trigger per la documentazione condominiale
