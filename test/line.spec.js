const fs = require("fs");
const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(600, 400);
const ctx = canvas.getContext("2d", { antialias: true });

const outputDir = path.join(__dirname, "output/Line");

if (!fs.existsSync(outputDir)) {
  try {
    fs.mkdirSync(outputDir, { recursive: true });
  } catch (error) {
    console.error(error);
  }
}

describe("Line Test", () => {
  test("Draw Heptagram Test", () => {
    drawHeptagram();
    canvas.saveAsImage(path.resolve(outputDir, "Draw Heptagram Test.jpg"));
  });

  test("Draw A Straight Line Test", () => {
    drawStraightLine();
    canvas.saveAsImage(path.resolve(outputDir, "Draw A Straight Line Test.jpg"));
  });

  test("Draw A Vertical Line Test", () => {
    drawVerticalLine();
    canvas.saveAsImage(path.resolve(outputDir, "Draw A Vertical Line Test.jpg"));
  });

  test("Draw An Arc Line Test", () => {
    drawArcLine();
    canvas.saveAsImage(path.resolve(outputDir, "Draw An Arc Line Test.jpg"));
  });

  test("Draw A Cap Line Test", () => {
    drawCapLine();
    canvas.saveAsImage(path.resolve(outputDir, "Draw A Cap Line Test.jpg"));
  });

  test("Draw A Rect Test", () => {
    drawRect();
    canvas.saveAsImage(path.resolve(outputDir, "Draw A Rect Test.jpg"));
  });

  test("Draw A Triangle Line Test", () => {
    drawTriangleLine();
    canvas.saveAsImage(path.resolve(outputDir, "Draw A Triangle Line Test.jpg"));
  });

  test("Draw A Join Line Test", () => {
    drawJoinLine();
    canvas.saveAsImage(path.resolve(outputDir, "Draw A Join Line Test.jpg"));
  });

  test("Draw A Line Dash Test", () => {
    drawLineDash();
    canvas.saveAsImage(path.resolve(outputDir, "Draw A Line Dash Test.jpg"));
  });

  test("Draw A Bezier Curve Test", () => {
    drawBezierCurveTo();
    canvas.saveAsImage(path.resolve(outputDir, "Draw A Bezier Curve Test.jpg"));
  });

  test("Draw A Quadratic Curve Test", () => {
    drawQuadraticCurveTo();
    canvas.saveAsImage(path.resolve(outputDir, "Draw A Quadratic Curve Test.jpg"));
  });

  test("Draw A Heptagram With Fill Test", () => {
    drawHeptagramFill();
    canvas.saveAsImage(path.resolve(outputDir, "Draw A Heptagram With Fill Test.jpg"));
  });

  test("Draw A Triangle With Fill Test", () => {
    drawTriangleFill();
    canvas.saveAsImage(path.resolve(outputDir, "Draw A Triangle With Fill Test.jpg"));
  });

  test("Draw A Rectangle With Fill Test", () => {
    drawRectFill();
    canvas.saveAsImage(path.resolve(outputDir, "Draw A Rectangle With Fill Test.jpg"));
  });

  test("Draw A Round Rectangle With Fill Test", () => {
    drawRoundRectFill();
    canvas.saveAsImage(path.resolve(outputDir, "Draw A Round Rectangle With Fill Test.jpg"));
  });

  test("Draw A Round Rectangle With Stroke Test", () => {
    drawRoundRectStroke();
    canvas.saveAsImage(path.resolve(outputDir, "Draw A Round Rectangle With Stroke Test.jpg"));
  });
});

function drawHeptagram() {
  const scale = 100;
  const R = 0.45 * scale;
  const TAU = 6.2831853;
  ctx.beginPath();
  ctx.moveTo(R, 0);
  for (let i = 1; i < 7; ++i) {
    const theta = (3 * i * TAU) / 7;
    ctx.lineTo(R * Math.cos(theta), R * Math.sin(theta));
  }
  ctx.closePath();
  ctx.translate(0.5 * scale, 0.5 * scale);
  ctx.strokeStyle = "rgb(255,0,0)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.translate(-0.5 * scale, -0.5 * scale);
}

