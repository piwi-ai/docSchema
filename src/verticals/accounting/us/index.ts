import type { BusinessConfiguration } from '../../../types.js';
import { documentTypes, DOC_IDS } from './documentTypes.js';
import { entityTypes, ENTITY_IDS } from './entityTypes.js';

export { DOC_IDS, ENTITY_IDS };

export const accountingUsConfig: BusinessConfiguration = {
    id: 'ACCOUNTING-US-DEFAULT',
    name: 'US Accounting',
    description: 'Document processing for US accounting and bookkeeping',
    schemaVersion: 1,
    documentTypes,
    entityTypes,
};
