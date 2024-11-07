const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(256, 256);
const ctx = canvas.getContext("2d", { antialias: true });


function drawImage() {
  ctx.drawImage(path.resolve(__dirname, "./images/cat.jpg"), 0, 0, 256, 256);
}

function testImage(outputPath) {
  drawImage();
  canvas.saveAsImage(path.resolve(outputPath, "image.jpg"));
}

module.exports = {
  testImage
};
