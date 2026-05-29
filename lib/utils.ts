import skia from "./binding";
import { TypeColorVAL } from "./colors";

export class Utils {
  private static _colorMap = skia.SkiaUtils.colorMap();
  public static string2RGBA(color: string | TypeColorVAL): {
    value: number;
    alpha: number;
  } {
    const raw = String(color);
    const lower = raw.toLowerCase();

    if (lower in Utils._colorMap) {
      return { value: Utils._colorMap[lower], alpha: 1 };
    }

    const upper = raw.toUpperCase();

    if (upper.startsWith("RGBA")) {
      const temp = upper.replaceAll(/(?<!\d)\./g, "0.").match(/\d+/g);
      if (!temp || temp.length < 4) {
        throw new Error("Invalid color format");
      }
      const middleValue = temp.map(Number);
      if (temp.length > 4 && +temp[3] < 1) {
        middleValue[3] = Math.round(parseFloat(`0.${middleValue[4]}`) * 255);
        middleValue.pop();
      } else {
        middleValue[3] = middleValue[3] * 255;
      }
      const alpha = middleValue[3] / 255;
      return { value: skia.SkiaUtils.RGBA(...middleValue), alpha };
    } else if (upper.startsWith("RGB")) {
      const temp = upper.match(/\d+/g);
      if (!temp || temp.length < 3) {
        throw new Error("Invalid color format");
      }
      temp.push("255");
      return { value: skia.SkiaUtils.RGBA(...temp.map(Number)), alpha: 1 };
    } else if (upper.startsWith("#")) {
      const hex = upper.slice(1);
      let middleValue;
      if (hex.length === 3) {
        middleValue = hex.split("").map((v) => v.repeat(2));
      } else {
        try {
          middleValue = hex.match(/.{1,2}/g)!;
        } catch {
          throw new Error("Invalid color format");
        }
      }

      if (middleValue.length === 3) {
        return {
          value: skia.SkiaUtils.RGBA(
            ...[...middleValue.map((item) => parseInt(item, 16)), 255]
          ),
          alpha: 1
        };
      } else {
        throw new Error("Invalid color format");
      }
    }

    throw new Error(
      "Invalid color format, color names are currently not supported"
    );
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

  public static string2LetterSpacing(letterSpacing: string): number {
    return +letterSpacing.replace("px", "");
  }

  public static deg2rad(angle: number) {
    return angle * (Math.PI / 180);
  }

  public static rad2deg(angle: number) {
    return angle * (180 / Math.PI);
  }
}

export default Utils;
