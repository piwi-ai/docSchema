import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import JsonViewer from '../pages/JsonViewer'

function renderJsonViewer() {
    return render(
        <MemoryRouter>
            <JsonViewer />
        </MemoryRouter>
    );
}

describe('JsonViewer', () => {
    it('renders the page heading', () => {
        renderJsonViewer();
        expect(screen.getByText('JSON Configuration')).toBeInTheDocument();
    });

    it('shows a config filename', () => {
        renderJsonViewer();
        // First vertical is accountant-it → "accountant/it.config.json"
        expect(screen.getByText('accountant/it.config.json')).toBeInTheDocument();
    });

    it('shows file size in KB', () => {
        renderJsonViewer();
        expect(screen.getByText(/KB$/)).toBeInTheDocument();
    });

    it('renders syntax-highlighted JSON', () => {
        renderJsonViewer();
        const codeBlock = document.querySelector('.json-viewer__code');
        expect(codeBlock).not.toBeNull();
        expect(codeBlock?.innerHTML).toContain('json-key');
    });

    it('opens dropdown on click and shows all verticals', async () => {
        const user = userEvent.setup();
        renderJsonViewer();

        const trigger = screen.getByText(/Accountant/);
        await user.click(trigger);

        // All verticals should appear in dropdown
        expect(screen.getByText(/Real Estate — Italy/)).toBeInTheDocument();
        expect(screen.getByText(/Insurance — Italy/)).toBeInTheDocument();
    });

    it('switches config when selecting from dropdown', async () => {
        const user = userEvent.setup();
        renderJsonViewer();

        // Open dropdown
        const trigger = screen.getByText(/Accountant/);
        await user.click(trigger);

        // Select Real Estate US
        const usOption = screen.getByText(/Real Estate — USA/);
        await user.click(usOption);

        // Filename should update
        expect(screen.getByText('real-estate/us.config.json')).toBeInTheDocument();
    });

    it('copies JSON to clipboard on copy click', async () => {
        const user = userEvent.setup();
        const mockWriteText = vi.fn().mockResolvedValue(undefined);
        Object.defineProperty(navigator, 'clipboard', {
            value: { writeText: mockWriteText },
            writable: true,
            configurable: true,
        });

        renderJsonViewer();

        const copyBtn = screen.getByText('Copy');
        await user.click(copyBtn);

        expect(mockWriteText).toHaveBeenCalledTimes(1);
        expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
});
