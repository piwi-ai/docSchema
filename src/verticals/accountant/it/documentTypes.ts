/**
 * Accountant / Tax Firm Italy — Document Type Definitions
 *
 * Covers documents for a commercialista (Italian accountant/tax firm):
 * invoices, tax declarations (730, Redditi PF), F24 payments,
 * CU certifications, payroll, balance sheets, bank statements, ISEE.
 *
 * 14 document types for Italian accounting and tax management.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    identita, fattura, ricevuta, certificazioneUnica, mod730, redditiPf,
    f24, visuraCamerale, bilancio, contrattoLavoro,
    bustaPaga, estrattoConto, isee, ivaPeriodica,
} from '../../../countries/it/documentTypes/index.js';

// ─── Document IDs ───────────────────────────────────────────────────────────

export const DOC_IDS = {
    IDENTITA: identita.id,
    FATTURA: fattura.id,
    RICEVUTA: ricevuta.id,
    CU: certificazioneUnica.id,
    MOD_730: mod730.id,
    REDDITI_PF: redditiPf.id,
    F24: f24.id,
    VISURA_CAMERALE: visuraCamerale.id,
    BILANCIO: bilancio.id,
    CONTRATTO_LAVORO: contrattoLavoro.id,
    BUSTA_PAGA: bustaPaga.id,
    ESTRATTO_CONTO: estrattoConto.id,
    ISEE: isee.id,
    IVA_PERIODICA: ivaPeriodica.id,
} as const;

// ─── Document Types ─────────────────────────────────────────────────────────

export const documentTypes: DocumentTypeDef[] = [
    identita,
    fattura,
    ricevuta,
    certificazioneUnica,
    mod730,
    redditiPf,
    f24,
    visuraCamerale,
    bilancio,
    contrattoLavoro,
    bustaPaga,
    estrattoConto,
    isee,
    ivaPeriodica,
].sort((a, b) => a.name.localeCompare(b.name, 'it'));
