<div align="center">
  <h1>w-touch</h1>
  <p>🎯 A lightweight gesture library for both PC and mobile devices</p>

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

## ✨ Features

- 🖱️ **Unified Interaction** - Supports both mouse and touch operations with unified Mouse & Touch event handling
- 📘 **TypeScript** - Written in TypeScript with complete type definitions and intelligent hints
- 🎨 **Rich Gestures** - Supports 8 common gestures to meet various interaction needs
- 🪶 **Lightweight** - Small size with no external dependencies
- 🔧 **Easy Integration** - Supports vanilla JS, React, Vue3, and more
- 🎯 **High Performance** - Optimized event handling mechanism for smooth user experience

## 🚀 Quick Start

### Installation

```bash
npm install w-touch
```

```bash
yarn add w-touch
```

```bash
pnpm add w-touch
```

## 📖 Gesture Support

| Gesture | Event Callback | Description |
|---------|---------------|-------------|
| Single Tap | `onSingleTap` | Triggered by a single tap |
| Double Tap | `onDoubleTap` | Triggered by tapping twice quickly |
| Long Tap | `onLongTap` | Triggered by long press |
| Rotate | `onRotate` | Two-finger rotation, returns rotation angle |
| Pinch | `onPinch` | Two-finger pinch/zoom, returns scale ratio |
| Press Move | `onPressMove` | Single finger swipe, returns displacement |
| Swipe | `onSwipe` | Recognizes swipe direction (up/down/left/right) |
| Two Finger Move | `onTwoFingerPressMove` | Two fingers moving simultaneously, returns displacement |

## 💻 Usage

### Vanilla JavaScript

```typescript
import Touch from 'w-touch';

const element = document.querySelector('#target');

const touch = new Touch(element, {
  onDoubleTap() {
    console.log('Double tap');
  },
  onLongTap() {
    console.log('Long tap');
  },
  onPinch({ scale }) {
    console.log('Scale:', scale);
  },
  onRotate({ angle }) {
    console.log('Rotation angle:', angle);
  },
  onPressMove({ deltaX, deltaY }) {
    console.log('Move distance:', deltaX, deltaY);
  },
  onSwipe({ direction }) {
    console.log('Swipe direction:', direction);
  },
});

// Destroy instance
touch.destroy();
```

### React Integration

```tsx
import React from 'react';
import Touch, { Options } from 'w-touch';

type Props = {
  /** Element for gesture operations, must forwardRef to DOM if it's a component */
  children: React.ReactElement;
} & Options;

/** Add gesture operations to child element */
const TouchElement = React.forwardRef<Element, Props>((props, ref) => {
  const { children, ...rest } = props;
  const elRef = React.useRef<Element>(null);

  React.useImperativeHandle(ref, () => elRef.current as Element);

  React.useLayoutEffect(() => {
    const el = elRef.current;
    if (!(el instanceof Element)) {
      throw new Error('TouchElement: Child must be a DOM element or a component with forwardRef to DOM');
    }

    const touch = new Touch(el, rest as Options);

    return () => {
      touch.destroy();
    };
  }, []);

  if (!React.isValidElement(children)) {
    throw new Error('TouchElement: Child must be a valid React element');
  }

  return <children.type {...children.props} ref={elRef} />;
});

TouchElement.displayName = 'TouchElement';

export default TouchElement;
```

**Example Usage:**

```tsx
import TouchElement from './TouchElement';

function App() {
  return (
    <TouchElement
      onSwipe={({ direction }) => {
        console.log('Swipe direction:', direction);
      }}
      onPinch={({ scale }) => {
        console.log('Scale:', scale);
      }}
    >
      <div>Swipe or pinch me</div>
    </TouchElement>
  );
}
```

### Vue 3 Integration

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

**Example Usage:**

```vue
<template>
  <TouchElement :options="touchOptions">
    <div>Swipe or pinch me</div>
  </TouchElement>
</template>

<script setup>
import TouchElement from './TouchElement.vue';

const touchOptions = {
  onSwipe: ({ direction }) => {
    console.log('Swipe direction:', direction);
  },
  onPinch: ({ scale }) => {
    console.log('Scale:', scale);
  },
};
</script>
```

## 📚 API Documentation

### Options Type Definition

```typescript
type Options = Partial<{
  // Basic touch events
  onTouchStart: (evt: WTouchEvent) => void;
  onTouchMove: (evt: WTouchEvent) => void;
  onTouchEnd: (evt: WTouchEvent) => void;
  onTouchCancel: (evt: WTouchEvent) => void;

  // Multi-touch events
  onMultipointStart: (evt: WTouchEvent) => void;
  onMultipointEnd: (evt: WTouchEvent) => void;

  // Gesture events
  onSingleTap: () => void;                                            // Single tap
  onDoubleTap: () => void;                                            // Double tap
  onLongTap: () => void;                                              // Long tap
  onRotate: (evt: WTouchEvent & { angle: number }) => void;           // Rotate (unit: deg)
  onPinch: (evt: WTouchEvent & { scale: number }) => void;            // Pinch/Zoom
  onPressMove: (evt: WTouchEvent & { deltaX: number; deltaY: number }) => void;  // Single finger move
  onSwipe: (evt: WTouchEvent & { direction: 'left' | 'right' | 'up' | 'down' }) => void;  // Swipe direction
  onTwoFingerPressMove: (evt: WTouchEvent & { deltaX: number; deltaY: number }) => void;  // Two finger move
}>;
```

### WTouchEvent Type

```typescript
type WTouchEvent = TouchEvent | MouseEvent;
```

## 🌟 Use Cases

- 📱 Mobile image viewer (zoom, rotate, drag)
- 🎮 Game interaction control
- 📊 Data visualization chart interaction
- 🖼️ Canvas editor
- 📝 Gesture password
- 🗺️ Map applications
- And more scenarios waiting for you to explore...

## 📦 Browser Support

- Chrome (Recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📄 License

[MIT](./LICENSE) © leonwgc

## 🔗 Links

- [GitHub](https://github.com/leonwgc/w-touch)
- [NPM](https://www.npmjs.com/package/w-touch)
- [Issue Tracker](https://github.com/leonwgc/w-touch/issues)
