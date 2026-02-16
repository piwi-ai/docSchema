/**
 * Tests for helper functions.
 *
 * Validates that schema primitives and country-specific helpers produce
 * correctly shaped JSON Schema fragments.
 */
import { describe, it, expect } from 'vitest';

import { text, num, enumField, email, objectSchema, arrayOfObjects } from '../src/helpers/schema';
import { date, nome, cognome, codiceFiscale, partitaIva, statoCivile, targa, telaio } from '../src/countries/it/helpers';
import { dateUS, firstName, lastName, ssn, ein, currency, address, parcelNumber } from '../src/countries/us/helpers';

// ─── Universal Primitives ───────────────────────────────────────────────────

describe('schema helpers', () => {
    it('text() returns string type', () => {
        const f = text('test');
        expect(f.type).toBe('string');
        expect(f.description).toBe('test');
    });

    it('num() returns number type', () => {
        const f = num('amount');
        expect(f.type).toBe('number');
        expect(f.description).toBe('amount');
    });

    it('enumField() returns string with enum including null', () => {
        const f = enumField('status', ['a', 'b']);
        expect(f.type).toBe('string');
        expect(f.enum).toContain('a');
        expect(f.enum).toContain('b');
        expect(f.enum).toContain(null);
        expect(f.nullable).toBe(true);
    });

    it('email() returns string with email format', () => {
        const f = email('contact');
        expect(f.type).toBe('string');
        expect(f.format).toBe('email');
    });

    it('objectSchema() wraps properties and required', () => {
        const schema = objectSchema({ name: text('') }, ['name']);
        expect(schema.type).toBe('object');
        expect(schema.properties).toBeDefined();
        expect(schema.required).toEqual(['name']);
    });

    it('arrayOfObjects() creates array with object items', () => {
        const schema = arrayOfObjects({ item: text('') }, ['item'], 'list');
        expect(schema.type).toBe('array');
        expect(schema.description).toBe('list');
        expect((schema.items as Record<string, unknown>).type).toBe('object');
    });
});

// ─── Italian Helpers ────────────────────────────────────────────────────────

describe('Italian helpers', () => {
    it('date() pattern matches DD.MM.YYYY strings', () => {
        const f = date();
        expect(f.type).toBe('string');
        expect(f.description).toContain('DD.MM.YYYY');
        // Pattern must be a valid regex that matches real dates
        const re = new RegExp(f.pattern!);
        expect(re.test('15.01.2021')).toBe(true);
        expect(re.test('01.12.1999')).toBe(true);
        // Must reject non-dates
        expect(re.test('15/01/2021')).toBe(false);
        expect(re.test('abc')).toBe(false);
    });

    it('nome() and cognome() return string with Italian description', () => {
        expect(nome().type).toBe('string');
        expect(nome().description).toContain('Nome');
        expect(cognome().type).toBe('string');
        expect(cognome().description).toContain('Cognome');
    });

    it('codiceFiscale() pattern matches valid Codice Fiscale', () => {
        const f = codiceFiscale();
        expect(f.type).toBe('string');
        const re = new RegExp(f.pattern!);
        expect(re.test('RSSMRA80A01H501U')).toBe(true);
        expect(re.test('rssmra80a01h501u')).toBe(false); // lowercase
        expect(re.test('INVALID')).toBe(false);
    });

    it('partitaIva() returns string', () => {
        expect(partitaIva().type).toBe('string');
        expect(partitaIva().description).toContain('Partita IVA');
    });

    it('statoCivile() returns enum', () => {
        const f = statoCivile();
        expect(f.type).toBe('string');
        expect(f.enum).toContain('coniugato');
        expect(f.enum).toContain(null);
    });

    it('targa() and telaio() return strings', () => {
        expect(targa().type).toBe('string');
        expect(telaio().type).toBe('string');
        expect(telaio().description).toContain('VIN');
    });
});

// ─── US Helpers ─────────────────────────────────────────────────────────────

describe('US helpers', () => {
    it('dateUS() pattern matches MM/DD/YYYY strings', () => {
        const f = dateUS();
        expect(f.type).toBe('string');
        expect(f.description).toContain('MM/DD/YYYY');
        const re = new RegExp(f.pattern!);
        expect(re.test('01/15/2021')).toBe(true);
        expect(re.test('12/31/1999')).toBe(true);
        expect(re.test('15.01.2021')).toBe(false);
        expect(re.test('abc')).toBe(false);
    });

    it('firstName() and lastName() return strings', () => {
        expect(firstName().type).toBe('string');
        expect(lastName().type).toBe('string');
    });

    it('ssn() pattern matches XXX-XX-XXXX strings', () => {
        const f = ssn();
        expect(f.type).toBe('string');
        expect(f.description).toContain('Social Security');
        const re = new RegExp(f.pattern!);
        expect(re.test('123-45-6789')).toBe(true);
        expect(re.test('000-00-0000')).toBe(true);
        expect(re.test('12345-6789')).toBe(false);
        expect(re.test('abc')).toBe(false);
    });

    it('ein() returns string', () => {
        expect(ein().type).toBe('string');
        expect(ein().description).toContain('EIN');
    });

    it('currency() returns number type', () => {
        const f = currency('price');
        expect(f.type).toBe('number');
        expect(f.description).toContain('USD');
    });

    it('address() returns string', () => {
        const f = address();
        expect(f.type).toBe('string');
        expect(f.description).toContain('Street');
    });

    it('parcelNumber() returns string', () => {
        expect(parcelNumber().type).toBe('string');
    });
});
