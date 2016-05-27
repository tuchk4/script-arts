const createSymbolSet = (matches = {}) => {
  const symbolSet = new Set();

  for (const match of Object.keys(matches)) {
    match.split('').reduce((pairs, symbol) => {
      const paired = pairs + symbol;
      symbolSet.add(paired);

      return paired;
    }, '');
  }

  return symbolSet;
};

const createSymbolMap = (matches = {}) => {
  const symbolMap = new Map();

  for (const match of Object.keys(matches)) {
    symbolMap.set(match, matches[match]);
  }

  return symbolMap;
};

export default (image, encode, options = {}) => {
  const symbolSet = createSymbolSet(options.matches);
  const symbolMap = createSymbolMap(options.matches);

  let match = '';
  let coords = [];

  const draw = () => {
    let color = null;

    if (symbolMap.has(match)) {
      color = symbolMap.get(match);
    } else {
      color = match.split('').map(s => encode(s));
    }

    let i = 0;
    for (const { x, y } of coords) {
      image.setAt(x, y,
        Array.isArray(color) ? color[i] : color
      );
      i++;
    }
  };

  return (symbol, x, y, isLast) => {
    const currentMatch = match + symbol;
    if (symbolSet.has(currentMatch)) {
      match += symbol;
      coords.push({ x, y });
    } else {
      draw();

      match = symbol;
      coords = [];
      coords.push({ x, y });
    }

    if (isLast) {
      draw();
    }
  };
};
