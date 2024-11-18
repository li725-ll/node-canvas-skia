/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const utils = require("./utils");

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
