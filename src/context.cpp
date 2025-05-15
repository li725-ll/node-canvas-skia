#include <iostream>
#include "context.h"
#include "utils.h"

Napi::FunctionReference *CanvasContext::constructor = new Napi::FunctionReference();

void CanvasContext::Init(Napi::Env env)
{
    Gradient::Init(env); // Initialize the Gradient class
    Napi::Function func = DefineClass(
            env,
            "CanvasContext",
            {
                InstanceMethod("beginPath", &CanvasContext::BeginPath, napi_enumerable),
             InstanceMethod("moveTo", &CanvasContext::MoveTo, napi_enumerable),
             InstanceMethod("lineTo", &CanvasContext::LineTo, napi_enumerable),
             InstanceMethod("closePath", &CanvasContext::ClosePath, napi_enumerable),
             InstanceMethod("stroke", &CanvasContext::Stroke, napi_enumerable),
             InstanceMethod("clear", &CanvasContext::Clear, napi_enumerable),
             InstanceMethod("translate", &CanvasContext::Translate, napi_enumerable),
             InstanceMethod("setTransform", &CanvasContext::SetTransform, napi_enumerable),
             InstanceMethod("strokeStyle", &CanvasContext::StrokeStyle, napi_enumerable),
             InstanceMethod("fillStyle", &CanvasContext::StrokeStyle, napi_enumerable),
             InstanceMethod("lineWidth", &CanvasContext::LineWidth, napi_enumerable),
             InstanceMethod("rotate", &CanvasContext::Rotate, napi_enumerable),
             InstanceMethod("arc", &CanvasContext::Arc, napi_enumerable),
             InstanceMethod("strokeRect", &CanvasContext::StrokeRect, napi_enumerable),
             InstanceMethod("lineCap", &CanvasContext::LineCap, napi_enumerable),
             InstanceMethod("lineJoin", &CanvasContext::SetStrokeJoin, napi_enumerable),
             InstanceMethod("rect", &CanvasContext::Rect, napi_enumerable),
             InstanceMethod("fill", &CanvasContext::Fill, napi_enumerable),
             InstanceMethod("isPointInPath", &CanvasContext::IsPointInPath, napi_enumerable),
             InstanceMethod("scale", &CanvasContext::Scale, napi_enumerable),
             InstanceMethod("arcTo", &CanvasContext::ArcTo, napi_enumerable),
             InstanceMethod("setFont", &CanvasContext::SetFont, napi_enumerable),
             InstanceMethod("strokeText", &CanvasContext::StrokeText, napi_enumerable),
             InstanceMethod("loadFont", &CanvasContext::LoadFont, napi_enumerable),
             InstanceMethod("fillText", &CanvasContext::FillText, napi_enumerable),
             InstanceMethod("fillRect", &CanvasContext::FillRect, napi_enumerable),
             InstanceMethod("measureText", &CanvasContext::MeasureText, napi_enumerable),
             InstanceMethod("getFonts", &CanvasContext::GetFonts, napi_enumerable),
             InstanceMethod("setShader", &CanvasContext::SetShader, napi_enumerable),
             InstanceMethod("setTextAlign", &CanvasContext::SetTextAlign, napi_enumerable),
             InstanceMethod("setTextBaseline", &CanvasContext::SetTextBaseline, napi_enumerable),
             InstanceMethod("clearRect", &CanvasContext::ClearRect, napi_enumerable),
             InstanceMethod("drawImage", &CanvasContext::DrawImage, napi_enumerable),
             InstanceMethod("drawImageWH", &CanvasContext::DrawImageWH, napi_enumerable),
             InstanceMethod("DrawImageBuffer", &CanvasContext::DrawImageBuffer, napi_enumerable),
             InstanceMethod("createConicGradient", &CanvasContext::CreateConicGradient, napi_enumerable),
             InstanceMethod("createLinearGradient", &CanvasContext::CreateLinearGradient, napi_enumerable),
             InstanceMethod("createRadialGradient", &CanvasContext::CreateRadialGradient, napi_enumerable),
             InstanceMethod("setLineDash", &CanvasContext::SetLineDash, napi_enumerable),
             InstanceMethod("quadraticCurveTo", &CanvasContext::QuadraticCurveTo, napi_enumerable),
             InstanceMethod("bezierCurveTo", &CanvasContext::BezierCurveTo, napi_enumerable),
             InstanceMethod("roundRect", &CanvasContext::RoundRect, napi_enumerable),
             InstanceMethod("clip", &CanvasContext::Clip, napi_enumerable),
             InstanceMethod("setGlobalAlpha", &CanvasContext::SetGlobalAlpha, napi_enumerable)
            });

    *CanvasContext::constructor = Napi::Persistent(func);
    env.SetInstanceData(constructor);
}
CanvasContext::CanvasContext(const Napi::CallbackInfo &info) : Napi::ObjectWrap<CanvasContext>(info)
{
    _gradient = Napi::Persistent(Gradient::constructor->Value().New({}));
    _fontMgr = SkFontMgr::RefDefault();
}

