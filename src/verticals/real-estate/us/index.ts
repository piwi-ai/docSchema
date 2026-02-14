/**
 * US Real Estate — complete business configuration.
 *
 * Covers residential real estate transactions in the United States:
 * purchase agreements, deeds, title reports, inspections, appraisals,
 * mortgage applications, closing disclosures, HOA, and tax records.
 */
import type { BusinessConfiguration } from '../../../types';
import { documentTypes, DOC_IDS } from './documentTypes';
import { entityTypes, ENTITY_IDS } from './entityTypes';
import { documentWorkflows } from './documentWorkflows';

export { DOC_IDS, ENTITY_IDS };

export const realEstateUsConfig: BusinessConfiguration = {
    id: 'REAL-ESTATE-US-DEFAULT',
    name: 'US Real Estate',
    description: 'Default configuration for US residential real estate transactions — purchase, title, mortgage, closing, and inspections',
    schemaVersion: 1,
    documentTypes,
    entityTypes,
    documentWorkflows,
};
