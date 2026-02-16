/**
 * Insurance Agency Italy — complete business configuration.
 *
 * Covers multi-branch insurance management: RCA, vita, casa,
 * infortuni, claims processing, medical assessments, and more.
 */
import type { BusinessConfiguration } from '../../../types.js';
import { documentTypes, DOC_IDS } from './documentTypes.js';
import { entityTypes, ENTITY_IDS } from './entityTypes.js';

export { DOC_IDS, ENTITY_IDS };

export const insuranceItConfig: BusinessConfiguration = {
    id: 'INSURANCE-AGENCY-IT-DEFAULT',
    name: 'Agenzia Assicurativa Italia',
    description:
        'Configurazione per gestione documenti agenzia assicurativa — polizze, sinistri, perizie, certificati medici, RCA e multi-ramo',
    schemaVersion: 1,
    documentTypes,
    entityTypes,
};
