import {
    objectSchema, arrayOfObjects,
    text, num, nome, cognome, codiceFiscale, email, date, datePattern, enumField,
    STATO_CIVILE_VALUES, statoCivile,
} from '../../../helpers/it';
import type { DocumentTypeDef } from '../../../types';

// ─── Document Type IDs ──────────────────────────────────────────────────────

export const DOC_IDS = {
    CONTATTO: 'doc-contatto',
    IDENTITA: 'doc-identita',
    PROVENIENZA: 'doc-provenienza',
    PRELIMINARE: 'doc-preliminare',
    PROPOSTA: 'doc-proposta',
    VISURA: 'doc-visura',
    PLANIMETRIA: 'doc-planimetria',
    APE: 'doc-ape',
    MORTE: 'doc-morte',
    SUCCESSIONE: 'doc-successione',
    EREDITA: 'doc-eredita',
    FAMIGLIA: 'doc-famiglia',
    TESSERA_SAN: 'doc-tessera-sanitaria',
    IPOTECARIA: 'doc-visura-ipotecaria',
    AGIBILITA: 'doc-agibilita',
    MATRIMONIO: 'doc-matrimonio',
    CONFORMITA_URB: 'doc-conformita-urbanistica',
    CONFORMITA_IMP: 'doc-conformita-impianti',
    CONDOMINIALE: 'doc-condominiale',
    SEPARAZIONE: 'doc-separazione',
    // ── Bank loan documents ──
    DELIBERA_MUTUO: 'doc-delibera-mutuo',
    PERIZIA_BANCARIA: 'doc-perizia-bancaria',
    CONTRATTO_MUTUO: 'doc-contratto-mutuo',
    MEZZI_PAGAMENTO: 'doc-mezzi-pagamento',
    // ── Optional / situational documents ──
    RESIDENZA: 'doc-residenza',
    CDU: 'doc-cdu',
    PERMESSO_SOGGIORNO: 'doc-permesso-soggiorno',
    VISURA_CAMERALE: 'doc-visura-camerale',
    PROCURA: 'doc-procura',
} as const;

// ─── Shared field fragments ─────────────────────────────────────────────────

const LUOGO_NASCITA_DESC = "Città seguita dalla sigla della provincia SEMPRE tra parentesi tonde — formato OBBLIGATORIO: 'NomeCittà (XX)' (es. 'Milano (MI)', 'Roma (RM)'). MAI senza parentesi (es. 'Milano MI' è SBAGLIATO). Per la sigla: se la città è una di queste usa la sua sigla: Barletta-Andria-Trani (BT) Bolzano (BZ) Caltanissetta (CL) Campobasso (CB) Caserta (CE) Chieti (CH) Crotone (KR) Forlì-Cesena (FC) Lecco (LC) Mantova (MN) Massa-Carrara (MS) Messina (ME) Monza e della Brianza (MB) Parma (PR) Perugia (PG) Pesaro e Urbino (PU) Piacenza (PC) Pistoia (PT) Potenza (PZ) Ragusa (RG) Reggio Calabria (RC) Roma (RM) Siracusa (SR) Sud Sardegna (SU) Trapani (TP) Trieste (TS) Vibo Valentia (VV), se è un'altra città crea la sigla con le prime due lettere del nome della città.";



const TIPO_PROVENIENZA_VALUES = [
    'compravendita', 'donazione', 'successione',
    'divisione', 'usucapione', 'altro',
];

const REGIME_PATRIMONIALE_VALUES = ['comunione dei beni', 'separazione dei beni'];

const CATEGORIA_CATASTALE_VALUES = [
    'A/1', 'A/2', 'A/3', 'A/4', 'A/5', 'A/6', 'A/7', 'A/8', 'A/9', 'A/10', 'A/11',
    'B/1', 'B/2', 'B/3', 'B/4', 'B/5', 'B/6', 'B/7', 'B/8',
    'C/1', 'C/2', 'C/3', 'C/4', 'C/5', 'C/6', 'C/7',
    'D/1', 'D/2', 'D/3', 'D/4', 'D/5', 'D/6', 'D/7', 'D/8', 'D/9', 'D/10',
    'E/1', 'E/2', 'E/3', 'E/4', 'E/5', 'E/6', 'E/7', 'E/8', 'E/9',
    'F/1', 'F/2', 'F/3', 'F/4', 'F/5',
];

const CLASSE_ENERGETICA_VALUES = ['A4', 'A3', 'A2', 'A1', 'B', 'C', 'D', 'E', 'F', 'G'];

const DESTINAZIONE_USO_DESC = 'Destinazione d\'uso dell\'immobile (es. residenziale, ufficio, commerciale, industriale, agricolo, magazzino, autorimessa)';

const RELAZIONE_FAMILIARE_DESC = 'Relazione familiare (es. intestatario, coniuge, convivente, figlio/a, padre, madre, fratello/sorella, nipote)';

const TIPO_FORMALITA_DESC = 'Tipo di formalità (es. compravendita, ipoteca volontaria, ipoteca giudiziale, ipoteca legale, pignoramento, sequestro conservativo, successione ereditaria, donazione, trascrizione, servitù, cancellazione, annotazione)';

// ─── Document Types ─────────────────────────────────────────────────────────

