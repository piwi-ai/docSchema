/**
 * Tests for helper functions.
 *
 * Validates that schema primitives and country-specific helpers produce
 * correctly shaped JSON Schema fragments.
 */
import { describe, it, expect } from 'vitest';

import { text, num, enumField, email, objectSchema, arrayOfObjects } from '../src/helpers/schema';
import { date, nome, cognome, codiceFiscale, partitaIva, statoCivile, targa, telaio } from '../src/helpers/it';
import { dateUS, firstName, lastName, ssn, ein, currency, address, parcelNumber } from '../src/helpers/us';

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
    it('date() returns DD.MM.YYYY pattern', () => {
        const f = date();
        expect(f.type).toBe('string');
        expect(f.pattern).toContain('\\d{2}');
        expect(f.description).toContain('DD.MM.YYYY');
    });

    it('nome() and cognome() return string with Italian description', () => {
        expect(nome().type).toBe('string');
        expect(nome().description).toContain('Nome');
        expect(cognome().type).toBe('string');
        expect(cognome().description).toContain('Cognome');
    });

    it('codiceFiscale() has 16-char alphanumeric pattern', () => {
        const f = codiceFiscale();
        expect(f.type).toBe('string');
        expect(f.pattern).toBeDefined();
        expect(f.pattern).toContain('[A-Z]');
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
    it('dateUS() returns MM/DD/YYYY pattern', () => {
        const f = dateUS();
        expect(f.type).toBe('string');
        expect(f.description).toContain('MM/DD/YYYY');
    });

    it('firstName() and lastName() return strings', () => {
        expect(firstName().type).toBe('string');
        expect(lastName().type).toBe('string');
    });

    it('ssn() has XXX-XX-XXXX pattern', () => {
        const f = ssn();
        expect(f.type).toBe('string');
        expect(f.pattern).toBeDefined();
        expect(f.description).toContain('Social Security');
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
