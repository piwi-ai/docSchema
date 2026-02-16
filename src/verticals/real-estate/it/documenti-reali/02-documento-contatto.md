# Documento di Contatto

**ID**: `doc-contatto`
**Obbligatorio**: Sì (operativamente necessario per comunicazioni)
**Base normativa**: Prassi notarile, Art. 2 D.P.R. 68/2005 (PEC)

## Descrizione

Recapiti e indirizzi del cliente per comunicazioni e notifiche legali. Include dati di contatto telefonico, email ordinaria e PEC (Posta Elettronica Certificata). La PEC è fondamentale per le comunicazioni legali in Italia e ha valore equivalente alla raccomandata A/R.

## Campi

| Campo                | Tipo           | Obbligatorio | Descrizione                    |
| -------------------- | -------------- | :----------: | ------------------------------ |
| `nome`               | string         |      ✅      | Nome                           |
| `cognome`            | string         |      ✅      | Cognome                        |
| `telefonoCellulare`  | string         |      ✅      | Numero di cellulare principale |
| `telefonoFisso`      | string         |              | Eventuale numero fisso/ufficio |
| `email`              | string (email) |      ✅      | Indirizzo email ordinario      |
| `pec`                | string (email) |              | Posta Elettronica Certificata  |
| `indirizzoResidenza` | string         |      ✅      | Via/Piazza e numero civico     |
| `cittaResidenza`     | string         |              | Comune di residenza            |
| `cap`                | string         |              | Codice Avviamento Postale      |
| `provincia`          | string         |              | Sigla Provincia (es. MI, RM)   |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "nome": { "type": "string" },
        "cognome": { "type": "string" },
        "telefonoCellulare": { "type": "string" },
        "telefonoFisso": { "type": "string" },
        "email": { "type": "string", "format": "email" },
        "pec": { "type": "string", "format": "email" },
        "indirizzoResidenza": { "type": "string" },
        "cittaResidenza": { "type": "string" },
        "cap": { "type": "string" },
        "provincia": { "type": "string" }
    },
    "required": ["nome", "cognome", "telefonoCellulare", "email", "indirizzoResidenza"]
}
```

## Note Operative

- La PEC è obbligatoria per professionisti e imprese, facoltativa per privati
- L'indirizzo di residenza deve corrispondere a quello dichiarato nei documenti d'identità
- Il notaio può inviare comunicazioni ufficiali via PEC con valore legale
