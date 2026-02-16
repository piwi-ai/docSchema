# Delibera di Mutuo

**ID**: `doc-delibera-mutuo`
**Obbligatorio**: No (solo in caso di acquisto con mutuo ipotecario)
**Base normativa**: D.Lgs. 385/1993 (Testo Unico Bancario), Art. 38-41

## Descrizione

Lettera ufficiale della banca o istituto di credito che conferma l'approvazione del finanziamento ipotecario richiesto dall'acquirente. La delibera indica l'importo approvato, le condizioni del tasso (fisso, variabile o misto), la durata del mutuo e le eventuali condizioni sospensive. Rappresenta il passaggio fondamentale tra la richiesta di mutuo e la stipula del contratto, e ha solitamente una validità temporale limitata (tipicamente 6 mesi).

## Campi

| Campo                     | Tipo                | Obbligatorio | Descrizione                                                  |
| ------------------------- | ------------------- | :----------: | ------------------------------------------------------------ |
| `banca`                   | string              |      ✅      | Nome della banca o istituto di credito                       |
| `filiale`                 | string              |              | Filiale o agenzia                                            |
| `mutuatario`              | string              |      ✅      | Nome e cognome del mutuatario                                |
| `codiceFiscaleMutuatario` | string (pattern CF) |      ✅      | Codice Fiscale del mutuatario                                |
| `importoMutuo`            | number              |      ✅      | Importo del mutuo deliberato in Euro                         |
| `durataAnni`              | number              |              | Durata del mutuo in anni                                     |
| `tassoInteresse`          | string              |              | Tasso di interesse e percentuale                             |
| `tipoTasso`               | enum                |              | fisso \| variabile \| misto                                  |
| `dataDelibera`            | date DD.MM.YYYY     |      ✅      | Data della delibera                                          |
| `validitaDelibera`        | string              |              | Validità temporale della delibera (es. 6 mesi)               |
| `condizioniSospensive`    | string              |              | Eventuali condizioni sospensive (es. ipoteca di primo grado) |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "banca": { "type": "string" },
        "filiale": { "type": "string" },
        "mutuatario": { "type": "string" },
        "codiceFiscaleMutuatario": {
            "type": "string",
            "pattern": "^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$"
        },
        "importoMutuo": { "type": "number" },
        "durataAnni": { "type": "number" },
        "tassoInteresse": { "type": "string" },
        "tipoTasso": { "type": "string", "enum": ["fisso", "variabile", "misto", null] },
        "dataDelibera": { "type": "string", "pattern": "^\\d{2}[./]\\d{2}[./]\\d{4}$" },
        "validitaDelibera": { "type": "string" },
        "condizioniSospensive": { "type": "string" }
    },
    "required": ["banca", "mutuatario", "codiceFiscaleMutuatario", "importoMutuo", "dataDelibera"]
}
```

## Note Operative

- La delibera ha **validità limitata** (in genere 3-6 mesi): verificare la scadenza prima del rogito
- L'importo deliberato è il massimo erogabile, il mutuo effettivo potrebbe essere inferiore
- La delibera è subordinata all'esito positivo della **perizia bancaria** sull'immobile
- Il **rapporto LTV** (Loan to Value) tipico è 80% del valore di perizia — un LTV superiore richiede garanzie aggiuntive (es. CONSAP, fideiussione)
- La delibera attiva la condizione per richiedere la **perizia bancaria** sull'immobile oggetto della compravendita
- Il notaio verifica che il mutuatario coincida con l'acquirente (tramite codice fiscale)
