/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** 鼠标/触摸事件 */
export type WTouchEvent = TouchEvent | MouseEvent;

type MockEvent = {
  pageX?: number;
  pageY?: number;
  touches?: Array<{ pageX: number; pageY: number }>;
  [x: string]: unknown;
  angle?: number;
  scale?: number;
  deltaX?: number;
  deltaY?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
};

const getEvent = (e) => {
  const evt: MockEvent = { pageX: e.pageX, pageY: e.pageY, touches: e.touches };

  if (!e.touches) {
    evt.touches = e.touches || [];
    evt.touches[0] = {
      pageX: e.pageX,
      pageY: e.pageY,
    };
  }

  return evt;
};

type Point = { x: number; y: number };

type voidFunc = () => void;

/** 是否支持触屏 */
export const isTouch = typeof window !== 'undefined' && window.ontouchstart !== undefined;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = function () {};

const getLen = (v) => {
  return Math.sqrt(v.x * v.x + v.y * v.y);
};

function dot(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
}

function getAngle(v1, v2) {
  const mr = getLen(v1) * getLen(v2);
  if (mr === 0) return 0;
  let r = dot(v1, v2) / mr;
  if (r > 1) r = 1;
  return Math.acos(r);
}

function cross(v1, v2) {
  return v1.x * v2.y - v2.x * v1.y;
}

function getRotateAngle(v1, v2) {
  let angle = getAngle(v1, v2);
  if (cross(v1, v2) > 0) {
    angle *= -1;
  }
  return angle * 180;
  // return (angle * 180) / Math.PI;
}

type HandlerFunc = (e: MockEvent) => void;

class Handler {
  handlers: Array<(...args) => void>;
  el: Element;
  constructor(el: Element) {
    this.handlers = [];
    this.el = el;
  }
  add(handler: HandlerFunc) {
    this.handlers.push(handler);
  }
  del(handler?: HandlerFunc) {
    if (!handler) this.handlers = [];

    for (let i = this.handlers.length; i >= 0; i--) {
      if (this.handlers[i] === handler) {
        this.handlers.splice(i, 1);
      }
    }
  }
  dispatch(...args) {
    for (let i = 0, len = this.handlers.length; i < len; i++) {
      const handler = this.handlers[i];
      handler.apply?.(this.el, args);
    }
  }
}

function getHandler(el, handler) {
  const h = new Handler(el);
  h.add(handler);

  return h;
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
  onRotate: (evt: WTouchEvent & { angle: number }) => void;
  /** 缩放  */
  onPinch: (evt: WTouchEvent & { scale: number }) => void;
  /** 单指滑动 */
  onPressMove: (evt: WTouchEvent & { deltaX: number; deltaY: number }) => void;
  /** 滑动方向判断 */
  onSwipe: (evt: WTouchEvent & { direction: 'left' | 'right' | 'up' | 'down' }) => void;
  /** 双指滑动 */
  onTwoFingerPressMove: (evt: WTouchEvent & { deltaX: number; deltaY: number }) => void;
}>;

