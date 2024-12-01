const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(256, 256);
const ctx = canvas.getContext("2d", { antialias: true });

function saveAndResotre(outputPath) {
  let i = 0;
  setInterval(() => {
    ctx.save();
    ctx.fillStyle = "#000";
    ctx.clearRect(0, 0, 155, 155);
    ctx.fillRect(0, 0, 155, 155);
    // 平移到图像的中心点
    ctx.translate(74, 74); // 图像中心点 (74, 74)
    ctx.rotate(Math.PI / 180 * i * 2);
    ctx.drawImage(image, -74, -74, 148, 148);
    // 平移回原点
    ctx.translate(-74, -74);
    i++;
    if (i === 181) {
      i = 0;
    }
    ctx.restore();
    canvas.saveAsImage(path.resolve(outputPath, "other.jpg"));
  }, 50);
}

module.exports = {
  saveAndResotre
}
