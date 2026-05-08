# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

node-canvas-skia is a Node.js native addon that provides an HTML5 Canvas-compatible 2D drawing API backed by Skia (m93). It uses N-API (node-addon-api) for the native binding and TypeScript for the JavaScript-facing API layer.

Supported platforms: Windows x64, macOS arm64.

## Build & Test Commands

```bash
# Build the native addon (requires node-gyp and platform-specific Skia libraries)
pnpm run build          # node-gyp rebuild

# Run all tests (compiles TS first, then runs Jest)
pnpm test

# Run a single test file
pnpm run pretest && npx jest test/rect.spec.js

# Type-check / compile TypeScript (lib/ -> dist/)
pnpm run pretest        # runs tsc

# Lint & format
pnpm run lint           # eslint --fix
pnpm run prettier       # prettier --write .
```

## Architecture

The project has two layers:

**Native layer (C++, `src/`)** — N-API classes wrapping Skia:
- `Canvas` — creates an SkSurface (CPU or GPU/OpenGL), exposes getContext/save/restore/toBuffer/saveAsImage
- `CanvasContext` — implements Canvas 2D drawing operations (paths, shapes, text, images, transforms) on an SkCanvas
- `Gradient` — wraps SkGradientShader (linear, radial, conic)
- `Utils` — color conversion helpers (RGBA packing, named color map)
- `opengl` — GLFW/OpenGL context setup for GPU rendering

**TypeScript layer (`lib/` -> `dist/`)** — public API that wraps the native addon:
- `canvas.ts` — `Canvas` class, entry point for creating surfaces
- `context.ts` — `CanvasContext` class, manages drawing state (fillStyle, strokeStyle, font, transforms) and delegates to native methods
- `gradient.ts` — `Gradient` class with factory methods (createLinearGradient, createRadialGradient, createConicGradient)
- `utils.ts` — color string parsing (hex, rgb, rgba, named colors), font string parsing
- `binding.ts` — platform-specific native module loader

**Key design pattern:** The TS layer owns mutable drawing state (fillStyle, lineWidth, font, etc.) and converts high-level values (color strings, font strings) into native-friendly formats before calling into C++. The native layer is stateless regarding style — it receives pre-processed values per draw call.

## Platform-Specific Build

The `binding.gyp` conditionally links different Skia libraries:
- Windows: links against `library/Skia-m93-...-windows-Release-x64/` + GLFW + Windows SDK libs (d3d12, OpenGL32)
- macOS: links against `library/Skia-m93-...-macos-Release-arm64/` + Metal frameworks

The install script (`scripts/install.js`) clones prebuilt Skia dependencies from a git repository.

## Testing

Tests are in `test/*.spec.js` using Jest. Each test creates a canvas, draws something, and saves the output image to `test/output/`. Tests are visual verification — they produce image files rather than asserting pixel values.

## Conventions

- All angle parameters in the native and TS layers use **radians**
- Color values cross the native boundary as a single packed uint32 (RGBA)
- The project uses commitlint with conventional commits (enforced via husky + lint-staged)
