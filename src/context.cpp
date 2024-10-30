#include "context.h"

SkPath path;
SkPaint paint;
SkCanvas *canvas = nullptr;

Napi::Object CanvasContext::CanvasContext2Object(
  const Napi::CallbackInfo &info,
  SkCanvas *skCanvas,
  ContextAttributesStruct *contextAttributes)
{
  Napi::Env env = info.Env();
  Napi::Object obj = Napi::Object::New(env);
  canvas = skCanvas;

  paint.setAntiAlias(contextAttributes->antialias);

  obj.Set(Napi::String::New(env, "beginPath"), Napi::Function::New(env, CanvasContext::BeginPath));
  obj.Set(Napi::String::New(env, "moveTo"), Napi::Function::New(env, CanvasContext::MoveTo));
  obj.Set(Napi::String::New(env, "lineTo"), Napi::Function::New(env, CanvasContext::LineTo));
  obj.Set(Napi::String::New(env, "closePath"), Napi::Function::New(env, CanvasContext::ClosePath));
  obj.Set(Napi::String::New(env, "stroke"), Napi::Function::New(env, CanvasContext::Stroke));
  obj.Set(Napi::String::New(env, "clear"), Napi::Function::New(env, CanvasContext::Clear));
  obj.Set(Napi::String::New(env, "translate"), Napi::Function::New(env, CanvasContext::Translate));
  obj.Set(Napi::String::New(env, "strokeStyle"), Napi::Function::New(env, CanvasContext::StrokeStyle));
  obj.Set(Napi::String::New(env, "lineWidth"), Napi::Function::New(env, CanvasContext::LineWidth));
  obj.Set(Napi::String::New(env, "rotate"), Napi::Function::New(env, CanvasContext::Rotate));
  obj.Set(Napi::String::New(env, "arc"), Napi::Function::New(env, CanvasContext::Arc));

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
  paint.setStyle(SkPaint::kStroke_Style);
  canvas->drawPath(path, paint);
}

void CanvasContext::Clear(const Napi::CallbackInfo &info)
{
  SkColor color = info[0].As<Napi::Number>().Uint32Value();
  canvas->clear(color);
}

void CanvasContext::Translate(const Napi::CallbackInfo &info)
{
  SkScalar x = info[0].As<Napi::Number>().FloatValue();
  SkScalar y = info[1].As<Napi::Number>().FloatValue();
  canvas->translate(x, y);
}

void CanvasContext::Rotate(const Napi::CallbackInfo &info)
{
  SkScalar angle = info[0].As<Napi::Number>().FloatValue();
  canvas->rotate(angle);
}

void CanvasContext::StrokeStyle(const Napi::CallbackInfo &info)
{
  info[0].As<Napi::Number>().Uint32Value();
  paint.setColor(SK_ColorRED);
};

void CanvasContext::LineWidth(const Napi::CallbackInfo &info)
{
  SkScalar width = info[0].As<Napi::Number>().FloatValue();
  paint.setStrokeWidth(width);
}

void CanvasContext::Arc(const Napi::CallbackInfo &info)
{
  SkScalar x = info[0].As<Napi::Number>().FloatValue();
  SkScalar y = info[1].As<Napi::Number>().FloatValue();
  SkScalar r = info[2].As<Napi::Number>().FloatValue();
  SkScalar startAngle = info[2].As<Napi::Number>().FloatValue();
  SkScalar sweepAngle = info[3].As<Napi::Number>().FloatValue();

  SkRect skRect = SkRect::MakeXYWH(x, y, r, r);
  canvas->drawArc(skRect, startAngle, sweepAngle, true, paint);
}
