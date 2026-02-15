import { useState } from 'react'
import { verticals, type DocTypeDef, type SchemaField } from '../data/configs'
import { FileText, ChevronDown, ChevronRight, Hash, Type, List, Braces, AlertCircle } from 'lucide-react'
import './Explorer.css'


function FieldRow({ name, field, isRequired }: { name: string; field: SchemaField; isRequired: boolean }) {
    const typeIcon = {
        string: <Type size={14} />,
        number: <Hash size={14} />,
        object: <Braces size={14} />,
        array: <List size={14} />,
    }[field.type] || <Type size={14} />;

    const typeColor = {
        string: 'green',
        number: 'amber',
        object: 'purple',
        array: 'blue',
    }[field.type] || 'green';

    return (
        <tr className="field-row">
            <td className="field-row__name">
                <code>{name}</code>
                {isRequired && <span className="field-row__req" title="Required"><AlertCircle size={12} /></span>}
            </td>
            <td>
                <span className={`badge badge--${typeColor}`}>
                    {typeIcon} {field.type}
                </span>
            </td>
            <td className="field-row__desc">
                {field.description || '—'}
                {field.pattern && (
                    <code className="field-row__pattern">{field.pattern}</code>
                )}
                {field.enum && (
                    <span className="field-row__enum">
                        {field.enum.filter(Boolean).join(' | ')}
                    </span>
                )}
            </td>
        </tr>
    );
}

function DocCard({ doc }: { doc: DocTypeDef }) {
    const [open, setOpen] = useState(false);
    const fields = Object.keys(doc.jsonSchema.properties);
    const required = new Set(doc.jsonSchema.required || []);

    return (
        <div className={`doc-card glass-card ${open ? 'doc-card--open' : ''}`}>
            <button className="doc-card__header" onClick={() => setOpen(!open)}>
                <div className="doc-card__left">
                    <div className="doc-card__icon"><FileText size={18} /></div>
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

export default function Explorer() {
    const [activeIdx, setActiveIdx] = useState(0);
    const active = verticals[activeIdx];

    return (
        <div className="explorer page-wrapper">
            <div className="explorer__inner container">
                {/* Sidebar */}
                <aside className="explorer__sidebar">
                    <h2 className="explorer__sidebar-title">Verticals</h2>
                    {verticals.map((v, i) => (
                        <button
                            key={v.slug}
                            className={`explorer__vertical-btn ${i === activeIdx ? 'explorer__vertical-btn--active' : ''}`}
                            onClick={() => setActiveIdx(i)}
                        >
                            <span className="explorer__vertical-flag">{v.flag}</span>
                            <div>
                                <span className="explorer__vertical-name">{v.vertical}</span>
                                <span className="explorer__vertical-country">{v.country}</span>
                            </div>
                            <span className="explorer__vertical-count">{v.config.documentTypes.length}</span>
                        </button>
                    ))}
                </aside>

                {/* Main */}
                <main className="explorer__main">
                    <div className="explorer__header">
                        <h1 className="explorer__title">
                            {active.flag} {active.config.name}
                        </h1>
                        <p className="explorer__subtitle">{active.config.description}</p>
                        <div className="explorer__meta">
                            <span className="badge">{active.config.id}</span>
                            <span className="badge badge--blue">{active.config.documentTypes.length} document types</span>
                            <span className="badge badge--green">{active.config.entityTypes.length} entity types</span>
                        </div>
                    </div>

                    <div className="explorer__cards stagger">
                        {active.config.documentTypes.map((doc) => (
                            <DocCard key={doc.id} doc={doc} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
