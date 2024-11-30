# node-canvas-skia (alpha)

node-canvas-skia is a skia node binding designed to enable GPU accelerated image rendering in desktop applications. We expect to implement the same API as web canvas.

> Note:
>
> 1. It has not yet fully stabilized and is currently in the testing phase.
> 2. GPU rendering has not been released yet.

## Install

```shell
npm install node-canvas-skia
```

## Platform

|  plateform  | compatible |
| :---------: | :--------: |
| Windows-x64 |    true    |
| Windows-x86 |   false    |
| Macos-arm64 |    true    |
|  Macos-x64  |   false    |
|    Linux    |   false    |

## Example

```js
const path = require("path");
const skia = require("node-canvas-skia");

const canvas = new skia.Canvas(256, 256);
const ctx = canvas.getContext("2d", { antialias: true });

const scale = 256;
const R = 0.45 * scale;
const TAU = 6.2831853;
ctx.beginPath();
ctx.moveTo(R, 0);
for (let i = 1; i < 7; ++i) {
  const theta = (3 * i * TAU) / 7;
  ctx.lineTo(R * Math.cos(theta), R * Math.sin(theta));
}
ctx.closePath();
ctx.translate(0.5 * scale, 0.5 * scale);
ctx.strokeStyle = "rgba(255,0,0,1)";
ctx.lineWidth = 2;
ctx.stroke();
ctx.translate(-0.5 * scale, -0.5 * scale);

canvas.saveAsImage(path.resolve(__dirname, "heptagram.jpg"));
```

## API

1. Canvas
   - getContext
   - saveAsImage
   - toBuffer
   - save
   - restore
2. CanvasContext
   - beginPath
   - moveTo
   - lineTo
   - closePath
   - stroke
   - clear
   - translate
   - rotate
   - strokeStyle
   - fillStyle
   - lineWidth
   - arc
   - strokeRect
   - lineCap
   - transform
   - fill
   - rect
   - isPointInPath
   - scale
   - arcTo
   - setFont
   - strokeText
   - fillText
   - measureText
   - getFonts
   - createLinearGradient
   - createRadialGradient
   - createConicGradient
   - fillRect
   - clearRect
   - strokeRect
   - drawImage
   - loadFont
   - roundRect
   - setLineDash
   - quadraticCurveTo
   - bezierCurveTo
3. Gradient
   - addColorStop

# license

> Copyright (c) 2011 The node-skia Authors. All rights reserved.
>
> Redistribution and use in source and binary forms, with or without
> modification, are permitted provided that the following conditions are
> met:
>
> \* Redistributions of source code must retain the above copyright
> notice, this list of conditions and the following disclaimer. \* Redistributions in binary form must reproduce the above
> copyright notice, this list of conditions and the following disclaimer
> in the documentation and/or other materials provided with the
> distribution. \* Neither the name of Google Inc. nor the names of its
> contributors may be used to endorse or promote products derived from
> this software without specific prior written permission.
>
> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
> "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
> LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
> A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
> OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
> SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
> LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
> DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
> THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
> (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
> OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
