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
  public lineJoin: "bevel" | "round" | "miter" = "miter"; // bevel斜角 round圆角 miter尖角
  public shadowBlur: number = 0;
  public shadowOffsetX: number = 0;
  public shadowOffsetY: number = 0;
  public letterSpacing: string = "0px";
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

  private _cachedFillStyle: string | Gradient | TypeColorVAL = "";
  private _cachedFillColor: { value: number; alpha: number } | null = null;
  private _cachedStrokeStyle: string | Gradient | TypeColorVAL = "";
  private _cachedStrokeColor: { value: number; alpha: number } | null = null;
  private _cachedFontString: string = "";
  private _cachedFontParsed: any[] | null = null;
  private _lastSentAlpha: number = -1;
  private _lastSentFont: string = "";
  private _lastSentTextAlign: string = "";
  private _lastSentTextBaseline: string = "";
  private _lastSentLetterSpacing: number = -1;
  private _lastSentLineCap: string = "";
  private _lastSentLineJoin: string = "";
  private _lastSentLineWidth: number = -1;

  constructor(ctx: any, canvas: Canvas) {
    this.canvas = canvas;
    const initColor = Utils.string2RGBA("rgba(0,0,0,0)");
    this.context = ctx;
    this.context.clear(initColor.value);
  }

  public clear(color: string = "rgba(0,0,0,0)") {
    const temp = Utils.string2RGBA(color);
    this.context.clear(temp.value);
  }
  public createLinearGradient(
    x0: number,
    y0: number,
    x1: number,
    y1: number
  ): Gradient {
    return Gradient.createLinearGradient(x0, y0, x1, y1);
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
    return Gradient.createRadialGradient(x0, y0, r0, x1, y1, r1);
  }

  public createConicGradient(startAngle: number, x: number, y: number) {
    return Gradient.createConicGradient(Utils.rad2deg(startAngle), x, y);
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
    if (this.lineCap !== this._lastSentLineCap) {
      this.context.lineCap(this.lineCap);
      this._lastSentLineCap = this.lineCap;
    }
    if (this.lineJoin !== this._lastSentLineJoin) {
      this.context.lineJoin(this.lineJoin);
      this._lastSentLineJoin = this.lineJoin;
    }
    if (this.lineWidth !== this._lastSentLineWidth) {
      this.context.lineWidth(this.lineWidth);
      this._lastSentLineWidth = this.lineWidth;
    }
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
    this._lastSentAlpha = -1;
    this._lastSentFont = "";
    this._lastSentTextAlign = "";
    this._lastSentTextBaseline = "";
    this._lastSentLetterSpacing = -1;
    this._lastSentLineCap = "";
    this._lastSentLineJoin = "";
    this._lastSentLineWidth = -1;
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
    counterclockwise: boolean = false
  ) {
    const s = Utils.rad2deg(sAngle);
    const e = Utils.rad2deg(eAngle);
    if (s < 0 && s > 360 && e < 0 && e > 360) {
      throw new Error("Invalid angle");
    }
    this.context.arc(x, y, r, s, e, counterclockwise);
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
    this.context.rotate(Utils.rad2deg(angle));
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
    this.syncFont();
    this.syncTextAttrs();
    this.context.fillText(text, x, y, maxWidth);
  }

  public strokeText(text: string, x: number, y: number, maxWidth?: number) {
    this.handleStrokeColor();
    this.syncFont();
    this.syncTextAttrs();
    if (this.lineWidth !== this._lastSentLineWidth) {
      this.context.lineWidth(this.lineWidth);
      this._lastSentLineWidth = this.lineWidth;
    }
    this.context.strokeText(text, x, y, maxWidth);
  }

  public measureText(text: string): { width: number } {
    this.syncFont();
    return this.context.measureText(text);
  }

  public strokeRect(x: number, y: number, width: number, height: number) {
    this.handleStrokeColor();
    if (this.lineWidth !== this._lastSentLineWidth) {
      this.context.lineWidth(this.lineWidth);
      this._lastSentLineWidth = this.lineWidth;
    }
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
    this.setAlpha(this.globalAlpha);
    if (arg.length === 0) {
      this.context.drawImage(image, x, y);
    } else if (arg.length === 2) {
      if (image instanceof Buffer) {
        this.context.drawImageBuffer(image, x, y, arg[0], arg[1]);
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
    letterSpacing: number;
    style: "Plain" | "Heavy" | "Regular" | "Bold Italic" | "Bold"; // TODO: add more
  }[] {
    return this.context.getFonts();
  }

  public loadFont(fontPath: string, fontName: string) {
    return this.context.loadFont(fontPath, fontName);
  }

  private syncFont() {
    if (this.font !== this._cachedFontString) {
      this._cachedFontParsed = Utils.string2Font(this.font);
      this._cachedFontString = this.font;
      this.context.setFont(...this._cachedFontParsed!);
      this._lastSentFont = this.font;
    } else if (this.font !== this._lastSentFont) {
      this.context.setFont(...this._cachedFontParsed!);
      this._lastSentFont = this.font;
    }
    const letterSpacing = Utils.string2LetterSpacing(this.letterSpacing);
    if (letterSpacing !== this._lastSentLetterSpacing) {
      this.context.setLetterSpacing(letterSpacing);
      this._lastSentLetterSpacing = letterSpacing;
    }
  }

  private syncTextAttrs() {
    if (this.textAlign !== this._lastSentTextAlign) {
      this.context.setTextAlign(this.textAlign);
      this._lastSentTextAlign = this.textAlign;
    }
    if (this.textBaseline !== this._lastSentTextBaseline) {
      this.context.setTextBaseline(this.textBaseline);
      this._lastSentTextBaseline = this.textBaseline;
    }
  }

  private handleStrokeColor() {
    if (this.strokeStyle instanceof Gradient) {
      this.context.setShader(this.strokeStyle.gradient);
      this.setAlpha(this.globalAlpha);
    } else {
      if (this.strokeStyle !== this._cachedStrokeStyle) {
        this._cachedStrokeColor = Utils.string2RGBA(this.strokeStyle);
        this._cachedStrokeStyle = this.strokeStyle;
      }
      const color = this._cachedStrokeColor!;
      this.context.strokeStyle(color.value);
      this.setAlpha(this.globalAlpha);
    }
  }

  private handleFillColor() {
    if (this.fillStyle instanceof Gradient) {
      this.context.setShader(this.fillStyle.gradient);
      this.setAlpha(this.globalAlpha);
    } else {
      if (this.fillStyle !== this._cachedFillStyle) {
        this._cachedFillColor = Utils.string2RGBA(this.fillStyle);
        this._cachedFillStyle = this.fillStyle;
      }
      const color = this._cachedFillColor!;
      this.context.fillStyle(color.value);
      this.setAlpha(this.globalAlpha * color.alpha);
    }
  }

  private setAlpha(alpha: number) {
    if (alpha !== this._lastSentAlpha) {
      this.context.setGlobalAlpha(alpha);
      this._lastSentAlpha = alpha;
    }
  }
}

export default CanvasContext;
