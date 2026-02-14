/**
 * Car Dealership Italy — complete business configuration.
 *
 * Covers vehicle sales, ownership transfer (passaggio di proprietà),
 * financing, trade-ins (permute), and required regulatory documents.
 */
import type { BusinessConfiguration } from '../../../types';
import { documentTypes, DOC_IDS } from './documentTypes';
import { entityTypes, ENTITY_IDS } from './entityTypes';
import { documentWorkflows } from './documentWorkflows';

export { DOC_IDS, ENTITY_IDS };

export const carDealershipItConfig: BusinessConfiguration = {
    id: 'CAR-DEALERSHIP-IT-DEFAULT',
    name: 'Concessionario Auto Italia',
    description: 'Configurazione per gestione documenti concessionario auto / autosalone — passaggi di proprietà, finanziamenti, permute',
    schemaVersion: 1,
    documentTypes,
    entityTypes,
    documentWorkflows,
};
