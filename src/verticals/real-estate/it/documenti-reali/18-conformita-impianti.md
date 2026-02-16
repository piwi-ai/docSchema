# Certificazione Conformità Impianti (DiCo)

**ID**: `doc-conformita-impianti`
**Obbligatorio**: ✅ Sì
**Base normativa**: D.M. 37/2008 (ex L. 46/1990), Art. 7

## Descrizione

Dichiarazione di Conformità (DiCo) rilasciata dall'impresa installatrice che attesta che gli impianti tecnologici (elettrico, idraulico, gas, riscaldamento, climatizzazione, ascensore) sono stati realizzati a regola d'arte e in conformità alle norme tecniche vigenti. La DiCo è obbligatoria per ogni intervento su impianti e va allegata o citata nell'atto notarile. In assenza della DiCo originale, un tecnico abilitato può rilasciare una DiRi (Dichiarazione di Rispondenza) per impianti realizzati prima del 27/03/2008.

## Campi

| Campo                  | Tipo            | Obbligatorio | Descrizione                                                                    |
| ---------------------- | --------------- | :----------: | ------------------------------------------------------------------------------ |
| `tipoImpianto`         | enum            |      ✅      | elettrico \| idraulico \| gas \| riscaldamento \| climatizzazione \| ascensore |
| `impresaInstallatrice` | string          |      ✅      | Ragione sociale dell'impresa installatrice                                     |
| `responsabileTecnico`  | string          |              | Nome del responsabile tecnico                                                  |
| `dataRilascio`         | date DD.MM.YYYY |      ✅      | Data di rilascio della dichiarazione                                           |
| `numeroProtocollo`     | string          |              | Numero di protocollo                                                           |
| `indirizzo`            | string          |      ✅      | Indirizzo dell'immobile                                                        |
| `normativaRiferimento` | string          |              | Normativa di riferimento (es. DM 37/2008, CEI 64-8, UNI 7129)                  |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "tipoImpianto": {
            "type": "string",
            "enum": [
                "elettrico",
                "idraulico",
                "gas",
                "riscaldamento",
                "climatizzazione",
                "ascensore",
                null
            ]
        },
        "impresaInstallatrice": { "type": "string" },
        "responsabileTecnico": { "type": "string" },
        "dataRilascio": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "numeroProtocollo": { "type": "string" },
        "indirizzo": { "type": "string" },
        "normativaRiferimento": { "type": "string" }
    },
    "required": ["tipoImpianto", "impresaInstallatrice", "dataRilascio", "indirizzo"]
}
```

## Note Operative

- La DiCo deve essere rilasciata da un'impresa **abilitata e iscritta alla Camera di Commercio**
- In pratica, una singola DiCo può coprire più impianti (es. "elettrico e termoidraulico") — l'enum attuale copre i singoli tipi
- La **DiRi** (Dichiarazione di Rispondenza) è l'alternativa per impianti preesistenti senza DiCo, rilasciata da un tecnico iscritto all'albo con almeno 5 anni di esperienza
- L'impresa deve allegare alla DiCo: schema dell'impianto, certificato Camera di Commercio, elenco materiali utilizzati
- Norme di riferimento comuni: CEI 64-8 (elettrico), UNI 7129 (gas), UNI EN 12831 (riscaldamento)
