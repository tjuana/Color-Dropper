import React from 'react';

interface ColorDropperIndicatorProps {
    position: { x: number; y: number };
    color: string;
    zoomedBackground: string;
    dropperRef: React.RefObject<HTMLDivElement>;
}

const ColorDropperIndicator: React.FC<ColorDropperIndicatorProps> = ({
    position,
    color,
    zoomedBackground,
    dropperRef,
}) => {
    return (
        <div
            ref={dropperRef}
            className="color-dropper"
            style={{
                left: position.x - 25,
                top: position.y - 25,
                borderColor: color,
                backgroundImage: `url(${zoomedBackground})`,
            }}
            role="tooltip"
            aria-label={`Current color: ${color}`}
        >
            {color}
        </div>
    );
};

export default React.memo(ColorDropperIndicator);
