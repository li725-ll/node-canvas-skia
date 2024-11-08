#include <iostream>
#include "canvas.h"

Napi::Function Canvas::Init(Napi::Env env)
{
  Napi::Function func = DefineClass(
      env,
      "Canvas",
      {InstanceMethod("getContext", &Canvas::GetContext),
       InstanceMethod("saveAsImage", &Canvas::SaveAsImage),
       InstanceMethod("toBuffer", &Canvas::ToBuffer)});

  Napi::FunctionReference *constructor = new Napi::FunctionReference();
  *constructor = Napi::Persistent(func);
  env.SetInstanceData(constructor);

  return func;
}

Canvas::Canvas(const Napi::CallbackInfo &info)
: Napi::ObjectWrap<Canvas>(info), _context(Napi::Persistent(CanvasContext::CanvasContext2Object(info.Env())))
{
  Napi::Env env = info.Env();

  int width = info[0].As<Napi::Number>().Int32Value();
  int height = info[1].As<Napi::Number>().Int32Value();
  int GPU = info[2].As<Napi::Number>().Int32Value(); // 0: CPU, 1: GPU, 2: Auto
  if(GPU == 0 ) {
    _surface = SkSurface::MakeRasterN32Premul(width, height);
  } else if (GPU == 1) {
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

Napi::Value Canvas::SaveAsImage(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  std::string path = info[0].As<Napi::String>().Utf8Value();
  std::string format = info[1].As<Napi::String>().Utf8Value();
  int quality = info[2].As<Napi::Number>().Int32Value();

  SkEncodedImageFormat imageFormat = SkEncodedImageFormat::kPNG;

  if (format == "bmp")
  {
    imageFormat = SkEncodedImageFormat::kBMP;
  } else if (format == "gif") {
    imageFormat = SkEncodedImageFormat::kGIF;
  } else if (format == "ico") {
    imageFormat = SkEncodedImageFormat::kICO;
  } else if (format == "png") {
    imageFormat = SkEncodedImageFormat::kPNG;
  } else if (format == "wbmp") {
    imageFormat = SkEncodedImageFormat::kWBMP;
  } else if (format == "webp") {
    imageFormat = SkEncodedImageFormat::kWEBP;
  } else
  {
    Napi::Error::New(env, "Unsupported image format").ThrowAsJavaScriptException();
    return env.Undefined();
  }

  sk_sp<SkImage> image = _surface.get()->makeImageSnapshot();
  sk_sp<SkData> data = image->encodeToData(imageFormat, quality);

  FILE *f = fopen(path.c_str(), "wb");
  fwrite(data->data(), data->size(), 1, f);
  fclose(f);
  return Napi::Boolean::New(env, true);
}

Napi::Value Canvas::ToBuffer(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();

  std::string format = info[0].As<Napi::String>().Utf8Value();
  int quality = info[1].As<Napi::Number>().Int32Value();

  SkEncodedImageFormat imageFormat = SkEncodedImageFormat::kPNG;

  if (format == "bmp")
  {
    imageFormat = SkEncodedImageFormat::kBMP;
  }
  else if (format == "gif")
  {
    imageFormat = SkEncodedImageFormat::kGIF;
  }
  else if (format == "ico")
  {
    imageFormat = SkEncodedImageFormat::kICO;
  }
  else if (format == "png")
  {
    imageFormat = SkEncodedImageFormat::kPNG;
  }
  else if (format == "wbmp")
  {
    imageFormat = SkEncodedImageFormat::kWBMP;
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
  buffer.Set("length", data->size());
  memcpy(buffer.Data(), data->data(), data->size());

  return buffer;
}
