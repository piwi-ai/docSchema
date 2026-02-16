/**
 * Polizza Assicurativa — Insurance policy.
 * Used by: insurance.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text,
    num,
    date,
    enumField,
    objectSchema,
    ref,
    nome,
    cognome,
    codiceFiscale,
    targa,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const polizza: DocumentTypeDef = {
    id: 'doc-polizza',
    name: 'Polizza Assicurativa',
    description:
        'Contratto di assicurazione — tutti i rami (RCA, vita, casa, infortuni, RC professionale)',
    references: [
        ref(
            'IVASS — Codice delle Assicurazioni Private',
            'https://www.ivass.it/normativa/nazionale/primaria/index.html',
            ReferenceType.REGULATION,
        ),
        ref(
            'ANIA — Associazione Nazionale Imprese Assicuratrici',
            'https://www.ania.it/',
            ReferenceType.DOCUMENTATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            compagnia: text('Compagnia assicurativa'),
            numeroPolizza: text('Numero polizza'),
            ramo: enumField('Ramo assicurativo', [
                'RCA',
                'vita',
                'casa',
                'infortuni',
                'RC professionale',
                'salute',
                'furto/incendio',
                'kasko',
                'trasporti',
                'altro',
            ]),
            contraente: objectSchema(
                {
                    nome: nome(),
                    cognome: cognome(),
                    codiceFiscale: codiceFiscale(),
                    indirizzo: text('Indirizzo del contraente'),
                },
                ['nome', 'cognome', 'codiceFiscale'],
            ),
            assicurato: objectSchema(
                {
                    nome: nome(),
                    cognome: cognome(),
                    codiceFiscale: codiceFiscale(),
                },
                ['nome', 'cognome', 'codiceFiscale'],
            ),
            targa: targa(),
            premioAnnuo: num('Premio annuo totale in Euro'),
            premioSemestrale: num('Premio semestrale in Euro (se frazionato)'),
            decorrenza: date('Data decorrenza copertura'),
            scadenza: date('Data scadenza copertura'),
            massimale: text('Massimale di copertura (es. Euro 6.450.000)'),
            franchigia: text('Eventuale franchigia o scoperto'),
            garanzie: text('Elenco garanzie incluse (separare con virgola)'),
            beneficiario: text('Beneficiario designato (per polizze vita)'),
        },
        [
            'compagnia',
            'numeroPolizza',
            'ramo',
            'contraente',
            'premioAnnuo',
            'decorrenza',
            'scadenza',
        ],
    ),
};