const documentoContatto: DocumentTypeDef = {
    id: DOC_IDS.CONTATTO,
    name: 'Documento di Contatto',
    description: 'Recapiti e indirizzi del cliente per comunicazioni e notifiche legali',
    jsonSchema: objectSchema({
        nome: nome(),
        cognome: cognome(),
        telefonoCellulare: text('Numero di cellulare principale'),
        telefonoFisso: text('Eventuale numero fisso/ufficio'),
        email: email('Indirizzo email ordinario'),
        pec: email('Posta Elettronica Certificata (fondamentale per comunicazioni legali)'),
        indirizzoResidenza: text('Via/Piazza e numero civico'),
        cittaResidenza: text('Comune di residenza'),
        cap: text('Codice Avviamento Postale'),
        provincia: text('Sigla Provincia (es. MI, RM)'),
    }, ['nome', 'cognome', 'telefonoCellulare', 'email', 'indirizzoResidenza']),
};

const documentoIdentita: DocumentTypeDef = {
    id: DOC_IDS.IDENTITA,
    name: "Documento d'Identità",
    description: 'Dati per identificazione (Antiriciclaggio/KYC)',
    isArrayExtraction: true,
    jsonSchema: objectSchema({
        nome: nome(),
        cognome: cognome(),
        codiceFiscale: codiceFiscale(),
        tipoDocumento: text("Tipo documento: Carta D'Identità, Passaporto, Patente, Permesso di Soggiorno, ecc."),
        numeroDocumento: text(''),
        dataEmissione: date('Data di emissione in formato europeo DD.MM.YYYY'),
        dataScadenza: date('Data di scadenza in formato europeo DD.MM.YYYY'),
        rilasciatoDa: text("Autorità che ha rilasciato il documento (es. Comune di Roma, Questura di Milano)"),
        luogoNascita: text(LUOGO_NASCITA_DESC),
        indirizzoDiResidenza: text('Indirizzo completo di residenza — formato: Via/Piazza Nome Numero, CAP Città (Provincia). Sempre virgola dopo il numero civico prima del CAP (es. "Viale Augusto 45, 80126 Napoli (NA)")'),
        dataNascita: date('Data in formato europeo  DD.MM.YYYY'),
        statoCivile: statoCivile(),
    }, ['nome', 'cognome', 'codiceFiscale', 'tipoDocumento', 'numeroDocumento', 'dataEmissione', 'dataScadenza', 'luogoNascita', 'dataNascita']),
};

const venditoreAcquirenteProps = {
    nome: nome(),
    cognome: cognome(),
    quota: text('Quota di proprietà venduta (es. 100%, 50/100)'),
    codiceFiscale: text('Codice Fiscale del venditore (extract without spaces)'),
    statoCivile: enumField('Stato civile come scritto nell\'atto (es. coniugato, vedova del fu...)', STATO_CIVILE_VALUES),
    regimePatrimoniale: enumField('Regime patrimoniale', REGIME_PATRIMONIALE_VALUES),
};
const venditoreAcquirenteRequired = ['nome', 'cognome', 'quota', 'codiceFiscale', 'statoCivile', 'regimePatrimoniale'];

const attoProvenienza: DocumentTypeDef = {
    id: DOC_IDS.PROVENIENZA,
    name: 'Atto di Provenienza Notarile',
    description: 'Rogito che attesta la proprietà. Include dati venditori, acquirenti e catastali.',
    jsonSchema: objectSchema({
        venditori: arrayOfObjects(venditoreAcquirenteProps, venditoreAcquirenteRequired, "Elenco di tutti i venditori nell'atto"),
        acquirenti: arrayOfObjects({
            ...venditoreAcquirenteProps,
            quota: text('Quota di proprietà acquistata (es. 100%, 50/100)'),
            codiceFiscale: text("Codice Fiscale dell'acquirente (extract without spaces)"),
        }, venditoreAcquirenteRequired, "Elenco di tutti gli acquirenti nell'atto"),
        notaio: text('Nome e cognome del notaio rogante'),
        dataAtto: text(''),
        numeroRepertorio: text(''),
        numeroRaccolta: text(''),
        indirizzo: text('Indirizzo completo del complesso edilizio o dell\'immobile'),
        immobili: arrayOfObjects({
            foglio: text('Foglio catastale'),
            particella: text('Particella catastale'),
            subalterno: text('Subalterno'),
            categoria: enumField('Categoria catastale (es. A/3, C/6)', CATEGORIA_CATASTALE_VALUES),
            piano: text('Piano (es. S1, T, S1-T-1-2)'),
            consistenza: text('Consistenza: vani o mq (es. 7 vani, 37 mq)'),
            rendita: num('Rendita catastale in Euro'),
        }, ['foglio', 'particella', 'subalterno'], 'Elenco delle unità immobiliari oggetto dell\'atto con i dati catastali'),
        tipoProvenienza: enumField(
            "Come il proprietario attuale ha acquisito l'immobile: compravendita, donazione, successione, divisione, usucapione, altro",
            TIPO_PROVENIENZA_VALUES
        ),
    }, ['venditori', 'acquirenti', 'notaio', 'dataAtto', 'immobili', 'tipoProvenienza', 'indirizzo']),
};

const semplicePersonaProps = { nome: nome(), cognome: cognome(), codiceFiscale: codiceFiscale(), statoCivile: statoCivile() };
const semplicePersonaReq = ['nome', 'cognome', 'codiceFiscale'];

const contrattoPrelim: DocumentTypeDef = {
    id: DOC_IDS.PRELIMINARE,
    name: 'Contratto Preliminare',
    description: 'Compromesso di compravendita',
    jsonSchema: objectSchema({
        acquirenti: { type: 'array', items: { type: 'object', properties: semplicePersonaProps, required: semplicePersonaReq } },
        venditori: { type: 'array', items: { type: 'object', properties: semplicePersonaProps, required: semplicePersonaReq } },
        prezzo: { type: 'number' },
        dataStipula: datePattern('Data di stipula in formato europeo DD/MM/YYYY'),
        caparra: num('Importo della caparra confirmatoria in Euro'),
        dataRogito: datePattern('Data prevista per il rogito definitivo in formato europeo DD/MM/YYYY'),
        mediatore: text('Nome dell\'agenzia immobiliare o del mediatore (Art. 35 D.Lgs. 223/2006)'),
        modalitaPagamento: text('Modalità di pagamento previste'),
    }, ['acquirenti', 'venditori', 'prezzo', 'dataStipula']),
};

