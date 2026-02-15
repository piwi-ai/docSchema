/**
 * Real Estate Italy — Document Type Definitions
 *
 * Covers documents for an Italian real-estate agency:
 * identity, purchase proposals, preliminary contracts, deeds,
 * cadastral documents, energy certificates, mortgage documents, and more.
 *
 * 29 document types for real-estate transactions.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    // Common
    identita, tesseraSanitaria, contatto, procura, visuraCamerale,
    // Real-estate specific
    attoProvenienza, contrattoPrelim, propostaAcquisto,
    visuraCatastale, planimetria, ape,
    certificatoMorte, dichiarazioneSuccessione, accettazioneEredita,
    certificatoFamiglia, visuraIpotecaria, certificatoAgibilita,
    estrattoMatrimonio, conformitaUrbanistica, conformitaImpianti,
    documentazioneCondominiale, sentenzaSeparazione,
    // Bank loan
    deliberaMutuo, periziaBancaria, contrattoMutuo, mezziPagamento,
    // Optional / situational
    certificatoResidenza, certificatoCDU, permessoSoggiorno,
} from '../../../countries/it/documentTypes/index.js';

// ─── Document Type IDs ──────────────────────────────────────────────────────

export const DOC_IDS = {
    CONTATTO: contatto.id,
    IDENTITA: identita.id,
    PROVENIENZA: attoProvenienza.id,
    PRELIMINARE: contrattoPrelim.id,
    PROPOSTA: propostaAcquisto.id,
    VISURA: visuraCatastale.id,
    PLANIMETRIA: planimetria.id,
    APE: ape.id,
    MORTE: certificatoMorte.id,
    SUCCESSIONE: dichiarazioneSuccessione.id,
    EREDITA: accettazioneEredita.id,
    FAMIGLIA: certificatoFamiglia.id,
    TESSERA_SAN: tesseraSanitaria.id,
    IPOTECARIA: visuraIpotecaria.id,
    AGIBILITA: certificatoAgibilita.id,
    MATRIMONIO: estrattoMatrimonio.id,
    CONFORMITA_URB: conformitaUrbanistica.id,
    CONFORMITA_IMP: conformitaImpianti.id,
    CONDOMINIALE: documentazioneCondominiale.id,
    SEPARAZIONE: sentenzaSeparazione.id,
    // ── Bank loan documents ──
    DELIBERA_MUTUO: deliberaMutuo.id,
    PERIZIA_BANCARIA: periziaBancaria.id,
    CONTRATTO_MUTUO: contrattoMutuo.id,
    MEZZI_PAGAMENTO: mezziPagamento.id,
    // ── Optional / situational documents ──
    RESIDENZA: certificatoResidenza.id,
    CDU: certificatoCDU.id,
    PERMESSO_SOGGIORNO: permessoSoggiorno.id,
    VISURA_CAMERALE: visuraCamerale.id,
    PROCURA: procura.id,
} as const;

// ─── Document Types ─────────────────────────────────────────────────────────

export const documentTypes: DocumentTypeDef[] = [
    // Common
    identita,
    tesseraSanitaria,
    contatto,
    procura,
    visuraCamerale,
    // Real-estate specific
    attoProvenienza,
    contrattoPrelim,
    propostaAcquisto,
    visuraCatastale,
    planimetria,
    ape,
    certificatoMorte,
    dichiarazioneSuccessione,
    accettazioneEredita,
    certificatoFamiglia,
    visuraIpotecaria,
    certificatoAgibilita,
    estrattoMatrimonio,
    conformitaUrbanistica,
    conformitaImpianti,
    documentazioneCondominiale,
    sentenzaSeparazione,
    // Bank loan
    deliberaMutuo,
    periziaBancaria,
    contrattoMutuo,
    mezziPagamento,
    // Optional / situational
    certificatoResidenza,
    certificatoCDU,
    permessoSoggiorno,
].sort((a, b) => a.name.localeCompare(b.name, 'it'));
