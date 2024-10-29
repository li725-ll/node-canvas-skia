const skia = require("../build/Release/skia-native.node");

const canvas = new skia.Canvas(100, 100);
const ctx = canvas.getContext();

ctx.beginPath();
console.log("begin path");

ctx.moveTo(0, 0);
console.log("move to");

ctx.lineTo(100, 100);
console.log("line to");

ctx.closePath();
console.log("close path");

ctx.clear(skia.Utils.RGBA(255, 0, 0, 1));
console.log("clear");

ctx.stroke();
console.log("stroke");

console.log(canvas.saveAsImage("E:\\gitee\\node-skia\\test.jpg"));
console.log("save as image");
