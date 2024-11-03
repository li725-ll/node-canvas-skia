# node-skia

node-skia是一个skia的node绑定，旨在桌面应用中可以利用GPU加速图像绘制。我们期望实现与web canvas相同的api。

## 安装

## 示例

```js
const skia = require("node-skia");
```

## API

1. Canvas
   - getContext
   - saveAsImage
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
   - lineWidth
   - arc
   - strokeRect
   - lineCap
   - setStrokeJoin
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
