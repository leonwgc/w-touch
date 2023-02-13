'use strict';
(self.webpackChunkw_touch = self.webpackChunkw_touch || []).push([
  [826],
  {
    3: (t, e, i) => {
      var s = i(294),
        n = i(745),
        h = i(152),
        o = i(671),
        a = i(144),
        l = i(942),
        u = function (t) {
          var e = { pageX: t.pageX, pageY: t.pageY, touches: t.touches };
          return (
            t.touches ||
              ((e.touches = t.touches || []), (e.touches[0] = { pageX: t.pageX, pageY: t.pageY })),
            e
          );
        },
        c = 'undefined' != typeof window && void 0 !== window.ontouchstart,
        r = function () {},
        p = function (t) {
          return Math.sqrt(t.x * t.x + t.y * t.y);
        };
      var d = (function () {
        function t(e) {
          (0, o.Z)(this, t),
            (0, l.Z)(this, 'handlers', void 0),
            (0, l.Z)(this, 'el', void 0),
            (this.handlers = []),
            (this.el = e);
        }
        return (
          (0, a.Z)(t, [
            {
              key: 'add',
              value: function (t) {
                this.handlers.push(t);
              },
            },
            {
              key: 'del',
              value: function (t) {
                t || (this.handlers = []);
                for (var e = this.handlers.length; e >= 0; e--)
                  this.handlers[e] === t && this.handlers.splice(e, 1);
              },
            },
            {
              key: 'dispatch',
              value: function () {
                for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
                  e[i] = arguments[i];
                for (var s = 0, n = this.handlers.length; s < n; s++) {
                  var h,
                    o = this.handlers[s];
                  null === (h = o.apply) || void 0 === h || h.call(o, this.el, e);
                }
              },
            },
          ]),
          t
        );
      })();
      function v(t, e) {
        var i = new d(t);
        return i.add(e), i;
      }
      const m = (function () {
          function t(e, i) {
            (0, o.Z)(this, t),
              (0, l.Z)(this, 'element', void 0),
              (0, l.Z)(this, 'preV', void 0),
              (0, l.Z)(this, 'pinchStartLen', void 0),
              (0, l.Z)(this, 'scale', void 0),
              (0, l.Z)(this, 'isDoubleTap', void 0),
              (0, l.Z)(this, 'rotate', void 0),
              (0, l.Z)(this, 'touchStart', void 0),
              (0, l.Z)(this, 'touchMove', void 0),
              (0, l.Z)(this, 'touchEnd', void 0),
              (0, l.Z)(this, 'touchCancel', void 0),
              (0, l.Z)(this, 'isMoving', void 0),
              (0, l.Z)(this, 'multipointStart', void 0),
              (0, l.Z)(this, 'multipointEnd', void 0),
              (0, l.Z)(this, 'pinch', void 0),
              (0, l.Z)(this, 'swipe', void 0),
              (0, l.Z)(this, 'doubleTap', void 0),
              (0, l.Z)(this, 'longTap', void 0),
              (0, l.Z)(this, 'singleTap', void 0),
              (0, l.Z)(this, 'pressMove', void 0),
              (0, l.Z)(this, 'twoFingerPressMove', void 0),
              (0, l.Z)(this, '_cancelAllHandler', void 0),
              (0, l.Z)(this, 'delta', void 0),
              (0, l.Z)(this, 'last', void 0),
              (0, l.Z)(this, 'now', void 0),
              (0, l.Z)(this, 'tapTimeout', void 0),
              (0, l.Z)(this, 'singleTapTimeout', void 0),
              (0, l.Z)(this, 'longTapTimeout', void 0),
              (0, l.Z)(this, 'swipeTimeout', void 0),
              (0, l.Z)(this, 'x1', void 0),
              (0, l.Z)(this, 'x2', void 0),
              (0, l.Z)(this, 'y1', void 0),
              (0, l.Z)(this, 'y2', void 0),
              (0, l.Z)(this, 'preTapPosition', void 0),
              (0, l.Z)(this, '_preventTap', void 0),
              (0, l.Z)(this, 'sx2', void 0),
              (0, l.Z)(this, 'sy2', void 0),
              (this.element = e),
              (this.start = this.start.bind(this)),
              (this.move = this.move.bind(this)),
              (this.end = this.end.bind(this)),
              (this.cancel = this.cancel.bind(this)),
              this.element.addEventListener(c ? 'touchstart' : 'mousedown', this.start),
              c
                ? (this.element.addEventListener('touchmove', this.move),
                  this.element.addEventListener('touchend', this.end),
                  this.element.addEventListener('touchcancel', this.cancel))
                : (document.addEventListener('mousemove', this.move),
                  document.addEventListener('mouseup', this.end)),
              (this.preV = { x: null, y: null }),
              (this.pinchStartLen = null),
              (this.scale = 1),
              (this.isDoubleTap = !1),
              (this.rotate = v(this.element, i.onRotate || r)),
              (this.touchStart = v(this.element, i.onTouchStart || r)),
              (this.touchMove = v(this.element, i.onTouchMove || r)),
              (this.touchEnd = v(this.element, i.onTouchEnd || r)),
              (this.touchCancel = v(this.element, i.onTouchCancel || r)),
              (this.isMoving = !1),
              (this.multipointStart = v(this.element, i.onMultipointStart || r)),
              (this.multipointEnd = v(this.element, i.onMultipointEnd || r)),
              (this.pinch = v(this.element, i.onPinch || r)),
              (this.swipe = v(this.element, i.onSwipe || r)),
              (this.doubleTap = v(this.element, i.onDoubleTap || r)),
              (this.longTap = v(this.element, i.onLongTap || r)),
              (this.singleTap = v(this.element, i.onSingleTap || r)),
              (this.pressMove = v(this.element, i.onPressMove || r)),
              (this.twoFingerPressMove = v(this.element, i.onTwoFingerPressMove || r)),
              (this._cancelAllHandler = this.cancelAll.bind(this)),
              window.addEventListener('scroll', this._cancelAllHandler),
              (this.delta = null),
              (this.last = null),
              (this.now = null),
              (this.tapTimeout = null),
              (this.singleTapTimeout = null),
              (this.longTapTimeout = null),
              (this.swipeTimeout = null),
              (this.x1 = this.x2 = this.y1 = this.y2 = null),
              (this.preTapPosition = { x: null, y: null });
          }
          return (
            (0, a.Z)(t, [
              {
                key: 'start',
                value: function (t) {
                  var e = u(t);
                  this.isMoving || (this.isMoving = !0),
                    (this.now = Date.now()),
                    (this.x1 = e.touches[0].pageX),
                    (this.y1 = e.touches[0].pageY),
                    (this.delta = this.now - (this.last || this.now)),
                    this.touchStart.dispatch(e, this.element),
                    null !== this.preTapPosition.x &&
                      ((this.isDoubleTap =
                        this.delta > 0 &&
                        this.delta <= 250 &&
                        Math.abs(this.preTapPosition.x - this.x1) < 30 &&
                        Math.abs(this.preTapPosition.y - this.y1) < 30),
                      this.isDoubleTap && clearTimeout(this.singleTapTimeout)),
                    (this.preTapPosition.x = this.x1),
                    (this.preTapPosition.y = this.y1),
                    (this.last = this.now);
                  var i = this.preV;
                  if (e.touches.length > 1) {
                    this._cancelLongTap(), this._cancelSingleTap();
                    var s = { x: e.touches[1].pageX - this.x1, y: e.touches[1].pageY - this.y1 };
                    (i.x = s.x),
                      (i.y = s.y),
                      (this.pinchStartLen = p(i)),
                      this.multipointStart.dispatch(e, this.element);
                  }
                  (this._preventTap = !1),
                    (this.longTapTimeout = window.setTimeout(
                      function () {
                        this.longTap.dispatch(e, this.element), (this._preventTap = !0);
                      }.bind(this),
                      750
                    ));
                },
              },
              {
                key: 'move',
                value: function (t) {
                  var e, i, s, n;
                  if (this.isMoving) {
                    var h = u(t),
                      o = this.preV,
                      a = h.touches.length,
                      l = h.touches[0].pageX,
                      c = h.touches[0].pageY;
                    if (((this.isDoubleTap = !1), a > 1)) {
                      var r = h.touches[1].pageX,
                        d = h.touches[1].pageY,
                        v = { x: h.touches[1].pageX - l, y: h.touches[1].pageY - c };
                      null !== o.x &&
                        (this.pinchStartLen > 0 &&
                          ((h.scale = p(v) / this.pinchStartLen),
                          this.pinch.dispatch(h, this.element)),
                        (h.angle =
                          ((n = (function (t, e) {
                            var i = p(t) * p(e);
                            if (0 === i) return 0;
                            var s =
                              (function (t, e) {
                                return t.x * e.x + t.y * e.y;
                              })(t, e) / i;
                            return s > 1 && (s = 1), Math.acos(s);
                          })((i = v), (s = o))),
                          (function (t, e) {
                            return t.x * e.y - e.x * t.y;
                          })(i, s) > 0 && (n *= -1),
                          180 * n)),
                        this.rotate.dispatch(h, this.element)),
                        (o.x = v.x),
                        (o.y = v.y),
                        null !== this.x2 && null !== this.sx2
                          ? ((h.deltaX = (l - this.x2 + r - this.sx2) / 2),
                            (h.deltaY = (c - this.y2 + d - this.sy2) / 2))
                          : ((h.deltaX = 0), (h.deltaY = 0)),
                        this.twoFingerPressMove.dispatch(h, this.element),
                        (this.sx2 = r),
                        (this.sy2 = d);
                    } else {
                      if (null !== this.x2) {
                        (h.deltaX = l - this.x2), (h.deltaY = c - this.y2);
                        var m = Math.abs(this.x1 - this.x2),
                          T = Math.abs(this.y1 - this.y2);
                        (m > 10 || T > 10) && (this._preventTap = !0);
                      } else (h.deltaX = 0), (h.deltaY = 0);
                      this.pressMove.dispatch(h, this.element);
                    }
                    null === (e = this.touchMove) || void 0 === e || e.dispatch(h, this.element),
                      this._cancelLongTap(),
                      (this.x2 = l),
                      (this.y2 = c),
                      a > 1 && h.preventDefault();
                  }
                },
              },
              {
                key: 'end',
                value: function (t) {
                  var e,
                    i = u(t);
                  if ((this.isMoving && (this.isMoving = !1), !c || t.changedTouches)) {
                    i.touches ||
                      ((i.touches = t.touches || []),
                      (i.touches[0] = { pageX: t.pageX, pageY: t.pageY })),
                      this._cancelLongTap();
                    var s = this;
                    c &&
                      i.touches.length < 2 &&
                      (this.multipointEnd.dispatch(i, this.element), (this.sx2 = this.sy2 = null)),
                      (this.x2 && Math.abs(this.x1 - this.x2) > 30) ||
                      (this.y2 && Math.abs(this.y1 - this.y2) > 30)
                        ? ((i.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2)),
                          (this.swipeTimeout = window.setTimeout(function () {
                            s.swipe.dispatch(i, s.element);
                          }, 0)))
                        : ((this.tapTimeout = window.setTimeout(function () {
                            var t;
                            s._preventTap,
                              s.isDoubleTap &&
                                (null === (t = s.doubleTap) ||
                                  void 0 === t ||
                                  t.dispatch(i, s.element),
                                (s.isDoubleTap = !1));
                          }, 0)),
                          s.isDoubleTap ||
                            (s.singleTapTimeout = window.setTimeout(function () {
                              var t;
                              s._preventTap ||
                                null === (t = s.singleTap) ||
                                void 0 === t ||
                                t.dispatch(i, s.element);
                            }, 250))),
                      null === (e = this.touchEnd) || void 0 === e || e.dispatch(i, this.element),
                      (this.preV.x = 0),
                      (this.preV.y = 0),
                      (this.scale = 1),
                      (this.pinchStartLen = null),
                      (this.x1 = this.x2 = this.y1 = this.y2 = null);
                  }
                },
              },
              {
                key: 'cancelAll',
                value: function () {
                  (this._preventTap = !0),
                    clearTimeout(this.singleTapTimeout),
                    clearTimeout(this.longTapTimeout),
                    clearTimeout(this.swipeTimeout);
                },
              },
              {
                key: 'cancel',
                value: function (t) {
                  this.cancelAll(), this.touchCancel.dispatch(t, this.element);
                },
              },
              {
                key: '_cancelLongTap',
                value: function () {
                  clearTimeout(this.longTapTimeout);
                },
              },
              {
                key: '_cancelSingleTap',
                value: function () {
                  clearTimeout(this.singleTapTimeout);
                },
              },
              {
                key: '_swipeDirection',
                value: function (t, e, i, s) {
                  return Math.abs(t - e) >= Math.abs(i - s)
                    ? t - e > 0
                      ? 'left'
                      : 'right'
                    : i - s > 0
                    ? 'up'
                    : 'down';
                },
              },
              {
                key: 'on',
                value: function (t, e) {
                  this[t] && this[t].add(e);
                },
              },
              {
                key: 'off',
                value: function (t, e) {
                  this[t] && this[t].del(e);
                },
              },
              {
                key: 'destroy',
                value: function () {
                  return (
                    this.singleTapTimeout && clearTimeout(this.singleTapTimeout),
                    this.longTapTimeout && clearTimeout(this.longTapTimeout),
                    this.swipeTimeout && clearTimeout(this.swipeTimeout),
                    this.element.removeEventListener(c ? 'touchstart' : 'mousedown', this.start),
                    c
                      ? (this.element.removeEventListener('touchmove', this.move),
                        this.element.removeEventListener('touchend', this.end),
                        this.element.removeEventListener('touchcancel', this.cancel))
                      : (document.removeEventListener('mousemove', this.move),
                        document.removeEventListener('mouseup', this.end)),
                    this.rotate.del(),
                    this.touchStart.del(),
                    this.multipointStart.del(),
                    this.multipointEnd.del(),
                    this.pinch.del(),
                    this.swipe.del(),
                    this.doubleTap.del(),
                    this.longTap.del(),
                    this.singleTap.del(),
                    this.pressMove.del(),
                    this.twoFingerPressMove.del(),
                    this.touchMove.del(),
                    this.touchEnd.del(),
                    this.touchCancel.del(),
                    (this.preV = { x: null, y: null }),
                    (this.isMoving =
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
                        null),
                    window.removeEventListener('scroll', this._cancelAllHandler),
                    null
                  );
                },
              },
            ]),
            t
          );
        })(),
        T = i.p + 'images/pkq.3aaa0f4b.png';
      var g = i(415);
      new (i.n(g)())();
      var f = function (t, e, i) {
        var s = 'translate('
          .concat(e.x, 'px,')
          .concat(e.y, 'px) rotate(')
          .concat(e.angle, 'deg) scale(')
          .concat(e.scale, ')');
        (t.style.transform = s), (i.innerText = '坐标: ' + s);
      };
      function y() {
        var t = (0, s.useRef)({ x: 0, y: 0, angle: 0, scale: 1 }),
          e = (0, s.useRef)(),
          i = (0, s.useState)(''),
          n = (0, h.Z)(i, 2),
          o = n[0],
          a = n[1],
          l = (0, s.useRef)();
        (0, s.useEffect)(function () {
          f(e.current, t.current, l.current);
        }, []);
        var u = (0, s.useCallback)(function () {
          a('');
        }, []);
        return (
          (0, s.useLayoutEffect)(function () {
            var i = new m(e.current, {
              onDoubleTap: function () {
                a('你双击了皮卡丘');
              },
              onLongTap: function () {
                a('你长按了皮卡丘');
              },
              onPinch: function (i) {
                var s = i.scale;
                (t.current.scale = s), f(e.current, t.current, l.current), u();
              },
              onRotate: function (i) {
                var s = i.angle;
                (t.current.angle += s), f(e.current, t.current, l.current), u();
              },
              onPressMove: function (i) {
                var s = i.deltaX,
                  n = i.deltaY;
                (t.current.x = t.current.x + s),
                  (t.current.y = t.current.y + n),
                  f(e.current, t.current, l.current),
                  u();
              },
              onTwoFingerPressMove: function (e) {
                var i = e.deltaX,
                  s = e.deltaY;
                (t.current.x = t.current.x + i), (t.current.y = t.current.y + s), u();
              },
              onSwipe: function (t) {
                var e = t.direction;
                a('滑动方向:' + e);
              },
            });
            return function () {
              i.destroy();
            };
          }, []),
          s.createElement(
            'div',
            null,
            s.createElement(
              'div',
              {
                style: {
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '100%',
                  zIndex: 100,
                  padding: 12,
                },
              },
              s.createElement('div', { style: { color: '#005cff', fontSize: 18 } }, o),
              s.createElement('div', { ref: l, style: { color: '#666', fontSize: 12 } })
            ),
            s.createElement('div', {
              ref: e,
              style: {
                touchAction: 'none',
                userSelect: 'none',
                width: 200,
                height: 200,
                background: 'center / contain no-repeat url('.concat(T, ')'),
                marginLeft: 100,
                marginTop: 100,
              },
            })
          )
        );
      }
      (0, n.s)(document.querySelector('#root')).render(s.createElement(y, null));
    },
  },
  (t) => {
    t.O(0, [736], () => (3, t((t.s = 3)))), t.O();
  },
]);
