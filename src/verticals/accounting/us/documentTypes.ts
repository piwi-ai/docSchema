/**
 * US Accounting — Document Type Definitions
 *
 * Covers standard documents processed by accounting firms:
 * invoices, receipts, bank statements, tax forms, payroll documents.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    invoice,
    receipt,
    bankStatement,
    w2,
    form1099,
    paystub,
    contact,
} from '../../../countries/us/documentTypes/index.js';

// ─── Document IDs ───────────────────────────────────────────────────────────

export const DOC_IDS = {
    INVOICE: invoice.id,
    RECEIPT: receipt.id,
    BANK_STATEMENT: bankStatement.id,
    W2: w2.id,
    FORM_1099: form1099.id,
    PAYSTUB: paystub.id,
    CONTACT: contact.id,
} as const;

// ─── Document Types ─────────────────────────────────────────────────────────

export const documentTypes: DocumentTypeDef[] = [
    invoice,
    receipt,
    bankStatement,
    w2,
    form1099,
    paystub,
    contact,
].sort((a, b) => a.name.localeCompare(b.name, 'en'));
