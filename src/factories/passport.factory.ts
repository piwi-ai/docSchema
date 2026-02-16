/**
 * Passport Factory.
 *
 * Generates a standard EU/EEA passport DocumentTypeDef from country
 * metadata. Reuses identity card labels for shared fields (name, DOB,
 * nationality, sex, MRZ) and adds passport-specific fields.
 */
import type { DocumentTypeDef } from '../types.js';
import type { CountryMeta } from '../country-registry.js';
import { objectSchema, text, enumField } from '../helpers/schema.js';
import { DocTypeId, SEX_VALUES, PassportField, PASSPORT_REQUIRED_FIELDS } from '../constants.js';

/**
 * Create a standard passport document type for a given country.
 *
 * Derives labels from the identity card labels (shared fields) plus
 * passport-specific field descriptions.
 */
export function createPassport(meta: CountryMeta): DocumentTypeDef {
    const labels = meta.identityCardLabels;

    const dateField = (desc: string) => ({
        type: 'string' as const,
        description: desc,
        pattern: meta.datePattern,
    });

    return {
        id: DocTypeId.PASSPORT,
        name: 'Passport',
        description: `Passport — ${meta.name}`,
        references: meta.documentReferences.passport,
        jsonSchema: objectSchema(
            {
                [PassportField.FIRST_NAME]: { type: 'string', description: labels.firstName },
                [PassportField.LAST_NAME]: { type: 'string', description: labels.lastName },
                [PassportField.PASSPORT_NUMBER]: text('Passport number'),
                [PassportField.NATIONALITY]: text(labels.nationality),
                [PassportField.DATE_OF_BIRTH]: dateField(labels.dateOfBirth),
                [PassportField.PLACE_OF_BIRTH]: text(labels.placeOfBirth),
                [PassportField.SEX]: enumField(labels.sex, SEX_VALUES),
                [PassportField.ISSUE_DATE]: dateField(labels.issueDate),
                [PassportField.EXPIRATION_DATE]: dateField(labels.expirationDate),
                [PassportField.ISSUING_AUTHORITY]: text(labels.issuingAuthority),
                [PassportField.ISSUING_COUNTRY]: text('Issuing country / Code'),
                [PassportField.MRZ]: text(labels.mrz),
            },
            [...PASSPORT_REQUIRED_FIELDS],
        ),
    };
}
