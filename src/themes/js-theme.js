import charCodeTheme from './char-code-theme';

export default (options = {}) => charCodeTheme({
  ...options,
  matches: {
    ...(options.matches || {}),
    'var': '#cc0000',
    'const': '#d4d7d6',
    'let': '#d4d7d6',
    'for': '#a074c4',
    'while': '#a074c4',
    'if': '#a074c4',
    '(': '#babebd',
    ')': '#BFC1C1',
    'true': '#519aba',
    'false': '#519aba',
    'function': '#a074c4',
    ':': '#8dc149',
    ';': '#4d5a5e',
    ',': '#495356',
    '.': '#556367',
    '=': '#505B5F',
  },
});
