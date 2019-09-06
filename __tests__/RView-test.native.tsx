import renderer from "react-test-renderer";
import {
  simpleRView,
  maxWidthRView,
  maxWidthAndMinWidthRView,
  complexRView
} from "./RView-components";

const widthList: number[] = [
  1,
  100,
  299,
  300,
  301,
  450,
  599,
  600,
  601,
  750,
  899,
  900,
  901,
  1000,
  10000
];

jest.mock("Dimensions");

describe("RView", () => {
  test("simple", () => {
    const component = renderer.create(simpleRView);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test.each(widthList)("simple MaxWidth with width %ipx", width => {
    require("Dimensions").__setDimensions(width, 736);
    const component = renderer.create(maxWidthRView);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test.each(widthList)(
    "simple MinWidth and MaxWidth with width %ipx",
    width => {
      require("Dimensions").__setDimensions(width, 736);
      const component = renderer.create(maxWidthAndMinWidthRView);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    }
  );

  test.each(widthList)(
    "complex with width %ipx",
    width => {
      require("Dimensions").__setDimensions(width, 736);
      const component = renderer.create(complexRView);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    }
  );
});
