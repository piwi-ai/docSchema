/**
 * Real Estate Italy — complete business configuration.
 *
 * Covers the standard Italian property transaction workflow:
 * identity documents, contracts, escrow/notary documents,
 * cadastral records, energy certificates, and more.
 */
import type { BusinessConfiguration } from '../../../types.js';
import { documentTypes, DOC_IDS } from './documentTypes.js';
import { entityTypes, ENTITY_IDS } from './entityTypes.js';

export { DOC_IDS, ENTITY_IDS };

export const realEstateItConfig: BusinessConfiguration = {
    id: 'REAL-ESTATE-IT-DEFAULT',
    name: 'Agenzia Immobiliare Italia',
    description:
        'Configurazione per gestione documenti agenzia immobiliare — compravendita, locazione, documenti catastali e notarili',
    schemaVersion: 1,
    documentTypes,
    entityTypes,
};