void CanvasContext::SetCanvas(SkCanvas *canvas)
{
    _canvas = canvas;
}

void CanvasContext::ReleaseGradient()
{
    _gradient.Reset();
}

void CanvasContext::SetContextAttributes(bool antialias, bool depth)
{
    _contextAttributes.antialias = antialias;
    _contextAttributes.depth = depth;
    _paint.setAntiAlias(_contextAttributes.antialias);
}

Napi::Value CanvasContext::BeginPath(const Napi::CallbackInfo &info)
{
    _path = _path.reset();
    return Napi::Value();
}

Napi::Value CanvasContext::MoveTo(const Napi::CallbackInfo &info)
{
    SkScalar x = info[0].As<Napi::Number>().FloatValue();
    SkScalar y = info[1].As<Napi::Number>().FloatValue();
    _path.moveTo(x, y);
    return Napi::Value();
}

Napi::Value CanvasContext::LineTo(const Napi::CallbackInfo &info)
{
    SkScalar x = info[0].As<Napi::Number>().FloatValue();
    SkScalar y = info[1].As<Napi::Number>().FloatValue();
    _path.lineTo(x, y);
    return Napi::Value();
}

Napi::Value CanvasContext::ClosePath(const Napi::CallbackInfo &info)
{
    _path.close();
    return Napi::Value();
}

Napi::Value CanvasContext::Stroke(const Napi::CallbackInfo &info)
{
    _paint.setStyle(SkPaint::kStroke_Style);
    _canvas->drawPath(_path, _paint);
    return Napi::Value();
}

Napi::Value CanvasContext::Clear(const Napi::CallbackInfo &info)
{
    SkColor color = info[0].As<Napi::Number>().Uint32Value();
    _canvas->clear(color);
    return Napi::Value();
}

Napi::Value CanvasContext::Translate(const Napi::CallbackInfo &info)
{
    SkScalar x = info[0].As<Napi::Number>().FloatValue();
    SkScalar y = info[1].As<Napi::Number>().FloatValue();
    _canvas->translate(x, y);
    return Napi::Value();
}

Napi::Value CanvasContext::SetTransform(const Napi::CallbackInfo &info)
{
    SkScalar a = info[0].As<Napi::Number>().FloatValue();
    SkScalar b = info[1].As<Napi::Number>().FloatValue();
    SkScalar c = info[2].As<Napi::Number>().FloatValue();
    SkScalar d = info[3].As<Napi::Number>().FloatValue();
    SkScalar e = info[4].As<Napi::Number>().FloatValue();
    SkScalar f = info[5].As<Napi::Number>().FloatValue();

    SkMatrix matrix;
    matrix.setAll(a, b, e, c, d, f, 0, 0, 1);
    _canvas->setMatrix(matrix);

    return Napi::Value();
}

Napi::Value CanvasContext::Rotate(const Napi::CallbackInfo &info)
{
    SkScalar angle = info[0].As<Napi::Number>().FloatValue();
    _canvas->rotate(angle);
    return Napi::Value();
}

