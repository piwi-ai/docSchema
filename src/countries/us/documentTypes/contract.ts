import {
    text,
    num,
    enumField,
    objectSchema,
    arrayOfObjects,
} from '../../../helpers/schema.js';
import {
    dateUS,
    address,
    currency,
} from '../../../helpers/us.js';
import { DocumentTypeDef } from '../../../types.js';

export const contract: DocumentTypeDef = {
    id: 'doc-contract',
    name: 'Contract',
    description: 'A legally binding agreement between parties.',
    jsonSchema: objectSchema({
        contractTitle: text('Title of the contract/agreement'),
        effectiveDate: dateUS('Date the contract becomes effective'),
        expirationDate: dateUS('Date the contract expires'),
        partyOneName: text('Name of the first party (e.g., Service Provider, Seller)'),
        partyOneAddress: address('Address of the first party'),
        partyTwoName: text('Name of the second party (e.g., Client, Buyer)'),
        partyTwoAddress: address('Address of the second party'),
        contractValue: currency('Total value of the contract'),
        governingLaw: text('State or jurisdiction governing the contract'),
        signatures: arrayOfObjects({
            signerName: text('Name of the person signing'),
            signerTitle: text('Title of the person signing'),
            signatureDate: dateUS('Date of signature'),
        }, ['signerName'], 'Signatures present on the document'),
    }, ['contractTitle', 'partyOneName', 'partyTwoName', 'effectiveDate']),
};
