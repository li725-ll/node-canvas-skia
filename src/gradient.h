#ifndef __GRADIENT_H__
#define __GRADIENT_H__

#include <napi.h>
#include <iostream>
#include <vector>
#include <include/core/SkScalar.h>
#include <include/core/SkShader.h>


struct GradientArea
{
    int type = 0; //0 line 1 circle 2 ellipse
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
    GradientArea _gradientArea;
    std::vector<GradientStop> _ColorStop;

public:
    static Napi::Function Init(Napi::Env env);
    Gradient(const Napi::CallbackInfo &info);
    ~Gradient(){
        _ColorStop.clear();
    };

    void Reset();
    GradientArea GetGradientArea();
    void SetGradientArea(GradientArea gradientArea);
    std::vector<GradientStop> GetGradientStops();
    Napi::Value AddColorStop(const Napi::CallbackInfo &info);
    Napi::Value CreateLinearGradient(const Napi::CallbackInfo &info);
    Napi::Value CreateRadialGradient(const Napi::CallbackInfo &info);
    Napi::Value CreateConicGradient(const Napi::CallbackInfo &info);
};

#endif
