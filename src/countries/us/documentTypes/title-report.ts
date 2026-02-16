/**
 * Title Report / Title Search — Preliminary title report showing ownership and encumbrances.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, dateUS, objectSchema, ref,
    address, parcelNumber,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const titleReport: DocumentTypeDef = {
    id: 'doc-title-report',
    name: 'Title Report / Title Search',
    description: 'Preliminary title report or title abstract showing ownership history and encumbrances',
    references: [
        ref('ALTA — Title Insurance Forms', 'https://www.alta.org/policy-forms/', ReferenceType.SPECIFICATION),
    ],
    jsonSchema: objectSchema({
        titleCompany: text('Title company name'),
        effectiveDate: dateUS('Effective date of the title search'),
        currentOwner: text('Current title holder / vested owner'),
        propertyAddress: address('Subject property address'),
        parcelNumber: parcelNumber(),
        legalDescription: text('Legal description of the property'),
        liens: text('Outstanding liens (mortgages, tax liens, judgment liens)'),
        easements: text('Easements and rights of way'),
        encumbrances: text('Other encumbrances or restrictions'),
        taxes: text('Property tax status (current, delinquent, amounts)'),
        exceptions: text('Schedule B exceptions from coverage'),
    }, ['titleCompany', 'currentOwner', 'propertyAddress']),
};
