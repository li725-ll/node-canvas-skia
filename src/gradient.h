#ifndef __GRADIENT_H__
#define __GRADIENT_H__

#include <napi.h>
#include <vector>
#include <include/core/SkScalar.h>
#include <include/core/SkShader.h>


struct GradientArea
{
  int type = 0; //0 line 1 circle
  SkScalar x0 = 0;
  SkScalar y0 = 0;
  SkScalar r0 = 0;
  SkScalar x1 = 0;
  SkScalar y1 = 0;
  SkScalar r1 = 0;
};

struct GradientStop
{
  SkColor color;
  SkScalar offset;
};

class Gradient : public Napi::ObjectWrap<Gradient>
{
private:
  std::string _id;
  GradientArea _gradientArea;
  std::vector<GradientStop> _ColorStop;
  Napi::Value GetId(const Napi::CallbackInfo &info);

public:
  static Napi::Function Init(Napi::Env env);
  Gradient(const Napi::CallbackInfo &info);
  ~Gradient() {};
  Napi::Value AddColorStop(const Napi::CallbackInfo &info);
  void SetId(std::string id);
  void SetGradientArea(GradientArea gradientArea);
  GradientArea GetGradientArea();
  std::vector<GradientStop> GetGradientStops();
};

#endif
