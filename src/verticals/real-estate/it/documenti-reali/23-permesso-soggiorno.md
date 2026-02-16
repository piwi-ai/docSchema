# Permesso di Soggiorno

**ID**: `doc-permesso-soggiorno`
**Obbligatorio**: Sì per cittadini extracomunitari
**Base normativa**: D.Lgs. 286/1998 (Testo Unico Immigrazione), Art. 6

## Descrizione

Documento rilasciato dalla Questura che autorizza la permanenza regolare in Italia di un cittadino extracomunitario. È richiesto dal notaio per l'identificazione e la legittimazione delle parti non-UE nella compravendita immobiliare. I cittadini extracomunitari possono acquistare immobili in Italia a condizione di avere un permesso di soggiorno valido o che sussista la condizione di reciprocità con il loro Paese di origine.

## Campi

| Campo            | Tipo                | Obbligatorio | Descrizione                                                          |
| ---------------- | ------------------- | :----------: | -------------------------------------------------------------------- |
| `nome`           | string              |      ✅      | Nome                                                                 |
| `cognome`        | string              |      ✅      | Cognome                                                              |
| `codiceFiscale`  | string (pattern CF) |      ✅      | Codice Fiscale                                                       |
| `cittadinanza`   | string              |      ✅      | Cittadinanza del titolare                                            |
| `tipoPermesso`   | string              |      ✅      | Tipo di permesso (es. lavoro subordinato, famiglia, lungo soggiorno) |
| `numeroPermesso` | string              |              | Numero del permesso di soggiorno                                     |
| `dataRilascio`   | date DD.MM.YYYY     |      ✅      | Data di rilascio                                                     |
| `dataScadenza`   | date DD.MM.YYYY     |      ✅      | Data di scadenza                                                     |
| `questura`       | string              |              | Questura rilasciante                                                 |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "nome": { "type": "string" },
        "cognome": { "type": "string" },
        "codiceFiscale": {
            "type": "string",
            "pattern": "^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$"
        },
        "cittadinanza": { "type": "string" },
        "tipoPermesso": { "type": "string" },
        "numeroPermesso": { "type": "string" },
        "dataRilascio": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "dataScadenza": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "questura": { "type": "string" }
    },
    "required": ["nome", "cognome", "codiceFiscale", "tipoPermesso", "dataRilascio", "dataScadenza"]
}
```

## Note Operative

- Il **Permesso di Soggiorno UE per soggiornanti di lungo periodo** (ex Carta di Soggiorno) non ha scadenza
- I cittadini UE/SEE/Svizzera **non necessitano** del permesso di soggiorno
- Per l'acquisto immobiliare, il notaio verifica la **condizione di reciprocità** (Art. 16 Disp. Prel. c.c.): il Paese di origine deve consentire ai cittadini italiani di acquistare immobili
- Il permesso deve essere **in corso di validità** al momento del rogito
- Il ricevuto di rinnovo (cedolino) è valido come prova di regolarità del soggiorno durante il rinnovo
