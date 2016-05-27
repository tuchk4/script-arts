import { writeFileSync } from 'fs';
import { extname } from 'path';
import { open } from './lwip-image';
import { getTools } from './config-marks';

const DEFAULT_DELTA = 0;

export default (art, output, flags = {}) => {
  const delta = flags.delta || DEFAULT_DELTA;

  let originalOutput = output;

  if (!originalOutput) {
    const ext = extname(art);

    if (!ext) {
      throw new Error('' +
        'can not auto generate <output> becase source file is without extension'
      + '');
    }

    originalOutput = originalOutput.replace(ext, '');
  }

  return open(art).then(image => {
    const { theme, iterator } = getTools(image);
    const { decode, options } = theme.create({
      delta,
    });

    return iterator.iterateImage(image, decode, options)
      .then(source => {
        writeFileSync(originalOutput, source);

        if (!flags.silent) {
          console.log(`art "${art}" decoded to "${originalOutput}"`);
        }

        return source;
      });
  }).catch((e) => {
    console.log(e);
  });
};
