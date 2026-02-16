/**
 * Certificato Medico — Medical certificate for insurance claims.
 * Used by: insurance.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, date, objectSchema, ref,
    nome, cognome, codiceFiscale,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const certificatoMedico: DocumentTypeDef = {
    id: 'doc-certificato-medico',
    name: 'Certificato Medico',
    description: 'Certificato medico per lesioni da sinistro o infortunio coperto da polizza',
    references: [
        ref('Art. 139 Codice delle Assicurazioni — Danno biologico', 'https://www.ivass.it/normativa/nazionale/primaria/index.html', ReferenceType.REGULATION),
    ],
    jsonSchema: objectSchema({
        paziente: objectSchema({
            nome: nome(), cognome: cognome(), codiceFiscale: codiceFiscale(),
            dataNascita: date('Data di nascita'),
        }, ['nome', 'cognome', 'codiceFiscale']),
        medico: text('Nome e cognome del medico'),
        struttura: text('Struttura sanitaria / ospedale'),
        dataVisita: date('Data della visita/referto'),
        diagnosi: text('Diagnosi — copia VERBATIM dal certificato'),
        prognosi: text('Prognosi — giorni di guarigione o invalidità'),
        giorniPrognosi: num('Numero giorni di prognosi'),
        invaliditaPermanente: num('Percentuale di invalidità permanente (se indicata)'),
        terapiaPrescritta: text('Terapia prescritta'),
    }, ['paziente', 'medico', 'dataVisita', 'diagnosi']),
};
