/**
 * US Accounting — Entity Type Definitions
 *
 * Entities: Vendor, Employee, Bank Account.
 */
import type { EntityTypeDef } from '../../../types.js';
import { F } from '../../../countries/us/fields.js';
import { nameMatch, contactAddressMatch, taxIdMatch, accountMatch, fm } from '../../../countries/us/matchHelpers.js';
import { DOC_IDS } from './documentTypes.js';

// ─── Entity IDs ─────────────────────────────────────────────────────────────

export const ENTITY_IDS = {
    VENDOR: 'entity-vendor',
    EMPLOYEE: 'entity-employee',
    BANK_ACCOUNT: 'entity-bank-account',
} as const;

// ─── Entity Types ───────────────────────────────────────────────────────────

export const entityTypes: EntityTypeDef[] = [
    {
        id: ENTITY_IDS.VENDOR,
        name: 'Vendor',
        icon: 'briefcase',
        color: '#f97316',
        displayOrder: 0,
        fieldOrder: [F.VENDOR_NAME, F.ADDRESS, F.TAX_ID, F.PHONE, F.EMAIL],
        dataSources: [
            {
                docTypeId: DOC_IDS.INVOICE, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm('vendorName', F.VENDOR_NAME, [{ field: F.VENDOR_NAME, fuzzyThreshold: 0.1 }]),
                    fm('vendorAddress', F.ADDRESS, contactAddressMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.FORM_1099, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('payerName', F.VENDOR_NAME, [{ field: F.VENDOR_NAME, fuzzyThreshold: 0.1 }]),
                    fm('payerAddress', F.ADDRESS, contactAddressMatch()),
                    fm('payerTIN', F.TAX_ID, taxIdMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.RECEIPT, enabled: true,
                fieldMappings: [
                    fm('merchantName', F.VENDOR_NAME, [{ field: F.VENDOR_NAME, fuzzyThreshold: 0.1 }]),
                    fm('merchantAddress', F.ADDRESS, contactAddressMatch()),
                ],
            },
        ],
        conditionalRequirements: [],
    },
    {
        id: ENTITY_IDS.EMPLOYEE,
        name: 'Employee',
        icon: 'user',
        color: '#3b82f6',
        displayOrder: 1,
        fieldOrder: [F.FULL_NAME, F.SSN, F.ADDRESS, F.ID_NUMBER],
        dataSources: [
            {
                docTypeId: DOC_IDS.W2, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm('employeeName', F.FULL_NAME, nameMatch()),
                    fm('employeeSSN', F.SSN, taxIdMatch()),
                    fm('employeeAddress', F.ADDRESS, contactAddressMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.PAYSTUB, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('employeeName', F.FULL_NAME, nameMatch()),
                    fm('ssn', F.SSN, taxIdMatch()),
                    fm('employeeAddress', F.ADDRESS, contactAddressMatch()),
                    fm('employeeId', F.ID_NUMBER),
                ],
            },
        ],
        conditionalRequirements: [],
    },
    {
        id: ENTITY_IDS.BANK_ACCOUNT,
        name: 'Bank Account',
        icon: 'credit-card',
        color: '#10b981',
        displayOrder: 2,
        fieldOrder: [F.BANK_NAME, F.ACCOUNT_NUMBER, 'accountHolderName'],
        dataSources: [
            {
                docTypeId: DOC_IDS.BANK_STATEMENT, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm('bankName', F.BANK_NAME),
                    fm('accountNumber', F.ACCOUNT_NUMBER, accountMatch()),
                    fm('accountHolderName', 'accountHolderName', nameMatch()),
                ],
            },
        ],
        conditionalRequirements: [],
    },
];
