import { useState, useMemo } from 'react';
import { verticals, type DocTypeDef, type EntityTypeDef } from '../data/configs';
import { syntaxHighlight, getConfigFilename } from '../utils/json';
import FieldRow from '../components/FieldRow';
import {
    FileText,
    ChevronDown,
    ChevronRight,
    Users,
    Link2,
    GitBranch,
    Code2,
    Copy,
    Check,
} from 'lucide-react';
import './Verticals.css';

/* ── Grouped verticals ────────────────────────────────────── */
interface VerticalGroup {
    vertical: string;
    entries: { idx: number; flag: string; country: string }[];
}

const groups: VerticalGroup[] = useMemoGroups();

function useMemoGroups(): VerticalGroup[] {
    const map = new Map<string, VerticalGroup>();
    verticals.forEach((v, idx) => {
        if (!map.has(v.vertical)) {
            map.set(v.vertical, { vertical: v.vertical, entries: [] });
        }
        map.get(v.vertical)!.entries.push({ idx, flag: v.flag, country: v.country });
    });
    return Array.from(map.values());
}

/* ── Document Card ────────────────────────────────────────── */
function DocCard({ doc }: { doc: DocTypeDef }) {
    const [open, setOpen] = useState(false);
    const fields = Object.keys(doc.jsonSchema.properties);
    const required = new Set(doc.jsonSchema.required || []);

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
                    <p className="doc-card__desc">{doc.description}</p>
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
                </div>
            )}
        </div>
    );
}

/* ── Entity Card ──────────────────────────────────────────── */
const entityColors = ['purple', 'blue', 'cyan', 'green', 'amber', 'rose'] as const;

