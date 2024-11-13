const fs = require("fs");
const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(500, 500);
const ctx = canvas.getContext("2d", { antialias: true });


function drawImage() {
  ctx.drawImage(path.resolve(__dirname, "./images/cat.jpg"), 0, 0, 100, 100);
}

function drawImageBuffer() {
  const data = fs.readFileSync(path.resolve(__dirname, "./images/cat.jpg"));
  ctx.drawImage(data, 100, 0, 200, 200);
}


function testImage(outputPath) {
  drawImage();
  drawImageBuffer();
  canvas.saveAsImage(path.resolve(outputPath, "image.jpg"));
}

module.exports = {
  testImage
};
