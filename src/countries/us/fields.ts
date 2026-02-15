/**
 * US — Shared Field Name Constants
 *
 * Every field name used in entity-type mappings (fieldMappings, matchFields,
 * fieldOrder) should be referenced via this object instead of raw strings.
 */

export const F = {
    // ── Person / Identity ───────────────────────────────────────────────────
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    FULL_NAME: 'fullName',
    DATE_OF_BIRTH: 'dateOfBirth',
    ADDRESS: 'address',
    ID_TYPE: 'idType',
    ID_NUMBER: 'idNumber',
    ID_EXPIRATION_DATE: 'idExpirationDate',
    PHONE: 'phone',
    EMAIL: 'email',
    EMPLOYER: 'employer',
    JOB_TITLE: 'jobTitle',
    MONTHLY_INCOME: 'monthlyIncome',
    VESTING_TYPE: 'vestingType',

    // ── Property ────────────────────────────────────────────────────────────
    PROPERTY_ADDRESS: 'propertyAddress',
    PARCEL_NUMBER: 'parcelNumber',
    LEGAL_DESCRIPTION: 'legalDescription',
    APPRAISED_VALUE: 'appraisedValue',
    ASSESSED_VALUE: 'assessedValue',
    SQUARE_FOOTAGE: 'squareFootage',
    LOT_SIZE: 'lotSize',
    YEAR_BUILT: 'yearBuilt',
    BEDROOMS: 'bedrooms',
    BATHROOMS: 'bathrooms',
    CONDITION: 'condition',
    INSPECTION_CONDITION: 'inspectionCondition',
    MAJOR_DEFECTS: 'majorDefects',
    LIENS: 'liens',
    EASEMENTS: 'easements',
    SURVEY_EASEMENTS: 'surveyEasements',
    ENCROACHMENTS: 'encroachments',
    ANNUAL_TAX: 'annualTax',
    HOA_NAME: 'hoaName',
    HOA_MONTHLY_DUES: 'hoaMonthlyDues',

    // ── Transaction / Financial ─────────────────────────────────────────────
    PURCHASE_PRICE: 'purchasePrice',
    SALE_PRICE: 'salePrice',
    CLOSING_DATE: 'closingDate',
    EARNEST_MONEY: 'earnestMoney',
    FINANCING_TYPE: 'financingType',
    SELLER_CONCESSIONS: 'sellerConcessions',
    LOAN_AMOUNT: 'loanAmount',
    APPROVED_AMOUNT: 'approvedAmount',
    INTEREST_RATE: 'interestRate',
    LOAN_TYPE: 'loanType',
    LOAN_TERM: 'loanTerm',
    MONTHLY_PAYMENT: 'monthlyPayment',
    CASH_TO_CLOSE: 'cashToClose',
    TOTAL_CLOSING_COSTS: 'totalClosingCosts',
    SELLER_PROCEEDS: 'sellerProceeds',
    CLOSING_COSTS: 'closingCosts',
    NET_PROCEEDS: 'netProceeds',
} as const;
