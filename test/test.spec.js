const { drawArc } = require("./arc.spec");
const { drawLine } = require("./line.spec");

test("line", () => {
  drawLine();
});

test("arc", () => {
  drawArc();
});