Napi::Value CanvasContext::StrokeStyle(const Napi::CallbackInfo &info)
{
    SkColor color = info[0].As<Napi::Number>().Uint32Value();
    _paint.setShader(nullptr);
    _paint.setColor(color);
    return Napi::Value();
};

Napi::Value CanvasContext::LineWidth(const Napi::CallbackInfo &info)
{
  SkScalar width = info[0].As<Napi::Number>().FloatValue();
  _paint.setStrokeWidth(width);
  return Napi::Value();
}

Napi::Value CanvasContext::Arc(const Napi::CallbackInfo &info)
{
    SkScalar x = info[0].As<Napi::Number>().FloatValue();
    SkScalar y = info[1].As<Napi::Number>().FloatValue();
    SkScalar r = info[2].As<Napi::Number>().FloatValue();
    SkScalar startAngle = info[3].As<Napi::Number>().FloatValue();
    SkScalar sweepAngle = info[4].As<Napi::Number>().FloatValue();
    SkRect skRect = SkRect::MakeXYWH(x - r, y - r, 2 * r, 2 * r);
    _path.addArc(skRect, startAngle, sweepAngle);
    return Napi::Value();
}

Napi::Value CanvasContext::StrokeRect(const Napi::CallbackInfo &info)
{
    SkScalar x = info[0].As<Napi::Number>().FloatValue();
    SkScalar y = info[1].As<Napi::Number>().FloatValue();
    SkScalar w = info[2].As<Napi::Number>().FloatValue();
    SkScalar h = info[3].As<Napi::Number>().FloatValue();
    _paint.setStyle(SkPaint::kStroke_Style);
    SkRect rect = SkRect::MakeXYWH(x, y, w, h);
    _canvas->drawRect(rect, _paint);
    return Napi::Value();
}

Napi::Value CanvasContext::LineCap(const Napi::CallbackInfo &info)
{
    if (info.Length() == 0)
    {
            switch (_paint.getStrokeCap())
            {
                case SkPaint::kButt_Cap:
                    return Napi::String::New(info.Env(), "butt");
                case SkPaint::kRound_Cap:
                    return Napi::String::New(info.Env(), "round");
                case SkPaint::kSquare_Cap:
                    return Napi::String::New(info.Env(), "square");
                default:
                    return Napi::String::New(info.Env(), "butt");
            }
    }

    std::string cap = info[0].As<Napi::String>().Utf8Value();

    if (cap == "butt")
    {
        _paint.setStrokeCap(SkPaint::kButt_Cap);
        _paint.setStrokeCap((SkPaint::Cap)SkPaint::kCapCount);
    }
    else if (cap == "round")
    {
        _paint.setStrokeCap(SkPaint::kRound_Cap);
        _paint.setStrokeCap((SkPaint::Cap)SkPaint::kCapCount);
    }
    else if(cap == "square")
    {
        _paint.setStrokeCap(SkPaint::kSquare_Cap);
        _paint.setStrokeCap((SkPaint::Cap)SkPaint::kCapCount);
    }

    return Napi::Value();
}

Napi::Value CanvasContext::Fill(const Napi::CallbackInfo &info)
{
    _paint.setStyle(SkPaint::kFill_Style);
    _canvas->drawPath(_path, _paint);
    return Napi::Value();
}

Napi::Value CanvasContext::SetStrokeJoin(const Napi::CallbackInfo &info){
    if (info.Length() == 0)
    {
        switch (_paint.getStrokeJoin())
        {
        case SkPaint::kMiter_Join:
            return Napi::String::New(info.Env(), "miter");
        case SkPaint::kRound_Join:
            return Napi::String::New(info.Env(), "round");
        case SkPaint::kBevel_Join:
            return Napi::String::New(info.Env(), "bevel");
        default:
            return Napi::String::New(info.Env(), "miter");
        }
    }

    std::string join = info[0].As<Napi::String>().Utf8Value();

    if (join == "miter")
    {
        _paint.setStrokeJoin(SkPaint::kMiter_Join);
        _paint.setStrokeJoin((SkPaint::Join)SkPaint::kJoinCount);
    }
    else if (join == "round")
    {
        _paint.setStrokeJoin(SkPaint::kRound_Join);
        _paint.setStrokeJoin((SkPaint::Join)SkPaint::kJoinCount);
    }
    else if (join == "bevel")
    {
        _paint.setStrokeJoin(SkPaint::kBevel_Join);
        _paint.setStrokeJoin((SkPaint::Join)SkPaint::kJoinCount);
    }

    return Napi::Value();
}

