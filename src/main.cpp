#include <napi.h>

#include "utils.h"
#include "canvas.h"


Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set(Napi::String::New(env, "Canvas"), Canvas::Init(env));
    exports.Set(Napi::String::New(env, "Utils"), Utils::Init(env));
    return exports;
}

NODE_API_MODULE(addon, Init)
