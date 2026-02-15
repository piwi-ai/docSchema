/**
 * US — Document Type Definitions (barrel export)
 *
 * Every doc type lives in its own file. Import from this barrel
 * to get named exports you can compose into vertical-specific arrays.
 */

// ── Identity & Contact ──────────────────────────────────────────────────────
export { driversLicense } from './drivers-license.js';
export { contact } from './contact.js';

// ── Purchase & Closing ──────────────────────────────────────────────────────
export { purchaseAgreement } from './purchase-agreement.js';
export { deed } from './deed.js';
export { closingDisclosure } from './closing-disclosure.js';

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
