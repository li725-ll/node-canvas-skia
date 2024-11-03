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
    this.context = ctx;
  }
  public createLinearGradient(x0: number, y0: number, x1: number, y1: number) {
    return { x0, y0, x1, y1 };
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
  ) {
    return { x0, y0, r0, x1, y1, r1 };
  }
  public addColorStop(stop: number, color: string) {
    // 介于 0.0 与 1.0 之间的值，表示渐变中开始与结束之间的位置。
    return { stop, color };
  }

  public rect(x: number, y: number, width: number, height: number) {
    return { x, y, width, height };
  }
  public fillRect(x: number, y: number, width: number, height: number) {
    return { x, y, width, height };
  }
  public clearRect(x: number, y: number, width: number, height: number) {
    return { x, y, width, height };
  }

  public fill() {}
  public stroke() {}

  public beginPath() {}
  public moveTo(x: number, y: number) {
    return { x, y };
  }
  public closePath() {}
  public lineTo(x: number, y: number) {
    return { x, y };
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
    return { x, y, r, sAngle, eAngle, counterclockwise };
  }

  public arcTo(x1: number, y1: number, x2: number, y2: number, r: number) {
    return { x1, y1, x2, y2, r };
  }

  public isPointInPath(x: number, y: number) {
    return { x, y };
  }
  public scale(scalewidth: number, scaleheight: number) {
    return { scalewidth, scaleheight };
  }
  public rotate(angle: number) {
    return { angle };
  }
  public translate(x: number, y: number) {
    return { x, y };
  }
  public transform(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ) {
    return { a, b, c, d, e, f };
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

  fillText(text: string, x: number, y: number, maxWidth: number) {
    return { text, x, y, maxWidth };
  }

  strokeText(text: string, x: number, y: number, maxWidth: number) {
    return { text, x, y, maxWidth };
  }

  measureText(text: string): number {
    console.log({ text });
    return 0;
  }

  drawImage(image: unknown, width: number, height: number) {
    return { image, width, height };
  }
}

export default CanvasContext;