/** 手势操作 */
class Touch {
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
  constructor(el: Element, option: Options) {
    this.element = el;

    this.start = this.start.bind(this);
    this.move = this.move.bind(this);
    this.end = this.end.bind(this);
    this.cancel = this.cancel.bind(this);

    this.element.addEventListener(isTouch ? 'touchstart' : 'mousedown', this.start);

    if (isTouch) {
      this.element.addEventListener('touchmove', this.move);
      this.element.addEventListener('touchend', this.end);
      this.element.addEventListener('touchcancel', this.cancel);
    } else {
      document.addEventListener('mousemove', this.move);
      document.addEventListener('mouseup', this.end);
    }

    this.preV = { x: null, y: null };
    this.pinchStartLen = null;
    this.scale = 1;
    this.isDoubleTap = false;

    this.rotate = getHandler(this.element, option.onRotate || noop);

    this.touchStart = getHandler(this.element, option.onTouchStart || noop);
    this.touchMove = getHandler(this.element, option.onTouchMove || noop);
    this.touchEnd = getHandler(this.element, option.onTouchEnd || noop);
    this.touchCancel = getHandler(this.element, option.onTouchCancel || noop);
    this.isMoving = false;

    this.multipointStart = getHandler(this.element, option.onMultipointStart || noop);
    this.multipointEnd = getHandler(this.element, option.onMultipointEnd || noop);
    this.pinch = getHandler(this.element, option.onPinch || noop);
    this.swipe = getHandler(this.element, option.onSwipe || noop);

    this.doubleTap = getHandler(this.element, option.onDoubleTap || noop);
    this.longTap = getHandler(this.element, option.onLongTap || noop);
    this.singleTap = getHandler(this.element, option.onSingleTap || noop);
    this.pressMove = getHandler(this.element, option.onPressMove || noop);
    this.twoFingerPressMove = getHandler(this.element, option.onTwoFingerPressMove || noop);

    this._cancelAllHandler = this.cancelAll.bind(this);

    window.addEventListener('scroll', this._cancelAllHandler);

    this.delta = null;
    this.last = null;
    this.now = null;
    this.tapTimeout = null;
    this.singleTapTimeout = null;
    this.longTapTimeout = null;
    this.swipeTimeout = null;
    this.x1 = this.x2 = this.y1 = this.y2 = null;
    this.preTapPosition = { x: null, y: null };
  }
  start(e) {
    const evt: MockEvent = getEvent(e);

    if (!this.isMoving) {
      this.isMoving = true;
    }
    this.now = Date.now();
    this.x1 = evt.touches[0].pageX;
    this.y1 = evt.touches[0].pageY;
    this.delta = this.now - (this.last || this.now);
    this.touchStart.dispatch(evt, this.element);
    if (this.preTapPosition.x !== null) {
      this.isDoubleTap =
        this.delta > 0 &&
        this.delta <= 250 &&
        Math.abs(this.preTapPosition.x - this.x1) < 30 &&
        Math.abs(this.preTapPosition.y - this.y1) < 30;
      if (this.isDoubleTap) clearTimeout(this.singleTapTimeout);
    }
    this.preTapPosition.x = this.x1;
    this.preTapPosition.y = this.y1;
    this.last = this.now;
    const preV = this.preV,
      len = evt.touches.length;
    if (len > 1) {
      this._cancelLongTap();
      this._cancelSingleTap();
      const v = { x: evt.touches[1].pageX - this.x1, y: evt.touches[1].pageY - this.y1 };
      preV.x = v.x;
      preV.y = v.y;
      this.pinchStartLen = getLen(preV);
      this.multipointStart.dispatch(evt, this.element);
    }
    this._preventTap = false;
    this.longTapTimeout = window.setTimeout(
      function () {
        this.longTap.dispatch(evt, this.element);
        this._preventTap = true;
      }.bind(this),
      750
    );
  }
  move(e) {
    if (!this.isMoving) {
      return;
    }
    const evt: MockEvent = getEvent(e);

    const preV = this.preV,
      len = evt.touches.length,
      currentX = evt.touches[0].pageX,
      currentY = evt.touches[0].pageY;
    this.isDoubleTap = false;
    if (len > 1) {
      const sCurrentX = evt.touches[1].pageX,
        sCurrentY = evt.touches[1].pageY;
      const v = { x: evt.touches[1].pageX - currentX, y: evt.touches[1].pageY - currentY };

      if (preV.x !== null) {
        if (this.pinchStartLen > 0) {
          evt.scale = getLen(v) / this.pinchStartLen;
          this.pinch.dispatch(evt, this.element);
        }

        evt.angle = getRotateAngle(v, preV);
        this.rotate.dispatch(evt, this.element);
      }
      preV.x = v.x;
      preV.y = v.y;

      if (this.x2 !== null && this.sx2 !== null) {
        evt.deltaX = (currentX - this.x2 + sCurrentX - this.sx2) / 2;
        evt.deltaY = (currentY - this.y2 + sCurrentY - this.sy2) / 2;
      } else {
        evt.deltaX = 0;
        evt.deltaY = 0;
      }
      this.twoFingerPressMove.dispatch(evt, this.element);

      this.sx2 = sCurrentX;
      this.sy2 = sCurrentY;
    } else {
      if (this.x2 !== null) {
        evt.deltaX = currentX - this.x2;
        evt.deltaY = currentY - this.y2;

        const movedX = Math.abs(this.x1 - this.x2),
          movedY = Math.abs(this.y1 - this.y2);

        if (movedX > 10 || movedY > 10) {
          this._preventTap = true;
        }
      } else {
        evt.deltaX = 0;
        evt.deltaY = 0;
      }

      this.pressMove.dispatch(evt, this.element);
    }

    this.touchMove?.dispatch(evt, this.element);

    this._cancelLongTap();
    this.x2 = currentX;
    this.y2 = currentY;

    if (len > 1) {
      e.preventDefault();
    }
  }
  end(e) {
    const evt: MockEvent = getEvent(e);
    if (this.isMoving) {
      this.isMoving = false;
    }
    if (isTouch && !e.changedTouches) return;
    if (!evt.touches) {
      evt.touches = e.touches || [];
      evt.touches[0] = {
        pageX: e.pageX,
        pageY: e.pageY,
      };
    }
    this._cancelLongTap();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    if (isTouch && evt.touches.length < 2) {
      this.multipointEnd.dispatch(evt, this.element);
      this.sx2 = this.sy2 = null;
    }

    //swipe
    if (
      (this.x2 && Math.abs(this.x1 - this.x2) > 30) ||
      (this.y2 && Math.abs(this.y1 - this.y2) > 30)
    ) {
      evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
      this.swipeTimeout = window.setTimeout(function () {
        self.swipe.dispatch(evt, self.element);
      }, 0);
    } else {
      this.tapTimeout = window.setTimeout(function () {
        if (!self._preventTap) {
          // self.tap?.dispatch(evt, self.element);
        }
        // trigger double tap immediately
        if (self.isDoubleTap) {
          self.doubleTap?.dispatch(evt, self.element);
          self.isDoubleTap = false;
        }
      }, 0);

      if (!self.isDoubleTap) {
        self.singleTapTimeout = window.setTimeout(function () {
          if (!self._preventTap) {
            self.singleTap?.dispatch(evt, self.element);
          }
        }, 250);
      }
    }

    this.touchEnd?.dispatch(evt, this.element);

    this.preV.x = 0;
    this.preV.y = 0;
    this.scale = 1;
    this.pinchStartLen = null;
    this.x1 = this.x2 = this.y1 = this.y2 = null;
  }
  cancelAll() {
    this._preventTap = true;
    clearTimeout(this.singleTapTimeout);

    clearTimeout(this.longTapTimeout);
    clearTimeout(this.swipeTimeout);
  }
  cancel(evt) {
    this.cancelAll();
    this.touchCancel.dispatch(evt, this.element);
  }
  _cancelLongTap() {
    clearTimeout(this.longTapTimeout);
  }
  _cancelSingleTap() {
    clearTimeout(this.singleTapTimeout);
  }
  _swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >= Math.abs(y1 - y2)
      ? x1 - x2 > 0
        ? 'left'
        : 'right'
      : y1 - y2 > 0
      ? 'up'
      : 'down';
  }

  on(evt, handler) {
    if (this[evt]) {
      this[evt].add(handler);
    }
  }

  off(evt, handler) {
    if (this[evt]) {
      this[evt].del(handler);
    }
  }

  destroy() {
    if (this.singleTapTimeout) clearTimeout(this.singleTapTimeout);
    if (this.longTapTimeout) clearTimeout(this.longTapTimeout);
    if (this.swipeTimeout) clearTimeout(this.swipeTimeout);

    this.element.removeEventListener(isTouch ? 'touchstart' : 'mousedown', this.start);

    if (isTouch) {
      this.element.removeEventListener('touchmove', this.move);
      this.element.removeEventListener('touchend', this.end);
      this.element.removeEventListener('touchcancel', this.cancel);
    } else {
      document.removeEventListener('mousemove', this.move);
      document.removeEventListener('mouseup', this.end);
    }

    this.rotate.del();
    this.touchStart.del();
    this.multipointStart.del();
    this.multipointEnd.del();
    this.pinch.del();
    this.swipe.del();
    this.doubleTap.del();
    this.longTap.del();
    this.singleTap.del();
    this.pressMove.del();
    this.twoFingerPressMove.del();
    this.touchMove.del();
    this.touchEnd.del();
    this.touchCancel.del();

    this.preV = { x: null, y: null };

    this.isMoving =
      this.pinchStartLen =
      this.scale =
      this.isDoubleTap =
      this.delta =
      this.last =
      this.now =
      this.singleTapTimeout =
      this.longTapTimeout =
      this.swipeTimeout =
      this.x1 =
      this.x2 =
      this.y1 =
      this.y2 =
      this.preTapPosition =
      this.rotate =
      this.touchStart =
      this.multipointStart =
      this.multipointEnd =
      this.pinch =
      this.swipe =
      this.doubleTap =
      this.longTap =
      this.singleTap =
      this.pressMove =
      this.touchMove =
      this.touchEnd =
      this.touchCancel =
      this.twoFingerPressMove =
        null;

    window.removeEventListener('scroll', this._cancelAllHandler);
    return null;
  }
}

export default Touch;
