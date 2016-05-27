import { create } from '../lwip-image';

import createSymbolToPixel from '../utils/symbol-to-pixel';
import createPixelToSymbol from '../utils/pixel-to-symbol';

export const iterateSource = (source, encode, options = {}) => {
  const size = source.length;
  const side = Math.ceil(Math.sqrt(size));

  /**
   * Create image object with needed width and height
   * In this iterator - width == height
   */
  return create(side, side, 'black').then(image => {
    /**
     * Create function that encode symbol into image
     * That is needed beacause not each symbol will be converted
     * There is maybe symbol's collections
     * So better store that code into separated function instead of
     * in each iterator
     */
    const symbolToPixel = createSymbolToPixel(image, encode, options);

    for (let y = 0; y < side; y++) {
      for (let x = 0; x < side; x++) {
        const i = (y * side) + x;

        if (i < source.length) {
          const symbol = source[i];
          const isLastSymbol = i === source.length - 1;

          symbolToPixel(symbol, x, y, isLastSymbol);
        }
      }
    }

    return image;
  });
};

export const iterateImage = (image, decode, options = {}) => {
  /**
   * Create pixel to symbol function
   * Iterate image pixels and convert them into symbols
   */
  const pixelToSymbol = createPixelToSymbol(image, decode, options);
  const { width, height } = image.getSize();

  return new Promise((resolve) => {
    let source = '';

    for (let y = 0; y < height - 1; y++) {
      const isLastLine = y === (height - 1) - 1;

      for (let x = 0; x < width; x++) {
        const isLastPixel = x === width.length - 1;

        const hex = image.getAt(x, y);
        source += pixelToSymbol(hex, isLastLine && isLastPixel);
      }
    }

    resolve(source);
  });
};
