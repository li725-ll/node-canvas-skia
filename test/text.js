const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(800, 800);
const ctx = canvas.getContext("2d", { antialias: true });

function loadFont() {
  const fontPath = path.join(__dirname, "./fonts/REEJI-PinboGB-Flash.ttf");
  ctx.loadFont(fontPath, "Reejipinbo");
}
function getFonts() {
  const result = ctx.getFonts();
  // console.log(result);
}

function drawStrokeText() {
  ctx.strokeStyle = "rgba(0,255,255,1)";
  ctx.font = "60px Reejipinbo";
  ctx.strokeText("Hello Skia", 50, 100);
  ctx.strokeText("中国智造", 450, 100);
}

function drawFileText() {
  ctx.strokeStyle = "rgba(0,255,255,1)";
  ctx.font = "60px 微软雅黑";
  ctx.fillText("Hello Skia", 100, 200);
  ctx.fillText("中文测试", 400, 200);
}

function drawFillFontText() {
  ctx.strokeStyle = "rgba(0,255,255,1)";
  ctx.font = "60px Reejipinbo";
  ctx.fillText("Hello Skia", 50, 300);
  ctx.fillText("中国智造", 450, 300);
}

function drawText(outputPath) {
  getFonts();
  loadFont();
  drawStrokeText();
  drawFileText();
  drawFillFontText();
  canvas.saveAsImage(path.resolve(outputPath, "text.jpg"));
}

module.exports = {
  drawText
};
