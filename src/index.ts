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
export * as atHelpers from './helpers/at.js';
export * as beHelpers from './helpers/be.js';
export * as bgHelpers from './helpers/bg.js';
export * as chHelpers from './helpers/ch.js';
export * as cyHelpers from './helpers/cy.js';
export * as czHelpers from './helpers/cz.js';
export * as deHelpers from './helpers/de.js';
export * as dkHelpers from './helpers/dk.js';
export * as eeHelpers from './helpers/ee.js';
export * as esHelpers from './helpers/es.js';
export * as fiHelpers from './helpers/fi.js';
export * as frHelpers from './helpers/fr.js';
export * as gbHelpers from './helpers/gb.js';
export * as grHelpers from './helpers/gr.js';
export * as hrHelpers from './helpers/hr.js';
export * as huHelpers from './helpers/hu.js';
export * as ieHelpers from './helpers/ie.js';
export * as isHelpers from './helpers/is.js';
export * as liHelpers from './helpers/li.js';
export * as ltHelpers from './helpers/lt.js';
export * as luHelpers from './helpers/lu.js';
export * as lvHelpers from './helpers/lv.js';
export * as mtHelpers from './helpers/mt.js';
export * as nlHelpers from './helpers/nl.js';
export * as noHelpers from './helpers/no.js';
export * as plHelpers from './helpers/pl.js';
export * as ptHelpers from './helpers/pt.js';
export * as roHelpers from './helpers/ro.js';
export * as seHelpers from './helpers/se.js';
export * as siHelpers from './helpers/si.js';
export * as skHelpers from './helpers/sk.js';

// ─── Country Document Definitions ──────────────────────────────────────────
export * as atDocs from './countries/at/documentTypes/index.js';
export * as beDocs from './countries/be/documentTypes/index.js';
export * as bgDocs from './countries/bg/documentTypes/index.js';
export * as chDocs from './countries/ch/documentTypes/index.js';
export * as cyDocs from './countries/cy/documentTypes/index.js';
export * as czDocs from './countries/cz/documentTypes/index.js';
export * as deDocs from './countries/de/documentTypes/index.js';
export * as dkDocs from './countries/dk/documentTypes/index.js';
export * as eeDocs from './countries/ee/documentTypes/index.js';
export * as esDocs from './countries/es/documentTypes/index.js';
export * as fiDocs from './countries/fi/documentTypes/index.js';
export * as frDocs from './countries/fr/documentTypes/index.js';
export * as gbDocs from './countries/gb/documentTypes/index.js';
export * as grDocs from './countries/gr/documentTypes/index.js';
export * as hrDocs from './countries/hr/documentTypes/index.js';
export * as huDocs from './countries/hu/documentTypes/index.js';
export * as ieDocs from './countries/ie/documentTypes/index.js';
export * as isDocs from './countries/is/documentTypes/index.js';
export * as liDocs from './countries/li/documentTypes/index.js';
export * as ltDocs from './countries/lt/documentTypes/index.js';
export * as luDocs from './countries/lu/documentTypes/index.js';
export * as lvDocs from './countries/lv/documentTypes/index.js';
export * as mtDocs from './countries/mt/documentTypes/index.js';
export * as nlDocs from './countries/nl/documentTypes/index.js';
export * as noDocs from './countries/no/documentTypes/index.js';
export * as plDocs from './countries/pl/documentTypes/index.js';
export * as ptDocs from './countries/pt/documentTypes/index.js';
export * as roDocs from './countries/ro/documentTypes/index.js';
export * as seDocs from './countries/se/documentTypes/index.js';
export * as siDocs from './countries/si/documentTypes/index.js';
export * as skDocs from './countries/sk/documentTypes/index.js';

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

