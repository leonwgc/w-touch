import * as React from 'react';
/** 给子元素添加手势操作 */
declare const TouchElement: React.ForwardRefExoticComponent<
  {
    /** 手势操作元素,如果是组件，需要forwardRef到dom */
    children: React.ReactElement;
  } & Partial<{
    onTouchStart: (evt: import('./Touch').WTouchEvent) => void;
    onTouchMove: (evt: import('./Touch').WTouchEvent) => void;
    onTouchEnd: (evt: import('./Touch').WTouchEvent) => void;
    onTouchCancel: (evt: import('./Touch').WTouchEvent) => void;
    onMultipointStart: (evt: import('./Touch').WTouchEvent) => void;
    onMultipointEnd: (evt: import('./Touch').WTouchEvent) => void;
    onDoubleTap: () => void;
    onLongTap: () => void;
    onSingleTap: () => void;
    onRotate: (
      evt: import('./Touch').WTouchEvent & {
        angle: number;
      }
    ) => void;
    onPinch: (
      evt: import('./Touch').WTouchEvent & {
        scale: number;
      }
    ) => void;
    onPressMove: (
      evt: import('./Touch').WTouchEvent & {
        deltaX: number;
        deltaY: number;
      }
    ) => void;
    onSwipe: (
      evt: import('./Touch').WTouchEvent & {
        direction: 'left' | 'right' | 'up' | 'down';
      }
    ) => void;
    onTwoFingerPressMove: (
      evt: import('./Touch').WTouchEvent & {
        deltaX: number;
        deltaY: number;
      }
    ) => void;
  }> &
    React.RefAttributes<HTMLElement>
>;
export default TouchElement;
