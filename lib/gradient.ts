import Utils from "./utils";

export class Gradient {
  private type: "radial" | "linear";
  private x0: number;
  private y0: number;
  private r0: number;
  private x1: number;
  private y1: number;
  private r1: number;
  private gradient: any;
  public id: number;

  static createRadialGradient(
    x0: number,
    y0: number,
    r0: number,
    x1: number,
    y1: number,
    r1: number,
    context: any
  ) {
    return new Gradient("radial", x0, y0, r0, x1, y1, r1, context);
  }

  static createLinearGradient(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    context: any
  ) {
    return new Gradient("linear", x0, y0, 0, x1, y1, 0, context);
  }

  private constructor(
    type: "radial" | "linear",
    x0: number,
    y0: number,
    r0: number,
    x1: number,
    y1: number,
    r1: number,
    context: any
  ) {
    this.type = type;
    this.x0 = x0;
    this.y0 = y0;
    this.r0 = r0;
    this.x1 = x1;
    this.y1 = y1;
    this.r1 = r1;
    if (type === "radial") {
      this.gradient = context.createRadialGradient(x0, y0, r0, x1, y1, r1);
    } else if (type === "linear") {
      this.gradient = context.createLinearGradient(x0, y0, x1, y1);
    }

    this.id = this.gradient.getId();
  }

  addColorStop(offset: number, color: string): void {
    const rgba = Utils.string2RGBA(color);
    this.gradient.addColorStop(offset, rgba.value);
  }
}

export default Gradient;
