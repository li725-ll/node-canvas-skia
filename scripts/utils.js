/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const os = require("os");
const path = require("path");
const AdmZip = require("adm-zip");
const { exec, execSync } = require("child_process");

/**
 * Check if the system has Git installed.
 * @returns {boolean} If git is installed, return true; otherwise, return false
 */
function isGitInstalled() {
  try {
    execSync("git --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

/**
 * Clone Git repository
 * @param {string} repoUrl - The URL of the Git repository to be cloned
 * @param {string} destPath - Target path for cloning repository
 * @returns {Promise<void>} A Promise, resolve upon successful cloning and reject upon failure
 */
function cloneGitRepo(repoUrl, destPath) {
  return new Promise((resolve, reject) => {
    // Check if git is installed
    if (!isGitInstalled()) {
      reject(
        new Error(
          "The system does not have Git installed. Please install Git before running this script."
        )
      );
      return;
    }

    // Check if the target directory exists, create if it does not exist
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }

    // 执行 git clone 命令
    const command = `git clone ${repoUrl} ${destPath}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`执行命令出错: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.warn(`命令执行警告: ${stderr}`);
      }
      console.log(`仓库克隆成功: ${stdout}`);
      resolve();
    });
  });
}

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

  cloneGitRepo(url, dest).then(() => {
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
