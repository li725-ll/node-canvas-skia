import Utils from "./utils";
import Gradient from "./gradient";
import Canvas from "./canvas";
import { TypeColorVAL } from "./colors";

export class CanvasContext {
  private context: any;
  public canvas: Canvas;
  public fillStyle: string | Gradient | TypeColorVAL = "#000000"; // color|gradient|pattern
  public strokeStyle: string | Gradient | TypeColorVAL = "#000000"; // color|gradient|pattern
  public shadowColor: string | TypeColorVAL = "#000000"; // color
  public lineJoin: "bevel" | "round" | "miter" = "miter"; // bevel斜角round圆角miter尖角
  public shadowBlur: number = 0;
  public shadowOffsetX: number = 0;
  public shadowOffsetY: number = 0;
  public lineCap: "butt" | "round" | "square" = "butt";
  public lineWidth: number = 1;
  public miterLimit: number = 10;
  public globalAlpha: number = 1.0;
  public font: string = "10px sans-serif";
  public textAlign: "start" | "end" | "left" | "right" | "center" = "start";
  public textBaseline:
    | "top"
    | "hanging"
    | "middle"
    | "alphabetic"
    | "ideographic"
    | "bottom" = "alphabetic";
  public globalCompositeOperation:
    | "source-over"
    | "source-atop"
    | "source-in"
    | "source-out"
    | "destination-over"
    | "destination-atop"
    | "destination-in"
    | "destination-out"
    | "lighter"
    | "copy"
    | "xor" = "source-over";

  constructor(ctx: any, canvas: Canvas) {
    this.canvas = canvas;
    const initColor = Utils.string2RGBA("rgba(0,0,0,0)");
    this.context = ctx;
    this.context.clear(initColor.value);
  }

  public clear(color: string) {
    this.context.clear(color);
  }
  public createLinearGradient(
    x0: number,
    y0: number,
    x1: number,
    y1: number
  ): Gradient {
    return Gradient.createLinearGradient(x0, y0, x1, y1, this.context);
  }
  public createPattern(
    image: unknown,
    direction: "repeat" | "repeat-x" | "repeat-y" | "no-repeat" = "repeat"
  ) {
    return { image, direction };
  }
  public createRadialGradient(
    x0: number,
    y0: number,
    r0: number,
    x1: number,
    y1: number,
    r1: number
  ): Gradient {
    return Gradient.createRadialGradient(x0, y0, r0, x1, y1, r1, this.context);
  }

  public createConicGradient(startAngle: number, x: number, y: number) {
    return Gradient.createConicGradient(startAngle, x, y, this.context);
  }

  public rect(x: number, y: number, width: number, height: number) {
    this.context.rect(x, y, width, height);
  }
  public fillRect(x: number, y: number, width: number, height: number) {
    this.handleFillColor();
    this.context.fillRect(x, y, width, height);
  }
  public clearRect(x: number, y: number, width: number, height: number) {
    this.context.clearRect(x, y, width, height);
  }

  public fill() {
    this.handleFillColor();
    this.context.fill();
  }

  public setLineDash(segments: number[]) {
    this.context.setLineDash(segments);
  }

  public stroke() {
    this.handleStrokeColor();
    this.context.lineCap(this.lineCap);
    this.context.lineJoin(this.lineJoin);
    this.context.lineWidth(this.lineWidth);
    this.context.stroke();
  }

  public save() {
    this.canvas.save();
  }

  public restore() {
    this.strokeStyle = "#000000";
    this.fillStyle = "#000000";
    this.shadowColor = "#000000";
    this.globalAlpha = 1.0;
    this.canvas.restore();
  }

  public beginPath() {
    this.context.beginPath();
  }
  public moveTo(x: number, y: number) {
    this.context.moveTo(x, y);
  }
  public closePath() {
    this.context.closePath();
  }
  public lineTo(x: number, y: number) {
    this.context.lineTo(x, y);
  }

  public clip() {
    this.context.clip();
  }

