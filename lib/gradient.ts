import Utils from "./utils";
import skia from "./binding";

export class Gradient {
  public type: "radial" | "linear" | "conic";
  public gradient: any;
  private x0: number;
  private y0: number;
  private r0: number;
  private x1: number;
  private y1: number;
  private r1: number;

  static createRadialGradient(
    x0: number,
    y0: number,
    r0: number,
    x1: number,
    y1: number,
    r1: number
  ) {
    return new Gradient("radial", x0, y0, r0, x1, y1, r1);
  }

  static createLinearGradient(x0: number, y0: number, x1: number, y1: number) {
    return new Gradient("linear", x0, y0, 0, x1, y1, 0);
  }

  static createConicGradient(startAngle: number, x: number, y: number) {
    return new Gradient("conic", startAngle, x, y, 0, 0, 0);
  }

  private constructor(
    type: "radial" | "linear" | "conic",
    x0: number,
    y0: number,
    r0: number,
    x1: number,
    y1: number,
    r1: number
  ) {
    this.type = type;
    this.x0 = x0;
    this.y0 = y0;
    this.r0 = r0;
    this.x1 = x1;
    this.y1 = y1;
    this.r1 = r1;

    this.gradient = new skia.SkiaGradient();

    if (type === "radial") {
      this.gradient.createRadialGradient(x0, y0, r0, x1, y1, r1);
    } else if (type === "linear") {
      this.gradient.createLinearGradient(x0, y0, x1, y1);
    } else if (type === "conic") {
      this.gradient.createConicGradient(x0, y0, r0);
    }
  }

  public addColorStop(offset: number, color: string): void {
    const rgba = Utils.string2RGBA(color);
    this.gradient.addColorStop(offset, rgba.value);
  }
}

export default Gradient;
