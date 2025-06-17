#ifndef __CONTEXT_H__
#define __CONTEXT_H__

#include <map>
#include <napi.h>
#include <vector>
#include <string>
#include <include/core/SkPath.h>
#include <include/core/SkRect.h>
#include <include/core/SkFont.h>
#include <include/core/SkPaint.h>
#include <include/core/SkImage.h>
#include <include/core/SkColor.h>
#include <include/core/SkCanvas.h>
#include <include/core/SkSurface.h>
#include <include/core/SkShader.h>
#include <include/core/SkFontMgr.h>
#include <include/core/SkTextBlob.h>
#include <include/core/SkFontMetrics.h>
#include <include/core/SkSamplingOptions.h>
#include <include/effects/SkGradientShader.h>
#include <include/effects/SkDashPathEffect.h>
#include <include/effects/SkDiscretePathEffect.h>

#include "gradient.h"

struct ContextAttributesStruct
{
    bool antialias  = false;
    bool depth  = false;
};

enum TextAlign
{
    LEFT,
    RIGHT,
    END,
    START,
    CENTER
};

enum TextBaseline
{
    TOP,
    HANGING,
    MIDDLE,
    ALPHABETIC,
    IDEOGRAPHIC,
    BOTTOM
};

class CanvasContext : public Napi::ObjectWrap<CanvasContext>
{
private:
    SkFont _font;
    SkPath _path;
    SkPaint _paint;
    sk_sp<SkSurface> _surface;
    TextAlign _textAlign = TextAlign::LEFT;
    TextBaseline _textBaseline = TextBaseline::ALPHABETIC;
    sk_sp<SkFontMgr> _fontMgr;
    ContextAttributesStruct _contextAttributes;
    std::map<std::string, sk_sp<SkTypeface>> _fontMap;
    Napi::ObjectReference _gradient;
    SkScalar ApplyTextAlign(std::string text, SkScalar x);
    SkScalar ApplyTextBaseline(std::string text, SkScalar y);

public :
    static void Init(Napi::Env env);
    static Napi::FunctionReference *constructor;
    CanvasContext(const Napi::CallbackInfo &info);
    ~CanvasContext() {
        _gradient.Reset();
        _fontMgr.reset();
    };

    void SetSurface(sk_sp<SkSurface> surface);

    void ReleaseGradient();
    void SetContextAttributes(bool antialias, bool depth);

    Napi::Value BeginPath(const Napi::CallbackInfo &info);
    Napi::Value MoveTo(const Napi::CallbackInfo &info);
    Napi::Value LineTo(const Napi::CallbackInfo &info);
    Napi::Value ClosePath(const Napi::CallbackInfo &info);
    Napi::Value Stroke(const Napi::CallbackInfo &info);
    Napi::Value Clear(const Napi::CallbackInfo &info);
    Napi::Value ClearRect(const Napi::CallbackInfo &info);
    Napi::Value Translate(const Napi::CallbackInfo &info);
    Napi::Value SetTransform(const Napi::CallbackInfo &info);
    Napi::Value Rotate(const Napi::CallbackInfo &info);
    Napi::Value StrokeStyle(const Napi::CallbackInfo &info);
    Napi::Value LineWidth(const Napi::CallbackInfo &info);
    Napi::Value Arc(const Napi::CallbackInfo &info);
    Napi::Value StrokeRect(const Napi::CallbackInfo &info);
    Napi::Value LineCap(const Napi::CallbackInfo &info);
    Napi::Value SetStrokeJoin(const Napi::CallbackInfo &info);
    Napi::Value Fill(const Napi::CallbackInfo &info);
    Napi::Value Rect(const Napi::CallbackInfo &info);
    Napi::Value IsPointInPath(const Napi::CallbackInfo &info);
    Napi::Value ArcTo(const Napi::CallbackInfo &info);
    Napi::Value Scale(const Napi::CallbackInfo &info);
    Napi::Value SetFont(const Napi::CallbackInfo &info);
    Napi::Value LoadFont(const Napi::CallbackInfo &info);
    Napi::Value StrokeText(const Napi::CallbackInfo &info);
    Napi::Value FillText(const Napi::CallbackInfo &info);
    Napi::Value MeasureText(const Napi::CallbackInfo &info);
    Napi::Value GetFonts(const Napi::CallbackInfo &info);
    Napi::Value SetShader(const Napi::CallbackInfo &info);
    Napi::Value SetTextAlign(const Napi::CallbackInfo &info);
    Napi::Value SetTextBaseline(const Napi::CallbackInfo &info);
    Napi::Value FillRect(const Napi::CallbackInfo &info);
    Napi::Value DrawImage(const Napi::CallbackInfo &info);
    Napi::Value DrawImageBuffer(const Napi::CallbackInfo &info);
    Napi::Value DrawImageWH(const Napi::CallbackInfo &info);
    Napi::Value RoundRect(const Napi::CallbackInfo &info);
    Napi::Value SetLineDash(const Napi::CallbackInfo &info);
    Napi::Value BezierCurveTo(const Napi::CallbackInfo &info);
    Napi::Value QuadraticCurveTo(const Napi::CallbackInfo &info);
    Napi::Value Clip(const Napi::CallbackInfo &info);
    Napi::Value SetGlobalAlpha(const Napi::CallbackInfo &info);
};

#endif
