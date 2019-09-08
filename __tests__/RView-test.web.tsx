/* eslint-env jest */
import renderer from "react-test-renderer";
import {
  simpleRView,
  simpleRViewWithWebTagAndNativeTag,
  maxWidthRView,
  maxWidthAndMinWidthRView,
  complexRView,
} from "./RView-components";

describe("RView", () => {
  test("simple", () => {
    const component = renderer.create(simpleRView);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("simple with WebTag", () => {
    const component = renderer.create(simpleRViewWithWebTagAndNativeTag);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("simple MaxWidth", () => {
    const component = renderer.create(maxWidthRView);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("simple MinWidth and MaxWidth", () => {
    const component = renderer.create(maxWidthAndMinWidthRView);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("complex", () => {
    const component = renderer.create(complexRView);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
