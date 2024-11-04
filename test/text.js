const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(800, 800);
const ctx = canvas.getContext("2d", { antialias: true });

function getFonts() {
  const result = ctx.getFonts();
  console.log(result);
}

function drawStrokeText() {
  ctx.strokeStyle = "rgba(0,255,255,1)";
  ctx.setFont = "60px 微软雅黑";
  ctx.strokeText("Hello Skia", 100, 100);
  ctx.strokeText("中文测试", 400, 100);
}

function drawFileText() {
  ctx.strokeStyle = "rgba(0,255,255,1)";
  ctx.setFont = "60px 微软雅黑";
  ctx.fillText("Hello Skia", 100, 200);
  ctx.fillText("中文测试", 400, 200);
}

function drawText(outputPath) {
  getFonts();
  drawStrokeText();
  drawFileText();
  canvas.saveAsImage(path.resolve(outputPath, "text.jpg"));
}

module.exports = {
  drawText
};
