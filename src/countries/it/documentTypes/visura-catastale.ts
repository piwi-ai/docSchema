/**
 * Visura Catastale — Cadastral survey.
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text,
    num,
    enumField,
    objectSchema,
    arrayOfObjects,
    ref,
    nome,
    cognome,
    codiceFiscale,
} from '../helpers.js';
import { CATEGORIA_CATASTALE_VALUES } from './atto-provenienza.js';
import { ReferenceType } from '../../../constants.js';

const VISURA_LUOGO_DESC =
    'Città e dopo inserisci la sigla della provincia calcolata così:  Se la città è una di queste usa la sua sigla: Barletta-Andria-Trani (BT) Bolzano (BZ) Caltanissetta (CL) Campobasso (CB) Caserta (CE) Chieti (CH) Crotone (KR) Forlì-Cesena (FC) Lecco (LC) Mantova (MN) Massa-Carrara (MS) Messina (ME) Monza e della Brianza (MB) Parma (PR) Perugia (PG) Pesaro e Urbino (PU) Piacenza (PC) Pistoia (PT) Potenza (PZ) Ragusa (RG) Reggio Calabria (RC) Roma (RM) Siracusa (SR) Sud Sardegna (SU) Trapani (TP) Trieste (TS) Vibo Valentia (VV), se è un\'altra città crea la sigla con le prime due lettere del nome della città, possono essere più intestati identificati da un numero progressivo, separali con il numero progressivo seguito da \\\\"-\\\\"';

export const visuraCatastale: DocumentTypeDef = {
    id: 'doc-visura',
    name: 'Visura Catastale',
    description:
        "Stato attuale dell'immobile in Catasto. Può essere un fabbricato (con categoria, rendita, consistenza) o un terreno (con qualità, classe, superficie, redditi).",
    references: [
        ref(
            'Agenzia delle Entrate — Consultazione dati catastali',
            'https://www.agenziaentrate.gov.it/portale/web/guest/schede/fabbricatiterreni/visura-catastale',
            ReferenceType.DOCUMENTATION,
        ),
        ref(
            'Sister — Servizi catastali online',
            'https://sister.agenziaentrate.gov.it/',
            ReferenceType.DOCUMENTATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            foglio: text('Foglio catastale'),
            particella: text('Particella catastale'),
            subalterno: text('Subalterno'),
            sezione: text('Sezione catastale (es. ABBIATEGUAZZONE, può essere vuoto)'),
            comuneCatastale: text(
                'Comune catastale con codice — copia ESATTAMENTE come scritto (es. TRADATE (L319B))',
            ),
            indirizzoCatastale: text("Indirizzo dell'immobile se presente"),
            piano: text(
                'Piano dell\'immobile — solo il numero o codice (es. S1, T, 1, 2). NON aggiungere descrizioni come "Secondo" o "Piano Terra"',
            ),
            categoriaCatastale: enumField(
                'Categoria catastale (es. A/2, A/10, C/6) — solo per fabbricati',
                CATEGORIA_CATASTALE_VALUES,
            ),
            classe: text('Classe catastale (numero)'),
            renditaCatastale: num('Rendita catastale in Euro — solo per fabbricati'),
            consistenza: text('Consistenza: vani per abitazioni, mq per altre categorie'),
            qualita: text(
                'Qualità colturale del terreno (es. SEMIN ARBOR, PRATO, VIGNETO) — solo per terreni',
            ),
            superficie: text('Superficie totale in mq'),
            superficieEscluseAreeScoperte: text('Superficie totale escluse aree scoperte in mq'),
            redditoDominicale: num('Reddito dominicale in Euro — solo per terreni'),
            redditoAgrario: num('Reddito agrario in Euro — solo per terreni'),
            intestatiCatastali: arrayOfObjects(
                {
                    cognome: cognome(),
                    nome: nome(),
                    codiceFiscale: codiceFiscale(),
                    dataNascita: text('Data di nascita in formato DD/MM/YYYY'),
                    luogoNascita: text(VISURA_LUOGO_DESC),
                    diritto: text(
                        'Tipo di diritto e quota (es. Proprietà per 1/1, Proprietà per 1/2, Nuda proprietà per 1/1, Usufrutto per 1/1)',
                    ),
                },
                ['cognome', 'nome', 'codiceFiscale', 'dataNascita', 'luogoNascita', 'diritto'],
                'Elenco degli intestatari catastali con diritti e quote',
            ),
        },
        ['foglio', 'particella', 'subalterno', 'comuneCatastale', 'intestatiCatastali'],
    ),
};
