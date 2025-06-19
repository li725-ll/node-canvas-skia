const fs = require("fs");
const path = require("path");
const skia = require("../dist");


const canvas = new skia.Canvas(512, 512, false);
const ctx = canvas.getContext("2d", { antialias: true });

const outputDir = path.join(__dirname, "output/Path");

if (!fs.existsSync(outputDir)) {
  try {
    fs.mkdirSync(outputDir, { recursive: true });
  } catch (error) {
    console.error(error);
  }
}

describe("Path", () => {
  test("Arc Path Test", () => {
    drawArc();
    canvas.saveAsImage(path.resolve(outputDir, "Arc Path Test.jpg"));
  });
});

function drawArc() {
  canvas.save();
  ctx.strokeStyle = "rgba(255,0,0,1)";
  ctx.lineWidth = 2;
  ctx.arc(10, 10, 100, 0, 360);
  ctx.stroke();
  canvas.restore();
}
