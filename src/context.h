#ifndef __CONTEXT_H__
#define __CONTEXT_H__

#include <napi.h>
#include <include/core/SkPath.h>
#include <include/core/SkRect.h>
#include <include/core/SkPaint.h>
#include <include/core/SkCanvas.h>
#include <include/core/SkStrokeRec.h>

struct ContextAttributesStruct
{
  bool antialias  = false;
  bool depth  = false;
};

struct UtilsPoolStruct
{
  SkPath path;
  SkPaint paint;
  SkCanvas *canvas;
};

class CanvasContext : public Napi::ObjectWrap<CanvasContext>
{
private:
  SkPath _path;
  SkPaint _paint;
  SkCanvas *_canvas;
  ContextAttributesStruct _contextAttributes;

public:
  static Napi::Object CanvasContext2Object(Napi::Env env);
  CanvasContext(const Napi::CallbackInfo &info);
  ~CanvasContext() {};

  void SetCanvas(SkCanvas *canvas);
  void SetContextAttributes(bool antialias, bool depth);

  Napi::Value BeginPath(const Napi::CallbackInfo &info);
  Napi::Value MoveTo(const Napi::CallbackInfo &info);
  Napi::Value LineTo(const Napi::CallbackInfo &info);
  Napi::Value ClosePath(const Napi::CallbackInfo &info);
  Napi::Value Stroke(const Napi::CallbackInfo &info);
  Napi::Value Clear(const Napi::CallbackInfo &info);
  Napi::Value Translate(const Napi::CallbackInfo &info);
  Napi::Value Rotate(const Napi::CallbackInfo &info);
  Napi::Value StrokeStyle(const Napi::CallbackInfo &info);
  Napi::Value LineWidth(const Napi::CallbackInfo &info);
  Napi::Value Arc(const Napi::CallbackInfo &info);
  Napi::Value StrokeRect(const Napi::CallbackInfo &info);
  Napi::Value LineCap(const Napi::CallbackInfo &info);
  Napi::Value SetStrokeJoin(const Napi::CallbackInfo &info);
  Napi::Value Fill(const Napi::CallbackInfo &info);
  Napi::Value Rect(const Napi::CallbackInfo &info);
};

#endif
