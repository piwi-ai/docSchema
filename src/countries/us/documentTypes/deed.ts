/**
 * Deed — Property deed (warranty, quitclaim, special warranty, etc.).
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, dateUS, enumField, objectSchema, ref,
    currency, address, parcelNumber,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const deed: DocumentTypeDef = {
    id: 'doc-deed',
    name: 'Deed',
    description: 'Property deed — warranty deed, quitclaim deed, special warranty deed',
    references: [
        ref('ALTA — Deed Standards', 'https://www.alta.org/', ReferenceType.SPECIFICATION),
    ],
    jsonSchema: objectSchema({
        deedType: enumField('Type of deed', ['General Warranty', 'Special Warranty', 'Quitclaim', 'Bargain and Sale', 'Grant Deed']),
        grantor: objectSchema({
            fullName: text('Full legal name of grantor (seller)'),
            address: address("Grantor's address"),
        }, ['fullName']),
        grantee: objectSchema({
            fullName: text('Full legal name of grantee (buyer)'),
            vestingType: text('Vesting / How title is held (e.g. tenants in common, joint tenants)'),
            address: address("Grantee's address"),
        }, ['fullName']),
        legalDescription: text('Full legal description of the property (metes and bounds, lot/block, or plat reference)'),
        propertyAddress: address('Property street address'),
        parcelNumber: parcelNumber(),
        consideration: currency('Consideration / purchase price'),
        recordingDate: dateUS('Date deed was recorded'),
        county: text('County where deed is recorded'),
        bookPage: text('Recording book and page number (e.g. Book 1234, Page 567)'),
    }, ['deedType', 'grantor', 'grantee', 'legalDescription', 'propertyAddress']),
};
