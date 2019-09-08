/* eslint-env jest */
/* eslint global-require: "off", import/no-unresolved: "off" */
import renderer from "react-test-renderer";
import {
  simpleRView,
  maxWidthRView,
  maxWidthAndMinWidthRView,
  complexRView,
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
  10000,
];

describe("RView", () => {
  test("simple", () => {
    let component;
    renderer.act(() => {
      component = renderer.create(simpleRView);
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test.each(widthList)("simple MaxWidth with width %ipx", width => {
    let component;
    renderer.act(() => {
      require("Dimensions").set({ window: { width, height: 736 } });
      component = renderer.create(maxWidthRView);
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test.each(widthList)(
    "simple MinWidth and MaxWidth with width %ipx",
    width => {
      let component;
      renderer.act(() => {
        require("Dimensions").set({ window: { width, height: 736 } });
        component = renderer.create(maxWidthAndMinWidthRView);
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    },
  );

  test.each(widthList)("complex with width %ipx", width => {
    let component;
    renderer.act(() => {
      require("Dimensions").set({ window: { width, height: 736 } });
      component = renderer.create(complexRView);
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
