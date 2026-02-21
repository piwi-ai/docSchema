/**
 * US — Document Type Definitions (barrel export)
 *
 * Every doc type lives in its own file. Import from this barrel
 * to get named exports you can compose into vertical-specific arrays.
 */

// ── Identity & Contact ──────────────────────────────────────────────────────
export { driversLicense } from './drivers-license.js';
export { contact } from './contact.js';
export { passport } from './passport.js';

// ── Purchase & Closing ──────────────────────────────────────────────────────
export { purchaseAgreement } from './purchase-agreement.js';
export { deed } from './deed.js';
export { closingDisclosure } from './closing-disclosure.js';
export { contract } from './contract.js';

// ── Title ───────────────────────────────────────────────────────────────────
export { titleReport } from './title-report.js';
export { titleInsurance } from './title-insurance.js';

// ── Inspection & Appraisal ──────────────────────────────────────────────────
export { inspectionReport } from './inspection-report.js';
export { appraisal } from './appraisal.js';

// ── Mortgage ────────────────────────────────────────────────────────────────
export { mortgageApplication } from './mortgage-application.js';
export { mortgageApproval } from './mortgage-approval.js';

// ── Property ────────────────────────────────────────────────────────────────
export { hoaDocs } from './hoa-docs.js';
export { taxRecord } from './tax-record.js';
export { survey } from './survey.js';

// ── Commercial & Financial ──────────────────────────────────────────────────
export { invoice } from './invoice.js';
export { receipt } from './receipt.js';
export { purchaseOrder } from './purchase-order.js';
export { bankStatement } from './bank-statement.js';

// ── Employment & Tax ────────────────────────────────────────────────────────
export { w2 } from './w2.js';
export { form1099 } from './form-1099.js';
export { paystub } from './paystub.js';

// ── Logistics ───────────────────────────────────────────────────────────────
export { billOfLading } from './bill-of-lading.js';
export { packingList } from './packing-list.js';
