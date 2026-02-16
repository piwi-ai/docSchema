# Conformità Urbanistica ed Edilizia

**ID**: `doc-conformita-urbanistica`
**Obbligatorio**: ✅ Sì
**Base normativa**: Art. 29 L. 52/1985, Art. 46 D.P.R. 380/2001 (T.U. Edilizia)

## Descrizione

Relazione tecnica redatta da un professionista abilitato (architetto, ingegnere, geometra) che attesta la corrispondenza tra lo stato di fatto dell'immobile e i titoli abilitativi edilizi depositati presso il Comune (licenza edilizia, concessione edilizia, permesso di costruire, SCIA, CILA, DIA). Il notaio è obbligato per legge a verificare la regolarità urbanistica nell'atto di compravendita — la vendita di un immobile abusivo è nulla (Art. 46 D.P.R. 380/2001).

## Campi

| Campo               | Tipo            | Obbligatorio | Descrizione                                                            |
| ------------------- | --------------- | :----------: | ---------------------------------------------------------------------- |
| `tecnico`           | string          |      ✅      | Nome del tecnico abilitato                                             |
| `dataRelazione`     | date DD.MM.YYYY |      ✅      | Data della relazione                                                   |
| `indirizzo`         | string          |      ✅      | Indirizzo completo dell'immobile                                       |
| `foglio`            | string          |              | Foglio catastale                                                       |
| `particella`        | string          |              | Particella catastale                                                   |
| `subalterno`        | string          |              | Subalterno                                                             |
| `titoliAbilitativi` | string          |              | Elenco dei titoli edilizi (licenza, concessione, permesso, SCIA, CILA) |
| `esito`             | enum            |      ✅      | conforme \| non conforme \| conforme con riserva                       |
| `difformita`        | string          |              | Descrizione delle eventuali difformità riscontrate                     |
| `condoni`           | string          |              | Eventuali domande di condono edilizio presentate                       |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "tecnico": { "type": "string" },
        "dataRelazione": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "indirizzo": { "type": "string" },
        "foglio": { "type": "string" },
        "particella": { "type": "string" },
        "subalterno": { "type": "string" },
        "titoliAbilitativi": { "type": "string" },
        "esito": {
            "type": "string",
            "enum": ["conforme", "non conforme", "conforme con riserva", null]
        },
        "difformita": { "type": "string" },
        "condoni": { "type": "string" }
    },
    "required": ["tecnico", "dataRelazione", "indirizzo", "esito"]
}
```

## Note Operative

- La vendita di un immobile con **abuso edilizio non sanato** è **nulla** (Art. 46 D.P.R. 380/2001)
- "Conforme con riserva" indica difformità sanabili tramite CILA/SCIA in sanatoria
- Le tre leggi di condono edilizio (L. 47/1985, L. 724/1994, D.L. 269/2003) hanno sanato molti abusi
- Il tecnico verifica: planimetria catastale vs stato di fatto vs titoli edilizi depositati in Comune
- Per gli immobili costruiti prima del 1942 potrebbe non esistere alcun titolo edilizio (è legittimo)
