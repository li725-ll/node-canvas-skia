#include <napi.h>

#include "utils.h"
#include "canvas.h"
#include "gradient.h"


Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set(Napi::String::New(env, "Canvas"), Canvas::Init(env));
    exports.Set(Napi::String::New(env, "Utils"), Utils::Init(env));
    exports.Set(Napi::String::New(env, "Gradient"), Gradient::Init(env));
    return exports;
}

NODE_API_MODULE(addon, Init)
