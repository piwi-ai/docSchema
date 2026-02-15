import { describe, it, expect } from 'vitest'
import { syntaxHighlight, getConfigFilename } from '../utils/json'

describe('syntaxHighlight', () => {
    it('wraps string values with json-string class', () => {
        const result = syntaxHighlight('"hello"');
        expect(result).toContain('class="json-string"');
        expect(result).toContain('"hello"');
    });

    it('wraps keys with json-key class', () => {
        const json = JSON.stringify({ name: 'test' }, null, 2);
        const result = syntaxHighlight(json);
        expect(result).toContain('class="json-key"');
    });

    it('wraps numbers with json-number class', () => {
        const result = syntaxHighlight('42');
        expect(result).toContain('class="json-number"');
    });

    it('wraps booleans with json-boolean class', () => {
        const result = syntaxHighlight('true');
        expect(result).toContain('class="json-boolean"');
    });

    it('wraps null with json-null class', () => {
        const result = syntaxHighlight('null');
        expect(result).toContain('class="json-null"');
    });

    it('handles complex JSON correctly', () => {
        const json = JSON.stringify({ id: 'doc-1', count: 3, active: true, meta: null }, null, 2);
        const result = syntaxHighlight(json);
        expect(result).toContain('class="json-key"');
        expect(result).toContain('class="json-string"');
        expect(result).toContain('class="json-number"');
        expect(result).toContain('class="json-boolean"');
        expect(result).toContain('class="json-null"');
    });
});

describe('getConfigFilename', () => {
    it('converts slug to path-style filename', () => {
        expect(getConfigFilename('real-estate-it')).toBe('real-estate/it.config.json');
        expect(getConfigFilename('car-dealership-it')).toBe('car-dealership/it.config.json');
        expect(getConfigFilename('accountant-it')).toBe('accountant/it.config.json');
        expect(getConfigFilename('insurance-it')).toBe('insurance/it.config.json');
        expect(getConfigFilename('real-estate-us')).toBe('real-estate/us.config.json');
    });

    it('handles slug without dashes', () => {
        expect(getConfigFilename('simple')).toBe('simple.config.json');
    });
});
