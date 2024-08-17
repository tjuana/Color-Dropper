import { render, screen } from '@testing-library/react';
import ColorDisplay from '../ColorDisplay';
import '@testing-library/jest-dom';

describe('ColorDisplay', () => {
  it('should apply the selected color as background color', () => {
    render(<ColorDisplay selectedColor="#FF5733" />);
    const colorBox = screen.getByRole('img');
    expect(colorBox).toHaveStyle({ backgroundColor: 'rgb(255, 87, 51)' });
  });
});

describe('ColorDisplay', () => {
  it('should have the correct aria-label with the selected color', () => {
    render(<ColorDisplay selectedColor="#FF5733" />);
    const colorBox = screen.getByRole('img');
    expect(colorBox).toHaveAttribute('aria-label', 'Selected color: #FF5733');
  });
});
