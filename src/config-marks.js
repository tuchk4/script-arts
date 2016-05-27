import themes from './themes';
import iterators from './iterators';

const getConfigY = (width, height) => height - 1;
const getIteratorX = (width, height) => width - 1;
const getThemeX = (width, height) => 0;

export const getColors = image => {
  const { width, height } = image.getSize();

  // set config pixels
  const configY = getConfigY(width, height);
  const iteratorX = getIteratorX(width, height);
  const themeX = getThemeX(width, height);

  return {
    iterator: image.getAt(iteratorX, configY).toLowerCase(),
    theme: image.getAt(themeX, configY).toLowerCase(),
  };
};

export const getTools = (image) => {
  const colors = getColors(image);
  let theme = null;
  let iterator = null;

  for (const possibleTheme of themes.entries()) {
    if (possibleTheme[1].color === colors.theme) {
      theme = possibleTheme[1];
      break;
    }
  }

  for (const possibleIterator of iterators.entries()) {
    if (possibleIterator[1].color === colors.iterator) {
      iterator = possibleIterator[1];
      break;
    }
  }

  if (!theme) {
    throw new Error('Can not find theme.');
  }

  if (!iterator) {
    throw new Error('Can not find iterator.');
  }

  return {
    theme,
    iterator,
  };
};

export const mark = (image, iterator, theme) => {
  return image.pad(0, 0, 0, 1, 'black').then(() => {
    const { width, height } = image.getSize();

    // set config pixels
    const configY = getConfigY(width, height);
    const iteratorX = getIteratorX(width, height);
    const themeX = getThemeX(width, height);

    image.setAt(iteratorX, configY, iterator.color);
    image.setAt(themeX, configY, theme.color);

    return image;
  });
};
