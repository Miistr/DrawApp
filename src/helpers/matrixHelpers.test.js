import { matrixToText, createMatrixArray, cloneMatrixArray } from "./matrixHelpers";

describe("Given matrixToText function", () => {
  const givenMatrix = createMatrixArray(4, 4);
  const expectedString = "------\n|0000|\n|0000|\n|0000|\n|0000|\n------\n";
  describe("when it's called with zero 4x4 matrix", () => {
    test("should be equal to expectedString", () => {
      expect(matrixToText(givenMatrix)).toStrictEqual(expectedString);
    });
  });
});

describe("Given createMatrixArray function", () => {
  const expectedMatrix = [
    [0, 0],
    [0, 0]
  ];
  describe("when it's called with 2 rows and 2 columns", () => {
    test("should be equal to expectedMatrix", () => {
      expect(createMatrixArray(2, 2)).toStrictEqual(expectedMatrix);
    });
  });
});

describe("Given cloneMatrixArray function", () => {
  const matrixArray = [
    [
      [0, 0],
      [0, 0]
    ],
    [
      ["x", "x"],
      [0, 0]
    ],
    [
      ["x", "x"],
      ["o", "o"]
    ]
  ];
  describe("when it's called with matrixArray", () => {
    test("should be equal to matrixArray", () => {
      expect(cloneMatrixArray(matrixArray)).toStrictEqual(matrixArray);
    });
  });
});
