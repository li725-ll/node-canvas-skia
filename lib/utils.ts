import skia from "./binding";

type VAL =
  | "black"
  | "silver"
  | "silver"
  | "gray"
  | "white"
  | "maroon"
  | "red"
  | "purple"
  | "fuchsia"
  | "green"
  | "lime"
  | "olive"
  | "yellow"
  | "navy"
  | "blue"
  | "teal"
  | "Teal"
  | "aqua"
  | "aliceblue"
  | "antiquewhite"
  | "aquamarine"
  | "azure"
  | "beige"
  | "bisque"
  | "blanchedalmond"
  | "blueviolet"
  | "brown"
  | "burlywood"
  | "cadetblue"
  | "chartreuse"
  | "chocolate"
  | "coral"
  | "cornflowerblue"
  | "cornsilk"
  | "crimson"
  | "cyan"
  | "darkblue"
  | "darkcyan"
  | "darkgoldenrod"
  | "darkgray"
  | "darkgreen"
  | "darkgrey"
  | "darkkhaki"
  | "darkmagenta"
  | "darkolivegreen"
  | "darkorange"
  | "darkorchid"
  | "darkred"
  | "darksalmon"
  | "darkseagreen"
  | "darkslateblue"
  | "darkslategray"
  | "darkslategrey"
  | "darkturquoise"
  | "darkviolet"
  | "deeppink"
  | "deepskyblue"
  | "dimgray"
  | "dimgrey"
  | "dodgerblue"
  | "firebrick"
  | "floralwhite"
  | "forestgreen"
  | "fuchsia"
  | "gainsboro"
  | "ghostwhite"
  | "gold"
  | "goldenrod"
  | "greenyellow"
  | "grey"
  | "honeydew"
  | "hotpink"
  | "indianred"
  | "indigo"
  | "ivory"
  | "khaki"
  | "lavender"
  | "lavenderblush"
  | "lawngreen"
  | "lemonchiffon"
  | "lightblue"
  | "lightcoral"
  | "lightcyan"
  | "lightgoldenrodyellow"
  | "lightgray"
  | "lightgreen"
  | "lightgrey"
  | "lightpink"
  | "lightsalmon"
  | "lightseagreen"
  | "lightskyblue"
  | "lightslategray"
  | "lightslategrey"
  | "lightsteelblue"
  | "lightyellow"
  | "limegreen"
  | "magenta"
  | "mediumaquamarine"
  | "mediumblue"
  | "mediumorchid"
  | "mediumpurple"
  | "mediumseagreen"
  | "mediumslateblue"
  | "mediumspringgreen"
  | "mediumturquoise"
  | "mediumvioletred"
  | "midnightblue"
  | "mintcream"
  | "mistyrose"
  | "moccasin"
  | "navajowhite"
  | "navy"
  | "oldlace"
  | "olivedrab"
  | "orange"
  | "orangered"
  | "orchid"
  | "palegoldenrod"
  | "palegreen"
  | "paleturquoise"
  | "palevioletred"
  | "papayawhip"
  | "peachpuff"
  | "peru"
  | "pink"
  | "plum"
  | "powderblue"
  | "rebeccapurple"
  | "rosybrown"
  | "royalblue"
  | "saddlebrown"
  | "salmon"
  | "sandybrown"
  | "seagreen"
  | "seashell"
  | "sienna"
  | "silver"
  | "skyblue"
  | "slateblue"
  | "slategray"
  | "slategrey"
  | "snow"
  | "springgreen"
  | "steelblue"
  | "tan"
  | "thistle"
  | "tomato"
  | "turquoise"
  | "violet"
  | "wheat"
  | "whitesmoke"
  | "yellowgreen";

export class Utils {
  private static _colorMap = skia.SkiaUtils.colorMap();
  public static string2RGBA(color: string): {
    value: number;
    type: "RGBA" | "RGB" | "SHADER" | "HEX" | VAL;
  } {
    const value = String(color).toUpperCase();
    const result: {
      value: number | null;
      type: "RGBA" | "RGB" | "SHADER" | "HEX";
    } = { value: null, type: "RGBA" };

    if (Object.keys(Utils._colorMap).includes(value.toLowerCase())) {
      return {
        value: Utils._colorMap[value.toLowerCase()],
        type: "RGBA"
      };
    }

    if (value.startsWith("RGBA")) {
      result.type = "RGBA";
      const temp = value.match(/\d+/g);
      if (!temp || temp!.length < 4) {
        throw new Error("Invalid color format");
      }
      const middleValue = temp!.map(Number);
      if (temp!.length > 4) {
        middleValue[3] = Math.round(parseFloat(`0.${middleValue[4]}`) * 255);
        middleValue.pop();
      } else {
        middleValue[3] = middleValue[3] * 255;
      }

      result.value = skia.SkiaUtils.RGBA(...middleValue);
    } else if (value.startsWith("RGB")) {
      result.type = "RGB";
      const temp = value.match(/\d+/g);
      if (!temp || temp!.length < 3) {
        throw new Error("Invalid color format");
      }
      temp.push("255");
      result.value = skia.SkiaUtils.RGBA(...temp!.map(Number));
    }

    if (value.startsWith("#SHADER")) {
      result.type = "SHADER";
      result.value = parseInt(value.replace("#SHADER", ""));
    } else if (value.startsWith("#")) {
      result.type = "HEX";
      const temp = value.slice(1);
      let middleValue;
      if (temp.length === 3) {
        middleValue = temp.split("").map((v) => v.repeat(2));
      } else {
        try {
          middleValue = temp.match(/.{1,2}/g)!;
        } catch {
          throw new Error("Invalid color format");
        }
      }

      if (middleValue.length === 3) {
        result.value = skia.SkiaUtils.RGBA(
          ...[...middleValue!.map((item) => parseInt(item, 16)), 255]
        );
      } else {
        throw new Error("Invalid color format");
      }
    }

    if (result.value == null && result.type == "RGBA") {
      throw new Error(
        "Invalid color format, color names are currently not supported"
      );
    }

    return result as { value: number; type: "RGBA" | "RGB" | "SHADER" | "HEX" };
  }

  public static string2Font(font: string): any {
    return font
      .split(" ")
      .reverse()
      .map((value) => {
        if (value.endsWith("px")) {
          return +value.replace("px", "");
        }
        return value;
      }); // TODO: The string conversion requires optimization of the needed font.
  }
}

export default Utils;
