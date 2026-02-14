/**
 * Generate JSON configuration files for all business verticals.
 *
 * Dynamically discovers verticals by scanning src/verticals/{business}/{country}/
 * and importing each index.ts. Each vertical must default-export or named-export
 * a BusinessConfiguration object (the first exported *Config value found).
 *
 * Outputs to configs/{business}/{country}.config.json
 *
 * Usage: npm run generate
 */
import { writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import type { BusinessConfiguration } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const VERTICALS_DIR = join(__dirname, 'verticals');
const CONFIGS_DIR = join(__dirname, '..', 'configs');

/**
 * Scan verticals/{business}/{country}/ directories and return
 * an array of { business, country, modulePath } entries.
 */
function discoverVerticals(): Array<{ business: string; country: string; modulePath: string }> {
    const results: Array<{ business: string; country: string; modulePath: string }> = [];

    for (const business of readdirSync(VERTICALS_DIR).sort()) {
        const businessDir = join(VERTICALS_DIR, business);
        if (!statSync(businessDir).isDirectory()) continue;

        for (const country of readdirSync(businessDir).sort()) {
            const countryDir = join(businessDir, country);
            if (!statSync(countryDir).isDirectory()) continue;

            const indexPath = join(countryDir, 'index.ts');
            try {
                statSync(indexPath);
                results.push({ business, country, modulePath: indexPath });
            } catch {
                // No index.ts — skip
            }
        }
    }

    return results;
}

/**
 * Extract the BusinessConfiguration from a module's exports.
 * Looks for the first export whose name ends with "Config".
 */
function findConfig(mod: Record<string, unknown>): BusinessConfiguration | null {
    for (const [key, value] of Object.entries(mod)) {
        if (key.endsWith('Config') && value && typeof value === 'object' && 'id' in value && 'documentTypes' in value) {
            return value as BusinessConfiguration;
        }
    }
    return null;
}

// ─── Main ───────────────────────────────────────────────────────────────────

const verticals = discoverVerticals();
console.log(`Found ${verticals.length} verticals:\n`);

let totalBytes = 0;

for (const { business, country, modulePath } of verticals) {
    const mod = await import(pathToFileURL(modulePath).href) as Record<string, unknown>;
    const config = findConfig(mod);

    if (!config) {
        console.warn(`  ⚠️  ${business}/${country} — no *Config export found, skipping`);
        continue;
    }

    const outPath = join(CONFIGS_DIR, business, `${country}.config.json`);
    mkdirSync(dirname(outPath), { recursive: true });

    const enriched = {
        ...config,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const json = JSON.stringify(enriched, null, 2);
    writeFileSync(outPath, json, 'utf-8');
    totalBytes += json.length;

    console.log(
        `  ✅ ${business}/${country}.config.json — ` +
        `${config.documentTypes.length} doc types, ` +
        `${config.entityTypes.length} entity types, ` +
        `${config.documentWorkflows.length} workflows`
    );
}

console.log(`\n🎉 Generated ${verticals.length} configs (${(totalBytes / 1024).toFixed(1)} KB) → configs/`);
