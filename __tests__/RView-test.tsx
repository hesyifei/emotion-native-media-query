import * as React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";
import RView, { MediaRule } from "../src";

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

  test.each([
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
  ])("simple responsive with width %ipx", width => {
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
});
