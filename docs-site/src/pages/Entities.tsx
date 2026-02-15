import { useState } from 'react'
import { verticals, type EntityTypeDef } from '../data/configs'
import { Users, ChevronDown, ChevronRight, Link2, GitBranch, FileText } from 'lucide-react'
import VerticalSidebar from '../components/VerticalSidebar'
import './Entities.css'

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

                    {/* Data Sources */}
                    {dataSources.length > 0 && (
                        <div className="entity-section">
                            <h4 className="entity-section__title">
                                <FileText size={16} /> Data Sources
                            </h4>
                            <div className="entity-sources">
                                {dataSources.map((ds, i) => (
                                    <div key={i} className="entity-source glass-card">
                                        <div className="entity-source__header">
                                            <code className="entity-source__doctype">{ds.docTypeId}</code>
                                            {ds.matchFields && ds.matchFields.length > 0 && (
                                                <span className="badge badge--green" style={{ fontSize: '0.65rem' }}>
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
                                                            <td><code>{f.source}</code></td>
                                                            <td className="entity-source__arrow">→</td>
                                                            <td><code>{f.target}</code></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                        {ds.matchFields && ds.matchFields.length > 0 && (
                                            <div className="entity-source__match">
                                                <span className="entity-source__match-label">Match by:</span>
                                                {ds.matchFields.map((mf, j) => (
                                                    <span key={j} className="badge badge--green">
                                                        {mf.field}
                                                        {mf.fuzzyThreshold != null && ` (≥${(1 - mf.fuzzyThreshold) * 100}%)`}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Conditional Requirements */}
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
                                                    <span className="entity-condition__op">{c.operator}</span>
                                                    {c.value && <code className="entity-condition__val">"{c.value}"</code>}
                                                    {j < (cr.conditions ?? []).length - 1 && <span className="entity-condition__and">OR</span>}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="entity-condition__then">
                                            <span className="entity-condition__then-label">THEN require:</span>
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

export default function Entities() {
    const [activeIdx, setActiveIdx] = useState(0);
    const active = verticals[activeIdx];

    return (
        <div className="entities page-wrapper">
            <div className="entities__inner container">
                <VerticalSidebar
                    activeIdx={activeIdx}
                    onSelect={setActiveIdx}
                    countKey="entityTypes"
                />

                <main className="entities__main">
                    <div className="explorer__header">
                        <h1 className="explorer__title">
                            {active.flag} {active.vertical} — Entities
                        </h1>
                        <p className="explorer__subtitle">
                            Entity types define how extracted document data maps to real-world business entities.
                        </p>
                        <div className="explorer__meta">
                            <span className="badge badge--green">{active.config.entityTypes.length} entity types</span>
                        </div>
                    </div>

                    <div className="entities__cards stagger">
                        {active.config.entityTypes.map((entity, i) => (
                            <EntityCard key={entity.id} entity={entity} colorIdx={i} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