Napi::Value CanvasContext::Rect(const Napi::CallbackInfo &info)
{
    SkScalar x = info[0].As<Napi::Number>().FloatValue();
    SkScalar y = info[1].As<Napi::Number>().FloatValue();
    SkScalar w = info[2].As<Napi::Number>().FloatValue();
    SkScalar h = info[3].As<Napi::Number>().FloatValue();
    _path.addRect(x, y, x + w, y + h);

    return Napi::Value();
}

Napi::Value CanvasContext::IsPointInPath(const Napi::CallbackInfo &info)
{
    SkScalar x = info[0].As<Napi::Number>().FloatValue();
    SkScalar y = info[1].As<Napi::Number>().FloatValue();
    bool result = _path.contains(x, y);
    return Napi::Boolean::New(info.Env(), result);
}

Napi::Value CanvasContext::ArcTo(const Napi::CallbackInfo &info)
{
    SkScalar x1 = info[0].As<Napi::Number>().FloatValue();
    SkScalar y1 = info[1].As<Napi::Number>().FloatValue();
    SkScalar x2 = info[2].As<Napi::Number>().FloatValue();
    SkScalar y2 = info[3].As<Napi::Number>().FloatValue();
    SkScalar radius = info[4].As<Napi::Number>().FloatValue();
    _path.arcTo(x1, y1, x2, y2, radius);
    return Napi::Value();
}

Napi::Value CanvasContext::Scale(const Napi::CallbackInfo &info)
{
    SkScalar x = info[0].As<Napi::Number>().FloatValue();
    SkScalar y = info[1].As<Napi::Number>().FloatValue();
    _canvas->scale(x, y);
    return Napi::Value();
}

Napi::Value CanvasContext::SetFont(const Napi::CallbackInfo &info)
{
    SkFontStyle fontStyle;
    sk_sp<SkTypeface> typeface;

    std::string fontFamily = info[0].As<Napi::String>().Utf8Value();
    SkScalar fontSize = info[1].As<Napi::Number>().FloatValue();

    if(_fontMap.size() > 0) {
        auto it = _fontMap.find(fontFamily);
        if (it != _fontMap.end())
        {
            typeface = it->second;
        }
        else
        {
            typeface = _fontMgr->legacyMakeTypeface(fontFamily.c_str(), fontStyle);
        }
    } else {
        typeface = _fontMgr->legacyMakeTypeface(fontFamily.c_str(), fontStyle);
    }

    _font.setTypeface(typeface);
    _font.setSize(fontSize);
    _font.setHinting(SkFontHinting::kNormal);
    _font.setEdging(SkFont::Edging::kAntiAlias);
    _font.setSubpixel(true);

    return Napi::Value();
}

Napi::Value CanvasContext::StrokeText(const Napi::CallbackInfo &info)
{
    std::string text = info[0].As<Napi::String>().Utf8Value();
    SkScalar x = info[1].As<Napi::Number>().FloatValue();
    SkScalar y = info[2].As<Napi::Number>().FloatValue();
    // SkScalar maxWidth = info[3].As<Napi::Number>().FloatValue();

    _paint.setStyle(SkPaint::kStroke_Style);
    SkScalar start = ApplyTextAlign(text, x);
    SkScalar baseline = ApplyTextBaseline(text, y);
    _canvas->drawString(text.c_str(), start, baseline, _font, _paint);
    return Napi::Value();
}

