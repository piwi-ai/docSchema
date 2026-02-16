# Certificato di Agibilità (Abitabilità)

**ID**: `doc-agibilita`
**Obbligatorio**: ✅ Sì
**Base normativa**: Art. 24 D.P.R. 380/2001 (Testo Unico Edilizia), modificato dal D.Lgs. 222/2016

## Descrizione

Certificato rilasciato dal Comune che attesta che l'immobile rispetta i requisiti di sicurezza, igiene, salubrità e risparmio energetico previsti dalla normativa vigente. Dal 2016 (D.Lgs. 222/2016) si ottiene tramite SCA (Segnalazione Certificata di Agibilità) presentata dal costruttore/proprietario entro 15 giorni dall'ultimazione lavori. L'assenza di agibilità non impedisce la vendita ma va dichiarata nell'atto.

## Campi

| Campo                | Tipo            | Obbligatorio | Descrizione                                                                                            |
| -------------------- | --------------- | :----------: | ------------------------------------------------------------------------------------------------------ |
| `numeroProtocollo`   | string          |      ✅      | Numero di protocollo del certificato/SCA                                                               |
| `dataRilascio`       | date DD.MM.YYYY |      ✅      | Data di rilascio                                                                                       |
| `comuneRilascio`     | string          |      ✅      | Comune che ha rilasciato il certificato                                                                |
| `richiedente`        | string          |              | Nome e cognome del richiedente                                                                         |
| `indirizzo`          | string          |      ✅      | Indirizzo completo dell'immobile                                                                       |
| `foglio`             | string          |              | Foglio catastale                                                                                       |
| `particella`         | string          |              | Particella catastale                                                                                   |
| `subalterno`         | string          |              | Subalterno                                                                                             |
| `destinazioneUso`    | enum            |      ✅      | residenziale \| ufficio \| commerciale \| industriale \| agricolo \| magazzino \| autorimessa \| altro |
| `tecnicoAsseverante` | string          |              | Nome del tecnico che ha asseverato la conformità                                                       |

## JSON Schema

```json
{
    "type": "object",
    "properties": {
        "numeroProtocollo": { "type": "string" },
        "dataRilascio": { "type": "string", "pattern": "^\\d{2}\\.\\d{2}\\.\\d{4}$" },
        "comuneRilascio": { "type": "string" },
        "richiedente": { "type": "string" },
        "indirizzo": { "type": "string" },
        "foglio": { "type": "string" },
        "particella": { "type": "string" },
        "subalterno": { "type": "string" },
        "destinazioneUso": {
            "type": "string",
            "enum": [
                "residenziale",
                "ufficio",
                "commerciale",
                "industriale",
                "agricolo",
                "magazzino",
                "autorimessa",
                "altro",
                null
            ]
        },
        "tecnicoAsseverante": { "type": "string" }
    },
    "required": [
        "numeroProtocollo",
        "dataRilascio",
        "comuneRilascio",
        "indirizzo",
        "destinazioneUso"
    ]
}
```

## Note Operative

- Immobili costruiti **prima del 30.06.2003** potrebbero avere il "vecchio" certificato di abitabilità (o nessuno)
- L'agibilità ha **validità illimitata** (salvo interventi strutturali che richiedono nuovo titolo)
- La mancanza è dichiarabile nell'atto notarile ma riduce il valore commerciale
- Dal 2016 il procedimento è cambiato: da Certificato (rilasciato dal Comune) a SCA (autocertificazione del tecnico)
