export class Canvas {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public getContext(type: "2d") {
    return type;
  }

  public toDataURL() {
    return "data:image/png;base64,";
  }

  public toBuffer() {
    return Buffer.from("data:image/png;base64,");
  }

  public save() {}
  public restore() {}
}
