import charCodeTheme from './char-code-theme';

export default (options = {}) => charCodeTheme({
  ...options,
  matches: {
    ...(options.mathces || {}),
    'var': '#225378',
    'const': '#1695A3',
    'let': '#ACF0F2',
    'for': '#EB7F00',
    'class': '#7E8AA2',
    'constructor': '#263248',
  },
});
