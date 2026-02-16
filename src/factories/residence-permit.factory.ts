/**
 * Residence Permit Factory.
 *
 * Generates a standard EU/EEA residence permit DocumentTypeDef from
 * country metadata. Covers temporary, permanent, long-term,
 * student, work, and family permit types.
 * Reuses identity card labels for shared fields.
 */
import type { DocumentTypeDef } from '../types.js';
import type { CountryMeta } from '../country-registry.js';
import { objectSchema, text, enumField } from '../helpers/schema.js';
import {
    DocTypeId, SEX_VALUES, EU_PERMIT_TYPES,
    ResidencePermitField, RESIDENCE_PERMIT_REQUIRED_FIELDS,
} from '../constants.js';

/**
 * Create a standard residence permit document type for a given country.
 *
 * Permit types: Temporary, Permanent, Long-term, Student, Work, Family.
 */
export function createResidencePermit(meta: CountryMeta): DocumentTypeDef {
    const labels = meta.identityCardLabels;

    const dateField = (desc: string) => ({
        type: 'string' as const,
        description: desc,
        pattern: meta.datePattern,
    });

    return {
        id: DocTypeId.RESIDENCE_PERMIT,
        name: 'Residence Permit',
        description: `Residence Permit — ${meta.name}`,
        references: meta.documentReferences.residencePermit,
        jsonSchema: objectSchema({
            [ResidencePermitField.FIRST_NAME]: { type: 'string', description: labels.firstName },
            [ResidencePermitField.LAST_NAME]: { type: 'string', description: labels.lastName },
            [ResidencePermitField.PERMIT_NUMBER]: text('Permit number'),
            [ResidencePermitField.PERMIT_TYPE]: enumField('Permit type', EU_PERMIT_TYPES),
            [ResidencePermitField.NATIONALITY]: text(labels.nationality),
            [ResidencePermitField.DATE_OF_BIRTH]: dateField(labels.dateOfBirth),
            [ResidencePermitField.PLACE_OF_BIRTH]: text(labels.placeOfBirth),
            [ResidencePermitField.SEX]: enumField(labels.sex, SEX_VALUES),
            [ResidencePermitField.ISSUE_DATE]: dateField(labels.issueDate),
            [ResidencePermitField.EXPIRATION_DATE]: dateField(labels.expirationDate),
            [ResidencePermitField.ISSUING_AUTHORITY]: text(labels.issuingAuthority),
            [ResidencePermitField.ADDRESS]: text(labels.address),
            [ResidencePermitField.REMARKS]: text('Remarks / Annotations'),
            [ResidencePermitField.MRZ]: text(labels.mrz),
        }, [...RESIDENCE_PERMIT_REQUIRED_FIELDS]),
    };
}
