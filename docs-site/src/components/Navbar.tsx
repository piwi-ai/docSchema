import { NavLink } from 'react-router-dom'
import { FileText, Database, Code2, Github } from 'lucide-react'
import './Navbar.css'

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__inner container">
                <NavLink to="/" className="navbar__logo">
                    <div className="navbar__logo-icon">D</div>
                    <span className="navbar__logo-text">DocSchema</span>
                </NavLink>

                <div className="navbar__links">
                    <NavLink to="/explore" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
                        <FileText size={16} />
                        <span>Schemas</span>
                    </NavLink>
                    <NavLink to="/entities" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
                        <Database size={16} />
                        <span>Entities</span>
                    </NavLink>
                    <NavLink to="/json" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
                        <Code2 size={16} />
                        <span>JSON</span>
                    </NavLink>
                </div>

                <a
                    href="https://github.com/piwi-ai/docSchema"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="navbar__github"
                >
                    <Github size={20} />
                </a>
            </div>
        </nav>
    )
}