function EntityCard({ entity, colorIdx }: { entity: EntityTypeDef; colorIdx: number }) {
    const [open, setOpen] = useState(false);
    const color = entityColors[colorIdx % entityColors.length];
    const dataSources = entity.dataSources ?? [];
    const conditionalReqs = entity.conditionalRequirements ?? [];

    return (
        <div className={`entity-card glass-card ${open ? 'entity-card--open' : ''}`}>
            <button className="entity-card__header" onClick={() => setOpen(!open)}>
                <div className="entity-card__left">
                    <div className={`entity-card__icon entity-card__icon--${color}`}>
                        <Users size={18} />
                    </div>
                    <div>
                        <h3 className="entity-card__title">{entity.name}</h3>
                        <p className="entity-card__id">{entity.id}</p>
                    </div>
                </div>
                <div className="entity-card__right">
                    <span className="badge badge--blue">
                        <Link2 size={12} /> {dataSources.length} sources
                    </span>
                    {conditionalReqs.length > 0 && (
                        <span className="badge badge--amber">
                            <GitBranch size={12} /> {conditionalReqs.length} rules
                        </span>
                    )}
                    {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
            </button>

            {open && (
                <div className="entity-card__body animate-fade-in">
                    <p className="entity-card__desc">{entity.description}</p>

                    {dataSources.length > 0 && (
                        <div className="entity-section">
                            <h4 className="entity-section__title">
                                <FileText size={16} /> Data Sources
                            </h4>
                            <div className="entity-sources">
                                {dataSources.map((ds, i) => (
                                    <div key={i} className="entity-source glass-card">
                                        <div className="entity-source__header">
                                            <code className="entity-source__doctype">
                                                {ds.docTypeId}
                                            </code>
                                            {ds.matchFields && ds.matchFields.length > 0 && (
                                                <span
                                                    className="badge badge--green"
                                                    style={{ fontSize: '0.65rem' }}
                                                >
                                                    fuzzy match
                                                </span>
                                            )}
                                        </div>
                                        {(ds.fields ?? []).length > 0 && (
                                            <table className="entity-source__table">
                                                <thead>
                                                    <tr>
                                                        <th>Source Field</th>
                                                        <th>→</th>
                                                        <th>Target Field</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(ds.fields ?? []).map((f, j) => (
                                                        <tr key={j}>
                                                            <td>
                                                                <code>{f.source}</code>
                                                            </td>
                                                            <td className="entity-source__arrow">
                                                                →
                                                            </td>
                                                            <td>
                                                                <code>{f.target}</code>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                        {ds.matchFields && ds.matchFields.length > 0 && (
                                            <div className="entity-source__match">
                                                <span className="entity-source__match-label">
                                                    Match by:
                                                </span>
                                                {ds.matchFields.map((mf, j) => (
                                                    <span key={j} className="badge badge--green">
                                                        {mf.field}
                                                        {mf.fuzzyThreshold != null &&
                                                            ` (≥${(1 - mf.fuzzyThreshold) * 100}%)`}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {conditionalReqs.length > 0 && (
                        <div className="entity-section">
                            <h4 className="entity-section__title">
                                <GitBranch size={16} /> Conditional Requirements
                            </h4>
                            <div className="entity-conditions">
                                {conditionalReqs.map((cr, i) => (
                                    <div key={i} className="entity-condition glass-card">
                                        <div className="entity-condition__rule">
                                            <span className="entity-condition__if">IF</span>
                                            {(cr.conditions ?? []).map((c, j) => (
                                                <span key={j} className="entity-condition__clause">
                                                    <code>{c.field}</code>
                                                    <span className="entity-condition__op">
                                                        {c.operator}
                                                    </span>
                                                    {c.value && (
                                                        <code className="entity-condition__val">
                                                            "{c.value}"
                                                        </code>
                                                    )}
                                                    {j < (cr.conditions ?? []).length - 1 && (
                                                        <span className="entity-condition__and">
                                                            OR
                                                        </span>
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="entity-condition__then">
                                            <span className="entity-condition__then-label">
                                                THEN require:
                                            </span>
                                            <code>{cr.docTypeId}</code>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ── JSON Viewer Panel ────────────────────────────────────── */
function JsonPanel({ data, filename }: { data: unknown; filename: string }) {
    const [copied, setCopied] = useState(false);
    const jsonStr = useMemo(() => JSON.stringify(data, null, 2), [data]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(jsonStr);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="json-panel glass-card">
            <div className="json-panel__bar">
                <div className="json-panel__bar-left">
                    <span className="preview__dot preview__dot--red" />
                    <span className="preview__dot preview__dot--yellow" />
                    <span className="preview__dot preview__dot--green" />
                    <span className="preview__filename">{filename}</span>
                </div>
                <div className="json-panel__bar-right">
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
            </div>
            <pre
                className="json-panel__code"
                dangerouslySetInnerHTML={{ __html: syntaxHighlight(jsonStr) }}
            />
        </div>
    );
}

/* ── Main Page ────────────────────────────────────────────── */
type Tab = 'documents' | 'entities' | 'json';

export default function Verticals() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [tab, setTab] = useState<Tab>('documents');
    const [expandedGroup, setExpandedGroup] = useState<string | null>(groups[0]?.vertical ?? null);
    const active = verticals[activeIdx];

    return (
        <div className="verticals page-wrapper">
            <div className="verticals__inner container">
                {/* Sidebar: grouped by vertical → country */}
                <aside className="verticals__sidebar">
                    <h2 className="verticals__sidebar-title">Verticals</h2>
                    {groups.map((g) => (
                        <div key={g.vertical} className="verticals__group">
                            <button
                                className={`verticals__group-header ${expandedGroup === g.vertical ? 'verticals__group-header--open' : ''}`}
                                onClick={() =>
                                    setExpandedGroup(
                                        expandedGroup === g.vertical ? null : g.vertical,
                                    )
                                }
                            >
                                {expandedGroup === g.vertical ? (
                                    <ChevronDown size={14} />
                                ) : (
                                    <ChevronRight size={14} />
                                )}
                                <span className="verticals__group-name">{g.vertical}</span>
                                <span className="verticals__group-count">
                                    {g.entries.length}
                                </span>
                            </button>
                            {expandedGroup === g.vertical && (
                                <div className="verticals__group-entries">
                                    {g.entries.map((e) => (
                                        <button
                                            key={e.idx}
                                            className={`verticals__country-btn ${e.idx === activeIdx ? 'verticals__country-btn--active' : ''}`}
                                            onClick={() => setActiveIdx(e.idx)}
                                        >
                                            <span className="verticals__country-flag">
                                                {e.flag}
                                            </span>
                                            <span>{e.country}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </aside>

                <main className="verticals__main">
                    <div className="verticals__header">
                        <h1 className="explorer__title">
                            {active.flag} {active.config.name}
                        </h1>
                        <p className="explorer__subtitle">{active.config.description}</p>
                        <div className="verticals__meta">
                            <span className="badge">{active.config.id}</span>
                            <span className="badge badge--blue">
                                {active.config.documentTypes.length} document types
                            </span>
                            <span className="badge badge--green">
                                {active.config.entityTypes.length} entity types
                            </span>
                        </div>
                    </div>

                    {/* Tab switcher */}
                    <div className="verticals__tabs">
                        <button
                            className={`verticals__tab ${tab === 'documents' ? 'verticals__tab--active' : ''}`}
                            onClick={() => setTab('documents')}
                        >
                            <FileText size={16} />
                            Document Types
                            <span className="verticals__tab-count">
                                {active.config.documentTypes.length}
                            </span>
                        </button>
                        <button
                            className={`verticals__tab ${tab === 'entities' ? 'verticals__tab--active' : ''}`}
                            onClick={() => setTab('entities')}
                        >
                            <Users size={16} />
                            Entity Types
                            <span className="verticals__tab-count">
                                {active.config.entityTypes.length}
                            </span>
                        </button>
                        <button
                            className={`verticals__tab ${tab === 'json' ? 'verticals__tab--active' : ''}`}
                            onClick={() => setTab('json')}
                        >
                            <Code2 size={16} />
                            JSON
                        </button>
                    </div>

                    {/* Tab content */}
                    <div key={`${activeIdx}-${tab}`}>
                        {tab === 'documents' && (
                            <div className="verticals__cards stagger">
                                {active.config.documentTypes.map((doc) => (
                                    <DocCard key={doc.id} doc={doc} />
                                ))}
                            </div>
                        )}
                        {tab === 'entities' && (
                            <div className="verticals__cards stagger">
                                {active.config.entityTypes.map((entity, i) => (
                                    <EntityCard key={entity.id} entity={entity} colorIdx={i} />
                                ))}
                            </div>
                        )}
                        {tab === 'json' && (
                            <JsonPanel
                                data={active.config}
                                filename={getConfigFilename(active.slug)}
                            />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
