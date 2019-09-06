import renderer from "react-test-renderer";
import {
  simpleRView,
  maxWidthRView,
  maxWidthAndMinWidthRView,
  complexRView
} from "./RView-components";

describe("RView", () => {
  test("simple", () => {
    const component = renderer.create(simpleRView);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("simple MaxWidth", () => {
    const component = renderer.create(maxWidthRView);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("simple MinWidth and MaxWidth", () => {
    const component = renderer.create(maxWidthAndMinWidthRView);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("complex", () => {
    const component = renderer.create(complexRView);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
