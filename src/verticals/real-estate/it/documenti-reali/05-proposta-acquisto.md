# Proposta di Acquisto

**ID**: `doc-proposta`
**Obbligatorio**: ✅ Sì (fase iniziale della trattativa)
**Base normativa**: Art. 1326-1329 c.c. (Proposta irrevocabile)

## Descrizione

Proposta irrevocabile d'acquisto formulata dall'acquirente al venditore, tipicamente tramite un'agenzia immobiliare. Una volta accettata dal venditore, diventa un contratto vincolante. È il primo documento che contiene i dati dell'acquirente e l'offerta economica.

## Campi

| Campo                      | Tipo        | Obbligatorio | Descrizione                     |
| -------------------------- | ----------- | :----------: | ------------------------------- |
| `proponente`               | oggetto     |      ✅      | Dati dell'acquirente proponente |
| `proponente.nome`          | string      |      ✅      | Nome                            |
| `proponente.cognome`       | string      |      ✅      | Cognome                         |
| `proponente.codiceFiscale` | string (CF) |      ✅      | Codice Fiscale                  |
| `proponente.statoCivile`   | enum        |              | Stato civile                    |
| `prezzoOfferto`            | number      |      ✅      | Importo dell'offerta in Euro    |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "proponente": {
            "type": "object",
            "properties": {
                "nome": { "type": "string" },
                "cognome": { "type": "string" },
                "codiceFiscale": {
                    "type": "string",
                    "pattern": "^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$"
                },
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
            "required": ["nome", "cognome", "codiceFiscale"]
        },
        "prezzoOfferto": { "type": "number" }
    },
    "required": ["proponente", "prezzoOfferto"]
}
```

## Note Operative

- La proposta è **irrevocabile** per il periodo indicato (tipicamente 15 giorni)
- All'accettazione, l'eventuale assegno allegato diventa caparra confirmatoria
- L'agenzia immobiliare è obbligata a trasmettere l'accettazione al proponente (Art. 1326 c.c.)
