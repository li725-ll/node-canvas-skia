const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(256, 256);
const ctx = canvas.getContext("2d", { antialias: true });

function drawRect() {
  const gradient = ctx.createLinearGradient(0, 0, 0, 256);
  gradient.addColorStop(0, "rgba(0,255,255,1)");
  gradient.addColorStop(1.0, "rgba(255,0,255,1)");

  ctx.fillStyle = gradient.id;
  ctx.rect(0, 0, 256, 256);
  ctx.fill();
}

function testGradinent(outputPath) {
  drawRect(); // draw a rectangle
  canvas.saveAsImage(path.resolve(outputPath, "gradient.jpg"));
}

module.exports = {
  testGradinent
};
