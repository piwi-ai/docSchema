/**
 * Mortgage Approval / Commitment Letter — Lender commitment for mortgage financing.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, num, dateUS, enumField, objectSchema, ref, currency, address } from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const mortgageApproval: DocumentTypeDef = {
    id: 'doc-mortgage-approval',
    name: 'Mortgage Approval / Commitment Letter',
    description: 'Lender commitment or pre-approval letter for mortgage financing',
    references: [
        ref(
            'CFPB — Loan Estimate Explainer',
            'https://www.consumerfinance.gov/owning-a-home/loan-estimate/',
            ReferenceType.DOCUMENTATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            lender: text('Lender / bank name'),
            loanOfficer: text('Loan officer name'),
            borrower: text('Borrower full name'),
            approvalDate: dateUS('Date of approval / commitment'),
            approvedAmount: currency('Approved loan amount'),
            interestRate: num('Interest rate (%)'),
            loanType: enumField('Loan type', ['conventional', 'FHA', 'VA', 'USDA', 'jumbo']),
            loanTerm: num('Loan term (years)'),
            conditions: text('Conditions that must be met prior to closing'),
            expirationDate: dateUS('Commitment expiration date'),
            propertyAddress: address('Subject property address'),
        },
        ['lender', 'borrower', 'approvedAmount', 'interestRate', 'loanType'],
    ),
};
