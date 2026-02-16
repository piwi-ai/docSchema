/**
 * Driver's License Factory.
 *
 * Generates a standard EU/EEA driver's license DocumentTypeDef from
 * country metadata. Uses EU Directive 2006/126/EC license categories.
 * Reuses identity card labels for shared fields.
 */
import type { DocumentTypeDef } from '../types.js';
import type { CountryMeta } from '../country-registry.js';
import { objectSchema, text, enumField } from '../helpers/schema.js';
import {
    DocTypeId,
    SEX_VALUES,
    EU_LICENSE_CATEGORIES,
    DriversLicenseField,
    DRIVERS_LICENSE_REQUIRED_FIELDS,
} from '../constants.js';

/**
 * Create a standard driver's license document type for a given country.
 *
 * License categories follow EU Directive 2006/126/EC:
 * AM, A1, A2, A, B1, B, BE, C1, C1E, C, CE, D1, D1E, D, DE
 */
export function createDriversLicense(meta: CountryMeta): DocumentTypeDef {
    const labels = meta.identityCardLabels;

    const dateField = (desc: string) => ({
        type: 'string' as const,
        description: desc,
        pattern: meta.datePattern,
    });

    return {
        id: DocTypeId.DRIVERS_LICENSE,
        name: "Driver's License",
        description: `Driver's License — ${meta.name}`,
        references: meta.documentReferences.driversLicense,
        jsonSchema: objectSchema(
            {
                [DriversLicenseField.FIRST_NAME]: { type: 'string', description: labels.firstName },
                [DriversLicenseField.LAST_NAME]: { type: 'string', description: labels.lastName },
                [DriversLicenseField.LICENSE_NUMBER]: text('License number'),
                [DriversLicenseField.CATEGORIES]: enumField(
                    'License categories (EU Directive 2006/126/EC)',
                    EU_LICENSE_CATEGORIES,
                ),
                [DriversLicenseField.DATE_OF_BIRTH]: dateField(labels.dateOfBirth),
                [DriversLicenseField.PLACE_OF_BIRTH]: text(labels.placeOfBirth),
                [DriversLicenseField.ISSUE_DATE]: dateField(labels.issueDate),
                [DriversLicenseField.EXPIRATION_DATE]: dateField(labels.expirationDate),
                [DriversLicenseField.ISSUING_AUTHORITY]: text(labels.issuingAuthority),
                [DriversLicenseField.ADDRESS]: text(labels.address),
                [DriversLicenseField.NATIONALITY]: text(labels.nationality),
                [DriversLicenseField.SEX]: enumField(labels.sex, SEX_VALUES),
            },
            [...DRIVERS_LICENSE_REQUIRED_FIELDS],
        ),
    };
}
