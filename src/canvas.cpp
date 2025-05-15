#define STB_IMAGE_IMPLEMENTATION
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include <iostream>
#include "canvas.h"
#include "stb_image.h"
#include "stb_image_write.h"

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
    context->SetCanvas(_surface->getCanvas());
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

Napi::Value Canvas::SaveAsImage(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    std::string path = info[0].As<Napi::String>().Utf8Value();
    std::string format = info[1].As<Napi::String>().Utf8Value();
    int quality = info[2].As<Napi::Number>().Int32Value();

    SkEncodedImageFormat imageFormat = SkEncodedImageFormat::kPNG;

    if (format == "png" || format == "bmp")
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

    if (format == "bmp")
    {
        int width, height, channels;
        unsigned char *image_data = stbi_load_from_memory((stbi_uc *)data->data(), data->size(), &width, &height, &channels, 0);
        stbi_write_bmp(path.c_str(), width, height, channels, image_data);
        stbi_image_free(image_data);
        return Napi::Boolean::New(env, true);
    }

    FILE *f = fopen(path.c_str(), "wb");
    fwrite(data->data(), data->size(), 1, f);
    fclose(f);
    return Napi::Boolean::New(env, true);
}

void write_to_memory(void *context, void *data, int size)
{
    std::vector<uint8_t> *buffer = static_cast<std::vector<uint8_t> *>(context);
    unsigned char *byte = static_cast<unsigned char *>(data);
    buffer->insert(buffer->end(), byte, byte + size);
}

Napi::Value Canvas::ToBuffer(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    std::string format = info[0].As<Napi::String>().Utf8Value();
    int quality = info[1].As<Napi::Number>().Int32Value();

    SkEncodedImageFormat imageFormat = SkEncodedImageFormat::kPNG;

    if (format == "png" || format == "bmp")
    {
        imageFormat = SkEncodedImageFormat::kPNG;
    }
    else if (format == "jpg" || format == "matrix")
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

    Napi::Buffer<uint8_t> buffer = Napi::Buffer<uint8_t>::New(env, data->size());

    if (format == "bmp" || format == "matrix")
    {
        int width, height, channels;
        std::vector buffer = std::vector<unsigned char>();
        unsigned char *image_data = stbi_load_from_memory((stbi_uc *)data->data(), data->size(), &width, &height, &channels, 0);
        if (format == "matrix") {
            Napi::Buffer<uint8_t> result = Napi::Buffer<uint8_t>::New(env, width * height * 3);

            if (channels == 4)
            {
                std::vector<uint8_t> buffer;
                for (long i = 0; i < width * height; i++)
                {
                    if (i == 0 || i % 3 != 0)
                    {
                        buffer.push_back(image_data[i]);
                    }
                }

                memcpy(result.Data(), buffer.data(), width * height * 3);
                stbi_image_free(image_data);
                return result;
            }
            else if (channels != 3)
            {
                stbi_image_free(image_data);
                Napi::TypeError::New(env, "Invalid channels").ThrowAsJavaScriptException();
                return env.Null();
            }

            memcpy(result.Data(), image_data, width * height * 3);
            stbi_image_free(image_data);

            return result;
        } else {
            stbi_write_bmp_to_func(write_to_memory, &buffer, width, height, channels, image_data);

            Napi::Buffer<uint8_t> result = Napi::Buffer<uint8_t>::New(env, buffer.size());
            memcpy(result.Data(), buffer.data(), buffer.size());
            stbi_image_free(image_data);

            return result;
        }
    }

    buffer.Set("length", data->size());
    memcpy(buffer.Data(), data->data(), data->size());
    return buffer;
}
