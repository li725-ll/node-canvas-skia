#pragma once
#ifndef __CONTEXT_H__
#define __CONTEXT_H__

#include <napi.h>
#include <include/core/SkPath.h>
#include <include/core/SkPaint.h>
#include <include/core/SkCanvas.h>

class CanvasContext
{
public:
  static Napi::Object CanvasContext2Object(const Napi::CallbackInfo &info, SkCanvas *canvas);

  static void BeginPath(Napi::CallbackInfo &info);
  static void MoveTo(Napi::CallbackInfo &info);
  static void LineTo(Napi::CallbackInfo &info);
  static void ClosePath(Napi::CallbackInfo &info);
  static void Stroke(Napi::CallbackInfo &info);
  static void Clear(Napi::CallbackInfo &info);

  CanvasContext();
};

#endif
