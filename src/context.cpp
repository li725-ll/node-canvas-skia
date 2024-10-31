#include "context.h"
#include <iostream>

Napi::Object CanvasContext::CanvasContext2Object(Napi::Env env)
{
  Napi::Object obj = Napi::Object::New(env);

  return DefineClass(
             env,
             "CanvasContext",
             {InstanceMethod("beginPath", &CanvasContext::BeginPath, napi_enumerable),
              InstanceMethod("moveTo", &CanvasContext::MoveTo, napi_enumerable),
              InstanceMethod("lineTo", &CanvasContext::LineTo, napi_enumerable),
              InstanceMethod("closePath", &CanvasContext::ClosePath, napi_enumerable),
              InstanceMethod("stroke", &CanvasContext::Stroke, napi_enumerable),
              InstanceMethod("clear", &CanvasContext::Clear, napi_enumerable),
              InstanceMethod("translate", &CanvasContext::Translate, napi_enumerable),
              InstanceMethod("strokeStyle", &CanvasContext::StrokeStyle, napi_enumerable),
              InstanceMethod("fillStyle", &CanvasContext::StrokeStyle, napi_enumerable),
              InstanceMethod("lineWidth", &CanvasContext::LineWidth, napi_enumerable),
              InstanceMethod("rotate", &CanvasContext::Rotate, napi_enumerable),
              InstanceMethod("arc", &CanvasContext::Arc, napi_enumerable),
              InstanceMethod("strokeRect", &CanvasContext::StrokeRect, napi_enumerable),
              InstanceMethod("lineCap", &CanvasContext::LineCap, napi_enumerable),
              InstanceMethod("lineJoin", &CanvasContext::SetStrokeJoin, napi_enumerable),
              InstanceMethod("rect", &CanvasContext::Rect, napi_enumerable),
              InstanceMethod("fill", &CanvasContext::Fill, napi_enumerable),
              InstanceMethod("isPointInPath", &CanvasContext::IsPointInPath, napi_enumerable),
              InstanceMethod("scale", &CanvasContext::Scale, napi_enumerable),
              InstanceMethod("arcTo", &CanvasContext::ArcTo, napi_enumerable),
              InstanceMethod("setFont", &CanvasContext::SetFont, napi_enumerable),
              InstanceMethod("strokeText", &CanvasContext::StrokeText, napi_enumerable),
              InstanceMethod("fillText", &CanvasContext::FillText, napi_enumerable),
              InstanceMethod("measureText", &CanvasContext::MeasureText, napi_enumerable)})
      .New({});
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
  SkRect skRect = SkRect::MakeXYWH(x - r, y - r, 2 * r, 2 * r);
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

Napi::Value CanvasContext::LineCap(const Napi::CallbackInfo &info)
{
  if (info.Length() == 0)
  {
    switch (_paint.getStrokeCap())
    {
      case SkPaint::kButt_Cap:
        return Napi::String::New(info.Env(), "butt");
      case SkPaint::kRound_Cap:
        return Napi::String::New(info.Env(), "round");
      case SkPaint::kSquare_Cap:
        return Napi::String::New(info.Env(), "square");
      default:
        return Napi::String::New(info.Env(), "butt");
    }
  }

  std::string cap = info[0].As<Napi::String>().Utf8Value();

  if (cap == "butt")
  {
    _paint.setStrokeCap(SkPaint::kButt_Cap);
    _paint.setStrokeCap((SkPaint::Cap)SkPaint::kCapCount);
  }
  else if (cap == "round")
  {
    _paint.setStrokeCap(SkPaint::kRound_Cap);
    _paint.setStrokeCap((SkPaint::Cap)SkPaint::kCapCount);
  }
  else if(cap == "square")
  {
    _paint.setStrokeCap(SkPaint::kSquare_Cap);
    _paint.setStrokeCap((SkPaint::Cap)SkPaint::kCapCount);
  }

  return Napi::Value();
}

Napi::Value CanvasContext::Fill(const Napi::CallbackInfo &info)
{
  _paint.setStyle(SkPaint::kFill_Style);
  _canvas->drawPath(_path, _paint);
  return Napi::Value();
}

Napi::Value CanvasContext::SetStrokeJoin(const Napi::CallbackInfo &info){
  if (info.Length() == 0)
  {
    switch (_paint.getStrokeJoin())
    {
      case SkPaint::kMiter_Join:
        return Napi::String::New(info.Env(), "miter");
      case SkPaint::kRound_Join:
        return Napi::String::New(info.Env(), "round");
      case SkPaint::kBevel_Join:
        return Napi::String::New(info.Env(), "bevel");
      default:
        return Napi::String::New(info.Env(), "miter");
    }
  }

  std::string join = info[0].As<Napi::String>().Utf8Value();

  if (join == "miter")
  {
    _paint.setStrokeJoin(SkPaint::kMiter_Join);
    _paint.setStrokeJoin((SkPaint::Join)SkPaint::kJoinCount);
  }
  else if (join == "round")
  {
    _paint.setStrokeJoin(SkPaint::kRound_Join);
    _paint.setStrokeJoin((SkPaint::Join)SkPaint::kJoinCount);
  }
  else if (join == "bevel")
  {
    _paint.setStrokeJoin(SkPaint::kBevel_Join);
    _paint.setStrokeJoin((SkPaint::Join)SkPaint::kJoinCount);
  }

  return Napi::Value();
}

Napi::Value CanvasContext::Rect(const Napi::CallbackInfo &info)
{
  SkScalar x = info[0].As<Napi::Number>().FloatValue();
  SkScalar y = info[1].As<Napi::Number>().FloatValue();
  SkScalar w = info[2].As<Napi::Number>().FloatValue();
  SkScalar h = info[3].As<Napi::Number>().FloatValue();
  _path.addRect(x, y, x + w, y + h);

  return Napi::Value();
}

Napi::Value CanvasContext::IsPointInPath(const Napi::CallbackInfo &info)
{
  SkScalar x = info[0].As<Napi::Number>().FloatValue();
  SkScalar y = info[1].As<Napi::Number>().FloatValue();
  bool result = _path.contains(x, y);
  return Napi::Boolean::New(info.Env(), result);
}

Napi::Value CanvasContext::ArcTo(const Napi::CallbackInfo &info)
{
  SkScalar x1 = info[0].As<Napi::Number>().FloatValue();
  SkScalar y1 = info[1].As<Napi::Number>().FloatValue();
  SkScalar x2 = info[2].As<Napi::Number>().FloatValue();
  SkScalar y2 = info[3].As<Napi::Number>().FloatValue();
  SkScalar radius = info[4].As<Napi::Number>().FloatValue();
  _path.arcTo(x1, y1, x2, y2, radius);
}

Napi::Value CanvasContext::Scale(const Napi::CallbackInfo &info)
{
  SkScalar x = info[0].As<Napi::Number>().FloatValue();
  SkScalar y = info[1].As<Napi::Number>().FloatValue();
  _canvas->scale(x, y);
  return Napi::Value();
}

Napi::Value CanvasContext::SetFont(const Napi::CallbackInfo &info)
{
  return Napi::Value();
}

Napi::Value CanvasContext::StrokeText(const Napi::CallbackInfo &info)
{

  return Napi::Value();
}

Napi::Value CanvasContext::FillText(const Napi::CallbackInfo &info)
{
  return Napi::Value();
}

Napi::Value CanvasContext::MeasureText(const Napi::CallbackInfo &info)
{
  return Napi::Value();
}
