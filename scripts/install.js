/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const utils = require("./utils");

const libraryPath = utils.createLibraryFolder();
const platform = utils.getPlatform(); // windows / macos

// "https://github.com/JetBrains/skia-build/releases/download/m93-87e8842e8c/Skia-m93-87e8842e8c-windows-Release-x64.zip",
utils
  .downloadFile(
    `http://127.0.0.1/Skia-m93-87e8842e8c-${platform}-Release-x64.zip`,
    path.resolve(__dirname, ".tmp")
  )
  .then((skiaPath) => {
    console.log("Skia download success");
    utils.unpackZip(skiaPath, libraryPath);
  });

// https://github.com/glfw/glfw/releases/download/3.4/glfw-3.4.bin.WIN64.zip
utils
  .downloadFile(
    `http://127.0.0.1/glfw-3.4.bin.WIN64.zip`,
    path.resolve(__dirname, ".tmp")
  )
  .then((glfwPath) => {
    console.log("glfw download success");
    utils.unpackZip(glfwPath, libraryPath);
  });
