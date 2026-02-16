/**
 * Identity Card Factory.
 *
 * Generates a standard EU/EEA identity-card DocumentTypeDef from
 * country metadata, including all standard fields:
 * - firstName, lastName, personalId, documentType, documentNumber
 * - issueDate, expirationDate, issuingAuthority
 * - placeOfBirth, dateOfBirth, address
 * - nationality, sex, mrz (new standard fields)
 */
import type { DocumentTypeDef } from '../types.js';
import type { CountryMeta } from '../country-registry.js';
import { objectSchema, text, enumField } from '../helpers/schema.js';
import { DocTypeId, SEX_VALUES, IdentityField, IDENTITY_REQUIRED_FIELDS } from '../constants.js';

/**
 * Create a standard identity card document type for a given country.
 *
 * All countries share the same field structure; only the descriptions
 * (labels) and the date format differ.
 */
export function createIdentityCard(meta: CountryMeta): DocumentTypeDef {
    const labels = meta.identityCardLabels;

    const dateField = (desc: string) => ({
        type: 'string' as const,
        description: desc,
        pattern: meta.datePattern,
    });

    const personalIdField: Record<string, unknown> = {
        type: 'string',
        description: labels.personalId,
    };
    if (meta.personalIdPattern) personalIdField.pattern = meta.personalIdPattern;

    return {
        id: DocTypeId.IDENTITY_CARD,
        name: 'Identity Document',
        description: 'Identity document (ID Card, Passport, Driver License)',
        references: meta.documentReferences.identityCard,
        jsonSchema: objectSchema(
            {
                [IdentityField.FIRST_NAME]: { type: 'string', description: labels.firstName },
                [IdentityField.LAST_NAME]: { type: 'string', description: labels.lastName },
                [IdentityField.PERSONAL_ID]: personalIdField,
                [IdentityField.DOCUMENT_TYPE]: text(labels.documentType),
                [IdentityField.DOCUMENT_NUMBER]: text(labels.documentNumber),
                [IdentityField.ISSUE_DATE]: dateField(labels.issueDate),
                [IdentityField.EXPIRATION_DATE]: dateField(labels.expirationDate),
                [IdentityField.ISSUING_AUTHORITY]: text(labels.issuingAuthority),
                [IdentityField.PLACE_OF_BIRTH]: text(labels.placeOfBirth),
                [IdentityField.DATE_OF_BIRTH]: dateField(labels.dateOfBirth),
                [IdentityField.ADDRESS]: text(labels.address),
                [IdentityField.NATIONALITY]: text(labels.nationality),
                [IdentityField.SEX]: enumField(labels.sex, SEX_VALUES),
                [IdentityField.MRZ]: text(labels.mrz),
            },
            [...IDENTITY_REQUIRED_FIELDS],
        ),
    };
}
