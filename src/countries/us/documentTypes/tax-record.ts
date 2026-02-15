/**
 * Property Tax Record — County property tax records.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, enumField, objectSchema, ref,
    currency, address, parcelNumber,
} from '../../../helpers/us.js';

export const taxRecord: DocumentTypeDef = {
    id: 'doc-tax-record',
    name: 'Property Tax Record',
    description: 'County property tax records — assessed value, tax amounts, payment status',
    references: [
        ref('IRS — Property Tax Deduction', 'https://www.irs.gov/taxtopics/tc503', 'documentation'),
    ],
    jsonSchema: objectSchema({
        parcelNumber: parcelNumber(),
        propertyAddress: address('Property address'),
        owner: text('Property owner name per tax records'),
        assessedValue: currency('Total assessed value'),
        landValue: currency('Assessed land value'),
        improvementValue: currency('Assessed improvement value'),
        annualTax: currency('Annual property tax amount'),
        taxYear: num('Tax year'),
        paymentStatus: enumField('Payment status', ['current', 'delinquent', 'paid in full']),
        exemptions: text('Homestead or other exemptions applied'),
    }, ['parcelNumber', 'propertyAddress', 'assessedValue', 'annualTax']),
};
