import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Entities from '../pages/Entities'

function renderEntities() {
    return render(
        <MemoryRouter>
            <Entities />
        </MemoryRouter>
    );
}

describe('Entities', () => {
    it('renders the sidebar with all verticals', () => {
        renderEntities();
        expect(screen.getByText('Verticals')).toBeInTheDocument();
    });

    it('shows entity type count badge', () => {
        renderEntities();
        const badges = screen.getAllByText(/entity types$/);
        expect(badges.length).toBeGreaterThan(0);
    });

    it('renders entity cards with source badges', () => {
        renderEntities();
        const sourceBadges = screen.getAllByText(/sources$/);
        expect(sourceBadges.length).toBeGreaterThan(0);
    });

    it('can expand an entity card without crashing', async () => {
        const user = userEvent.setup();
        renderEntities();

        const headers = screen.getAllByRole('button');
        const entityHeader = headers.find(btn =>
            btn.classList.contains('entity-card__header')
        );
        expect(entityHeader).toBeDefined();

        if (entityHeader) {
            // Should not throw even if dataSources/fields are undefined
            await user.click(entityHeader);
            // Description should appear
            const descriptions = document.querySelectorAll('.entity-card__desc');
            expect(descriptions.length).toBeGreaterThan(0);
        }
    });

    it('can switch verticals', async () => {
        const user = userEvent.setup();
        renderEntities();

        const insuranceBtn = screen.getByText('Insurance');
        await user.click(insuranceBtn);

        expect(screen.getByText(/Insurance — Entities/)).toBeInTheDocument();
    });
});
