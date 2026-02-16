# Contratto di Mutuo

**ID**: `doc-contratto-mutuo`
**Obbligatorio**: No (solo in caso di acquisto con mutuo ipotecario)
**Base normativa**: D.Lgs. 385/1993 (TUB), Art. 38-41; Art. 1813-1822 c.c. (Mutuo)

## Descrizione

Contratto di mutuo ipotecario stipulato dal notaio contestualmente (o immediatamente prima) del rogito di compravendita. La banca eroga la somma direttamente al venditore attraverso il notaio, che iscrive contestualmente l'ipoteca sull'immobile a garanzia del finanziamento. Il mutuo fondiario gode di un regime speciale ai sensi del TUB, con ipoteca di primo grado e possibilità di estinzione anticipata senza penali.

## Campi

| Campo                     | Tipo                | Obbligatorio | Descrizione                            |
| ------------------------- | ------------------- | :----------: | -------------------------------------- |
| `banca`                   | string              |      ✅      | Nome della banca o istituto di credito |
| `mutuatario`              | string              |      ✅      | Nome e cognome del mutuatario          |
| `codiceFiscaleMutuatario` | string (pattern CF) |      ✅      | Codice Fiscale del mutuatario          |
| `importoMutuo`            | number              |      ✅      | Importo del mutuo erogato in Euro      |
| `durataAnni`              | number              |              | Durata del mutuo in anni               |
| `tassoInteresse`          | string              |              | Tasso di interesse e percentuale       |
| `tipoTasso`               | enum                |              | fisso \| variabile \| misto            |
| `rataMensile`             | number              |              | Importo rata mensile in Euro           |
| `notaio`                  | string              |      ✅      | Nome e cognome del notaio rogante      |
| `dataStipula`             | date DD.MM.YYYY     |      ✅      | Data di stipula                        |
| `numeroRepertorio`        | string              |              | Numero di repertorio                   |
| `ipoteca`                 | string              |              | Grado e importo dell'ipoteca iscritta  |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "banca": { "type": "string" },
        "mutuatario": { "type": "string" },
        "codiceFiscaleMutuatario": {
            "type": "string",
            "pattern": "^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$"
        },
        "importoMutuo": { "type": "number" },
        "durataAnni": { "type": "number" },
        "tassoInteresse": { "type": "string" },
        "tipoTasso": { "type": "string", "enum": ["fisso", "variabile", "misto", null] },
        "rataMensile": { "type": "number" },
        "notaio": { "type": "string" },
        "dataStipula": { "type": "string", "pattern": "^\\d{2}[./]\\d{2}[./]\\d{4}$" },
        "numeroRepertorio": { "type": "string" },
        "ipoteca": { "type": "string" }
    },
    "required": [
        "banca",
        "mutuatario",
        "codiceFiscaleMutuatario",
        "importoMutuo",
        "dataStipula",
        "notaio"
    ]
}
```

## Note Operative

- Il contratto di mutuo viene stipulato dal **notaio** contestualmente o immediatamente prima del rogito di compravendita
- L'importo del mutuo viene erogato dalla banca **direttamente al venditore** tramite il notaio
- Il notaio iscrive **contestualmente l'ipoteca** sull'immobile a garanzia del finanziamento
- L'ipoteca è tipicamente di **primo grado** e l'importo iscritto è solitamente pari al 150-200% del capitale mutuato
- Se il mutuatario è **coniugato in comunione dei beni**, il coniuge deve intervenire all'atto per autorizzare l'iscrizione ipotecaria (Art. 179 c.c.)
- Il contratto di mutuo fondiario consente l'**estinzione anticipata senza penali** per i contratti stipulati dopo il 2 febbraio 2007 (L. 40/2007, c.d. "Decreto Bersani")
- Il CF del mutuatario deve coincidere con quello dell'acquirente nell'atto di compravendita
