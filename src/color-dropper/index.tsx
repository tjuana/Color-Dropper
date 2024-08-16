import React, { useState, useCallback, useRef } from 'react';
import './ColorDropper.css';
import beachScy from '../assets/1920x1080-4598441-beach-water-pier-tropical-sky-sea-clouds-island-palm-trees.jpg';
import Canvas from './components/Canvas';
import ColorDropperIndicator from './components/ColorDropperIndicator';
import ColorDisplay from './components/ColorDisplay';
import { loadImageToCanvas, handleMouseMoveLogic, handleKeyDownLogic } from './utils';

import throttle from 'lodash/throttle';

const ColorDropper: React.FC = () => {
    const [selectedColor, setSelectedColor] = useState<string>('#FFFFFF');
    const [isDropperActive, setDropperActive] = useState<boolean>(false);
    const [offscreenCanvas, setOffscreenCanvas] = useState<HTMLCanvasElement | null>(null);
    const [dropperPosition, setDropperPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [zoomedBackground, setZoomedBackground] = useState<string>('');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dropperRef = useRef<HTMLDivElement>(null);

    const loadImage = useCallback(() => {
        loadImageToCanvas(canvasRef, beachScy, setOffscreenCanvas);
    }, []);

    const handleMouseMove = useCallback(
      throttle((event: React.MouseEvent) => {
          if (!isDropperActive) return;
          handleMouseMoveLogic(event, canvasRef, offscreenCanvas, setDropperPosition, setZoomedBackground, dropperRef);
      }, 33), [isDropperActive, offscreenCanvas]);

    const handleClick = useCallback(() => {
        if (isDropperActive) {
            setSelectedColor(dropperRef.current?.innerText || '#FFFFFF');
        }
    }, [isDropperActive]);

    const handleMouseEnter = useCallback(() => {
        setDropperActive(true);
        document.body.classList.add('dropper-active-cursor');
        canvasRef.current?.focus();
    }, []);

    const handleMouseLeave = useCallback(() => {
        setDropperActive(false);
        document.body.classList.remove('dropper-active-cursor');
    }, []);

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (!isDropperActive) return;
        handleKeyDownLogic(
            event,
            canvasRef,
            offscreenCanvas,
            dropperPosition,
            setDropperPosition,
            setZoomedBackground,
            setSelectedColor,
            dropperRef
        );
    }, [isDropperActive, offscreenCanvas, dropperPosition]);

    const handleCanvasFocus = useCallback(() => {
        setDropperActive(true);
    }, []);

    const handleCanvasBlur = useCallback(() => {
        setDropperActive(false);
    }, []);

    return (
        <div>
            <header>
                <h1>Color Dropper Tool</h1>
                <ColorDisplay selectedColor={selectedColor} />
            </header>
            <div className="canvas-container">
                <Canvas
                    onMouseMove={handleMouseMove}
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onKeyDown={handleKeyDown}
                    loadImage={loadImage}
                    width={800}
                    height={600}
                    canvasRef={canvasRef}
                    onFocus={handleCanvasFocus}  // Обработчик фокуса
                    onBlur={handleCanvasBlur}  
                />
                <ColorDropperIndicator
                    position={dropperPosition}
                    color={selectedColor}
                    zoomedBackground={zoomedBackground}
                    dropperRef={dropperRef}
                />
            </div>
        </div>
    );
};

export default React.memo(ColorDropper);
