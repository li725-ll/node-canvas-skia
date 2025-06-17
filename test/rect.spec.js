const fs = require("fs");
const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(256, 256);
const ctx = canvas.getContext("2d", { antialias: true });

const outputDir = path.join(__dirname, "output/Rect");

if (!fs.existsSync(outputDir)) {
  try {
    fs.mkdirSync(outputDir, { recursive: true });
  } catch (error) {
    console.error(error);
  }
}

describe("Rect Test", () => {
  test("draw Rect Test", () => {
    drawRect();
    canvas.saveAsImage(path.resolve(outputDir, "draw Rect Test.jpg"));
  });

  test("draw Fill Rect Test", () => {
    drawFillRect();
    canvas.saveAsImage(path.resolve(outputDir, "draw Fill Rect Test.jpg"));
  });

  test("draw Clear Rect Test", () => {
    drawClearRect();
    canvas.saveAsImage(path.resolve(outputDir, "draw Clear Rect Test.jpg"));
  });
});

function drawRect() {
  ctx.strokeStyle = "rgba(255,0,0,1)";
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, 100, 100);
}

function drawFillRect() {
  ctx.fillStyle = "rgba(255,0,0,0.5)";
  ctx.fillRect(60, 60, 100, 100);
}

function drawClearRect() {
  ctx.clearRect(50, 50, 100, 100);
}
