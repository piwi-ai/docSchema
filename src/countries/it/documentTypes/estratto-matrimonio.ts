/**
 * Estratto Atto di Matrimonio — Marriage certificate extract.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, date, enumField, objectSchema, ref } from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const estrattoMatrimonio: DocumentTypeDef = {
    id: 'doc-matrimonio',
    name: 'Estratto Atto di Matrimonio',
    description:
        "Estratto dell'atto di matrimonio o certificato di stato libero, richiesto dal notaio per verificare il regime patrimoniale",
    references: [
        ref(
            "Ministero dell'Interno — Servizi demografici",
            'https://dait.interno.gov.it/servizi-demografici',
            ReferenceType.DOCUMENTATION,
        ),
        ref(
            'Art. 159 Codice Civile — Regime patrimoniale',
            'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:codice.civile:1942-03-16;262~art159',
            ReferenceType.REGULATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            coniuge1: text('Nome e cognome del primo coniuge'),
            coniuge2: text('Nome e cognome del secondo coniuge'),
            dataMatrimonio: date(
                'Data di celebrazione del matrimonio in formato europeo DD.MM.YYYY',
            ),
            luogoMatrimonio: text('Comune di celebrazione'),
            regimePatrimoniale: enumField('Regime patrimoniale scelto', [
                'comunione dei beni',
                'separazione dei beni',
            ]),
            annotazioni: text(
                'Annotazioni marginali — copiare TESTUALMENTE dal documento (es. separazione, divorzio, convenzioni patrimoniali)',
            ),
            comuneRegistrazione: text("Comune dove è stato registrato l'atto"),
            parte: text("Parte e numero dell'atto"),
        },
        ['coniuge1', 'coniuge2', 'dataMatrimonio', 'luogoMatrimonio', 'regimePatrimoniale'],
    ),
};
