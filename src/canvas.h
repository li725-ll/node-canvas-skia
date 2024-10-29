#pragma once
#ifndef __CANVAS_H__
#define __CANVAS_H__

#include <napi.h>
#include <include/core/SkData.h>
#include <include/core/SkImage.h>
#include <include/core/SkCanvas.h>
#include <include/core/SkSurface.h>

#include "context.h"

void EmitImage(const char *path, sk_sp<SkSurface> surface);
void draw(SkCanvas *canvas);

class Canvas : public Napi::ObjectWrap<Canvas>
{
private:
  sk_sp<SkSurface> _surface;
  Napi::Object _context;

  Napi::Value GetContext(const Napi::CallbackInfo &info);
  Napi::Value SaveAsImage(const Napi::CallbackInfo &info);

public:
  static Napi::Function Init(Napi::Env env);
  Canvas(const Napi::CallbackInfo &info);
};

#endif
