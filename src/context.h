#ifndef __CONTEXT_H__
#define __CONTEXT_H__

#include <napi.h>
#include <include/core/SkPath.h>
#include <include/core/SkRect.h>
#include <include/core/SkFont.h>
#include <include/core/SkPaint.h>
#include <include/core/SkImage.h>
#include <include/core/SkCanvas.h>
#include <include/core/SkFontMgr.h>
#include <include/core/SkTextBlob.h>
#include <include/core/SkStrokeRec.h>

struct ContextAttributesStruct
{
  bool antialias  = false;
  bool depth  = false;
};

class CanvasContext : public Napi::ObjectWrap<CanvasContext>
{
private:
  SkFont _font;
  SkPath _path;
  SkPaint _paint;
  SkCanvas *_canvas;
  sk_sp<SkFontMgr> _fontMgr;
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
  Napi::Value IsPointInPath(const Napi::CallbackInfo &info);
  Napi::Value ArcTo(const Napi::CallbackInfo &info);
  Napi::Value Scale(const Napi::CallbackInfo &info);
  Napi::Value SetFont(const Napi::CallbackInfo &info);
  Napi::Value StrokeText(const Napi::CallbackInfo &info);
  Napi::Value FillText(const Napi::CallbackInfo &info);
  Napi::Value MeasureText(const Napi::CallbackInfo &info);
  Napi::Value GetFonts(const Napi::CallbackInfo &info);
};

#endif
