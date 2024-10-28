#include <napi.h>

#include "canvas.h"

using namespace Napi;
void draw(SkCanvas *canvas);

static void emit_png(const char *path, sk_sp<SkSurface> surface)
{
  sk_sp<SkImage> image = surface->makeImageSnapshot();
  sk_sp<SkData> data = image->encodeToData(SkEncodedImageFormat::kJPEG, 90);

  FILE *f = fopen(path, "wb");
  fwrite(data->data(), data->size(), 1, f);
  fclose(f);
}

static void draw(SkCanvas *canvas)
{
  const SkScalar scale = 256.0f;
  const SkScalar R = 0.45f * scale;
  const SkScalar TAU = 6.2831853f;
  SkPath path;
  path.moveTo(R, 0.0f);
  for (int i = 1; i < 7; ++i)
  {
    SkScalar theta = 3 * i * TAU / 7;
    path.lineTo(R * cos(theta), R * sin(theta));
  }
  path.close();
  SkPaint p;
  p.setAntiAlias(true);
  canvas->clear(SK_ColorWHITE);
  canvas->translate(0.5f * scale, 0.5f * scale);
  canvas->drawPath(path, p);
}

Napi::String CreateCanvas(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();

  int width = info[0].As<Napi::Number>().Int32Value();
  int height = info[1].As<Napi::Number>().Int32Value();

  sk_sp<SkSurface> surface = SkSurface::MakeRasterN32Premul(width, height);
  SkCanvas* canvas = surface->getCanvas();
  draw(canvas);
  emit_png("./test.jpg", surface);

  return Napi::String::New(env, "world");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "createCanvas"),
              Napi::Function::New(env, CreateCanvas));
  return exports;
}

NODE_API_MODULE(addon, Init)