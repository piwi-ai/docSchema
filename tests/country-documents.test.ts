/**
 * Tests for all European country document types.
 *
 * Validates that every country in the registry produces a valid
 * identity-card DocumentTypeDef with correct structure, localized labels,
 * and working date patterns.
 */
import { describe, it, expect } from 'vitest';

import { EU_COUNTRIES, ALL_COUNTRY_CODES } from '../src/country-registry';
import { createIdentityCard } from '../src/factories/identity-card.factory';
import { createPassport } from '../src/factories/passport.factory';
import { createDriversLicense } from '../src/factories/drivers-license.factory';
import { createResidencePermit } from '../src/factories/residence-permit.factory';
import { createCountryHelpers } from '../src/factories/country-helpers.factory';
import {
    DocTypeId,
    PassportField,
    DriversLicenseField,
    ResidencePermitField,
} from '../src/constants';

// ─── Registry Integrity ─────────────────────────────────────────────────────

describe('country registry', () => {
    it('has at least 30 countries', () => {
        expect(ALL_COUNTRY_CODES.length).toBeGreaterThanOrEqual(30);
    });

    it('all codes are lowercase 2-letter', () => {
        for (const code of ALL_COUNTRY_CODES) {
            expect(code).toMatch(/^[a-z]{2}$/);
        }
    });

    it('all countries have required metadata', () => {
        for (const code of ALL_COUNTRY_CODES) {
            const c = EU_COUNTRIES[code];
            expect(c.code).toBeTruthy();
            expect(c.name).toBeTruthy();
            expect(c.nativeName).toBeTruthy();
            expect(c.dateFormat).toBeTruthy();
            expect(c.datePattern).toBeTruthy();
            expect(c.personalIdName).toBeTruthy();
            expect(c.vatName).toBeTruthy();
        }
    });

    it('all countries have complete identity card labels', () => {
        const requiredKeys = [
            'firstName',
            'lastName',
            'personalId',
            'documentType',
            'documentNumber',
            'issueDate',
            'expirationDate',
            'issuingAuthority',
            'placeOfBirth',
            'dateOfBirth',
            'address',
            'nationality',
            'sex',
            'mrz',
        ];
        for (const code of ALL_COUNTRY_CODES) {
            const labels = EU_COUNTRIES[code].identityCardLabels;
            for (const key of requiredKeys) {
                expect(labels[key as keyof typeof labels], `${code}.${key}`).toBeTruthy();
            }
        }
    });

    it('ISO codes are uppercase in the meta objects', () => {
        for (const code of ALL_COUNTRY_CODES) {
            expect(EU_COUNTRIES[code].code).toBe(code.toUpperCase());
        }
    });
});

// ─── Identity Card Schema Tests ─────────────────────────────────────────────

