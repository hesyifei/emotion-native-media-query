// https://jestjs.io/docs/en/manual-mocks

'use strict';

let _width = 414;
let _height = 736;
function __setDimensions(width, height) {
  _width = width;
  _height = height;
}

function get() {
  return { width: _width, height: _height };
}

const Dimensions = jest.fn();
Dimensions.__setDimensions = __setDimensions;
Dimensions.get = get;

module.exports = Dimensions
