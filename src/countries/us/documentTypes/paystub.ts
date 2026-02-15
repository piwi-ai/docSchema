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
} from '../../../helpers/us.js';
import { DocumentTypeDef } from '../../../types.js';

export const paystub: DocumentTypeDef = {
    id: 'doc-paystub',
    name: 'Paystub',
    description: 'Statement of earnings and deductions',
    jsonSchema: objectSchema({
        employerName: text('Name of the employer'),
        employerAddress: address('Employer address'),
        employeeName: text('Name of the employee'),
        employeeAddress: address('Employee address'),
        employeeId: text('Employee ID'),
        ssn: ssn(),
        payPeriodStart: dateUS('Start date of the pay period'),
        payPeriodEnd: dateUS('End date of the pay period'),
        payDate: dateUS('Payment date'),
        grossPay: currency('Total gross pay (before deductions)'),
        netPay: currency('Total net pay (take-home)'),
        hoursWorked: num('Total hours worked'),
        ytdGrossPay: currency('Year-to-date gross pay'),
        deductions: arrayOfObjects({
            description: text('Deduction description (e.g., Federal Tax, Medicare)'),
            currentAmount: currency('Amount deducted this period'),
            ytdAmount: currency('Year-to-date deduction'),
        }, ['description', 'currentAmount'], 'List of deductions'),
    }, ['employerName', 'payDate', 'grossPay', 'netPay']),
};
