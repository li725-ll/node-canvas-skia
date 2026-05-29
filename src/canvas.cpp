#define STB_IMAGE_IMPLEMENTATION
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include <iostream>
#include "canvas.h"
#include "stb_image.h"
#include "stb_image_write.h"
#ifdef _WIN32
#include <windows.h>
#endif

#ifdef _WIN32
static FILE* fopen_utf8(const char* path, const char* mode) {
    int wpath_len = MultiByteToWideChar(CP_UTF8, 0, path, -1, NULL, 0);
    int wmode_len = MultiByteToWideChar(CP_UTF8, 0, mode, -1, NULL, 0);
    std::wstring wpath(wpath_len, 0);
    std::wstring wmode(wmode_len, 0);
    MultiByteToWideChar(CP_UTF8, 0, path, -1, &wpath[0], wpath_len);
    MultiByteToWideChar(CP_UTF8, 0, mode, -1, &wmode[0], wmode_len);
    return _wfopen(wpath.c_str(), wmode.c_str());
}
#else
static FILE* fopen_utf8(const char* path, const char* mode) {
    return fopen(path, mode);
}
#endif

Napi::Function Canvas::Init(Napi::Env env)
{
    CanvasContext::Init(env); // Initialize the CanvasContext class
    Napi::Function func = DefineClass(
        env,
        "Canvas",
        {InstanceMethod("getContext", &Canvas::GetContext),
            InstanceMethod("saveAsImage", &Canvas::SaveAsImage),
            InstanceMethod("toBuffer", &Canvas::ToBuffer),
            InstanceMethod("save", &Canvas::Save),
            InstanceMethod("restore", &Canvas::Restore)});

    Napi::FunctionReference *constructor = new Napi::FunctionReference();
    *constructor = Napi::Persistent(func);
    env.SetInstanceData(constructor);

    return func;
}

Canvas::Canvas(const Napi::CallbackInfo &info)
: Napi::ObjectWrap<Canvas>(info)
{
    Napi::Env env = info.Env();
    _context = Napi::Persistent(CanvasContext::constructor->Value().New({}));
    int width = info[0].As<Napi::Number>().Int32Value();
    int height = info[1].As<Napi::Number>().Int32Value();
    int GPU = info[2].As<Napi::Number>().Int32Value(); // 0: CPU, 1: GPU, 2: Auto
    if(GPU == 0 ) {
        _surface = SkSurface::MakeRasterN32Premul(width, height);
    } else if (GPU == 1) {
#ifdef _WIN32
        CreateOpenGLContext();

        sk_sp<GrDirectContext> context = GrDirectContext::MakeGL();
        if (!context)
        {
        Napi::TypeError::New(env, "OpenGL context retrieval failed").ThrowAsJavaScriptException();
        return;
        }
        SkImageInfo info = SkImageInfo::MakeN32Premul(width, height);
        _surface = SkSurface::MakeRenderTarget(context.get(), SkBudgeted::kNo, info);
        if (!_surface)
        {
        Napi::TypeError::New(env, "SkSurface::MakeRenderTarget returned null").ThrowAsJavaScriptException();
        return;
        }
#endif

#ifdef __APPLE__
    Napi::Error::New(env, "GPU not supported on this platform").ThrowAsJavaScriptException();
    return;
#endif
    }
}

Napi::Value Canvas::GetContext(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    std::string contextType = info[0].ToString().Utf8Value();
    Napi::Object args1 = info[1].As<Napi::Object>();
    ContextAttributesStruct contextAttributes;
    if (info.Length() > 1)
    {
        contextAttributes.depth = args1.Get("depth").ToBoolean();
        contextAttributes.antialias = args1.As<Napi::Object>().Get("antialias").ToBoolean();
    }

    if(contextType != "2d") {
        Napi::TypeError::New(env, "Invalid context type").ThrowAsJavaScriptException();
        return env.Null();
    }

    CanvasContext *context = CanvasContext::Unwrap(_context.Value().ToObject());
    context->SetSurface(_surface);
    context->SetContextAttributes(contextAttributes.antialias, contextAttributes.depth);

    return _context.Value();
}

Napi::Value Canvas::Save(const Napi::CallbackInfo &info)
{
    _surface->getCanvas()->save();
    return Napi::Value();
}

Napi::Value Canvas::Restore(const Napi::CallbackInfo &info)
{
    _surface->getCanvas()->restore();
    return Napi::Value();
}

void write_to_memory(void *context, void *data, int size)
{
    std::vector<uint8_t> *buffer = static_cast<std::vector<uint8_t> *>(context);
    unsigned char *byte = static_cast<unsigned char *>(data);
    buffer->insert(buffer->end(), byte, byte + size);
}

