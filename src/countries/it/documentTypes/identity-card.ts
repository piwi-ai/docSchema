/**
 * Identity Card (Italy) — Standard EU format.
 *
 * Auto-generated from the country registry. Do not edit manually.
 * Note: Italy also has the domain-specific `identita.ts` (Italian fields).
 */
import { EU_COUNTRIES } from '../../../country-registry.js';
import { createIdentityCard } from '../../../factories/identity-card.factory.js';

export const identityCard = createIdentityCard(EU_COUNTRIES['it']);
