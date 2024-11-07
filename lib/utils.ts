import skia from "./binding";

export class Utils {
  public static string2RGBA(color: string): {
    value: number;
    type: "RGBA" | "RGB" | "SHADER" | "HEX";
  } {
    const value = String(color).toUpperCase();
    const result: {
      value: number;
      type: "RGBA" | "RGB" | "SHADER" | "HEX";
    } = { value: 0, type: "RGBA" };

    if (value.startsWith("RGBA")) {
      result.type = "RGBA";
      const temp = value.match(/\d+/g);
      if (!temp || temp!.length < 4) {
        throw new Error("Invalid color format");
      }
      result.value = skia.SkiaUtils.RGBA(...temp!.map(Number));
    } else if (value.startsWith("RGB")) {
      result.type = "RGB";
      const temp = value.match(/\d+/g);
      if (!temp || temp!.length < 3) {
        throw new Error("Invalid color format");
      }
      temp.push("1");
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
          ...[...middleValue!.map((item) => parseInt(item, 16)), 1]
        );
      } else {
        throw new Error("Invalid color format");
      }
    }

    if (result.value == 0 && result.type == "RGBA") {
      throw new Error(
        "Invalid color format, currently only supports RGBA, RGB, Gradient formats"
      );
    }

    return result;
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
