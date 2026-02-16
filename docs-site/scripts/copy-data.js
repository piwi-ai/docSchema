#!/usr/bin/env node
/**
 * Copies generated data from the parent repo into src/data/ for the docs-site.
 *
 *   configs/{vertical}/{country}.config.json  →  src/data/{vertical}-{country}.json
 *   documents/                                →  src/data/documents/
 *
 * Auto-discovers verticals — no manual updates needed when new ones are added.
 */
import { cpSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');
const DATA_DIR = resolve(import.meta.dirname, '../src/data');
const CONFIGS_DIR = join(ROOT, 'configs');
const DOCUMENTS_DIR = join(ROOT, 'documents');

// ── 1. Copy vertical configs ────────────────────────────────
mkdirSync(DATA_DIR, { recursive: true });

for (const vertical of readdirSync(CONFIGS_DIR)) {
    const vertDir = join(CONFIGS_DIR, vertical);
    if (!statSync(vertDir).isDirectory()) continue;

    for (const file of readdirSync(vertDir)) {
        if (!file.endsWith('.config.json')) continue;
        const country = file.replace('.config.json', '');
        const dest = join(DATA_DIR, `${vertical}-${country}.json`);
        cpSync(join(vertDir, file), dest);
        console.log(`  ✓ configs/${vertical}/${file} → ${vertical}-${country}.json`);
    }
}

// ── 2. Copy document library ────────────────────────────────
const docsDest = join(DATA_DIR, 'documents');
rmSync(docsDest, { recursive: true, force: true });
cpSync(DOCUMENTS_DIR, docsDest, { recursive: true });

const countries = readdirSync(docsDest).filter((d) =>
    statSync(join(docsDest, d)).isDirectory(),
);
console.log(`  ✓ documents/ → ${countries.length} countries`);
