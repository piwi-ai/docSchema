# Perizia Bancaria

**ID**: `doc-perizia-bancaria`
**Obbligatorio**: ⚡ Condizionale — quando è presente una Delibera di Mutuo (`importoMutuo` exists)
**Base normativa**: D.Lgs. 385/1993 (TUB), Art. 38; Linee guida ABI sulla valutazione immobiliare

## Descrizione

Perizia estimativa dell'immobile redatta da un perito incaricato dalla banca (o da società di valutazione convenzionata) per verificare il valore di mercato dell'immobile offerto in garanzia ipotecaria. La perizia è condizione necessaria per l'erogazione del mutuo: la banca eroga fino a un massimo dell'80% del valore di perizia (rapporto LTV). Il perito verifica anche la conformità catastale e urbanistica dell'immobile.

## Campi

| Campo                   | Tipo            | Obbligatorio | Descrizione                                                  |
| ----------------------- | --------------- | :----------: | ------------------------------------------------------------ |
| `perito`                | string          |      ✅      | Nome e cognome del perito incaricato                         |
| `dataPerizia`           | date DD.MM.YYYY |      ✅      | Data della perizia                                           |
| `indirizzo`             | string          |      ✅      | Indirizzo completo dell'immobile periziato                   |
| `foglio`                | string          |              | Foglio catastale                                             |
| `particella`            | string          |              | Particella catastale                                         |
| `subalterno`            | string          |              | Subalterno                                                   |
| `valoreStimato`         | number          |      ✅      | Valore di stima dell'immobile in Euro                        |
| `superficieCommerciale` | number          |              | Superficie commerciale in mq                                 |
| `statoConservazione`    | string          |              | Stato di conservazione (es. buono, ottimo, da ristrutturare) |
| `conformitaCatastale`   | string          |              | Esito verifica conformità catastale                          |
| `conformitaUrbanistica` | string          |              | Esito verifica conformità urbanistica                        |
| `note`                  | string          |              | Note o osservazioni del perito                               |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "perito": { "type": "string" },
        "dataPerizia": { "type": "string", "pattern": "^\\d{2}[./]\\d{2}[./]\\d{4}$" },
        "indirizzo": { "type": "string" },
        "foglio": { "type": "string" },
        "particella": { "type": "string" },
        "subalterno": { "type": "string" },
        "valoreStimato": { "type": "number" },
        "superficieCommerciale": { "type": "number" },
        "statoConservazione": { "type": "string" },
        "conformitaCatastale": { "type": "string" },
        "conformitaUrbanistica": { "type": "string" },
        "note": { "type": "string" }
    },
    "required": ["perito", "dataPerizia", "indirizzo", "valoreStimato"]
}
```

## Note Operative

- La perizia viene richiesta **dopo** la delibera di mutuo e **prima** del rogito
- Il perito è nominato dalla banca — il costo è a carico dell'acquirente (tipicamente €200-€500)
- Il valore di perizia può essere **inferiore** al prezzo di acquisto: in questo caso l'acquirente deve coprire la differenza con liquidità propria
- I dati catastali (`foglio`, `particella`, `subalterno`) permettono il cross-reference con l'entità immobile per verificare la congruenza con la visura catastale
- Il perito verifica anche l'assenza di **abusi edilizi** e la conformità tra stato di fatto e planimetria catastale
- La conformità urbanistica e catastale sono prerequisiti per l'iscrizione ipotecaria
