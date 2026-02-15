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
} from '../../../helpers/us.js';
import { DocumentTypeDef } from '../../../types.js';

export const receipt: DocumentTypeDef = {
    id: 'doc-receipt',
    name: 'Receipt',
    description: 'Proof of payment for goods or services',
    jsonSchema: objectSchema({
        receiptNumber: text('Receipt identifier'),
        date: dateUS('Date of transaction'),
        merchantName: text('Name of the merchant/store'),
        merchantAddress: address('Merchant address'),
        paymentMethod: enumField('Payment method used', ['credit_card', 'cash', 'debit_card', 'check', 'digital_wallet']),
        subtotal: currency('Subtotal amount'),
        tax: currency('Tax amount'),
        total: currency('Total amount paid'),
        items: arrayOfObjects({
            description: text('Item description'),
            price: currency('Item price'),
            quantity: num('Quantity'),
        }, ['description', 'price'], 'Items purchased'),
    }, ['date', 'merchantName', 'total']),
};
