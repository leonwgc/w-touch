'use strict';
(self.webpackChunkw_touch = self.webpackChunkw_touch || []).push([
  [826],
  {
    481: (t, e, i) => {
      var s = i(294),
        n = i(935),
        h = i(132),
        o = i(305),
        l = i(925),
        a = 'undefined' != typeof window && void 0 !== window.ontouchstart,
        u = function () {},
        c = function (t) {
          return Math.sqrt(t.x * t.x + t.y * t.y);
        };
      var r = function (t) {
        (this.handlers = []), (this.el = t);
      };
      function p(t, e) {
        var i = new r(t);
        return i.add(e), i;
      }
      (r.prototype.add = function (t) {
        this.handlers.push(t);
      }),
        (r.prototype.del = function (t) {
          t || (this.handlers = []);
          for (var e = this.handlers.length; e >= 0; e--)
            this.handlers[e] === t && this.handlers.splice(e, 1);
        }),
        (r.prototype.dispatch = function () {
          for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
          for (var s = 0, n = this.handlers.length; s < n; s++) {
            var h,
              o = this.handlers[s];
            null === (h = o.apply) || void 0 === h || h.call(o, this.el, e);
          }
        });
      var d = function (t, e) {
        (this.element = t),
          (this.start = this.start.bind(this)),
          (this.move = this.move.bind(this)),
          (this.end = this.end.bind(this)),
          (this.cancel = this.cancel.bind(this)),
          this.element.addEventListener(a ? 'touchstart' : 'mousedown', this.start),
          a
            ? (this.element.addEventListener('touchmove', this.move),
              this.element.addEventListener('touchend', this.end),
              this.element.addEventListener('touchcancel', this.cancel))
            : (document.addEventListener('mousemove', this.move),
              document.addEventListener('mouseup', this.end)),
          (this.preV = { x: null, y: null }),
          (this.pinchStartLen = null),
          (this.scale = 1),
          (this.isDoubleTap = !1),
          (this.rotate = p(this.element, e.onRotate || u)),
          (this.touchStart = p(this.element, e.onTouchStart || u)),
          (this.touchMove = p(this.element, e.onTouchMove || u)),
          (this.touchEnd = p(this.element, e.onTouchEnd || u)),
          (this.touchCancel = p(this.element, e.onTouchCancel || u)),
          (this.isMoving = !1),
          (this.multipointStart = p(this.element, e.onMultipointStart || u)),
          (this.multipointEnd = p(this.element, e.onMultipointEnd || u)),
          (this.pinch = p(this.element, e.onPinch || u)),
          (this.swipe = p(this.element, e.onSwipe || u)),
          (this.doubleTap = p(this.element, e.onDoubleTap || u)),
          (this.longTap = p(this.element, e.onLongTap || u)),
          (this.singleTap = p(this.element, e.onSingleTap || u)),
          (this.pressMove = p(this.element, e.onPressMove || u)),
          (this.twoFingerPressMove = p(this.element, e.onTwoFingerPressMove || u)),
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
      };
      d.prototype = {
        start: function (t) {
          t.touches ||
            ((t.touches = t.touches || []), (t.touches[0] = { pageX: t.pageX, pageY: t.pageY })),
            this.isMoving || (this.isMoving = !0),
            (this.now = Date.now()),
            (this.x1 = t.touches[0].pageX),
            (this.y1 = t.touches[0].pageY),
            (this.delta = this.now - (this.last || this.now)),
            this.touchStart.dispatch(t, this.element),
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
          var e = this.preV;
          if (t.touches.length > 1) {
            this._cancelLongTap(), this._cancelSingleTap();
            var i = { x: t.touches[1].pageX - this.x1, y: t.touches[1].pageY - this.y1 };
            (e.x = i.x),
              (e.y = i.y),
              (this.pinchStartLen = c(e)),
              this.multipointStart.dispatch(t, this.element);
          }
          (this._preventTap = !1),
            (this.longTapTimeout = setTimeout(
              function () {
                this.longTap.dispatch(t, this.element), (this._preventTap = !0);
              }.bind(this),
              750
            ));
        },
        move: function (t) {
          var e, i, s, n;
          if (this.isMoving) {
            t.touches ||
              ((t.touches = t.touches || []), (t.touches[0] = { pageX: t.pageX, pageY: t.pageY }));
            var h = this.preV,
              o = t.touches.length,
              l = t.touches[0].pageX,
              a = t.touches[0].pageY;
            if (((this.isDoubleTap = !1), o > 1)) {
              var u = t.touches[1].pageX,
                r = t.touches[1].pageY,
                p = { x: t.touches[1].pageX - l, y: t.touches[1].pageY - a };
              null !== h.x &&
                (this.pinchStartLen > 0 &&
                  ((t.scale = c(p) / this.pinchStartLen), this.pinch.dispatch(t, this.element)),
                (t.angle =
                  ((n = (function (t, e) {
                    var i = c(t) * c(e);
                    if (0 === i) return 0;
                    var s =
                      (function (t, e) {
                        return t.x * e.x + t.y * e.y;
                      })(t, e) / i;
                    return s > 1 && (s = 1), Math.acos(s);
                  })((i = p), (s = h))),
                  (function (t, e) {
                    return t.x * e.y - e.x * t.y;
                  })(i, s) > 0 && (n *= -1),
                  180 * n)),
                this.rotate.dispatch(t, this.element)),
                (h.x = p.x),
                (h.y = p.y),
                null !== this.x2 && null !== this.sx2
                  ? ((t.deltaX = (l - this.x2 + u - this.sx2) / 2),
                    (t.deltaY = (a - this.y2 + r - this.sy2) / 2))
                  : ((t.deltaX = 0), (t.deltaY = 0)),
                this.twoFingerPressMove.dispatch(t, this.element),
                (this.sx2 = u),
                (this.sy2 = r);
            } else {
              if (null !== this.x2) {
                (t.deltaX = l - this.x2), (t.deltaY = a - this.y2);
                var d = Math.abs(this.x1 - this.x2),
                  m = Math.abs(this.y1 - this.y2);
                (d > 10 || m > 10) && (this._preventTap = !0);
              } else (t.deltaX = 0), (t.deltaY = 0);
              this.pressMove.dispatch(t, this.element);
            }
            null === (e = this.touchMove) || void 0 === e || e.dispatch(t, this.element),
              this._cancelLongTap(),
              (this.x2 = l),
              (this.y2 = a),
              o > 1 && t.preventDefault();
          }
        },
        end: function (t) {
          var e;
          if ((this.isMoving && (this.isMoving = !1), !a || t.changedTouches)) {
            t.touches ||
              ((t.touches = t.touches || []), (t.touches[0] = { pageX: t.pageX, pageY: t.pageY })),
              this._cancelLongTap();
            var i = this;
            a &&
              t.touches.length < 2 &&
              (this.multipointEnd.dispatch(t, this.element), (this.sx2 = this.sy2 = null)),
              (this.x2 && Math.abs(this.x1 - this.x2) > 30) ||
              (this.y2 && Math.abs(this.y1 - this.y2) > 30)
                ? ((t.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2)),
                  (this.swipeTimeout = setTimeout(function () {
                    i.swipe.dispatch(t, i.element);
                  }, 0)))
                : ((this.tapTimeout = setTimeout(function () {
                    var e;
                    i._preventTap,
                      i.isDoubleTap &&
                        (null === (e = i.doubleTap) || void 0 === e || e.dispatch(t, i.element),
                        (i.isDoubleTap = !1));
                  }, 0)),
                  i.isDoubleTap ||
                    (i.singleTapTimeout = setTimeout(function () {
                      var e;
                      i._preventTap ||
                        null === (e = i.singleTap) ||
                        void 0 === e ||
                        e.dispatch(t, i.element);
                    }, 250))),
              null === (e = this.touchEnd) || void 0 === e || e.dispatch(t, this.element),
              (this.preV.x = 0),
              (this.preV.y = 0),
              (this.scale = 1),
              (this.pinchStartLen = null),
              (this.x1 = this.x2 = this.y1 = this.y2 = null);
          }
        },
        cancelAll: function () {
          (this._preventTap = !0),
            clearTimeout(this.singleTapTimeout),
            clearTimeout(this.longTapTimeout),
            clearTimeout(this.swipeTimeout);
        },
        cancel: function (t) {
          this.cancelAll(), this.touchCancel.dispatch(t, this.element);
        },
        _cancelLongTap: function () {
          clearTimeout(this.longTapTimeout);
        },
        _cancelSingleTap: function () {
          clearTimeout(this.singleTapTimeout);
        },
        _swipeDirection: function (t, e, i, s) {
          return Math.abs(t - e) >= Math.abs(i - s)
            ? t - e > 0
              ? 'left'
              : 'right'
            : i - s > 0
            ? 'up'
            : 'down';
        },
        on: function (t, e) {
          this[t] && this[t].add(e);
        },
        off: function (t, e) {
          this[t] && this[t].del(e);
        },
        destroy: function () {
          return (
            this.singleTapTimeout && clearTimeout(this.singleTapTimeout),
            this.longTapTimeout && clearTimeout(this.longTapTimeout),
            this.swipeTimeout && clearTimeout(this.swipeTimeout),
            this.element.removeEventListener(a ? 'touchstart' : 'mousedown', this.start),
            a
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
      };
      const m = d;
      var T = ['children'],
        v = function () {
          throw new Error('TouchElement: 子元素必须是dom/forwardRef到dom的组件');
        },
        g = s.forwardRef(function (t, e) {
          var i = t.children,
            n = (0, l.Z)(t, T),
            h = s.useRef();
          return (
            s.useImperativeHandle(e, function () {
              return h.current;
            }),
            s.useLayoutEffect(function () {
              var t = h.current;
              t instanceof HTMLElement || v();
              var e = new m(t, n);
              return function () {
                var t;
                null === (t = e.destroy) || void 0 === t || t.call(e);
              };
            }, []),
            s.isValidElement(i) || v(),
            s.cloneElement(i, { ref: h })
          );
        });
      g.displayName = 'TouchElement';
      const f = g;
      var y = i(204),
        x = function (t, e, i) {
          var s = 'translate('
            .concat(e.x, 'px,')
            .concat(e.y, 'px) rotate(')
            .concat(e.angle, 'deg) scale(')
            .concat(e.scale, ')');
          (t.style.transform = s), (i.innerText = '坐标: ' + s);
        };
      function w() {
        var t = (0, s.useRef)({ x: 0, y: 0, angle: 0, scale: 1 }),
          e = (0, s.useRef)(),
          i = (0, s.useRef)();
        return (
          (0, h.Z)(function () {
            document.title = 'w-touch: 操作皮卡丘';
          }),
          (0, s.useEffect)(function () {
            x(e.current, t.current, i.current);
          }, []),
          s.createElement(
            'div',
            null,
            s.createElement('div', { ref: i, style: { color: '#666', fontSize: 12 } }),
            s.createElement(
              f,
              {
                onSingleTap: function () {
                  o.Z.show('你点击了皮卡丘');
                },
                onDoubleTap: function () {
                  o.Z.show('你双击了皮卡丘');
                },
                onLongTap: function () {
                  o.Z.show('你长按了皮卡丘');
                },
                onSwipe: function (t) {
                  o.Z.show('拖动方向' + t.direction);
                },
                onPinch: function (s) {
                  (t.current.scale = s.scale), x(e.current, t.current, i.current);
                },
                onRotate: function (s) {
                  (t.current.angle += s.angle), x(e.current, t.current, i.current);
                },
                onPressMove: function (s) {
                  (t.current.x = t.current.x + s.deltaX),
                    (t.current.y = t.current.y + s.deltaY),
                    x(e.current, t.current, i.current);
                },
                onTwoFingerPressMove: function (e) {
                  (t.current.x = t.current.x + e.deltaX), (t.current.y = t.current.y + e.deltaY);
                },
                ref: e,
              },
              s.createElement('img', { src: y })
            )
          )
        );
      }
      n.render(s.createElement(w, null), document.querySelector('#root'));
    },
    204: (t, e, i) => {
      t.exports = i.p + 'images/pkq.3aaa0f4b.png';
    },
  },
  (t) => {
    t.O(0, [736], () => (481, t((t.s = 481)))), t.O();
  },
]);
