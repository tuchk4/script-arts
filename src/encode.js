import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import themes from './themes';
import iterators from './iterators';
import { mark } from './config-marks';

const DEFAULT_ITERATOR = 'linear';
const DEFAULT_THEME = 'char-code';
const DEFAULT_EXTENSION = '.png';
const DEFAULT_DELTA = 0; // test

const AVAILABLE_EXTENSIONS = ['.png', '.gif', 'jpg'];

export default (script, output, flags = {}) => {
  const delta = flags.delta || DEFAULT_DELTA;
  const iteratorName = flags.iterator || DEFAULT_ITERATOR;
  const themeName = flags.theme || DEFAULT_THEME;
  const outputImage = output || script;
  let imageExtension = extname(outputImage);

  if (AVAILABLE_EXTENSIONS.indexOf(imageExtension) === -1) {
    imageExtension = flags.extension || DEFAULT_EXTENSION;
  } else {
    imageExtension = '';
  }

  if (!iterators.has(iteratorName)) {
    throw new Error(`iterator "${iteratorName}" does not exist`);
  }

  if (!themes.has(themeName)) {
    throw new Error(`theme "${themeName}" does not exist`);
  }

  const iterator = iterators.get(iteratorName);
  const theme = themes.get(themeName);
  const { encode, options } = theme.create({
    delta,
  });

  const path = resolve(script);
  const source = readFileSync(path).toString();

  return iterator.iterateSource(source, encode, options)
    .then(image => {
      // add last row for config pixels
      return mark(image, iterator, theme).then(() => {
        let ext = '';
        if (imageExtension) {
          ext = imageExtension[0] === '.' ? imageExtension : `.${imageExtension}`;
        }

        const outputFile = `${outputImage}${ext}`;

        return image.save(outputFile).then(() => {
          if (!flags.silent) {
            console.log(`file "${script}" encoded to "${outputFile}" art`);
            console.log(`use "${iteratorName}" interator and "${themeName}" theme`);
          }

          return outputFile;
        });
      });
    })
    .catch(e => {
      console.error(e);
    });
};
