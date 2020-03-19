export const createMatrixArray = (rows, columns, fillSymbol = 0) =>
  Array(rows)
    .fill(null)
    .map(() => Array(columns).fill(fillSymbol));

export const cloneMatrixArray = matrixArray => [...matrixArray.map(row => [...row])];

export const matrixToText = matrix => {
  let rowLength = matrix.length;
  let columnLength = matrix[0].length;
  let result = "";

  for (let y = 0; y < rowLength; y++) {
    if (y === 0) result += "-".repeat(columnLength + 2) + "\n";
    for (let x = 0; x < columnLength; x++) {
      if (x === 0) result += "|";
      result += matrix[y][x];
      if (x === columnLength - 1) result += "|";
    }
    result += "\n";
    if (y === rowLength - 1) result += "-".repeat(columnLength + 2) + "\n";
  }

  return result;
};
