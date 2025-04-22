const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(800, 800);
const ctx = canvas.getContext("2d", { antialias: false });

function drawBaselineText() {
  const baselines = [
    "top",
    "hanging",
    "middle",
    "alphabetic",
    "ideographic",
    "bottom",
  ];

  ctx.font = "36px serif";
  ctx.strokeStyle = "red";

  baselines.forEach((baseline, index) => {
    ctx.textBaseline = baseline;
    const y = 75 + index * 75;
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(550, y + 0.5);
    ctx.stroke();
    ctx.fillText(`Abcdefghijklmnop (${baseline})`, 0, y);
  });

  canvas.saveAsImage(path.resolve(__dirname, "output", "textbaseline.jpg"));
}

module.exports = {
  drawBaselineText
};