Napi::Value CanvasContext::FillText(const Napi::CallbackInfo &info)
{
    std::string text = info[0].As<Napi::String>().Utf8Value();
    SkScalar x = info[1].As<Napi::Number>().FloatValue();
    SkScalar y = info[2].As<Napi::Number>().FloatValue();
    // SkScalar maxWidth = info[3].As<Napi::Number>().FloatValue();

    _paint.setStyle(SkPaint::kFill_Style);
    SkScalar start = ApplyTextAlign(text, x);
    SkScalar baseline = ApplyTextBaseline(text, y);
    _canvas->drawString(text.c_str(), start, baseline, _font, _paint);
    return Napi::Value();
}

Napi::Value CanvasContext::MeasureText(const Napi::CallbackInfo &info)
{
    Napi::Object result = Napi::Object::New(info.Env());

    std::string text = info[0].As<Napi::String>().Utf8Value();
    _paint.setStyle(SkPaint::kFill_Style);
    SkScalar width = _font.measureText(text.c_str(), text.length(), SkTextEncoding::kUTF8);
    result.Set("width", Napi::Number::New(info.Env(), width));

    return result;
}

Napi::Value CanvasContext::LoadFont(const Napi::CallbackInfo &info)
{
    std::string fontPath = info[0].As<Napi::String>().Utf8Value();
    std::string fontName = info[1].As<Napi::String>().Utf8Value();

    sk_sp<SkTypeface> font = _fontMgr->makeFromFile(fontPath.c_str(), 0);

    _fontMap.insert({fontName, font});
    return Napi::Value();
}

Napi::Value CanvasContext::GetFonts(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    Napi::Array result = Napi::Array::New(env);

    for (int i = 0; i < _fontMgr->countFamilies(); ++i)
    {
        SkString familyName;
        Napi::Object font = Napi::Object::New(env);

        _fontMgr->getFamilyName(i, &familyName);
        sk_sp<SkFontStyleSet> styleSet(_fontMgr->createStyleSet(i));

        int N = styleSet->count();
        for (int j = 0; j < N; ++j)
        {
        SkFontStyle fontStyle;
        SkString style;
        styleSet->getStyle(j, &fontStyle, &style);

        font.Set("family", familyName.c_str());
        font.Set("weight", fontStyle.weight());
        font.Set("style", style.c_str());

        result.Set(i, font);
        }
    }
    return result;
}

Napi::Value CanvasContext::CreateLinearGradient(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    Napi::HandleScope scope(info.Env());

    SkScalar x0 = info[0].As<Napi::Number>().FloatValue();
    SkScalar y0 = info[1].As<Napi::Number>().FloatValue();
    SkScalar x1 = info[2].As<Napi::Number>().FloatValue();
    SkScalar y1 = info[3].As<Napi::Number>().FloatValue();

    GradientArea gradientArea = {0, x0, y0, 0, x1, y1, 0};

    Gradient *gradientUnWrap = Gradient::Unwrap(_gradient.Value());
    gradientUnWrap->Reset();
    gradientUnWrap->SetGradientArea(gradientArea);

    return _gradient.Value();
}

Napi::Value CanvasContext::CreateRadialGradient(const Napi::CallbackInfo &info)
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

    Gradient *gradientUnWrap = Gradient::Unwrap(_gradient.Value());
    gradientUnWrap->Reset();
    gradientUnWrap->SetGradientArea(gradientArea);

    return _gradient.Value();
}

Napi::Value CanvasContext::CreateConicGradient(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    Napi::HandleScope scope(info.Env());

    SkScalar startAngle = info[0].As<Napi::Number>().FloatValue();
    SkScalar x = info[1].As<Napi::Number>().FloatValue();
    SkScalar y = info[2].As<Napi::Number>().FloatValue();
    GradientArea gradientArea = {2, startAngle, x, y};

    Gradient *gradientUnWrap = Gradient::Unwrap(_gradient.Value());
    gradientUnWrap->Reset();
    gradientUnWrap->SetGradientArea(gradientArea);

    return _gradient.Value();
}

