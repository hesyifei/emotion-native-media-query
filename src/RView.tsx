/** @jsx jsx */
/**
 * @class RView
 */

import * as React from "react";
import { View, Platform, ViewProps } from "react-native";
import { jsx } from "@emotion/core";
import {
  MediaRule,
  RStyle,
  RMinWidthStyle,
  RMaxWidthStyle,
  Style
} from "./types";
import {
  isWidthGreaterThanOrEqualTo,
  isWidthSmallerThanOrEqualTo,
} from "./helpers";

function _minWidthStyleForEach(
  minWidthStyle: RMinWidthStyle,
  callback: (minWidth: number, style: Style) => void
) {
  Object.keys(minWidthStyle)
    // We have to sort the style ascendingly first,
    // else on native, different order will produce different results.
    .sort((a, b) => Number(a) - Number(b))
    .forEach(minWidth => {
      let value = minWidthStyle[minWidth];
      callback(Number(minWidth), value);
    });
}

function _maxWidthStyleForEach(
  maxWidthStyle: RMaxWidthStyle,
  callback: (maxWidth: number, style: Style) => void
) {
  Object.keys(maxWidthStyle)
    // We have to sort the style descendingly first,
    // else on web,
    // - object in JavaScript with number as key will always get sorted ascendingly
    // - and the latest max-width will always dominate any other rule.
    // and on native,
    // - different order will produce different results.
    .sort((a, b) => Number(b) - Number(a))
    .forEach(maxWidth => {
      let value = maxWidthStyle[maxWidth];
      callback(Number(maxWidth), value);
    });
}

function _getStyleWithMediaQuery(
  rStyle: RStyle
): { [mediaQuery: string]: any } {
  const {
    [MediaRule.MinWidth]: minWidthStyle = {},
    [MediaRule.MaxWidth]: maxWidthStyle = {}
  } = rStyle;

  let rStyleMediaQueries = {};
  _minWidthStyleForEach(minWidthStyle, (minWidth, value) => {
    rStyleMediaQueries[`@media (min-width: ${minWidth}px)`] = value;
  });
  _maxWidthStyleForEach(maxWidthStyle, (maxWidth, value) => {
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

  _minWidthStyleForEach(minWidthStyle, (minWidth, value) => {
    if (isWidthGreaterThanOrEqualTo(minWidth)) {
      style = { ...style, ...value };
    }
  });

  _maxWidthStyleForEach(maxWidthStyle, (maxWidth, value) => {
    if (isWidthSmallerThanOrEqualTo(maxWidth)) {
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
