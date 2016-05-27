export default int => {
  const hex = parseInt(int, 10).toString(16);
  return `#${('0').repeat(6 - hex.length)}${hex}`;
};
