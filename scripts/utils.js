/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const os = require("os");
const path = require("path");
const axois = require("axios");
const AdmZip = require("adm-zip");

function getPlatform() {
  switch (os.platform()) {
    case "win32":
      return "windows";
    case "darwin":
      return "macos";
    default:
      throw new Error("Unsupported platform");
  }
}

function downloadFile(url, dest) {
  console.log("Downloading: " + url);
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
  const fileName = url.split("/").pop();
  const file = fs.createWriteStream(dest + "/" + fileName);

  return new Promise((resolve, reject) => {
    axois
      .get(url, {
        responseType: "stream"
      })
      .then((response) => {
        response.data.pipe(file);
      })
      .catch((error) => {
        reject(error);
      });
    file.on("finish", () => {
      const libraryPath = createLibraryFolder();
      unpackZip(dest + "/" + fileName, libraryPath);
      console.log(`${fileName} Download complete`);
      resolve();
    });
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
  downloadFile,
  createLibraryFolder
};