const propostaAcquisto: DocumentTypeDef = {
    id: DOC_IDS.PROPOSTA,
    name: 'Proposta di Acquisto',
    description: 'Proposta irrevocabile d\'acquisto',
    jsonSchema: objectSchema({
        proponenti: arrayOfObjects(semplicePersonaProps, semplicePersonaReq, 'Elenco di tutti i proponenti/acquirenti nella proposta'),
        prezzoOfferto: { type: 'number' },
        validitaProposta: text('Durata di irrevocabilità della proposta. Riporta SOLO il periodo (es. "15 giorni", "30 giorni"). NON aggiungere "dalla data odierna" o altre espressioni.'),
        condizioniSospensive: text('Eventuali condizioni sospensive (es. approvazione mutuo)'),
    }, ['proponenti', 'prezzoOfferto']),
};

const VISURA_LUOGO_DESC = "Città e dopo inserisci la sigla della provincia calcolata così:  Se la città è una di queste usa la sua sigla: Barletta-Andria-Trani (BT) Bolzano (BZ) Caltanissetta (CL) Campobasso (CB) Caserta (CE) Chieti (CH) Crotone (KR) Forlì-Cesena (FC) Lecco (LC) Mantova (MN) Massa-Carrara (MS) Messina (ME) Monza e della Brianza (MB) Parma (PR) Perugia (PG) Pesaro e Urbino (PU) Piacenza (PC) Pistoia (PT) Potenza (PZ) Ragusa (RG) Reggio Calabria (RC) Roma (RM) Siracusa (SR) Sud Sardegna (SU) Trapani (TP) Trieste (TS) Vibo Valentia (VV), se è un'altra città crea la sigla con le prime due lettere del nome della città, possono essere più intestati identificati da un numero progressivo, separali con il numero progressivo seguito da \\\"-\\\"";

const visuraCatastale: DocumentTypeDef = {
    id: DOC_IDS.VISURA,
    name: 'Visura Catastale',
    description: 'Stato attuale dell\'immobile in Catasto. Può essere un fabbricato (con categoria, rendita, consistenza) o un terreno (con qualità, classe, superficie, redditi).',
    jsonSchema: objectSchema({
        // Dati identificativi
        foglio: text('Foglio catastale'),
        particella: text('Particella catastale'),
        subalterno: text('Subalterno'),
        sezione: text('Sezione catastale (es. ABBIATEGUAZZONE, può essere vuoto)'),
        comuneCatastale: text('Comune catastale con codice — copia ESATTAMENTE come scritto (es. TRADATE (L319B))'),
        indirizzoCatastale: text('Indirizzo dell\'immobile se presente'),
        piano: text('Piano dell\'immobile — solo il numero o codice (es. S1, T, 1, 2). NON aggiungere descrizioni come "Secondo" o "Piano Terra"'),
        // Classamento — fabbricati
        categoriaCatastale: enumField('Categoria catastale (es. A/2, A/10, C/6) — solo per fabbricati', CATEGORIA_CATASTALE_VALUES),
        classe: text('Classe catastale (numero)'),
        renditaCatastale: num('Rendita catastale in Euro — solo per fabbricati'),
        consistenza: text('Consistenza: vani per abitazioni, mq per altre categorie'),
        // Classamento — terreni
        qualita: text('Qualità colturale del terreno (es. SEMIN ARBOR, PRATO, VIGNETO) — solo per terreni'),
        superficie: text('Superficie totale in mq'),
        superficieEscluseAreeScoperte: text('Superficie totale escluse aree scoperte in mq'),
        redditoDominicale: num('Reddito dominicale in Euro — solo per terreni'),
        redditoAgrario: num('Reddito agrario in Euro — solo per terreni'),
        // Intestati
        intestatiCatastali: arrayOfObjects({
            cognome: cognome(),
            nome: nome(),
            codiceFiscale: codiceFiscale(),
            dataNascita: text('Data di nascita in formato DD/MM/YYYY'),
            luogoNascita: text(VISURA_LUOGO_DESC),
            diritto: text('Tipo di diritto e quota (es. Proprietà per 1/1, Proprietà per 1/2, Nuda proprietà per 1/1, Usufrutto per 1/1)'),
        }, ['cognome', 'nome', 'codiceFiscale', 'dataNascita', 'luogoNascita', 'diritto'], 'Elenco degli intestatari catastali con diritti e quote'),
    }, ['foglio', 'particella', 'subalterno', 'comuneCatastale', 'intestatiCatastali']),
};

const planimetria: DocumentTypeDef = {
    id: DOC_IDS.PLANIMETRIA,
    name: 'Planimetria Catastale',
    description: 'Dati identificativi della scheda grafica',
    jsonSchema: objectSchema({
        foglio: { type: 'string' },
        particella: { type: 'string' },
        subalterno: { type: 'string' },
        protocollo: { type: 'string' },
        dataProtocollo: datePattern('Data del protocollo in formato europeo DD/MM/YYYY'),
        scala: text('Scala della planimetria (es. 1:100, 1:200, 1:50, 1:500)'),
    }, ['foglio', 'particella', 'subalterno', 'protocollo', 'dataProtocollo', 'scala']),
};

