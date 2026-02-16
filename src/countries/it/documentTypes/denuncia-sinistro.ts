/**
 * Denuncia Sinistro / CID — Accident report.
 * Used by: insurance.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text, date, enumField, objectSchema, ref,
    codiceFiscale, targa,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const denunciaSinistro: DocumentTypeDef = {
    id: 'doc-denuncia-sinistro',
    name: 'Denuncia Sinistro / CID',
    description: 'Constatazione amichevole (CAI/CID) o denuncia sinistro — dinamica, danni, veicoli',
    references: [
        ref('ANIA — Modulo CAI/CID', 'https://www.ania.it/it/sala-stampa/focus-on/focus-on-constatazione-amichevole-incidente', ReferenceType.DOCUMENTATION),
        ref('Art. 143 Codice delle Assicurazioni — Denuncia sinistro', 'https://www.ivass.it/normativa/nazionale/primaria/index.html', ReferenceType.REGULATION),
    ],
    jsonSchema: objectSchema({
        numeroSinistro: text('Numero sinistro assegnato dalla compagnia (se già presente)'),
        dataSinistro: date('Data del sinistro'),
        oraSinistro: text('Ora del sinistro (es. 14:30)'),
        luogoSinistro: text('Luogo del sinistro (indirizzo, comune, provincia)'),
        dinamica: text("Descrizione della dinamica dell'incidente — copia VERBATIM dal modulo"),
        veicoloA: objectSchema({
            targa: targa(), marca: text('Marca'), modello: text('Modello'),
            contraente: text('Nome cognome contraente'),
            codiceFiscale: codiceFiscale(),
            compagnia: text('Compagnia assicurativa'),
            numeroPolizza: text('Numero polizza'),
            danni: text('Danni visibili al veicolo A'),
        }, ['targa', 'contraente']),
        veicoloB: objectSchema({
            targa: targa(), marca: text('Marca'), modello: text('Modello'),
            contraente: text('Nome cognome contraente'),
            codiceFiscale: text('Codice fiscale del contraente B'),
            compagnia: text('Compagnia assicurativa'),
            numeroPolizza: text('Numero polizza'),
            danni: text('Danni visibili al veicolo B'),
        }, ['targa']),
        feriti: enumField('Presenza di feriti', ['sì', 'no']),
        testimoni: text('Eventuali testimoni (nome e cognome)'),
        autoritaIntervenuta: enumField('Autorità intervenuta', ['Polizia Stradale', 'Carabinieri', 'Polizia Municipale', 'nessuna']),
    }, ['dataSinistro', 'luogoSinistro', 'dinamica', 'veicoloA']),
};
