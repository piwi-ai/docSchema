/**
 * Contratto di Finanziamento — Vehicle financing contract.
 * Used by: car-dealership.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, num, objectSchema, ref, codiceFiscale, targa } from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const finanziamento: DocumentTypeDef = {
    id: 'doc-finanziamento',
    name: 'Contratto di Finanziamento',
    description: 'Contratto di finanziamento per acquisto veicolo (prestito, leasing)',
    references: [
        ref(
            "Banca d'Italia — Credito ai consumatori",
            'https://www.bancaditalia.it/compiti/vigilanza/normativa/archivio-norme/disposizioni/trasparenza/index.html',
            ReferenceType.REGULATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            finanziaria: text('Nome della finanziaria / banca'),
            numeroContratto: text('Numero contratto'),
            importoFinanziato: num('Importo finanziato in Euro'),
            durataRateMesi: num('Durata in mesi'),
            importoRata: num('Importo rata mensile in Euro'),
            tan: num('Tasso Annuo Nominale (TAN) in %'),
            taeg: num('Tasso Annuo Effettivo Globale (TAEG) in %'),
            anticipoVersato: num('Anticipo versato in Euro'),
            maxiRataFinale: num('Eventuale maxi-rata finale / valore futuro garantito in Euro'),
            nomeCliente: text('Nome e cognome del cliente finanziato'),
            codiceFiscaleCliente: codiceFiscale(),
            targa: targa(),
        },
        [
            'finanziaria',
            'importoFinanziato',
            'durataRateMesi',
            'importoRata',
            'nomeCliente',
            'codiceFiscaleCliente',
        ],
    ),
};