const ape: DocumentTypeDef = {
    id: DOC_IDS.APE,
    name: 'APE - Certificato Energetico',
    description: 'Efficienza energetica obbligatoria per annunci e rogito',
    jsonSchema: objectSchema({
        classeEnergetica: enumField('Classe energetica dell\'immobile', CLASSE_ENERGETICA_VALUES),
        indiceEpgl: num('Consumo energetico'),
        codiceIdentificativo: { type: 'string' },
        validoFinoA: datePattern('Data di validità in formato europeo DD/MM/YYYY'),
        regione: { type: 'string' },
        comune: { type: 'string' },
        indirizzo: { type: 'string' },
        piano: { type: 'string' },
        interno: { type: 'string' },
        comuneCatastale: { type: 'string' },
        sezione: { type: 'string' },
        foglio: { type: 'string' },
        particella: { type: 'string' },
        subalterni: { type: 'array', items: { type: 'string' } },
        destinazioneUso: text(DESTINAZIONE_USO_DESC),
        oggettoAttestato: text("Oggetto dell'attestato"),
        dataScadenza: datePattern('Data di scadenza in formato europeo DD/MM/YYYY'),
        codiceUnivoco: { type: 'string' },
    }, [
        'classeEnergetica', 'indiceEpgl', 'codiceIdentificativo', 'validoFinoA',
        'regione', 'comune', 'indirizzo', 'piano', 'interno',
        'comuneCatastale', 'sezione', 'foglio', 'particella', 'subalterni',
        'destinazioneUso', 'oggettoAttestato', 'dataScadenza', 'codiceUnivoco',
    ]),
};

const tesseraSanitaria: DocumentTypeDef = {
    id: DOC_IDS.TESSERA_SAN,
    name: 'Tessera Sanitaria',
    jsonSchema: objectSchema({
        codiceFiscale: codiceFiscale(),
        cognome: cognome(),
        nome: nome(),
        sesso: enumField('Sesso del titolare', ['M', 'F']),
        luogoDiNascita: text(''),
        provincia: text('può essere indicata con "( )" o senza'),
        dataDiNascita: date(),
        dataDiScadenza: date(),
        dataEmissione: date(),
    }, ['codiceFiscale', 'cognome', 'nome', 'sesso', 'luogoDiNascita', 'provincia', 'dataDiNascita', 'dataDiScadenza', 'dataEmissione']),
};

// ── Conditional document types ──────────────────────────────────────────────

const certificatoMorte: DocumentTypeDef = {
    id: DOC_IDS.MORTE,
    name: 'Certificato di Morte',
    description: 'Certificato/Estratto che attesta il decesso, richiesto quando il venditore/acquirente è vedovo/a',
    jsonSchema: objectSchema({
        nomeDefunto: text('Nome del defunto'),
        cognomeDefunto: text('Cognome del defunto'),
        codiceFiscaleDefunto: codiceFiscale('Codice Fiscale del defunto — fondamentale per cross-reference con successione (extract without spaces)'),
        dataNascita: date('Data di nascita del defunto in formato europeo DD.MM.YYYY'),
        luogoNascita: text('Comune di nascita del defunto'),
        dataDecesso: date('Data del decesso in formato europeo DD.MM.YYYY'),
        oraDecesso: text('Ora del decesso, se indicata'),
        luogoMorte: text('Comune di decesso'),
        ultimaResidenza: text('Ultimo comune di residenza del defunto'),
        statoCivile: enumField('Stato civile del defunto al momento del decesso', STATO_CIVILE_VALUES),
        nomeConiuge: text('Nome e cognome del coniuge superstite, se presente'),
        comuneRegistrazione: text("Comune dove è stato registrato l'atto di morte"),
        parteSerie: text("Parte e serie dell'atto"),
        numero: text("Numero dell'atto di morte"),
    }, ['nomeDefunto', 'cognomeDefunto', 'dataDecesso', 'luogoMorte', 'comuneRegistrazione']),
};

const dichiarazioneSuccessione: DocumentTypeDef = {
    id: DOC_IDS.SUCCESSIONE,
    name: 'Dichiarazione di Successione',
    description: "Denuncia di successione presentata all'Agenzia delle Entrate, richiesta quando l'immobile proviene da eredità",
    jsonSchema: objectSchema({
        defunto: text('Nome e cognome del defunto'),
        codiceFiscaleDefunto: codiceFiscale('Codice Fiscale del defunto — per cross-reference con certificato di morte (extract without spaces)'),
        dataDecesso: date('Data del decesso in formato europeo DD.MM.YYYY'),
        dataPresentazione: date('Data di presentazione della dichiarazione in formato europeo DD.MM.YYYY'),
        protocollo: text('Numero di protocollo Agenzia delle Entrate (es. SUC/2021/FI/12345)'),
        eredi: arrayOfObjects({
            nome: { type: 'string' },
            cognome: { type: 'string' },
            codiceFiscale: { type: 'string' },
            quotaEreditaria: text('Quota di eredità (es. 1/2, 1/3)'),
            rapportoParentela: text('Rapporto di parentela con il defunto (es. coniuge, figlio, fratello)'),
        }, ['nome', 'cognome', 'codiceFiscale', 'quotaEreditaria']),
        foglio: { type: 'string' },
        particella: { type: 'string' },
        subalterno: { type: 'string' },
        volumeAtti: text('Volume e numero di registrazione'),
    }, ['defunto', 'dataDecesso', 'dataPresentazione', 'eredi', 'foglio', 'particella', 'subalterno']),
};

const TIPO_ACCETTAZIONE_VALUES = ['pura e semplice', 'con beneficio d\'inventario'];

