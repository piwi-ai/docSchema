/**
 * Purchase Agreement / Contract — Real estate purchase and sale agreement.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, dateUS, enumField, objectSchema, ref,
    firstName, lastName, currency, address,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const purchaseAgreement: DocumentTypeDef = {
    id: 'doc-purchase-agreement',
    name: 'Purchase Agreement / Contract',
    description: 'Real estate purchase and sale agreement between buyer and seller',
    references: [
        ref('NAR — Residential Purchase Agreement', 'https://www.nar.realtor/legal', ReferenceType.DOCUMENTATION),
    ],
    jsonSchema: objectSchema({
        seller: objectSchema({
            firstName: firstName(), lastName: lastName(),
            address: address("Seller's address"),
        }, ['firstName', 'lastName']),
        buyer: objectSchema({
            firstName: firstName(), lastName: lastName(),
            address: address("Buyer's address"),
        }, ['firstName', 'lastName']),
        propertyAddress: address('Subject property address'),
        purchasePrice: currency('Purchase price'),
        earnestMoney: currency('Earnest money deposit amount'),
        closingDate: dateUS('Expected closing date'),
        contingencies: text('List of contingencies (inspection, financing, appraisal, etc.)'),
        financingType: enumField('Financing type', ['conventional', 'FHA', 'VA', 'cash', 'other']),
        sellerConcessions: currency('Seller concessions / credits to buyer'),
        personalPropertyIncluded: text('Personal property included (appliances, fixtures, etc.)'),
        closingCostsSplit: text('How closing costs are split between parties'),
        executionDate: dateUS('Date contract was executed / signed'),
    }, ['seller', 'buyer', 'propertyAddress', 'purchasePrice', 'closingDate']),
};
