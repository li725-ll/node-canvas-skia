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
            'defines': ['windows_dbr'],
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
