#ifndef __CANVAS_H__
#define __CANVAS_H__

#include <napi.h>

#include "include/core/SkData.h"
#include "include/core/SkPath.h"
#include "include/core/SkImage.h"
#include "include/core/SkCanvas.h"
#include "include/core/SkSurface.h"

void emit_image(const char *path, sk_sp<SkSurface> surface);
void draw(SkCanvas *canvas);

class Canvas : public Napi::ObjectWrap<Canvas>
{
public:
  static Napi::Function Init(Napi::Env env);
  Canvas(const Napi::CallbackInfo &info);

private:
  Napi::Value GetContext(const Napi::CallbackInfo &info);
  // Napi::Value PlusOne(const Napi::CallbackInfo &info);
  // Napi::Value Multiply(const Napi::CallbackInfo &info);

  double value_;
};

#endif
