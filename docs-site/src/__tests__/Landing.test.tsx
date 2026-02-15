import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Landing from '../pages/Landing'

function renderWithRouter() {
    return render(
        <MemoryRouter>
            <Landing />
        </MemoryRouter>
    );
}

describe('Landing', () => {
    it('renders the hero heading', () => {
        renderWithRouter();
        expect(screen.getByText('Document Schemas')).toBeInTheDocument();
    });

    it('displays live statistics', () => {
        renderWithRouter();
        // Stats labels are inside .hero__stat-label spans
        const statLabels = document.querySelectorAll('.hero__stat-label');
        const labels = Array.from(statLabels).map(el => el.textContent);
        expect(labels).toContain('Verticals');
        expect(labels).toContain('Document Types');
        expect(labels).toContain('Entity Types');
        expect(labels).toContain('Fields Defined');
    });

    it('renders all three feature cards', () => {
        renderWithRouter();
        const titles = document.querySelectorAll('.feature-card__title');
        const texts = Array.from(titles).map(el => el.textContent);
        expect(texts).toContain('Document Types');
        expect(texts).toContain('Entity Types');
        expect(texts).toContain('Conditional Logic');
    });

    it('renders design principles', () => {
        renderWithRouter();
        expect(screen.getByText('LLM-Agnostic')).toBeInTheDocument();
        expect(screen.getByText('Country-Aware')).toBeInTheDocument();
        expect(screen.getByText('Zero Dependencies')).toBeInTheDocument();
    });

    it('has a Browse Schemas link', () => {
        renderWithRouter();
        const link = screen.getByText(/Browse Schemas/);
        expect(link).toBeInTheDocument();
    });

    it('has a GitHub link', () => {
        renderWithRouter();
        const link = screen.getByText('View on GitHub');
        expect(link).toHaveAttribute('href', 'https://github.com/piwi-ai/docSchema');
    });

    it('renders code preview section', () => {
        renderWithRouter();
        expect(screen.getByText('What a Schema Looks Like')).toBeInTheDocument();
    });
});
