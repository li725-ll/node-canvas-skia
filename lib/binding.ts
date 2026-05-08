import * as path from "path";

const platform = process.platform;
const arch = process.arch;

const PREBUILT_MAP: Record<string, string> = {
  "win32-x64": "skia-native-win-x64.node"
};

function loadNativeModule() {
  const key = `${platform}-${arch}`;
  const prebuiltName = PREBUILT_MAP[key];

  if (prebuiltName) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require(
        path.resolve(__dirname, "../prebuilds", key, prebuiltName)
      );
    } catch {
      // prebuilt not available, fall through to local build
    }
  }

  const BUILD_MAP: Record<string, string> = {
    "win32-x64": "skia-native-win-x64.node",
    "darwin-arm64": "skia-native-drawin-arm64.node"
  };

  const buildName = BUILD_MAP[key];
  if (!buildName) {
    throw new Error(`Unsupported platform: ${platform}-${arch}`);
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(path.resolve(__dirname, "../build/Release", buildName));
  } catch {
    throw new Error(
      `Failed to load native module for ${key}. ` +
        `Run "npm run build" to compile from source.`
    );
  }
}

const skia = loadNativeModule();

export default {
  SkiaCanvas: skia.Canvas as any,
  SkiaUtils: skia.Utils as any,
  SkiaGradient: skia.Gradient as any
};
