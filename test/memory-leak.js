const skia = require("../build/Release/skia-native-win-x64.node");

console.log(skia.Canvas);
setInterval(() => {
  const example = new skia.Canvas(1000, 1000, 0);
  console.log(example);
}, 0.01)
