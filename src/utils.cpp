#include <napi.h>

#include "utils.h"

Napi::Object Utils::Init(Napi::Env env)
{

  Napi::Object obj = Napi::Object::New(env);
  obj.Set(Napi::String::New(env, "RGBA"), Napi::Function::New(env, Utils::RGBA));
  return obj;
}

Napi::Value Utils::RGBA(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  int r = info[0].As<Napi::Number>().Int32Value();
  int g = info[1].As<Napi::Number>().Int32Value();
  int b = info[2].As<Napi::Number>().Int32Value();
  float a = info[3].As<Napi::Number>().FloatValue();
  return Napi::Number::New(env, SkColorSetARGB(a * 255, r, g, b));
}
