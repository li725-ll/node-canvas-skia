import skia from "./binding";
import CanvasContext from "./context";

export class Canvas {
  public width: number;
  public height: number;
  private skiaCanvas: any;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.skiaCanvas = new skia.SkiaCanvas(width, height);
  }

  public getContext(
    contextType: "2d",
    contextAttributes: { antialias: boolean; depth: boolean } = {
      depth: false,
      antialias: false
    }
  ): CanvasContext {
    const ctx = this.skiaCanvas.getContext(contextType, contextAttributes);
    return new CanvasContext(ctx, this);
  }

  public toDataURL() {
    return "data:image/png;base64,";
  }

  public toBuffer(
    type: "bmp" | "gif" | "ico" | "png" | "wbmp" | "webp" = "png",
    quality: number = 30
  ) {
    return this.skiaCanvas.toBuffer(type, quality);
  }

  public save() {}

  public restore() {}

  public saveAsImage(
    path: string,
    type: "bmp" | "gif" | "ico" | "png" | "wbmp" | "webp" = "png",
    quality: number = 30
  ) {
    this.skiaCanvas.saveAsImage(path, type, quality);
  }
}

export default Canvas;