const accettazioneEredita: DocumentTypeDef = {
    id: DOC_IDS.EREDITA,
    name: 'Accettazione di Eredità',
    description: "Atto di accettazione dell'eredità trascritto in Conservatoria, necessario per la vendita di immobili ereditati",
    jsonSchema: objectSchema({
        erede: text("Nome e cognome dell'erede accettante"),
        codiceFiscaleErede: text("Codice Fiscale dell'erede"),
        defunto: text('Nome e cognome del defunto'),
        tipoAccettazione: enumField('Tipo di accettazione', TIPO_ACCETTAZIONE_VALUES),
        dataTrascrizione: date('Data di trascrizione in formato europeo DD.MM.YYYY'),
        notaio: text('Notaio rogante'),
        numeroRepertorio: { type: 'string' },
        numeroTrascrizione: text('Numero di trascrizione in Conservatoria'),
    }, ['erede', 'codiceFiscaleErede', 'defunto', 'dataTrascrizione']),
};

const certificatoFamiglia: DocumentTypeDef = {
    id: DOC_IDS.FAMIGLIA,
    name: 'Certificato di Stato di Famiglia',
    description: 'Certificato anagrafico che attesta la composizione del nucleo familiare, utile per verifiche sul regime patrimoniale',
    jsonSchema: objectSchema({
        intestatario: text("Nome e cognome dell'intestatario del nucleo familiare"),
        codiceFiscaleIntestatario: codiceFiscale('Codice Fiscale dell\'intestatario (extract without spaces)'),
        indirizzo: text('Indirizzo di residenza del nucleo familiare'),
        comune: { type: 'string' },
        componenti: arrayOfObjects({
            nome: { type: 'string' },
            cognome: { type: 'string' },
            codiceFiscale: { type: 'string', description: 'Codice Fiscale del componente, se presente' },
            dataNascita: { type: 'string' },
            relazione: text(RELAZIONE_FAMILIARE_DESC),
        }, ['nome', 'cognome', 'dataNascita', 'relazione']),
        dataRilascio: date('Data di rilascio in formato europeo DD.MM.YYYY'),
    }, ['intestatario', 'indirizzo', 'comune', 'componenti', 'dataRilascio']),
};

// ── Additional document types ───────────────────────────────────────────────

const visuraIpotecaria: DocumentTypeDef = {
    id: DOC_IDS.IPOTECARIA,
    name: 'Visura Ipotecaria',
    description: 'Ispezione ipotecaria che riporta la situazione giuridica dell\'immobile: proprietà, ipoteche, pignoramenti e vincoli',
    jsonSchema: objectSchema({
        tipoFormalita: text(TIPO_FORMALITA_DESC),
        dataRegistrazione: date('Data di registrazione in formato europeo DD.MM.YYYY'),
        numeroRegistrazione: text('Numero di registro (Registro Generale e Registro Particolare)'),
        soggetti: arrayOfObjects({
            nome: { type: 'string' },
            cognome: { type: 'string' },
            codiceFiscale: { type: 'string' },
            ruolo: text('Ruolo del soggetto (es. proprietario, creditore, debitore, garante, dante causa, avente causa)'),
        }, ['nome', 'cognome', 'codiceFiscale', 'ruolo'], 'Soggetti coinvolti nella formalità'),
        foglio: text('Foglio catastale dell\'immobile'),
        particella: text('Particella catastale dell\'immobile'),
        subalterno: text('Subalterno dell\'immobile'),
        indirizzo: text('Indirizzo dell\'immobile, se presente'),
        importo: text('Importo dell\'ipoteca o del credito, se applicabile'),
        note: text('Note o annotazioni aggiuntive — copiare TESTUALMENTE dal documento (es. cancellazione, restrizione). Se non ci sono note, restituire stringa vuota. NON scrivere frasi come "Nessuna ipoteca" o "Nessun vincolo".'),
    }, ['tipoFormalita', 'dataRegistrazione', 'numeroRegistrazione', 'soggetti', 'foglio', 'particella']),
};

const certificatoAgibilita: DocumentTypeDef = {
    id: DOC_IDS.AGIBILITA,
    name: 'Certificato di Agibilità',
    description: 'Attesta che l\'immobile soddisfa requisiti di sicurezza, igiene, salubrità e risparmio energetico',
    jsonSchema: objectSchema({
        numeroProtocollo: text('Numero di protocollo del certificato'),
        dataRilascio: date('Data di rilascio in formato europeo DD.MM.YYYY'),
        comuneRilascio: text('Comune che ha rilasciato il certificato'),
        richiedente: text('Nome e cognome del richiedente'),
        indirizzo: text('Indirizzo completo dell\'immobile'),
        foglio: { type: 'string' },
        particella: { type: 'string' },
        subalterno: { type: 'string' },
        destinazioneUso: text(DESTINAZIONE_USO_DESC),
        tecnicoAsseverante: text('Nome del tecnico che ha asseverato la conformità'),
    }, ['numeroProtocollo', 'dataRilascio', 'comuneRilascio', 'indirizzo', 'destinazioneUso']),
};

const estrattoMatrimonio: DocumentTypeDef = {
    id: DOC_IDS.MATRIMONIO,
    name: 'Estratto Atto di Matrimonio',
    description: 'Estratto dell\'atto di matrimonio o certificato di stato libero, richiesto dal notaio per verificare il regime patrimoniale',
    jsonSchema: objectSchema({
        coniuge1: text('Nome e cognome del primo coniuge'),
        coniuge2: text('Nome e cognome del secondo coniuge'),
        dataMatrimonio: date('Data di celebrazione del matrimonio in formato europeo DD.MM.YYYY'),
        luogoMatrimonio: text('Comune di celebrazione'),
        regimePatrimoniale: enumField('Regime patrimoniale scelto', ['comunione dei beni', 'separazione dei beni']),
        annotazioni: text('Annotazioni marginali — copiare TESTUALMENTE dal documento (es. separazione, divorzio, convenzioni patrimoniali)'),
        comuneRegistrazione: text('Comune dove è stato registrato l\'atto'),
        parte: text('Parte e numero dell\'atto'),
    }, ['coniuge1', 'coniuge2', 'dataMatrimonio', 'luogoMatrimonio', 'regimePatrimoniale']),
};

