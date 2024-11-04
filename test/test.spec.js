const fs = require("fs");
const path = require("path");
const { drawArc } = require("./arc");
const { testLine } = require("./line");
const { drawRect } = require("./rect");
const { drawText } = require("./text");

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
  drawRect(outputPath);
});