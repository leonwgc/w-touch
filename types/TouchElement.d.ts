import * as React from 'react';
/** 给子元素添加手势操作 */
declare const TouchElement: React.ForwardRefExoticComponent<
  {
    /** 手势操作元素,如果是组件，需要forwardRef到dom */
    children: React.ReactElement;
  } & Partial<{
    onTouchStart: (evt: TouchEvent | MouseEvent) => void;
    onTouchMove: (evt: import('./Touch').XTouchEvent) => void;
    onTouchEnd: (evt: import('./Touch').XTouchEvent) => void;
    onTouchCancel: (evt: import('./Touch').XTouchEvent) => void;
    onMultipointStart: (evt: import('./Touch').XTouchEvent) => void;
    onMultipointEnd: (evt: import('./Touch').XTouchEvent) => void;
    onDoubleTap: () => void;
    onLongTap: () => void;
    onSingleTap: () => void;
    onRotate: (
      evt: import('./Touch').XTouchEvent & {
        angle: number;
      }
    ) => void;
    onPinch: (
      evt: import('./Touch').XTouchEvent & {
        scale: number;
      }
    ) => void;
    onPressMove: (
      evt: import('./Touch').XTouchEvent & {
        deltaX: number;
        deltaY: number;
      }
    ) => void;
    onSwipe: (
      evt: import('./Touch').XTouchEvent & {
        direction: 'left' | 'right' | 'up' | 'down';
      }
    ) => void;
    onTwoFingerPressMove: (
      evt: import('./Touch').XTouchEvent & {
        deltaX: number;
        deltaY: number;
      }
    ) => void;
  }> &
    React.RefAttributes<HTMLElement>
>;
export default TouchElement;
