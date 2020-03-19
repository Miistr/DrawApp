import React from "react";
import App from "./App";
import renderer from "react-test-renderer";

describe("Given <App/> component", () => {
  let component;
  beforeEach(() => {
    component = renderer.create(<App />);
  });
  test("should match the snapshot", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
