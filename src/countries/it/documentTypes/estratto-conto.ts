/**
 * Estratto Conto Bancario — Bank statement.
 * Used by: accountant.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, num, objectSchema, ref } from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const estrattoConto: DocumentTypeDef = {
    id: 'doc-estratto-conto',
    name: 'Estratto Conto Bancario',
    description: 'Estratto conto bancario — saldo, movimenti, periodo',
    references: [
        ref(
            "Banca d'Italia — Trasparenza bancaria",
            'https://www.bancaditalia.it/compiti/vigilanza/normativa/archivio-norme/disposizioni/trasparenza/index.html',
            ReferenceType.REGULATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            banca: text('Nome della banca'),
            iban: text('Codice IBAN'),
            intestatario: text('Intestatario del conto'),
            codiceFiscaleIntestatario: text("Codice fiscale / P.IVA dell'intestatario"),
            periodo: text('Periodo di riferimento (es. 01.01.2025 - 31.03.2025)'),
            saldoIniziale: num('Saldo iniziale del periodo in Euro'),
            saldoFinale: num('Saldo finale del periodo in Euro'),
            giacenzaMedia: num('Giacenza media nel periodo in Euro'),
            totaleEntrate: num('Totale entrate nel periodo in Euro'),
            totaleUscite: num('Totale uscite nel periodo in Euro'),
        },
        ['banca', 'iban', 'intestatario', 'saldoFinale'],
    ),
};