Napi::Value Canvas::SaveAsImage(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    std::string path = info[0].As<Napi::String>().Utf8Value();
    std::string format = info[1].As<Napi::String>().Utf8Value();
    int quality = info[2].As<Napi::Number>().Int32Value();

    if (format == "bmp")
    {
        SkPixmap pixmap;
        if (!_surface->peekPixels(&pixmap)) {
            Napi::Error::New(env, "Failed to read surface pixels").ThrowAsJavaScriptException();
            return env.Undefined();
        }
        int width = pixmap.width();
        int height = pixmap.height();
        std::vector<uint8_t> rgba(width * height * 4);
        SkImageInfo dstInfo = SkImageInfo::Make(width, height, kRGBA_8888_SkColorType, kUnpremul_SkAlphaType);
        if (!pixmap.readPixels(dstInfo, rgba.data(), width * 4, 0, 0)) {
            Napi::Error::New(env, "Failed to convert pixels").ThrowAsJavaScriptException();
            return env.Undefined();
        }
        std::vector<uint8_t> bmp_buffer;
        bmp_buffer.reserve(width * height * 4 + 54);
        stbi_write_bmp_to_func(write_to_memory, &bmp_buffer, width, height, 4, rgba.data());
        FILE *f = fopen_utf8(path.c_str(), "wb");
        if (!f) {
            Napi::Error::New(env, "Failed to open file: " + path).ThrowAsJavaScriptException();
            return env.Undefined();
        }
        fwrite(bmp_buffer.data(), bmp_buffer.size(), 1, f);
        fclose(f);
        return Napi::Boolean::New(env, true);
    }

    SkEncodedImageFormat imageFormat = SkEncodedImageFormat::kPNG;
    if (format == "png")
    {
        imageFormat = SkEncodedImageFormat::kPNG;
    }
    else if (format == "jpg")
    {
        imageFormat = SkEncodedImageFormat::kJPEG;
    }
    else if (format == "webp")
    {
        imageFormat = SkEncodedImageFormat::kWEBP;
    }
    else
    {
        Napi::Error::New(env, "Unsupported image format").ThrowAsJavaScriptException();
        return env.Undefined();
    }

    sk_sp<SkImage> image = _surface.get()->makeImageSnapshot();
    sk_sp<SkData> data = image->encodeToData(imageFormat, quality);

    FILE *f = fopen_utf8(path.c_str(), "wb");
    if (!f) {
        Napi::Error::New(env, "Failed to open file: " + path).ThrowAsJavaScriptException();
        return env.Undefined();
    }
    fwrite(data->data(), data->size(), 1, f);
    fclose(f);
    return Napi::Boolean::New(env, true);
}

Napi::Value Canvas::ToBuffer(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    std::string format = info[0].As<Napi::String>().Utf8Value();
    int quality = info[1].As<Napi::Number>().Int32Value();

    if (format == "bmp" || format == "matrix")
    {
        SkPixmap pixmap;
        if (!_surface->peekPixels(&pixmap)) {
            Napi::Error::New(env, "Failed to read surface pixels").ThrowAsJavaScriptException();
            return env.Undefined();
        }
        int width = pixmap.width();
        int height = pixmap.height();
        std::vector<uint8_t> rgba(width * height * 4);
        SkImageInfo dstInfo = SkImageInfo::Make(width, height, kRGBA_8888_SkColorType, kUnpremul_SkAlphaType);
        if (!pixmap.readPixels(dstInfo, rgba.data(), width * 4, 0, 0)) {
            Napi::Error::New(env, "Failed to convert pixels").ThrowAsJavaScriptException();
            return env.Undefined();
        }

        if (format == "matrix") {
            Napi::Buffer<uint8_t> result = Napi::Buffer<uint8_t>::New(env, width * height * 3);
            uint8_t *dst = result.Data();
            for (int i = 0; i < width * height; i++) {
                dst[i * 3]     = rgba[i * 4];
                dst[i * 3 + 1] = rgba[i * 4 + 1];
                dst[i * 3 + 2] = rgba[i * 4 + 2];
            }
            return result;
        } else {
            std::vector<uint8_t> bmp_buffer;
            bmp_buffer.reserve(width * height * 4 + 54);
            stbi_write_bmp_to_func(write_to_memory, &bmp_buffer, width, height, 4, rgba.data());
            Napi::Buffer<uint8_t> result = Napi::Buffer<uint8_t>::New(env, bmp_buffer.size());
            memcpy(result.Data(), bmp_buffer.data(), bmp_buffer.size());
            return result;
        }
    }

    SkEncodedImageFormat imageFormat = SkEncodedImageFormat::kPNG;
    if (format == "png")
    {
        imageFormat = SkEncodedImageFormat::kPNG;
    }
    else if (format == "jpg")
    {
        imageFormat = SkEncodedImageFormat::kJPEG;
    }
    else if (format == "webp")
    {
        imageFormat = SkEncodedImageFormat::kWEBP;
    }
    else
    {
        Napi::Error::New(env, "Unsupported image format").ThrowAsJavaScriptException();
        return env.Undefined();
    }

    sk_sp<SkImage> image = _surface.get()->makeImageSnapshot();
    sk_sp<SkData> data = image->encodeToData(imageFormat, quality);

    Napi::Buffer<uint8_t> buffer = Napi::Buffer<uint8_t>::Copy(env, (uint8_t*)data->data(), data->size());
    return buffer;
}
