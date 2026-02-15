/**
 * Attestato di Rischio — RCA risk certificate.
 * Used by: insurance.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, num, date, enumField, objectSchema, arrayOfObjects, ref,
    codiceFiscale, targa,
} from '../../../helpers/it.js';

export const attestatoRischio: DocumentTypeDef = {
    id: 'doc-attestato-rischio',
    name: 'Attestato di Rischio',
    description: 'Attestato di rischio RCA — classe di merito, sinistri pregressi',
    references: [
        ref('IVASS — Attestato di Rischio', 'https://www.ivass.it/consumatori/sos-assicurati/attestato-rischio/index.html', 'documentation'),
        ref('Regolamento IVASS n. 9/2015', 'https://www.ivass.it/normativa/nazionale/secondaria-ivass/regolamenti/2015/n9/', 'regulation'),
    ],
    jsonSchema: objectSchema({
        compagnia: text('Compagnia assicurativa emittente'),
        contraente: text('Nome e cognome del contraente'),
        codiceFiscaleContraente: codiceFiscale(),
        targa: targa(),
        classeMeritoProvenienza: text('Classe di merito CU provenienza'),
        classeMeritoAssegnazione: text('Classe di merito CU assegnazione'),
        sinistri: arrayOfObjects({
            anno: num('Anno del sinistro'),
            responsabilita: enumField('Tipo responsabilità', ['principale', 'paritaria', 'nessuna']),
            tipo: text('Tipo sinistro (cose, persone)'),
            importo: num('Importo liquidato in Euro'),
        }, ['anno', 'responsabilita'], 'Tabella sinistri ultimi 5 anni'),
        anniAssicurazione: num('Anni di osservazione assicurativa'),
        dataEmissione: date('Data emissione attestato'),
    }, ['compagnia', 'contraente', 'targa', 'classeMeritoProvenienza', 'classeMeritoAssegnazione']),
};
