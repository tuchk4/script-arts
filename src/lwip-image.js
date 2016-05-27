import lwip from 'lwip';
import hexToRgb from './utils/hex-to-rgb';
import rgbToHex from './utils/rgb-to-hex';

const isObject = val => {
  if (val === null) {
    return false;
  }

  return ((typeof val === 'function') || (typeof val === 'object'));
}

class Lwip {
  constructor(lwipImage) {
    this.lwipImage = lwipImage;
    this.batch = lwipImage.batch();
  }

  getAt(x, y) {
    const rgb = this.lwipImage.getPixel(x, y);
    return rgbToHex(rgb);
  }

  setAt(x, y, color) {
    const rgb = isObject(color) ? color : hexToRgb(color);
    return this.batch.setPixel(x, y, rgb);
  }

  pad(left, top, right, bottom, color) {
    return new Promise((resolve, reject) => {
      const lwipImage = this.lwipImage;

      lwipImage.pad(left, top, right, bottom, color, () => {
        resolve(lwipImage);
      });
    });
  }

  getSize() {
    return {
      width: this.lwipImage.width(),
      height: this.lwipImage.height()
    }
  }

  save(name) {
    return new Promise((resolve, reject) => {
      const lwipImage = this.lwipImage;

      this.batch.exec(() => {
        lwipImage.writeFile(name, () => {
          resolve(lwipImage);
        });
      });
    });
  }
}

export function create(width, height, background = 'black') {
  return new Promise((resolve, reject) => {
    lwip.create(width, height, background, (err, lwipImage) => {
      const image = new Lwip(lwipImage);
      resolve(image);
    });
  });
}

export function open(name) {
  return new Promise((resolve, reject) => {
    lwip.open(name, (err, lwipImage) => {
      const image = new Lwip(lwipImage);
      resolve(image);
    });
  });
};
