/**
 * US Logistics — Document Type Definitions
 *
 * Covers standard documents processed by logistics companies:
 * invoices, purchase orders, bills of lading, packing lists, contracts.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    invoice,
    purchaseOrder,
    billOfLading,
    packingList,
    contract,
} from '../../../countries/us/documentTypes/index.js';

// ─── Document IDs ───────────────────────────────────────────────────────────

export const DOC_IDS = {
    INVOICE: invoice.id,
    PURCHASE_ORDER: purchaseOrder.id,
    BILL_OF_LADING: billOfLading.id,
    PACKING_LIST: packingList.id,
    CONTRACT: contract.id,
} as const;

// ─── Document Types ─────────────────────────────────────────────────────────

export const documentTypes: DocumentTypeDef[] = [
    invoice,
    purchaseOrder,
    billOfLading,
    packingList,
    contract,
].sort((a, b) => a.name.localeCompare(b.name, 'en'));
