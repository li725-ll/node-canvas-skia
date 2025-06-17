#include "gradient.h"
#include <iostream>

Napi::Function Gradient::Init(Napi::Env env)
{
    Napi::Function func = DefineClass(
        env,
        "Gradient",
        {
            InstanceMethod("addColorStop", &Gradient::AddColorStop, napi_enumerable),
            InstanceMethod("createLinearGradient", &Gradient::CreateLinearGradient, napi_enumerable),
            InstanceMethod("createRadialGradient", &Gradient::CreateRadialGradient, napi_enumerable),
            InstanceMethod("createConicGradient", &Gradient::CreateConicGradient, napi_enumerable)
        });

    Napi::FunctionReference *constructor = new Napi::FunctionReference();
    *constructor = Napi::Persistent(func);
    env.SetInstanceData(constructor);
    return func;
}

Gradient::Gradient(const Napi::CallbackInfo &info) : Napi::ObjectWrap<Gradient>(info) {}


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

Napi::Value Gradient::CreateLinearGradient(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    Napi::HandleScope scope(info.Env());

    SkScalar x0 = info[0].As<Napi::Number>().FloatValue();
    SkScalar y0 = info[1].As<Napi::Number>().FloatValue();
    SkScalar x1 = info[2].As<Napi::Number>().FloatValue();
    SkScalar y1 = info[3].As<Napi::Number>().FloatValue();

    GradientArea gradientArea = {0, x0, y0, 0, x1, y1, 0};

    Reset();
    SetGradientArea(gradientArea);

    return Napi::Value();
}

Napi::Value Gradient::CreateRadialGradient(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    Napi::HandleScope scope(info.Env());

    SkScalar x0 = info[0].As<Napi::Number>().FloatValue();
    SkScalar y0 = info[1].As<Napi::Number>().FloatValue();
    SkScalar r0 = info[2].As<Napi::Number>().FloatValue();
    SkScalar x1 = info[3].As<Napi::Number>().FloatValue();
    SkScalar y1 = info[4].As<Napi::Number>().FloatValue();
    SkScalar r1 = info[5].As<Napi::Number>().FloatValue();

    GradientArea gradientArea = {1, x0, y0, r0, x1, y1, r1};

    Reset();
    SetGradientArea(gradientArea);

    return Napi::Value();
}

Napi::Value Gradient::CreateConicGradient(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    Napi::HandleScope scope(info.Env());

    SkScalar startAngle = info[0].As<Napi::Number>().FloatValue();
    SkScalar x = info[1].As<Napi::Number>().FloatValue();
    SkScalar y = info[2].As<Napi::Number>().FloatValue();
    GradientArea gradientArea = {2, startAngle, x, y};

    Reset();
    SetGradientArea(gradientArea);

    return Napi::Value();
}
