/**
 * US Real Estate — Entity Type Definitions
 *
 * 4 entity types: Seller, Buyer, Property, Transaction.
 * Aggregates data from IDs, purchase agreements, deeds, title reports,
 * appraisals, inspections, mortgage applications, and closing disclosures.
 */
import type { EntityTypeDef } from '../../../types';
import { DOC_IDS } from './documentTypes';

// ─── Match helpers ──────────────────────────────────────────────────────────

const nameMatch = () => [
    { field: 'firstName', fuzzyThreshold: 0.2 },
    { field: 'lastName', fuzzyThreshold: 0.2 },
];
const addressMatch = () => [
    { field: 'propertyAddress', fuzzyThreshold: 0.3 },
];
const parcelMatch = () => [
    { field: 'parcelNumber', fuzzyThreshold: 0 },
];
const fm = (sourceField: string, targetField: string, matchFields?: Array<{ field: string; fuzzyThreshold: number }>) =>
    ({ sourceField, targetField, ...(matchFields ? { matchFields } : {}) });

// ─── Entity IDs ─────────────────────────────────────────────────────────────

export const ENTITY_IDS = {
    SELLER: 'entity-seller',
    BUYER: 'entity-buyer',
    PROPERTY: 'entity-property',
    TRANSACTION: 'entity-transaction',
} as const;

// ─── Entity Types ───────────────────────────────────────────────────────────

