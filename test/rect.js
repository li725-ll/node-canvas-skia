const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(256, 256);
const ctx = canvas.getContext("2d", { antialias: true });

function drawRect() {
  ctx.strokeStyle = "rgba(255,0,0,1)";
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, 100, 100);
}

function drawFillRect() {
  ctx.fillStyle = "rgba(255,0,0,1)";
  ctx.fillRect(10, 10, 100, 100);
}

function drawClearRect() {
  ctx.clearRect(50, 50, 100, 100);
}


function testRect(outputPath) {
  drawRect();
  drawFillRect();
  drawClearRect();
  canvas.saveAsImage(path.resolve(outputPath, "rect.jpg"));
  const result = canvas.toBuffer();
  console.log(result);
}

module.exports = {
  testRect
};
