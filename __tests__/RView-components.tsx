/* eslint-env jest */
import * as React from "react";
import { Text } from "react-native";
import RView, {
  MediaRule,
  RMinWidthStyle,
  RMaxWidthStyle,
  Style,
} from "../src";

export const simpleRView = (
  <RView>
    <Text>Hello world!</Text>
  </RView>
);

export const maxWidthRView = (
  <RView
    style={{
      backgroundColor: "black",
    }}
    rStyle={{
      [MediaRule.MaxWidth]: {
        300: {
          backgroundColor: "red",
        },
        600: {
          backgroundColor: "green",
        },
        900: {
          backgroundColor: "blue",
        },
      },
    }}
  />
);

export const maxWidthAndMinWidthRView = (
  <RView
    style={{
      backgroundColor: "black",
    }}
    rStyle={{
      [MediaRule.MaxWidth]: {
        300: {
          backgroundColor: "red",
        },
        600: {
          backgroundColor: "green",
        },
        900: {
          backgroundColor: "blue",
        },
      },
      [MediaRule.MinWidth]: {
        200: {
          padding: 33,
        },
        500: {
          padding: 66,
        },
        800: {
          padding: 99,
        },
      },
    }}
  />
);

function getComplexRMinWidthStyle(): RMinWidthStyle {
  const baseRules: Style[] = [
    {
      backgroundColor: "#FFA52C",
      position: "absolute",
      alignItems: "flex-start",
    },
    {
      backgroundColor: "#FFFF41",
      position: "absolute",
    },
    {
      backgroundColor: "#008018",
      display: "none",
    },
    {
      backgroundColor: "#0000F9",
      display: "flex",
    },
    {
      backgroundColor: "#86007D",
      alignContent: "center",
    },
  ];

  const rules: RMinWidthStyle = [];
  const gap = 45;
  for (let i = 0; i <= gap * 500; i += gap) {
    rules[i] = baseRules[(i / gap) % baseRules.length];
  }
  return rules;
}

function getComplexRMaxWidthStyle(): RMaxWidthStyle {
  const baseRules: Style[] = [
    {
      borderColor: "#D60270",
      flexDirection: "column",
    },
    {
      borderColor: "#0038A8",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    {
      borderColor: "#9B4F96",
      flexDirection: "column-reverse",
    },
  ];

  const rules: RMinWidthStyle = [];
  const gap = 90;
  for (let i = 0; i <= gap * 400; i += gap) {
    rules[i] = baseRules[(i / gap) % baseRules.length];
  }
  return rules;
}

export const complexRView = (
  <RView
    style={{
      backgroundColor: "black",
      borderColor: "white",
    }}
    rStyle={{
      [MediaRule.MinWidth]: getComplexRMinWidthStyle(),
      [MediaRule.MaxWidth]: getComplexRMaxWidthStyle(),
    }}
  />
);
