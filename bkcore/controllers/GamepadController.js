(function () {
  var t, e, s;
  (t = (function () {
    class t {
      constructor(t) {
        (this.buttonPressCallback = t),
          (this.active = !0),
          (this.leftStickArray = []),
          (this.rightStickArray = []);
      }
      static isCompatible() {
        return "getGamepads" in navigator || "webkitGetGamepads" in navigator;
      }
      updateAvailable() {
        var t, e, s, l, r, i, n, a, o, u;
        return (
          !!this.active &&
          null !=
            (e = navigator.getGamepads
              ? navigator.getGamepads()
              : navigator.webkitGetGamepads()) &&
          !!e[0] &&
          (null != (s = e[0]).buttons && null != s.axes
            ? ((this.lstickx = s.axes[0]),
              (t = s.buttons[0]),
              (l = s.buttons[6]),
              (r = s.buttons[7]),
              (i = s.buttons[8]),
              (this.acceleration = null != (n = t.pressed) ? n : t),
              (this.ltrigger = null != (a = l.pressed) ? a : l),
              (this.rtrigger = null != (o = r.pressed) ? o : r),
              (this.select = null != (u = i.pressed) ? u : i),
              this.buttonPressCallback(this),
              !0)
            : void 0)
        );
      }
    }
    return t;
  })()),
    (e = null != e ? e : this).bkcore || (e.bkcore = {}),
    (s = e.bkcore).controllers || (s.controllers = {}),
    (e.bkcore.controllers.GamepadController = t);
}).call(this);