Napi::Value CanvasContext::ClearRect(const Napi::CallbackInfo &info)
{
    SkScalar x = info[0].As<Napi::Number>().FloatValue();
    SkScalar y = info[1].As<Napi::Number>().FloatValue();
    SkScalar w = info[2].As<Napi::Number>().FloatValue();
    SkScalar h = info[3].As<Napi::Number>().FloatValue();
    _canvas->save();
    SkRect rectToClear = SkRect::MakeXYWH(x, y, w, h);
    _canvas->clipRect(rectToClear, SkClipOp::kIntersect);
    _canvas->drawColor(0, SkBlendMode::kClear);
    _canvas->restore();

    return Napi::Value();
}

Napi::Value CanvasContext::SetShader(const Napi::CallbackInfo &info)
{
    int shader = info[0].As<Napi::Number>().Int32Value();
    Gradient *gradientUnWrap = Gradient::Unwrap(_gradient.Value());
    GradientArea gradientArea = gradientUnWrap->GetGradientArea();

    if (gradientArea.type == 0)
    {
        SkPoint points[2] =
            {
                SkPoint::Make(gradientArea.x0, gradientArea.y0),
                SkPoint::Make(gradientArea.x1, gradientArea.y1)};
        std::vector<GradientStop> gradientStop = gradientUnWrap->GetGradientStops();
        std::vector<SkColor> colors;
        std::vector<SkScalar> stops;
        for (auto &stop : gradientStop)
        {
        colors.push_back(stop.color);
        stops.push_back(stop.offset);
        }

        sk_sp<SkShader> skShader = SkGradientShader::MakeLinear(
            points,
            colors.data(),
            stops.data(),
            colors.size(),
            SkTileMode::kClamp,
            0,
            nullptr);
        _paint.setShader(skShader);
    }
    else if (gradientArea.type == 1)
    {
        SkPoint startPoint = SkPoint::Make(gradientArea.x0, gradientArea.y0);
        SkPoint endPoint = SkPoint::Make(gradientArea.x1, gradientArea.y1);

        std::vector<GradientStop> gradientStop = gradientUnWrap->GetGradientStops();
        std::vector<SkColor> colors;
        std::vector<SkScalar> stops;
        for (auto &stop : gradientStop)
        {
            colors.push_back(stop.color);
            stops.push_back(stop.offset);
        }

        sk_sp<SkShader> skShader = SkGradientShader::MakeTwoPointConical(
            startPoint,
            gradientArea.r0,
            endPoint,
            gradientArea.r1,
            colors.data(),
            stops.data(),
            stops.size(),
            SkTileMode::kClamp,
            0,
            nullptr);
        _paint.setShader(skShader);
    } else
    {
        std::vector<GradientStop> gradientStop = gradientUnWrap->GetGradientStops();
        std::vector<SkColor> colors;
        std::vector<SkScalar> stops;
        for (auto &stop : gradientStop)
        {
        colors.push_back(stop.color);
        stops.push_back(stop.offset);
        }

        sk_sp<SkShader> skShader = SkGradientShader::MakeSweep(
            gradientArea.y0,
            gradientArea.r0,
            colors.data(),
            stops.data(),
            stops.size(),
            SkTileMode::kClamp,
            gradientArea.x0,
            360.0,
            0,
            nullptr);
        _paint.setShader(skShader);
    }

    return Napi::Value();
}

Napi::Value CanvasContext::SetTextAlign(const Napi::CallbackInfo &info)
{
    std::string textAlign = info[0].As<Napi::String>().Utf8Value();
    if (textAlign == "center")
    {
        _textAlign = TextAlign::CENTER;
    }
    else if (textAlign == "end")
    {
        _textAlign = TextAlign::END;
    }
    else if (textAlign == "left")
    {
        _textAlign = TextAlign::LEFT;
    }
    else if (textAlign == "right")
    {
        _textAlign = TextAlign::RIGHT;
    }
    return Napi::Value();
}

