/**
 * US Logistics — Entity Type Definitions
 *
 * Entities: Shipment, Order, Carrier.
 */
import type { EntityTypeDef } from '../../../types.js';
import { F } from '../../../countries/us/fields.js';
import { bolMatch, poMatch, invoiceMatch, fm } from '../../../countries/us/matchHelpers.js';
import { DOC_IDS } from './documentTypes.js';

// ─── Entity IDs ─────────────────────────────────────────────────────────────

export const ENTITY_IDS = {
    SHIPMENT: 'entity-shipment',
    ORDER: 'entity-order',
    CARRIER: 'entity-carrier',
} as const;

// ─── Entity Types ───────────────────────────────────────────────────────────

export const entityTypes: EntityTypeDef[] = [
    {
        id: ENTITY_IDS.SHIPMENT,
        name: 'Shipment',
        icon: 'truck',
        color: '#f59e0b',
        displayOrder: 0,
        fieldOrder: ['bolNumber', 'shipperName', 'consigneeName', 'date'],
        dataSources: [
            {
                docTypeId: DOC_IDS.BILL_OF_LADING, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm('bolNumber', 'bolNumber', bolMatch()),
                    fm('shipperName', 'shipperName'),
                    fm('consigneeName', 'consigneeName'),
                    fm('date', 'date'),
                ],
            },
            {
                docTypeId: DOC_IDS.PACKING_LIST, enabled: true, canCreateEntity: false,
                fieldMappings: [
                    fm('packingListNumber', 'packingListNumber'),
                    fm('shipperName', 'shipperName'),
                    fm('consigneeName', 'consigneeName'),
                ],
            },
        ],
        conditionalRequirements: [],
    },
    {
        id: ENTITY_IDS.ORDER,
        name: 'Order',
        icon: 'shopping-cart',
        color: '#3b82f6',
        displayOrder: 1,
        fieldOrder: [F.PO_NUMBER, F.TOTAL_AMOUNT, F.VENDOR_NAME, F.BUYER_NAME],
        dataSources: [
            {
                docTypeId: DOC_IDS.PURCHASE_ORDER, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.PO_NUMBER, F.PO_NUMBER, poMatch()),
                    fm(F.TOTAL_AMOUNT, F.TOTAL_AMOUNT),
                    fm(F.VENDOR_NAME, F.VENDOR_NAME),
                    fm(F.BUYER_NAME, F.BUYER_NAME),
                ],
            },
            {
                docTypeId: DOC_IDS.INVOICE, enabled: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.INVOICE_NUMBER, F.INVOICE_NUMBER, invoiceMatch()),
                    fm(F.TOTAL_AMOUNT, F.TOTAL_AMOUNT),
                    fm(F.VENDOR_NAME, F.VENDOR_NAME),
                    fm(F.BUYER_NAME, F.BUYER_NAME),
                ],
            },
        ],
        conditionalRequirements: [],
    },
    {
        id: ENTITY_IDS.CARRIER,
        name: 'Carrier',
        icon: 'truck',
        color: '#10b981',
        displayOrder: 2,
        fieldOrder: [F.CARRIER_NAME],
        dataSources: [
            {
                docTypeId: DOC_IDS.BILL_OF_LADING, enabled: true, isRequired: true, canCreateEntity: true,
                fieldMappings: [
                    fm(F.CARRIER_NAME, F.CARRIER_NAME, [{ field: F.CARRIER_NAME, fuzzyThreshold: 0.1 }]),
                ],
            },
        ],
        conditionalRequirements: [],
    },
];
