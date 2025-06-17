const fs = require("fs");
const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(400, 400);
const ctx = canvas.getContext("2d", { antialias: true });

const outputPath = path.join(__dirname, "output/Other");

if (!fs.existsSync(outputPath)) {
  try {
    fs.mkdirSync(outputPath, { recursive: true });
  } catch (error) {
    console.error(error);
  }
}


describe("Other Test", () => {
  test("Other Test", () => {
    saveAndResotre();
    globalAlpha();
    clip();
    canvas.saveAsImage(path.resolve(outputPath, "other.jpg"));
  });
});

function saveAndResotre() {
  ctx.save();
  ctx.fillStyle = "#000";
  ctx.clearRect(0, 0, 155, 155);
  ctx.fillRect(0, 0, 155, 155);
  // Translate to the center point of the image
  ctx.translate(74, 74); // Image center point (74, 74)
  ctx.rotate(Math.PI / 180 * 6);
  ctx.drawImage(path.resolve(__dirname, "./images/cat.jpg"), -74, -74, 148, 148);
  // Translate back to the origin
  ctx.translate(-74, -74);
  ctx.restore();
}

function globalAlpha() {
  ctx.save();
  ctx.globalAlpha = 0.1;
  ctx.drawImage(path.resolve(__dirname, "./images/cat.jpg"), 160, 0, 148, 148);
  ctx.restore();
}

function clip() {
  ctx.save();
  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.rect(0, 160, 50, 50);
  ctx.clip();
  ctx.closePath();
  ctx.drawImage(path.resolve(__dirname, "./images/cat.jpg"), 0, 160, 148, 148);
  ctx.restore();
}
