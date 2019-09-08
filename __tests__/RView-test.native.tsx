/* eslint-env jest */
/* eslint global-require: "off", import/no-unresolved: "off" */
import * as React from "react";
import renderer from "react-test-renderer";
import {
  simpleRView,
  simpleRViewWithWebTagAndNativeTag,
  maxWidthRView,
  maxWidthAndMinWidthRView,
  complexRView,
} from "./RView-components";
import RView, { MediaRule } from "../src";

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

  test("simple with NativeTag", () => {
    let component;
    renderer.act(() => {
      component = renderer.create(simpleRViewWithWebTagAndNativeTag);
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test.each(widthList)("simple MaxWidth with width %ipx", width => {
    let component;
    renderer.act(() => {
      require("Dimensions").set({
        window: { width, height: 736 },
      });
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
        require("Dimensions").set({
          window: { width, height: 736 },
        });
        component = renderer.create(maxWidthAndMinWidthRView);
      });
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    },
  );

  test.each(widthList)("complex with width %ipx", width => {
    let component;
    renderer.act(() => {
      require("Dimensions").set({
        window: { width, height: 736 },
      });
      component = renderer.create(complexRView);
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("resizing the screen should change the style", () => {
    let component;

    renderer.act(() => {
      require("Dimensions").set({
        window: { width: 414, height: 736 },
      });
      component = renderer.create(
        <RView
          style={{
            backgroundColor: "#D60270",
            flexDirection: "column",
            flexBasis: 888,
          }}
          rStyle={{
            [MediaRule.MinWidth]: {
              800: {
                backgroundColor: "#9B4F96",
              },
              1500: {
                backgroundColor: "#0038A8",
              },
            },
            [MediaRule.MaxWidth]: {
              200: {
                flexDirection: "row",
              },
              1000: {
                flexDirection: "row-reverse",
              },
            },
          }}
        />,
      );
    });
    expect(component.toJSON().props.style).toEqual({
      backgroundColor: "#D60270",
      flexDirection: "row-reverse",
      flexBasis: 888,
    });

    renderer.act(() => {
      require("Dimensions").set({
        window: { width: 100, height: 300 },
      });
    });
    expect(component.toJSON().props.style).toEqual({
      backgroundColor: "#D60270",
      flexDirection: "row",
      flexBasis: 888,
    });

    renderer.act(() => {
      require("Dimensions").set({
        window: { width: 900, height: 1000 },
      });
    });
    expect(component.toJSON().props.style).toEqual({
      backgroundColor: "#9B4F96",
      flexDirection: "row-reverse",
      flexBasis: 888,
    });

    renderer.act(() => {
      require("Dimensions").set({
        window: { width: 1250, height: 300 },
      });
    });
    expect(component.toJSON().props.style).toEqual({
      backgroundColor: "#9B4F96",
      flexDirection: "column",
      flexBasis: 888,
    });

    renderer.act(() => {
      require("Dimensions").set({
        window: { width: 2000, height: 3000 },
      });
    });
    expect(component.toJSON().props.style).toEqual({
      backgroundColor: "#0038A8",
      flexDirection: "column",
      flexBasis: 888,
    });
  });
});
