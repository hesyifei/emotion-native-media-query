import { Dimensions } from "react-native";
import merge from "lodash.merge";
import { RStyle } from "./types";

export function isWidthGreaterThanOrEqualTo(breakpoint: number): boolean {
  const { width } = Dimensions.get("window");
  return width >= breakpoint;
}

export function isWidthSmallerThanOrEqualTo(breakpoint: number): boolean {
  const { width } = Dimensions.get("window");
  return width <= breakpoint;
}

export function mergeRStyle(
  originalRStyle: RStyle = {},
  newRStyle: RStyle = {},
): RStyle {
  return merge(originalRStyle, newRStyle);
}
