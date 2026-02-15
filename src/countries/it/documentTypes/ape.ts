/**
 * APE — Attestato di Prestazione Energetica (Energy Performance Certificate).
 * Used by: real-estate.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    num, text, enumField, objectSchema, ref, datePattern,
} from '../../../helpers/it.js';

const CLASSE_ENERGETICA_VALUES = ['A4', 'A3', 'A2', 'A1', 'B', 'C', 'D', 'E', 'F', 'G'];

const DESTINAZIONE_USO_DESC = 'Destinazione d\'uso dell\'immobile (es. residenziale, ufficio, commerciale, industriale, agricolo, magazzino, autorimessa)';

export { DESTINAZIONE_USO_DESC };

export const ape: DocumentTypeDef = {
    id: 'doc-ape',
    name: 'APE - Certificato Energetico',
    description: 'Efficienza energetica obbligatoria per annunci e rogito',
    references: [
        ref('ENEA — Attestato di Prestazione Energetica', 'https://www.efficienzaenergetica.enea.it/', 'documentation'),
        ref('D.Lgs. 192/2005 — Rendimento energetico nell\'edilizia', 'https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2005-08-19;192', 'regulation'),
        ref('SIAPE — Sistema Informativo APE', 'https://siape.enea.it/', 'documentation'),
    ],
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
