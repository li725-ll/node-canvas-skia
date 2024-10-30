const { drawArc } = require("./arc");
const { drawLine } = require("./line");
const { drawRect } = require("./rect");

test("line", () => {
  drawLine();
});

test("arc", () => {
  drawArc();
});

test("rect", () => {
  drawRect();
});
