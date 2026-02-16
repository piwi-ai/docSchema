import { NavLink } from 'react-router-dom';
import { Globe, Boxes, Github } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__inner container">
                <NavLink to="/" className="navbar__logo">
                    <div className="navbar__logo-icon">D</div>
                    <span className="navbar__logo-text">DocSchema</span>
                </NavLink>

                <div className="navbar__links">
                    <NavLink
                        to="/documents"
                        className={({ isActive }) =>
                            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                        }
                    >
                        <Globe size={16} />
                        <span>Documents</span>
                    </NavLink>
                    <NavLink
                        to="/verticals"
                        className={({ isActive }) =>
                            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                        }
                    >
                        <Boxes size={16} />
                        <span>Verticals</span>
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
    );
}
