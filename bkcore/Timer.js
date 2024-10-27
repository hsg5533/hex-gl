(function () {
  var t, i;
  (t = (function () {
    class t {
      constructor() {
        (this.time = {
          start: 0,
          current: 0,
          previous: 0,
          elapsed: 0,
          delta: 0,
        }),
          (this.active = !1);
      }
      static msToTime(t) {
        var i, e, r, s;
        return (
          (r = t % 1e3),
          (s = Math.floor((t / 1e3) % 60)),
          (e = Math.floor((t / 6e4) % 60)),
          { h: (i = Math.floor(t / 36e5)), m: e, s: s, ms: r, ms: r }
        );
      }
      static msToTimeString(t) {
        var i;
        return (
          ((i = this.msToTime(t)).h = this.zfill(i.h, 2)),
          (i.m = this.zfill(i.m, 2)),
          (i.s = this.zfill(i.s, 2)),
          (i.ms = this.zfill(i.ms, 4)),
          i
        );
      }
      static zfill(t, i) {
        var e;
        return (e = i - t.toString().length) > 0
          ? Array(e + 1).join("0") + t
          : t.toString();
      }
      start() {
        var t;
        return (
          (t = new Date().getTime()),
          (this.time.start = t),
          (this.time.current = t),
          (this.time.previous = t),
          (this.time.elapsed = 0),
          (this.time.delta = 0),
          (this.active = !0)
        );
      }
      pause(t) {
        return (this.active = !t);
      }
      update() {
        var t;
        if (this.active)
          return (
            (t = new Date().getTime()),
            (this.time.current = t),
            (this.time.elapsed = this.time.current - this.time.start),
            (this.time.delta = t - this.time.previous),
            (this.time.previous = t)
          );
      }
      getElapsedTime() {
        return this.constructor.msToTime(this.time.elapsed);
      }
    }
    return t;
  })()),
    (i = null != i ? i : this).bkcore || (i.bkcore = {}),
    (i.bkcore.Timer = t);
}).call(this);
