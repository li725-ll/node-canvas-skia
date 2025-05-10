#pragma once
#ifndef __CANVAS_H__
#define __CANVAS_H__

#include <napi.h>
#include <include/core/SkData.h>
#include <include/core/SkImage.h>
#include <include/core/SkTypes.h>
#include <include/core/SkCanvas.h>
#include <include/core/SkSurface.h>
#include <include/gpu/GrDirectContext.h>
#include <include/gpu/gl/GrGLInterface.h>

#include "context.h"
#include "opengl.h"

class Canvas : public Napi::ObjectWrap<Canvas>
{
private:
    sk_sp<SkSurface> _surface;
    Napi::ObjectReference _context;

    Napi::Value GetContext(const Napi::CallbackInfo &info);
    Napi::Value SaveAsImage(const Napi::CallbackInfo &info);
    Napi::Value ToBuffer(const Napi::CallbackInfo &info);
    Napi::Value Save(const Napi::CallbackInfo &info);
    Napi::Value Restore(const Napi::CallbackInfo &info);
public:
    static Napi::Function Init(Napi::Env env);
    Canvas(const Napi::CallbackInfo &info);
    ~Canvas() {
        _context.Reset();
    };
};

#endif
