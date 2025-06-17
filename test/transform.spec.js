const fs = require("fs");
const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(500, 500);
const ctx = canvas.getContext("2d", { antialias: true });

const outputPath = path.join(__dirname, "output/Transform");

if (!fs.existsSync(outputPath)) {
  try {
    fs.mkdirSync(outputPath, { recursive: true });
  } catch (error) {
    console.error(error);
  }
}

describe("Transform Test", () => {
  test("Transform Test", () => {
    drawRotateRect();
    canvas.saveAsImage(path.resolve(outputPath, "transform.png"), "png");
  });

  test("Set Transform Test", () => {
    testSetTransform();
    canvas.saveAsImage(path.resolve(outputPath, "setTransform.png"), "png");
  });
});

function drawRotateRect() {
  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250);
  ctx.rotate(90); // * Math.PI / 180
  ctx.fillRect(-50, -25, 100, 50);
  ctx.clearRect(-50, -25, 100, 50);
}

function testSetTransform() {
  // ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillRect(1, 1, 100, 50);
}
