import Utils from "./utils";

export class CanvasContext {
  private context: any;
  public fillStyle: string = "#000000"; // color|gradient|pattern
  public strokeStyle: string = "#000000"; // color|gradient|pattern
  public shadowColor: string = "#000000"; // color
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

  constructor(ctx: any) {
    const initColor = Utils.string2RGBA("rgba(255,255,255,1)");
    this.context = ctx;
    this.context.clear(initColor.value);
  }
  public createLinearGradient(
    x0: number,
    y0: number,
    x1: number,
    y1: number
  ): string {
    return this.context.createLinearGradient(x0, y0, x1, y1);
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
  ): string {
    return this.context.createRadialGradient(x0, y0, r0, x1, y1, r1);
  }
  public addColorStop(stop: number, color: string) {
    // 介于 0.0 与 1.0 之间的值，表示渐变中开始与结束之间的位置。
    return { stop, color };
  }

  public rect(x: number, y: number, width: number, height: number) {
    this.context.rect(x, y, width, height);
  }
  public fillRect(x: number, y: number, width: number, height: number) {
    return { x, y, width, height };
  }
  public clearRect(x: number, y: number, width: number, height: number) {
    return { x, y, width, height };
  }

  public fill() {
    const color = Utils.string2RGBA(this.fillStyle);
    console.log("dd", color);
    switch (color.type) {
      case "RGBA":
        this.context.fillStyle(color.value);
        break;
      case "RGB":
        this.context.set(color.value);
        break;
      case "SHADER":
        this.context.setShader(color.value);
        break;
    }

    this.context.fill();
  }
  public stroke() {
    const color = Utils.string2RGBA(this.strokeStyle);
    switch (color.type) {
      case "RGBA":
        this.context.strokeStyle(color.value);
        break;
      case "RGB":
        this.context.set(color.value);
        break;
      case "SHADER":
        this.context.setShader(color.value);
        break;
    }

    this.context.lineCap(this.lineCap);
    this.context.lineJoin(this.lineJoin);
    this.context.lineWidth(this.lineWidth);
    this.context.stroke();
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
  public clip() {}
  public quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
    return { cpx, cpy, x, y };
  }
  public bezierCurveTo(
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x: number,
    y: number
  ) {
    return { cp1x, cp1y, cp2x, cp2y, x, y };
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
    return { a, b, c, d, e, f };
  }

  public fillText(text: string, x: number, y: number, maxWidth: number) {
    const font = Utils.string2Font(this.font);
    this.context.setFont(...font);
    this.context.fillText(text, x, y, maxWidth);
  }

  public strokeText(text: string, x: number, y: number, maxWidth: number) {
    const font = Utils.string2Font(this.font);
    this.context.setFont(...font);
    this.context.strokeText(text, x, y, maxWidth);
  }

  public measureText(text: string) {
    const font = Utils.string2Font(this.font);
    this.context.setFont(...font);
    this.context.measureText(text);
  }

  public strokeRect(x: number, y: number, width: number, height: number) {
    this.context.strokeRect(x, y, width, height);
  }

  public drawImage(image: unknown, width: number, height: number) {
    return { image, width, height };
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
}

export default CanvasContext;
