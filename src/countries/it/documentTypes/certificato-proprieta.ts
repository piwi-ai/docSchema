/**
 * Certificato di Proprietà (CDP) — Vehicle ownership certificate.
 * Used by: car-dealership.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, date, objectSchema, ref,
    codiceFiscale, targa, telaio,
} from '../../../helpers/it.js';

export const certificatoProprieta: DocumentTypeDef = {
    id: 'doc-certificato-proprieta',
    name: 'Certificato di Proprietà (CDP)',
    description: 'Certificato di proprietà digitale (CDPD) — attesta la titolarità del veicolo al PRA',
    references: [
        ref('ACI — Certificato di Proprietà Digitale', 'https://www.aci.it/i-servizi/guide-utili/guida-pratiche-auto/certificato-di-proprieta.html', 'documentation'),
        ref('PRA — Pubblico Registro Automobilistico', 'https://www.aci.it/i-servizi/servizi-online/pra.html', 'documentation'),
    ],
    jsonSchema: objectSchema({
        targa: targa(), telaio: telaio(),
        proprietario: text('Nome e cognome / ragione sociale del proprietario'),
        codiceFiscaleProprietario: codiceFiscale(),
        dataAcquisto: date("Data dell'ultima formalità di acquisto"),
        formalita: text('Tipo formalità (es. compravendita, successione, prima iscrizione)'),
        vincoli: text('Eventuali vincoli annotati (fermo amministrativo, ipoteca, leasing)'),
        note: text('Annotazioni aggiuntive'),
    }, ['targa', 'telaio', 'proprietario', 'codiceFiscaleProprietario']),
};
