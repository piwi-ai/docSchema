# Accettazione di Eredità

**ID**: `doc-eredita`
**Obbligatorio**: ⚡ Condizionale — quando `tipoProvenienza` = "successione"
**Base normativa**: Art. 459-487 c.c., Art. 2648 c.c. (Trascrizione)

## Descrizione

Atto formale con cui l'erede manifesta la volontà di accettare l'eredità. Può essere espressa (dichiarazione formale davanti al notaio) o tacita (comportamento inequivocabile, come la vendita stessa). L'atto deve essere trascritto in Conservatoria dei Registri Immobiliari per rendere pubblico il passaggio di proprietà e consentire la successiva vendita. Senza la trascrizione dell'accettazione, il notaio non può procedere al rogito di vendita.

## Campi

| Campo                | Tipo            | Obbligatorio | Descrizione                             |
| -------------------- | --------------- | :----------: | --------------------------------------- |
| `erede`              | string          |      ✅      | Nome e cognome dell'erede accettante    |
| `codiceFiscaleErede` | string          |      ✅      | Codice Fiscale dell'erede               |
| `defunto`            | string          |      ✅      | Nome e cognome del defunto (de cuius)   |
| `dataTrascrizione`   | date DD.MM.YYYY |      ✅      | Data di trascrizione in Conservatoria   |
| `notaio`             | string          |              | Notaio rogante                          |
| `numeroRepertorio`   | string          |              | Numero di repertorio del notaio         |
| `numeroTrascrizione` | string          |              | Numero di trascrizione in Conservatoria |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "erede": { "type": "string" },
        "codiceFiscaleErede": { "type": "string" },
        "defunto": { "type": "string" },
        "dataTrascrizione": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "notaio": { "type": "string" },
        "numeroRepertorio": { "type": "string" },
        "numeroTrascrizione": { "type": "string" }
    },
    "required": ["erede", "codiceFiscaleErede", "defunto", "dataTrascrizione"]
}
```

## Note Operative

- L'accettazione può essere **pura e semplice** o **con beneficio d'inventario**
    - Con beneficio d'inventario: l'erede non risponde dei debiti oltre il valore dei beni ereditati
- La **trascrizione** è il passaggio chiave — rende l'accettazione opponibile a terzi
- In caso di accettazione tacita, la trascrizione spesso avviene contestualmente al rogito di vendita
- Il diritto di accettare l'eredità si prescrive in **10 anni** dalla data di apertura della successione
- Una volta accettata, l'eredità non può essere rifiutata (Art. 475 c.c.)
