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

export const invoice: DocumentTypeDef = {
    id: 'doc-invoice',
    name: 'Invoice',
    description: 'Commercial invoice requesting payment for goods or services',
    jsonSchema: objectSchema({
        invoiceNumber: text('Invoice number (unique identifier)'),
        invoiceDate: dateUS('Invoice issue date'),
        dueDate: dateUS('Payment due date'),
        vendorName: text('Name of the vendor/supplier issuing the invoice'),
        vendorAddress: address('Vendor address'),
        customerName: text('Name of the customer/recipient'),
        customerAddress: address('Customer address'),
        subtotal: currency('Subtotal amount before tax'),
        taxAmount: currency('Total tax amount'),
        totalAmount: currency('Total amount due'),
        paymentStatus: enumField('Payment status', ['paid', 'unpaid', 'overdue', 'partially_paid']),
        items: arrayOfObjects({
            description: text('Item or service description'),
            quantity: num('Quantity'),
            unitPrice: currency('Unit price'),
            amount: currency('Line item total amount'),
        }, ['description', 'amount'], 'Line items listed on the invoice'),
    }, ['invoiceNumber', 'invoiceDate', 'totalAmount', 'vendorName']),
};
