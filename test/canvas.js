const skia = require("../build/Release/skia-native.node");

const canvas = new skia.Canvas(256, 256);
const ctx = canvas.getContext("2d", { antialias: true });

// ctx.beginPath();
// console.log("begin path");

// ctx.moveTo(0, 0);
// console.log("move to");

// ctx.lineTo(100, 100);
// console.log("line to");

// ctx.closePath();
// console.log("close path");

// ctx.clear(skia.Utils.RGBA(255, 0, 0, 1));
// console.log("clear");

// ctx.stroke();
// console.log("stroke");

// console.log(canvas.saveAsImage("E:\\gitee\\node-skia\\test.jpg"));
// console.log("save as image");

const scale = 256;
const R = 0.45 * scale;
const TAU = 6.2831853;

ctx.beginPath();
ctx.moveTo(R, 0);
for (let i = 1; i < 7; ++i) {
  const theta = 3 * i * TAU / 7;
  ctx.lineTo(R * Math.cos(theta), R * Math.sin(theta));
}

ctx.closePath();
ctx.clear(skia.Utils.RGBA(255, 255, 255, 1));
ctx.translate(0.5 * scale, 0.5 * scale)
ctx.strokeStyle(1);
ctx.lineWidth(2);
ctx.stroke();
console.log(canvas.saveAsImage("E:\\gitee\\node-skia\\test\\out\\test.jpg"));


/*
void draw(SkCanvas *canvas)
{
  const SkScalar scale = 256.0f;
  const SkScalar R = 0.45f * scale;
  const SkScalar TAU = 6.2831853f;
  SkPath path;
  path.moveTo(R, 0.0f);
  for (int i = 1; i < 7; ++i)
  {
    SkScalar theta = 3 * i * TAU / 7;
    path.lineTo(R * cos(theta), R * sin(theta));
  }
  path.close();
  SkPaint p;
  p.setAntiAlias(true);
  canvas->clear(SK_ColorWHITE);
  canvas->translate(0.5f * scale, 0.5f * scale);
  canvas->drawPath(path, p);
}
*/
