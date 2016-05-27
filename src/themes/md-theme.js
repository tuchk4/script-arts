import charCodeTheme from './char-code-theme';

export default (options = {}) => charCodeTheme({
  ...options,
  matches: {
    ...(options.matches || {}),
    '-': '#DED54B',
    '---': '#2C3E50',
    '##': '#2980B9',
    '#': '#9C49A8',
    '```': '#ECF0F1',
  },
});
