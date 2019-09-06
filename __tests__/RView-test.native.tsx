import * as React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";
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
  10000
];

jest.mock("Dimensions");

describe("RView", () => {
  test("simple", () => {
    const component = renderer.create(
      <RView>
        <Text>Hello world!</Text>
      </RView>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test.each(widthList)("simple MaxWidth with width %ipx", width => {
    require("Dimensions").__setDimensions(width, 736);
    const component = renderer.create(
      <RView
        style={{
          backgroundColor: "black"
        }}
        rStyle={{
          [MediaRule.MaxWidth]: {
            300: {
              backgroundColor: "red"
            },
            600: {
              backgroundColor: "green"
            },
            900: {
              backgroundColor: "blue"
            }
          }
        }}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test.each(widthList)("simple MinWidth and MaxWidth with width %ipx", width => {
    require("Dimensions").__setDimensions(width, 736);
    const component = renderer.create(
      <RView
        style={{
          backgroundColor: "black"
        }}
        rStyle={{
          [MediaRule.MaxWidth]: {
            300: {
              backgroundColor: "red"
            },
            600: {
              backgroundColor: "green"
            },
            900: {
              backgroundColor: "blue"
            }
          },
          [MediaRule.MinWidth]: {
            200: {
              padding: 33
            },
            500: {
              padding: 66
            },
            800: {
              padding: 99
            }
          }
        }}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
