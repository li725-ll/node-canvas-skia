// eslint-disable-next-line @typescript-eslint/no-require-imports
const skia = require("../build/Release/skia-native.node");

export default {
  SkiaCanvas: skia.Canvas as any,
  SkiaUtils: skia.Utils as any
};
