#include "canvas.h"
#include "context.h"

Napi::Function Canvas::Init(Napi::Env env)
{
  Napi::Function func = DefineClass(
      env,
      "Canvas",
      {InstanceMethod("getContext", &Canvas::GetContext),
       InstanceMethod("saveAsImage", &Canvas::SaveAsImage)});

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
  _surface = SkSurface::MakeRasterN32Premul(width, height);
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
  const char *path = info[0].As<Napi::String>().Utf8Value().c_str();

  sk_sp<SkImage> image = _surface.get()->makeImageSnapshot();
  sk_sp<SkData> data = image->encodeToData(SkEncodedImageFormat::kJPEG, 90);

  FILE *f = fopen(path, "wb");
  fwrite(data->data(), data->size(), 1, f);
  fclose(f);
  return Napi::Boolean::New(env, true);
}
