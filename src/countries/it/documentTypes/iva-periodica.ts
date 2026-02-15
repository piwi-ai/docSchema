/**
 * Liquidazione IVA Periodica — Periodic VAT return.
 * Used by: accountant.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, objectSchema, ref,
    partitaIva,
} from '../../../helpers/it.js';

export const ivaPeriodica: DocumentTypeDef = {
    id: 'doc-iva-periodica',
    name: 'Liquidazione IVA Periodica',
    description: 'Comunicazione liquidazione periodica IVA — mensile o trimestrale',
    references: [
        ref('Agenzia delle Entrate — Liquidazioni IVA', 'https://www.agenziaentrate.gov.it/portale/web/guest/schede/comunicazioni/lipe-liquidazioni-periodiche-iva', 'documentation'),
        ref('Specifiche tecniche LIPE (XML)', 'https://www.agenziaentrate.gov.it/portale/web/guest/schede/comunicazioni/lipe-liquidazioni-periodiche-iva/sw-compilazione-e-controllo-lipe', 'schema'),
    ],
    jsonSchema: objectSchema({
        contribuente: objectSchema({
            denominazione: text('Denominazione / ragione sociale'),
            partitaIva: partitaIva(),
            codiceFiscale: text('Codice fiscale'),
        }, ['partitaIva']),
        anno: num('Anno di riferimento'),
        periodo: text('Periodo: mese o trimestre (es. T1, T2, Gennaio, ecc.)'),
        ivaEsigibile: num('IVA a debito (sulle vendite) in Euro'),
        ivaDetratta: num('IVA a credito (sugli acquisti) in Euro'),
        ivaVersata: num('IVA versata nel periodo in Euro'),
        saldo: num('Saldo IVA (debito se positivo, credito se negativo) in Euro'),
        creditoPrecedente: num('Credito periodo precedente in Euro'),
    }, ['contribuente', 'anno', 'periodo', 'ivaEsigibile', 'ivaDetratta', 'saldo']),
};
