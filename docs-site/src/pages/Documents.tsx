import { useState, useMemo } from 'react';
import { countryList, getDocsByCountry } from '../data/documents';
import type { DocTypeDef } from '../data/configs';
import { syntaxHighlight } from '../utils/json';
import FieldRow from '../components/FieldRow';
import {
    Globe,
    FileText,
    ChevronDown,
    ChevronRight,
    Search,
    ExternalLink,
    Code2,
    Copy,
    Check,
} from 'lucide-react';
import './Documents.css';
import './Explorer.css';

/* ── Document Card ─────────────────────────────────────────── */
function DocCard({ doc }: { doc: DocTypeDef }) {
    const [open, setOpen] = useState(false);
    const [showJson, setShowJson] = useState(false);
    const [copied, setCopied] = useState(false);
    const fields = Object.keys(doc.jsonSchema.properties);
    const required = new Set(doc.jsonSchema.required || []);
    const refs = (doc as unknown as { references?: { title: string; url: string; type?: string }[] })
        .references;

    const jsonStr = useMemo(() => JSON.stringify(doc, null, 2), [doc]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(jsonStr);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`doc-card glass-card ${open ? 'doc-card--open' : ''}`}>
            <button className="doc-card__header" onClick={() => setOpen(!open)}>
                <div className="doc-card__left">
                    <div className="doc-card__icon">
                        <FileText size={18} />
                    </div>
                    <div>
                        <h3 className="doc-card__title">{doc.name}</h3>
                        <p className="doc-card__id">{doc.id}</p>
                    </div>
                </div>
                <div className="doc-card__right">
                    {doc.isArrayExtraction && <span className="badge badge--amber">Array</span>}
                    <span className="badge badge--blue">{fields.length} fields</span>
                    <span className="badge badge--green">{required.size} required</span>
                    {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
            </button>

            {open && (
                <div className="doc-card__body animate-fade-in">
                    <div className="doc-card__body-toolbar">
                        <p className="doc-card__desc">{doc.description}</p>
                        <button
                            className={`btn btn--ghost btn--sm ${showJson ? 'btn--active' : ''}`}
                            onClick={() => setShowJson(!showJson)}
                        >
                            <Code2 size={14} />
                            {showJson ? 'Schema' : 'JSON'}
                        </button>
                    </div>

                    {refs && refs.length > 0 && !showJson && (
                        <div className="doc-card__refs">
                            {refs.map((r, i) => (
                                <a
                                    key={i}
                                    href={r.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="doc-card__ref-link"
                                >
                                    <ExternalLink size={12} />
                                    {r.title}
                                </a>
                            ))}
                        </div>
                    )}

                    {showJson ? (
                        <div className="doc-card__json">
                            <div className="doc-card__json-bar">
                                <span className="json-panel__size">
                                    {(new Blob([jsonStr]).size / 1024).toFixed(1)} KB
                                </span>
                                <button className="btn btn--ghost btn--sm" onClick={handleCopy}>
                                    {copied ? (
                                        <>
                                            <Check size={14} /> Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={14} /> Copy
                                        </>
                                    )}
                                </button>
                            </div>
                            <pre
                                className="json-panel__code"
                                dangerouslySetInnerHTML={{
                                    __html: syntaxHighlight(jsonStr),
                                }}
                            />
                        </div>
                    ) : (
                        <div className="doc-card__table-wrap">
                            <table className="field-table">
                                <thead>
                                    <tr>
                                        <th>Field</th>
                                        <th>Type</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fields.map((name) => (
                                        <FieldRow
                                            key={name}
                                            name={name}
                                            field={doc.jsonSchema.properties[name]}
                                            isRequired={required.has(name)}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ── Main Page ─────────────────────────────────────────────── */
export default function Documents() {
    const [activeCode, setActiveCode] = useState(countryList[0]?.code ?? 'it');
    const [search, setSearch] = useState('');

    const docs = getDocsByCountry(activeCode);
    const activeCountry = countryList.find((c) => c.code === activeCode);

    const filtered = useMemo(() => {
        if (!search.trim()) return docs;
        const q = search.toLowerCase();
        return docs.filter(
            (d) =>
                d.name.toLowerCase().includes(q) ||
                d.id.toLowerCase().includes(q) ||
                d.description?.toLowerCase().includes(q),
        );
    }, [docs, search]);

    return (
        <div className="documents page-wrapper">
            <div className="documents__inner container">
                {/* Country sidebar */}
                <aside className="documents__sidebar">
                    <h2 className="documents__sidebar-title">
                        <Globe size={16} /> Countries
                    </h2>
                    <div className="documents__country-list">
                        {countryList.map((c) => (
                            <button
                                key={c.code}
                                className={`documents__country-btn ${c.code === activeCode ? 'documents__country-btn--active' : ''}`}
                                onClick={() => {
                                    setActiveCode(c.code);
                                    setSearch('');
                                }}
                            >
                                <span className="documents__country-flag">{c.flag}</span>
                                <span className="documents__country-name">{c.name}</span>
                                <span className="documents__country-count">{c.docCount}</span>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Main content */}
                <main className="documents__main">
                    <div className="documents__header">
                        <h1 className="explorer__title">
                            {activeCountry?.flag} {activeCountry?.name} — Documents
                        </h1>
                        <p className="explorer__subtitle">
                            {docs.length} document type{docs.length !== 1 ? 's' : ''} with JSON
                            Schema definitions for AI extraction.
                        </p>
                        <div className="documents__search-wrap">
                            <Search size={16} />
                            <input
                                type="text"
                                className="documents__search"
                                placeholder="Filter documents…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="documents__cards stagger">
                        {filtered.map((doc) => (
                            <DocCard key={doc.id} doc={doc} />
                        ))}
                        {filtered.length === 0 && (
                            <p className="documents__empty">
                                No documents match "<strong>{search}</strong>"
                            </p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
