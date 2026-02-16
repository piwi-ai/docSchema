/**
 * Driver's License / Government ID — Primary identification document.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, dateUS, enumField, objectSchema, ref,
    firstName, lastName, address,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const driversLicense: DocumentTypeDef = {
    id: 'doc-drivers-license',
    name: "Driver's License / Government ID",
    description: "Government-issued identification: Driver's License, Passport, or State ID",
    references: [
        ref('REAL ID Act — DHS', 'https://www.dhs.gov/real-id', ReferenceType.REGULATION),
    ],
    isArrayExtraction: true,
    jsonSchema: objectSchema({
        firstName: firstName(), lastName: lastName(),
        middleName: text('Middle name (if present)'),
        dateOfBirth: dateUS('Date of birth'),
        idType: enumField('Type of identification', ["Driver's License", 'Passport', 'State ID']),
        idNumber: text('ID / License number'),
        issueDate: dateUS('Issue date'),
        expirationDate: dateUS('Expiration date'),
        issuingState: text('Issuing state (2-letter abbreviation, e.g. CA, NY, TX)'),
        address: address('Residential address as printed on ID'),
        sex: enumField('Sex', ['M', 'F']),
    }, ['firstName', 'lastName', 'dateOfBirth', 'idType', 'idNumber', 'expirationDate']),
};
