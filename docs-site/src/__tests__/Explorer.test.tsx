import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Explorer from '../pages/Explorer'

function renderExplorer() {
    return render(
        <MemoryRouter>
            <Explorer />
        </MemoryRouter>
    );
}

describe('Explorer', () => {
    it('renders the sidebar with all verticals', () => {
        renderExplorer();
        expect(screen.getByText('Verticals')).toBeInTheDocument();
        // Check at least the first vertical exists
        expect(screen.getByText('Accountant')).toBeInTheDocument();
    });

    it('renders document type cards for the active vertical', () => {
        renderExplorer();
        // Should show "document types" badge
        const badges = screen.getAllByText(/document types/i);
        expect(badges.length).toBeGreaterThan(0);
    });

    it('shows field count badges on doc cards', () => {
        renderExplorer();
        const fieldBadges = screen.getAllByText(/fields$/);
        expect(fieldBadges.length).toBeGreaterThan(0);
    });

    it('can switch verticals via sidebar', async () => {
        const user = userEvent.setup();
        renderExplorer();

        // Click on the first Real Estate vertical (there are two: IT and US)
        const realEstateButtons = screen.getAllByText('Real Estate');
        await user.click(realEstateButtons[0]);

        // Verify the heading changed — no longer the initial Accountant config
        const heading = document.querySelector('.explorer__title');
        expect(heading?.textContent).not.toContain('Commercialista');
    });

    it('expands a doc card on click', async () => {
        const user = userEvent.setup();
        renderExplorer();

        // Click the first document card header
        const headers = screen.getAllByRole('button');
        const docCardHeader = headers.find(btn =>
            btn.classList.contains('doc-card__header')
        );
        expect(docCardHeader).toBeDefined();

        if (docCardHeader) {
            await user.click(docCardHeader);
            // After expanding, field table headers should appear
            const fieldHeaders = screen.getAllByText('Field');
            expect(fieldHeaders.length).toBeGreaterThan(0);
        }
    });
});
