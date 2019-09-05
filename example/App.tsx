import React from "react";
import { Text } from "react-native";
import RView, { MediaRule } from "emotion-native-media-query";

export default function App() {
  return (
    <RView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF0018",
        color: "#FFFFFF"
      }}
      rStyle={{
        [MediaRule.MinWidth]: {
          400: {
            backgroundColor: "#FFA52C"
          },
          600: {
            backgroundColor: "#FFFF41"
          },
          800: {
            backgroundColor: "#008018"
          },
          1000: {
            backgroundColor: "#0000F9"
          },
          1200: {
            backgroundColor: "#86007D"
          }
        },
        [MediaRule.MaxWidth]: {
          1150: {
            color: "#D60270"
          },
          350: {
            color: "#0038A8"
          },
          750: {
            color: "#9B4F96"
          },
        }
      }}
    >
      <Text style={{ color: "inherit", fontSize: 100 }}>Hello world!</Text>
    </RView>
  );
}
