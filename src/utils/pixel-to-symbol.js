const createColorsMap = (matches = {}) => {
  const colorsMap = new Map();

  for (const match of Object.keys(matches)) {
    const colors = Array.isArray(matches[match])
      ? matches[match]
      : Array(match.length).fill(matches[match]);

    colorsMap.set(colors.map(color => color.toLowerCase()).join(''), match);
  }

  return colorsMap;
};

const createColorsSet = (matches = {}) => {
  const colorsSet = new Set();

  for (const match of Object.keys(matches)) {
    const colors = Array.isArray(matches[match])
      ? matches[match]
      : Array(match.length).fill(matches[match]);

    if (colors.length !== match.length) {
      throw new Error('Wrong matches configuration');
    }

    colors.reduce((pairs, color) => {
      const paired = pairs + color.toLowerCase();
      colorsSet.add(paired);

      return paired;
    }, '');
  }

  return colorsSet;
};

export default (image, decode, options = {}) => {
  const colorsSet = createColorsSet(options.matches);
  const colorsMap = createColorsMap(options.matches);

  let colorsMatch = '';

  const convert = (match) => {
    let symbol = '';

    if (colorsMap.has(match)) {
      symbol = colorsMap.get(match);
    } else {
      symbol = match.split('#')
        .map(c => decode(`#${c}`))
        .join('');
    }

    return symbol;
  };

  return (hex, isLast) => {
    const currentColorsMatch = colorsMatch + hex;
    let symbol = '';

    if (colorsSet.has(currentColorsMatch)) {
      colorsMatch += hex;
    } else {
      symbol = convert(colorsMatch || hex);

      if (colorsMatch) {
        colorsMatch = hex;
      } else {
        colorsMatch = '';
      }
    }

    if (isLast) {
      symbol += convert(colorsMatch || hex);
    }

    return symbol;
  };
};
