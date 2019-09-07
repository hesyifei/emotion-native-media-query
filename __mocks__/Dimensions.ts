/* eslint-env jest */
// https://jestjs.io/docs/en/manual-mocks

const Dimensions: any = jest.genMockFromModule("Dimensions");

let _width = 414;
let _height = 736;
function __setDimensions(width: number, height: number): void {
  _width = width;
  _height = height;
}

function get(): any {
  return { width: _width, height: _height };
}

Dimensions.__setDimensions = __setDimensions;
Dimensions.get = get;

module.exports = Dimensions;
