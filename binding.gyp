{
  'targets': [
    {
      'target_name': 'skia-native',
      'sources': [ 'src/main.cpp', 'src/utils.cpp', 'src/canvas.cpp', 'src/context.cpp' ],
      'include_dirs': [
        "<!@(node -p \"require('node-addon-api').include\")",
        "library/Skia-m93-87e8842e8c-windows-Release-x64"
      ],
      'conditions': [
        [
          'os=="win"' and 'target_arch=="x64"',
          {
            'libraries': [
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\d3d12allocator.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\expat.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\freetype2.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\harfbuzz.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\icu.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\libjpeg.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\libpng.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\libwebp_sse41.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\libwebp.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\particles.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\skia.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\skottie.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\skparagraph.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\skresources.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\sksg.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\skshaper.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\spirv_cross.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\svg.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\zlib.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\d3d12.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\d3dcompiler.lib',
              '..\\library\\Skia-m93-87e8842e8c-windows-Release-x64\\out\\Release-x64\\OpenGL32.lib'
            ]
          }
        ],
        [
          'os=="drawin"' and 'target_arch=="arm64"',
          {
            "xcode_settings":{
              "FRAMEWORK_SEARCH_PATHS":[
                "/System/Library/Frameworks/Metal.framework",
                "/System/Library/Frameworks/MetalKit.framework"
              ],
              "OTHER_CFLAGS":[
                "-I/System/Library/Frameworks/Metal.framework/Headers",
                "-I/System/Library/Frameworks/MetalKit.framework/Headers"
              ]
            },
            'libraries': [
              '-framework Metal',
              '-framework MetalKit',
              '../library/Skia-m93-87e8842e8c-macos-Release-arm64/out/Release-arm64/libdng_sdk.a',
              '../library/Skia-m93-87e8842e8c-macos-Release-arm64/out/Release-arm64/libexpat.a',
              '../library/Skia-m93-87e8842e8c-macos-Release-arm64/out/Release-arm64/libfreetype2.a',
              '../library/Skia-m93-87e8842e8c-macos-Release-arm64/out/Release-arm64/libharfbuzz.a',
              '../library/Skia-m93-87e8842e8c-macos-Release-arm64/out/Release-arm64/libicu.a',
              '../library/Skia-m93-87e8842e8c-macos-Release-arm64/out/Release-arm64/libjpeg.a',
              '../library/Skia-m93-87e8842e8c-macos-Release-arm64/out/Release-arm64/libparticles.a',
              '../library/Skia-m93-87e8842e8c-macos-Release-arm64/out/Release-arm64/libpng.a',
              '../library/Skia-m93-87e8842e8c-macos-Release-arm64/out/Release-arm64/libskia.a',
              '../library/Skia-m93-87e8842e8c-macos-Release-arm64/out/Release-arm64/libskottie.a',
              '../library/Skia-m93-87e8842e8c-macos-Release-arm64/out/Release-arm64/libskparagraph.a',
              '../library/Skia-m93-87e8842e8c-macos-Release-arm64/out/Release-arm64/libskresources.a',
              '../library/Skia-m93-87e8842e8c-macos-Release-arm64/out/Release-arm64/libsksg.a',
              '../library/Skia-m93-87e8842e8c-macos-Release-arm64/out/Release-arm64/libskshaper.a',
              '../library/Skia-m93-87e8842e8c-macos-Release-arm64/out/Release-arm64/libsvg.a',
              '../library/Skia-m93-87e8842e8c-macos-Release-arm64/out/Release-arm64/libwebp_sse41.a',
              '../library/Skia-m93-87e8842e8c-macos-Release-arm64/out/Release-arm64/libwebp.a',
              '../library/Skia-m93-87e8842e8c-macos-Release-arm64/out/Release-arm64/libzlib.a'
            ]
          }
        ]
      ],
      'dependencies': ["<!(node -p \"require('node-addon-api').gyp\")"],
      'cflags!': [ '-fno-exceptions' ],
      'cflags_cc!': [ '-fno-exceptions' ],
      'xcode_settings': {
        'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
        'CLANG_CXX_LIBRARY': 'libc++',
        'MACOSX_DEPLOYMENT_TARGET': '10.7'
      },
      'msvs_settings': {
        'VCCLCompilerTool': { 'ExceptionHandling': 1 },
      },
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS', 'NAPI_VERSION=8' ]
    }
  ]
}
