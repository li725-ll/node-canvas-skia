const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(256, 256);
const ctx = canvas.getContext("2d", { antialias: true });

function drawRect(outputPath) {
  ctx.clear(skia.Utils.RGBA(255, 255, 255, 1));
  ctx.strokeStyle(skia.Utils.RGBA(255, 0, 0, 1));
  ctx.lineWidth(2);
  ctx.strokeRect(10, 10, 100, 100);
  canvas.saveAsImage(path.resolve(outputPath, "rect.jpg"));
}

module.exports = {
  drawRect
};
