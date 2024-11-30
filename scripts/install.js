/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const utils = require("./utils");
const cp = require("child_process");

const platform = utils.getPlatform(); // windows / macos

(async () => {
  const externalNetwork = await utils.checkNetwork();
  const skiaURL = externalNetwork
    ? `https://github.com/JetBrains/skia-build/releases/download/m93-87e8842e8c/Skia-m93-87e8842e8c-${platform[0]}-Release-${platform[1]}.zip`
    : `https://gitee.com/li-mingxiao98/node-canvas-skia-dependencies/releases/download/v0.0.0/Skia-m93-87e8842e8c-${platform[0]}-Release-${platform[1]}.zip`;
  utils.downloadFile(skiaURL, path.resolve(__dirname, ".tmp"));

  if (platform[0] === "windows") {
    const glfwURL = externalNetwork
      ? `https://github.com/glfw/glfw/releases/download/3.4/glfw-3.4.bin.WIN64.zip`
      : `https://gitee.com/li-mingxiao98/node-canvas-skia-dependencies/releases/download/v0.0.0/glfw-3.4.bin.WIN64.zip`;
    utils.downloadFile(glfwURL, path.resolve(__dirname, ".tmp"));
  }

  if (platform[0] === "windows") {
    // windows
    cp.execSync("set npm_config_build_from_source=false");
  } else {
    // macos
    cp.execSync("export npm_config_build_from_source=false");
  }
})();
