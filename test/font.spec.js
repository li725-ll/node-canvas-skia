const fs = require("fs");
const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(800, 800);
const ctx = canvas.getContext("2d", { antialias: true });

const outputDir = path.join(__dirname, "output/Font");

if (!fs.existsSync(outputDir)) {
  try {
    fs.mkdirSync(outputDir, { recursive: true });
  } catch (error) {
    console.error(error);
  }
}

describe("Font Test", () => {
  loadFont();
  test("Stroke Text Test", () => {
    drawStrokeText();
    canvas.saveAsImage(path.resolve(outputDir, "Stroke Text Test.jpg"));
  });

  test("Fill Text Test", () => {
    drawFillText();
    canvas.saveAsImage(path.resolve(outputDir, "Fill Text Test.jpg"));
  });

  test("measure Text Test", () => {
    measureText();
  })
});

function loadFont() {
  const fontPath = path.join(__dirname, "./fonts/REEJI-PinboGB-Flash.ttf");
  ctx.loadFont(fontPath, "Reejipinbo");
}

function measureText() {
  let metrics = ctx.measureText("中国智造");
  console.log("中国智造", metrics.width);

  const temp = ctx.measureText("Hello Skia")
  ctx.letterSpacing = "2px";
  metrics = ctx.measureText("Hello Skia");
  expect(metrics.width).toBe(9 * 2 + temp.width);
}

function drawStrokeText() {
  ctx.strokeStyle = "rgba(0,255,255,1)";
  ctx.font = "60px Reejipinbo";
  ctx.strokeText("Hello Skia", 50, 100);
  ctx.strokeText("中国智造", 450, 100);
}

function drawFillText() {
  ctx.strokeStyle = "rgba(0,255,255,1)";
  ctx.font = "60px 微软雅黑";
  ctx.fillText("Hello Skia", 100, 200);
  ctx.fillText("中文测试", 400, 200);
}
