/**
 * @piwi-ai/business-schema-configurations
 *
 * Open-source business schema configurations for AI-powered document processing.
 * Each vertical defines document types, entity types, and workflows for a specific
 * industry and country combination.
 *
 * @example
 * ```typescript
 * import { realEstateItConfig } from '@piwi-ai/business-schema-configurations';
 * console.log(realEstateItConfig.documentTypes);
 * ```
 */

// ─── Types ──────────────────────────────────────────────────────────────────
export type {
    DocumentTypeDef,
    EntityTypeDef,
    EntityDataSource,
    EntityFieldMapping,
    MatchFieldConfig,
    ConditionalRequirement,
    DocumentCondition,
    WorkflowDef,
    WorkflowNode,
    WorkflowEdge,
    WorkflowNodeData,
    BusinessConfiguration,
} from './types';
export { JobStatus } from './types';

// ─── Helpers (per country — re-export schema primitives from each) ──────────
export * as schemaHelpers from './helpers/schema';
export * as itHelpers from './helpers/it';
export * as usHelpers from './helpers/us';

// ─── Shared Workflows ───────────────────────────────────────────────────────
export { italianWorkflows } from './workflows/italian-standard';
export { usWorkflows } from './workflows/us-standard';

// ─── Vertical Configurations ────────────────────────────────────────────────
export { accountantItConfig } from './verticals/accountant/it';
export { carDealershipItConfig } from './verticals/car-dealership/it';
export { insuranceItConfig } from './verticals/insurance/it';
export { realEstateItConfig } from './verticals/real-estate/it';
export { realEstateUsConfig } from './verticals/real-estate/us';

// ─── Convenience: all configs in one array ──────────────────────────────────
import { accountantItConfig } from './verticals/accountant/it';
import { carDealershipItConfig } from './verticals/car-dealership/it';
import { insuranceItConfig } from './verticals/insurance/it';
import { realEstateItConfig } from './verticals/real-estate/it';
import { realEstateUsConfig } from './verticals/real-estate/us';
import type { BusinessConfiguration } from './types';

/** All available business configurations */
export const allConfigurations: BusinessConfiguration[] = [
    accountantItConfig,
    carDealershipItConfig,
    insuranceItConfig,
    realEstateItConfig,
    realEstateUsConfig,
];
