(function () {
  var i, t;
  (i = (function () {
    class i {
      constructor(i, t) {
        var e = this;
        (this.image = new Image()),
          (this.pixels = null),
          (this.canvas = null),
          (this.loaded = !1),
          (this.image.onload = function () {
            var i;
            return (
              (e.canvas = document.createElement("canvas")),
              (e.canvas.width = e.image.width),
              (e.canvas.height = e.image.height),
              (i = e.canvas.getContext("2d")).drawImage(e.image, 0, 0),
              (e.pixels = i.getImageData(
                0,
                0,
                e.canvas.width,
                e.canvas.height
              )),
              (e.loaded = !0),
              (i = null),
              (e.canvas = null),
              (e.image = null),
              null != t ? t.call(e) : void 0
            );
          }),
          (this.image.crossOrigin = "anonymous"),
          (this.image.src = i);
      }
      getPixel(i, t) {
        var e;
        return !(null != this.pixels) ||
          i < 0 ||
          t < 0 ||
          i >= this.pixels.width ||
          t >= this.pixels.height
          ? { r: 0, g: 0, b: 0, a: 0 }
          : ((e = (t * this.pixels.width + i) * 4),
            {
              r: this.pixels.data[e],
              g: this.pixels.data[e + 1],
              b: this.pixels.data[e + 2],
              a: this.pixels.data[e + 3],
            });
      }
      getPixelBilinear(i, t) {
        var e, a, l, n, s, r, g, h, o, c, u, x, $, _;
        return (
          ($ = Math.floor(i)),
          (_ = Math.floor(t)),
          (u = i - $ - 0.5),
          (x = t - _ - 0.5),
          (e = Math.abs(u)),
          (a = Math.abs(x)),
          (o = u < 0 ? -1 : 1),
          (c = x < 0 ? -1 : 1),
          (l = this.getPixel($, _)),
          (r = this.getPixel($ + o, _)),
          (h = this.getPixel($, _ + c)),
          (g = this.getPixel($ + o, _ + c)),
          (n = [
            (1 - e) * l.r + e * r.r,
            (1 - e) * l.g + e * r.g,
            (1 - e) * l.b + e * r.b,
            (1 - e) * l.a + e * r.a,
          ]),
          (s = [
            (1 - e) * h.r + e * g.r,
            (1 - e) * h.g + e * g.g,
            (1 - e) * h.b + e * g.b,
            (1 - e) * h.a + e * g.a,
          ]),
          {
            r: (1 - a) * n[0] + a * s[0],
            g: (1 - a) * n[1] + a * s[1],
            b: (1 - a) * n[2] + a * s[2],
            a: (1 - a) * n[3] + a * s[3],
          }
        );
      }
      getPixelF(i, t) {
        var e;
        return (e = this.getPixel(i, t)).r + 255 * e.g + 65025 * e.b;
      }
      getPixelFBilinear(i, t) {
        var e;
        return (e = this.getPixelBilinear(i, t)).r + 255 * e.g + 65025 * e.b;
      }
    }
    return i;
  })()),
    (t = null != t ? t : this).bkcore || (t.bkcore = {}),
    (t.bkcore.ImageData = i);
}).call(this);
