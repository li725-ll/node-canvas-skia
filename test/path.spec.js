const fs = require("fs");
const path = require("path");
const skia = require("../dist");

const width = 500;
const height = 500;
const canvas = new skia.Canvas(width, height, false);
const ctx = canvas.getContext("2d", { antialias: true });

const outputDir = path.join(__dirname, "output/Path/Arc");

if (!fs.existsSync(outputDir)) {
  try {
    fs.mkdirSync(outputDir, { recursive: true });
  } catch (error) {
    console.error(error);
  }
}


describe("Arc", () => {
  test("Draw a circular arc", () => {
    drawCircular();
    canvas.saveAsImage(path.resolve(outputDir, "Draw a circular arc.jpg"));
    ctx.clear();
  });

  test("Draw a quarter arc (top left)", () => {
    drawRightTopArc();
    canvas.saveAsImage(path.resolve(outputDir, "Draw a quarter arc (top left).jpg"));
    ctx.clear();
  });

  test("Draw a quarter arc (right bottom)", () => {
    drawRightBottomArc();
    canvas.saveAsImage(path.resolve(outputDir, "Draw a quarter arc (right bottom).jpg"));
    ctx.clear();
  });

  test("Integrated test", () => {
    integratedTest();
    canvas.saveAsImage(path.resolve(outputDir, "Integrated test.jpg"));
    ctx.clear();
  });
});

function drawCircular() {
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, width / 3, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawRightTopArc() {
  ctx.beginPath();
  ctx.strokeStyle = "rgba(255,0,0,1)";
  ctx.lineWidth = 2;
  ctx.arc(width / 2, height / 2, width / 3, 0, Math.PI / 2, true);
  ctx.stroke();
}


function drawRightBottomArc() {
  ctx.beginPath();
  ctx.strokeStyle = "rgba(255,0,0,1)";
  ctx.lineWidth = 2;
  ctx.arc(width / 2, height / 2, width / 3, 0, Math.PI / 2);
  ctx.stroke();
}

function integratedTest() {
  ctx.strokeStyle = "rgba(255,0,0,1)";
  ctx.fillStyle = "rgba(255,0,0,1)";
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 2; j++) {
      ctx.beginPath();
      let x = 100 + 50 + j * 100; // x 坐标
      let y = 80 + 50 + i * 100; // y 坐标
      let radius = 45; // 圆弧半径
      let startAngle = 0; // 圆弧起始角度
      let endAngle = Math.PI + (Math.PI * j) / 2; // 圆弧结束角度
      let counterclockwise = i % 2 === 1; // 是否逆时针绘制
      ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);

      if (i > 1) {
        ctx.fill(); // 填充形状
      } else {
        ctx.stroke(); // 绘制形状轮廓
      }
    }
  }
}
