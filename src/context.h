#pragma once
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


class CanvasContext
{
public:
  static Napi::Object CanvasContext2Object(
    const Napi::CallbackInfo &info,
    SkCanvas *canvas,
    ContextAttributesStruct *contextAttributes);

  static void BeginPath(const Napi::CallbackInfo &info);
  static void MoveTo(const Napi::CallbackInfo &info);
  static void LineTo(const Napi::CallbackInfo &info);
  static void ClosePath(const Napi::CallbackInfo &info);
  static void Stroke(const Napi::CallbackInfo &info);
  static void Clear(const Napi::CallbackInfo &info);
  static void Translate(const Napi::CallbackInfo &info);
  static void Rotate(const Napi::CallbackInfo &info);
  static void StrokeStyle(const Napi::CallbackInfo &info);
  static void LineWidth(const Napi::CallbackInfo &info);
  static void Arc(const Napi::CallbackInfo &info);
  static void StrokeRect(const Napi::CallbackInfo &info);

  CanvasContext();
  ~CanvasContext();
};

#endif
