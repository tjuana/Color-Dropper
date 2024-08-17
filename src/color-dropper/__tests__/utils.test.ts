import { getHexColorFromImageData, getZoomedImage } from '../utils';

describe('getHexColorFromImageData', () => {
  it('should return the correct hex color for given image data', () => {
    const imageData = new Uint8ClampedArray([255, 0, 0, 255]);
    const hexColor = getHexColorFromImageData(imageData);
    expect(hexColor).toBe('#FF0000');
  });

  it('should return black if image data is zero', () => {
    const imageData = new Uint8ClampedArray([0, 0, 0, 255]);
    const hexColor = getHexColorFromImageData(imageData);
    expect(hexColor).toBe('#000000');
  });
});

describe('getZoomedImage', () => {
  it('should return a valid data URL for a zoomed image', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    ctx?.fillRect(0, 0, 100, 100); // Fill with black

    const dataUrl = getZoomedImage(canvas, 50, 50, 2, 50, 50);
    expect(dataUrl).toMatch(/^data:image\/png;base64,/);
  });

  it('should return null if zoomed canvas cannot be created', () => {
    const dataUrl = getZoomedImage(null, 50, 50, 2, 50, 50);
    expect(dataUrl).toBeNull();
});
});
