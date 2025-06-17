const fs = require("fs");
const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(500, 500);
const ctx = canvas.getContext("2d", { antialias: true });

const outputDir = path.join(__dirname, "output/Image");

if (!fs.existsSync(outputDir)) {
  try {
    fs.mkdirSync(outputDir, { recursive: true });
  } catch (error) {
    console.error(error);
  }
}

describe("Image Test", () => {
  test("Draw Image From Path Test", () => {
    drawImage();
    canvas.saveAsImage(path.resolve(outputDir, "Draw Image Test From Path.jpg"));
  });

  test("draw Image Buffer From Buffer Test", () => {
    drawImageBuffer();
    canvas.saveAsImage(path.resolve(outputDir, "draw Image Buffer.jpg"));
  });
});

function drawImage() {
  ctx.drawImage(path.resolve(__dirname, "./images/cat.jpg"), 0, 0, 100, 100);
}

function drawImageBuffer() {
  const data = fs.readFileSync(path.resolve(__dirname, "./images/cat.jpg"));
  ctx.drawImage(data, 100, 0, 200, 200);
}