const conformitaUrbanistica: DocumentTypeDef = {
    id: DOC_IDS.CONFORMITA_URB,
    name: 'Conformità Urbanistica ed Edilizia',
    description: 'Relazione tecnica che attesta la corrispondenza tra lo stato di fatto dell\'immobile e i titoli abilitativi depositati in Comune',
    jsonSchema: objectSchema({
        tecnico: text('Nome del tecnico abilitato (architetto, ingegnere, geometra)'),
        dataRelazione: date('Data della relazione in formato europeo DD.MM.YYYY'),
        indirizzo: text('Indirizzo completo dell\'immobile'),
        foglio: { type: 'string' },
        particella: { type: 'string' },
        subalterno: { type: 'string' },
        titoliAbilitativi: text('Elenco dei titoli edilizi (licenza edilizia, concessione, permesso di costruire, SCIA, CILA)'),
        esito: text('Esito della verifica (es. conforme, non conforme, conforme con riserva, conforme con prescrizioni)'),
        difformita: text('Descrizione di eventuali difformità riscontrate — copiare TESTUALMENTE dal documento'),
        condoni: text('Eventuali domande di condono edilizio presentate — copiare TESTUALMENTE dal documento'),
    }, ['tecnico', 'dataRelazione', 'indirizzo', 'esito']),
};

const conformitaImpianti: DocumentTypeDef = {
    id: DOC_IDS.CONFORMITA_IMP,
    name: 'Certificazione Conformità Impianti',
    description: 'Dichiarazioni di conformità degli impianti (elettrico, idraulico, gas, riscaldamento) ai sensi del DM 37/2008',
    jsonSchema: objectSchema({
        tipoImpianto: text('Tipo di impianto certificato (es. elettrico, idraulico, gas, riscaldamento, climatizzazione, ascensore, elettrico e termoidraulico)'),
        impresaInstallatrice: text('Ragione sociale dell\'impresa installatrice'),
        responsabileTecnico: text('Nome del responsabile tecnico'),
        dataRilascio: date('Data di rilascio della dichiarazione in formato europeo DD.MM.YYYY'),
        numeroProtocollo: text('Numero di protocollo della dichiarazione'),
        indirizzo: text('Indirizzo dell\'immobile'),
        foglio: text('Foglio catastale, se presente'),
        particella: text('Particella catastale, se presente'),
        subalterno: text('Subalterno, se presente'),
        normativaRiferimento: text('Normativa di riferimento (es. DM 37/2008, CEI 64-8)'),
    }, ['tipoImpianto', 'impresaInstallatrice', 'dataRilascio', 'indirizzo']),
};

const documentazioneCondominiale: DocumentTypeDef = {
    id: DOC_IDS.CONDOMINIALE,
    name: 'Documentazione Condominiale',
    description: 'Dichiarazione dell\'amministratore di condominio sulle spese e regolamento condominiale',
    jsonSchema: objectSchema({
        amministratore: text('Nome e cognome o ragione sociale dell\'amministratore'),
        condominio: text('Denominazione del condominio'),
        indirizzo: text('Indirizzo del condominio'),
        unitaImmobiliare: text('Identificazione dell\'unità immobiliare (es. Scala A, Piano 3, Int. 5)'),
        quoteRegolari: enumField('Le quote condominiali sono regolarmente pagate', ['sì', 'no']),
        importoArretrati: text('Eventuali arretrati dovuti'),
        speseStraodinarie: text('Spese straordinarie deliberate o in corso'),
        millesimi: text('Millesimi di proprietà dell\'unità'),
        dataRilascio: date('Data di rilascio della dichiarazione in formato europeo DD.MM.YYYY'),
    }, ['amministratore', 'condominio', 'indirizzo', 'unitaImmobiliare', 'quoteRegolari', 'dataRilascio']),
};

const sentenzaSeparazione: DocumentTypeDef = {
    id: DOC_IDS.SEPARAZIONE,
    name: 'Sentenza di Separazione/Divorzio',
    description: 'Provvedimento giudiziario di separazione legale o divorzio, rilevante per la determinazione dei diritti patrimoniali sull\'immobile',
    jsonSchema: objectSchema({
        tribunale: text('Tribunale competente che ha emesso la sentenza'),
        numeroSentenza: text('Numero di ruolo/sentenza'),
        dataSentenza: date('Data della sentenza in formato europeo DD.MM.YYYY'),
        coniuge1: text('Nome e cognome del primo coniuge'),
        coniuge2: text('Nome e cognome del secondo coniuge'),
        tipoProvvedimento: enumField('Tipo di provvedimento', ['separazione consensuale', 'separazione giudiziale', 'divorzio']),
        disposizioniPatrimoniali: text('Disposizioni relative ai beni immobili — copiare TESTUALMENTE dal documento, senza riformulare o riassumere (es. assegnazione casa coniugale)'),
        passaggioInGiudicato: date('Data di passaggio in giudicato in formato europeo DD.MM.YYYY'),
    }, ['tribunale', 'dataSentenza', 'coniuge1', 'coniuge2', 'tipoProvvedimento']),
};

