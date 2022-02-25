import * as React from 'react';
/** 给子元素添加手势操作 */
declare const XTouchElement: React.ForwardRefExoticComponent<
  {
    /** 手势操作元素,如果是组件，需要forwardRef到dom */
    children: React.ReactElement;
  } & Partial<{
    onTouchStart: (evt: TouchEvent | MouseEvent) => void;
    onTouchMove: (evt: import('./XTouch').XTouchEvent) => void;
    onTouchEnd: (evt: import('./XTouch').XTouchEvent) => void;
    onTouchCancel: (evt: import('./XTouch').XTouchEvent) => void;
    onMultipointStart: (evt: import('./XTouch').XTouchEvent) => void;
    onMultipointEnd: (evt: import('./XTouch').XTouchEvent) => void;
    onDoubleTap: () => void;
    onLongTap: () => void;
    onSingleTap: () => void;
    onRotate: (
      evt: import('./XTouch').XTouchEvent & {
        angle: number;
      }
    ) => void;
    onPinch: (
      evt: import('./XTouch').XTouchEvent & {
        scale: number;
      }
    ) => void;
    onPressMove: (
      evt: import('./XTouch').XTouchEvent & {
        deltaX: number;
        deltaY: number;
      }
    ) => void;
    onSwipe: (
      evt: import('./XTouch').XTouchEvent & {
        direction: 'left' | 'right' | 'up' | 'down';
      }
    ) => void;
    onTwoFingerPressMove: (
      evt: import('./XTouch').XTouchEvent & {
        deltaX: number;
        deltaY: number;
      }
    ) => void;
  }> &
    React.RefAttributes<HTMLElement>
>;
export default XTouchElement;
