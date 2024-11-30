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
#include <include/core/SkShader.h>
#include <include/core/SkFontMgr.h>
#include <include/core/SkTextBlob.h>
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

class CanvasContext : public Napi::ObjectWrap<CanvasContext>
{
private:
    SkFont _font;
    SkPath _path;
    SkPaint _paint;
    SkCanvas *_canvas;
    TextAlign _textAlign = TextAlign::LEFT;
    sk_sp<SkFontMgr> _fontMgr;
    ContextAttributesStruct _contextAttributes;
    std::map<std::string, sk_sp<SkTypeface>> _fontMap;
    Napi::ObjectReference _gradient;

    SkScalar ApplyTextAlign(std::string text, SkScalar x);

public : static Napi::Object CanvasContext2Object(Napi::Env env);
    CanvasContext(const Napi::CallbackInfo &info);
    ~CanvasContext() {};

    void SetCanvas(SkCanvas *canvas);
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
    Napi::Value CreateLinearGradient(const Napi::CallbackInfo &info);
    Napi::Value CreateRadialGradient(const Napi::CallbackInfo &info);
    Napi::Value CreateConicGradient(const Napi::CallbackInfo &info);
    Napi::Value SetTextAlign(const Napi::CallbackInfo &info);
    Napi::Value FillRect(const Napi::CallbackInfo &info);
    Napi::Value DrawImage(const Napi::CallbackInfo &info);
    Napi::Value DrawImageBuffer(const Napi::CallbackInfo &info);
    Napi::Value DrawImageWH(const Napi::CallbackInfo &info);
    Napi::Value RoundRect(const Napi::CallbackInfo &info);
    Napi::Value SetLineDash(const Napi::CallbackInfo &info);
};

#endif
