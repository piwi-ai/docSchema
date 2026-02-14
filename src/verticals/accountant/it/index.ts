/**
 * Accountant / Tax Firm Italy — complete business configuration.
 *
 * Covers Italian accounting and tax management: invoices, tax declarations
 * (730, Redditi PF, CU), F24 payments, payroll, balance sheets, bank
 * statements, ISEE, and periodic VAT filings.
 */
import type { BusinessConfiguration } from '../../../types';
import { documentTypes, DOC_IDS } from './documentTypes';
import { entityTypes, ENTITY_IDS } from './entityTypes';
import { documentWorkflows } from './documentWorkflows';

export { DOC_IDS, ENTITY_IDS };

export const accountantItConfig: BusinessConfiguration = {
    id: 'ACCOUNTANT-IT-DEFAULT',
    name: 'Commercialista / Studio Tributarista Italia',
    description: 'Configurazione per gestione documenti studio commercialista — fatture, dichiarazioni, F24, bilanci, CU, buste paga',
    schemaVersion: 1,
    documentTypes,
    entityTypes,
    documentWorkflows,
};
