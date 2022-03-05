### 特点

1. 支持鼠标和手指操作 (统一 Mouse & Touch)
2. 使用 TypeScript 编写，内置 TypeScript 类型定义文件，良好的智能提示
3. 支持 js 原生使用和 react

### 手势

1. 点击 onSingleTap
2. 双击 onDoubleTap
3. 长按 onLongTap
4. 旋转 onRotate
5. 缩放 onPinch
6. 单指滑动 onPressMove
7. 滑动方向判断 onSwipe
8. 双指滑动 onTwoFingerPressMove

## js使用

```js
import Touch from 'w-touch';

// 构造对象
const t = new Touch(el, options);

// 销毁对象
t.destroy();
```

## React 绑定 (TouchElement)

```js
import React from 'react';
import { TouchElement } from 'w-touch';

export default function Demo() {
  return (
    <TouchElement
      onPinch={(e) => {
        console.log('scale:', e.scale);
      }}
      onRotate={(e) => {
        console.log('angle:', e.angle);
      }}
      onPressMove={(e) => {
        console.log(e.deltaX, e.deltaY);
      }}
    >
      <div />
    </TouchElement>
  );
}
```

## 事件类型

```js
type Options = Partial<{
  onTouchStart: (evt: WTouchEvent) => void,
  onTouchMove: (evt: WTouchEvent) => void,
  onTouchEnd: (evt: WTouchEvent) => void,
  onTouchCancel: (evt: WTouchEvent) => void,
  onMultipointStart: (evt: WTouchEvent) => void,
  onMultipointEnd: (evt: WTouchEvent) => void,
  /** 点两次 */
  onDoubleTap: () => void,
  /** 长按 */
  onLongTap: () => void,
  /** 按一次 */
  onSingleTap: () => void,
  /** 旋转, 单位:deg */
  onRotate: (evt: WTouchEvent & { angle: number }) => void,
  /** 缩放  */
  onPinch: (evt: WTouchEvent & { scale: number }) => void,
  /** 单指滑动 */
  onPressMove: (evt: WTouchEvent & { deltaX: number, deltaY: number }) => void,
  /** 左右滑动 */
  onSwipe: (evt: WTouchEvent & { direction: 'left' | 'right' | 'up' | 'down' }) => void,
  /** 双指滑动 */
  onTwoFingerPressMove: (evt: WTouchEvent & { deltaX: number, deltaY: number }) => void,
}>;
```
