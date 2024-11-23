/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const utils = require("./utils");
const cp = require("child_process");

const platform = utils.getPlatform(); // windows / macos

utils.downloadFile(
  `https://github.com/JetBrains/skia-build/releases/download/m93-87e8842e8c/Skia-m93-87e8842e8c-${platform}-Release-x64.zip`,
  path.resolve(__dirname, ".tmp")
);

if (platform === "windows") {
  utils.downloadFile(
    `https://github.com/glfw/glfw/releases/download/3.4/glfw-3.4.bin.WIN64.zip`,
    path.resolve(__dirname, ".tmp")
  );
}

if (platform === "windows") {
  // windows
  cp.execSync("set npm_config_build_from_source=false");
} else {
  // macos
  cp.execSync("export npm_config_build_from_source=false");
}
