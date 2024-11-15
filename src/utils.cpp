
#include <iostream>

#include "utils.h"

Napi::Object Utils::Init(Napi::Env env)
{
    Napi::Object obj = Napi::Object::New(env);
    obj.Set(Napi::String::New(env, "RGBA"), Napi::Function::New(env, Utils::RGBA));
    obj.Set(Napi::String::New(env, "colorMap"), Napi::Function::New(env, Utils::ColorMap));
    return obj;
}

Napi::Value Utils::RGBA(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    int r = info[0].As<Napi::Number>().Int32Value();
    int g = info[1].As<Napi::Number>().Int32Value();
    int b = info[2].As<Napi::Number>().Int32Value();
    int a = info[3].As<Napi::Number>().Int32Value();
    if (a == 255)
    {
        return Napi::Number::New(env, SkColorSetRGB(r, g, b));
    }

    return Napi::Number::New(env, SkColorSetARGB(a, r, g, b));
}

Napi::Value Utils::ColorMap(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    Napi::Object obj = Napi::Object::New(env);

    obj.Set("black", Napi::Number::New(env, SkColorSetRGB(0x00, 0x00, 0x00)));
    obj.Set("silver", Napi::Number::New(env, SkColorSetRGB(0xC0, 0xC0, 0xC0)));
    obj.Set("gray", Napi::Number::New(env, SkColorSetRGB(0x80, 0x80, 0x80)));
    obj.Set("white", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xFF, 0xFF)));
    obj.Set("maroon", Napi::Number::New(env, SkColorSetRGB(0x80, 0x00, 0x00)));
    obj.Set("red", Napi::Number::New(env, SkColorSetRGB(0xFF, 0x00, 0x00)));
    obj.Set("purple", Napi::Number::New(env, SkColorSetRGB(0x80, 0x00, 0x80)));
    obj.Set("fuchsia", Napi::Number::New(env, SkColorSetRGB(0xFF, 0x00, 0xFF)));
    obj.Set("green", Napi::Number::New(env, SkColorSetRGB(0x00, 0x80, 0x00)));
    obj.Set("lime", Napi::Number::New(env, SkColorSetRGB(0x00, 0xFF, 0x00)));
    obj.Set("olive", Napi::Number::New(env, SkColorSetRGB(0x80, 0x80, 0x00)));
    obj.Set("yellow", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xFF, 0x80)));
    obj.Set("navy", Napi::Number::New(env, SkColorSetRGB(0x00, 0x00, 0x80)));
    obj.Set("blue", Napi::Number::New(env, SkColorSetRGB(0x00, 0x00, 0xFF)));
    obj.Set("teal", Napi::Number::New(env, SkColorSetRGB(0x00, 0x80, 0x80)));
    obj.Set("Teal", Napi::Number::New(env, SkColorSetRGB(0x00, 0x80, 0x80)));
    obj.Set("aqua", Napi::Number::New(env, SkColorSetRGB(0x00, 0xFF, 0xFF)));
    obj.Set("aliceblue", Napi::Number::New(env, SkColorSetRGB(0xF0, 0xF8, 0xFF)));
    obj.Set("antiquewhite", Napi::Number::New(env, SkColorSetRGB(0xFA, 0xEB, 0xD7)));
    obj.Set("aquamarine", Napi::Number::New(env, SkColorSetRGB(0x7F, 0xFF, 0xD4)));
    obj.Set("azure", Napi::Number::New(env, SkColorSetRGB(0xF0, 0xFF, 0xFF)));
    obj.Set("beige", Napi::Number::New(env, SkColorSetRGB(0xF5, 0xF5, 0xDC)));
    obj.Set("bisque", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xE4, 0xC4)));
    obj.Set("blanchedalmond", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xEB, 0xCD)));
    obj.Set("blueviolet", Napi::Number::New(env, SkColorSetRGB(0x8A, 0x2B, 0xE2)));
    obj.Set("brown", Napi::Number::New(env, SkColorSetRGB(0xA5, 0x2A, 0x2A)));
    obj.Set("burlywood", Napi::Number::New(env, SkColorSetRGB(0xDE, 0xB8, 0x87)));
    obj.Set("cadetblue", Napi::Number::New(env, SkColorSetRGB(0x5F, 0x9E, 0xA0)));
    obj.Set("chartreuse", Napi::Number::New(env, SkColorSetRGB(0x7F, 0xFF, 0x00)));
    obj.Set("chocolate", Napi::Number::New(env, SkColorSetRGB(0xD2, 0x69, 0x1E)));
    obj.Set("coral", Napi::Number::New(env, SkColorSetRGB(0xFF, 0x7F, 0x50)));
    obj.Set("cornflowerblue", Napi::Number::New(env, SkColorSetRGB(0x64, 0x95, 0xED)));
    obj.Set("cornsilk", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xF8, 0xDC)));
    obj.Set("crimson", Napi::Number::New(env, SkColorSetRGB(0xDC, 0x14, 0x3C)));
    obj.Set("cyan", Napi::Number::New(env, SkColorSetRGB(0x00, 0xFF, 0xFF)));
    obj.Set("darkblue", Napi::Number::New(env, SkColorSetRGB(0x00, 0x00, 0x8B)));
    obj.Set("darkcyan", Napi::Number::New(env, SkColorSetRGB(0x00, 0x8B, 0x8B)));
    obj.Set("darkgoldenrod", Napi::Number::New(env, SkColorSetRGB(0xB8, 0x86, 0x0B)));
    obj.Set("darkgray", Napi::Number::New(env, SkColorSetRGB(0xA9, 0xA9, 0xA9)));
    obj.Set("darkgreen", Napi::Number::New(env, SkColorSetRGB(0x00, 0x64, 0x00)));
    obj.Set("darkgrey", Napi::Number::New(env, SkColorSetRGB(0xA9, 0xA9, 0xA9)));
    obj.Set("darkkhaki", Napi::Number::New(env, SkColorSetRGB(0xBD, 0xB7, 0x6B)));
    obj.Set("darkmagenta", Napi::Number::New(env, SkColorSetRGB(0x8B, 0x00, 0x8B)));
    obj.Set("darkolivegreen", Napi::Number::New(env, SkColorSetRGB(0x55, 0x6B, 0x2F)));
    obj.Set("darkorange", Napi::Number::New(env, SkColorSetRGB(0xFF, 0x8C, 0x00)));
    obj.Set("darkorchid", Napi::Number::New(env, SkColorSetRGB(0x99, 0x32, 0xCC)));
    obj.Set("darkred", Napi::Number::New(env, SkColorSetRGB(0x8B, 0x00, 0x00)));
    obj.Set("darksalmon", Napi::Number::New(env, SkColorSetRGB(0xE9, 0x96, 0x7A)));
    obj.Set("darkseagreen", Napi::Number::New(env, SkColorSetRGB(0x8F, 0xBC, 0x8F)));
    obj.Set("darkslateblue", Napi::Number::New(env, SkColorSetRGB(0x48, 0x3D, 0x8B)));
    obj.Set("darkslategray", Napi::Number::New(env, SkColorSetRGB(0x2F, 0x4F, 0x4F)));
    obj.Set("darkslategrey", Napi::Number::New(env, SkColorSetRGB(0x2F, 0x4F, 0x4F)));
    obj.Set("darkturquoise", Napi::Number::New(env, SkColorSetRGB(0x00, 0xCE, 0xD1)));
    obj.Set("darkviolet", Napi::Number::New(env, SkColorSetRGB(0x94, 0x00, 0xD3)));
    obj.Set("deeppink", Napi::Number::New(env, SkColorSetRGB(0xFF, 0x14, 0x93)));
    obj.Set("deepskyblue", Napi::Number::New(env, SkColorSetRGB(0x00, 0xBF, 0xFF)));
    obj.Set("dimgray", Napi::Number::New(env, SkColorSetRGB(0x69, 0x69, 0x69)));
    obj.Set("dimgrey", Napi::Number::New(env, SkColorSetRGB(0x69, 0x69, 0x69)));
    obj.Set("dodgerblue", Napi::Number::New(env, SkColorSetRGB(0x1E, 0x90, 0xFF)));
    obj.Set("firebrick", Napi::Number::New(env, SkColorSetRGB(0xB2, 0x22, 0x22)));
    obj.Set("floralwhite", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xFA, 0xF0)));
    obj.Set("forestgreen", Napi::Number::New(env, SkColorSetRGB(0x22, 0x8B, 0x22)));
    obj.Set("fuchsia", Napi::Number::New(env, SkColorSetRGB(0xFF, 0X00, 0xFF)));
    obj.Set("gainsboro", Napi::Number::New(env, SkColorSetRGB(0xDC, 0xDC, 0xDC)));
    obj.Set("ghostwhite", Napi::Number::New(env, SkColorSetRGB(0xF8, 0xF8, 0xFF)));
    obj.Set("gold", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xD7, 0x00)));
    obj.Set("goldenrod", Napi::Number::New(env, SkColorSetRGB(0xDA, 0xA5, 0x20)));
    obj.Set("greenyellow", Napi::Number::New(env, SkColorSetRGB(0xAD, 0xFF, 0x2F)));
    obj.Set("grey", Napi::Number::New(env, SkColorSetRGB(0x80, 0x80, 0x80)));
    obj.Set("honeydew", Napi::Number::New(env, SkColorSetRGB(0xF0, 0xFF, 0xF0)));
    obj.Set("hotpink", Napi::Number::New(env, SkColorSetRGB(0xFF, 0x69, 0xB4)));
    obj.Set("indianred", Napi::Number::New(env, SkColorSetRGB(0xCD, 0x5C, 0x5C)));
    obj.Set("indigo", Napi::Number::New(env, SkColorSetRGB(0x4B, 0x00, 0x82)));
    obj.Set("ivory", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xFF, 0xF0)));
    obj.Set("khaki", Napi::Number::New(env, SkColorSetRGB(0xF0, 0xE6, 0x8C)));
    obj.Set("lavender", Napi::Number::New(env, SkColorSetRGB(0xE6, 0xE6, 0xFA)));
    obj.Set("lavenderblush", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xF0, 0xF5)));
    obj.Set("lawngreen", Napi::Number::New(env, SkColorSetRGB(0x7C, 0xFC, 0x00)));
    obj.Set("lemonchiffon", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xFA, 0xCD)));
    obj.Set("lightblue", Napi::Number::New(env, SkColorSetRGB(0xAD, 0xD8, 0xE6)));
    obj.Set("lightcoral", Napi::Number::New(env, SkColorSetRGB(0xF0, 0x80, 0x80)));
    obj.Set("lightcyan", Napi::Number::New(env, SkColorSetRGB(0xE0, 0xFF, 0xFF)));
    obj.Set("lightgoldenrodyellow", Napi::Number::New(env, SkColorSetRGB(0xFA, 0xFA, 0xD2)));
    obj.Set("lightgray", Napi::Number::New(env, SkColorSetRGB(0xD3, 0xD3, 0xD3)));
    obj.Set("lightgreen", Napi::Number::New(env, SkColorSetRGB(0x90, 0xEE, 0x90)));
    obj.Set("lightgrey", Napi::Number::New(env, SkColorSetRGB(0xD3, 0xD3, 0xD3)));
    obj.Set("lightpink", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xB6, 0xC1)));
    obj.Set("lightsalmon", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xA0, 0x7A)));
    obj.Set("lightseagreen", Napi::Number::New(env, SkColorSetRGB(0x20, 0xB2, 0xAA)));
    obj.Set("lightskyblue", Napi::Number::New(env, SkColorSetRGB(0x87, 0xCE, 0xFA)));
    obj.Set("lightslategray", Napi::Number::New(env, SkColorSetRGB(0x77, 0x88, 0x99)));
    obj.Set("lightslategrey", Napi::Number::New(env, SkColorSetRGB(0x77, 0x88, 0x99)));
    obj.Set("lightsteelblue", Napi::Number::New(env, SkColorSetRGB(0xB0, 0xC4, 0xDE)));
    obj.Set("lightyellow", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xFF, 0xE0)));
    obj.Set("limegreen", Napi::Number::New(env, SkColorSetRGB(0x32, 0xCD, 0x32)));
    obj.Set("linen", Napi::Number::New(env, SkColorSetRGB(0xFA, 0xF0, 0xE6)));
    obj.Set("magenta", Napi::Number::New(env, SkColorSetRGB(0xFF, 0x00, 0xFF)));
    obj.Set("mediumaquamarine", Napi::Number::New(env, SkColorSetRGB(0x66, 0xCD, 0xAA)));
    obj.Set("mediumblue", Napi::Number::New(env, SkColorSetRGB(0x00, 0x00, 0xCD)));
    obj.Set("mediumorchid", Napi::Number::New(env, SkColorSetRGB(0xBA, 0x55, 0xD3)));
    obj.Set("mediumpurple", Napi::Number::New(env, SkColorSetRGB(0x93, 0x70, 0xDB)));
    obj.Set("mediumseagreen", Napi::Number::New(env, SkColorSetRGB(0x3C, 0xB3, 0x71)));
    obj.Set("mediumslateblue", Napi::Number::New(env, SkColorSetRGB(0x7B, 0x68, 0xEE)));
    obj.Set("mediumspringgreen", Napi::Number::New(env, SkColorSetRGB(0x00, 0xFA, 0x9A)));
    obj.Set("mediumturquoise", Napi::Number::New(env, SkColorSetRGB(0x48, 0xD1, 0xCC)));
    obj.Set("mediumvioletred", Napi::Number::New(env, SkColorSetRGB(0xC7, 0x15, 0x85)));
    obj.Set("midnightblue", Napi::Number::New(env, SkColorSetRGB(0x19, 0x19, 0x70)));
    obj.Set("mintcream", Napi::Number::New(env, SkColorSetRGB(0xF5, 0xFF, 0xFA)));
    obj.Set("mistyrose", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xE4, 0xE1)));
    obj.Set("moccasin", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xE4, 0xB5)));
    obj.Set("navajowhite", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xDE, 0xAD)));
    obj.Set("navy", Napi::Number::New(env, SkColorSetRGB(0x00, 0x00, 0x80)));
    obj.Set("oldlace", Napi::Number::New(env, SkColorSetRGB(0xFD, 0xF5, 0xE6)));
    obj.Set("olivedrab", Napi::Number::New(env, SkColorSetRGB(0x6B, 0x8E, 0x23)));
    obj.Set("orange", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xA5, 0x00)));
    obj.Set("orangered", Napi::Number::New(env, SkColorSetRGB(0xFF, 0x45, 0x00)));
    obj.Set("orchid", Napi::Number::New(env, SkColorSetRGB(0xDA, 0x70, 0xD6)));
    obj.Set("palegoldenrod", Napi::Number::New(env, SkColorSetRGB(0xEE, 0xE8, 0xAA)));
    obj.Set("palegreen", Napi::Number::New(env, SkColorSetRGB(0x98, 0xFB, 0x98)));
    obj.Set("paleturquoise", Napi::Number::New(env, SkColorSetRGB(0xAF, 0xEE, 0xEE)));
    obj.Set("palevioletred", Napi::Number::New(env, SkColorSetRGB(0xDB, 0x70, 0x93)));
    obj.Set("papayawhip", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xEF, 0xD5)));
    obj.Set("peachpuff", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xDA, 0xB9)));
    obj.Set("peru", Napi::Number::New(env, SkColorSetRGB(0xCD, 0x85, 0x3F)));
    obj.Set("pink", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xC0, 0xCB)));
    obj.Set("plum", Napi::Number::New(env, SkColorSetRGB(0xDD, 0xA0, 0xDD)));
    obj.Set("powderblue", Napi::Number::New(env, SkColorSetRGB(0xB0, 0xE0, 0xE6)));
    obj.Set("rebeccapurple", Napi::Number::New(env, SkColorSetRGB(0x66, 0x33, 0x99)));
    obj.Set("rosybrown", Napi::Number::New(env, SkColorSetRGB(0xBC, 0x8F, 0x8F)));
    obj.Set("royalblue", Napi::Number::New(env, SkColorSetRGB(0x41, 0x69, 0xE1)));
    obj.Set("saddlebrown", Napi::Number::New(env, SkColorSetRGB(0x8B, 0x45, 0x13)));
    obj.Set("salmon", Napi::Number::New(env, SkColorSetRGB(0xFA, 0x80, 0x72)));
    obj.Set("sandybrown", Napi::Number::New(env, SkColorSetRGB(0xF4, 0xA4, 0x60)));
    obj.Set("seagreen", Napi::Number::New(env, SkColorSetRGB(0x2E, 0x8B, 0x57)));
    obj.Set("seashell", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xF5, 0xEE)));
    obj.Set("sienna", Napi::Number::New(env, SkColorSetRGB(0xA0, 0x52, 0x2D)));
    obj.Set("silver", Napi::Number::New(env, SkColorSetRGB(0xC0, 0xC0, 0xC0)));
    obj.Set("skyblue", Napi::Number::New(env, SkColorSetRGB(0x87, 0xCE, 0xEB)));
    obj.Set("slateblue", Napi::Number::New(env, SkColorSetRGB(0x6A, 0x5A, 0xCD)));
    obj.Set("slategray", Napi::Number::New(env, SkColorSetRGB(0x70, 0x80, 0x90)));
    obj.Set("slategrey", Napi::Number::New(env, SkColorSetRGB(0x70, 0x80, 0x90)));
    obj.Set("snow", Napi::Number::New(env, SkColorSetRGB(0xFF, 0xFA, 0xFA)));
    obj.Set("springgreen", Napi::Number::New(env, SkColorSetRGB(0x00, 0xFF, 0x7F)));
    obj.Set("steelblue", Napi::Number::New(env, SkColorSetRGB(0x46, 0x82, 0xB4)));
    obj.Set("tan", Napi::Number::New(env, SkColorSetRGB(0xD2, 0xB4, 0x8C)));
    obj.Set("thistle", Napi::Number::New(env, SkColorSetRGB(0xD8, 0xBF, 0xD8)));
    obj.Set("tomato", Napi::Number::New(env, SkColorSetRGB(0xFF, 0x63, 0x47)));
    obj.Set("transparent", Napi::Number::New(env, SkColorSetARGB(0, 0, 0, 0)));
    obj.Set("turquoise", Napi::Number::New(env, SkColorSetRGB(0x40, 0xE0, 0xD0)));
    obj.Set("violet", Napi::Number::New(env, SkColorSetRGB(0xEE, 0x82, 0xEE)));
    obj.Set("wheat", Napi::Number::New(env, SkColorSetRGB(0xF5, 0xDE, 0xB3)));
    obj.Set("whitesmoke", Napi::Number::New(env, SkColorSetRGB(0xF5, 0xF5, 0xF5)));
    obj.Set("yellowgreen", Napi::Number::New(env, SkColorSetRGB(0x9A, 0xCD, 0x32)));

    return obj;
}
