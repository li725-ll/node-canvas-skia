const fs = require("fs");
const path = require("path");
const { drawArc } = require("./arc");
const { testGPU } = require("./gpu");
const { testLine } = require("./line");
const { testRect } = require("./rect");
const { drawText } = require("./text");
const { drawBaselineText } = require("./textbaseline");
const { testImage } = require("./images");
const { testTransform } = require("./transform");
const { testOther } = require("./other");

const outputPath = path.resolve(__dirname, "output");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

test("line", () => {
  testLine(outputPath);
});

test("arc", () => {
  drawArc(outputPath);
});

test("text", () => {
  drawText(outputPath);
});

test("textbaseline", () => {
  drawBaselineText(outputPath);
});

test("rect", () => {
  testRect(outputPath);
});

test("image", () => {
  testImage(outputPath);
});

test("transform", () => {
  testTransform(outputPath);
});

test("gpu", () => {
  testGPU(outputPath);
});

test("other", () => {
  testOther(outputPath);
});
