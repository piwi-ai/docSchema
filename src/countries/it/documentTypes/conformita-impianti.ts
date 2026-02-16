/**
 * Certificazione Conformità Impianti — Systems compliance certificate.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, date, objectSchema, ref,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const conformitaImpianti: DocumentTypeDef = {
    id: 'doc-conformita-impianti',
    name: 'Certificazione Conformità Impianti',
    description: 'Dichiarazioni di conformità degli impianti (elettrico, idraulico, gas, riscaldamento) ai sensi del DM 37/2008',
    references: [
        ref('DM 37/2008 — Sicurezza impianti', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.ministeriale:2008-01-22;37', ReferenceType.REGULATION),
    ],
    jsonSchema: objectSchema({
        tipoImpianto: text('Tipo di impianto certificato (es. elettrico, idraulico, gas, riscaldamento, climatizzazione, ascensore, elettrico e termoidraulico)'),
        impresaInstallatrice: text('Ragione sociale dell\'impresa installatrice'),
        responsabileTecnico: text('Nome del responsabile tecnico'),
        dataRilascio: date('Data di rilascio della dichiarazione in formato europeo DD.MM.YYYY'),
        numeroProtocollo: text('Numero di protocollo della dichiarazione'),
        indirizzo: text('Indirizzo dell\'immobile'),
        foglio: text('Foglio catastale, se presente'),
        particella: text('Particella catastale, se presente'),
        subalterno: text('Subalterno, se presente'),
        normativaRiferimento: text('Normativa di riferimento (es. DM 37/2008, CEI 64-8)'),
    }, ['tipoImpianto', 'impresaInstallatrice', 'dataRilascio', 'indirizzo']),
};
