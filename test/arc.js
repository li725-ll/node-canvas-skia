const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(256, 256);
const ctx = canvas.getContext("2d", { antialias: true });

function drawArc(outputPath) {
  canvas.save();
  ctx.strokeStyle = "rgba(255,0,0,1)";
  ctx.lineWidth = 2;
  ctx.arc(10, 10, 100, 0, 360);
  ctx.stroke();
  canvas.restore();
  canvas.saveAsImage(path.resolve(outputPath, "arc.jpg"));
}

module.exports = {
  drawArc
};
