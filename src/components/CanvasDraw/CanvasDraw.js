import React, { useState } from "react";
import { createMatrixArray, cloneMatrixArray } from "../../helpers/matrixHelpers";
import {
  drawLine,
  drawRectangle,
  drawFill,
  canvasHistoryGenerateObjectURL
} from "../../helpers/canvasHelpers";

const CANVAS_COMMANDS = {
  canvas: "C",
  line: "L",
  rectangle: "R",
  fill: "B"
};
const CANVAS_SYMBOLS = {
  xCoordinate: "-",
  yCoordinate: "|",
  cross: "x",
  space: " "
};

const CanvasDraw = () => {
  const [{ canvas, canvasHistory }, setCanvas] = useState({});

  const readFile = event => {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = event => execInstructions(event.target.result);
  };

  const execInstructions = rawInstructions => {
    let canvasHistory = [];
    let canvas;
    const instructionLines = rawInstructions.split("\n");
    instructionLines.forEach(instruction => {
      const [command, ...args] = instruction.split(" ");
      switch (command) {
        case CANVAS_COMMANDS.canvas:
          const [columns, rows] = args;
          canvas = createMatrixArray(
            parseInt(rows, 10),
            parseInt(columns, 10),
            CANVAS_SYMBOLS.space
          );
          break;
        case CANVAS_COMMANDS.line:
          const [Lx0, Ly0, Lx1, Ly1] = args;
          canvas = drawLine(canvas, Lx0, Lx1, Ly0, Ly1, CANVAS_SYMBOLS.cross);
          break;
        case CANVAS_COMMANDS.rectangle:
          const [Rx0, Ry0, Rx1, Ry1] = args;
          canvas = drawRectangle(canvas, Rx0, Rx1, Ry0, Ry1, CANVAS_SYMBOLS.cross);
          break;
        case CANVAS_COMMANDS.fill:
          const [Fx0, Fy0, fillSymbol] = args;
          canvas = drawFill(
            canvas,
            Fx0,
            Fy0,
            fillSymbol,
            CANVAS_SYMBOLS.space,
            CANVAS_SYMBOLS.cross
          );
          break;

        default:
          break;
      }
      console.log(cloneMatrixArray(canvas));
      canvasHistory.push(cloneMatrixArray(canvas));
    });

    setCanvas({ canvas, canvasHistory });
  };

  return (
    <div className="input-block">
      <input type="file" accept=".txt" onChange={readFile}></input>
      {canvasHistory && canvas && (
        <>
          {canvasHistory.map((canvas, index) => (
            <div key={`canvas-${index}`} style={{ marginBottom: "20px" }}>
              {canvas.map(row => (
                <div style={{ display: "flex" }}>
                  {row.map(element => (
                    <div
                      style={{
                        display: "inline-block",
                        width: "30px",
                        height: "30px",
                        border: "1px solid black",
                        lineHeight: "30px",
                        textAlign: "center"
                      }}
                    >
                      {element}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
          <h2>
            <strong>Main canvas</strong>
          </h2>
          {canvas.map(row => (
            <div style={{ display: "flex" }}>
              {row.map(element => (
                <div
                  style={{
                    display: "inline-block",
                    width: "30px",
                    height: "30px",
                    border: "1px solid black",
                    lineHeight: "30px",
                    textAlign: "center"
                  }}
                >
                  {element}
                </div>
              ))}
            </div>
          ))}
          <a href={canvasHistoryGenerateObjectURL(canvasHistory)} download="output.txt">
            Download Result
          </a>
        </>
      )}
    </div>
  );
};

export default CanvasDraw;
