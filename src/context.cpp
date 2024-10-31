#include "context.h"

Napi::Object CanvasContext::CanvasContext2Object(Napi::Env env)
{
  Napi::Object obj = Napi::Object::New(env);

  return DefineClass(
    env,
    "SteeringWheel",
    {
      InstanceMethod("beginPath", &CanvasContext::BeginPath, napi_enumerable),
      InstanceMethod("moveTo", &CanvasContext::MoveTo, napi_enumerable),
      InstanceMethod("lineTo", &CanvasContext::LineTo, napi_enumerable),
      InstanceMethod("closePath", &CanvasContext::ClosePath, napi_enumerable),
      InstanceMethod("stroke", &CanvasContext::Stroke, napi_enumerable),
      InstanceMethod("clear", &CanvasContext::Clear, napi_enumerable),
      InstanceMethod("translate", &CanvasContext::Translate, napi_enumerable),
      InstanceMethod("strokeStyle", &CanvasContext::StrokeStyle, napi_enumerable),
      InstanceMethod("lineWidth", &CanvasContext::LineWidth, napi_enumerable),
      InstanceMethod("rotate", &CanvasContext::Rotate, napi_enumerable),
      InstanceMethod("arc", &CanvasContext::Arc, napi_enumerable),
      InstanceMethod("strokeRect", &CanvasContext::StrokeRect, napi_enumerable)
    }).New({});
}

CanvasContext::CanvasContext(const Napi::CallbackInfo &info) : Napi::ObjectWrap<CanvasContext>(info)
{
}

void CanvasContext::SetCanvas(SkCanvas *canvas)
{
  _canvas = canvas;
}

void CanvasContext::SetContextAttributes(bool antialias, bool depth)
{
  _contextAttributes.antialias = antialias;
  _contextAttributes.depth = depth;
  _paint.setAntiAlias(_contextAttributes.antialias);
}

Napi::Value CanvasContext::BeginPath(const Napi::CallbackInfo &info)
{
  _path = _path.reset();
  return Napi::Value();
}

Napi::Value CanvasContext::MoveTo(const Napi::CallbackInfo &info)
{
  SkScalar x = info[0].As<Napi::Number>().FloatValue();
  SkScalar y = info[1].As<Napi::Number>().FloatValue();
  _path.moveTo(x, y);
  return Napi::Value();
}

Napi::Value CanvasContext::LineTo(const Napi::CallbackInfo &info)
{
  SkScalar x = info[0].As<Napi::Number>().FloatValue();
  SkScalar y = info[1].As<Napi::Number>().FloatValue();
  _path.lineTo(x, y);
  return Napi::Value();
}

Napi::Value CanvasContext::ClosePath(const Napi::CallbackInfo &info)
{
  _path.close();
  return Napi::Value();
  return Napi::Value();
}

Napi::Value CanvasContext::Stroke(const Napi::CallbackInfo &info)
{
  _paint.setStyle(SkPaint::kStroke_Style);
  _canvas->drawPath(_path, _paint);
  return Napi::Value();
}

Napi::Value CanvasContext::Clear(const Napi::CallbackInfo &info)
{
  SkColor color = info[0].As<Napi::Number>().Uint32Value();
  _canvas->clear(color);
  return Napi::Value();
}

Napi::Value CanvasContext::Translate(const Napi::CallbackInfo &info)
{
  SkScalar x = info[0].As<Napi::Number>().FloatValue();
  SkScalar y = info[1].As<Napi::Number>().FloatValue();
  _canvas->translate(x, y);
  return Napi::Value();
}

Napi::Value CanvasContext::Rotate(const Napi::CallbackInfo &info)
{
  SkScalar angle = info[0].As<Napi::Number>().FloatValue();
  _canvas->rotate(angle);
  return Napi::Value();
}

Napi::Value CanvasContext::StrokeStyle(const Napi::CallbackInfo &info)
{
  SkColor color = info[0].As<Napi::Number>().Uint32Value();
  _paint.setColor(color);
  return Napi::Value();
};

Napi::Value CanvasContext::LineWidth(const Napi::CallbackInfo &info)
{
  SkScalar width = info[0].As<Napi::Number>().FloatValue();
  _paint.setStrokeWidth(width);
  return Napi::Value();
}

Napi::Value CanvasContext::Arc(const Napi::CallbackInfo &info)
{
  SkScalar x = info[0].As<Napi::Number>().FloatValue();
  SkScalar y = info[1].As<Napi::Number>().FloatValue();
  SkScalar r = info[2].As<Napi::Number>().FloatValue();
  SkScalar startAngle = info[3].As<Napi::Number>().FloatValue();
  SkScalar sweepAngle = info[4].As<Napi::Number>().FloatValue();
  SkRect skRect = SkRect::MakeXYWH(x, y, r, r);
  _path.addArc(skRect, startAngle, sweepAngle);
  return Napi::Value();
}

Napi::Value CanvasContext::StrokeRect(const Napi::CallbackInfo &info)
{
  SkScalar x = info[0].As<Napi::Number>().FloatValue();
  SkScalar y = info[1].As<Napi::Number>().FloatValue();
  SkScalar w = info[2].As<Napi::Number>().FloatValue();
  SkScalar h = info[2].As<Napi::Number>().FloatValue();
  _paint.setStyle(SkPaint::kStroke_Style);
  SkRect rect = SkRect::MakeXYWH(x, y, w, h);
  _canvas->drawRect(rect, _paint);
  return Napi::Value();
}
