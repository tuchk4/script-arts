import encode from '../src/encode';
import decode from '../src/decode';
// import matchesThemeBase from '../src/utils/matches-theme-base';
import charCodeTheme from '../src/themes/char-code-theme';
import { add as addTheme } from '../src/themes';

import { readFileSync, unlinkSync } from 'fs';
import { join, resolve } from 'path';

const readmeOriginalPath = resolve(join(__dirname, '..', 'README.md'));
const imagePath = resolve(join(__dirname, '.', 'README.png'));
const decodedImagePath = resolve(join(__dirname, '.', 'README.decoded.md'));

const originalSoruce = readFileSync(readmeOriginalPath).toString();

const DEFAULT_ENCODE_PROPS = {
  silent: true,
};

const DEFAULT_DECODE_PROPS = {
  silent: true,
};

addTheme('custom-for-tests', {
  create: options => charCodeTheme({
    ...options,
    matches: {
      // encode whole words with specific colors
      'If you ask "Why"?': '#DED54B',
      '## Just imagine': '#3498DB',
      '## Glossary': '#60DB45',
      'encode': '#ffcc33',
      // encode each symbol of "decode" word with specific color
      'decode': [
        '#cc0000',
        '#009900',
        '#ffcc33',
        '#cc9933',
        '#3399ff',
        '#ff00aa',
      ],
    },
  }),
  color: '#9C49A8',
});

const run = (encodeProps, decodeProps = {}) => {
  return encode(readmeOriginalPath, imagePath, {
    ...DEFAULT_ENCODE_PROPS,
    ...encodeProps,
  }).then(() => {
    return decode(imagePath, decodedImagePath, {
      ...DEFAULT_DECODE_PROPS,
      ...decodeProps,
    }).then(decodedSource => {
      expect(decodedSource).toEqual(originalSoruce);
    });
  });
};

describe('Script arts', () => {
  afterEach(() => {
    unlinkSync(imagePath);
    unlinkSync(decodedImagePath);
  });

  describe('an encoded file decode result should equal original soruce', () => {
    pit('linear iterator / char-code theme', () => {
      return run({
        iterator: 'linear',
        theme: 'char-code',
      });
    });

    pit('lines iterator / char-code theme', () => {
      return run({
        iterator: 'lines',
        theme: 'char-code',
      });
    });

    pit('linear iterator / spaces-and-semicolons theme', () => {
      return run({
        iterator: 'linear',
        theme: 'spaces-and-semicolons',
      });
    });

    pit('lines iterator / spaces-and-semicolons theme', () => {
      return run({
        iterator: 'lines',
        theme: 'spaces-and-semicolons',
      });
    });

    pit('lines iterator / custom for tests theme', () => {
      return run({
        iterator: 'lines',
        theme: 'custom-for-tests',
      });
    });

    pit('lines iterator / custom for tests theme with delta', () => {
      const delta = 10412;

      return run({
        delta,
        iterator: 'lines',
        theme: 'custom-for-tests',
      }, {
        // decode should be with same delta as encode
        delta,
      });
    });
  });
});
