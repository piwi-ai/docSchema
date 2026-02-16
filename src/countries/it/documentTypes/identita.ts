/**
 * Documento d'Identità — Identity document.
 * Shared by: accountant, car-dealership, insurance, real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text,
    date,
    objectSchema,
    ref,
    nome,
    cognome,
    codiceFiscale,
    statoCivile,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const identita: DocumentTypeDef = {
    id: 'doc-identita',
    name: "Documento d'Identità",
    description:
        'Documento di riconoscimento (CI, Passaporto, Patente) per identificazione e Antiriciclaggio',
    references: [
        ref(
            "Carta d'Identità Elettronica (CIE)",
            'https://www.cartaidentita.interno.gov.it/',
            ReferenceType.DOCUMENTATION,
        ),
        ref(
            'Adeguata verifica — D.Lgs. 231/2007',
            'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2007-11-21;231',
            ReferenceType.REGULATION,
        ),
    ],
    isArrayExtraction: true,
    jsonSchema: objectSchema(
        {
            nome: nome(),
            cognome: cognome(),
            codiceFiscale: codiceFiscale(),
            tipoDocumento: text("Tipo documento: Carta D'Identità, Passaporto, Patente"),
            numeroDocumento: text(''),
            dataEmissione: date('Data di emissione in formato DD.MM.YYYY'),
            dataScadenza: date('Data di scadenza in formato DD.MM.YYYY'),
            rilasciatoDa: text('Autorità che ha rilasciato il documento'),
            luogoNascita: text(
                "Città seguita dalla sigla della provincia tra parentesi tonde — formato: 'NomeCittà (XX)'",
            ),
            dataNascita: date('Data di nascita in formato DD.MM.YYYY'),
            indirizzoDiResidenza: text(
                'Indirizzo completo di residenza — formato: Via/Piazza Nome Numero, CAP Città (Provincia)',
            ),
            statoCivile: statoCivile(),
        },
        [
            'nome',
            'cognome',
            'codiceFiscale',
            'tipoDocumento',
            'numeroDocumento',
            'dataEmissione',
            'dataScadenza',
            'luogoNascita',
            'dataNascita',
        ],
    ),
};
