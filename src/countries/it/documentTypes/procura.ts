/**
 * Procura — Power of attorney.
 * Shared by: car-dealership, real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, date, enumField, objectSchema, ref,
    nome, cognome, codiceFiscale,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const procura: DocumentTypeDef = {
    id: 'doc-procura',
    name: 'Procura',
    description: 'Atto notarile che conferisce il potere di rappresentanza per compiere atti per conto di un\'altra persona',
    references: [
        ref('Art. 1392 Codice Civile — Forma della procura', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:codice.civile:1942-03-16;262~art1392', ReferenceType.REGULATION),
    ],
    jsonSchema: objectSchema({
        nomeMandante: nome(), cognomeMandante: cognome(),
        codiceFiscaleMandante: codiceFiscale('Codice Fiscale del mandante (extract without spaces)'),
        nomeMandatario: nome(), cognomeMandatario: cognome(),
        codiceFiscaleMandatario: codiceFiscale('Codice Fiscale del mandatario (extract without spaces)'),
        tipoProcura: enumField('Tipo di procura', ['speciale', 'generale']),
        oggettoDelega: text('Oggetto specifico della delega'),
        notaio: text('Notaio che ha autenticato la procura'),
        dataAtto: date('Data dell\'atto in formato europeo DD.MM.YYYY'),
        numeroRepertorio: text('Numero di repertorio'),
    }, ['nomeMandante', 'cognomeMandante', 'codiceFiscaleMandante', 'nomeMandatario', 'cognomeMandatario', 'codiceFiscaleMandatario', 'tipoProcura', 'dataAtto']),
};
