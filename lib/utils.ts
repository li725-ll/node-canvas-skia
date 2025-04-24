import skia from "./binding";
import { TypeColorVAL } from "./colors";

export class Utils {
  private static _colorMap = skia.SkiaUtils.colorMap();
  public static string2RGBA(color: string | TypeColorVAL): {
    value: number;
    alpha: number;
    type: "COLOR" | "SHADER";
  } {
    const value = String(color).toUpperCase();
    const result: {
      value: number | null;
      alpha: number;
      type: "COLOR" | "SHADER";
    } = { value: null, alpha: 1, type: "COLOR" };

    if (Object.keys(Utils._colorMap).includes(value.toLowerCase())) {
      return {
        value: Utils._colorMap[value.toLowerCase()],
        alpha: 1,
        type: "COLOR"
      };
    }

    if (value.startsWith("RGBA")) {
      result.type = "COLOR";
      const temp = value.replaceAll(/(?<!\d)\./g, "0.").match(/\d+/g);
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
      result.alpha = middleValue[3] / 255;
      result.value = skia.SkiaUtils.RGBA(...middleValue);
    } else if (value.startsWith("RGB")) {
      result.type = "COLOR";
      const temp = value.match(/\d+/g);
      if (!temp || temp!.length < 3) {
        throw new Error("Invalid color format");
      }
      temp.push("255");
      result.alpha = 1;
      result.value = skia.SkiaUtils.RGBA(...temp!.map(Number));
    }

    if (value.startsWith("#SHADER")) {
      result.type = "SHADER";
      result.value = parseInt(value.replace("#SHADER", ""));
    } else if (value.startsWith("#")) {
      result.type = "COLOR";
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

    if (result.value == null && result.type == "COLOR") {
      throw new Error(
        "Invalid color format, color names are currently not supported"
      );
    }

    return result as { value: number; alpha: number; type: "COLOR" | "SHADER" };
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
