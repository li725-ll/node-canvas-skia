/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const os = require("os");
const http = require("http");
const path = require("path");
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
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
  const fileName = url.split("/").pop();
  const file = fs.createWriteStream(dest + "/" + fileName);

  return new Promise((resolve, reject) => {
    http
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(dest + "/" + fileName);
        });
      })
      .on("error", (err) => {
        fs.unlink(dest + "/" + fileName);
        reject(err.message);
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
