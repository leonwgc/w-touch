<div align="center">
  <h1>w-touch</h1>
  <p>🎯 轻量级的手势库，同时支持 PC 端和移动端</p>

  <p>
    <a href="https://www.npmjs.com/package/w-touch"><img src="https://img.shields.io/npm/v/w-touch.svg?style=flat-square" alt="npm version"></a>
    <a href="https://www.npmjs.com/package/w-touch"><img src="https://img.shields.io/npm/dm/w-touch.svg?style=flat-square" alt="npm downloads"></a>
    <a href="https://github.com/leonwgc/w-touch/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/w-touch.svg?style=flat-square" alt="license"></a>
    <a href="https://github.com/leonwgc/w-touch"><img src="https://img.shields.io/github/stars/leonwgc/w-touch?style=social" alt="github stars"></a>
  </p>

  <p>
    <a href="./README.md">简体中文</a> |
    <a href="./README.en.md">English</a>
  </p>
</div>

---

## ✨ 特性

- 🖱️ **统一交互** - 同时支持鼠标和触摸操作，内部统一处理 Mouse & Touch 事件
- 📘 **TypeScript** - 使用 TypeScript 编写，提供完整的类型定义和智能提示
- 🎨 **丰富手势** - 支持 8 种常用手势，满足各种交互需求
- 🪶 **轻量级** - 体积小巧，无任何外部依赖
- 🔧 **易集成** - 支持原生 JS、React、Vue3 等多种使用方式
- 🎯 **高性能** - 优化的事件处理机制，流畅的用户体验

## 🚀 快速开始

### 安装

```bash
npm install w-touch
```

```bash
yarn add w-touch
```

```bash
pnpm add w-touch
```

## 📖 手势支持

| 手势 | 事件回调 | 说明 |
|------|---------|------|
| 单击 | `onSingleTap` | 点击一次触发 |
| 双击 | `onDoubleTap` | 快速点击两次触发 |
| 长按 | `onLongTap` | 长按触发 |
| 旋转 | `onRotate` | 双指旋转，返回旋转角度 |
| 缩放 | `onPinch` | 双指缩放，返回缩放比例 |
| 单指滑动 | `onPressMove` | 单指滑动，返回位移量 |
| 方向滑动 | `onSwipe` | 识别滑动方向（上/下/左/右）|
| 双指滑动 | `onTwoFingerPressMove` | 双指同时滑动，返回位移量 |

## 💻 使用方法

### 原生 JavaScript

```typescript
import Touch from 'w-touch';

const element = document.querySelector('#target');

const touch = new Touch(element, {
  onDoubleTap() {
    console.log('双击');
  },
  onLongTap() {
    console.log('长按');
  },
  onPinch({ scale }) {
    console.log('缩放比例:', scale);
  },
  onRotate({ angle }) {
    console.log('旋转角度:', angle);
  },
  onPressMove({ deltaX, deltaY }) {
    console.log('滑动距离:', deltaX, deltaY);
  },
  onSwipe({ direction }) {
    console.log('滑动方向:', direction);
  },
});

// 销毁实例
touch.destroy();
```

### React 集成

```tsx
import React from 'react';
import Touch, { Options } from 'w-touch';

type Props = {
  /** 手势操作元素，如果是组件需要 forwardRef 到 DOM */
  children: React.ReactElement;
} & Options;

/** 给子元素添加手势操作 */
const TouchElement = React.forwardRef<Element, Props>((props, ref) => {
  const { children, ...rest } = props;
  const elRef = React.useRef<Element>(null);

  React.useImperativeHandle(ref, () => elRef.current as Element);

  React.useLayoutEffect(() => {
    const el = elRef.current;
    if (!(el instanceof Element)) {
      throw new Error('TouchElement: 子元素必须是 DOM 元素或 forwardRef 到 DOM 的组件');
    }

    const touch = new Touch(el, rest as Options);

    return () => {
      touch.destroy();
    };
  }, []);

  if (!React.isValidElement(children)) {
    throw new Error('TouchElement: 子元素必须是有效的 React 元素');
  }

  return <children.type {...children.props} ref={elRef} />;
});

TouchElement.displayName = 'TouchElement';

export default TouchElement;
```

**使用示例：**

```tsx
import TouchElement from './TouchElement';

function App() {
  return (
    <TouchElement
      onSwipe={({ direction }) => {
        console.log('滑动方向:', direction);
      }}
      onPinch={({ scale }) => {
        console.log('缩放:', scale);
      }}
    >
      <div>滑动或缩放我</div>
    </TouchElement>
  );
}
```

### Vue 3 集成

```vue
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Touch, { type Options } from 'w-touch';

const props = defineProps<{
  options: Options;
}>();

let touchInstance: Touch;
const el = ref<Element>();

onMounted(() => {
  if (el.value) {
    touchInstance = new Touch(el.value, props.options);
  }
});

onUnmounted(() => {
  touchInstance?.destroy();
});
</script>

<template>
  <div ref="el">
    <slot />
  </div>
</template>
```

**使用示例：**

```vue
<template>
  <TouchElement :options="touchOptions">
    <div>滑动或缩放我</div>
  </TouchElement>
</template>

<script setup>
import TouchElement from './TouchElement.vue';

const touchOptions = {
  onSwipe: ({ direction }) => {
    console.log('滑动方向:', direction);
  },
  onPinch: ({ scale }) => {
    console.log('缩放:', scale);
  },
};
</script>
```

## 📚 API 文档

### Options 类型定义

```typescript
type Options = Partial<{
  // 基础触摸事件
  onTouchStart: (evt: WTouchEvent) => void;
  onTouchMove: (evt: WTouchEvent) => void;
  onTouchEnd: (evt: WTouchEvent) => void;
  onTouchCancel: (evt: WTouchEvent) => void;

  // 多点触控事件
  onMultipointStart: (evt: WTouchEvent) => void;
  onMultipointEnd: (evt: WTouchEvent) => void;

  // 手势事件
  onSingleTap: () => void;                                            // 单击
  onDoubleTap: () => void;                                            // 双击
  onLongTap: () => void;                                              // 长按
  onRotate: (evt: WTouchEvent & { angle: number }) => void;           // 旋转 (单位: deg)
  onPinch: (evt: WTouchEvent & { scale: number }) => void;            // 缩放
  onPressMove: (evt: WTouchEvent & { deltaX: number; deltaY: number }) => void;  // 单指滑动
  onSwipe: (evt: WTouchEvent & { direction: 'left' | 'right' | 'up' | 'down' }) => void;  // 方向滑动
  onTwoFingerPressMove: (evt: WTouchEvent & { deltaX: number; deltaY: number }) => void;  // 双指滑动
}>;
```

### WTouchEvent 类型

```typescript
type WTouchEvent = TouchEvent | MouseEvent;
```

## 🌟 应用场景

- 📱 移动端图片查看器（缩放、旋转、拖拽）
- 🎮 游戏交互控制
- 📊 数据可视化图表交互
- 🖼️ 画布编辑器
- 📝 手势密码
- 🗺️ 地图应用
- 更多场景等你探索...

## 📦 浏览器支持

- Chrome（推荐）
- Firefox
- Safari
- Edge
- 移动端浏览器

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 开源协议

[MIT](./LICENSE) © leonwgc

## 🔗 相关链接

- [GitHub](https://github.com/leonwgc/w-touch)
- [NPM](https://www.npmjs.com/package/w-touch)
- [问题反馈](https://github.com/leonwgc/w-touch/issues)
