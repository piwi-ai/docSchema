# Tessera Sanitaria

**ID**: `doc-tessera-sanitaria`
**Obbligatorio**: No (opzionale — fonte alternativa dati anagrafici e CF)
**Base normativa**: D.M. 11.03.2004, Art. 50 D.L. 269/2003

## Descrizione

Documento rilasciato dal Ministero dell'Economia che contiene il Codice Fiscale e i dati anagrafici del titolare. È una Tessera Europea di Assicurazione Malattia (TEAM) valida in tutta l'UE. Nella pratica immobiliare viene utilizzata come fonte aggiuntiva per il Codice Fiscale e i dati anagrafici, non come documento d'identità primario.

## Campi

| Campo            | Tipo            | Obbligatorio | Descrizione                                                     |
| ---------------- | --------------- | :----------: | --------------------------------------------------------------- |
| `codiceFiscale`  | string (CF)     |      ✅      | Codice Fiscale (riportato sia in chiaro che nel codice a barre) |
| `cognome`        | string          |      ✅      | Cognome                                                         |
| `nome`           | string          |      ✅      | Nome                                                            |
| `sesso`          | enum            |      ✅      | `M` \| `F`                                                      |
| `luogoDiNascita` | string          |      ✅      | Comune di nascita                                               |
| `provincia`      | string          |      ✅      | Sigla provincia                                                 |
| `dataDiNascita`  | date DD.MM.YYYY |      ✅      | Data di nascita                                                 |
| `dataDiScadenza` | date DD.MM.YYYY |      ✅      | Data di scadenza della tessera                                  |
| `dataEmissione`  | date DD.MM.YYYY |      ✅      | Data di emissione                                               |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "codiceFiscale": {
            "type": "string",
            "pattern": "^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$"
        },
        "cognome": { "type": "string" },
        "nome": { "type": "string" },
        "sesso": { "type": "string", "enum": ["M", "F", null] },
        "luogoDiNascita": { "type": "string" },
        "provincia": { "type": "string" },
        "dataDiNascita": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "dataDiScadenza": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "dataEmissione": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" }
    },
    "required": [
        "codiceFiscale",
        "cognome",
        "nome",
        "sesso",
        "luogoDiNascita",
        "provincia",
        "dataDiNascita",
        "dataDiScadenza",
        "dataEmissione"
    ]
}
```

## Note Operative

- NON è un documento d'identità valido — serve come fonte aggiuntiva per il Codice Fiscale
- Il CF sulla tessera sanitaria è il riferimento ufficiale (emesso da Agenzia delle Entrate)
- Utile per il cross-check dei dati anagrafici quando il documento d'identità è poco leggibile
