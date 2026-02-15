/**
 * @piwi.ai/docschema
 *
 * Open-source business schema configurations for AI-powered document processing.
 * Each vertical defines document types, entity types, and cross-document
 * validation rules for a specific industry and country combination.
 *
 * @example
 * ```typescript
 * import { realEstateItConfig } from '@piwi.ai/docschema';
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
    BusinessConfiguration,
} from './types.js';

// ─── Helpers (per country — re-export schema primitives from each) ──────────
export * as schemaHelpers from './helpers/schema.js';
export * as itHelpers from './helpers/it.js';
export * as usHelpers from './helpers/us.js';

// ─── Vertical Configurations ────────────────────────────────────────────────
export { accountantItConfig } from './verticals/accountant/it/index.js';
export { carDealershipItConfig } from './verticals/car-dealership/it/index.js';
export { insuranceItConfig } from './verticals/insurance/it/index.js';
export { realEstateItConfig, DOC_IDS as realEstateItDocIds, ENTITY_IDS as realEstateItEntityIds } from './verticals/real-estate/it/index.js';
export { realEstateUsConfig } from './verticals/real-estate/us/index.js';

// ─── Convenience: all configs in one array ──────────────────────────────────
import { accountantItConfig } from './verticals/accountant/it/index.js';
import { carDealershipItConfig } from './verticals/car-dealership/it/index.js';
import { insuranceItConfig } from './verticals/insurance/it/index.js';
import { realEstateItConfig } from './verticals/real-estate/it/index.js';
import { realEstateUsConfig } from './verticals/real-estate/us/index.js';
import type { BusinessConfiguration } from './types.js';

/** All available business configurations */
export const allConfigurations: BusinessConfiguration[] = [
    accountantItConfig,
    carDealershipItConfig,
    insuranceItConfig,
    realEstateItConfig,
    realEstateUsConfig,
];

