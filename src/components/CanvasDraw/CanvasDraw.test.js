import renderer from "react-test-renderer";
import React from "react";
import CanvasDraw from "./CanvasDraw";

describe("Given <CanvasDrow/> component", () => {
  let component;
  beforeEach(() => {
    component = renderer.create(<CanvasDraw />);
  });
  test("should match the snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
