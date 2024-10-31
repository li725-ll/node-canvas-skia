const path = require("path");
const skia = require("../build/Release/skia-native.node");

const canvas = new skia.Canvas(256, 256);
const ctx = canvas.getContext("2d", { antialias: true });

function drawLine(outputPath) {
  const scale = 256;
  const R = 0.45 * scale;
  const TAU = 6.2831853;
  ctx.clear(skia.Utils.RGBA(255, 255, 255, 1));
  ctx.beginPath();
  ctx.moveTo(R, 0);
  for (let i = 1; i < 7; ++i) {
    const theta = (3 * i * TAU) / 7;
    ctx.lineTo(R * Math.cos(theta), R * Math.sin(theta));
  }

  ctx.closePath();
  ctx.translate(0.5 * scale, 0.5 * scale);
  ctx.strokeStyle(skia.Utils.RGBA(255, 0, 0, 1));
  ctx.lineWidth(2);
  ctx.stroke();
  canvas.saveAsImage(path.resolve(outputPath, "line.jpg"));
}

module.exports = {
  drawLine
};
