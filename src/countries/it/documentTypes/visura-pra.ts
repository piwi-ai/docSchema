/**
 * Visura PRA — Public Vehicle Registry inspection.
 * Used by: car-dealership.
 */
import type { DocumentTypeDef } from '../../../types.js';
import {
    text,
    date,
    enumField,
    objectSchema,
    ref,
    codiceFiscale,
    targa,
    telaio,
} from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const visuraPra: DocumentTypeDef = {
    id: 'doc-visura-pra',
    name: 'Visura PRA',
    description: 'Visura del Pubblico Registro Automobilistico — gravami, fermi, ipoteche',
    references: [
        ref(
            'ACI — Visura PRA online',
            'https://www.aci.it/i-servizi/servizi-online/pra.html',
            ReferenceType.DOCUMENTATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            targa: targa(),
            telaio: telaio(),
            proprietario: text('Proprietario attuale'),
            codiceFiscaleProprietario: codiceFiscale(),
            fermoAmministrativo: enumField('Fermo amministrativo presente', ['sì', 'no']),
            ipoteche: text('Eventuali ipoteche iscritte'),
            gravami: text('Elenco gravami risultanti'),
            dataVisura: date('Data della visura'),
        },
        ['targa', 'proprietario', 'fermoAmministrativo'],
    ),
};
