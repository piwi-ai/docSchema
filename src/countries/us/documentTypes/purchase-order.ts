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

export const purchaseOrder: DocumentTypeDef = {
    id: 'doc-purchase-order',
    name: 'Purchase Order',
    description: 'A commercial document and first official offer issued by a buyer to a seller indicating types, quantities, and agreed prices for products or services.',
    jsonSchema: objectSchema({
        poNumber: text('Purchase Order (PO) Number'),
        date: dateUS('PO Date'),
        buyerName: text('Buyer/Company Name'),
        buyerAddress: address('Buyer Address'),
        vendorName: text('Vendor/Supplier Name'),
        vendorAddress: address('Vendor Address'),
        shippingAddress: address('Ship-To Address'),
        billingAddress: address('Bill-To Address'),
        paymentTerms: text('Payment Terms (e.g., Net 30)'),
        totalAmount: currency('Total Amount'),
        currency: enumField('Currency', ['USD']),
        items: arrayOfObjects({
            description: text('Item Description'),
            quantity: num('Quantity'),
            unitPrice: currency('Unit Price'),
            total: currency('Line Total'),
            sku: text('Item SKU/Product Code'),
        }, ['description', 'quantity', 'unitPrice'], 'List of items ordered'),
    }, ['poNumber', 'buyerName', 'vendorName', 'totalAmount']),
};
