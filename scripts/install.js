/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const utils = require("./utils");
const cp = require("child_process");

const platform = utils.getPlatform(); // windows / macos

(async () => {
  // TODO: Gitee download link failed due to network attack
  utils.deleteFolderSync(path.resolve(__dirname, ".temp"));
  const URL =
    "https://gitcode.com/li-mingxiao98/node-canvas-skia-dependencies.git"; //"https://gitee.com/li-mingxiao98/node-canvas-skia-dependencies.git";
  utils.clone(URL, path.resolve(__dirname, ".temp"));

  if (platform[0] === "windows") {
    // windows
    cp.execSync("set npm_config_build_from_source=false");
  } else {
    // macos
    cp.execSync("export npm_config_build_from_source=false");
  }
})();
