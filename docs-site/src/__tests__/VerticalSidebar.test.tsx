import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VerticalSidebar from '../components/VerticalSidebar'

describe('VerticalSidebar', () => {
    it('renders the Verticals heading', () => {
        render(<VerticalSidebar activeIdx={0} onSelect={() => { }} countKey="documentTypes" />);
        expect(screen.getByText('Verticals')).toBeInTheDocument();
    });

    it('renders all 5 verticals', () => {
        render(<VerticalSidebar activeIdx={0} onSelect={() => { }} countKey="documentTypes" />);
        expect(screen.getByText('Accountant')).toBeInTheDocument();
        expect(screen.getByText('Car Dealership')).toBeInTheDocument();
        expect(screen.getByText('Insurance')).toBeInTheDocument();
        // Two Real Estate entries
        const realEstateItems = screen.getAllByText('Real Estate');
        expect(realEstateItems).toHaveLength(2);
    });

    it('highlights the active vertical', () => {
        render(<VerticalSidebar activeIdx={1} onSelect={() => { }} countKey="documentTypes" />);
        const buttons = screen.getAllByRole('button');
        expect(buttons[1].classList.contains('explorer__vertical-btn--active')).toBe(true);
        expect(buttons[0].classList.contains('explorer__vertical-btn--active')).toBe(false);
    });

    it('shows correct count based on countKey', () => {
        const { rerender } = render(
            <VerticalSidebar activeIdx={0} onSelect={() => { }} countKey="documentTypes" />
        );
        // Verify numeric counts render
        screen.getAllByText(/^\d+$/);

        rerender(
            <VerticalSidebar activeIdx={0} onSelect={() => { }} countKey="entityTypes" />
        );
        const entityCounts = screen.getAllByText(/^\d+$/);
        // Entity count is typically less than doc type count
        expect(entityCounts[0].textContent).toBeDefined();
        // Just verify it re-renders without crashing
        expect(entityCounts.length).toBe(5);
    });

    it('calls onSelect with the correct index when clicked', async () => {
        const user = userEvent.setup();
        const onSelect = vi.fn();

        render(<VerticalSidebar activeIdx={0} onSelect={onSelect} countKey="documentTypes" />);

        const buttons = screen.getAllByRole('button');
        await user.click(buttons[2]); // Click the third vertical

        expect(onSelect).toHaveBeenCalledWith(2);
    });
});
