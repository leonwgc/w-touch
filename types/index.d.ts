/** 鼠标/触屏事件 */
export declare type XTouchEvent = TouchEvent | MouseEvent;
/** 是否支持触屏 */
export declare const isTouch: boolean;
export declare type Options = Partial<{
  onTouchStart: (evt: TouchEvent | MouseEvent) => void;
  onTouchMove: (evt: XTouchEvent) => void;
  onTouchEnd: (evt: XTouchEvent) => void;
  onTouchCancel: (evt: XTouchEvent) => void;
  onMultipointStart: (evt: XTouchEvent) => void;
  onMultipointEnd: (evt: XTouchEvent) => void;
  /** 点两次 */
  onDoubleTap: () => void;
  /** 长按 */
  onLongTap: () => void;
  /** 按一次 */
  onSingleTap: () => void;
  /** 旋转, 单位:deg */
  onRotate: (
    evt: XTouchEvent & {
      angle: number;
    }
  ) => void;
  /** 缩放  */
  onPinch: (
    evt: XTouchEvent & {
      scale: number;
    }
  ) => void;
  /** 单指滑动 */
  onPressMove: (
    evt: XTouchEvent & {
      deltaX: number;
      deltaY: number;
    }
  ) => void;
  /** 左右滑动 */
  onSwipe: (
    evt: XTouchEvent & {
      direction: 'left' | 'right' | 'up' | 'down';
    }
  ) => void;
  /** 双指滑动 */
  onTwoFingerPressMove: (
    evt: XTouchEvent & {
      deltaX: number;
      deltaY: number;
    }
  ) => void;
}>;
/** 手势操作 */
declare const XTouch: (el: Element, option: Options) => void;
export default XTouch;
