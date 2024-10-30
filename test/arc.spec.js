const skia = require("../build/Release/skia-native.node");
const canvas = new skia.Canvas(256, 256);
const ctx = canvas.getContext("2d", { antialias: true });

function drawArc() {
  ctx.strokeStyle(1);
  ctx.arc(128, 128, 100, 0, Math.PI);
  console.log(canvas.saveAsImage("E:\\gitee\\node-skia\\test\\out\\arc.jpg"));
}

module.exports = {
  drawArc
};
