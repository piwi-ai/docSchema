/**
 * Car Dealership Italy — Document Type Definitions
 *
 * Covers the standard Italian car dealership document workflow:
 * identity, vehicle registration, certificates, sales contracts, financing.
 *
 * 16 document types for auto sales and ownership transfer.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    identita, tesseraSanitaria, contatto, procura, visuraCamerale,
    librettoCircolazione, certificatoProprieta, visuraPra,
    attoVendita, bollo, assicurazioneRca, revisione,
    finanziamento, permuta, garanzia, schedaTecnica,
} from '../../../countries/it/documentTypes/index.js';

// ─── Document IDs ───────────────────────────────────────────────────────────

export const DOC_IDS = {
    IDENTITA: identita.id,
    TESSERA_SANITARIA: tesseraSanitaria.id,
    CONTATTO: contatto.id,
    LIBRETTO: librettoCircolazione.id,
    CDP: certificatoProprieta.id,
    VISURA_PRA: visuraPra.id,
    ATTO_VENDITA: attoVendita.id,
    BOLLO: bollo.id,
    ASSICURAZIONE: assicurazioneRca.id,
    REVISIONE: revisione.id,
    FINANZIAMENTO: finanziamento.id,
    PERMUTA: permuta.id,
    PROCURA: procura.id,
    VISURA_CAMERALE: visuraCamerale.id,
    GARANZIA: garanzia.id,
    SCHEDA_TECNICA: schedaTecnica.id,
} as const;

// ─── Document Types ─────────────────────────────────────────────────────────

export const documentTypes: DocumentTypeDef[] = [
    identita,
    tesseraSanitaria,
    contatto,
    librettoCircolazione,
    certificatoProprieta,
    visuraPra,
    attoVendita,
    bollo,
    assicurazioneRca,
    revisione,
    finanziamento,
    permuta,
    procura,
    visuraCamerale,
    garanzia,
    schedaTecnica,
].sort((a, b) => a.name.localeCompare(b.name, 'it'));
