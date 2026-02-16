# Documento d'Identità

**ID**: `doc-identita`
**Obbligatorio**: ✅ Sì (per ogni parte — venditore e acquirente)
**Estrazione array**: Sì — un documento può contenere dati di più persone
**Base normativa**: D.Lgs. 231/2007 (Antiriciclaggio), Art. 49 L. 89/1913 (Legge Notarile)

## Descrizione

Documento di identificazione personale richiesto dal notaio per l'identificazione delle parti ai fini antiriciclaggio (KYC) e per la redazione dell'atto pubblico. Può essere una Carta d'Identità o un Passaporto in corso di validità.

## Campi

| Campo                  | Tipo                | Obbligatorio | Descrizione                                                   |
| ---------------------- | ------------------- | :----------: | ------------------------------------------------------------- |
| `nome`                 | string              |      ✅      | Nome (first name)                                             |
| `cognome`              | string              |      ✅      | Cognome (surname)                                             |
| `codiceFiscale`        | string (pattern CF) |      ✅      | Codice Fiscale 16 caratteri alfanumerici                      |
| `tipoDocumento`        | enum                |      ✅      | `Carta D'Identita` \| `Passaporto`                            |
| `numeroDocumento`      | string              |      ✅      | Numero identificativo del documento                           |
| `dataEmissione`        | date DD.MM.YYYY     |      ✅      | Data di emissione                                             |
| `dataScadenza`         | date DD.MM.YYYY     |      ✅      | Data di scadenza — documento deve essere in corso di validità |
| `rilasciatoDa`         | string              |              | Autorità emittente (es. Comune di Roma, Questura di Milano)   |
| `luogoNascita`         | string              |      ✅      | Città e sigla provincia — formato: "Milano (MI)"              |
| `indirizzoDiResidenza` | string              |              | Indirizzo completo di residenza                               |
| `dataNascita`          | date DD.MM.YYYY     |      ✅      | Data di nascita                                               |
| `statoCivile`          | enum                |              | celibe/nubile/coniugato/a/vedovo/a/divorziato/a/separato/a    |

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
        "tipoDocumento": { "type": "string", "enum": ["Carta D'Identita", "Passaporto", null] },
        "numeroDocumento": { "type": "string" },
        "dataEmissione": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "dataScadenza": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "rilasciatoDa": { "type": "string" },
        "luogoNascita": { "type": "string" },
        "indirizzoDiResidenza": { "type": "string" },
        "dataNascita": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "statoCivile": {
            "type": "string",
            "enum": [
                "celibe",
                "nubile",
                "coniugato",
                "coniugata",
                "vedovo",
                "vedova",
                "divorziato",
                "divorziata",
                "separato",
                "separata",
                null
            ]
        }
    },
    "required": [
        "nome",
        "cognome",
        "codiceFiscale",
        "tipoDocumento",
        "numeroDocumento",
        "dataEmissione",
        "dataScadenza",
        "luogoNascita",
        "dataNascita"
    ]
}
```

## Note Operative

- Il documento deve essere **in corso di validità** al momento del rogito
- La Carta d'Identità Elettronica (CIE) è accettata
- Per cittadini extracomunitari: passaporto + permesso di soggiorno
- Il notaio verifica visivamente il documento e ne allega copia all'atto
- Lo stato civile sul documento d'identità può non essere aggiornato — il notaio lo verifica tramite certificati anagrafici separati
