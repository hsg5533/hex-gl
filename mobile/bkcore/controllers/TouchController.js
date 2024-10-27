(function () {
  var t, i, s, o;
  (t = (function () {
    class t {
      constructor(t, s, o) {
        var n = this;
        (this.dom = t),
          (this.stickMargin = null != s ? s : 200),
          (this.buttonCallback = null != o ? o : null),
          (this.active = !0),
          (this.touches = null),
          (this.stickID = -1),
          (this.stickPos = new i(0, 0)),
          (this.stickStartPos = new i(0, 0)),
          (this.stickVector = new i(0, 0)),
          this.dom.addEventListener(
            "touchstart",
            function (t) {
              return n.touchStart(t);
            },
            !1
          ),
          this.dom.addEventListener(
            "touchmove",
            function (t) {
              return n.touchMove(t);
            },
            !1
          ),
          this.dom.addEventListener(
            "touchend",
            function (t) {
              return n.touchEnd(t);
            },
            !1
          );
      }
      static isCompatible() {
        return "ontouchstart" in document.documentElement;
      }
      touchStart(t) {
        var i, s, o, n;
        if (this.active) {
          for (s = 0, o = (n = t.changedTouches).length; s < o; s++) {
            if (
              ((i = n[s]), this.stickID < 0 && i.clientX < this.stickMargin)
            ) {
              (this.stickID = i.identifier),
                this.stickStartPos.set(i.clientX, i.clientY),
                this.stickPos.copy(this.stickStartPos),
                this.stickVector.set(0, 0);
              continue;
            }
            "function" == typeof this.buttonCallback &&
              this.buttonCallback(!0, i, t);
          }
          return (this.touches = t.touches), !1;
        }
      }
      touchMove(t) {
        var i, s, o, n;
        if ((t.preventDefault(), this.active)) {
          for (s = 0, o = (n = t.changedTouches).length; s < o; s++)
            if (((i = n[s]), this.stickID === i.identifier)) {
              this.stickPos.set(i.clientX, i.clientY),
                this.stickVector
                  .copy(this.stickPos)
                  .substract(this.stickStartPos);
              break;
            }
          return (this.touches = t.touches), !1;
        }
      }
      touchEnd(t) {
        var i, s, o, n;
        if (this.active) {
          for (
            s = 0, this.touches = t.touches, o = (n = t.changedTouches).length;
            s < o;
            s++
          ) {
            if (((i = n[s]), this.stickID === i.identifier)) {
              (this.stickID = -1), this.stickVector.set(0, 0);
              break;
            }
            "function" == typeof this.buttonCallback &&
              this.buttonCallback(!1, i, t);
          }
          return !1;
        }
      }
    }
    return t;
  })()),
    (i = (function () {
      class t {
        constructor(t, i) {
          (this.x = null != t ? t : 0), (this.y = null != i ? i : 0);
        }
        substract(t) {
          return (this.x -= t.x), (this.y -= t.y), this;
        }
        copy(t) {
          return (this.x = t.x), (this.y = t.y), this;
        }
        set(t, i) {
          return (this.x = t), (this.y = i), this;
        }
      }
      return t;
    })()),
    (s = null != s ? s : this).bkcore || (s.bkcore = {}),
    (o = s.bkcore).controllers || (o.controllers = {}),
    (s.bkcore.controllers.TouchController = t);
}).call(this);
