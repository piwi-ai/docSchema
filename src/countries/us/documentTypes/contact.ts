/**
 * Contact Information — Phone, email, and mailing address.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, objectSchema,
    firstName, lastName, address,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const contact: DocumentTypeDef = {
    id: 'doc-contact',
    name: 'Contact Information',
    description: 'Phone, email, and mailing address for a party',
    references: [
        {
            title: 'FTC — Privacy and Data Security',
            url: 'https://www.ftc.gov/business-guidance/privacy-security',
            type: ReferenceType.DOCUMENTATION,
        },
    ],
    jsonSchema: objectSchema({
        firstName: firstName(), lastName: lastName(),
        phone: text('Primary phone number'),
        email: { type: 'string', format: 'email', description: 'Email address' },
        mailingAddress: address('Mailing address (if different from residential)'),
        currentAddress: address('Current residential address'),
    }, ['firstName', 'lastName', 'phone', 'email']),
};
