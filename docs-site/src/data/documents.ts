/**
 * Document Library data layer.
 *
 * Uses Vite's import.meta.glob to eagerly load every JSON file
 * from the copied documents/ folder.  Provides:
 *   – countryList   (sorted metadata with doc counts)
 *   – getDocsByCountry(code)
 *   – getDocLibraryStats()
 */
import type { DocTypeDef } from './configs';

/* ── Country metadata ─────────────────────────────────────────── */
const COUNTRY_META: Record<string, { name: string; flag: string }> = {
    at: { name: 'Austria', flag: '🇦🇹' },
    be: { name: 'Belgium', flag: '🇧🇪' },
    bg: { name: 'Bulgaria', flag: '🇧🇬' },
    ch: { name: 'Switzerland', flag: '🇨🇭' },
    cy: { name: 'Cyprus', flag: '🇨🇾' },
    cz: { name: 'Czechia', flag: '🇨🇿' },
    de: { name: 'Germany', flag: '🇩🇪' },
    dk: { name: 'Denmark', flag: '🇩🇰' },
    ee: { name: 'Estonia', flag: '🇪🇪' },
    es: { name: 'Spain', flag: '🇪🇸' },
    fi: { name: 'Finland', flag: '🇫🇮' },
    fr: { name: 'France', flag: '🇫🇷' },
    gb: { name: 'United Kingdom', flag: '🇬🇧' },
    gr: { name: 'Greece', flag: '🇬🇷' },
    hr: { name: 'Croatia', flag: '🇭🇷' },
    hu: { name: 'Hungary', flag: '🇭🇺' },
    ie: { name: 'Ireland', flag: '🇮🇪' },
    is: { name: 'Iceland', flag: '🇮🇸' },
    it: { name: 'Italy', flag: '🇮🇹' },
    li: { name: 'Liechtenstein', flag: '🇱🇮' },
    lt: { name: 'Lithuania', flag: '🇱🇹' },
    lu: { name: 'Luxembourg', flag: '🇱🇺' },
    lv: { name: 'Latvia', flag: '🇱🇻' },
    mt: { name: 'Malta', flag: '🇲🇹' },
    nl: { name: 'Netherlands', flag: '🇳🇱' },
    no: { name: 'Norway', flag: '🇳🇴' },
    pl: { name: 'Poland', flag: '🇵🇱' },
    pt: { name: 'Portugal', flag: '🇵🇹' },
    ro: { name: 'Romania', flag: '🇷🇴' },
    se: { name: 'Sweden', flag: '🇸🇪' },
    si: { name: 'Slovenia', flag: '🇸🇮' },
    sk: { name: 'Slovakia', flag: '🇸🇰' },
    us: { name: 'United States', flag: '🇺🇸' },
};

/* ── Load all document JSONs eagerly via Vite glob ────────────── */
const modules = import.meta.glob<DocTypeDef>('./documents/**/*.json', { eager: true, import: 'default' });

// Group by country code
const docsByCountry: Record<string, DocTypeDef[]> = {};

for (const [path, doc] of Object.entries(modules)) {
    // path looks like "./documents/it/doc-fattura.json"
    const match = path.match(/\.\/documents\/([a-z]{2})\//);
    if (!match) continue;
    const code = match[1];
    if (!docsByCountry[code]) docsByCountry[code] = [];
    docsByCountry[code].push(doc);
}

// Sort docs within each country alphabetically by name
for (const docs of Object.values(docsByCountry)) {
    docs.sort((a, b) => a.name.localeCompare(b.name));
}

/* ── Public API ───────────────────────────────────────────────── */

export interface CountryInfo {
    code: string;
    name: string;
    flag: string;
    docCount: number;
}

export const countryList: CountryInfo[] = Object.keys(docsByCountry)
    .sort((a, b) => {
        const nameA = COUNTRY_META[a]?.name ?? a;
        const nameB = COUNTRY_META[b]?.name ?? b;
        return nameA.localeCompare(nameB);
    })
    .map((code) => ({
        code,
        name: COUNTRY_META[code]?.name ?? code.toUpperCase(),
        flag: COUNTRY_META[code]?.flag ?? '🏳️',
        docCount: docsByCountry[code].length,
    }));

export function getDocsByCountry(code: string): DocTypeDef[] {
    return docsByCountry[code] ?? [];
}

export function getDocLibraryStats() {
    const totalCountries = countryList.length;
    const totalDocs = countryList.reduce((sum, c) => sum + c.docCount, 0);
    return { totalCountries, totalDocs };
}
