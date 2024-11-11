const fs = require("fs");
const path = require("path");
const { drawArc } = require("./arc");
const { testGPU } = require("./gpu");
const { testLine } = require("./line");
const { testRect } = require("./rect");
const { drawText } = require("./text");
const { testImage } = require("./images");
const { testGradinent } = require("./gradient");
const { setInterval } = require("timers");

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

test("rect", () => {
  testRect(outputPath);
});

test("gradient", () => {
  testGradinent(outputPath);
});

test("image", () => {
  testImage(outputPath);
});

test("gpu", () => {
  testGPU(outputPath);
});
