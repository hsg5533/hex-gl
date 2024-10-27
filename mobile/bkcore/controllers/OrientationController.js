(function () {
  var t, a, i;
  (t = (function () {
    class t {
      constructor(t, a, i) {
        var e = this;
        (this.dom = t),
          (this.registerTouch = null == a || a),
          (this.touchCallback = null != i ? i : null),
          (this.active = !0),
          (this.alpha = 0),
          (this.beta = 0),
          (this.gamma = 0),
          (this.dalpha = null),
          (this.dbeta = null),
          (this.dgamma = null),
          (this.touches = null),
          window.addEventListener(
            "deviceorientation",
            function (t) {
              return e.orientationChange(t);
            },
            !1
          ),
          this.registerTouch &&
            (this.dom.addEventListener(
              "touchstart",
              function (t) {
                return e.touchStart(t);
              },
              !1
            ),
            this.dom.addEventListener(
              "touchend",
              function (t) {
                return e.touchEnd(t);
              },
              !1
            ));
      }
      static isCompatible() {
        return "DeviceOrientationEvent" in window;
      }
      orientationChange(t) {
        if (this.active)
          return (
            null === this.dalpha &&
              (console.log("calbrate", t.beta),
              (this.dalpha = t.alpha),
              (this.dbeta = t.beta),
              (this.dgamma = t.gamma)),
            (this.alpha = t.alpha - this.dalpha),
            (this.beta = t.beta - this.dbeta),
            (this.gamma = t.gamma - this.dgamma),
            !1
          );
      }
      touchStart(t) {
        var a, i, e, n;
        if (this.active) {
          for (i = 0, e = (n = t.changedTouches).length; i < e; i++)
            (a = n[i]),
              "function" == typeof this.touchCallback &&
                this.touchCallback(!0, a, t);
          return (this.touches = t.touches), !1;
        }
      }
      touchEnd(t) {
        var a, i, e, n;
        if (this.active) {
          for (i = 0, e = (n = t.changedTouches).length; i < e; i++)
            (a = n[i]),
              "function" == typeof this.touchCallback &&
                this.touchCallback(!0, a, t);
          return (this.touches = t.touches), !1;
        }
      }
    }
    return t;
  })()),
    (a = null != a ? a : this).bkcore || (a.bkcore = {}),
    (i = a.bkcore).controllers || (i.controllers = {}),
    (a.bkcore.controllers.OrientationController = t);
}).call(this);
