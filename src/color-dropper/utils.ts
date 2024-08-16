export function getHexColorFromImageData(imageData: Uint8ClampedArray): string {
  const [r, g, b] = imageData;
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

export function getZoomedImage(
  offscreenCanvas: HTMLCanvasElement | null,
  x: number,
  y: number,
  zoomFactor: number,
  zoomWidth: number,
  zoomHeight: number
): string | null {
  if (!offscreenCanvas) {
      return null;
  }

  const zoomedCanvas = document.createElement('canvas');
  zoomedCanvas.width = zoomWidth;
  zoomedCanvas.height = zoomHeight;
  const zoomedCtx = zoomedCanvas.getContext('2d');

  if (zoomedCtx) {
      zoomedCtx.drawImage(
          offscreenCanvas,
          x - zoomWidth / (2 * zoomFactor), y - zoomHeight / (2 * zoomFactor),
          zoomWidth / zoomFactor, zoomHeight / zoomFactor,
          0, 0,
          zoomWidth, zoomHeight
      );
      return zoomedCanvas.toDataURL();
  }

  return null;
}

export function loadImageToCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  imagePath: string,
  setOffscreenCanvas: (canvas: HTMLCanvasElement) => void
): void {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const img = new Image();
  img.src = imagePath;

  img.onload = () => {
      if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const offscreen = document.createElement('canvas');
          offscreen.width = canvas.width;
          offscreen.height = canvas.height;
          const offscreenCtx = offscreen.getContext('2d', { willReadFrequently: true });

          if (offscreenCtx) {
              offscreenCtx.drawImage(canvas, 0, 0);
              setOffscreenCanvas(offscreen);
          }
      }
  };
}

export function handleMouseMoveLogic(
  event: React.MouseEvent,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  offscreenCanvas: HTMLCanvasElement | null,
  setDropperPosition: (position: { x: number; y: number }) => void,
  setZoomedBackground: (background: string) => void,
  dropperRef: React.RefObject<HTMLDivElement>
): void {
  if (!offscreenCanvas) return;

  const canvas = canvasRef.current;
  const offscreenCtx = offscreenCanvas.getContext('2d');

  if (canvas && offscreenCtx) {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(event.clientX - rect.left);
      const y = Math.floor(event.clientY - rect.top);

      const imageData = offscreenCtx.getImageData(x, y, 1, 1).data;
      const hexColor = getHexColorFromImageData(imageData);

      setDropperPosition({ x, y });

      const zoomedBackground = getZoomedImage(offscreenCanvas, x, y, 2, 50, 50);
      if (zoomedBackground) {
          setZoomedBackground(zoomedBackground);
      }

      dropperRef.current && (dropperRef.current.innerText = hexColor);
  }
}

export function handleKeyDownLogic(
  event: React.KeyboardEvent,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  offscreenCanvas: HTMLCanvasElement | null,
  dropperPosition: { x: number; y: number },
  setDropperPosition: (position: { x: number; y: number }) => void,
  setZoomedBackground: (background: string) => void,
  setSelectedColor: (color: string) => void,
  dropperRef: React.RefObject<HTMLDivElement>
): void {
  if (!offscreenCanvas) return;

  let { x, y } = dropperPosition;

  switch (event.key) {
      case 'w':
          y = Math.max(0, y - 1);
          break;
      case 's':
          y = Math.min(canvasRef.current!.height - 1, y + 1);
          break;
      case 'a':
          x = Math.max(0, x - 1);
          break;
      case 'd':
          x = Math.min(canvasRef.current!.width - 1, x + 1);
          break;
      case 'Enter':
          setSelectedColor(dropperRef.current?.innerText || '#FFFFFF');
          return;
      default:
          return;
  }

  setDropperPosition({ x, y });

  const offscreenCtx = offscreenCanvas.getContext('2d');
  if (offscreenCtx) {
      const imageData = offscreenCtx.getImageData(x, y, 1, 1).data;
      const hexColor = getHexColorFromImageData(imageData);

      const zoomedBackground = getZoomedImage(offscreenCanvas, x, y, 2, 50, 50);
      if (zoomedBackground) {
          setZoomedBackground(zoomedBackground);
      }

      dropperRef.current && (dropperRef.current.innerText = hexColor);
  }
}