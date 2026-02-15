import { verticals } from '../data/configs'

interface VerticalSidebarProps {
    activeIdx: number;
    onSelect: (idx: number) => void;
    countKey: 'documentTypes' | 'entityTypes';
}

export default function VerticalSidebar({ activeIdx, onSelect, countKey }: VerticalSidebarProps) {
    return (
        <aside className="explorer__sidebar">
            <h2 className="explorer__sidebar-title">Verticals</h2>
            {verticals.map((v, i) => (
                <button
                    key={v.slug}
                    className={`explorer__vertical-btn ${i === activeIdx ? 'explorer__vertical-btn--active' : ''}`}
                    onClick={() => onSelect(i)}
                >
                    <span className="explorer__vertical-flag">{v.flag}</span>
                    <div>
                        <span className="explorer__vertical-name">{v.vertical}</span>
                        <span className="explorer__vertical-country">{v.country}</span>
                    </div>
                    <span className="explorer__vertical-count">
                        {v.config[countKey].length}
                    </span>
                </button>
            ))}
        </aside>
    );
}
