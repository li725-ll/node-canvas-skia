import skia from "./binding";
import CanvasContext from "./context";

export class Canvas {
  width: number;
  height: number;
  skiaCanvas: any;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.skiaCanvas = new skia.SkiaCanvas(width, height);
  }

  public getContext(
    contextType: "2d",
    contextAttributes: { antialias: boolean; depth: boolean }
  ): CanvasContext {
    const ctx = this.skiaCanvas.getContext(contextType, contextAttributes);
    return new CanvasContext(ctx);
  }

  public toDataURL() {
    return "data:image/png;base64,";
  }

  public toBuffer() {
    return Buffer.from("data:image/png;base64,");
  }

  public save() {}

  public restore() {}

  public SaveAsImage(path: string) {
    this.skiaCanvas.saveAsImage(path);
  }
}

export default Canvas;
