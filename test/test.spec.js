const fs = require("fs");
const path = require("path");
const { drawArc } = require("./arc");
const { drawLine } = require("./line");
const { drawRect } = require("./rect");

const outputPath = path.resolve(__dirname, "output");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

test("line", () => {
  drawLine(outputPath);
});

test("arc", () => {
  drawArc(outputPath);
});

test("rect", () => {
  drawRect(outputPath);
});
