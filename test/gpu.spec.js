const fs = require("fs");
const path = require("path");
const skia = require("../dist");


const canvas = new skia.Canvas(600, 400, true);
const ctx = canvas.getContext("2d", { antialias: true });

const outputDir = path.join(__dirname, "output/GPU");

if (!fs.existsSync(outputDir)) {
  try {
    fs.mkdirSync(outputDir, { recursive: true });
  } catch (error) {
    console.error(error);
  }
}

describe("GPU Test", () => {
  test("GPU Test", () => {
    testGPU(outputDir);
  });
});

function drawHeptagram() {
  const scale = 100;
  const R = 0.45 * scale;
  const TAU = 6.2831853;
  ctx.beginPath();
  ctx.moveTo(R, 0);
  for (let i = 1; i < 7; ++i) {
    const theta = (3 * i * TAU) / 7;
    ctx.lineTo(R * Math.cos(theta), R * Math.sin(theta));
  }
  ctx.closePath();
  ctx.translate(0.5 * scale, 0.5 * scale);
  ctx.strokeStyle = "rgb(255,0,0)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.translate(-0.5 * scale, -0.5 * scale);
}

function testGPU(outputPath) {
  drawHeptagram(); // draw a heptagram
  canvas.saveAsImage(path.resolve(outputPath, "gpu.jpg"));
}
