/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const os = require("os");
const path = require("path");
const git = require("@npmcli/git");
const AdmZip = require("adm-zip");

function getPlatform() {
  const arch = os.arch();
  switch (os.platform()) {
    case "win32":
      return ["windows", arch];
    case "darwin":
      return ["macos", arch];
    default:
      throw new Error("Unsupported platform");
  }
}

function clone(url, dest) {
  // change git download url to gitee download url
  console.log("Downloading: " + url);
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }

  git.clone(url, "", null).then(() => {
    const fileNames = fs.readdirSync(dest);
    for (const fileName of fileNames) {
      if (fileName.endsWith(".zip")) {
        const libraryPath = createLibraryFolder();
        unpackZip(dest + "/" + fileName, libraryPath);
        console.log(`${fileName} Download complete`);
      }
    }
    return true;
  });
}

function unpackZip(path, dest) {
  var zip = new AdmZip(path);
  var zipEntries = zip.getEntries();
  if (!zipEntries.entryName) {
    if (!fs.existsSync(dest + "/" + path.split("/").pop().slice(0, -4))) {
      fs.mkdirSync(dest + "/" + path.split("/").pop().slice(0, -4));
    }
    zip.extractAllTo(dest + "/" + path.split("/").pop().slice(0, -4), true);
  } else {
    zip.extractAllTo(dest, true);
  }
}

function createLibraryFolder() {
  const libraryPath = path.resolve(__dirname, "../library");
  if (!fs.existsSync(libraryPath)) {
    fs.mkdirSync(libraryPath);
  }
  return libraryPath;
}

module.exports = {
  unpackZip,
  getPlatform,
  clone,
  createLibraryFolder
};
