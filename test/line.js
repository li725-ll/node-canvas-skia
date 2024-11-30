const path = require("path");
const skia = require("../dist");

const canvas = new skia.Canvas(600, 400);
const ctx = canvas.getContext("2d", { antialias: true });

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

function testLine(outputPath) {
  drawHeptagram(); // draw a heptagram
  drawStraightLine(); // draw a straight line
  drawVerticalLine(); // draw a vertical line
  drawCapLine(); // draw a cap line
  drawTriangleLine(); // draw a triangle line
  drawArcLine(); // draw an arc line
  drawRect(); // draw a rectangle
  drawJoinLine(); // draw a join line
  drawLineDash(); // draw a line dash
  drawBezierCurveTo(); // draw a bezier curve
  drawQuadraticCurveTo(); // draw a quadratic curve
  drawHeptagramFill(); // draw a heptagram with fill
  drawTriangleFill(); // draw a triangle with fill
  drawRectFill(); // draw a rectangle with fill
  drawRoundRectStroke(); // draw a round rectangle
  drawRoundRectFill(); // draw a round rectangle with fill
  canvas.saveAsImage(path.resolve(outputPath, "line.jpg"));
}

module.exports = {
  testLine
};