// ── Optional / situational document types ───────────────────────────────────

const certificatoResidenza: DocumentTypeDef = {
    id: DOC_IDS.RESIDENZA,
    name: 'Certificato di Residenza',
    description: 'Certificato anagrafico che attesta la residenza attuale, richiesto quando l\'indirizzo sull\'identità differisce dalla residenza corrente',
    jsonSchema: objectSchema({
        nome: nome(),
        cognome: cognome(),
        codiceFiscale: codiceFiscale(),
        indirizzo: text('Indirizzo completo di residenza attuale'),
        comune: text('Comune di residenza'),
        provincia: text('Sigla Provincia'),
        cap: text('Codice Avviamento Postale'),
        dataRilascio: date('Data di rilascio in formato europeo DD.MM.YYYY'),
        comuneRilascio: text('Comune che ha rilasciato il certificato'),
    }, ['nome', 'cognome', 'codiceFiscale', 'indirizzo', 'comune', 'dataRilascio']),
};

const certificatoCDU: DocumentTypeDef = {
    id: DOC_IDS.CDU,
    name: 'Certificato di Destinazione Urbanistica (CDU)',
    description: 'Certificato rilasciato dal Comune che attesta la destinazione urbanistica di un terreno — obbligatorio per terreni >5000 mq (Art. 30 D.P.R. 380/2001)',
    jsonSchema: objectSchema({
        foglio: text('Foglio catastale'),
        particella: text('Particella catastale'),
        comune: text('Comune di ubicazione'),
        destinazioneUrbanistica: text('Destinazione urbanistica (es. Zona Residenziale B2, Zona Agricola E1)'),
        estremiPRG: text('Estremi del Piano Regolatore o Piano Urbanistico vigente'),
        dataRilascio: date('Data di rilascio in formato europeo DD.MM.YYYY'),
        validita: text('Validità del certificato (1 anno dalla data di rilascio)'),
    }, ['foglio', 'particella', 'comune', 'destinazioneUrbanistica', 'dataRilascio']),
};

const permsessoSoggiorno: DocumentTypeDef = {
    id: DOC_IDS.PERMESSO_SOGGIORNO,
    name: 'Permesso di Soggiorno',
    description: 'Documento rilasciato dalla Questura per cittadini extracomunitari — richiesto per acquirenti/venditori non-UE',
    jsonSchema: objectSchema({
        nome: nome(),
        cognome: cognome(),
        codiceFiscale: codiceFiscale(),
        cittadinanza: text('Cittadinanza del titolare'),
        tipoPermesso: text('Tipo di permesso (es. lavoro subordinato, famiglia, lungo soggiorno)'),
        numeroPermesso: text('Numero del permesso di soggiorno'),
        dataRilascio: date('Data di rilascio in formato europeo DD.MM.YYYY'),
        dataScadenza: date('Data di scadenza in formato europeo DD.MM.YYYY'),
        questura: text('Questura rilasciante'),
    }, ['nome', 'cognome', 'codiceFiscale', 'tipoPermesso', 'dataRilascio', 'dataScadenza']),
};

const visuraCamerale: DocumentTypeDef = {
    id: DOC_IDS.VISURA_CAMERALE,
    name: 'Visura Camerale',
    description: 'Documento della Camera di Commercio che attesta i dati di una società — richiesto quando il venditore/acquirente è una persona giuridica',
    jsonSchema: objectSchema({
        ragioneSociale: text('Denominazione o ragione sociale della società'),
        codiceFiscale: text('Codice Fiscale / Partita IVA della società'),
        sedeLegale: text('Indirizzo della sede legale'),
        formaGiuridica: text('Forma giuridica (es. S.r.l., S.p.A., S.a.s.)'),
        legaleRappresentante: text('Nome e cognome del legale rappresentante'),
        codiceFiscaleRappresentante: codiceFiscale('Codice Fiscale del legale rappresentante (extract without spaces)'),
        numeroREA: text('Numero di iscrizione al Registro Imprese (REA)'),
        dataIscrizione: text('Data di iscrizione al Registro Imprese'),
        statoAttivita: text('Stato di attività (es. attiva, in liquidazione, cessata)'),
        oggettoSociale: text('Oggetto sociale della società'),
    }, ['ragioneSociale', 'codiceFiscale', 'sedeLegale', 'formaGiuridica', 'legaleRappresentante']),
};

const procura: DocumentTypeDef = {
    id: DOC_IDS.PROCURA,
    name: 'Procura',
    description: 'Atto notarile che conferisce il potere di rappresentanza per compiere atti per conto di un\'altra persona in sede di rogito',
    jsonSchema: objectSchema({
        nomeMandante: nome(),
        cognomeMandante: cognome(),
        codiceFiscaleMandante: codiceFiscale('Codice Fiscale del mandante (extract without spaces)'),
        nomeMandatario: nome(),
        cognomeMandatario: cognome(),
        codiceFiscaleMandatario: codiceFiscale('Codice Fiscale del mandatario (extract without spaces)'),
        tipoProcura: enumField('Tipo di procura', ['speciale', 'generale']),
        oggettoDelega: text('Oggetto specifico della delega (es. vendita dell\'immobile sito in...)'),
        notaio: text('Notaio che ha autenticato la procura'),
        dataAtto: date('Data dell\'atto in formato europeo DD.MM.YYYY'),
        numeroRepertorio: text('Numero di repertorio'),
    }, ['nomeMandante', 'cognomeMandante', 'codiceFiscaleMandante', 'nomeMandatario', 'cognomeMandatario', 'codiceFiscaleMandatario', 'tipoProcura', 'dataAtto']),
};

