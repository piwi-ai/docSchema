/**
 * Closing Disclosure (CD) — Final settlement statement with all costs and credits.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, num, dateUS, objectSchema, ref, currency, address } from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const closingDisclosure: DocumentTypeDef = {
    id: 'doc-closing-disclosure',
    name: 'Closing Disclosure (CD)',
    description: 'TRID Closing Disclosure — final settlement statement with all costs and credits',
    references: [
        ref(
            'CFPB — Closing Disclosure Explainer',
            'https://www.consumerfinance.gov/owning-a-home/closing-disclosure/',
            ReferenceType.DOCUMENTATION,
        ),
        ref(
            'TILA-RESPA Integrated Disclosure Rule',
            'https://www.consumerfinance.gov/rules-policy/final-rules/integrated-mortgage-disclosures-under-real-estate-settlement-procedures-act-regulation-x-and-truth-lending-act-regulation-z/',
            ReferenceType.REGULATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            closingDate: dateUS('Closing date'),
            propertyAddress: address('Property address'),
            seller: objectSchema(
                {
                    name: text('Seller full name'),
                    address: address("Seller's address"),
                },
                ['name'],
            ),
            buyer: objectSchema(
                {
                    name: text('Buyer full name'),
                    address: address("Buyer's address"),
                },
                ['name'],
            ),
            salePrice: currency('Sale price'),
            totalClosingCosts: currency('Total closing costs'),
            buyerClosingCosts: currency("Buyer's total closing costs"),
            sellerClosingCosts: currency("Seller's total closing costs"),
            loanAmount: currency('Loan amount'),
            interestRate: num('Interest rate (%)'),
            monthlyPayment: currency('Monthly principal & interest payment'),
            cashToClose: currency('Cash to close from buyer'),
            sellerProceeds: currency('Net proceeds to seller'),
            prorations: text('Tax and insurance prorations'),
        },
        ['closingDate', 'propertyAddress', 'salePrice', 'totalClosingCosts'],
    ),
};
