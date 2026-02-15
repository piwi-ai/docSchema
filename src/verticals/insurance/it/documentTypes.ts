/**
 * Insurance Agency Italy — Document Type Definitions
 *
 * Covers documents for a general insurance agency:
 * policies, claims, expert assessments, medical certificates,
 * repair invoices, authority reports, and more.
 *
 * 15 document types for multi-branch insurance management.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    identita, tesseraSanitaria,
    polizza, attestatoRischio, libretto, denunciaSinistro,
    periziaDanni, certificatoMedico, fatturaRiparazione,
    verbaleAutorita, quietanza, disdetta,
    statoFamiglia, certificatoMorteInsurance, schedaFabbricato,
} from '../../../countries/it/documentTypes/index.js';

// ─── Document IDs ───────────────────────────────────────────────────────────

export const DOC_IDS = {
    IDENTITA: identita.id,
    TESSERA_SANITARIA: tesseraSanitaria.id,
    POLIZZA: polizza.id,
    ATTESTATO_RISCHIO: attestatoRischio.id,
    LIBRETTO: libretto.id,
    DENUNCIA_SINISTRO: denunciaSinistro.id,
    PERIZIA_DANNI: periziaDanni.id,
    CERTIFICATO_MEDICO: certificatoMedico.id,
    FATTURA_RIPARAZIONE: fatturaRiparazione.id,
    VERBALE_AUTORITA: verbaleAutorita.id,
    QUIETANZA: quietanza.id,
    DISDETTA: disdetta.id,
    STATO_FAMIGLIA: statoFamiglia.id,
    CERTIFICATO_MORTE: certificatoMorteInsurance.id,
    SCHEDA_FABBRICATO: schedaFabbricato.id,
} as const;

// ─── Document Types ─────────────────────────────────────────────────────────

export const documentTypes: DocumentTypeDef[] = [
    identita,
    tesseraSanitaria,
    polizza,
    attestatoRischio,
    libretto,
    denunciaSinistro,
    periziaDanni,
    certificatoMedico,
    fatturaRiparazione,
    verbaleAutorita,
    quietanza,
    disdetta,
    statoFamiglia,
    certificatoMorteInsurance,
    schedaFabbricato,
].sort((a, b) => a.name.localeCompare(b.name, 'it'));
