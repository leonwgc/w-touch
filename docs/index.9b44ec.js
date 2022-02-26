'use strict';
(self.webpackChunkw_touch = self.webpackChunkw_touch || []).push([
  [826],
  {
    700: (t, e, i) => {
      var n,
        s = i(294),
        o = i(935),
        h = i(289),
        l = i(648),
        a = i(925),
        r = i(168),
        c = i(438),
        u = ['title', 'padding', 'background', 'border', 'height', 'children'],
        p = c.ZP.div(
          n ||
            (n = (0, r.Z)([
              '\n  font-size: 14px;\n\n  .title {\n    padding: 12px 8px 6px;\n    color: #969696;\n    font-size: 14px;\n  }\n\n  .main {\n    border: solid 1px #eee;\n    border-right: none;\n    border-left: none;\n  }\n',
            ]))
        );
      function d(t) {
        var e = t.title,
          i = void 0 === e ? '' : e,
          n = t.padding,
          o = void 0 === n ? '12px' : n,
          h = t.background,
          l = void 0 === h ? '#fff' : h,
          r = t.border,
          c = t.height,
          d = t.children,
          m = (0, a.Z)(t, u);
        return s.createElement(
          p,
          m,
          s.createElement('div', { className: 'title' }, i),
          s.createElement(
            'div',
            { className: 'main', style: { padding: o, background: l, border: r, height: c } },
            d
          )
        );
      }
      var m = 'undefined' != typeof window && void 0 !== window.ontouchstart,
        v = function () {},
        T = function (t) {
          return Math.sqrt(t.x * t.x + t.y * t.y);
        };
      var g = function (t) {
        (this.handlers = []), (this.el = t);
      };
      function f(t, e) {
        var i = new g(t);
        return i.add(e), i;
      }
      (g.prototype.add = function (t) {
        this.handlers.push(t);
      }),
        (g.prototype.del = function (t) {
          t || (this.handlers = []);
          for (var e = this.handlers.length; e >= 0; e--)
            this.handlers[e] === t && this.handlers.splice(e, 1);
        }),
        (g.prototype.dispatch = function () {
          for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
          for (var n = 0, s = this.handlers.length; n < s; n++) {
            var o,
              h = this.handlers[n];
            null === (o = h.apply) || void 0 === o || o.call(h, this.el, e);
          }
        });
      var x = function (t, e) {
        (this.element = t),
          (this.start = this.start.bind(this)),
          (this.move = this.move.bind(this)),
          (this.end = this.end.bind(this)),
          (this.cancel = this.cancel.bind(this)),
          this.element.addEventListener(m ? 'touchstart' : 'mousedown', this.start),
          m
            ? (this.element.addEventListener('touchmove', this.move),
              this.element.addEventListener('touchend', this.end),
              this.element.addEventListener('touchcancel', this.cancel))
            : (document.addEventListener('mousemove', this.move),
              document.addEventListener('mouseup', this.end)),
          (this.preV = { x: null, y: null }),
          (this.pinchStartLen = null),
          (this.scale = 1),
          (this.isDoubleTap = !1),
          (this.rotate = f(this.element, e.onRotate || v)),
          (this.touchStart = f(this.element, e.onTouchStart || v)),
          (this.touchMove = f(this.element, e.onTouchMove || v)),
          (this.touchEnd = f(this.element, e.onTouchEnd || v)),
          (this.touchCancel = f(this.element, e.onTouchCancel || v)),
          (this.isMoving = !1),
          (this.multipointStart = f(this.element, e.onMultipointStart || v)),
          (this.multipointEnd = f(this.element, e.onMultipointEnd || v)),
          (this.pinch = f(this.element, e.onPinch || v)),
          (this.swipe = f(this.element, e.onSwipe || v)),
          (this.doubleTap = f(this.element, e.onDoubleTap || v)),
          (this.longTap = f(this.element, e.onLongTap || v)),
          (this.singleTap = f(this.element, e.onSingleTap || v)),
          (this.pressMove = f(this.element, e.onPressMove || v)),
          (this.twoFingerPressMove = f(this.element, e.onTwoFingerPressMove || v)),
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
      x.prototype = {
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
              (this.pinchStartLen = T(e)),
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
          var e, i, n, s;
          if (this.isMoving) {
            t.touches ||
              ((t.touches = t.touches || []), (t.touches[0] = { pageX: t.pageX, pageY: t.pageY }));
            var o = this.preV,
              h = t.touches.length,
              l = t.touches[0].pageX,
              a = t.touches[0].pageY;
            if (((this.isDoubleTap = !1), h > 1)) {
              var r = t.touches[1].pageX,
                c = t.touches[1].pageY,
                u = { x: t.touches[1].pageX - l, y: t.touches[1].pageY - a };
              null !== o.x &&
                (this.pinchStartLen > 0 &&
                  ((t.scale = T(u) / this.pinchStartLen), this.pinch.dispatch(t, this.element)),
                (t.angle =
                  ((s = (function (t, e) {
                    var i = T(t) * T(e);
                    if (0 === i) return 0;
                    var n =
                      (function (t, e) {
                        return t.x * e.x + t.y * e.y;
                      })(t, e) / i;
                    return n > 1 && (n = 1), Math.acos(n);
                  })((i = u), (n = o))),
                  (function (t, e) {
                    return t.x * e.y - e.x * t.y;
                  })(i, n) > 0 && (s *= -1),
                  180 * s)),
                this.rotate.dispatch(t, this.element)),
                (o.x = u.x),
                (o.y = u.y),
                null !== this.x2 && null !== this.sx2
                  ? ((t.deltaX = (l - this.x2 + r - this.sx2) / 2),
                    (t.deltaY = (a - this.y2 + c - this.sy2) / 2))
                  : ((t.deltaX = 0), (t.deltaY = 0)),
                this.twoFingerPressMove.dispatch(t, this.element),
                (this.sx2 = r),
                (this.sy2 = c);
            } else {
              if (null !== this.x2) {
                (t.deltaX = l - this.x2), (t.deltaY = a - this.y2);
                var p = Math.abs(this.x1 - this.x2),
                  d = Math.abs(this.y1 - this.y2);
                (p > 10 || d > 10) && (this._preventTap = !0);
              } else (t.deltaX = 0), (t.deltaY = 0);
              this.pressMove.dispatch(t, this.element);
            }
            null === (e = this.touchMove) || void 0 === e || e.dispatch(t, this.element),
              this._cancelLongTap(),
              (this.x2 = l),
              (this.y2 = a),
              h > 1 && t.preventDefault();
          }
        },
        end: function (t) {
          var e;
          if ((this.isMoving && (this.isMoving = !1), !m || t.changedTouches)) {
            t.touches ||
              ((t.touches = t.touches || []), (t.touches[0] = { pageX: t.pageX, pageY: t.pageY })),
              this._cancelLongTap();
            var i = this;
            m &&
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
        _swipeDirection: function (t, e, i, n) {
          return Math.abs(t - e) >= Math.abs(i - n)
            ? t - e > 0
              ? 'left'
              : 'right'
            : i - n > 0
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
            this.element.removeEventListener(m ? 'touchstart' : 'mousedown', this.start),
            m
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
      const y = x;
      var w = ['children'],
        E = function () {
          throw new Error('TouchElement: 子元素必须是dom/forwardRef到dom的组件');
        },
        b = s.forwardRef(function (t, e) {
          var i = t.children,
            n = (0, a.Z)(t, w),
            o = s.useRef();
          return (
            s.useImperativeHandle(e, function () {
              return o.current;
            }),
            s.useLayoutEffect(function () {
              var t = o.current;
              t instanceof HTMLElement || E();
              var e = new y(t, n);
              return function () {
                var t;
                null === (t = e.destroy) || void 0 === t || t.call(e);
              };
            }, []),
            s.isValidElement(i) || E(),
            s.cloneElement(i, { ref: o })
          );
        });
      b.displayName = 'TouchElement';
      const M = b;
      var L = function (t, e, i) {
        var n = 'translate('
          .concat(e.x, 'px,')
          .concat(e.y, 'px) rotate(')
          .concat(e.angle, 'deg) scale(')
          .concat(e.scale, ')');
        (t.style.transform = n), (i.innerText = n);
      };
      function S() {
        var t = (0, s.useRef)({ x: 0, y: 0, angle: 0, scale: 1 }),
          e = (0, s.useRef)(),
          i = (0, s.useRef)();
        return (
          (0, s.useEffect)(function () {
            L(e.current, t.current, i.current);
          }, []),
          s.createElement(
            'div',
            null,
            s.createElement(d, { title: '当前：' }, s.createElement('div', { ref: i })),
            s.createElement(
              d,
              { title: '手指/鼠标操作方块' },
              s.createElement(
                h.Z,
                null,
                s.createElement(
                  M,
                  {
                    onSingleTap: function () {
                      l.Z.show('tap');
                    },
                    onDoubleTap: function () {
                      l.Z.show('doubleTap');
                    },
                    onLongTap: function () {
                      l.Z.show('longTap');
                    },
                    onTouchStart: function () {
                      console.log('start');
                    },
                    onTouchEnd: function (t) {
                      console.log('end');
                    },
                    onSwipe: function (t) {
                      console.log('swipe', t.direction);
                    },
                    onPinch: function (n) {
                      console.log('scale:', n.scale),
                        (t.current.scale = n.scale),
                        L(e.current, t.current, i.current);
                    },
                    onRotate: function (n) {
                      console.log('angle:', n.angle),
                        (t.current.angle += n.angle),
                        L(e.current, t.current, i.current);
                    },
                    onPressMove: function (n) {
                      console.log(n.deltaX, n.deltaY),
                        (t.current.x = t.current.x + n.deltaX),
                        (t.current.y = t.current.y + n.deltaY),
                        L(e.current, t.current, i.current);
                    },
                    onTwoFingerPressMove: function (e) {
                      console.log(e.deltaX, e.deltaY),
                        (t.current.x = t.current.x + e.deltaX),
                        (t.current.y = t.current.y + e.deltaY);
                    },
                    ref: e,
                  },
                  s.createElement('div', {
                    style: {
                      width: 120,
                      height: 120,
                      border: '1px solid red',
                      position: 'relative',
                    },
                  })
                )
              )
            )
          )
        );
      }
      o.render(s.createElement(S, null), document.querySelector('#root'));
    },
  },
  (t) => {
    t.O(0, [736], () => (700, t((t.s = 700)))), t.O();
  },
]);
