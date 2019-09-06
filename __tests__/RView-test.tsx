import * as React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";
import RView from "../src";

describe("RView", () => {
  it("simple", () => {
    const component = renderer.create(
      <RView>
        <Text>Hello world!</Text>
      </RView>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
