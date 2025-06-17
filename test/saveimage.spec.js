const fs = require("fs");
const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(500, 500);
const ctx = canvas.getContext("2d", { antialias: true });

const outputDir = path.join(__dirname, "output/SaveImage");

if (!fs.existsSync(outputDir)) {
  try {
    fs.mkdirSync(outputDir, { recursive: true });
  } catch (error) {
    console.error(error);
  }
}

describe("Save Image Test", () => {
  test("save bmp", () => {
    ctx.drawImage(path.resolve(__dirname, "./images/cat.jpg"), 0, 0, 500, 500);
    canvas.saveAsImage(path.resolve(outputDir, "cat.bmp"), "bmp");
  });

  test("buffer bmp", () => {
    ctx.drawImage(path.resolve(__dirname, "./images/cat.jpg"), 0, 0, 500, 500);
    const temp = canvas.toBuffer("bmp");
    console.log(temp);
  });

  test("buffer matrix", () => {
    ctx.drawImage(path.resolve(__dirname, "./images/cat.jpg"), 0, 0, 500, 500);
    const temp = canvas.toBuffer("matrix");
    console.log(temp);
  });

  test("read bmp", () => {
    const data = fs.readFileSync(path.resolve(outputDir, "cat.bmp"));
    console.log(data.length);
  });
});