// ── Bank loan document types ────────────────────────────────────────────────

const deliberaMutuo: DocumentTypeDef = {
    id: DOC_IDS.DELIBERA_MUTUO,
    name: 'Delibera di Mutuo',
    description: 'Lettera di delibera della banca che conferma l\'approvazione del mutuo ipotecario',
    jsonSchema: objectSchema({
        banca: text('Nome della banca o istituto di credito'),
        filiale: text('Filiale o agenzia'),
        mutuatario: text('Nome e cognome del mutuatario'),
        codiceFiscaleMutuatario: codiceFiscale('Codice Fiscale del mutuatario (extract without spaces)'),
        importoMutuo: num('Importo del mutuo deliberato in Euro'),
        durataAnni: num('Durata del mutuo in anni'),
        tassoInteresse: text('Tasso di interesse (fisso, variabile, misto) e percentuale'),
        tipoTasso: enumField('Tipo di tasso', ['fisso', 'variabile', 'misto']),
        dataDelibera: date('Data della delibera in formato europeo DD.MM.YYYY'),
        validitaDelibera: text('Validità temporale della delibera (es. 6 mesi)'),
        condizioniSospensive: text('Eventuali condizioni sospensive (es. ipoteca di primo grado)'),
    }, ['banca', 'mutuatario', 'codiceFiscaleMutuatario', 'importoMutuo', 'dataDelibera']),
};

const periziaBancaria: DocumentTypeDef = {
    id: DOC_IDS.PERIZIA_BANCARIA,
    name: 'Perizia Bancaria',
    description: 'Perizia estimativa dell\'immobile richiesta dalla banca per la concessione del mutuo',
    jsonSchema: objectSchema({
        perito: text('Nome e cognome del perito incaricato'),
        dataPerizia: date('Data della perizia in formato europeo DD.MM.YYYY'),
        indirizzo: text('Indirizzo completo dell\'immobile periziato'),
        foglio: text('Foglio catastale'),
        particella: text('Particella catastale'),
        subalterno: text('Subalterno'),
        valoreStimato: num('Valore di stima dell\'immobile in Euro'),
        superficieCommerciale: num('Superficie commerciale in mq'),
        statoConservazione: text('Stato di conservazione (es. buono, ottimo, da ristrutturare)'),
        conformitaCatastale: text('Esito verifica conformità catastale'),
        conformitaUrbanistica: text('Esito verifica conformità urbanistica'),
        note: text('Note o osservazioni del perito — copiare TESTUALMENTE dal documento. Se non ci sono note, restituire stringa vuota.'),
    }, ['perito', 'dataPerizia', 'indirizzo', 'valoreStimato']),
};

const contrattoMutuo: DocumentTypeDef = {
    id: DOC_IDS.CONTRATTO_MUTUO,
    name: 'Contratto di Mutuo',
    description: 'Contratto di mutuo ipotecario stipulato contestualmente al rogito',
    jsonSchema: objectSchema({
        banca: text('Nome della banca o istituto di credito'),
        mutuatario: text('Nome e cognome del mutuatario'),
        codiceFiscaleMutuatario: codiceFiscale('Codice Fiscale del mutuatario (extract without spaces)'),
        importoMutuo: num('Importo del mutuo erogato in Euro'),
        durataAnni: num('Durata del mutuo in anni'),
        tassoInteresse: text('Tasso di interesse e percentuale'),
        tipoTasso: enumField('Tipo di tasso', ['fisso', 'variabile', 'misto']),
        rataMensile: num('Importo rata mensile in Euro'),
        notaio: text('Nome e cognome del notaio rogante'),
        dataStipula: date('Data di stipula in formato europeo DD.MM.YYYY'),
        numeroRepertorio: text('Numero di repertorio'),
        ipoteca: text('Grado e importo dell\'ipoteca iscritta'),
    }, ['banca', 'mutuatario', 'codiceFiscaleMutuatario', 'importoMutuo', 'dataStipula', 'notaio']),
};

const mezziPagamento: DocumentTypeDef = {
    id: DOC_IDS.MEZZI_PAGAMENTO,
    name: 'Dichiarazione Mezzi di Pagamento',
    description: 'Dichiarazione analitica dei mezzi di pagamento utilizzati nella compravendita (Art. 35 D.Lgs. 223/2006)',
    jsonSchema: objectSchema({
        pagamenti: arrayOfObjects({
            tipo: text('Tipo di pagamento (es. assegno circolare, bonifico bancario, mutuo fondiario)'),
            importo: num('Importo in Euro'),
            numeroBonifico: text('Numero CRO/TRN del bonifico o numero assegno'),
            bancaEmittente: text('Banca emittente dell\'assegno o ordinante del bonifico'),
            dataPagamento: date('Data del pagamento in formato europeo DD.MM.YYYY'),
            intestatario: text('Intestatario del mezzo di pagamento'),
        }, ['tipo', 'importo'], 'Elenco analitico di tutti i mezzi di pagamento'),
        importoTotale: num('Importo totale dei pagamenti in Euro'),
        mediatore: text('Nome dell\'agenzia o mediatore, se presente'),
        provvigione: num('Importo della provvigione del mediatore in Euro'),
    }, ['pagamenti', 'importoTotale']),
};

// ─── Export ─────────────────────────────────────────────────────────────────

export const documentTypes: DocumentTypeDef[] = [
    documentoContatto,
    documentoIdentita,
    attoProvenienza,
    contrattoPrelim,
    propostaAcquisto,
    visuraCatastale,
    planimetria,
    ape,
    tesseraSanitaria,
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
    permsessoSoggiorno,
    visuraCamerale,
    procura,
];
