/**
 * Appraisal Report — Property market value determination for lending.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, dateUS, enumField, objectSchema, arrayOfObjects, ref,
    currency, address,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const appraisal: DocumentTypeDef = {
    id: 'doc-appraisal',
    name: 'Appraisal Report',
    description: 'Property appraisal — market value determination for lending',
    references: [
        ref('USPAP — Uniform Standards of Professional Appraisal Practice', 'https://www.appraisalfoundation.org/imis/TAF/Standards/Appraisal_Standards/Uniform_Standards_of_Professional_Appraisal_Practice/TAF/USPAP.aspx', ReferenceType.SPECIFICATION),
        ref('Fannie Mae Form 1004 (Uniform Residential Appraisal Report)', 'https://singlefamily.fanniemae.com/originating-underwriting/appraisal-valuation', ReferenceType.SPECIFICATION),
    ],
    jsonSchema: objectSchema({
        appraiser: text('Appraiser name and license number'),
        appraisalDate: dateUS('Date of appraisal'),
        propertyAddress: address('Subject property address'),
        appraisedValue: currency('Appraised market value'),
        squareFootage: num('Gross living area (sq ft)'),
        lotSize: text('Lot size (acres or sq ft)'),
        yearBuilt: num('Year built'),
        bedrooms: num('Number of bedrooms'),
        bathrooms: num('Number of bathrooms'),
        condition: enumField('Overall condition', ['C1', 'C2', 'C3', 'C4', 'C5', 'C6']),
        comparables: arrayOfObjects({
            address: address('Comparable property address'),
            salePrice: currency('Sale price'),
            saleDate: dateUS('Sale date'),
            squareFootage: num('Square footage'),
        }, ['address', 'salePrice'], 'Comparable sales used in valuation'),
        approachesUsed: text('Valuation approaches used (Sales Comparison, Cost, Income)'),
    }, ['appraiser', 'appraisalDate', 'propertyAddress', 'appraisedValue']),
};
