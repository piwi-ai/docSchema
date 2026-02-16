/**
 * Malta specific field helpers.
 *
 * Auto-generated from the country registry. Do not edit manually.
 */
import { EU_COUNTRIES } from '../../country-registry.js';
import { createCountryHelpers } from '../../factories/country-helpers.factory.js';

const helpers = createCountryHelpers(EU_COUNTRIES['mt']);

export const { text, num, enumField, email, datePattern, objectSchema, arrayOfObjects, ref } =
    helpers;
export const { date, firstName, lastName, personalId, vat } = helpers;
