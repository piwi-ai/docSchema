/**
 * Dichiarazione di Successione — Inheritance declaration.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, date, objectSchema, arrayOfObjects, ref, codiceFiscale } from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const dichiarazioneSuccessione: DocumentTypeDef = {
    id: 'doc-successione',
    name: 'Dichiarazione di Successione',
    description:
        "Denuncia di successione presentata all'Agenzia delle Entrate, richiesta quando l'immobile proviene da eredità",
    references: [
        ref(
            'Agenzia delle Entrate — Dichiarazione di Successione',
            'https://www.agenziaentrate.gov.it/portale/web/guest/schede/dichiarazioni/dichiarazione-di-successione',
            ReferenceType.DOCUMENTATION,
        ),
        ref(
            'D.Lgs. 346/1990 — Imposta sulle successioni',
            'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1990-10-31;346',
            ReferenceType.REGULATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            defunto: text('Nome e cognome del defunto'),
            codiceFiscaleDefunto: codiceFiscale(
                'Codice Fiscale del defunto — per cross-reference con certificato di morte (extract without spaces)',
            ),
            dataDecesso: date('Data del decesso in formato europeo DD.MM.YYYY'),
            dataPresentazione: date(
                'Data di presentazione della dichiarazione in formato europeo DD.MM.YYYY',
            ),
            protocollo: text('Numero di protocollo Agenzia delle Entrate (es. SUC/2021/FI/12345)'),
            eredi: arrayOfObjects(
                {
                    nome: { type: 'string' },
                    cognome: { type: 'string' },
                    codiceFiscale: { type: 'string' },
                    quotaEreditaria: text('Quota di eredità (es. 1/2, 1/3)'),
                    rapportoParentela: text(
                        'Rapporto di parentela con il defunto (es. coniuge, figlio, fratello)',
                    ),
                },
                ['nome', 'cognome', 'codiceFiscale', 'quotaEreditaria'],
            ),
            foglio: { type: 'string' },
            particella: { type: 'string' },
            subalterno: { type: 'string' },
            volumeAtti: text('Volume e numero di registrazione'),
        },
        [
            'defunto',
            'dataDecesso',
            'dataPresentazione',
            'eredi',
            'foglio',
            'particella',
            'subalterno',
        ],
    ),
};
