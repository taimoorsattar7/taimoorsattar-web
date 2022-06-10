---
title: Canvas
description: Canvas.
date: 2021-01-29T06:03:37.094Z
tags:
  - canvas
  - HTML
  - css
---

In HTML, Canvas is like a whiteboard and we can draw on canvas using Javascript. In HTML, we can define canvas as below:

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```

```javascript
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
console.log(ctx)


ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();

ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();

ctx.font = "30px Arial";
ctx.fillText("Hello World", 10, 50);
ctx.strokeText("Hello World", 10, 50);

ctx.drawImage(img,10,10);

```


We can draw on canvas but, we can't interact or select the object within the canvas.