Napi::Value CanvasContext::SetTextBaseline(const Napi::CallbackInfo &info)
{
    std::string textBaseline = info[0].As<Napi::String>().Utf8Value();
    if (textBaseline == "top")
    {
        _textBaseline = TextBaseline::TOP;
    }
    else if (textBaseline == "hanging")
    {
        _textBaseline = TextBaseline::HANGING;
    }
    else if (textBaseline == "middle")
    {
        _textBaseline = TextBaseline::MIDDLE;
    }
    else if (textBaseline == "alphabetic")
    {
        _textBaseline = TextBaseline::ALPHABETIC;
    }
    else if (textBaseline == "ideographic")
    {
        _textBaseline = TextBaseline::IDEOGRAPHIC;
    }
    else if (textBaseline == "bottom")
    {
        _textBaseline = TextBaseline::BOTTOM;
    }
    else
    {
        _textBaseline = TextBaseline::ALPHABETIC;
    }

    return Napi::Value();
}

SkScalar CanvasContext::ApplyTextAlign(std::string text, SkScalar x)
{
    switch (_textAlign)
    {
        case TextAlign::START:
        {
            return x;
        }
        case TextAlign::LEFT:
        {
            return x;
        }
        case TextAlign::END:
        {
            return x - _font.measureText(text.c_str(), text.length(), SkTextEncoding::kUTF8);
        }
        case TextAlign::RIGHT:
        {
            return x - _font.measureText(text.c_str(), text.length(), SkTextEncoding::kUTF8);
        }
        case TextAlign::CENTER:
        {
            return x - (_font.measureText(text.c_str(), text.length(), SkTextEncoding::kUTF8) / 2);
        }
        default:
        {
            return x;
        }
    }
}

SkScalar CanvasContext::ApplyTextBaseline(std::string text, SkScalar y)
{
    SkFontMetrics fontMetrics;
    _font.getMetrics(&fontMetrics);
    switch (_textBaseline)
    {
        case TextBaseline::TOP:
        {
            return y - fontMetrics.fAscent;
        }
        case TextBaseline::HANGING:
        {
            return y - fontMetrics.fAscent - fontMetrics.fDescent;
        }
        case TextBaseline::MIDDLE:
        {
            return y - (fontMetrics.fAscent + fontMetrics.fDescent) / 2;
        }
        case TextBaseline::IDEOGRAPHIC:
        {
            return y - fontMetrics.fDescent;
        }
        case TextBaseline::BOTTOM:
        {
            return y - fontMetrics.fDescent;
        }
        default:
        {
            return y;
        }
    }
}

Napi::Value CanvasContext::FillRect(const Napi::CallbackInfo &info)
{
    SkScalar x = info[0].As<Napi::Number>().FloatValue();
    SkScalar y = info[1].As<Napi::Number>().FloatValue();
    SkScalar w = info[2].As<Napi::Number>().FloatValue();
    SkScalar h = info[3].As<Napi::Number>().FloatValue();

    _paint.setStyle(SkPaint::kFill_Style);
    _canvas->drawRect(SkRect::MakeXYWH(x, y, w, h), _paint);

    return Napi::Value();
}

Napi::Value CanvasContext::DrawImage(const Napi::CallbackInfo &info)
{
    // TODO: Waiting for Writing
    std::string path = info[0].As<Napi::String>().Utf8Value();
    SkScalar x = info[1].As<Napi::Number>().FloatValue();
    SkScalar y = info[2].As<Napi::Number>().FloatValue();

    sk_sp<SkImage> image = SkImage::MakeFromEncoded(SkData::MakeFromFileName(path.c_str()));

    _canvas->drawImage(image, x, y);
    return Napi::Value();
}

Napi::Value CanvasContext::DrawImageBuffer(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();
    uint8_t* data = info[0].As<Napi::Buffer<uint8_t>>().Data();
    size_t size = info[0].As<Napi::Buffer<uint8_t>>().Length();
    SkScalar x = info[1].As<Napi::Number>().FloatValue();
    SkScalar y = info[2].As<Napi::Number>().FloatValue();
    SkScalar w = info[3].As<Napi::Number>().FloatValue();
    SkScalar h = info[4].As<Napi::Number>().FloatValue();

    sk_sp<SkData> skdata = SkData::MakeWithCopy(data, size);
    sk_sp<SkImage> image = SkImage::MakeFromEncoded(skdata);
    SkRect dst = SkRect::MakeXYWH(x, y, w, h);
    _canvas->drawImageRect(image, dst, SkSamplingOptions(SkFilterMode::kLinear), &_paint);
    return Napi::Value();
}

