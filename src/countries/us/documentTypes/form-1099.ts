import {
    text,
    num,
    enumField,
    objectSchema,
    arrayOfObjects,
} from '../../../helpers/schema.js';
import {
    dateUS,
    currency,
    address,
    firstName,
    lastName,
    ssn,
    ein,
} from '../../../helpers/us.js';
import { DocumentTypeDef } from '../../../types.js';

export const form1099: DocumentTypeDef = {
    id: 'doc-1099',
    name: '1099 Form',
    description: 'IRS Form 1099 (NEC/MISC) - Non-Employee Compensation or Miscellaneous Income',
    jsonSchema: objectSchema({
        formType: enumField('Form 1099 type', ['NEC', 'MISC', 'INT', 'DIV']),
        year: num('Calendar year'),
        payerName: text('Payer\'s name'),
        payerAddress: address('Payer\'s address'),
        payerTIN: text('Payer\'s TIN (EIN or SSN)'),
        recipientName: text('Recipient\'s name'),
        recipientAddress: address('Recipient\'s address'),
        recipientTIN: text('Recipient\'s TIN (SSN or EIN)'),
        accountNumber: text('Account number (optional)'),
        nonEmployeeCompensation: currency('Non-employee compensation (Box 1 of 1099-NEC)'),
        federalTaxWithheld: currency('Federal income tax withheld (Box 4)'),
        stateTaxWithheld: currency('State tax withheld (Box 5)'),
        stateIncome: currency('State income (Box 7)'),
        state: text('State abbreviation (Box 6)'),
        payerStateNo: text('Payer\'s state no (Box 6)'),
    }, ['formType', 'year', 'payerName', 'recipientName']),
};
