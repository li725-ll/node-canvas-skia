const fs = require("fs");
const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(500, 500);
const ctx = canvas.getContext("2d", { antialias: true });

test("save bmp", () => {
  ctx.drawImage(path.resolve(__dirname, "./images/cat.jpg"), 0, 0, 500, 500);
  canvas.saveAsImage(path.resolve(__dirname, "./output/cat.bmp"), "bmp");
});

test("buffer bmp", () => {
  ctx.drawImage(path.resolve(__dirname, "./images/cat.jpg"), 0, 0, 500, 500);
  const temp = canvas.toBuffer("bmp");
});

test("read bmp", () => {
  const data = fs.readFileSync(path.resolve(__dirname, "./output/cat.bmp"));
  console.log(data.length);
});
