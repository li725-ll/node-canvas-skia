/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const buildFromSource =
  process.env.npm_config_build_from_source === "true" ||
  process.env.BUILD_FROM_SOURCE === "true";

const PREBUILT_MAP = {
  "win32-x64": "skia-native-win-x64.node"
};

function hasPrebuilt() {
  const key = `${process.platform}-${process.arch}`;
  const fileName = PREBUILT_MAP[key];
  if (!fileName) return false;
  return fs.existsSync(path.resolve(__dirname, "../prebuilds", key, fileName));
}

function buildFromLocal() {
  console.log("Building from source...");
  execSync("node scripts/install.js", {
    stdio: "inherit",
    cwd: path.resolve(__dirname, "..")
  });
  execSync("npm run build", {
    stdio: "inherit",
    cwd: path.resolve(__dirname, "..")
  });
}

if (buildFromSource) {
  console.log("BUILD_FROM_SOURCE is set, compiling from source.");
  buildFromLocal();
} else if (hasPrebuilt()) {
  console.log("Prebuilt binary found, skipping compilation.");
} else {
  console.log("No prebuilt binary for this platform, building from source.");
  buildFromLocal();
}
