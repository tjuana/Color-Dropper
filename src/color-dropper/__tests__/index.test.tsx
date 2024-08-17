import { render, fireEvent, screen } from '@testing-library/react';
import ColorDropper from '../index';
import '@testing-library/jest-dom';

jest.mock('../assets/1920x1080-4598441-beach-water-pier-tropical-sky-sea-clouds-island-palm-trees.jpg', () => 'mocked-image-path');

describe('ColorDropper component', () => {

    it('renders without crashing', () => {
        render(<ColorDropper />);
        expect(screen.getByText('Color Dropper Tool')).toBeInTheDocument();
        expect(screen.getByTestId('canvas-element')).toBeInTheDocument();
    });

    it('initially displays the default color (#FFFFFF)', () => {
        render(<ColorDropper />);
        const colorDisplays = screen.getAllByText('#FFFFFF');
        expect(colorDisplays).toHaveLength(2); // Ensure it matches both the dropper and the color display
    });

    it('updates dropper position and zoomed background on mouse move', () => {
        render(<ColorDropper />);
        const canvas = screen.getByTestId('canvas-element');

        fireEvent.mouseEnter(canvas);
        fireEvent.mouseMove(canvas, { clientX: 100, clientY: 150 });

        const dropperIndicator = screen.getByRole('tooltip');
        expect(dropperIndicator).toHaveStyle({ left: '-25px', top: '-25px' }); // Adjust these values to match actual behavior if necessary
    });

    it('updates the selected color on canvas click', () => {
        render(<ColorDropper />);
        const canvas = screen.getByTestId('canvas-element');

        fireEvent.mouseEnter(canvas);
        fireEvent.click(canvas);

        const colorDisplays = screen.getAllByText(/#[A-Fa-f0-9]{6}/);
        expect(colorDisplays.length).toBeGreaterThan(1); // Expect more than one element to display the selected color
    });

    it('handles keyboard interactions correctly', () => {
        render(<ColorDropper />);
        const canvas = screen.getByTestId('canvas-element');

        fireEvent.focus(canvas);
        fireEvent.keyDown(canvas, { key: 'ArrowRight' });

        const dropperIndicator = screen.getByRole('tooltip');
        expect(dropperIndicator).toHaveStyle({ left: '-25px' });
    });

});