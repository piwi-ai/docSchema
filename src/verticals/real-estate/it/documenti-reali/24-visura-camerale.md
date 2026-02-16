# Visura Camerale

**ID**: `doc-visura-camerale`
**Obbligatorio**: Sì quando il venditore/acquirente è una persona giuridica (società)
**Base normativa**: Art. 2188 c.c. (Registro delle Imprese), D.P.R. 581/1995

## Descrizione

Documento ufficiale rilasciato dalla Camera di Commercio (CCIAA) che attesta i dati legali, economici e amministrativi di un'impresa iscritta al Registro delle Imprese. È indispensabile quando una delle parti della compravendita è una società: il notaio deve verificare l'esistenza e la validità della società, i poteri del legale rappresentante, e lo stato di attività.

## Campi

| Campo                         | Tipo                | Obbligatorio | Descrizione                                              |
| ----------------------------- | ------------------- | :----------: | -------------------------------------------------------- |
| `ragioneSociale`              | string              |      ✅      | Denominazione o ragione sociale della società            |
| `codiceFiscale`               | string              |      ✅      | Codice Fiscale / Partita IVA della società               |
| `sedeLegale`                  | string              |      ✅      | Indirizzo della sede legale                              |
| `formaGiuridica`              | string              |      ✅      | Forma giuridica (es. S.r.l., S.p.A., S.a.s., S.n.c.)     |
| `legaleRappresentante`        | string              |      ✅      | Nome e cognome del legale rappresentante                 |
| `codiceFiscaleRappresentante` | string (pattern CF) |              | Codice Fiscale del legale rappresentante                 |
| `numeroREA`                   | string              |              | Numero di iscrizione al Registro Imprese (REA)           |
| `dataIscrizione`              | string              |              | Data di iscrizione al Registro Imprese                   |
| `statoAttivita`               | string              |              | Stato di attività (es. attiva, in liquidazione, cessata) |
| `oggettoSociale`              | string              |              | Oggetto sociale della società                            |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "ragioneSociale": { "type": "string" },
        "codiceFiscale": { "type": "string" },
        "sedeLegale": { "type": "string" },
        "formaGiuridica": { "type": "string" },
        "legaleRappresentante": { "type": "string" },
        "codiceFiscaleRappresentante": {
            "type": "string",
            "pattern": "^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$"
        },
        "numeroREA": { "type": "string" },
        "dataIscrizione": { "type": "string" },
        "statoAttivita": { "type": "string" },
        "oggettoSociale": { "type": "string" }
    },
    "required": [
        "ragioneSociale",
        "codiceFiscale",
        "sedeLegale",
        "formaGiuridica",
        "legaleRappresentante"
    ]
}
```

## Note Operative

- Il notaio verifica i **poteri del legale rappresentante**: deve risultare dalla visura camerale che il rappresentante è autorizzato a compiere atti di disposizione immobiliare
- Per le **S.r.l.**, l'oggetto sociale deve includere l'attività immobiliare o la facoltà di acquistare/vendere immobili
- La visura camerale può essere **ordinaria** (dati attuali) o **storica** (cronologia completa delle variazioni)
- Una società in **liquidazione** può vendere immobili solo tramite il liquidatore
- Il notaio potrebbe richiedere anche la **delibera assembleare** o il **verbale CdA** che autorizza la vendita/acquisto
