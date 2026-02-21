import type { BusinessConfiguration } from '../../../types.js';
import { documentTypes, DOC_IDS } from './documentTypes.js';
import { entityTypes, ENTITY_IDS } from './entityTypes.js';

export { DOC_IDS, ENTITY_IDS };

export const logisticsUsConfig: BusinessConfiguration = {
    id: 'LOGISTICS-US-DEFAULT',
    name: 'US Logistics',
    description: 'Document processing for US logistics and supply chain',
    schemaVersion: 1,
    documentTypes,
    entityTypes,
};
