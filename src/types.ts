import { ViewStyle } from "react-native";

export enum MediaRule {
  MinWidth,
  MaxWidth
}

export interface Style extends ViewStyle {
  // Allow arbitrary style too.
  [key: string]: any;
};

export interface RStyle {
  [MediaRule.MinWidth]?: { [minWidth: number]: Style };
  [MediaRule.MaxWidth]?: { [maxWidth: number]: Style };
};
