import charCodeTheme from './char-code-theme';
import spacesAndSemicolonsTheme from './spaces-and-semicolons-theme';
import mdTheme from './md-theme';
import jsTheme from './js-theme';

const themes = new Map();

export const add = (name, theme) => {
  themes.set(name, {
    ...theme,
    color: theme.color.toLowerCase(),
  });
};

add('char-code', {
  create: charCodeTheme,
  color: '#3399ff',
});

add('spaces-and-semicolons', {
  create: spacesAndSemicolonsTheme,
  color: '#ffcc33',
});

add('md', {
  create: mdTheme,
  color: '#88fc33',
});

add('js', {
  create: jsTheme,
  color: '#ff33ee',
});

export default themes;