describe.each(ALL_COUNTRY_CODES.map((cc) => [cc, EU_COUNTRIES[cc].name] as const))(
    'identity-card: %s (%s)',
    (code) => {
        const meta = EU_COUNTRIES[code];
        const card = createIdentityCard(meta);

        it('has id "doc-identity-card"', () => {
            expect(card.id).toBe('doc-identity-card');
        });

        it('has name and description', () => {
            expect(card.name).toBeTruthy();
            expect(card.description).toBeTruthy();
        });

        it('has a valid jsonSchema with type "object"', () => {
            expect(card.jsonSchema.type).toBe('object');
            expect(card.jsonSchema.properties).toBeDefined();
            expect(card.jsonSchema.required).toBeDefined();
            expect(Array.isArray(card.jsonSchema.required)).toBe(true);
        });

        it('has all expected fields in properties', () => {
            const props = Object.keys(card.jsonSchema.properties as Record<string, unknown>);
            expect(props).toContain('firstName');
            expect(props).toContain('lastName');
            expect(props).toContain('personalId');
            expect(props).toContain('documentType');
            expect(props).toContain('documentNumber');
            expect(props).toContain('issueDate');
            expect(props).toContain('expirationDate');
            expect(props).toContain('issuingAuthority');
            expect(props).toContain('placeOfBirth');
            expect(props).toContain('dateOfBirth');
            expect(props).toContain('address');
            // New standard fields
            expect(props).toContain('nationality');
            expect(props).toContain('sex');
            expect(props).toContain('mrz');
        });

        it('all required fields exist in properties', () => {
            const props = Object.keys(card.jsonSchema.properties as Record<string, unknown>);
            for (const req of card.jsonSchema.required as string[]) {
                expect(props).toContain(req);
            }
        });

        it('sex field has M/F/X enum', () => {
            const sex = (card.jsonSchema.properties as Record<string, any>).sex;
            expect(sex.enum).toContain('M');
            expect(sex.enum).toContain('F');
            expect(sex.enum).toContain('X');
            expect(sex.enum).toContain(null); // nullable
        });

        it('date pattern is a valid regex matching expected format', () => {
            const re = new RegExp(meta.datePattern);
            const format = meta.dateFormat;

            // Generate a test date based on the format
            if (format.startsWith('DD')) {
                // DD.MM.YYYY, DD/MM/YYYY, DD-MM-YYYY
                const sep = format.charAt(2);
                expect(re.test(`15${sep}01${sep}2021`)).toBe(true);
                expect(re.test('abc')).toBe(false);
            } else if (format.startsWith('YYYY')) {
                // YYYY-MM-DD, YYYY.MM.DD
                const sep = format.charAt(4);
                expect(re.test(`2021${sep}01${sep}15`)).toBe(true);
                expect(re.test('abc')).toBe(false);
            }
        });
    },
);

// ─── Country Helpers Tests ──────────────────────────────────────────────────

describe.each(ALL_COUNTRY_CODES.map((cc) => [cc, EU_COUNTRIES[cc].name] as const))(
    'helpers: %s (%s)',
    (code) => {
        const meta = EU_COUNTRIES[code];
        const h = createCountryHelpers(meta);

        it('date() returns string with pattern', () => {
            const d = h.date();
            expect(d.type).toBe('string');
            expect(d.pattern).toBe(meta.datePattern);
            expect(d.description).toContain(meta.dateFormat);
        });

        it('firstName() and lastName() return strings', () => {
            expect(h.firstName().type).toBe('string');
            expect(h.lastName().type).toBe('string');
        });

        it('personalId() has correct country-specific name', () => {
            const pid = h.personalId();
            expect(pid.type).toBe('string');
            expect(pid.description).toBe(meta.personalIdName);
        });

        it('vat() has correct country-specific name', () => {
            const v = h.vat();
            expect(v.type).toBe('string');
            expect(v.description).toBe(meta.vatName);
        });

        it('re-exports universal primitives', () => {
            expect(typeof h.text).toBe('function');
            expect(typeof h.num).toBe('function');
            expect(typeof h.enumField).toBe('function');
            expect(typeof h.email).toBe('function');
            expect(typeof h.objectSchema).toBe('function');
            expect(typeof h.arrayOfObjects).toBe('function');
        });
    },
);

// ─── Passport Schema Tests ──────────────────────────────────────────────────

describe.each(ALL_COUNTRY_CODES.map((cc) => [cc, EU_COUNTRIES[cc].name] as const))(
    'passport: %s (%s)',
    (code) => {
        const meta = EU_COUNTRIES[code];
        const pp = createPassport(meta);

        it('has correct id', () => {
            expect(pp.id).toBe(DocTypeId.PASSPORT);
        });

        it('has a valid jsonSchema with type "object"', () => {
            expect(pp.jsonSchema.type).toBe('object');
            expect(pp.jsonSchema.properties).toBeDefined();
        });

        it('has all expected fields', () => {
            const props = Object.keys(pp.jsonSchema.properties as Record<string, unknown>);
            expect(props).toContain(PassportField.FIRST_NAME);
            expect(props).toContain(PassportField.LAST_NAME);
            expect(props).toContain(PassportField.PASSPORT_NUMBER);
            expect(props).toContain(PassportField.NATIONALITY);
            expect(props).toContain(PassportField.SEX);
            expect(props).toContain(PassportField.ISSUING_COUNTRY);
            expect(props).toContain(PassportField.MRZ);
        });

        it('all required fields exist in properties', () => {
            const props = Object.keys(pp.jsonSchema.properties as Record<string, unknown>);
            for (const req of pp.jsonSchema.required as string[]) {
                expect(props).toContain(req);
            }
        });

        it('sex field has M/F/X enum', () => {
            const sex = (pp.jsonSchema.properties as Record<string, any>).sex;
            expect(sex.enum).toContain('M');
            expect(sex.enum).toContain('F');
            expect(sex.enum).toContain('X');
        });
    },
);

