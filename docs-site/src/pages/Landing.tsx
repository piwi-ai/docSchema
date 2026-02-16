import { Link } from 'react-router-dom';
import {
    FileText,
    Database,
    GitBranch,
    ArrowRight,
    Sparkles,
    Globe,
    Boxes,
    Bot,
    Cpu,
    Search,
    BookOpen,
    Zap,
    ExternalLink,
} from 'lucide-react';
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

const webMcpTools = [
    { icon: <Boxes size={18} />, name: 'list_verticals', desc: 'Browse all business verticals' },
    { icon: <Zap size={18} />, name: 'get_stats', desc: 'Aggregate schema statistics' },
    { icon: <FileText size={18} />, name: 'get_document_types', desc: 'Doc types per vertical' },
    { icon: <BookOpen size={18} />, name: 'get_document_schema', desc: 'Full JSON Schema for a doc' },
    { icon: <Database size={18} />, name: 'get_entity_types', desc: 'Entity types and mappings' },
    { icon: <Cpu size={18} />, name: 'get_full_config', desc: 'Complete vertical config' },
    { icon: <Globe size={18} />, name: 'list_countries', desc: '33 countries with doc counts' },
    {
        icon: <FileText size={18} />,
        name: 'get_documents_by_country',
        desc: 'All docs for a country',
    },
    { icon: <Search size={18} />, name: 'search_documents', desc: 'Search across all schemas' },
    { icon: <BookOpen size={18} />, name: 'get_document_detail', desc: 'Full schema by country + ID' },
    { icon: <Zap size={18} />, name: 'get_doc_library_stats', desc: 'Library-wide statistics' },
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

            {/* ── WebMCP / AI Integration ─────────────────── */}
            <section className="webmcp container" id="webmcp">
                <div className="webmcp__header">
                    <div className="webmcp__icon-wrap">
                        <Bot size={32} />
                    </div>
                    <div className="webmcp__badge badge badge--cyan">WebMCP Enabled</div>
                    <h2 className="features__heading">Built for AI Agents</h2>
                    <p className="features__subheading">
                        This site exposes <strong>11 structured tools</strong> via the{' '}
                        <a
                            href="https://webmachinelearning.github.io/webmcp/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="webmcp__link"
                        >
                            WebMCP standard
                        </a>
                        . AI assistants can query schemas, search documents, and browse configurations
                        programmatically — no scraping needed.
                    </p>
                </div>

                {/* Discovery endpoints */}
                <div className="webmcp__discovery stagger">
                    <a
                        href="/.well-known/mcp.json"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="webmcp__endpoint glass-card"
                    >
                        <div className="webmcp__endpoint-icon webmcp__endpoint-icon--purple">
                            <Cpu size={20} />
                        </div>
                        <div className="webmcp__endpoint-info">
                            <code className="webmcp__endpoint-path">
                                /.well-known/mcp.json
                            </code>
                            <span className="webmcp__endpoint-desc">
                                Machine-readable tool catalog for AI agents
                            </span>
                        </div>
                        <ExternalLink size={14} className="webmcp__endpoint-arrow" />
                    </a>
                    <a
                        href="/llms.txt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="webmcp__endpoint glass-card"
                    >
                        <div className="webmcp__endpoint-icon webmcp__endpoint-icon--blue">
                            <BookOpen size={20} />
                        </div>
                        <div className="webmcp__endpoint-info">
                            <code className="webmcp__endpoint-path">/llms.txt</code>
                            <span className="webmcp__endpoint-desc">
                                LLM-optimized site overview with resource links
                            </span>
                        </div>
                        <ExternalLink size={14} className="webmcp__endpoint-arrow" />
                    </a>
                    <div className="webmcp__endpoint glass-card">
                        <div className="webmcp__endpoint-icon webmcp__endpoint-icon--cyan">
                            <Bot size={20} />
                        </div>
                        <div className="webmcp__endpoint-info">
                            <code className="webmcp__endpoint-path">navigator.modelContext</code>
                            <span className="webmcp__endpoint-desc">
                                Browser-native WebMCP API with 11 registered tools
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tool grid */}
                <h3 className="webmcp__tools-heading">Available Tools</h3>
                <div className="webmcp__tools stagger">
                    {webMcpTools.map((t) => (
                        <div key={t.name} className="webmcp__tool glass-card">
                            <div className="webmcp__tool-icon">{t.icon}</div>
                            <div>
                                <code className="webmcp__tool-name">{t.name}</code>
                                <p className="webmcp__tool-desc">{t.desc}</p>
                            </div>
                        </div>
                    ))}
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
