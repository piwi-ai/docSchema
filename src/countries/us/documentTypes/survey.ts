/**
 * Property Survey / Plat Map — ALTA/NSPS land survey.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, dateUS, objectSchema, ref,
    address, parcelNumber,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const survey: DocumentTypeDef = {
    id: 'doc-survey',
    name: 'Property Survey / Plat Map',
    description: 'ALTA/NSPS land survey showing boundaries, improvements, and easements',
    references: [
        ref('ALTA/NSPS Land Title Survey Standards', 'https://www.alta.org/land-survey-standards/', ReferenceType.SPECIFICATION),
        ref('NSPS — National Society of Professional Surveyors', 'https://www.nsps.us.com/', ReferenceType.DOCUMENTATION),
    ],
    jsonSchema: objectSchema({
        surveyor: text('Surveyor name and license number'),
        surveyDate: dateUS('Date of survey'),
        propertyAddress: address('Property address'),
        parcelNumber: parcelNumber(),
        lotSize: text('Lot size / area (in acres or sq ft)'),
        legalDescription: text('Legal description from survey'),
        boundaryDescription: text('Property boundary details / metes and bounds'),
        improvements: text('Improvements shown (buildings, fences, driveways)'),
        easements: text('Easements identified'),
        encroachments: text('Any encroachments identified'),
        floodZone: text('FEMA flood zone designation (if shown)'),
    }, ['surveyor', 'surveyDate', 'propertyAddress', 'lotSize']),
};
