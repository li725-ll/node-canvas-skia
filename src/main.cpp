#include <napi.h>

#include "canvas.h"

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  // exports.Set(Napi::String::New(env, "createCanvas"),
  //             Napi::Function::New(env, CreateCanvas));
  exports.Set(Napi::String::New(env, "Canvas"), Canvas::Init(env));
  return exports;
}

NODE_API_MODULE(addon, Init)
