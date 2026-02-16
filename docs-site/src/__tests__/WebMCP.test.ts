import { describe, it, expect } from 'vitest';
import {
    listVerticals,
    getVerticalData,
    getDocumentTypes,
    getDocumentSchema,
    getEntityTypes,
    getFullConfig,
    listCountries,
    getDocumentsByCountry,
    searchDocuments,
    getDocumentDetail,
} from '../components/WebMCP';
import { getStats } from '../data/configs';
import { getDocLibraryStats } from '../data/documents';

/* ── Vertical tools ──────────────────────────────────────────── */

describe('WebMCP – vertical tools', () => {
    it('listVerticals returns all 5 verticals with correct shape', () => {
        const result = listVerticals();
        expect(result).toHaveLength(5);
        for (const v of result) {
            expect(v).toHaveProperty('slug');
            expect(v).toHaveProperty('name');
            expect(v).toHaveProperty('country');
            expect(v).toHaveProperty('flag');
            expect(v).toHaveProperty('documentTypeCount');
            expect(v).toHaveProperty('entityTypeCount');
            expect(v.documentTypeCount).toBeGreaterThan(0);
            expect(v.entityTypeCount).toBeGreaterThan(0);
        }
    });

    it('getStats returns non-zero aggregate stats', () => {
        const stats = getStats();
        expect(stats.totalVerticals).toBe(5);
        expect(stats.totalDocTypes).toBeGreaterThan(0);
        expect(stats.totalEntityTypes).toBeGreaterThan(0);
        expect(stats.totalFields).toBeGreaterThan(0);
    });

    it('getDocumentTypes returns doc types for a valid slug', () => {
        const result = getDocumentTypes('accountant-it');
        expect(Array.isArray(result)).toBe(true);
        expect((result as unknown[]).length).toBeGreaterThan(0);
        const first = (result as Record<string, unknown>[])[0];
        expect(first).toHaveProperty('id');
        expect(first).toHaveProperty('name');
        expect(first).toHaveProperty('fieldCount');
    });

    it('getDocumentTypes returns error for invalid slug', () => {
        const result = getDocumentTypes('nonexistent') as { error: string };
        expect(result.error).toContain('not found');
    });

    it('getDocumentSchema returns full doc type for valid IDs', () => {
        const verticals = listVerticals();
        const slug = verticals[0].slug;
        const docTypes = getDocumentTypes(slug) as { id: string }[];
        const docTypeId = docTypes[0].id;

        const result = getDocumentSchema(slug, docTypeId);
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('jsonSchema');
    });

    it('getDocumentSchema returns error for invalid doc type', () => {
        const result = getDocumentSchema('accountant-it', 'nonexistent') as { error: string };
        expect(result.error).toContain('not found');
    });

    it('getEntityTypes returns entity types for a valid slug', () => {
        const result = getEntityTypes('real-estate-it');
        expect(Array.isArray(result)).toBe(true);
        expect((result as unknown[]).length).toBeGreaterThan(0);
    });

    it('getFullConfig returns complete config for a valid slug', () => {
        const result = getFullConfig('insurance-it');
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('documentTypes');
        expect(result).toHaveProperty('entityTypes');
    });

    it('getVerticalData returns undefined for unknown slug', () => {
        expect(getVerticalData('unknown')).toBeUndefined();
    });
});

/* ── Document library tools ──────────────────────────────────── */

describe('WebMCP – document library tools', () => {
    it('listCountries returns all countries with correct shape', () => {
        const result = listCountries();
        expect(result.length).toBeGreaterThanOrEqual(10);
        for (const c of result) {
            expect(c).toHaveProperty('code');
            expect(c).toHaveProperty('name');
            expect(c).toHaveProperty('flag');
            expect(c).toHaveProperty('documentCount');
            expect(c.code).toHaveLength(2);
            expect(c.documentCount).toBeGreaterThan(0);
        }
    });

    it('getDocumentsByCountry returns docs for "it"', () => {
        const result = getDocumentsByCountry('it');
        expect(Array.isArray(result)).toBe(true);
        expect((result as unknown[]).length).toBeGreaterThan(0);
        const first = (result as Record<string, unknown>[])[0];
        expect(first).toHaveProperty('id');
        expect(first).toHaveProperty('name');
        expect(first).toHaveProperty('fieldCount');
    });

    it('getDocumentsByCountry returns error for unknown country', () => {
        const result = getDocumentsByCountry('zz') as { error: string };
        expect(result.error).toContain('No documents found');
    });

    it('searchDocuments finds docs matching query', () => {
        const result = searchDocuments('identity');
        expect(result.length).toBeGreaterThan(0);
        for (const doc of result) {
            const matchesQuery =
                doc.name.toLowerCase().includes('identity') ||
                doc.description.toLowerCase().includes('identity') ||
                doc.id.toLowerCase().includes('identity');
            expect(matchesQuery).toBe(true);
        }
    });

    it('searchDocuments returns empty array for no matches', () => {
        const result = searchDocuments('xyznonexistent123');
        expect(result).toHaveLength(0);
    });

    it('getDocumentDetail returns full schema for valid country+doc', () => {
        const countries = listCountries();
        const country = countries[0];
        const docs = getDocumentsByCountry(country.code);
        if (Array.isArray(docs) && docs.length > 0) {
            const docId = (docs[0] as { id: string }).id;
            const detail = getDocumentDetail(country.code, docId);
            expect(detail).toHaveProperty('id');
            expect(detail).toHaveProperty('jsonSchema');
        }
    });

    it('getDocumentDetail returns error for invalid doc', () => {
        const result = getDocumentDetail('it', 'nonexistent') as { error: string };
        expect(result.error).toContain('not found');
    });

    it('getDocLibraryStats returns non-zero totals', () => {
        const stats = getDocLibraryStats();
        expect(stats.totalCountries).toBeGreaterThanOrEqual(10);
        expect(stats.totalDocs).toBeGreaterThan(0);
    });
});