Napi::Value CanvasContext::DrawImageWH(const Napi::CallbackInfo &info)
{
    std::string path = info[0].As<Napi::String>().Utf8Value();
    SkScalar x = info[1].As<Napi::Number>().FloatValue();
    SkScalar y = info[2].As<Napi::Number>().FloatValue();
    SkScalar w = info[3].As<Napi::Number>().FloatValue();
    SkScalar h = info[4].As<Napi::Number>().FloatValue();

    sk_sp<SkImage> image = SkImage::MakeFromEncoded(SkData::MakeFromFileName(path.c_str()));
    SkRect dst = SkRect::MakeXYWH(x, y, w, h);
    _canvas->drawImageRect(image, dst, SkSamplingOptions(SkFilterMode::kLinear), &_paint);
    return Napi::Value();
}

Napi::Value CanvasContext::RoundRect(const Napi::CallbackInfo &info)
{
    SkScalar x = info[0].As<Napi::Number>().FloatValue();
    SkScalar y = info[1].As<Napi::Number>().FloatValue();
    SkScalar w = info[2].As<Napi::Number>().FloatValue();
    SkScalar h = info[3].As<Napi::Number>().FloatValue();

    Napi::Array radiiArray = info[4].As<Napi::Array>();
    SkScalar radii[8];

    for (size_t i = 0; i < 8; i++)
    {
        radii[i] = radiiArray.Get(i).As<Napi::Number>().FloatValue();
    }
    _path.addRoundRect(SkRect::MakeXYWH(x, y, w, h), radii);

    return Napi::Value();
}

Napi::Value CanvasContext::SetLineDash(const Napi::CallbackInfo &info)
{
    Napi::Array segments = info[0].As<Napi::Array>();
    SkScalar* dashSegments = new SkScalar[segments.Length()];
    for (size_t i = 0; i < segments.Length(); i++)
    {
        dashSegments[i] = segments.Get(i).As<Napi::Number>().FloatValue();
    }
    sk_sp<SkPathEffect> skDashPathEffect = SkDashPathEffect::Make(dashSegments, segments.Length(), 0);
    _paint.setPathEffect(skDashPathEffect);
    delete[] dashSegments;
    return Napi::Value();
}

Napi::Value CanvasContext::QuadraticCurveTo(const Napi::CallbackInfo &info) {
    SkScalar cpx = info[0].As<Napi::Number>().FloatValue();
    SkScalar cpy = info[1].As<Napi::Number>().FloatValue();
    SkScalar x = info[2].As<Napi::Number>().FloatValue();
    SkScalar y = info[3].As<Napi::Number>().FloatValue();

    _path.quadTo(cpx, cpy, x, y);
    return Napi::Value();
}

Napi::Value CanvasContext::BezierCurveTo(const Napi::CallbackInfo &info)
{
    SkScalar cp1x = info[0].As<Napi::Number>().FloatValue();
    SkScalar cp1y = info[1].As<Napi::Number>().FloatValue();
    SkScalar cp2x = info[2].As<Napi::Number>().FloatValue();
    SkScalar cp2y = info[3].As<Napi::Number>().FloatValue();
    SkScalar x = info[4].As<Napi::Number>().FloatValue();
    SkScalar y = info[5].As<Napi::Number>().FloatValue();
    _path.cubicTo(cp1x, cp1y, cp2x, cp2y, x, y);
    return Napi::Value();
}

Napi::Value CanvasContext::Clip(const Napi::CallbackInfo &info)
{
    _canvas->clipPath(_path, true);
    return Napi::Value();
}

Napi::Value CanvasContext::SetGlobalAlpha(const Napi::CallbackInfo &info)
{
    float alpha = info[0].As<Napi::Number>().FloatValue();
    _paint.setAlphaf(alpha);
    return Napi::Value();
}
