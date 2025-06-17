const { setInterval } = require("timers");
const skia = require("../build/Release/skia-native-win-x64.node");

console.log(skia.Canvas);
setInterval(() => {
  let example = new skia.Canvas(1000, 1000, 0);
  console.log(example);

  // let example1 = new skia.Canvas(1000, 1000, 0);
  // console.log(example);

}, 0.01)

// setInterval(() => { example = null, example1 = null }, 10000)
