/**
 * Tests for generated JSON config files.
 *
 * Validates that every .config.json in configs/ is:
 * - Valid JSON (parseable)
 * - Structurally sound (required top-level keys, non-empty arrays)
 * - Free of regex escaping bugs (all "pattern" values are valid RegExp)
 *
 * Run `npm run generate` before these tests to ensure configs are up to date.
 */
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

// ─── Discover all config files ──────────────────────────────────────────────

const CONFIGS_DIR = join(import.meta.dirname, '..', 'configs');

function findJsonFiles(dir: string): string[] {
    const results: string[] = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...findJsonFiles(fullPath));
        } else if (entry.name.endsWith('.config.json')) {
            results.push(fullPath);
        }
    }
    return results;
}

const configFiles = findJsonFiles(CONFIGS_DIR);

// ─── Recursively collect all "pattern" values from an object ────────────────

interface PatternLocation {
    path: string;
    value: string;
}

function collectPatterns(obj: unknown, path = ''): PatternLocation[] {
    const results: PatternLocation[] = [];
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        const record = obj as Record<string, unknown>;
        for (const [key, value] of Object.entries(record)) {
            const currentPath = path ? `${path}.${key}` : key;
            if (key === 'pattern' && typeof value === 'string') {
                results.push({ path: currentPath, value });
            } else {
                results.push(...collectPatterns(value, currentPath));
            }
        }
    } else if (Array.isArray(obj)) {
        obj.forEach((item, i) => {
            results.push(...collectPatterns(item, `${path}[${i}]`));
        });
    }
    return results;
}

// ─── Tests ──────────────────────────────────────────────────────────────────

describe('Generated JSON configs', () => {
    it('found at least 1 config file', () => {
        expect(configFiles.length).toBeGreaterThan(0);
    });

    describe.each(configFiles.map((f) => [relative(CONFIGS_DIR, f), f]))(
        '%s',
        (_relPath, filePath) => {
            let parsed: Record<string, unknown>;

            it('is valid JSON', () => {
                const raw = readFileSync(filePath, 'utf-8');
                // JSON.parse will throw on invalid JSON
                parsed = JSON.parse(raw);
                expect(parsed).toBeDefined();
            });

            it('has required top-level fields', () => {
                const raw = readFileSync(filePath, 'utf-8');
                parsed = JSON.parse(raw);
                expect(parsed.id).toBeTruthy();
                expect(parsed.name).toBeTruthy();
                expect(parsed.schemaVersion).toBe(1);
                expect(Array.isArray(parsed.documentTypes)).toBe(true);
                expect((parsed.documentTypes as unknown[]).length).toBeGreaterThan(0);
                expect(Array.isArray(parsed.entityTypes)).toBe(true);
                expect((parsed.entityTypes as unknown[]).length).toBeGreaterThan(0);
            });

            it('all "pattern" values are valid regex and match expected inputs', () => {
                const raw = readFileSync(filePath, 'utf-8');
                parsed = JSON.parse(raw);
                const patterns = collectPatterns(parsed);

                for (const { path, value } of patterns) {
                    // Must not throw — valid regex
                    let re: RegExp;
                    try {
                        re = new RegExp(value);
                    } catch (e) {
                        throw new Error(`Invalid regex at ${path}: "${value}" — ${e}`);
                    }

                    // Must not contain double-escaped backslashes (the bug we fixed)
                    expect(value).not.toContain('\\\\');

                    // Sanity: patterns with \d should match actual digits, not literal 'd'
                    if (value.includes('\\d')) {
                        // The pattern should reject pure alphabetic strings
                        expect(re.test('abcdefghijklmnop')).toBe(false);
                    }
                }
            });
        },
    );
});
