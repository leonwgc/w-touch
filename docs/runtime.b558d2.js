(() => {
  'use strict';
  var r,
    e = {},
    o = {};
  function t(r) {
    var n = o[r];
    if (void 0 !== n) return n.exports;
    var a = (o[r] = { exports: {} });
    return e[r](a, a.exports, t), a.exports;
  }
  (t.m = e),
    (r = []),
    (t.O = (e, o, n, a) => {
      if (!o) {
        var u = 1 / 0;
        for (s = 0; s < r.length; s++) {
          for (var [o, n, a] = r[s], f = !0, i = 0; i < o.length; i++)
            (!1 & a || u >= a) && Object.keys(t.O).every((r) => t.O[r](o[i]))
              ? o.splice(i--, 1)
              : ((f = !1), a < u && (u = a));
          if (f) {
            r.splice(s--, 1);
            var l = n();
            void 0 !== l && (e = l);
          }
        }
        return e;
      }
      a = a || 0;
      for (var s = r.length; s > 0 && r[s - 1][2] > a; s--) r[s] = r[s - 1];
      r[s] = [o, n, a];
    }),
    (t.n = (r) => {
      var e = r && r.__esModule ? () => r.default : () => r;
      return t.d(e, { a: e }), e;
    }),
    (t.d = (r, e) => {
      for (var o in e)
        t.o(e, o) && !t.o(r, o) && Object.defineProperty(r, o, { enumerable: !0, get: e[o] });
    }),
    (t.o = (r, e) => Object.prototype.hasOwnProperty.call(r, e)),
    (() => {
      var r = { 666: 0 };
      t.O.j = (e) => 0 === r[e];
      var e = (e, o) => {
          var n,
            a,
            [u, f, i] = o,
            l = 0;
          if (u.some((e) => 0 !== r[e])) {
            for (n in f) t.o(f, n) && (t.m[n] = f[n]);
            if (i) var s = i(t);
          }
          for (e && e(o); l < u.length; l++) (a = u[l]), t.o(r, a) && r[a] && r[a][0](), (r[a] = 0);
          return t.O(s);
        },
        o = (self.webpackChunkw_touch = self.webpackChunkw_touch || []);
      o.forEach(e.bind(null, 0)), (o.push = e.bind(null, o.push.bind(o)));
    })();
})();
