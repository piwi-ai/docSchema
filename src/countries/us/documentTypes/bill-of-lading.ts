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

export const billOfLading: DocumentTypeDef = {
    id: 'doc-bill-of-lading',
    name: 'Bill of Lading',
    description: 'A legal document between a shipper and a carrier detailing the type, quantity, and destination of goods.',
    jsonSchema: objectSchema({
        bolNumber: text('Bill of Lading Number (B/L No.)'),
        date: dateUS('Date of issue'),
        shipperName: text('Shipper/Exporter name'),
        shipperAddress: address('Shipper address'),
        consigneeName: text('Consignee/Receiver name'),
        consigneeAddress: address('Consignee address'),
        carrierName: text('Carrier/Transporter name'),
        carrierSCAC: text('Standard Carrier Alpha Code (SCAC)'),
        portOfLoading: text('Port of Loading'),
        portOfDischarge: text('Port of Discharge'),
        vesselName: text('Vessel/Vehicle name'),
        voyageNumber: text('Voyage/Trip number'),
        freightTerms: enumField('Freight payment terms', ['prepaid', 'collect', 'third_party']),
        totalWeight: num('Total Gross Weight'),
        weightUnit: enumField('Weight unit', ['kg', 'lb']),
        goodsDescription: arrayOfObjects({
            description: text('Description of goods'),
            quantity: num('Quantity/Packages'),
            weight: num('Weight of item'),
            dimensions: text('Dimensions (L x W x H)'),
        }, ['description', 'quantity'], 'List of goods being transported'),
    }, ['bolNumber', 'shipperName', 'consigneeName', 'carrierName']),
};
