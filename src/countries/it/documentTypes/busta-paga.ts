/**
 * Busta Paga / Cedolino — Monthly payslip.
 * Used by: accountant.
 */
import type { DocumentTypeDef } from '../../../types.js';
import { text, num, objectSchema, ref, nome, cognome, codiceFiscale } from '../helpers.js';
import { ReferenceType } from '../../../constants.js';

export const bustaPaga: DocumentTypeDef = {
    id: 'doc-busta-paga',
    name: 'Busta Paga / Cedolino',
    description: 'Cedolino paga mensile — lordo, netto, ritenute, contributi',
    references: [
        ref(
            'INPS — Contributi e aliquote',
            'https://www.inps.it/it/it/dettaglio-scheda.schede-servizio-strumento.schede-servizi.contribuzione-obbligatoria-50498.contribuzione-obbligatoria.html',
            ReferenceType.DOCUMENTATION,
        ),
    ],
    jsonSchema: objectSchema(
        {
            datore: text('Denominazione del datore di lavoro'),
            dipendente: objectSchema(
                {
                    nome: nome(),
                    cognome: cognome(),
                    codiceFiscale: codiceFiscale(),
                },
                ['nome', 'cognome', 'codiceFiscale'],
            ),
            mese: text('Mese di competenza (es. Gennaio 2025)'),
            anno: num('Anno di competenza'),
            retribuzioneLorda: num('Retribuzione lorda del mese in Euro'),
            contributiInps: num('Contributi INPS a carico dipendente in Euro'),
            irpefLorda: num('IRPEF lorda in Euro'),
            detrazioni: num("Detrazioni d'imposta in Euro"),
            irpefNetta: num('IRPEF netta in Euro'),
            retribuzioneNetta: num('Retribuzione netta (netto in busta) in Euro'),
            tfr: num('Quota TFR maturata nel mese in Euro'),
            oreLavorate: num('Ore lavorate nel mese'),
            oreAssenza: num('Ore di assenza (ferie, malattia, ecc.)'),
        },
        ['dipendente', 'mese', 'retribuzioneLorda', 'retribuzioneNetta'],
    ),
};
