# Color Dropper Tool

This project is a color dropper tool designed as part of a photo editor, allowing users to pick colors from an image displayed on an HTML5 canvas. The tool provides the hex code of the color under the cursor, changes the cursor to a dropper icon, and includes a magnification feature to assist in selecting precise colors.

## Features

- **Color Picking**: Users can hover over an image to see the hex code of the color under the cursor.
- **Dynamic Circle Border**: The color dropper circle dynamically updates its border color to match the selected color.
- **Magnifying Glass Effect**: The dropper circle acts as a magnifying glass, zooming in on the area under the cursor for precision.
- **Dropper Icon**: The cursor changes to a dropper icon when the tool is activated, providing a familiar user experience.
- **Color Display**: The selected color's hex code is displayed in the header upon clicking on the canvas.

## Project Structure

- **src/** - The main project code
  - **assets/** - Project assets (icons, images)
  - **color-dropper/** - Core logic for the Color Dropper component
    - **components/** - Separate components for rendering (e.g., Canvas, ColorDropperIndicator)
    - **utils.ts** - Helper functions for image processing and canvas interactions
    - **ColorDropper.css** - Styles for the Color Dropper component
  - **index.tsx** - Main application entry file

## Technical Specifications

- **Canvas**: Utilizes HTML5 Canvas for rendering images and interacting with pixels.
- **TypeScript**: The project is fully implemented in TypeScript for improved type safety and maintainability.
- **Performance**: The tool is optimized to handle large canvases (up to 4000x4000 pixels, 16 MB).

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone git@github.com:tjuana/Color-Dropper.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd Color-Dropper
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```

## Usage

1. Open the application in your browser.
2. Click on the dropper icon to activate the color dropper tool.
3. Hover over the canvas to see the hex code of the color under the cursor.
4. The circle will zoom in on the area under the cursor to assist in selecting colors.
5. Click on the canvas to select a color, which will be displayed in the header.

## Testing

The project includes unit tests to ensure the functionality of key components. To run the tests, use:

```bash
npm run test
```

## Contribution

Feel free to fork the repository and submit pull requests. We welcome contributions to improve the tool.

## License

This project is licensed under the MIT License.

![Color Dropper in action](./src/assets/screenshot.png)