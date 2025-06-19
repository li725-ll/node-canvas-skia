const fs = require("fs");
const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(512, 512, false);
const ctx = canvas.getContext("2d", { antialias: true });

const outputDir = path.join(__dirname, "output/Gradient");

if (!fs.existsSync(outputDir)) {
  try {
    fs.mkdirSync(outputDir, { recursive: true });
  } catch (error) {
    console.error(error);
  }
}

describe("Gradient Test", () => {
  test ("Linear Gradient Test", () => {
    drawLinearGradientRect();
    canvas.saveAsImage(path.resolve(outputDir, "Linear Gradient Test.jpg"));
  });

  test("Radial Gradient Test", () => {
    drawRadialGradientRect();
    canvas.saveAsImage(path.resolve(outputDir, "Radial Gradient Test.jpg"));
  });

  test("Conic Gradient Test", () => {
    drawConicGradientRect();
    canvas.saveAsImage(path.resolve(outputDir, "Conic Gradient Test.jpg"));
  });
});

function drawLinearGradientRect() {
  const gradient = ctx.createLinearGradient(256, 0, 512, 0);
  gradient.addColorStop(0, "green");
  gradient.addColorStop(0.5, "cyan");
  gradient.addColorStop(1, "green");
  ctx.fillStyle = gradient;
  ctx.fillRect(20, 20, 200, 100)

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

// createConicGradient
function drawConicGradientRect() {
  const gradient = ctx.createConicGradient(0, 128, 384); // 384
  gradient.addColorStop(0, "#f00");
  gradient.addColorStop(0.25, "#f0f");
  gradient.addColorStop(0.5, "#ff0");
  gradient.addColorStop(0.75, "#0f0");
  gradient.addColorStop(1, "#00f");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.fillRect(0, 256, 256, 256);
  ctx.fill();
}
