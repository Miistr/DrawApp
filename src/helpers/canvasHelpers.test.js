import { drawLine, drawRectangle, drawFill, canvasHistoryGenerateObjectURL } from "./canvasHelpers";
import { createMatrixArray } from "./matrixHelpers";

describe("Given drawLine function", () => {
  const givenArguments = [createMatrixArray(2, 2), 1, 2, 1, 1, "x"];
  const expectedMatrix = [
    ["x", "x"],
    [0, 0]
  ];
  describe("when it's called with given arguments", () => {
    test("should be equal to expected matrix", () => {
      expect(drawLine(...givenArguments)).toStrictEqual(expectedMatrix);
    });
  });
});

describe("Given drawRectangle function", () => {
  const givenArguments = [createMatrixArray(4, 4), 1, 3, 1, 3, "x"];
  const expectedMatrix = [
    ["x", "x", "x", 0],
    ["x", 0, "x", 0],
    ["x", "x", "x", 0],
    [0, 0, 0, 0]
  ];
  describe("when function called with given arguments", () => {
    test("should be equal to expected matrix", () => {
      expect(drawRectangle(...givenArguments)).toStrictEqual(expectedMatrix);
    });
  });
});

describe("Given drawFill function", () => {
  const givenArguments = [drawLine(createMatrixArray(4, 4), 1, 4, 2, 2, "x"), 3, 3, "o", 0, "x"];
  const expectedMatrix = [
    [0, 0, 0, 0],
    ["x", "x", "x", "x"],
    ["o", "o", "o", "o"],
    ["o", "o", "o", "o"]
  ];
  describe("when function called with given arguments", () => {
    test("should be equal to expected matrix", () => {
      expect(drawFill(...givenArguments)).toStrictEqual(expectedMatrix);
    });
  });
});

describe("Given canvasHistoryGenerateObjectURL function", () => {
  const givenArguments = [
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    [
      ["x", "x", "x"],
      [0, 0, 0],
      [0, 0, 0]
    ],
    [
      ["x", "x", "x"],
      ["o", "o", "o"],
      ["o", "o", "o"]
    ]
  ];
  global.URL.createObjectURL = jest.fn();
  it("msSaveOrOpenBlob should not have been called when navigao is undefined", () => {
    global.URL.createObjectURL = jest.fn(() => "details");
    window.navigator.msSaveOrOpenBlob = jest.fn(() => "details");
    canvasHistoryGenerateObjectURL(givenArguments);
    expect(window.navigator.msSaveOrOpenBlob).toHaveBeenCalledTimes(0);
  });
});
