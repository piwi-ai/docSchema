/**
 * HOA Documents — Homeowners Association documents, CCRs, bylaws and financials.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, objectSchema, ref,
    currency,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const hoaDocs: DocumentTypeDef = {
    id: 'doc-hoa-docs',
    name: 'HOA Documents',
    description: 'Homeowners Association documents — CCRs, bylaws, financials, disclosures',
    references: [
        ref('CAI — Community Associations Institute', 'https://www.caionline.org/', ReferenceType.DOCUMENTATION),
    ],
    jsonSchema: objectSchema({
        hoaName: text('HOA / community name'),
        managementCompany: text('Management company name'),
        monthlyDues: currency('Monthly HOA dues'),
        specialAssessments: text('Any pending or recent special assessments'),
        reserves: currency('HOA reserve fund balance'),
        restrictions: text('Key restrictions and covenants'),
        pendingLitigation: text('Any pending litigation or disputes'),
        masterInsurance: text('Master insurance policy coverage'),
    }, ['hoaName', 'monthlyDues']),
};
