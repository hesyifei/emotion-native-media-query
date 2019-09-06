/** @jsx jsx */
/**
 * @class RView
 */

import * as React from "react";
import { View, Platform, ViewProps } from "react-native";
import { jsx } from "@emotion/core";
import { MediaRule, RStyle, Style } from "./types";
import {
  isWidthGreaterThanOrEqualTo,
  isWidthSmallerThanOrEqualTo,
  mergeRStyle
} from "./helpers";

function _getStyleWithMediaQuery(
  rStyle: RStyle
): { [mediaQuery: string]: any } {
  const {
    [MediaRule.MinWidth]: minWidthStyle = {},
    [MediaRule.MaxWidth]: maxWidthStyle = {}
  } = rStyle;

  let rStyleMediaQueries = {};
  Object.keys(minWidthStyle)
    // We have to sort the style assendly first, else different order will produce different results
    .sort((a, b) => Number(a) - Number(b))
    .forEach(minWidth => {
      let value = minWidthStyle[minWidth];
      rStyleMediaQueries[`@media (min-width: ${minWidth}px)`] = value;
    });
  Object.keys(maxWidthStyle)
    // We have to sort the style descendingly first, else different order will produce different results
    .sort((a, b) => Number(b) - Number(a))
    .forEach(maxWidth => {
      let value = maxWidthStyle[maxWidth];
      rStyleMediaQueries[`@media (max-width: ${maxWidth}px)`] = value;
    });

  return rStyleMediaQueries;
}

function _getFlattenedStyleForCurrentScreen(rStyle: RStyle): Style {
  const {
    [MediaRule.MinWidth]: minWidthStyle = {},
    [MediaRule.MaxWidth]: maxWidthStyle = {}
  } = rStyle;

  let style = {};

  // TODO: USE CUSTOM FOR EACH FUNCTION
  Object.keys(minWidthStyle)
    // We have to sort the style ascendingly first, since object in JavaScript with number as key always get sorted
    .sort((a, b) => Number(a) - Number(b))
    .forEach(minWidth => {
      if (isWidthGreaterThanOrEqualTo(Number(minWidth))) {
        const value = minWidthStyle[minWidth];
        style = { ...style, ...value };
      }
    });

  Object.keys(maxWidthStyle)
    // We have to sort the style descendingly first, since object in JavaScript with number as key always get sorted
    .sort((a, b) => Number(b) - Number(a))
    .forEach(maxWidth => {
      if (isWidthSmallerThanOrEqualTo(Number(maxWidth))) {
        const value = maxWidthStyle[maxWidth];
        style = { ...style, ...value };
      }
    });

  return style;
}

interface RViewProps extends ViewProps {
  WebTag?: React.ElementType;
  NativeTag?: React.ElementType;
  style?: Style;
  rStyle?: RStyle;
  // Allow arbitrary props too.
  [key: string]: any;
}

const RView: React.FunctionComponent<RViewProps> = ({
  WebTag = "div",
  NativeTag = View,
  style: defaultStyle = {},
  rStyle = {},
  ...remainingProps
}) => {
  if (Platform.OS === "web") {
    // Partly based on https://github.com/necolas/react-native-web/blob/e810f1fd2b41293cb1efe04e332fb6f8d4bcca65/packages/react-native-web/src/exports/View/index.js#L80-L94
    const reactNativeWebViewStyle: Style = {
      display: "flex",
      flexBasis: "auto",
      flexDirection: "column",
      flexShrink: 0,
      margin: 0,
      minHeight: 0,
      minWidth: 0,
      padding: 0,
      position: "relative",
      zIndex: 0
    };

    const rStyleMediaQueries = _getStyleWithMediaQuery(rStyle);
    return (
      <WebTag
        css={{
          ...reactNativeWebViewStyle,
          ...defaultStyle,
          ...rStyleMediaQueries
        }}
        {...remainingProps}
      />
    );
  } else {
    const responsiveStyle = _getFlattenedStyleForCurrentScreen(rStyle);
    return (
      <NativeTag
        style={{
          ...defaultStyle,
          ...responsiveStyle
        }}
        {...remainingProps}
      />
    );
  }
};
export default RView;

export {
  MediaRule,
  RStyle,
  Style,
  isWidthGreaterThanOrEqualTo,
  isWidthSmallerThanOrEqualTo,
  mergeRStyle
};
