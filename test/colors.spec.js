const path = require("path");
const skia = require("../dist");

describe("Colors", () => {
  test("Color value test", () => {
    const colors = [
      "aliceblue",
      "antiquewhite",
      "aqua",
      "aquamarine",
      "azure",
      "beige",
      "bisque",
      "black",
      "blanchedalmond",
      "blue",
      "blueviolet",
      "brown",
      "burlywood",
      "cadetblue",
      "chartreuse",
      "chocolate",
      "coral",
      "cornflowerblue",
      "cornsilk",
      "crimson",
      "cyan",
      "darkblue",
      "darkcyan",
      "darkgoldenrod",
      "darkgray",
      "darkgreen",
      "darkgrey",
      "darkkhaki",
      "darkmagenta",
      "darkolivegreen",
      "darkorange",
      "darkorchid",
      "darkred",
      "darksalmon",
      "darkseagreen",
      "darkslateblue",
      "darkslategray",
      "darkslategrey",
      "darkturquoise",
      "darkviolet",
      "deeppink",
      "deepskyblue",
      "dimgray",
      "dimgrey",
      "dodgerblue",
      "firebrick",
      "floralwhite",
      "forestgreen",
      "fuchsia",
      "gainsboro",
      "ghostwhite",
      "gold",
      "goldenrod",
      "gray",
      "green",
      "greenyellow",
      "grey",
      "honeydew",
      "hotpink",
      "indianred",
      "indigo",
      "ivory",
      "khaki",
      "lavender",
      "lavenderblush",
      "lawngreen",
      "lemonchiffon",
      "lightblue",
      "lightcoral",
      "lightcyan",
      "lightgoldenrodyellow",
      "lightgray",
      "lightgreen",
      "lightgrey",
      "lightpink",
      "lightsalmon",
      "lightseagreen",
      "lightskyblue",
      "lightslategray",
      "lightslategrey",
      "lightsteelblue",
      "lightyellow",
      "lime",
      "limegreen",
      "linen",
      "magenta",
      "maroon",
      "mediumaquamarine",
      "mediumblue",
      "mediumorchid",
      "mediumpurple",
      "mediumseagreen",
      "mediumslateblue",
      "mediumspringgreen",
      "mediumturquoise",
      "mediumvioletred",
      "midnightblue",
      "mintcream",
      "mistyrose",
      "moccasin",
      "navajowhite",
      "navy",
      "oldlace",
      "olive",
      "olivedrab",
      "orange",
      "orangered",
      "orchid",
      "palegoldenrod",
      "palegreen",
      "paleturquoise",
      "palevioletred",
      "papayawhip",
      "peachpuff",
      "peru",
      "pink",
      "plum",
      "powderblue",
      "purple",
      "rebeccapurple",
      "red",
      "rosybrown",
      "royalblue",
      "saddlebrown",
      "salmon",
      "sandybrown",
      "seagreen",
      "seashell",
      "sienna",
      "silver",
      "skyblue",
      "slateblue",
      "slategray",
      "slategrey",
      "snow",
      "springgreen",
      "steelblue",
      "tan",
      "teal",
      "thistle",
      "tomato",
      "transparent",
      "turquoise",
      "violet",
      "wheat",
      "white",
      "whitesmoke",
      "yellow",
      "yellowgreen"
    ];
    const canvas = new skia.Canvas(
      10 * 100,
      Math.ceil(colors.length / 10) * 100,
      false
    );
    const ctx = canvas.getContext("2d", { antialias: true });

    for (let i = 0; i < Math.ceil(colors.length / 10) * 10; i++) {
      for (let j = 0; j < 10; j++) {
        const index = i * 10 + j;
        if (index >= colors.length) {
          break;
        }

        ctx.fillStyle = colors[index];
        ctx.fillRect(j * 100, i * 100, 100, 100);
        if (colors[index] === "black") {
          ctx.fillStyle = "white";
        } else {
          ctx.fillStyle = "black";
        }
        ctx.fillText(colors[index], j * 100 + 20, i * 100 + 55);
      }
    }

    canvas.saveAsImage(path.join(__dirname, "output", "Color value test.png"));
  });

  test("Hexadecimal format color value test", () => {
    const colors = [
      "#000000",
      "#FF0000",
      "#00FF00",
      "#0000FF",
      "#FFFFFF",
      "#FFFF00",
      "#FF00FF",
      "#00FFff",
      "#FFF",
      "#FF0",
      "#00f"
    ];
    const canvas = new skia.Canvas(
      10 * 100,
      Math.ceil(colors.length / 10) * 100,
      false
    );
    const ctx = canvas.getContext("2d", { antialias: true });

    for (let i = 0; i < Math.ceil(colors.length / 10) * 10; i++) {
      for (let j = 0; j < 10; j++) {
        const index = i * 10 + j;
        if (index >= colors.length) {
          break;
        }

        ctx.fillStyle = colors[index];
        ctx.fillRect(j * 100, i * 100, 100, 100);
        if (colors[index] === "#000000") {
          ctx.fillStyle = "white";
        } else {
          ctx.fillStyle = "black";
        }
        ctx.fillText(colors[index], j * 100 + 20, i * 100 + 55);
      }
    }
    canvas.saveAsImage(
      path.join(__dirname, "output", "Hexadecimal format color value test.png")
    );
  });

  test("RGB format color value test", () => {
    const colors = [
      "rgb(0,0,0)",
      "RGb(0, 255, 0)",
      "RGB(0, 0, 0)",
      "RGB(255,0,0)",
      "RGB(0,0, 255)",
      "rgb(255,255,0)",
      "rgb(255,0,0)",
      "rGb(255,0,255)",
      "rgb(255,0,0)",
      "rgb(0,255,255)"
    ];
    const canvas = new skia.Canvas(
      10 * 100,
      Math.ceil(colors.length / 10) * 100,
      false
    );
    const ctx = canvas.getContext("2d", { antialias: true });

    for (let i = 0; i < Math.ceil(colors.length / 10) * 10; i++) {
      for (let j = 0; j < 10; j++) {
        const index = i * 10 + j;
        if (index >= colors.length) {
          break;
        }

        ctx.fillStyle = colors[index];
        ctx.fillRect(j * 100, i * 100, 100, 100);
        if (
          colors[index] === "rgb(0,0,0)" ||
          colors[index] === "RGB(0, 0, 0)"
        ) {
          ctx.fillStyle = "white";
        } else {
          ctx.fillStyle = "black";
        }
        ctx.fillText(colors[index], j * 100 + 20, i * 100 + 55);
      }
    }
    canvas.saveAsImage(
      path.join(__dirname, "output", "RGB format color value test.png")
    );
  });

  test("RGBA format color value test", () => {
    const colors = [
      "rgba(0,0,0, 1)",
      "RGbA(0, 255, 0, 1)",
      "RGBa(0, 0, 0, 0.5)",
      "RGBa(255,0,0, .3)",
      "RGBA(0,0, 255, .9)",
      "rgbA(255,255,0, 0)",
      "rgbA(255,0,0, 1)",
      "rGba(255,0,255, 1)",
      "rgbA(255,0,0, 1)",
      "rgba(0,255,255, 0.3)"
    ];
    const canvas = new skia.Canvas(
      10 * 100,
      Math.ceil(colors.length / 10) * 100,
      false
    );
    const ctx = canvas.getContext("2d", { antialias: true });

    for (let i = 0; i < Math.ceil(colors.length / 10) * 10; i++) {
      for (let j = 0; j < 10; j++) {
        const index = i * 10 + j;
        if (index >= colors.length) {
          break;
        }

        ctx.fillStyle = colors[index];
        ctx.fillRect(j * 100, i * 100, 100, 100);
        if (
          colors[index] === "rgba(0,0,0, 1)" ||
          colors[index] === "RGBa(0, 0, 0, 0.5)" ||
          colors[index].endsWith("0)")
        ) {
          ctx.fillStyle = "white";
        } else {
          ctx.fillStyle = "black";
        }
        ctx.fillText(colors[index], j * 100 + 10, i * 100 + 55);
      }
    }
    canvas.saveAsImage(
      path.join(__dirname, "output", "RGBA format color value test.png")
    );
  });

  test("GlobalAlpha test", () => {
    const colors = [
      "rgb(0,0,0)",
      "RGb(0, 255, 0)",
      "RGB(0, 0, 0)",
      "RGB(255,0,0)",
      "RGB(0,0, 255)",
      "rgb(255,255,0)",
      "rgb(255,0,0)",
      "rGb(255,0,255)",
      "rgb(255,0,0)",
      "rgb(0,255,255)"
    ];
    const canvas = new skia.Canvas(
      10 * 100,
      Math.ceil(colors.length / 10) * 100,
      false
    );
    const ctx = canvas.getContext("2d", { antialias: true });
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < Math.ceil(colors.length / 10) * 10; i++) {
      for (let j = 0; j < 10; j++) {
        const index = i * 10 + j;
        if (index >= colors.length) {
          break;
        }

        ctx.fillStyle = colors[index];
        ctx.fillRect(j * 100, i * 100, 100, 100);
        if (
          colors[index] === "rgb(0,0,0)" ||
          colors[index] === "RGB(0, 0, 0)"
        ) {
          ctx.fillStyle = "white";
        } else {
          ctx.fillStyle = "black";
        }
        ctx.fillText(colors[index], j * 100 + 20, i * 100 + 55);
      }
    }
    canvas.saveAsImage(
      path.join(__dirname, "output", "GlobalAlpha test.png")
    );
  });
});
