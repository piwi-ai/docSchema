/**
 * Contratto di Lavoro — Employment contract.
 * Used by: accountant.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text,
    num,
    date,
    enumField,
    objectSchema,
    ref,
    nome,
    cognome,
    codiceFiscale,
    partitaIva,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const contrattoLavoro: DocumentTypeDef = {
    id: 'doc-contratto-lavoro',
    name: 'Contratto di Lavoro',
    description: 'Contratto di lavoro dipendente — CCNL, livello, RAL',
    references: [
        ref(
            'Ministero del Lavoro — Tipologie contrattuali',
            'https://www.lavoro.gov.it/temi-e-priorita/rapporti-di-lavoro-e-relazioni-industriali/focus-on/tipologie-contrattuali',
            ReferenceType.REGULATION,
        ),
        ref(
            'Archivio CCNL — CNEL',
            'https://www.cnel.it/Archivio-Contratti',
            ReferenceType.DOCUMENTATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            datore: objectSchema(
                {
                    denominazione: text('Ragione sociale del datore'),
                    partitaIva: partitaIva(),
                    sedeLegale: text('Sede legale'),
                },
                ['denominazione'],
            ),
            dipendente: objectSchema(
                {
                    nome: nome(),
                    cognome: cognome(),
                    codiceFiscale: codiceFiscale(),
                    dataNascita: date('Data di nascita'),
                },
                ['nome', 'cognome', 'codiceFiscale'],
            ),
            ccnl: text('CCNL applicato (es. Commercio, Metalmeccanico, Studi Professionali)'),
            livello: text('Livello contrattuale (es. 3, 4, Q)'),
            qualifica: text('Qualifica/mansione'),
            tipoContratto: enumField('Tipo contratto', [
                'indeterminato',
                'determinato',
                'apprendistato',
                'somministrazione',
                'collaborazione',
            ]),
            dataAssunzione: date('Data di assunzione'),
            dataScadenza: date('Data scadenza (per contratti a termine)'),
            ral: num('Retribuzione Annua Lorda (RAL) in Euro'),
            oreLavoroSettimanali: num('Ore settimanali di lavoro'),
        },
        ['datore', 'dipendente', 'ccnl', 'tipoContratto', 'dataAssunzione'],
    ),
};
