import React from 'react';

interface ColorDisplayProps {
    selectedColor: string;
}

const ColorDisplay: React.FC<ColorDisplayProps> = ({ selectedColor }) => {
    return (
        <div
            id="selected-color-display"
            aria-live="polite"
            aria-atomic="true"
        >
            <div
                style={{ backgroundColor: selectedColor }}
                aria-label={`Selected color: ${selectedColor}`}
                role="img"
            ></div>
            <span>{selectedColor}</span>
        </div>
    );
};

export default React.memo(ColorDisplay);
