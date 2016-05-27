import charCodeTheme from './char-code-theme';

export default (options = {}) => charCodeTheme({
  ...options,
  matches: {
    ...(options.matches || {}),
    '-': '#d4d7d6',
    '---': '#d4d7d6',
    '##': '#a074c4',
    '#': '#a074c4',
    '```': '#519aba',
    '\n': '#8dc149',
  },
});
