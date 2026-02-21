import {
    text,
    num,
    enumField,
    objectSchema,
} from '../../../helpers/schema.js';
import {
    dateUS,
    firstName,
    lastName,
} from '../../../helpers/us.js';
import { DocumentTypeDef } from '../../../types.js';

export const passport: DocumentTypeDef = {
    id: 'doc-passport',
    name: 'US Passport',
    description: 'United States Passport',
    jsonSchema: objectSchema({
        passportNumber: text('Passport Number'),
        surname: lastName('Surname/Family Name'),
        givenNames: firstName('Given Names/First & Middle Names'),
        nationality: enumField('Nationality', ['USA']),
        dateOfBirth: dateUS('Date of Birth'),
        placeOfBirth: text('Place of Birth (City/State or Country)'),
        sex: enumField('Sex', ['M', 'F', 'X']),
        dateOfIssue: dateUS('Date of Issue'),
        dateOfExpiration: dateUS('Date of Expiration'),
        issuingAuthority: text('Authority that issued the passport (e.g., United States Department of State)'),
    }, ['passportNumber', 'surname', 'givenNames', 'dateOfBirth', 'dateOfExpiration']),
};
