import * as React from "react";
import { Text } from "react-native";
import RView, { MediaRule } from "../src";

export const simpleRView = (
  <RView>
    <Text>Hello world!</Text>
  </RView>
);

export const maxWidthRView = (
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

export const maxWidthAndMinWidthRView = (
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
