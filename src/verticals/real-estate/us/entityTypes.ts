/**
 * US Real Estate — Entity Type Definitions
 *
 * 4 entity types: Seller, Buyer, Property, Transaction.
 * Aggregates data from IDs, purchase agreements, deeds, title reports,
 * appraisals, inspections, mortgage applications, and closing disclosures.
 */
import type { EntityTypeDef } from '../../../types.js';
import { F } from '../../../countries/us/fields.js';
import { nameMatch, addressMatch, parcelMatch, fm } from '../../../countries/us/matchHelpers.js';
import { DOC_IDS } from './documentTypes.js';

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
        fieldOrder: [F.FIRST_NAME, F.LAST_NAME, F.DATE_OF_BIRTH, F.ADDRESS, F.ID_NUMBER, F.PHONE, F.EMAIL],
        dataSources: [
            {
                docTypeId: DOC_IDS.DRIVERS_LICENSE, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.FIRST_NAME, F.FIRST_NAME, nameMatch()), fm(F.LAST_NAME, F.LAST_NAME, nameMatch()),
                    fm(F.DATE_OF_BIRTH, F.DATE_OF_BIRTH, nameMatch()), fm(F.ADDRESS, F.ADDRESS, nameMatch()),
                    fm(F.ID_TYPE, F.ID_TYPE, nameMatch()), fm(F.ID_NUMBER, F.ID_NUMBER, nameMatch()),
                    fm('expirationDate', F.ID_EXPIRATION_DATE, nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.PURCHASE_AGREEMENT, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('seller.firstName', F.FIRST_NAME, nameMatch()), fm('seller.lastName', F.LAST_NAME, nameMatch()),
                    fm('seller.address', F.ADDRESS, nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.DEED, enabled: true,
                fieldMappings: [
                    fm('grantor.fullName', F.FULL_NAME, nameMatch()),
                    fm('grantor.address', F.ADDRESS, nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CLOSING_DISCLOSURE, enabled: true,
                fieldMappings: [
                    fm('seller.name', F.FULL_NAME, nameMatch()),
                    fm(F.SELLER_PROCEEDS, F.NET_PROCEEDS, nameMatch()),
                    fm('sellerClosingCosts', F.CLOSING_COSTS, nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CONTACT, enabled: true,
                fieldMappings: [
                    fm(F.FIRST_NAME, F.FIRST_NAME, nameMatch()), fm(F.LAST_NAME, F.LAST_NAME, nameMatch()),
                    fm(F.PHONE, F.PHONE, nameMatch()), fm(F.EMAIL, F.EMAIL, nameMatch()),
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
        fieldOrder: [F.FIRST_NAME, F.LAST_NAME, F.DATE_OF_BIRTH, F.ADDRESS, F.ID_NUMBER, F.PHONE, F.EMAIL, F.EMPLOYER, F.MONTHLY_INCOME],
        dataSources: [
            {
                docTypeId: DOC_IDS.DRIVERS_LICENSE, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.FIRST_NAME, F.FIRST_NAME, nameMatch()), fm(F.LAST_NAME, F.LAST_NAME, nameMatch()),
                    fm(F.DATE_OF_BIRTH, F.DATE_OF_BIRTH, nameMatch()), fm(F.ADDRESS, F.ADDRESS, nameMatch()),
                    fm(F.ID_TYPE, F.ID_TYPE, nameMatch()), fm(F.ID_NUMBER, F.ID_NUMBER, nameMatch()),
                    fm('expirationDate', F.ID_EXPIRATION_DATE, nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.PURCHASE_AGREEMENT, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm('buyer.firstName', F.FIRST_NAME, nameMatch()), fm('buyer.lastName', F.LAST_NAME, nameMatch()),
                    fm('buyer.address', F.ADDRESS, nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.DEED, enabled: true,
                fieldMappings: [
                    fm('grantee.fullName', F.FULL_NAME, nameMatch()),
                    fm('grantee.vestingType', F.VESTING_TYPE, nameMatch()),
                    fm('grantee.address', F.ADDRESS, nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.MORTGAGE_APPLICATION, enabled: true,
                fieldMappings: [
                    fm('borrower.firstName', F.FIRST_NAME, nameMatch()), fm('borrower.lastName', F.LAST_NAME, nameMatch()),
                    fm('borrower.employer', F.EMPLOYER, nameMatch()), fm('borrower.jobTitle', F.JOB_TITLE, nameMatch()),
                    fm('borrower.monthlyIncome', F.MONTHLY_INCOME, nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.MORTGAGE_APPROVAL, enabled: true,
                fieldMappings: [
                    fm('borrower', F.FULL_NAME, nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CLOSING_DISCLOSURE, enabled: true,
                fieldMappings: [
                    fm('buyer.name', F.FULL_NAME, nameMatch()),
                    fm(F.CASH_TO_CLOSE, F.CASH_TO_CLOSE, nameMatch()),
                    fm('buyerClosingCosts', F.CLOSING_COSTS, nameMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.CONTACT, enabled: true,
                fieldMappings: [
                    fm(F.FIRST_NAME, F.FIRST_NAME, nameMatch()), fm(F.LAST_NAME, F.LAST_NAME, nameMatch()),
                    fm(F.PHONE, F.PHONE, nameMatch()), fm(F.EMAIL, F.EMAIL, nameMatch()),
                ],
            },
        ],
        conditionalRequirements: [
            {
                docTypeId: DOC_IDS.MORTGAGE_APPLICATION, enabled: true,
                conditions: [
                    { sourceDocTypeId: DOC_IDS.PURCHASE_AGREEMENT, field: F.FINANCING_TYPE, operator: 'exists' },
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
        fieldOrder: [F.PROPERTY_ADDRESS, F.PARCEL_NUMBER, F.APPRAISED_VALUE, F.ASSESSED_VALUE, F.SQUARE_FOOTAGE, F.LOT_SIZE, F.YEAR_BUILT, F.BEDROOMS, F.BATHROOMS],
        dataSources: [
            {
                docTypeId: DOC_IDS.PURCHASE_AGREEMENT, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.PROPERTY_ADDRESS, F.PROPERTY_ADDRESS, addressMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.DEED, enabled: true, isRequired: true,
                fieldMappings: [
                    fm(F.PROPERTY_ADDRESS, F.PROPERTY_ADDRESS, addressMatch()),
                    fm(F.PARCEL_NUMBER, F.PARCEL_NUMBER, parcelMatch()),
                    fm(F.LEGAL_DESCRIPTION, F.LEGAL_DESCRIPTION, addressMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.TITLE_REPORT, enabled: true, isRequired: true,
                fieldMappings: [
                    fm(F.PROPERTY_ADDRESS, F.PROPERTY_ADDRESS, addressMatch()),
                    fm(F.PARCEL_NUMBER, F.PARCEL_NUMBER, parcelMatch()),
                    fm(F.LIENS, F.LIENS, addressMatch()),
                    fm(F.EASEMENTS, F.EASEMENTS, addressMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.APPRAISAL, enabled: true, isRequired: true,
                fieldMappings: [
                    fm(F.PROPERTY_ADDRESS, F.PROPERTY_ADDRESS, addressMatch()),
                    fm(F.APPRAISED_VALUE, F.APPRAISED_VALUE, addressMatch()),
                    fm(F.SQUARE_FOOTAGE, F.SQUARE_FOOTAGE, addressMatch()),
                    fm(F.LOT_SIZE, F.LOT_SIZE, addressMatch()),
                    fm(F.YEAR_BUILT, F.YEAR_BUILT, addressMatch()),
                    fm(F.BEDROOMS, F.BEDROOMS, addressMatch()),
                    fm(F.BATHROOMS, F.BATHROOMS, addressMatch()),
                    fm(F.CONDITION, F.CONDITION, addressMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.INSPECTION_REPORT, enabled: true,
                fieldMappings: [
                    fm(F.PROPERTY_ADDRESS, F.PROPERTY_ADDRESS, addressMatch()),
                    fm('overallCondition', F.INSPECTION_CONDITION, addressMatch()),
                    fm('majorDefects', F.MAJOR_DEFECTS, addressMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.TAX_RECORD, enabled: true,
                fieldMappings: [
                    fm(F.PROPERTY_ADDRESS, F.PROPERTY_ADDRESS, addressMatch()),
                    fm(F.PARCEL_NUMBER, F.PARCEL_NUMBER, parcelMatch()),
                    fm(F.ASSESSED_VALUE, F.ASSESSED_VALUE, addressMatch()),
                    fm(F.ANNUAL_TAX, F.ANNUAL_TAX, addressMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.SURVEY, enabled: true,
                fieldMappings: [
                    fm(F.PROPERTY_ADDRESS, F.PROPERTY_ADDRESS, addressMatch()),
                    fm(F.PARCEL_NUMBER, F.PARCEL_NUMBER, parcelMatch()),
                    fm(F.LOT_SIZE, F.LOT_SIZE, addressMatch()),
                    fm(F.EASEMENTS, F.SURVEY_EASEMENTS, addressMatch()),
                    fm(F.ENCROACHMENTS, F.ENCROACHMENTS, addressMatch()),
                ],
            },
            {
                docTypeId: DOC_IDS.HOA_DOCS, enabled: true,
                fieldMappings: [
                    fm(F.HOA_NAME, F.HOA_NAME, addressMatch()),
                    fm('monthlyDues', F.HOA_MONTHLY_DUES, addressMatch()),
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
        fieldOrder: [F.PURCHASE_PRICE, F.CLOSING_DATE, F.LOAN_AMOUNT, F.INTEREST_RATE, F.MONTHLY_PAYMENT, F.CASH_TO_CLOSE, F.TOTAL_CLOSING_COSTS],
        dataSources: [
            {
                docTypeId: DOC_IDS.PURCHASE_AGREEMENT, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.PURCHASE_PRICE, F.PURCHASE_PRICE), fm(F.CLOSING_DATE, F.CLOSING_DATE),
                    fm(F.EARNEST_MONEY, F.EARNEST_MONEY), fm(F.FINANCING_TYPE, F.FINANCING_TYPE),
                    fm(F.SELLER_CONCESSIONS, F.SELLER_CONCESSIONS),
                ],
            },
            {
                docTypeId: DOC_IDS.CLOSING_DISCLOSURE, enabled: true, isRequired: true,
                fieldMappings: [
                    fm(F.SALE_PRICE, F.SALE_PRICE), fm(F.TOTAL_CLOSING_COSTS, F.TOTAL_CLOSING_COSTS),
                    fm(F.LOAN_AMOUNT, F.LOAN_AMOUNT), fm(F.INTEREST_RATE, F.INTEREST_RATE),
                    fm(F.MONTHLY_PAYMENT, F.MONTHLY_PAYMENT),
                    fm(F.CASH_TO_CLOSE, F.CASH_TO_CLOSE), fm(F.SELLER_PROCEEDS, F.SELLER_PROCEEDS),
                ],
            },
            {
                docTypeId: DOC_IDS.MORTGAGE_APPROVAL, enabled: true,
                fieldMappings: [
                    fm(F.APPROVED_AMOUNT, F.APPROVED_AMOUNT), fm(F.INTEREST_RATE, F.INTEREST_RATE),
                    fm(F.LOAN_TYPE, F.LOAN_TYPE), fm(F.LOAN_TERM, F.LOAN_TERM),
                ],
            },
        ],
        conditionalRequirements: [],
    },
];
