const skia = require("../build/Release/skia-native.node");
const canvas = new skia.Canvas(256, 256);
const ctx = canvas.getContext("2d", { antialias: true });

function drawLine() {
  const scale = 256;
  const R = 0.45 * scale;
  const TAU = 6.2831853;

  ctx.beginPath();
  ctx.moveTo(R, 0);
  for (let i = 1; i < 7; ++i) {
    const theta = (3 * i * TAU) / 7;
    ctx.lineTo(R * Math.cos(theta), R * Math.sin(theta));
  }

  ctx.closePath();
  ctx.clear(skia.Utils.RGBA(255, 255, 255, 1));
  ctx.translate(0.5 * scale, 0.5 * scale);
  ctx.strokeStyle(1);
  ctx.lineWidth(2);
  ctx.stroke();
  console.log(canvas.saveAsImage("E:\\gitee\\node-skia\\test\\out\\line.jpg"));
}

module.exports = {
  drawLine
};
