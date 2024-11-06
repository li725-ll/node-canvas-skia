const platform = process.platform;
let skia;
switch (platform) {
  case "win32":
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    skia = require("../build/Release/skia-native-win-x64.node");
    break;
  case "darwin":
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    skia = require("../build/Release/skia-native-mac-x64.node");
    break;
  default:
    throw new Error("Unsupported platform");
}

export default {
  SkiaCanvas: skia.Canvas as any,
  SkiaUtils: skia.Utils as any
};
