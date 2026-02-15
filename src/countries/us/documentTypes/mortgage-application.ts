/**
 * Mortgage Application (1003) — Uniform Residential Loan Application.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, dateUS, enumField, objectSchema, ref,
    firstName, lastName, ssn, currency, address,
} from '../../../helpers/us.js';

export const mortgageApplication: DocumentTypeDef = {
    id: 'doc-mortgage-application',
    name: 'Mortgage Application (1003)',
    description: 'Uniform Residential Loan Application (URLA / 1003)',
    references: [
        ref('Fannie Mae Form 1003 — URLA', 'https://singlefamily.fanniemae.com/originating-underwriting/uniform-residential-loan-application', 'specification'),
        ref('CFPB — Applying for a Mortgage', 'https://www.consumerfinance.gov/owning-a-home/process/apply/', 'documentation'),
    ],
    jsonSchema: objectSchema({
        borrower: objectSchema({
            firstName: firstName(), lastName: lastName(),
            ssn: ssn(), dateOfBirth: dateUS('Date of birth'),
            currentAddress: address('Current address'),
            employer: text('Current employer name'),
            jobTitle: text('Job title / position'),
            yearsEmployed: num('Years at current employer'),
            monthlyIncome: currency('Gross monthly income'),
        }, ['firstName', 'lastName', 'ssn']),
        coBorrower: objectSchema({
            firstName: firstName(), lastName: lastName(),
            ssn: ssn(),
            monthlyIncome: currency('Gross monthly income'),
        }, ['firstName', 'lastName']),
        propertyAddress: address('Subject property address'),
        loanAmount: currency('Requested loan amount'),
        loanType: enumField('Loan type', ['conventional', 'FHA', 'VA', 'USDA']),
        loanPurpose: enumField('Loan purpose', ['purchase', 'refinance', 'construction']),
        loanTerm: num('Loan term (years)'),
        totalAssets: currency('Total assets declared'),
        totalLiabilities: currency('Total liabilities / debts'),
    }, ['borrower', 'propertyAddress', 'loanAmount', 'loanType']),
};
