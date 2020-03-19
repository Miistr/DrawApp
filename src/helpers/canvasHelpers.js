import { matrixToText } from "./matrixHelpers";

export const drawLine = (canvas, x0, x1, y0, y1, fillSymbol) => {
  let xCoordinateStart = parseInt(x0, 10);
  let xCoordinateEnd = parseInt(x1, 10);
  let yCoordinateStart = parseInt(y0, 10);
  let yCoordinateEnd = parseInt(y1, 10);
  for (let y = yCoordinateStart - 1; y <= yCoordinateEnd - 1; y++) {
    for (let x = xCoordinateStart - 1; x <= xCoordinateEnd - 1; x++) {
      canvas[y][x] = fillSymbol;
    }
  }

  return canvas;
};

export const drawRectangle = (canvas, x0, x1, y0, y1, fillSymbol) => {
  let xCoordinateStart = parseInt(x0, 10);
  let xCoordinateEnd = parseInt(x1, 10);
  let yCoordinateStart = parseInt(y0, 10);
  let yCoordinateEnd = parseInt(y1, 10);
  for (let y = yCoordinateStart - 1; y <= yCoordinateEnd - 1; y++) {
    for (let x = xCoordinateStart - 1; x <= xCoordinateEnd - 1; x++) {
      if (y === yCoordinateStart - 1 || y === yCoordinateEnd - 1) {
        canvas[y][x] = fillSymbol;
      }
      canvas[y][xCoordinateStart - 1] = fillSymbol;
      canvas[y][xCoordinateEnd - 1] = fillSymbol;
    }
  }

  return canvas;
};

export const drawFill = (canvas, x0, y0, fillSymbol, oldSymbol, wallSymbol) => {
  let xCoordinate = parseInt(x0, 10);
  let yCoordinate = parseInt(y0, 10);
  let rowLength = canvas.length;
  let columnLength = canvas[0].length;

  if (
    xCoordinate >= 0 &&
    xCoordinate < columnLength &&
    yCoordinate >= 0 &&
    yCoordinate < rowLength &&
    canvas[yCoordinate][xCoordinate] === oldSymbol &&
    canvas[yCoordinate][xCoordinate] !== fillSymbol &&
    canvas[yCoordinate][xCoordinate] !== wallSymbol
  ) {
    canvas[yCoordinate][xCoordinate] = fillSymbol;
    drawFill(canvas, xCoordinate + 1, yCoordinate, fillSymbol, oldSymbol, wallSymbol);
    drawFill(canvas, xCoordinate - 1, yCoordinate, fillSymbol, oldSymbol, wallSymbol);
    drawFill(canvas, xCoordinate, yCoordinate + 1, fillSymbol, oldSymbol, wallSymbol);
    drawFill(canvas, xCoordinate, yCoordinate - 1, fillSymbol, oldSymbol, wallSymbol);
  }

  return canvas;
};

export const canvasHistoryGenerateObjectURL = canvasHistory => {
  let result = "";
  canvasHistory.forEach(canvas => {
    result += matrixToText(canvas);
    result += "\n";
  });
  return URL.createObjectURL(new Blob([result], { type: "text/plain" }));
};
