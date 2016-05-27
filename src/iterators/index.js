import * as linearIterator from './linear-iterator';
import * as linesIterator from './lines-iterator';

const iterators = new Map();

const add = (name, iterator) => {
  iterators.set(name, {
    ...iterator,
    color: iterator.color.toLowerCase(),
  });
};

add('linear', {
  ...linearIterator,
  color: '#009900',
});

add('lines', {
  ...linesIterator,
  color: '#cc0000',
});

export default iterators;
