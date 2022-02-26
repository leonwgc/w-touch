# w-touch 鼠标,手势库

### 特点
1.  支持桌面端鼠标和触屏设备手指操作 (统一 Mouse & Touch)
2. 使用 TypeScript 编写，内置 TypeScript 类型定义文件，良好的智能提示

### 支持的操作

1. 点击 onSingleTap
2. 双击 onDoubleTap
3. 长按 onLongTap
4. 旋转 onRotate
5. 缩放 onPinch
6. 单指滑动 onPressMove 
7. 滑动方向判断 onSwipe
8. 双指滑动 onTwoFingerPressMove


## javascript 使用

```js

  import Touch from 'w-touch';

  // 构造对象
  const t = new Touch(el,options);

  // 销毁对象
  t.destroy.();

```

## React 绑定 (TouchElement)

```js
import React, { useRef, useEffect } from 'react';
import { AutoCenter, Toast } from 'react-uni-comps';
import DemoBlock from './common/DemoBlock';
import { TouchElement } from 'w-touch';

type Position = {
  x: number;
  y: number;
  angle: number;
  scale: number;
};

const update = (el, transform, statusEl) => {
  const cssTransform = `translate(${transform.x}px,${transform.y}px) rotate(${transform.angle}deg) scale(${transform.scale})`;

  el.style.transform = cssTransform;
  statusEl.innerText = cssTransform;
};

export default function App() {
  const ref = useRef<Position>({ x: 0, y: 0, angle: 0, scale: 1 });
  const elRef = useRef<HTMLDivElement>();

  const statusElRef = useRef<HTMLDivElement>();

  useEffect(() => {
    update(elRef.current, ref.current, statusElRef.current);
  }, []);

  return (
    <div>
      <DemoBlock title="当前值：">
        <div ref={statusElRef}></div>
      </DemoBlock>

      <DemoBlock title="手指/鼠标操作">
        <AutoCenter>
          <TouchElement
            onSingleTap={() => {
              Toast.show('tap');
            }}
            onDoubleTap={() => {
              Toast.show('doubleTap');
            }}
            onLongTap={() => {
              Toast.show('longTap');
            }}
            onTouchStart={() => {
              console.log('start');
            }}
            onTouchEnd={(e) => {
              console.log('end');
            }}
            onSwipe={(e) => {
              console.log('swipe', e.direction);
            }}
            onPinch={(e) => {
              console.log('scale:', e.scale);
              ref.current.scale = e.scale;
              update(elRef.current, ref.current, statusElRef.current);
            }}
            onRotate={(e) => {
              console.log('angle:', e.angle);
              ref.current.angle += e.angle;
              update(elRef.current, ref.current, statusElRef.current);
            }}
            onPressMove={(e) => {
              console.log(e.deltaX, e.deltaY);
              ref.current.x = ref.current.x + e.deltaX;
              ref.current.y = ref.current.y + e.deltaY;

              update(elRef.current, ref.current, statusElRef.current);
            }}
            onTwoFingerPressMove={(e) => {
              console.log(e.deltaX, e.deltaY);
              ref.current.x = ref.current.x + e.deltaX;
              ref.current.y = ref.current.y + e.deltaY;
            }}
            ref={elRef}
          >
            <div
              style={{
                width: 120,
                height: 120,
                border: '1px solid red',
                position: 'relative',
              }}
            />
          </TouchElement>
        </AutoCenter>
      </DemoBlock>
    </div>
  );
}

```

## 事件类型

```js
type Options = Partial<{
  onTouchStart: (evt: WTouchEvent) => void;
  onTouchMove: (evt: WTouchEvent) => void;
  onTouchEnd: (evt: WTouchEvent) => void;
  onTouchCancel: (evt: WTouchEvent) => void;
  onMultipointStart: (evt: WTouchEvent) => void;
  onMultipointEnd: (evt: WTouchEvent) => void;
  /** 点两次 */
  onDoubleTap: () => void;
  /** 长按 */
  onLongTap: () => void;
  /** 按一次 */
  onSingleTap: () => void;
  /** 旋转, 单位:deg */
  onRotate: (evt: WTouchEvent & { angle: number }) => void;
  /** 缩放  */
  onPinch: (evt: WTouchEvent & { scale: number }) => void;
  /** 单指滑动 */
  onPressMove: (evt: WTouchEvent & { deltaX: number; deltaY: number }) => void;
  /** 左右滑动 */
  onSwipe: (evt: WTouchEvent & { direction: 'left' | 'right' | 'up' | 'down' }) => void;
  /** 双指滑动 */
  onTwoFingerPressMove: (evt: WTouchEvent & { deltaX: number; deltaY: number }) => void;
}>;
```


