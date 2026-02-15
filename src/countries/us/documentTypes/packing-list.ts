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
} from '../../../helpers/us.js';
import { DocumentTypeDef } from '../../../types.js';

export const packingList: DocumentTypeDef = {
    id: 'doc-packing-list',
    name: 'Packing List',
    description: 'A document detailing the contents of a package or shipment.',
    jsonSchema: objectSchema({
        packingListNumber: text('Packing List Number'),
        invoiceNumber: text('Associated Invoice Number'),
        date: dateUS('Date of issue'),
        shipperName: text('Shipper/Exporter name'),
        shipperAddress: address('Shipper address'),
        consigneeName: text('Consignee/Receiver name'),
        consigneeAddress: address('Consignee address'),
        totalPackages: num('Total number of packages/cartons'),
        totalNetWeight: num('Total Net Weight'),
        totalGrossWeight: num('Total Gross Weight'),
        weightUnit: enumField('Weight unit', ['kg', 'lb']),
        items: arrayOfObjects({
            description: text('Item description'),
            quantity: num('Quantity'),
            partNumber: text('Part/SKU Number'),
            netWeight: num('Net Weight'),
            grossWeight: num('Gross Weight'),
        }, ['description', 'quantity'], 'List of items in the shipment'),
    }, ['packingListNumber', 'shipperName', 'items']),
};
