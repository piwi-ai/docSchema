/**
 * Insurance Agency Italy — complete business configuration.
 *
 * Covers multi-branch insurance management: RCA, vita, casa,
 * infortuni, claims processing, medical assessments, and more.
 */
import type { BusinessConfiguration } from '../../../types';
import { documentTypes, DOC_IDS } from './documentTypes';
import { entityTypes, ENTITY_IDS } from './entityTypes';
import { documentWorkflows } from './documentWorkflows';

export { DOC_IDS, ENTITY_IDS };

export const insuranceItConfig: BusinessConfiguration = {
    id: 'INSURANCE-AGENCY-IT-DEFAULT',
    name: 'Agenzia Assicurativa Italia',
    description: 'Configurazione per gestione documenti agenzia assicurativa — polizze, sinistri, perizie, certificati medici, RCA e multi-ramo',
    schemaVersion: 1,
    documentTypes,
    entityTypes,
    documentWorkflows,
};
