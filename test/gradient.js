const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(512, 256);
const ctx = canvas.getContext("2d", { antialias: true });

function drawLinearGradientRect() {
  const gradient = ctx.createLinearGradient(256, 0, 512, 0);

  gradient.addColorStop(0, "rgba(60,115,115,0)");
  gradient.addColorStop(0.61, "rgba(113,217,217,0.5)");
  gradient.addColorStop(0.88, "rgba(255,122,1,0.6)");
  gradient.addColorStop(0.95, "rgba(255,122,1 ,1)");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.rect(256, 0, 256, 256);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = "#00ff00";
  ctx.fillRect(260, 10, 100, 100);
}

function drawRadialGradientRect() {
  const gradient = ctx.createRadialGradient(128, 128, 5, 128, 128, 128); // 384
  gradient.addColorStop(0, "rgba(255,0,0,1)");
  gradient.addColorStop(1.0, "rgba(255,255,255,1)");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.fillRect(0, 0, 256, 256);
  ctx.fill();
}

function testGradinent(outputPath) {
  drawRadialGradientRect();
  drawLinearGradientRect();
  canvas.saveAsImage(path.resolve(outputPath, "gradient.jpg"));
}

module.exports = {
  testGradinent
};