function drawStraightLine() {
  ctx.beginPath();
  ctx.moveTo(150, 0);
  ctx.lineTo(150, 100);
  ctx.strokeStyle = "rgba(255,0,0,1)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawVerticalLine() {
  ctx.beginPath();
  ctx.moveTo(200, 50);
  ctx.lineTo(300, 50);
  ctx.strokeStyle = "#00ff00";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawArcLine() {
  ctx.beginPath();
  ctx.arc(350, 50, 40, 0, 360);
  ctx.strokeStyle = "#f00";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawTriangleLine() {
  ctx.beginPath();
  ctx.moveTo(450, 10);
  ctx.lineTo(490, 90);
  ctx.lineTo(410, 90);
  ctx.closePath();
  ctx.strokeStyle = "rgba(0,0,255,1)";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawCapLine() {
  ctx.beginPath();
  ctx.strokeStyle = "rgba(0,255,0,1)";
  ctx.lineWidth = 10;

  ctx.beginPath();
  ctx.lineCap = "butt";
  ctx.moveTo(510, 10);
  ctx.lineTo(590, 10);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.moveTo(510, 50);
  ctx.lineTo(590, 50);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineCap = "square";
  ctx.moveTo(510, 90);
  ctx.lineTo(590, 90);
  ctx.stroke();
}

function drawRect() {
  ctx.strokeStyle = "rgba(0,0,0,1)";
  ctx.lineWidth = 1;
  ctx.rect(10, 110, 90, 90);
  ctx.stroke();
}

function drawJoinLine() {
  ctx.strokeStyle = "rgba(255,0,0,1)";
  ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.moveTo(130, 130);
  ctx.lineTo(150, 150);
  ctx.lineTo(130, 170);
  ctx.lineJoin = "miter";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(170, 131);
  ctx.lineTo(200, 150);
  ctx.lineTo(170, 170);
  ctx.lineJoin = "round";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(220, 130);
  ctx.lineTo(250, 150);
  ctx.lineTo(220, 170);
  ctx.lineJoin = "bevel";
  ctx.stroke();
}

function drawLineDash() {
  ctx.beginPath();
  ctx.strokeStyle = "RGBA(255,255,0,1)";
  ctx.lineWidth = 1;
  ctx.moveTo(280, 130);
  ctx.lineTo(380, 130);
  ctx.setLineDash([2, 2]);
  ctx.stroke();
}

function drawBezierCurveTo() {
  ctx.beginPath();
  ctx.strokeStyle = "RGBA(255,255,0,1)";
  ctx.lineWidth = 1;
  ctx.moveTo(390, 180);
  ctx.bezierCurveTo(410, 130, 440, 130, 470, 150);
  ctx.setLineDash([]);
  ctx.stroke();
}

function drawQuadraticCurveTo() {
  ctx.beginPath();
  ctx.strokeStyle = "RGBA(255,255,0,1)";
  ctx.lineWidth = 1;
  ctx.moveTo(490, 180);
  ctx.quadraticCurveTo(510, 130, 510, 150);
  ctx.stroke();
}

function drawHeptagramFill() {
  const scale = 100;
  const R = 0.45 * scale;
  const TAU = 6.2831853;
  ctx.beginPath();
  ctx.moveTo(R, 200);
  for (let i = 1; i < 7; ++i) {
    const theta = (3 * i * TAU) / 7;
    ctx.lineTo(R * Math.cos(theta), R * Math.sin(theta) + 200);
  }

  ctx.closePath();
  ctx.translate(0.5 * scale, 0.5 * scale);
  ctx.fillStyle = "rgba(255,0,255,1)";
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.translate(-0.5 * scale, -0.5 * scale);
}

function drawTriangleFill() {
  ctx.beginPath();
  ctx.moveTo(150, 210);
  ctx.lineTo(190, 290);
  ctx.lineTo(110, 290);
  ctx.closePath();
  ctx.fillStyle = "RGBA(255,255,0,1)";
  ctx.fill();
}

function drawRectFill() {
  ctx.strokeStyle = "RGBA(0,0,0,1)";
  ctx.rect(210, 210, 90, 90);
  ctx.fill();
}

function drawRoundRectStroke() {
  ctx.beginPath();
  ctx.strokeStyle = "RGBA(255,0,0,1)";
  ctx.setLineDash([]);
  ctx.roundRect(310, 210, 90, 90, [10, 20]);
  ctx.stroke();
}

function drawRoundRectFill() {
  ctx.beginPath();
  ctx.strokeStyle = "RGBA(255,0,0,1)";
  ctx.roundRect(410, 207, 90, 90, [10, 10, 10, 10]); // 99999997573997
  ctx.closePath();
  ctx.fill();
}