// ─── Driver's License Schema Tests ──────────────────────────────────────────

describe.each(ALL_COUNTRY_CODES.map((cc) => [cc, EU_COUNTRIES[cc].name] as const))(
    'drivers-license: %s (%s)',
    (code) => {
        const meta = EU_COUNTRIES[code];
        const dl = createDriversLicense(meta);

        it('has correct id', () => {
            expect(dl.id).toBe(DocTypeId.DRIVERS_LICENSE);
        });

        it('has a valid jsonSchema with type "object"', () => {
            expect(dl.jsonSchema.type).toBe('object');
            expect(dl.jsonSchema.properties).toBeDefined();
        });

        it('has all expected fields', () => {
            const props = Object.keys(dl.jsonSchema.properties as Record<string, unknown>);
            expect(props).toContain(DriversLicenseField.FIRST_NAME);
            expect(props).toContain(DriversLicenseField.LICENSE_NUMBER);
            expect(props).toContain(DriversLicenseField.CATEGORIES);
            expect(props).toContain(DriversLicenseField.ADDRESS);
            expect(props).toContain(DriversLicenseField.SEX);
        });

        it('categories includes EU Directive 2006/126/EC values', () => {
            const cats = (dl.jsonSchema.properties as Record<string, any>).categories;
            expect(cats.enum).toContain('B');
            expect(cats.enum).toContain('AM');
            expect(cats.enum).toContain('CE');
        });

        it('all required fields exist in properties', () => {
            const props = Object.keys(dl.jsonSchema.properties as Record<string, unknown>);
            for (const req of dl.jsonSchema.required as string[]) {
                expect(props).toContain(req);
            }
        });
    },
);

// ─── Residence Permit Schema Tests ──────────────────────────────────────────

describe.each(ALL_COUNTRY_CODES.map((cc) => [cc, EU_COUNTRIES[cc].name] as const))(
    'residence-permit: %s (%s)',
    (code) => {
        const meta = EU_COUNTRIES[code];
        const rp = createResidencePermit(meta);

        it('has correct id', () => {
            expect(rp.id).toBe(DocTypeId.RESIDENCE_PERMIT);
        });

        it('has a valid jsonSchema with type "object"', () => {
            expect(rp.jsonSchema.type).toBe('object');
            expect(rp.jsonSchema.properties).toBeDefined();
        });

        it('has all expected fields', () => {
            const props = Object.keys(rp.jsonSchema.properties as Record<string, unknown>);
            expect(props).toContain(ResidencePermitField.FIRST_NAME);
            expect(props).toContain(ResidencePermitField.PERMIT_NUMBER);
            expect(props).toContain(ResidencePermitField.PERMIT_TYPE);
            expect(props).toContain(ResidencePermitField.NATIONALITY);
            expect(props).toContain(ResidencePermitField.REMARKS);
            expect(props).toContain(ResidencePermitField.MRZ);
        });

        it('permit type includes standard EU values', () => {
            const pt = (rp.jsonSchema.properties as Record<string, any>).permitType;
            expect(pt.enum).toContain('Temporary');
            expect(pt.enum).toContain('Permanent');
            expect(pt.enum).toContain('Work');
            expect(pt.enum).toContain('Student');
        });

        it('all required fields exist in properties', () => {
            const props = Object.keys(rp.jsonSchema.properties as Record<string, unknown>);
            for (const req of rp.jsonSchema.required as string[]) {
                expect(props).toContain(req);
            }
        });
    },
);
