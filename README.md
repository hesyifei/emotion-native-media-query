# emotion-native-media-query

> Add responsive support for @emotion/native. Supports both React Native (Expo) and React Native Web (Expo for Web), as well as server-side rendering with Next.js.

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
  }
}
```

## License

MIT © [hesyifei](https://github.com/hesyifei)
