# Certificato di Destinazione Urbanistica (CDU)

**ID**: `doc-cdu`
**Obbligatorio**: Sì per terreni >5000 mq (situazionale per altri immobili)
**Base normativa**: Art. 30 D.P.R. 380/2001 (Testo Unico Edilizia)

## Descrizione

Certificato rilasciato dal Comune che attesta la destinazione urbanistica di un terreno secondo il Piano Regolatore Generale (PRG) o il Piano Urbanistico Generale (PUG). È obbligatorio per la vendita di terreni con superficie superiore a 5000 mq (Art. 30 D.P.R. 380/2001). Per terreni di superficie inferiore, è sufficiente la dichiarazione sostitutiva dell'alienante. Il CDU ha validità di 1 anno dalla data di rilascio.

## Campi

| Campo                     | Tipo            | Obbligatorio | Descrizione                                                           |
| ------------------------- | --------------- | :----------: | --------------------------------------------------------------------- |
| `foglio`                  | string          |      ✅      | Foglio catastale                                                      |
| `particella`              | string          |      ✅      | Particella catastale                                                  |
| `comune`                  | string          |      ✅      | Comune di ubicazione del terreno                                      |
| `destinazioneUrbanistica` | string          |      ✅      | Destinazione urbanistica (es. Zona Residenziale B2, Zona Agricola E1) |
| `estremiPRG`              | string          |              | Estremi del Piano Regolatore o Piano Urbanistico vigente              |
| `dataRilascio`            | date DD.MM.YYYY |      ✅      | Data di rilascio                                                      |
| `validita`                | string          |              | Validità del certificato (1 anno dalla data di rilascio)              |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "foglio": { "type": "string" },
        "particella": { "type": "string" },
        "comune": { "type": "string" },
        "destinazioneUrbanistica": { "type": "string" },
        "estremiPRG": { "type": "string" },
        "dataRilascio": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "validita": { "type": "string" }
    },
    "required": ["foglio", "particella", "comune", "destinazioneUrbanistica", "dataRilascio"]
}
```

## Note Operative

- Validità **1 anno** dalla data di rilascio — scaduto va richiesto di nuovo
- Obbligatorio per terreni >5000 mq; per terreni ≤5000 mq basta la dichiarazione sostitutiva dell'alienante
- Le zone urbanistiche variano da Comune a Comune ma seguono una classificazione generale (A=centro storico, B=completamento, C=espansione, D=industriale, E=agricolo, F=servizi)
- Fondamentale per valutare l'**edificabilità** del terreno e quindi il suo valore
- La vendita senza CDU (quando obbligatorio) è **nulla** (Art. 30, c.2, D.P.R. 380/2001)
