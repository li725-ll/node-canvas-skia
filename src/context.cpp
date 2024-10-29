#include "context.h"

SkPath path;
SkPaint paint;
SkCanvas *canvas = nullptr;

Napi::Object CanvasContext::CanvasContext2Object(const Napi::CallbackInfo &info, SkCanvas *sk_canvas)
{
  Napi::Env env = info.Env();
  Napi::Object obj = Napi::Object::New(env);
  canvas = sk_canvas;

  obj.Set(Napi::String::New(env, "beginPath"), Napi::Function::New(env, CanvasContext::BeginPath));
  obj.Set(Napi::String::New(env, "moveTo"), Napi::Function::New(env, CanvasContext::MoveTo));
  obj.Set(Napi::String::New(env, "lineTo"), Napi::Function::New(env, CanvasContext::LineTo));
  obj.Set(Napi::String::New(env, "closePath"), Napi::Function::New(env, CanvasContext::ClosePath));
  obj.Set(Napi::String::New(env, "stroke"), Napi::Function::New(env, CanvasContext::Stroke));
  obj.Set(Napi::String::New(env, "clear"), Napi::Function::New(env, CanvasContext::Clear));

  return obj;
}

CanvasContext::CanvasContext(){}

void CanvasContext::BeginPath(const Napi::CallbackInfo &info)
{
  path = path.reset();
}

void CanvasContext::MoveTo(const Napi::CallbackInfo &info)
{
  SkScalar x = info[0].As<Napi::Number>().FloatValue();
  SkScalar y = info[1].As<Napi::Number>().FloatValue();
  path.moveTo(x, y);
}

void CanvasContext::LineTo(const Napi::CallbackInfo &info)
{
  SkScalar x = info[0].As<Napi::Number>().FloatValue();
  SkScalar y = info[1].As<Napi::Number>().FloatValue();
  path.lineTo(x, y);
}

void CanvasContext::ClosePath(const Napi::CallbackInfo &info)
{
  path.close();
}

void CanvasContext::Stroke(const Napi::CallbackInfo &info)
{
  canvas->drawPath(path, paint);
  path = path.reset();
}

void CanvasContext::Clear(const Napi::CallbackInfo &info)
{
  SkColor color = info[0].As<Napi::Number>().Uint32Value();
  canvas->clear(color); // SK_ColorBLUE
}