export const entityTypes: EntityTypeDef[] = [
    {
        id: ENTITY_IDS.SELLER,
        name: 'Seller',
        icon: 'user-minus',
        color: '#ef4444',
        displayOrder: 0,
        fieldOrder: ['firstName', 'lastName', 'dateOfBirth', 'address', 'idNumber', 'phone', 'email'],
        dataSources: [
            {
                docTypeId: DOC_IDS.DRIVERS_LICENSE, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm('firstName', 'firstName', nameMatch()), fm('lastName', 'lastName', nameMatch()),
                    fm('dateOfBirth', 'dateOfBirth', nameMatch()), fm('address', 'address', nameMatch()),
                    fm('idType', 'idType', nameMatch()), fm('idNumber', 'idNumber', nameMatch()),
                    fm('expirationDate', 'idExpirationDate', nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.PURCHASE_AGREEMENT, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('seller.firstName', 'firstName', nameMatch()), fm('seller.lastName', 'lastName', nameMatch()),
                    fm('seller.address', 'address', nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.DEED, enabled: true,
                fieldMappings: [
                    fm('grantor.fullName', 'fullName', nameMatch()),
                    fm('grantor.address', 'address', nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CLOSING_DISCLOSURE, enabled: true,
                fieldMappings: [
                    fm('seller.name', 'fullName', nameMatch()),
                    fm('sellerProceeds', 'netProceeds', nameMatch()),
                    fm('sellerClosingCosts', 'closingCosts', nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CONTACT, enabled: true,
                fieldMappings: [
                    fm('firstName', 'firstName', nameMatch()), fm('lastName', 'lastName', nameMatch()),
                    fm('phone', 'phone', nameMatch()), fm('email', 'email', nameMatch()),
                ],
            },
        ],
        conditionalRequirements: [],
    },
    {
        id: ENTITY_IDS.BUYER,
        name: 'Buyer',
        icon: 'user-plus',
        color: '#22c55e',
        displayOrder: 1,
        fieldOrder: ['firstName', 'lastName', 'dateOfBirth', 'address', 'idNumber', 'phone', 'email', 'employer', 'monthlyIncome'],
        dataSources: [
            {
                docTypeId: DOC_IDS.DRIVERS_LICENSE, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm('firstName', 'firstName', nameMatch()), fm('lastName', 'lastName', nameMatch()),
                    fm('dateOfBirth', 'dateOfBirth', nameMatch()), fm('address', 'address', nameMatch()),
                    fm('idType', 'idType', nameMatch()), fm('idNumber', 'idNumber', nameMatch()),
                    fm('expirationDate', 'idExpirationDate', nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.PURCHASE_AGREEMENT, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('buyer.firstName', 'firstName', nameMatch()), fm('buyer.lastName', 'lastName', nameMatch()),
                    fm('buyer.address', 'address', nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.DEED, enabled: true,
                fieldMappings: [
                    fm('grantee.fullName', 'fullName', nameMatch()),
                    fm('grantee.vestingType', 'vestingType', nameMatch()),
                    fm('grantee.address', 'address', nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.MORTGAGE_APPLICATION, enabled: true,
                fieldMappings: [
                    fm('borrower.firstName', 'firstName', nameMatch()), fm('borrower.lastName', 'lastName', nameMatch()),
                    fm('borrower.employer', 'employer', nameMatch()), fm('borrower.jobTitle', 'jobTitle', nameMatch()),
                    fm('borrower.monthlyIncome', 'monthlyIncome', nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.MORTGAGE_APPROVAL, enabled: true,
                fieldMappings: [
                    fm('borrower', 'fullName', nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CLOSING_DISCLOSURE, enabled: true,
                fieldMappings: [
                    fm('buyer.name', 'fullName', nameMatch()),
                    fm('cashToClose', 'cashToClose', nameMatch()),
                    fm('buyerClosingCosts', 'closingCosts', nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CONTACT, enabled: true,
                fieldMappings: [
                    fm('firstName', 'firstName', nameMatch()), fm('lastName', 'lastName', nameMatch()),
                    fm('phone', 'phone', nameMatch()), fm('email', 'email', nameMatch()),
                ],
            },
        ],
        conditionalRequirements: [
            {
                docTypeId: DOC_IDS.MORTGAGE_APPLICATION, enabled: true,
                conditions: [
                    { sourceDocTypeId: DOC_IDS.PURCHASE_AGREEMENT, field: 'financingType', operator: 'exists' },
                ],
            },
        ],
    },
    {
        id: ENTITY_IDS.PROPERTY,
        name: 'Property',
        icon: 'building',
        color: '#3b82f6',
        displayOrder: 2,
        fieldOrder: ['propertyAddress', 'parcelNumber', 'appraisedValue', 'assessedValue', 'squareFootage', 'lotSize', 'yearBuilt', 'bedrooms', 'bathrooms'],
        dataSources: [
            {
                docTypeId: DOC_IDS.PURCHASE_AGREEMENT, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm('propertyAddress', 'propertyAddress', addressMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.DEED, enabled: true, isRequired: true,
                fieldMappings: [
                    fm('propertyAddress', 'propertyAddress', addressMatch()),
                    fm('parcelNumber', 'parcelNumber', parcelMatch()),
                    fm('legalDescription', 'legalDescription', addressMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.TITLE_REPORT, enabled: true, isRequired: true,
                fieldMappings: [
                    fm('propertyAddress', 'propertyAddress', addressMatch()),
                    fm('parcelNumber', 'parcelNumber', parcelMatch()),
                    fm('liens', 'liens', addressMatch()),
                    fm('easements', 'easements', addressMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.APPRAISAL, enabled: true, isRequired: true,
                fieldMappings: [
                    fm('propertyAddress', 'propertyAddress', addressMatch()),
                    fm('appraisedValue', 'appraisedValue', addressMatch()),
                    fm('squareFootage', 'squareFootage', addressMatch()),
                    fm('lotSize', 'lotSize', addressMatch()),
                    fm('yearBuilt', 'yearBuilt', addressMatch()),
                    fm('bedrooms', 'bedrooms', addressMatch()),
                    fm('bathrooms', 'bathrooms', addressMatch()),
                    fm('condition', 'condition', addressMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.INSPECTION_REPORT, enabled: true,
                fieldMappings: [
                    fm('propertyAddress', 'propertyAddress', addressMatch()),
                    fm('overallCondition', 'inspectionCondition', addressMatch()),
                    fm('majorDefects', 'majorDefects', addressMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.TAX_RECORD, enabled: true,
                fieldMappings: [
                    fm('propertyAddress', 'propertyAddress', addressMatch()),
                    fm('parcelNumber', 'parcelNumber', parcelMatch()),
                    fm('assessedValue', 'assessedValue', addressMatch()),
                    fm('annualTax', 'annualTax', addressMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.SURVEY, enabled: true,
                fieldMappings: [
                    fm('propertyAddress', 'propertyAddress', addressMatch()),
                    fm('parcelNumber', 'parcelNumber', parcelMatch()),
                    fm('lotSize', 'lotSize', addressMatch()),
                    fm('easements', 'surveyEasements', addressMatch()),
                    fm('encroachments', 'encroachments', addressMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.HOA_DOCS, enabled: true,
                fieldMappings: [
                    fm('hoaName', 'hoaName', addressMatch()),
                    fm('monthlyDues', 'hoaMonthlyDues', addressMatch()),
                ],
            },
        ],
        conditionalRequirements: [],
    },
    {
        id: ENTITY_IDS.TRANSACTION,
        name: 'Transaction',
        icon: 'banknote',
        color: '#f59e0b',
        displayOrder: 3,
        fieldOrder: ['purchasePrice', 'closingDate', 'loanAmount', 'interestRate', 'monthlyPayment', 'cashToClose', 'totalClosingCosts'],
        dataSources: [
            {
                docTypeId: DOC_IDS.PURCHASE_AGREEMENT, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm('purchasePrice', 'purchasePrice'), fm('closingDate', 'closingDate'),
                    fm('earnestMoney', 'earnestMoney'), fm('financingType', 'financingType'),
                    fm('sellerConcessions', 'sellerConcessions'),
                ],
            },
            {
                docTypeId: DOC_IDS.CLOSING_DISCLOSURE, enabled: true, isRequired: true,
                fieldMappings: [
                    fm('salePrice', 'salePrice'), fm('totalClosingCosts', 'totalClosingCosts'),
                    fm('loanAmount', 'loanAmount'), fm('interestRate', 'interestRate'),
                    fm('monthlyPayment', 'monthlyPayment'),
                    fm('cashToClose', 'cashToClose'), fm('sellerProceeds', 'sellerProceeds'),
                ],
            },
            {
                docTypeId: DOC_IDS.MORTGAGE_APPROVAL, enabled: true,
                fieldMappings: [
                    fm('approvedAmount', 'approvedAmount'), fm('interestRate', 'interestRate'),
                    fm('loanType', 'loanType'), fm('loanTerm', 'loanTerm'),
                ],
            },
        ],
        conditionalRequirements: [],
    },
];
