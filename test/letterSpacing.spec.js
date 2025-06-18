const fs = require("fs");
const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(800, 800);
const ctx = canvas.getContext("2d", { antialias: true });

const outputDir = path.join(__dirname, "output/LetterSpacing");

if (!fs.existsSync(outputDir)) {
  try {
    fs.mkdirSync(outputDir, { recursive: true });
  } catch (error) {
    console.error(error);
  }
}

describe("LetterSpacing Test", () => {
  loadFont();
  test("Stroke Text LetterSpacing Test", () => {
    ctx.letterSpacing = "5px";
    drawStrokeText();
    canvas.saveAsImage(path.resolve(outputDir, "Stroke Text LetterSpacing Test.jpg"));
  });

  test("Fill Text LetterSpacing Test", () => {
    ctx.letterSpacing = "5px";
    drawFillText();
    canvas.saveAsImage(path.resolve(outputDir, "Fill Text LetterSpacing Test.jpg"));
  });
});

function loadFont() {
  const fontPath = path.join(__dirname, "./fonts/REEJI-PinboGB-Flash.ttf");
  ctx.loadFont(fontPath, "Reejipinbo");
}

function drawStrokeText() {
  ctx.strokeStyle = "rgba(0,255,255,1)";
  ctx.font = "60px Reejipinbo";
  ctx.strokeText("Hello Skia", 50, 100);
  ctx.strokeText("中国智造", 50, 300);
}

function drawFillText() {
  ctx.strokeStyle = "rgba(0,255,255,1)";
  ctx.font = "60px 微软雅黑";
  ctx.fillText("Hello Skia", 100, 200);
  ctx.fillText("中文测试", 450, 200);
}
