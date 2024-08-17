import React from 'react';
import { render, screen } from '@testing-library/react';
import ColorDropperIndicator from '../ColorDropperIndicator';
import '@testing-library/jest-dom';

describe('ColorDropperIndicator', () => {
  it('renders with correct position and color', () => {
    const mockDropperRef = React.createRef<HTMLDivElement>();
    const position = { x: 50, y: 100 };
    const color = '#FF5733';

    render(
      <ColorDropperIndicator
        position={position}
        color={color}
        zoomedBackground=""
        dropperRef={mockDropperRef}
      />
    );

    const dropperElement = screen.getByRole('tooltip');
    expect(dropperElement).toBeInTheDocument();
    expect(dropperElement).toHaveStyle(`left: ${position.x - 25}px`);
    expect(dropperElement).toHaveStyle(`top: ${position.y - 25}px`);
    expect(dropperElement).toHaveStyle(`border-color: ${color}`);
  });

  it('has correct aria-label with the selected color', () => {
    const mockDropperRef = React.createRef<HTMLDivElement>();
    const color = '#FF5733';

    render(
      <ColorDropperIndicator
        position={{ x: 50, y: 100 }}
        color={color}
        zoomedBackground=""
        dropperRef={mockDropperRef}
      />
    );

    const dropperElement = screen.getByRole('tooltip');
    expect(dropperElement).toHaveAttribute('aria-label', `Current color: ${color}`);
  });
});
