import { Link } from 'react-router-dom';
import { FileText, Database, GitBranch, ArrowRight, Sparkles, Globe, Boxes } from 'lucide-react';
import { getStats } from '../data/configs';
import { getDocLibraryStats } from '../data/documents';
import './Landing.css';

const stats = getStats();
const docLibStats = getDocLibraryStats();

const features = [
    {
        icon: <FileText size={28} />,
        title: 'Document Types',
        desc: 'JSON Schema definitions for every document in your business — invoices, contracts, IDs, tax forms. Any LLM can extract structured data.',
        link: '/documents',
        color: 'purple',
    },
    {
        icon: <Globe size={28} />,
        title: 'Document Library',
        desc: `${docLibStats.totalDocs} document schemas across ${docLibStats.totalCountries} countries — individual JSON files ready for any AI agent to consume.`,
        link: '/documents',
        color: 'green',
    },
    {
        icon: <Database size={28} />,
        title: 'Entity Types',
        desc: 'Map extracted data to real-world entities like buyers, sellers, and companies. Fuzzy matching and identity resolution built in.',
        link: '/verticals',
        color: 'blue',
    },
    {
        icon: <GitBranch size={28} />,
        title: 'Conditional Logic',
        desc: 'IF-THEN rules that dynamically require documents based on entity data. Married? → Require spouse ID. Has mortgage? → Require bank statement.',
        link: '/verticals',
        color: 'cyan',
    },
];

const principles = [
    {
        icon: <Sparkles size={20} />,
        label: 'LLM-Agnostic',
        desc: 'Works with Gemini, GPT, Claude, Llama, or any AI',
    },
    {
        icon: <Globe size={20} />,
        label: 'Country-Aware',
        desc: 'Localized fields, date formats, and ID patterns per country',
    },
    {
        icon: <Boxes size={20} />,
        label: 'Zero Dependencies',
        desc: 'Pure JSON data — no runtime libraries required',
    },
];

export default function Landing() {
    return (
        <div className="landing">
            {/* ── Hero ──────────────────────────────────────── */}
            <section className="hero">
                <div className="hero__bg" />
                <div className="hero__content container">
                    <div className="hero__badge badge">Open Standard v1.0</div>
                    <h1 className="hero__title">
                        AI-Readable
                        <br />
                        <span className="gradient-text">Document Schemas</span>
                    </h1>
                    <p className="hero__subtitle">
                        A portable, JSON-based format for describing business documents, extraction
                        fields, and entity relationships. Works with any AI provider.
                    </p>
                    <div className="hero__actions">
                        <Link to="/documents" className="btn btn--primary">
                            Browse Schemas <ArrowRight size={16} />
                        </Link>
                        <a
                            href="https://github.com/piwi-ai/docSchema"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--ghost"
                        >
                            View on GitHub
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="hero__stats">
                        <div className="hero__stat">
                            <span className="hero__stat-value">{docLibStats.totalCountries}</span>
                            <span className="hero__stat-label">Countries</span>
                        </div>
                        <div className="hero__stat">
                            <span className="hero__stat-value">{docLibStats.totalDocs}</span>
                            <span className="hero__stat-label">Document Schemas</span>
                        </div>
                        <div className="hero__stat">
                            <span className="hero__stat-value">{stats.totalVerticals}</span>
                            <span className="hero__stat-label">Verticals</span>
                        </div>
                        <div className="hero__stat">
                            <span className="hero__stat-value">{stats.totalEntityTypes}</span>
                            <span className="hero__stat-label">Entity Types</span>
                        </div>
                        <div className="hero__stat">
                            <span className="hero__stat-value">{stats.totalFields}</span>
                            <span className="hero__stat-label">Fields Defined</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Features ─────────────────────────────────── */}
            <section className="features container">
                <h2 className="features__heading">Four Core Primitives</h2>
                <p className="features__subheading">
                    Everything an AI needs to understand your documents — declaratively.
                </p>
                <div className="features__grid stagger">
                    {features.map((f) => (
                        <Link
                            to={f.link}
                            key={f.title}
                            className={`feature-card glass-card feature-card--${f.color}`}
                        >
                            <div className={`feature-card__icon feature-card__icon--${f.color}`}>
                                {f.icon}
                            </div>
                            <h3 className="feature-card__title">{f.title}</h3>
                            <p className="feature-card__desc">{f.desc}</p>
                            <span className="feature-card__cta">
                                Explore <ArrowRight size={14} />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── Principles ───────────────────────────────── */}
            <section className="principles container">
                <div className="principles__grid stagger">
                    {principles.map((p) => (
                        <div key={p.label} className="principle glass-card">
                            <div className="principle__icon">{p.icon}</div>
                            <div>
                                <h4 className="principle__title">{p.label}</h4>
                                <p className="principle__desc">{p.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Code Preview ─────────────────────────────── */}
            <section className="preview container">
                <h2 className="features__heading">What a Schema Looks Like</h2>
                <p className="features__subheading">
                    Standard JSON Schema — any AI or tool can consume it directly.
                </p>
                <div className="preview__block glass-card">
                    <div className="preview__header">
                        <span className="preview__dot preview__dot--red" />
                        <span className="preview__dot preview__dot--yellow" />
                        <span className="preview__dot preview__dot--green" />
                        <span className="preview__filename">real-estate/it.config.json</span>
                    </div>
                    <pre className="preview__code">
                        <code>{`{
  "id": "REAL-ESTATE-IT-DEFAULT",
  "name": "Italian Real Estate",
  "schemaVersion": 1,
  "documentTypes": [
    {
      "id": "doc-fattura",
      "name": "Fattura",
      "jsonSchema": {
        "type": "object",
        "properties": {
          "numero":   { "type": "string", "description": "Numero fattura" },
          "data":     { "type": "string", "pattern": "^\\\\d{2}\\\\.\\\\d{2}\\\\.\\\\d{4}$" },
          "emittente": { "type": "object", "properties": { ... } },
          "totale":   { "type": "number", "description": "Totale in Euro" }
        },
        "required": ["numero", "data", "emittente", "totale"]
      }
    }
  ],
  "entityTypes": [ ... ]
}`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
}
