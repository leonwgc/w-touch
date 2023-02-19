### 特点

1. 支持鼠标和手指操作 (内部统一Mouse & Touch事件处理)
2. 使用 TypeScript 编写，内置类型定义文件，良好的智能提示
3. 支持多种手势

### 手势

1. 单击 onSingleTap
2. 双击 onDoubleTap
3. 长按 onLongTap
4. 旋转 onRotate
5. 缩放 onPinch
6. 单指滑动 onPressMove
7. 滑动方向判断 onSwipe
8. 双指滑动 onTwoFingerPressMove

## js 使用

```js
import Touch from 'w-touch';

// 构造对象,参数见下面类型定义说明
const touch = new Touch(el as Element, {
      onDoubleTap() {
        
      },
      onLongTap() {
       
      },
      onPinch({ scale }) {
       
      },
      onRotate({ angle }) {
      
      },
      onPressMove({ deltaX, deltaY }) {
      
      },
      onSwipe({ direction }) {
       
      },
    });

    // 销毁
    touch.destroy();
```

## React 绑定 

```js
import * as React from 'react';
import Touch, { Options } from 'w-touch';

type Props = {
  /** 手势操作元素,如果是组件，需要forwardRef到dom */
  children: React.ReactElement;
} & Options;

const checkFailed = () => {
  throw new Error('TouchElement: 子元素必须是dom/forwardRef到dom的组件');
};

/** 给子元素添加手势操作 */
const TouchElement = React.forwardRef<Element, Props>((props, ref) => {
  const { children, ...rest } = props;
  const elRef = React.useRef<Element>(null);

  React.useImperativeHandle(ref, () => elRef.current as Element);

  React.useLayoutEffect(() => {
    const el = elRef.current;
    if (!(el instanceof Element)) {
      checkFailed();
    }

    const fg = new Touch(el as Element, rest as Options);

    return () => {
      fg.destroy();
    };
  }, []);

  if (!React.isValidElement(children)) {
    checkFailed();
  }

  return <children.type {...(children.props as Record<string, unknown>)} ref={elRef} />;
});

TouchElement.displayName = 'TouchElement';

export default TouchElement;

```

### Vue3 绑定
```
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Touch, { type Options } from 'w-touch';

const props = defineProps<{
  options: Options;
}>();

let touchInstance: Touch;

const el = ref<Element>();

onMounted(() => {
  touchInstance = new Touch(el.value as Element, props.options);
});

onUnmounted(() => {
  touchInstance.destroy();
});
</script>

<template>
  <div ref="el"><slot /></div>
</template>

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
