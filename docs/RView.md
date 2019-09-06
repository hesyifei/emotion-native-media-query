# `RView` API Reference

This document lays out the current public properties and methods for `RView`.

## Props Index

- [`style`](#style)
- [`rStyle`](#rstyle)
  - [`[MediaRule.MinWidth]`](#mediaruleminwidth)
  - [`[MediaRule.MaxWidth]`](#mediarulemaxwidth)
- [`WebTag`](#webtag)
- [`NativeTag`](#nativetag)

---

# Reference

## Props

### `style`

The (default) style of the view. Only [object styles](https://emotion.sh/docs/object-styles) are supported (i.e., ` css`` ` with string is not supported).

**Example:**

```tsx
import RView, { MediaRule } from "emotion-native-media-query";

<RView
  style={{
    margin: 15,
  }}
/>;
```

---

### `rStyle`

The responsive style of the view. It should contain one or more of the following object:

#### `[MediaRule.MinWidth]`

It is analogous to CSS's `@media (min-width: ___px)`.

Note that, unlike media queries, the order of the widths here doesn't matter as we internally sort the width ascendingly to make sure the correct style is selected.

**Example:**

```tsx
import RView, { MediaRule } from "emotion-native-media-query";

<RView
  style={{
    padding: 11,
  }}
  rStyle={{
    [MediaRule.MinWidth]: {
      // @media (min-width: 200px)
      200: {
        padding: 33,
      },
      // @media (min-width: 500px)
      500: {
        padding: 66,
      },
      // @media (min-width: 800px)
      800: {
        padding: 99,
      },
    },

    // Other media rules
    [MediaRule.MaxWidth]: {
      // ...
    },
  }}
/>;
```

#### `[MediaRule.MaxWidth]`

It is analogous to CSS's `@media (max-width: ___px)`.

Note that, unlike media queries, the order of the widths here doesn't matter as we internally sort the width descendingly to make sure the correct style is selected.

**Example:**

```tsx
import RView, { MediaRule } from "emotion-native-media-query";

<RView
  style={{
    backgroundColor: "black",
  }}
  rStyle={{
    [MediaRule.MaxWidth]: {
      // @media (max-width: 300px)
      300: {
        backgroundColor: "red",
      },
      // @media (max-width: 600px)
      600: {
        backgroundColor: "green",
      },
      // @media (max-width: 900px)
      900: {
        backgroundColor: "blue",
      },
    },

    // Other media rules
    [MediaRule.MinWidth]: {
      // ...
    },
  }}
/>;
```

---

### `WebTag`

The tag used on web. Should be a `React.ElementType` that supports `className` property (for example, `"header"` or `"section"`).

(While it currently also supports component like `Text`, `className` has been deprecated in those components and you should avoid using it.)

**Example:**

```tsx
import RView, { MediaRule } from "emotion-native-media-query";

<RView WebTag="footer" style={/* ... */} rStyle={/* ... */} />;
```

---

### `NativeTag`

The tag used in the native app. Should be a `React.ElementType`.

**Example:**

```tsx
import RView, { MediaRule } from "emotion-native-media-query";

<RView NativeTag={Text} style={/* ... */} rStyle={/* ... */} />;
```
