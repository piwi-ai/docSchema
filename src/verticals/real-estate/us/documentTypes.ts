/**
 * US Real Estate — Document Type Definitions
 *
 * Covers the standard US residential real estate transaction workflow:
 * driver's licenses, purchase agreements, deeds, title reports,
 * inspections, appraisals, mortgage and escrow documents.
 *
 * 14 document types for US real estate closings.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    driversLicense, contact,
    purchaseAgreement, deed, closingDisclosure,
    titleReport, titleInsurance,
    inspectionReport, appraisal,
    mortgageApplication, mortgageApproval,
    hoaDocs, taxRecord, survey,
} from '../../../countries/us/documentTypes/index.js';

// ─── Document IDs ───────────────────────────────────────────────────────────

export const DOC_IDS = {
    DRIVERS_LICENSE: driversLicense.id,
    CONTACT: contact.id,
    PURCHASE_AGREEMENT: purchaseAgreement.id,
    DEED: deed.id,
    TITLE_REPORT: titleReport.id,
    TITLE_INSURANCE: titleInsurance.id,
    CLOSING_DISCLOSURE: closingDisclosure.id,
    INSPECTION_REPORT: inspectionReport.id,
    APPRAISAL: appraisal.id,
    MORTGAGE_APPLICATION: mortgageApplication.id,
    MORTGAGE_APPROVAL: mortgageApproval.id,
    HOA_DOCS: hoaDocs.id,
    TAX_RECORD: taxRecord.id,
    SURVEY: survey.id,
} as const;

// ─── Document Types ─────────────────────────────────────────────────────────

export const documentTypes: DocumentTypeDef[] = [
    driversLicense,
    contact,
    purchaseAgreement,
    deed,
    titleReport,
    titleInsurance,
    closingDisclosure,
    inspectionReport,
    appraisal,
    mortgageApplication,
    mortgageApproval,
    hoaDocs,
    taxRecord,
    survey,
].sort((a, b) => a.name.localeCompare(b.name, 'en'));
