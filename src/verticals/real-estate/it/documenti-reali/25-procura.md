# Procura

**ID**: `doc-procura`
**Obbligatorio**: Sì quando una parte agisce tramite un rappresentante
**Base normativa**: Art. 1387-1400 c.c. (Rappresentanza), Art. 2699 c.c. (Atto pubblico)

## Descrizione

Atto notarile con cui una persona (mandante) conferisce a un'altra (mandatario) il potere di agire in suo nome e per suo conto per compiere uno o più atti giuridici, inclusa la compravendita immobiliare. La procura per atti immobiliari deve avere la forma dell'atto pubblico o della scrittura privata autenticata (Art. 1392 c.c.). Può essere **speciale** (per un atto specifico) o **generale** (per tutti gli atti di ordinaria e straordinaria amministrazione).

## Campi

| Campo                     | Tipo                | Obbligatorio | Descrizione                                                           |
| ------------------------- | ------------------- | :----------: | --------------------------------------------------------------------- |
| `nomeMandante`            | string              |      ✅      | Nome del mandante (la persona rappresentata)                          |
| `cognomeMandante`         | string              |      ✅      | Cognome del mandante                                                  |
| `codiceFiscaleMandante`   | string (pattern CF) |      ✅      | Codice Fiscale del mandante                                           |
| `nomeMandatario`          | string              |      ✅      | Nome del mandatario (il rappresentante)                               |
| `cognomeMandatario`       | string              |      ✅      | Cognome del mandatario                                                |
| `codiceFiscaleMandatario` | string (pattern CF) |      ✅      | Codice Fiscale del mandatario                                         |
| `tipoProcura`             | enum                |      ✅      | speciale \| generale                                                  |
| `oggettoDelega`           | string              |              | Oggetto specifico della delega (es. vendita dell'immobile sito in...) |
| `notaio`                  | string              |              | Notaio che ha autenticato la procura                                  |
| `dataAtto`                | date DD.MM.YYYY     |      ✅      | Data dell'atto                                                        |
| `numeroRepertorio`        | string              |              | Numero di repertorio                                                  |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "nomeMandante": { "type": "string" },
        "cognomeMandante": { "type": "string" },
        "codiceFiscaleMandante": {
            "type": "string",
            "pattern": "^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$"
        },
        "nomeMandatario": { "type": "string" },
        "cognomeMandatario": { "type": "string" },
        "codiceFiscaleMandatario": {
            "type": "string",
            "pattern": "^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$"
        },
        "tipoProcura": { "type": "string", "enum": ["speciale", "generale", null] },
        "oggettoDelega": { "type": "string" },
        "notaio": { "type": "string" },
        "dataAtto": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "numeroRepertorio": { "type": "string" }
    },
    "required": [
        "nomeMandante",
        "cognomeMandante",
        "codiceFiscaleMandante",
        "nomeMandatario",
        "cognomeMandatario",
        "codiceFiscaleMandatario",
        "tipoProcura",
        "dataAtto"
    ]
}
```

## Note Operative

- La procura per immobili deve avere forma di **atto pubblico o scrittura privata autenticata** (Art. 1392 c.c.)
- La procura **speciale** è limitata a un atto specifico (es. vendita di un determinato immobile) — è la più comune nelle compravendite
- La procura **generale** conferisce poteri ampi e deve contenere menzione espressa della facoltà di vendere/acquistare immobili
- La procura è **revocabile** in qualsiasi momento dal mandante (Art. 1396 c.c.)
- Il notaio verificherà che la procura sia **in corso di validità**, non revocata e che il mandatario non abbia conflitto di interessi
- La procura rilasciata all'estero deve essere **apostillata** (Convenzione dell'Aja) o **legalizzata** dal Consolato italiano
- Il notaio allega copia della procura all'atto di compravendita
