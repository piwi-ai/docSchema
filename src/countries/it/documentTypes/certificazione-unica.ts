/**
 * Certificazione Unica (CU) — Unified tax certificate.
 * Used by: accountant.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, date, objectSchema, ref,
    nome, cognome, codiceFiscale, partitaIva,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const certificazioneUnica: DocumentTypeDef = {
    id: 'doc-cu',
    name: 'Certificazione Unica (CU)',
    description: 'Certificazione Unica rilasciata dal datore di lavoro / committente',
    references: [
        ref('Agenzia delle Entrate — Certificazione Unica', 'https://www.agenziaentrate.gov.it/portale/web/guest/cu-certificazione-unica', ReferenceType.DOCUMENTATION),
        ref('Specifiche tecniche CU (tracciato record)', 'https://www.agenziaentrate.gov.it/portale/web/guest/cu-certificazione-unica/specifiche-tecniche-cu', ReferenceType.SPECIFICATION),
    ],
    jsonSchema: objectSchema({
        anno: num('Anno di riferimento dei redditi'),
        datoreLavoro: objectSchema({
            denominazione: text('Denominazione/ragione sociale del datore'),
            codiceFiscale: text('Codice fiscale del datore'),
            partitaIva: partitaIva(),
        }, ['denominazione', 'codiceFiscale']),
        percipiente: objectSchema({
            nome: nome(), cognome: cognome(), codiceFiscale: codiceFiscale(),
            dataNascita: date('Data di nascita'),
            comuneNascita: text('Comune di nascita'),
        }, ['nome', 'cognome', 'codiceFiscale']),
        redditoLordo: num('Reddito lordo in Euro'),
        ritenuteFiscali: num('Ritenute fiscali operate in Euro'),
        addizionaleRegionale: num('Addizionale regionale in Euro'),
        addizionaleComunale: num('Addizionale comunale in Euro'),
        contributiPrevidenziali: num('Contributi previdenziali trattenuti in Euro'),
        giorniLavorati: num('Numero giorni di lavoro'),
    }, ['anno', 'datoreLavoro', 'percipiente', 'redditoLordo', 'ritenuteFiscali']),
};
