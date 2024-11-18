// eslint-disable-next-line @typescript-eslint/no-require-imports
const https = require("https");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");

function downloadFile(url, dest) {
  const file = fs.createWriteStream(dest);
  https
    .get(url, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`Downloaded and saved ${dest}`);
      });
    })
    .on("error", (err) => {
      fs.unlink(dest, () => {}); // 删除已部分下载的文件
      console.error(`Error downloading file: ${err.message}`);
    });
}

// 示例调用
downloadFile("https://example.com/file.zip", "file.zip");
