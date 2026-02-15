import { describe, it, expect } from 'vitest'
import { verticals, getStats } from '../data/configs'

describe('verticals', () => {
    it('should contain exactly 5 verticals', () => {
        expect(verticals).toHaveLength(5);
    });

    it('each vertical has required metadata', () => {
        for (const v of verticals) {
            expect(v.slug).toBeTruthy();
            expect(v.flag).toBeTruthy();
            expect(v.country).toBeTruthy();
            expect(v.vertical).toBeTruthy();
            expect(v.config).toBeDefined();
        }
    });

    it('each vertical has a valid config structure', () => {
        for (const v of verticals) {
            expect(v.config.id).toBeTruthy();
            expect(v.config.name).toBeTruthy();
            expect(v.config.schemaVersion).toBeGreaterThanOrEqual(1);
            expect(Array.isArray(v.config.documentTypes)).toBe(true);
            expect(v.config.documentTypes.length).toBeGreaterThan(0);
            expect(Array.isArray(v.config.entityTypes)).toBe(true);
            expect(v.config.entityTypes.length).toBeGreaterThan(0);
        }
    });

    it('each document type has valid jsonSchema', () => {
        for (const v of verticals) {
            for (const dt of v.config.documentTypes) {
                expect(dt.id).toBeTruthy();
                expect(dt.name).toBeTruthy();
                expect(dt.jsonSchema).toBeDefined();
                expect(dt.jsonSchema.type).toBe('object');
                expect(dt.jsonSchema.properties).toBeDefined();
                expect(Object.keys(dt.jsonSchema.properties).length).toBeGreaterThan(0);
            }
        }
    });

    it('slugs are unique', () => {
        const slugs = verticals.map(v => v.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
    });
});

describe('getStats', () => {
    it('returns non-zero totals', () => {
        const stats = getStats();
        expect(stats.totalVerticals).toBe(5);
        expect(stats.totalDocTypes).toBeGreaterThan(0);
        expect(stats.totalEntityTypes).toBeGreaterThan(0);
        expect(stats.totalFields).toBeGreaterThan(0);
    });

    it('totalDocTypes matches sum of all vertical doc types', () => {
        const stats = getStats();
        const manual = verticals.reduce((sum, v) => sum + v.config.documentTypes.length, 0);
        expect(stats.totalDocTypes).toBe(manual);
    });

    it('totalEntityTypes matches sum of all vertical entity types', () => {
        const stats = getStats();
        const manual = verticals.reduce((sum, v) => sum + v.config.entityTypes.length, 0);
        expect(stats.totalEntityTypes).toBe(manual);
    });
});
