# Planimetria Catastale

**ID**: `doc-planimetria`
**Obbligatorio**: ✅ Sì
**Base normativa**: Art. 29, c.1-bis, L. 52/1985 (Conformità catastale)

## Descrizione

Rappresentazione grafica in scala (1:100 o 1:200) dell'unità immobiliare depositata presso il Catasto. Dal 1° luglio 2010, Art. 19, c.14, D.L. 78/2010, il notaio deve attestare la conformità tra la planimetria catastale e lo stato di fatto dell'immobile nell'atto di compravendita. Se non conforme, è necessario un aggiornamento (procedura DOCFA).

## Campi

| Campo            | Tipo   | Obbligatorio | Descrizione                       |
| ---------------- | ------ | :----------: | --------------------------------- |
| `foglio`         | string |      ✅      | Foglio catastale                  |
| `particella`     | string |      ✅      | Particella catastale              |
| `subalterno`     | string |      ✅      | Subalterno                        |
| `protocollo`     | string |      ✅      | Numero di protocollo della scheda |
| `dataProtocollo` | date   |      ✅      | Data di protocollazione           |
| `scala`          | enum   |      ✅      | `1:100` \| `1:200`                |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "foglio": { "type": "string" },
        "particella": { "type": "string" },
        "subalterno": { "type": "string" },
        "protocollo": { "type": "string" },
        "dataProtocollo": { "type": "string", "pattern": "" },
        "scala": { "type": "string", "enum": ["1:100", "1:200", null] }
    },
    "required": ["foglio", "particella", "subalterno", "protocollo", "dataProtocollo", "scala"]
}
```

## Note Operative

- La planimetria deve corrispondere allo **stato di fatto** dell'immobile — il notaio lo dichiara nell'atto
- Se ci sono difformità (es. tramezzi modificati), serve una pratica DOCFA per aggiornamento catastale
- Il confronto planimetria/immobile è responsabilità del tecnico abilitato (geometra/architetto/ingegnere)
