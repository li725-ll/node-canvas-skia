const path = require("path");
const skia = require("../build/Release/skia-native.node");

const canvas = new skia.Canvas(800, 800);
const ctx = canvas.getContext("2d", { antialias: true });

function getFonts() {
  const result = ctx.getFonts();

}

function drawStrokeText() {
  ctx.strokeStyle(skia.Utils.RGBA(0, 255, 255, 1));
  ctx.setFont("微软雅黑", 60);
  ctx.strokeText("Hello Skia", 100, 100);
  ctx.strokeText("中文测试", 400, 100);
}

function drawFileText() {
  ctx.strokeStyle(skia.Utils.RGBA(0, 255, 255, 1));
  ctx.setFont("微软雅黑", 60);
  ctx.fillText("Hello Skia", 100, 200);
  ctx.fillText("中文测试", 400, 200);
}

function drawText(outputPath) {
  ctx.clear(skia.Utils.RGBA(255, 255, 255, 1));
  getFonts();
  drawStrokeText();
  drawFileText();
  canvas.saveAsImage(path.resolve(outputPath, "text.jpg"));
}


module.exports = {
  drawText
};
