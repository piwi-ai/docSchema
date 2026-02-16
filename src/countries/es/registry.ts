/**
 * Spain — Country Metadata
 *
 * Auto-generated. Do not edit manually unless updating country data.
 */
import type { CountryMeta } from '../../country-registry.js';
import {  DateFormat, DATE_PATTERNS , ReferenceType } from '../../constants.js';

export const es: CountryMeta = {
        code: 'ES', name: 'Spain', nativeName: 'España',
        dateFormat: DateFormat.EU_SLASH, datePattern: DATE_PATTERNS[DateFormat.EU_SLASH],
        personalIdName: 'DNI / NIE',
        vatName: 'NIF / CIF',
        personalIdPattern: '^[0-9XYZ]\\d{7}[A-Z]$',
        documentReferences: {
          identityCard: [
                    {
                              title: 'Policía Nacional — DNI',
                              url: 'https://www.dnielectronico.es/PortalDNIe/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          passport: [
                    {
                              title: 'Policía Nacional — Pasaporte',
                              url: 'https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/pasaporte/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          driversLicense: [
                    {
                              title: 'DGT — Permisos',
                              url: 'https://www.dgt.es/nuestros-servicios/permisos-de-conducir/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ],
          residencePermit: [
                    {
                              title: 'Extranjería',
                              url: 'https://extranjeros.inclusion.gob.es/',
                              type: ReferenceType.DOCUMENTATION
                    }
          ]
},
        identityCardLabels: {
            firstName: 'First name / Nombre',
            lastName: 'Last name / Apellidos',
            personalId: 'Personal ID number / DNI / NIE',
            documentType: 'Document type / Tipo de documento',
            documentNumber: 'Document number / Número de documento',
            issueDate: 'Issue date / Fecha de expedición',
            expirationDate: 'Expiration date / Fecha de caducidad',
            issuingAuthority: 'Issuing authority / Autoridad de expedición',
            placeOfBirth: 'Place of birth / Lugar de nacimiento',
            dateOfBirth: 'Date of birth / Fecha de nacimiento',
            address: 'Residential address / Domicilio',
            nationality: 'Nationality / Nacionalidad',
            sex: 'Sex / Sexo',
            mrz: 'Machine Readable Zone (MRZ)',
        },
};
