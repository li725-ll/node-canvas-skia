import skia from "./binding";
import CanvasContext from "./context";

export class Canvas {
  public width: number;
  public height: number;
  private skiaCanvas: any;

  constructor(width: number, height: number, gpu: string | boolean = false) {
    this.width = width;
    this.height = height;
    let GPU: number = 0;
    if (gpu === true) {
      GPU = 1;
    } else if (gpu === false) {
      GPU = 0;
    }
    this.skiaCanvas = new skia.SkiaCanvas(width, height, GPU);
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

  public toBuffer(type: "png" | "jpg" | "webp" = "png", quality: number = 30) {
    return this.skiaCanvas.toBuffer(type, quality);
  }

  public save() {
    return this.skiaCanvas.save();
  }

  public restore() {
    return this.skiaCanvas.restore();
  }

  public saveAsImage(
    path: string,
    type: "png" | "jpg" | "webp" = "png",
    quality: number = 30
  ) {
    this.skiaCanvas.saveAsImage(path, type, quality);
  }
}

export default Canvas;
