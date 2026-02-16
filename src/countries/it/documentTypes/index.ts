/**
 * Italy — Document Type Definitions (barrel export)
 *
 * Every doc type lives in its own file. Import from this barrel
 * to get named exports you can compose into vertical-specific arrays.
 */

// ── Standard EU Document Types (factory-generated) ──────────────────────────
export { identityCard } from './identity-card.js';
export { passport } from './passport.js';
export { driversLicense } from './drivers-license.js';
export { residencePermit } from './residence-permit.js';

// ── Common (shared across verticals) ────────────────────────────────────────
export { identita } from './identita.js';
export { tesseraSanitaria } from './tessera-sanitaria.js';
export { contatto } from './contatto.js';
export { procura } from './procura.js';
export { visuraCamerale } from './visura-camerale.js';

// ── Accounting ──────────────────────────────────────────────────────────────
export { fattura } from './fattura.js';
export { ricevuta } from './ricevuta.js';
export { certificazioneUnica } from './certificazione-unica.js';
export { mod730 } from './mod-730.js';
export { redditiPf } from './redditi-pf.js';
export { f24 } from './f24.js';
export { bilancio } from './bilancio.js';
export { contrattoLavoro } from './contratto-lavoro.js';
export { bustaPaga } from './busta-paga.js';
export { estrattoConto } from './estratto-conto.js';
export { isee } from './isee.js';
export { ivaPeriodica } from './iva-periodica.js';

// ── Real Estate ─────────────────────────────────────────────────────────────
export { attoProvenienza, CATEGORIA_CATASTALE_VALUES } from './atto-provenienza.js';
export { contrattoPrelim } from './contratto-preliminare.js';
export { propostaAcquisto } from './proposta-acquisto.js';
export { visuraCatastale } from './visura-catastale.js';
export { planimetria } from './planimetria.js';
export { ape, DESTINAZIONE_USO_DESC } from './ape.js';
export { certificatoMorte } from './certificato-morte.js';
export { dichiarazioneSuccessione } from './dichiarazione-successione.js';
export { accettazioneEredita } from './accettazione-eredita.js';
export { certificatoFamiglia } from './certificato-famiglia.js';
export { visuraIpotecaria } from './visura-ipotecaria.js';
export { certificatoAgibilita } from './certificato-agibilita.js';
export { estrattoMatrimonio } from './estratto-matrimonio.js';
export { conformitaUrbanistica } from './conformita-urbanistica.js';
export { conformitaImpianti } from './conformita-impianti.js';
export { documentazioneCondominiale } from './documentazione-condominiale.js';
export { sentenzaSeparazione } from './sentenza-separazione.js';
export { deliberaMutuo } from './delibera-mutuo.js';
export { periziaBancaria } from './perizia-bancaria.js';
export { contrattoMutuo } from './contratto-mutuo.js';
export { mezziPagamento } from './mezzi-pagamento.js';
export { certificatoResidenza } from './certificato-residenza.js';
export { certificatoCDU } from './certificato-cdu.js';
export { permessoSoggiorno } from './permesso-soggiorno.js';

// ── Insurance ───────────────────────────────────────────────────────────────
export { polizza } from './polizza.js';
export { attestatoRischio } from './attestato-rischio.js';
export { libretto } from './libretto.js';
export { denunciaSinistro } from './denuncia-sinistro.js';
export { periziaDanni } from './perizia-danni.js';
export { certificatoMedico } from './certificato-medico.js';
export { fatturaRiparazione } from './fattura-riparazione.js';
export { verbaleAutorita } from './verbale-autorita.js';
export { quietanza } from './quietanza.js';
export { disdetta } from './disdetta.js';
export { statoFamiglia } from './stato-famiglia.js';
export { certificatoMorteInsurance } from './certificato-morte-insurance.js';
export { schedaFabbricato } from './scheda-fabbricato.js';

// ── Car Dealership ──────────────────────────────────────────────────────────
export { librettoCircolazione } from './libretto-circolazione.js';
export { certificatoProprieta } from './certificato-proprieta.js';
export { visuraPra } from './visura-pra.js';
export { attoVendita } from './atto-vendita.js';
export { bollo } from './bollo.js';
export { assicurazioneRca } from './assicurazione-rca.js';
export { revisione } from './revisione.js';
export { finanziamento } from './finanziamento.js';
export { permuta } from './permuta.js';
export { garanzia } from './garanzia.js';
export { schedaTecnica } from './scheda-tecnica.js';
