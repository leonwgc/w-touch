/** 鼠标/触摸事件 */
export type WTouchEvent = TouchEvent | MouseEvent;
type MockEvent = {
  pageX?: number;
  pageY?: number;
  preventDefault?: () => void;
  touches?: Array<{
    pageX: number;
    pageY: number;
  }>;
  [x: string]: unknown;
  angle?: number;
  scale?: number;
  deltaX?: number;
  deltaY?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
};
type Point = {
  x: number;
  y: number;
};
type voidFunc = () => void;
/** 是否支持触屏 */
export declare const isTouch: boolean;
type HandlerFunc = (e: MockEvent) => void;
declare class Handler {
  handlers: Array<(...args: any[]) => void>;
  el: Element;
  constructor(el: Element);
  add(handler: HandlerFunc): void;
  del(handler?: HandlerFunc): void;
  dispatch(...args: any[]): void;
}
type WTouchHandler = (evt: WTouchEvent) => void;
export type Options = Partial<{
  onTouchStart: WTouchHandler;
  onTouchMove: WTouchHandler;
  onTouchEnd: WTouchHandler;
  onTouchCancel: WTouchHandler;
  onMultipointStart: WTouchHandler;
  onMultipointEnd: WTouchHandler;
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
declare class Touch {
  element: Element;
  preV: Point;
  pinchStartLen: number;
  scale: number;
  isDoubleTap: boolean;
  rotate: Handler;
  touchStart: Handler;
  touchMove: Handler;
  touchEnd: Handler;
  touchCancel: Handler;
  isMoving: boolean;
  multipointStart: Handler;
  multipointEnd: Handler;
  pinch: Handler;
  swipe: Handler;
  doubleTap: Handler;
  longTap: Handler;
  singleTap: Handler;
  pressMove: Handler;
  twoFingerPressMove: Handler;
  _cancelAllHandler: voidFunc;
  delta: number;
  last: number;
  now: number;
  tapTimeout: number;
  singleTapTimeout: number;
  longTapTimeout: number;
  swipeTimeout: number;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  preTapPosition: Point;
  _preventTap: boolean;
  sx2: number;
  sy2: number;
  constructor(el: Element, option: Options);
  start(e: any): void;
  move(e: any): void;
  end(e: any): void;
  cancelAll(): void;
  cancel(evt: any): void;
  _cancelLongTap(): void;
  _cancelSingleTap(): void;
  _swipeDirection(x1: any, x2: any, y1: any, y2: any): 'left' | 'right' | 'up' | 'down';
  on(evt: any, handler: any): void;
  off(evt: any, handler: any): void;
  destroy(): any;
}
export default Touch;
