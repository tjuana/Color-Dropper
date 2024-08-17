import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Canvas from '../Canvas';
import '@testing-library/jest-dom';

describe('Canvas component', () => {
  it('renders the canvas element with correct width and height', () => {
    const mockCanvasRef = React.createRef<HTMLCanvasElement>();

    const { getByTestId } = render(
      <Canvas
        onMouseMove={jest.fn()}
        onClick={jest.fn()}
        onMouseEnter={jest.fn()}
        onMouseLeave={jest.fn()}
        onKeyDown={jest.fn()}
        loadImage={jest.fn()}
        width={500}
        height={400}
        canvasRef={mockCanvasRef}
      />
    );

    const canvasElement = getByTestId('canvas-element');
    expect(canvasElement).toBeInTheDocument();
    expect(canvasElement).toHaveAttribute('width', '500');
    expect(canvasElement).toHaveAttribute('height', '400');
  });

  it('handles mouse events correctly', () => {
    const mockCanvasRef = React.createRef<HTMLCanvasElement>();
    const handleMouseMove = jest.fn();
    const handleClick = jest.fn();

    const { getByTestId } = render(
      <Canvas
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        onMouseEnter={jest.fn()}
        onMouseLeave={jest.fn()}
        onKeyDown={jest.fn()}
        loadImage={jest.fn()}
        width={500}
        height={400}
        canvasRef={mockCanvasRef}
      />
    );

    const canvasElement = getByTestId('canvas-element');

    fireEvent.mouseMove(canvasElement);
    fireEvent.click(canvasElement);

    expect(handleMouseMove).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles focus and blur events correctly', () => {
    const mockCanvasRef = React.createRef<HTMLCanvasElement>();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    const { getByTestId } = render(
      <Canvas
        onMouseMove={jest.fn()}
        onClick={jest.fn()}
        onMouseEnter={jest.fn()}
        onMouseLeave={jest.fn()}
        onKeyDown={jest.fn()}
        loadImage={jest.fn()}
        width={500}
        height={400}
        canvasRef={mockCanvasRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );

    const canvasElement = getByTestId('canvas-element');

    fireEvent.focus(canvasElement);
    fireEvent.blur(canvasElement);

    expect(handleFocus).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});
