/* eslint-env jest */
import { mergeRStyle, MediaRule, RStyle } from "../src";
import {
  getComplexRWidthStyle1,
  getComplexRWidthStyle2,
} from "./RView-components";

describe("mergeRStyle", () => {
  test("not mutated", () => {
    const originalRStyle: RStyle = {
      [MediaRule.MinWidth]: {
        600: {
          backgroundColor: "red",
        },
      },
    };
    const newRStyle: RStyle = {
      [MediaRule.MaxWidth]: {
        800: {
          padding: 5,
        },
      },
    };

    const originalRStyleCopy = JSON.parse(JSON.stringify(originalRStyle));

    mergeRStyle(originalRStyle, newRStyle);
    expect(originalRStyle).toEqual(originalRStyleCopy);
  });

  test("empty", () => {
    const originalRStyle: RStyle = {
      [MediaRule.MinWidth]: {
        600: {
          backgroundColor: "red",
        },
      },
    };
    const merge1 = mergeRStyle(originalRStyle, {});
    const merge2 = mergeRStyle(originalRStyle, null);
    const merge3 = mergeRStyle(originalRStyle, undefined);
    expect(merge1).toMatchSnapshot();
    expect(merge1).toEqual(merge2);
    expect(merge1).toEqual(merge3);
  });

  test("simple", () => {
    const originalRStyle: RStyle = {
      [MediaRule.MinWidth]: {
        600: {
          backgroundColor: "red",
        },
      },
    };
    const newRStyle: RStyle = {
      [MediaRule.MaxWidth]: {
        800: {
          padding: 5,
        },
      },
    };
    expect(mergeRStyle(originalRStyle, newRStyle)).toMatchSnapshot();
  });

  test("deep merge", () => {
    const originalRStyle: RStyle = {
      [MediaRule.MinWidth]: {
        600: {
          backgroundColor: "red",
        },
      },
    };
    const newRStyle: RStyle = {
      [MediaRule.MinWidth]: {
        600: {
          padding: 5,
        },
      },
    };
    expect(mergeRStyle(originalRStyle, newRStyle)).toMatchSnapshot();
  });

  test("deep merge - override", () => {
    const rStyle1: RStyle = {
      [MediaRule.MinWidth]: {
        600: {
          backgroundColor: "red",
        },
      },
    };
    const rStyle2: RStyle = {
      [MediaRule.MinWidth]: {
        600: {
          backgroundColor: "blue",
        },
      },
    };
    expect(mergeRStyle(rStyle1, rStyle2)).toMatchSnapshot();
    expect(mergeRStyle(rStyle2, rStyle1)).toMatchSnapshot();
  });

  test("unrelated large number of rules", () => {
    const rStyle1: RStyle = {
      [MediaRule.MinWidth]: getComplexRWidthStyle1(),
    };
    const rStyle2: RStyle = {
      [MediaRule.MaxWidth]: getComplexRWidthStyle2(),
    };
    expect(mergeRStyle(rStyle1, rStyle2)).toMatchSnapshot();
    expect(mergeRStyle(rStyle2, rStyle1)).toMatchSnapshot();
  });

  test("related large number of rules", () => {
    const rStyle1: RStyle = {
      [MediaRule.MaxWidth]: getComplexRWidthStyle1(),
    };
    const rStyle2: RStyle = {
      [MediaRule.MaxWidth]: getComplexRWidthStyle2(),
    };
    expect(mergeRStyle(rStyle1, rStyle2)).toMatchSnapshot();
    expect(mergeRStyle(rStyle2, rStyle1)).toMatchSnapshot();
  });
});
