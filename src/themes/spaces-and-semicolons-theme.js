import charCodeThemeSetup from './char-code-theme';

const SPACE_HEX = '#ffcc33';
const COLOMN_HEX = '#cc0000';

export default (options = {}) => {
  const charCodeTheme = charCodeThemeSetup(options);

  return {
    encode: symbol => {
      switch (symbol) {
        case ' ':
          return SPACE_HEX;

        case ';':
          return COLOMN_HEX;

        default:
          return charCodeTheme.encode(symbol);
      }
    },
    decode: hex => {
      switch (hex) {
        case SPACE_HEX:
          return ' ';

        case COLOMN_HEX:
          return ';';

        default:
          return charCodeTheme.decode(hex);
      }
    },
  };
};
