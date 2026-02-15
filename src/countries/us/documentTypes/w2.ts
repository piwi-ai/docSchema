import {
    text,
    num,
    enumField,
    objectSchema,
    arrayOfObjects,
} from '../../../helpers/schema.js';
import {
    dateUS,
    currency,
    address,
    firstName,
    lastName,
    ssn,
    ein,
} from '../../../helpers/us.js';
import { DocumentTypeDef } from '../../../types.js';

export const w2: DocumentTypeDef = {
    id: 'doc-w2',
    name: 'W-2 Form',
    description: 'Wage and Tax Statement',
    jsonSchema: objectSchema({
        taxYear: num('Tax year (e.g. 2023)'),
        employerId: ein('Employer Identification Number (EIN)'),
        employerName: text('Employer name'),
        employerAddress: address('Employer address'),
        controlNumber: text('Control number'),
        employeeSSN: ssn(),
        employeeName: text('Employee full name'),
        employeeAddress: address('Employee address'),
        wages: currency('Wages, tips, other compensation (Box 1)'),
        federalIncomeTax: currency('Federal income tax withheld (Box 2)'),
        socialSecurityWages: currency('Social security wages (Box 3)'),
        socialSecurityTax: currency('Social security tax withheld (Box 4)'),
        medicareWages: currency('Medicare wages and tips (Box 5)'),
        medicareTax: currency('Medicare tax withheld (Box 6)'),
        socialSecurityTips: currency('Social security tips (Box 7)'),
        allocatedTips: currency('Allocated tips (Box 8)'),
        state: text('State abbreviation (Box 15)'),
        stateEmployerId: text('Employer state ID number (Box 15)'),
        stateWages: currency('State wages (Box 16)'),
        stateTax: currency('State income tax (Box 17)'),
    }, ['taxYear', 'employerName', 'wages', 'federalIncomeTax']),
};
