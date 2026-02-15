/**
 * Identity Document (France)
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, date, objectSchema,
    firstName, lastName, personalId
} from '../../../helpers/fr.js';

export const identita: DocumentTypeDef = {
    id: 'doc-identita',
    name: 'Identity Document',
    description: 'Identity document (ID Card, Passport, Driver License)',
    isArrayExtraction: true,
    jsonSchema: objectSchema({
        firstName: firstName(),
        lastName: lastName(),
        personalId: personalId(),
        documentType: text('Document type (Passport, ID Card, Driver License)'),
        documentNumber: text('Document number'),
        issueDate: date('Issue date'),
        expirationDate: date('Expiration date'),
        issuingAuthority: text('Issuing authority'),
        placeOfBirth: text('Place of birth'),
        dateOfBirth: date('Date of birth'),
        address: text('Residential address'),
    }, ['firstName', 'lastName', 'personalId', 'documentType', 'documentNumber', 'issueDate', 'expirationDate']),
};
