# emotion-native-media-query

> Add responsive support for [@emotion/native](https://emotion.sh/docs/@emotion/native). It supports both React Native (Expo) and React Native Web (Expo for Web), as well as server-side rendering with frameworks such as Next.js.

[![NPM](https://img.shields.io/npm/v/emotion-native-media-query.svg)](https://www.npmjs.com/package/emotion-native-media-query)
[![Build Status](https://travis-ci.com/hesyifei/emotion-native-media-query.svg?branch=master)](https://travis-ci.com/hesyifei/emotion-native-media-query)

## Install

```bash
npm install --save emotion-native-media-query
```

## Usage

```tsx
import * as React from "react";
import RView, { MediaRule } from "emotion-native-media-query";

class Example extends React.Component {
  render() {
    return (
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
  }
}
```

For more, read the [API Reference for `RView`](./docs/RView.md).

Note that in the native app, to make sure the components will resize correspondingly when the size of the screen changes (e.g., the user rotates the device), you should also add a `"change"` listener to `Dimensions` which `forceUpdate()` the component:

```tsx
export default class App extends React.Component {
  forceUpdateComponents = () => this.forceUpdate();

  componentDidMount() {
    if (Platform.OS !== "web") {
      // We do `forceUpdate` so that responsive properties can be properly
      // updated in the native app.
      // We only add it when the platform is not web because on web, we use
      // media query.
      Dimensions.addEventListener("change", this.forceUpdateComponents);
    }
  }

  componentWillUnmount() {
    if (Platform.OS !== "web") {
      Dimensions.removeEventListener("change", this.forceUpdateComponents);
    }
  }

  render() {
    return <RView {/* ... */} />;
  }
}
```

## License

MIT © [hesyifei](https://github.com/hesyifei)
