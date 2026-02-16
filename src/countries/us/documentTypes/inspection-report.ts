/**
 * Home Inspection Report — Professional home inspection.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, dateUS, enumField, objectSchema, ref, address } from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const inspectionReport: DocumentTypeDef = {
    id: 'doc-inspection-report',
    name: 'Home Inspection Report',
    description:
        'Professional home inspection report — structural, mechanical, plumbing, electrical',
    references: [
        ref(
            'ASHI — Standards of Practice',
            'https://www.homeinspector.org/standards-of-practice',
            ReferenceType.SPECIFICATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            inspector: text('Inspector name and license number'),
            inspectionCompany: text('Inspection company name'),
            inspectionDate: dateUS('Date of inspection'),
            propertyAddress: address('Inspected property address'),
            overallCondition: enumField('Overall condition', ['excellent', 'good', 'fair', 'poor']),
            majorDefects: text('Major defects or safety concerns found'),
            roofCondition: text('Roof condition and estimated remaining life'),
            foundationCondition: text('Foundation / structural condition'),
            plumbing: text('Plumbing system condition'),
            electrical: text('Electrical system condition'),
            hvac: text('HVAC system condition and age'),
            recommendations: text('Recommended repairs or further inspections'),
        },
        ['inspector', 'inspectionDate', 'propertyAddress', 'overallCondition'],
    ),
};
