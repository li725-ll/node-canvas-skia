import skia from "./binding";

export class Utils {
  public static string2RGBA(color: string): number {
    const value = color.toUpperCase();
    let result;
    if (value.startsWith("RGBA")) {
      const temp = value.match(/\d+/g);
      if (!temp || temp!.length < 4) {
        throw new Error("Invalid color format");
      }
      result = skia.SkiaUtils.RGBA(...temp!.map(Number));
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
