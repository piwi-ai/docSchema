import { NavLink } from 'react-router-dom';
import { Globe, Boxes } from 'lucide-react';
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

                <div className="navbar__github">
                    <iframe
                        src="https://ghbtns.com/github-btn.html?user=piwi-ai&repo=docSchema&type=star&count=true&size=large"
                        frameBorder="0"
                        scrolling="0"
                        width="130"
                        height="30"
                        title="GitHub Stars"
                    />
                </div>
            </div>
        </nav>
    );
}
