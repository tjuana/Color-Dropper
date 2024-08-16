import React from 'react';
import dropperIcon from '../../assets/Selected Color.svg';

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
                backgroundImage: `url(${zoomedBackground}), url(${dropperIcon})`,
            }}
            role="tooltip"
            aria-label={`Current color: ${color}`}
        >
            {color}
        </div>
    );
};

export default React.memo(ColorDropperIndicator);
