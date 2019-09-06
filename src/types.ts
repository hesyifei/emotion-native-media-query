import { ViewStyle } from "react-native";

export enum MediaRule {
  MinWidth,
  MaxWidth,
}

export interface Style extends ViewStyle {
  // Allow arbitrary style too.
  [key: string]: any;
}

export interface RMinWidthStyle {
  [minWidth: number]: Style;
}

export interface RMaxWidthStyle {
  [maxWidth: number]: Style;
}

export interface RStyle {
  [MediaRule.MinWidth]?: RMinWidthStyle;
  [MediaRule.MaxWidth]?: RMaxWidthStyle;
}
