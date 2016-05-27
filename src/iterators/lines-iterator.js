import { create } from '../lwip-image';
import { EOL } from 'os';
import hexToRgb from '../utils/hex-to-rgb';
import createSymbolToPixel from '../utils/symbol-to-pixel';
import createPixelToSymbol from '../utils/pixel-to-symbol';

const DEFAULT_BG = '#000000';

export const iterateSource = (source, encode, options = {}) => {
  const eolRegExp = new RegExp(EOL);
  const lines = source.split(eolRegExp);

  let max = 0;
  for (const line of lines) {
    if (line.length > max) {
      max = line.length;
    }
  }

  const width = max + 1;
  const height = lines.length;
  const background = hexToRgb(options.background || DEFAULT_BG);

  /**
   * Create image object with needed width and height
   * width == max line length
   * height == lines number
   */
  return create(width, height, background).then(image => {
    /**
     * Create function that encode symbol into image
     * That is needed beacause not each symbol will be converted
     * There is maybe symbol's collections
     * So better store that code into separated function instead of
     * in each iterator
     */
    const symbolToPixel = createSymbolToPixel(image, encode, options);
    let x = 0;
    let y = 0;

    /**
     * Iterate source file lines
     */
    for (const line of lines) {
      x = 0;
      y++;

      const symbols = line.split('');
      symbols.push(EOL);

      const isLastLine = y === lines.length - 1;
      /**
       * Iterate line's symbols
       */
      for (const symbol of symbols) {
        const isLastLineSymbol = x === symbols.length - 1;
        const isLastSymbol = isLastLine && isLastLineSymbol;

        symbolToPixel(symbol, x, y, isLastSymbol);
        x++;
      }

      /**
       * Add EOL symbol
       */
      // if (!isLastLine) {
      //   const newLinePixel = encode(EOL, x, y);
      //   image.setAt(x, y, newLinePixel);
      // }
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
