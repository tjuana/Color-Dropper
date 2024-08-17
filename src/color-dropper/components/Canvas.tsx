import React from 'react';

interface CanvasProps {
    onMouseMove: (event: React.MouseEvent) => void;
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onKeyDown: (event: React.KeyboardEvent) => void;
    loadImage: () => void;
    width: number;
    height: number;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    onFocus?: () => void;
    onBlur?: () => void;
}

const Canvas: React.FC<CanvasProps> = ({
    onMouseMove,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    loadImage,
    width,
    height,
    canvasRef,
    onFocus,
    onBlur,
}) => {
    React.useEffect(() => {
        loadImage();
    }, [loadImage]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            onMouseMove={onMouseMove}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            tabIndex={0}
            data-testid="canvas-element"
        />
    );
};

export default React.memo(Canvas);
