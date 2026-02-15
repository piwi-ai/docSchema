import { useState } from 'react'
import { verticals } from '../data/configs'
import { Copy, Check, ChevronDown } from 'lucide-react'
import './JsonViewer.css'

function syntaxHighlight(json: string): string {
    return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match) => {
            let cls = 'json-number';
            if (/^"/.test(match)) {
                cls = /:$/.test(match) ? 'json-key' : 'json-string';
            } else if (/true|false/.test(match)) {
                cls = 'json-boolean';
            } else if (/null/.test(match)) {
                cls = 'json-null';
            }
            return `<span class="${cls}">${match}</span>`;
        }
    );
}

export default function JsonViewer() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [copied, setCopied] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const active = verticals[activeIdx];
    const jsonStr = JSON.stringify(active.config, null, 2);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(jsonStr);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="json-viewer page-wrapper">
            <div className="json-viewer__inner container">
                <div className="json-viewer__header">
                    <div>
                        <h1 className="explorer__title">JSON Configuration</h1>
                        <p className="explorer__subtitle">
                            Raw generated configuration file — ready for any AI agent to consume.
                        </p>
                    </div>
                    <div className="json-viewer__controls">
                        {/* Dropdown */}
                        <div className="json-dropdown">
                            <button
                                className="json-dropdown__trigger btn btn--ghost"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                {active.flag} {active.vertical} ({active.country})
                                <ChevronDown size={14} />
                            </button>
                            {dropdownOpen && (
                                <div className="json-dropdown__menu glass-card">
                                    {verticals.map((v, i) => (
                                        <button
                                            key={v.slug}
                                            className={`json-dropdown__item ${i === activeIdx ? 'json-dropdown__item--active' : ''}`}
                                            onClick={() => { setActiveIdx(i); setDropdownOpen(false); }}
                                        >
                                            <span>{v.flag}</span>
                                            <span>{v.vertical} — {v.country}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button className="btn btn--ghost" onClick={handleCopy}>
                            {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
                        </button>
                    </div>
                </div>

                <div className="json-viewer__block glass-card">
                    <div className="json-viewer__bar">
                        <span className="preview__dot preview__dot--red" />
                        <span className="preview__dot preview__dot--yellow" />
                        <span className="preview__dot preview__dot--green" />
                        <span className="preview__filename">
                            {active.slug.split('-').slice(0, -1).join('-')}/{active.slug.split('-').pop()}.config.json
                        </span>
                        <span className="json-viewer__size">
                            {(new Blob([jsonStr]).size / 1024).toFixed(1)} KB
                        </span>
                    </div>
                    <pre
                        className="json-viewer__code"
                        dangerouslySetInnerHTML={{ __html: syntaxHighlight(jsonStr) }}
                    />
                </div>
            </div>
        </div>
    );
}
