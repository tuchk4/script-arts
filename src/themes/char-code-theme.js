import intToHex from '../utils/int-to-hex';
import hexToInt from '../utils/hex-to-int';

const DEFAULT_DELTA = 0;
const DEFAULT_EMPTY_COLOR = '#000';

export default (options) => {
  const delta = options.delta || DEFAULT_DELTA;
  const emptyColor = options.emptyColor || DEFAULT_EMPTY_COLOR;
  return {
    options,
    encode: symbol => {
      let color = emptyColor;

      if (symbol) {
        const int = symbol.charCodeAt(0) + delta;
        color = intToHex(int);
      }

      return color;
    },
    decode: hex => {
      const int = hexToInt(hex);
      const charCode = int - delta;
      //   valid chart code   new line          carriage return
      return charCode > 31 || charCode === 10 || charCode === 13
        ? String.fromCharCode(charCode)
        : '';
    },
  };
};
