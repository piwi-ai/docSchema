/**
 * Title Insurance Policy — Owner's or lender's title insurance.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, dateUS, enumField, objectSchema, ref,
    currency, address,
} from '../../../helpers/us.js';

export const titleInsurance: DocumentTypeDef = {
    id: 'doc-title-insurance',
    name: 'Title Insurance Policy',
    description: "Title insurance commitment or policy (owner's or lender's)",
    references: [
        ref('ALTA — Policy Forms', 'https://www.alta.org/policy-forms/', 'specification'),
    ],
    jsonSchema: objectSchema({
        insurer: text('Title insurance company'),
        policyNumber: text('Policy or commitment number'),
        policyType: enumField('Policy type', ["owner's", "lender's", 'both']),
        coverageAmount: currency('Coverage amount'),
        premium: currency('Premium amount'),
        insuredParty: text('Name of insured party'),
        effectiveDate: dateUS('Effective date'),
        propertyAddress: address('Insured property address'),
        exceptions: text('Policy exceptions and exclusions'),
    }, ['insurer', 'policyType', 'coverageAmount', 'insuredParty', 'propertyAddress']),
};
