/**
 * Tests for all business configurations.
 *
 * Validates structural integrity, cross-references between document types
 * and entity types, and ensures each config is self-consistent.
 */
import { describe, it, expect } from 'vitest';

import { accountantItConfig } from '../src/verticals/accountant/it';
import { carDealershipItConfig } from '../src/verticals/car-dealership/it';
import { insuranceItConfig } from '../src/verticals/insurance/it';
import { realEstateItConfig } from '../src/verticals/real-estate/it';
import { realEstateUsConfig } from '../src/verticals/real-estate/us';
import type { BusinessConfiguration } from '../src/types';

const ALL_CONFIGS: BusinessConfiguration[] = [
    accountantItConfig,
    carDealershipItConfig,
    insuranceItConfig,
    realEstateItConfig,
    realEstateUsConfig,
];

// ─── Per-Config Structural Tests ────────────────────────────────────────────

describe.each(ALL_CONFIGS.map(c => [c.name, c] as const))('%s', (_name, config) => {
    it('has a non-empty id, name, and description', () => {
        expect(config.id).toBeTruthy();
        expect(config.name).toBeTruthy();
        expect(config.description).toBeTruthy();
    });

    it('has schemaVersion 1', () => {
        expect(config.schemaVersion).toBe(1);
    });

    it('has at least 1 document type', () => {
        expect(config.documentTypes.length).toBeGreaterThan(0);
    });

    it('has at least 1 entity type', () => {
        expect(config.entityTypes.length).toBeGreaterThan(0);
    });


    // ── Document Types ────────────────────────────────────────────────────

    describe('document types', () => {
        it('all have unique IDs', () => {
            const ids = config.documentTypes.map(dt => dt.id);
            expect(new Set(ids).size).toBe(ids.length);
        });

        it('all have unique names', () => {
            const names = config.documentTypes.map(dt => dt.name);
            expect(new Set(names).size).toBe(names.length);
        });

        it('all have a jsonSchema with type "object"', () => {
            for (const dt of config.documentTypes) {
                expect(dt.jsonSchema).toBeDefined();
                expect(dt.jsonSchema.type).toBe('object');
                expect(dt.jsonSchema.properties).toBeDefined();
                expect(dt.jsonSchema.required).toBeDefined();
                expect(Array.isArray(dt.jsonSchema.required)).toBe(true);
            }
        });

        it('all required fields exist in properties', () => {
            for (const dt of config.documentTypes) {
                const props = Object.keys(dt.jsonSchema.properties as Record<string, unknown>);
                for (const req of dt.jsonSchema.required as string[]) {
                    expect(props).toContain(req);
                }
            }
        });
    });

    // ── Entity Types ──────────────────────────────────────────────────────

    describe('entity types', () => {
        it('all have unique IDs', () => {
            const ids = config.entityTypes.map(et => et.id);
            expect(new Set(ids).size).toBe(ids.length);
        });

        it('all have unique names', () => {
            const names = config.entityTypes.map(et => et.name);
            expect(new Set(names).size).toBe(names.length);
        });

        it('all have icon and color', () => {
            for (const et of config.entityTypes) {
                expect(et.icon).toBeTruthy();
                expect(et.color).toMatch(/^#[0-9a-fA-F]{6}$/);
            }
        });

        it('all dataSources reference valid document type IDs', () => {
            const docIds = new Set(config.documentTypes.map(dt => dt.id));
            for (const et of config.entityTypes) {
                for (const ds of et.dataSources ?? []) {
                    expect(docIds.has(ds.docTypeId)).toBe(true);
                }
            }
        });

        it('all conditionalRequirements reference valid document type IDs', () => {
            const docIds = new Set(config.documentTypes.map(dt => dt.id));
            for (const et of config.entityTypes) {
                for (const cr of et.conditionalRequirements ?? []) {
                    expect(docIds.has(cr.docTypeId)).toBe(true);
                    if (cr.conditions) {
                        for (const cond of cr.conditions) {
                            if (cond.sourceDocTypeId) {
                                expect(docIds.has(cond.sourceDocTypeId)).toBe(true);
                            }
                        }
                    }
                }
            }
        });

        it('all fieldMappings have sourceField and targetField', () => {
            for (const et of config.entityTypes) {
                for (const ds of et.dataSources ?? []) {
                    for (const fm of ds.fieldMappings) {
                        expect(fm.sourceField).toBeTruthy();
                        expect(fm.targetField).toBeTruthy();
                    }
                }
            }
        });

        it('at least one dataSource can create entity', () => {
            for (const et of config.entityTypes) {
                const hasCreator = (et.dataSources ?? []).some(ds => ds.canCreateEntity);
                expect(hasCreator).toBe(true);
            }
        });
    });

});

// ── Cross-Config Tests ──────────────────────────────────────────────────────

describe('cross-config consistency', () => {
    it('all configs have unique IDs', () => {
        const ids = ALL_CONFIGS.map(c => c.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('all configs have unique names', () => {
        const names = ALL_CONFIGS.map(c => c.name);
        expect(new Set(names).size).toBe(names.length);
    });
});
