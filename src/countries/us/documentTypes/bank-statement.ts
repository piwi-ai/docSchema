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
} from '../../../helpers/us.js';
import { DocumentTypeDef } from '../../../types.js';

export const bankStatement: DocumentTypeDef = {
    id: 'doc-bank-statement',
    name: 'Bank Statement',
    description: 'Monthly statement of account activity',
    jsonSchema: objectSchema({
        bankName: text('Name of the bank/financial institution'),
        accountNumber: text('Account number (masked or full)'),
        accountHolderName: text('Name of the account holder'),
        statementDate: dateUS('Statement generation date'),
        periodStart: dateUS('Statement period start date'),
        periodEnd: dateUS('Statement period end date'),
        openingBalance: currency('Opening balance'),
        closingBalance: currency('Closing balance'),
        totalDeposits: currency('Total amount of deposits/credits'),
        totalWithdrawals: currency('Total amount of withdrawals/debits'),
        transactions: arrayOfObjects({
            date: dateUS('Transaction date'),
            description: text('Transaction description'),
            amount: currency('Transaction amount'),
            type: enumField('Transaction type', ['credit', 'debit']),
            balance: currency('Balance after transaction'),
        }, ['date', 'description', 'amount'], 'List of transactions'),
    }, ['bankName', 'periodEnd', 'closingBalance']),
};
