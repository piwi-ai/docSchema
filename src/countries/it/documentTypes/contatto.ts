/**
 * Documento di Contatto — Contact details.
 * Shared by: car-dealership, real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, objectSchema, ref,
    nome, cognome, email,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const contatto: DocumentTypeDef = {
    id: 'doc-contatto',
    name: 'Documento di Contatto',
    description: 'Recapiti e indirizzi del cliente per comunicazioni e notifiche legali',
    references: [
        ref('ANPR — Anagrafe Nazionale Popolazione Residente', 'https://www.anagrafenazionale.interno.it/', ReferenceType.DOCUMENTATION),
    ],
    jsonSchema: objectSchema({
        nome: nome(), cognome: cognome(),
        telefonoCellulare: text('Numero di cellulare principale'),
        telefonoFisso: text('Eventuale numero fisso/ufficio'),
        email: email('Indirizzo email'),
        pec: email('Posta Elettronica Certificata'),
        indirizzoResidenza: text('Via/Piazza e numero civico'),
        cittaResidenza: text('Comune di residenza'),
        cap: text('Codice Avviamento Postale'),
        provincia: text('Sigla Provincia (es. MI, RM)'),
    }, ['nome', 'cognome', 'telefonoCellulare', 'email', 'indirizzoResidenza']),
};
