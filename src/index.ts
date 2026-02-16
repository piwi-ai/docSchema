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

// ─── Constants & Enums ──────────────────────────────────────────────────────
export {
    DateFormat,
    DATE_PATTERNS,
    Sex,
    SEX_VALUES,
    DocTypeId,
    IdentityField,
    IDENTITY_REQUIRED_FIELDS,
    PassportField,
    PASSPORT_REQUIRED_FIELDS,
    DriversLicenseField,
    DRIVERS_LICENSE_REQUIRED_FIELDS,
    EU_LICENSE_CATEGORIES,
    ResidencePermitField,
    RESIDENCE_PERMIT_REQUIRED_FIELDS,
    EU_PERMIT_TYPES,
} from './constants.js';

// ─── Country Registry & Factories ───────────────────────────────────────────
export { EU_COUNTRIES, ALL_COUNTRY_CODES, getCountry } from './country-registry.js';
export type { CountryMeta, IdentityCardLabels } from './country-registry.js';
export { createIdentityCard } from './factories/identity-card.factory.js';
export { createPassport } from './factories/passport.factory.js';
export { createDriversLicense } from './factories/drivers-license.factory.js';
export { createResidencePermit } from './factories/residence-permit.factory.js';
export { createCountryHelpers } from './factories/country-helpers.factory.js';

// ─── Helpers (per country — re-export schema primitives from each) ──────────
export * as schemaHelpers from './helpers/schema.js';
export * as itHelpers from './countries/it/helpers.js';
export * as usHelpers from './countries/us/helpers.js';
export * as atHelpers from './countries/at/helpers.js';
export * as beHelpers from './countries/be/helpers.js';
export * as bgHelpers from './countries/bg/helpers.js';
export * as chHelpers from './countries/ch/helpers.js';
export * as cyHelpers from './countries/cy/helpers.js';
export * as czHelpers from './countries/cz/helpers.js';
export * as deHelpers from './countries/de/helpers.js';
export * as dkHelpers from './countries/dk/helpers.js';
export * as eeHelpers from './countries/ee/helpers.js';
export * as esHelpers from './countries/es/helpers.js';
export * as fiHelpers from './countries/fi/helpers.js';
export * as frHelpers from './countries/fr/helpers.js';
export * as gbHelpers from './countries/gb/helpers.js';
export * as grHelpers from './countries/gr/helpers.js';
export * as hrHelpers from './countries/hr/helpers.js';
export * as huHelpers from './countries/hu/helpers.js';
export * as ieHelpers from './countries/ie/helpers.js';
export * as isHelpers from './countries/is/helpers.js';
export * as liHelpers from './countries/li/helpers.js';
export * as ltHelpers from './countries/lt/helpers.js';
export * as luHelpers from './countries/lu/helpers.js';
export * as lvHelpers from './countries/lv/helpers.js';
export * as mtHelpers from './countries/mt/helpers.js';
export * as nlHelpers from './countries/nl/helpers.js';
export * as noHelpers from './countries/no/helpers.js';
export * as plHelpers from './countries/pl/helpers.js';
export * as ptHelpers from './countries/pt/helpers.js';
export * as roHelpers from './countries/ro/helpers.js';
export * as seHelpers from './countries/se/helpers.js';
export * as siHelpers from './countries/si/helpers.js';
export * as skHelpers from './countries/sk/helpers.js';

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
export * as itDocs from './countries/it/documentTypes/index.js';
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
export {
    realEstateItConfig,
    DOC_IDS as realEstateItDocIds,
    ENTITY_IDS as realEstateItEntityIds,
} from './verticals/real-estate/it/index.js';
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
