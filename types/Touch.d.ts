/** 鼠标/触屏事件 */
export declare type WTouchEvent = TouchEvent | MouseEvent;
/** 是否支持触屏 */
export declare const isTouch: boolean;
export declare type Options = Partial<{
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
  onRotate: (
    evt: WTouchEvent & {
      angle: number;
    }
  ) => void;
  /** 缩放  */
  onPinch: (
    evt: WTouchEvent & {
      scale: number;
    }
  ) => void;
  /** 单指滑动 */
  onPressMove: (
    evt: WTouchEvent & {
      deltaX: number;
      deltaY: number;
    }
  ) => void;
  /** 滑动方向判断 */
  onSwipe: (
    evt: WTouchEvent & {
      direction: 'left' | 'right' | 'up' | 'down';
    }
  ) => void;
  /** 双指滑动 */
  onTwoFingerPressMove: (
    evt: WTouchEvent & {
      deltaX: number;
      deltaY: number;
    }
  ) => void;
}>;
/** 手势操作 */
declare const Touch: (el: Element, option: Options) => void;
export default Touch;
