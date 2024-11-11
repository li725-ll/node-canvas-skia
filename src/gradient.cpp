#include "gradient.h"
#include <iostream>

Napi::Object Gradient::Init(Napi::Env env)
{
  Napi::Function func = DefineClass(
      env,
      "Gradient",
      {InstanceMethod("addColorStop", &Gradient::AddColorStop, napi_enumerable)});
  Napi::FunctionReference *constructor = new Napi::FunctionReference();
  *constructor = Napi::Persistent(func);
  env.SetInstanceData(constructor);

  return func.New({});
}

Gradient::Gradient(const Napi::CallbackInfo &info) : Napi::ObjectWrap<Gradient>(info){}
Gradient::~Gradient(){}

Napi::Value Gradient::AddColorStop(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  if (info.Length() != 2)
  {
    Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
    return env.Undefined();
  }

  SkScalar offset = info[0].As<Napi::Number>().FloatValue();
  SkColor color = info[1].As<Napi::Number>().Uint32Value();

  GradientStop stop;
  stop.color = color;
  stop.offset = offset;

  _ColorStop.push_back(stop);
  return Napi::Value();
}

void Gradient::SetGradientArea(GradientArea gradientArea)
{
  _gradientArea = gradientArea;
}

GradientArea Gradient::GetGradientArea()
{
  return _gradientArea;
}

std::vector<GradientStop> Gradient::GetGradientStops()
{
  return _ColorStop;
}

void Gradient::Reset()
{
  _gradientArea = GradientArea();
  _ColorStop.clear();
}
