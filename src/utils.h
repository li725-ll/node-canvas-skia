#ifndef __UTILS_H__
#define __UTILS_H__

#include <napi.h>
#include <include/core/SkColor.h>

class Utils {
public:
  static Napi::Object Init(Napi::Env env);
  static Napi::Value RGBA(const Napi::CallbackInfo &info);
  static Napi::Value ColorMap(const Napi::CallbackInfo &info);
};
#endif