  public quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
    this.context.quadraticCurveTo(cpx, cpy, x, y);
  }

  public bezierCurveTo(
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x: number,
    y: number
  ) {
    this.context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  }
  public arc(
    x: number,
    y: number,
    r: number,
    sAngle: number,
    eAngle: number,
    counterclockwise: boolean = true
  ) {
    this.context.arc(x, y, r, sAngle, eAngle, counterclockwise);
  }

  public arcTo(x1: number, y1: number, x2: number, y2: number, r: number) {
    this.context.arcTo(x1, y1, x2, y2, r);
  }

  public isPointInPath(x: number, y: number) {
    this.context.isPointInPath(x, y);
  }
  public roundRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radii: number | number[]
  ) {
    if (typeof radii === "number") {
      radii = Array.from({ length: 8 }, () => radii) as number[];
    } else {
      if (radii.length === 1) {
        radii = Array.from({ length: 8 }, () => (radii as number[])[0]);
      } else if (radii.length === 2) {
        radii = [
          radii[0],
          radii[0],
          radii[1],
          radii[1],
          radii[0],
          radii[0],
          radii[1],
          radii[1]
        ];
      } else if (radii.length === 3) {
        radii = [
          radii[0],
          radii[0],
          radii[1],
          radii[1],
          radii[2],
          radii[2],
          radii[1],
          radii[1]
        ];
      } else if (radii.length === 4) {
        radii = [
          radii[0],
          radii[0],
          radii[1],
          radii[1],
          radii[2],
          radii[2],
          radii[3],
          radii[3]
        ];
      } else {
        throw new Error("Invalid radii length");
      }
    }

    return this.context.roundRect(x, y, width, height, radii);
  }
  public scale(scalewidth: number, scaleheight: number) {
    this.context.scale(scalewidth, scaleheight);
  }
  public rotate(angle: number) {
    this.context.rotate(angle);
  }
  public translate(x: number, y: number) {
    this.context.translate(x, y);
  }
  public transform(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ) {
    this.context.transform(a, b, c, d, e, f);
  }
  public setTransform(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ) {
    this.context.setTransform(a, b, c, d, e, f);
  }

  public fillText(text: string, x: number, y: number, maxWidth?: number) {
    this.handleFillColor();
    const font = Utils.string2Font(this.font);
    this.context.setFont(...font);
    this.context.setTextAlign(this.textAlign);
    this.context.setTextBaseline(this.textBaseline);
    this.context.fillText(text, x, y, maxWidth);
  }

  public strokeText(text: string, x: number, y: number, maxWidth?: number) {
    this.handleStrokeColor();
    const font = Utils.string2Font(this.font);
    this.context.lineWidth(this.lineWidth);
    this.context.setFont(...font);
    this.context.setTextAlign(this.textAlign);
    this.context.setTextBaseline(this.textBaseline);
    this.context.strokeText(text, x, y, maxWidth);
  }
  public measureText(text: string): { width: number } {
    const font = Utils.string2Font(this.font);
    this.context.setFont(...font);
    return this.context.measureText(text);
  }

  public strokeRect(x: number, y: number, width: number, height: number) {
    this.handleStrokeColor();
    this.context.lineWidth(this.lineWidth);
    this.context.strokeRect(x, y, width, height);
  }

  public drawImage(image: string, dx: number, dy: number): void;
  public drawImage(
    image: string,
    dx: number,
    dy: number,
    dWidth: number,
    dHeight: number
  ): void;
  public drawImage(
    image: Buffer,
    dx: number,
    dy: number,
    dWidth: number,
    dHeight: number
  ): void;
  public drawImage(
    image: string,
    sx: number,
    sy: number,
    sWidth: number,
    sHeight: number,
    dx: number,
    dy: number,
    dWidth: number,
    dHeight: number
  ): void;
  public drawImage(
    image: string | Buffer,
    x: number,
    y: number,
    ...arg: any
  ): void {
    this.context.setGlobalAlpha(this.globalAlpha);
    if (arg.length === 0) {
      this.context.drawImage(image, x, y);
    } else if (arg.length === 2) {
      if (image instanceof Buffer) {
        this.context.DrawImageBuffer(image, x, y, arg[0], arg[1]);
      } else {
        this.context.drawImageWH(image, x, y, arg[0], arg[1]);
      }
    } else if (arg.length === 6) {
      throw new Error("Not implemented yet");
      // this.context.drawImage(
      //   image,
      //   x,
      //   y,
      //   arg[0],
      //   arg[1],
      //   arg[2],
      //   arg[3],
      //   arg[4],
      //   arg[5]
      // );
    }
  }

  public getFonts(): {
    family: string;
    weight: string;
    style: "Plain" | "Heavy" | "Regular" | "Bold Italic" | "Bold"; // TODO: add more
  }[] {
    return this.context.getFonts();
  }

  public loadFont(fontPath: string, fontName: string) {
    return this.context.loadFont(fontPath, fontName);
  }

  private handleStrokeColor() {
    const value =
      this.strokeStyle instanceof Gradient
        ? this.strokeStyle.id
        : this.strokeStyle;
    const color = Utils.string2RGBA(value);
    switch (color.type) {
      case "COLOR":
        this.context.strokeStyle(color.value);
        break;
      case "SHADER":
        this.context.setShader(color.value);
        break;
    }
    this.context.setGlobalAlpha(this.globalAlpha);
  }

  private handleFillColor() {
    const value =
      this.fillStyle instanceof Gradient ? this.fillStyle.id : this.fillStyle;
    const color = Utils.string2RGBA(value);
    switch (color.type) {
      case "COLOR": {
        this.context.fillStyle(color.value);
        this.context.setGlobalAlpha(this.globalAlpha * color.alpha);
        break;
      }
      case "SHADER": {
        this.context.setShader(color.value);
        this.context.setGlobalAlpha(this.globalAlpha);
        break;
      }
    }
  }
}

export default CanvasContext;
