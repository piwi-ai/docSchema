import { Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__inner container">
                <p className="footer__text">
                    DocSchema — Open standard for AI-readable document schemas
                </p>
                <p className="footer__text footer__text--muted">
                    MIT License · Made with <Heart size={14} className="footer__heart" /> by{' '}
                    <a
                        href="https://github.com/piwi-ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer__link"
                    >
                        piwi-ai
                    </a>
                </p>
            </div>
        </footer>
    );
}
