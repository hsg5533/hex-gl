"use strict";
var THREE = THREE || { REVISION: "50dev" };
self.console ||
  (self.console = {
    info: function () {},
    log: function () {},
    debug: function () {},
    warn: function () {},
    error: function () {},
  }),
  self.Int32Array || ((self.Int32Array = Array), (self.Float32Array = Array)),
  (function () {
    for (
      var e = 0, t = ["ms", "moz", "webkit", "o"], i = 0;
      i < t.length && !window.requestAnimationFrame;
      ++i
    )
      (window.requestAnimationFrame = window[t[i] + "RequestAnimationFrame"]),
        (window.cancelAnimationFrame =
          window[t[i] + "CancelAnimationFrame"] ||
          window[t[i] + "CancelRequestAnimationFrame"]);
    window.requestAnimationFrame ||
      (window.requestAnimationFrame = function (t) {
        var i = Date.now(),
          r = Math.max(0, 16 - (i - e)),
          o = window.setTimeout(function () {
            t(i + r);
          }, r);
        return (e = i + r), o;
      }),
      window.cancelAnimationFrame ||
        (window.cancelAnimationFrame = function (e) {
          clearTimeout(e);
        });
  })(),
  (THREE.NoShading = 0),
  (THREE.FlatShading = 1),
  (THREE.SmoothShading = 2),
  (THREE.NoColors = 0),
  (THREE.FaceColors = 1),
  (THREE.VertexColors = 2),
  (THREE.NoBlending = 0),
  (THREE.NormalBlending = 1),
  (THREE.AdditiveBlending = 2),
  (THREE.SubtractiveBlending = 3),
  (THREE.MultiplyBlending = 4),
  (THREE.CustomBlending = 5),
  (THREE.AddEquation = 100),
  (THREE.SubtractEquation = 101),
  (THREE.ReverseSubtractEquation = 102),
  (THREE.ZeroFactor = 200),
  (THREE.OneFactor = 201),
  (THREE.SrcColorFactor = 202),
  (THREE.OneMinusSrcColorFactor = 203),
  (THREE.SrcAlphaFactor = 204),
  (THREE.OneMinusSrcAlphaFactor = 205),
  (THREE.DstAlphaFactor = 206),
  (THREE.OneMinusDstAlphaFactor = 207),
  (THREE.DstColorFactor = 208),
  (THREE.OneMinusDstColorFactor = 209),
  (THREE.SrcAlphaSaturateFactor = 210),
  (THREE.MultiplyOperation = 0),
  (THREE.MixOperation = 1),
  (THREE.UVMapping = function () {}),
  (THREE.CubeReflectionMapping = function () {}),
  (THREE.CubeRefractionMapping = function () {}),
  (THREE.SphericalReflectionMapping = function () {}),
  (THREE.SphericalRefractionMapping = function () {}),
  (THREE.RepeatWrapping = 1e3),
  (THREE.ClampToEdgeWrapping = 1001),
  (THREE.MirroredRepeatWrapping = 1002),
  (THREE.NearestFilter = 1003),
  (THREE.NearestMipMapNearestFilter = 1004),
  (THREE.NearestMipMapLinearFilter = 1005),
  (THREE.LinearFilter = 1006),
  (THREE.LinearMipMapNearestFilter = 1007),
  (THREE.LinearMipMapLinearFilter = 1008),
  (THREE.UnsignedByteType = 1009),
  (THREE.ByteType = 1010),
  (THREE.ShortType = 1011),
  (THREE.UnsignedShortType = 1012),
  (THREE.IntType = 1013),
  (THREE.UnsignedIntType = 1014),
  (THREE.FloatType = 1015),
  (THREE.UnsignedShort4444Type = 1016),
  (THREE.UnsignedShort5551Type = 1017),
  (THREE.UnsignedShort565Type = 1018),
  (THREE.AlphaFormat = 1019),
  (THREE.RGBFormat = 1020),
  (THREE.RGBAFormat = 1021),
  (THREE.LuminanceFormat = 1022),
  (THREE.LuminanceAlphaFormat = 1023),
  (THREE.Clock = function (e) {
    (this.autoStart = void 0 === e || e),
      (this.elapsedTime = this.oldTime = this.startTime = 0),
      (this.running = !1);
  }),
  (THREE.Clock.prototype.start = function () {
    (this.oldTime = this.startTime = Date.now()), (this.running = !0);
  }),
  (THREE.Clock.prototype.stop = function () {
    this.getElapsedTime(), (this.running = !1);
  }),
  (THREE.Clock.prototype.getElapsedTime = function () {
    return (this.elapsedTime = this.elapsedTime + this.getDelta());
  }),
  (THREE.Clock.prototype.getDelta = function () {
    var e = 0;
    if ((this.autoStart && !this.running && this.start(), this.running)) {
      var t = Date.now(),
        e = 0.001 * (t - this.oldTime);
      (this.oldTime = t), (this.elapsedTime = this.elapsedTime + e);
    }
    return e;
  }),
  (THREE.Color = function (e) {
    return void 0 !== e && this.setHex(e), this;
  }),
  (THREE.Color.prototype = {
    constructor: THREE.Color,
    r: 1,
    g: 1,
    b: 1,
    copy: function (e) {
      return (this.r = e.r), (this.g = e.g), (this.b = e.b), this;
    },
    copyGammaToLinear: function (e) {
      return (
        (this.r = e.r * e.r), (this.g = e.g * e.g), (this.b = e.b * e.b), this
      );
    },
    copyLinearToGamma: function (e) {
      return (
        (this.r = Math.sqrt(e.r)),
        (this.g = Math.sqrt(e.g)),
        (this.b = Math.sqrt(e.b)),
        this
      );
    },
    convertGammaToLinear: function () {
      var e = this.r,
        t = this.g,
        i = this.b;
      return (this.r = e * e), (this.g = t * t), (this.b = i * i), this;
    },
    convertLinearToGamma: function () {
      return (
        (this.r = Math.sqrt(this.r)),
        (this.g = Math.sqrt(this.g)),
        (this.b = Math.sqrt(this.b)),
        this
      );
    },
    setRGB: function (e, t, i) {
      return (this.r = e), (this.g = t), (this.b = i), this;
    },
    setHSV: function (e, t, i) {
      var r, o, n;
      return (
        0 === i
          ? (this.r = this.g = this.b = 0)
          : ((r = Math.floor(6 * e)),
            (o = 6 * e - r),
            (e = i * (1 - t)),
            (n = i * (1 - t * o)),
            (t = i * (1 - t * (1 - o))),
            0 === r
              ? ((this.r = i), (this.g = t), (this.b = e))
              : 1 === r
              ? ((this.r = n), (this.g = i), (this.b = e))
              : 2 === r
              ? ((this.r = e), (this.g = i), (this.b = t))
              : 3 === r
              ? ((this.r = e), (this.g = n), (this.b = i))
              : 4 === r
              ? ((this.r = t), (this.g = e), (this.b = i))
              : 5 === r && ((this.r = i), (this.g = e), (this.b = n))),
        this
      );
    },
    setHex: function (e) {
      return (
        (e = Math.floor(e)),
        (this.r = ((e >> 16) & 255) / 255),
        (this.g = ((e >> 8) & 255) / 255),
        (this.b = (255 & e) / 255),
        this
      );
    },
    lerpSelf: function (e, t) {
      return (
        (this.r = this.r + (e.r - this.r) * t),
        (this.g = this.g + (e.g - this.g) * t),
        (this.b = this.b + (e.b - this.b) * t),
        this
      );
    },
    getHex: function () {
      return (
        (Math.floor(255 * this.r) << 16) ^
        (Math.floor(255 * this.g) << 8) ^
        Math.floor(255 * this.b)
      );
    },
    getContextStyle: function () {
      return (
        "rgb(" +
        Math.floor(255 * this.r) +
        "," +
        Math.floor(255 * this.g) +
        "," +
        Math.floor(255 * this.b) +
        ")"
      );
    },
    clone: function () {
      return new THREE.Color().setRGB(this.r, this.g, this.b);
    },
  }),
  (THREE.Vector2 = function (e, t) {
    (this.x = e || 0), (this.y = t || 0);
  }),
  (THREE.Vector2.prototype = {
    constructor: THREE.Vector2,
    set: function (e, t) {
      return (this.x = e), (this.y = t), this;
    },
    copy: function (e) {
      return (this.x = e.x), (this.y = e.y), this;
    },
    add: function (e, t) {
      return (this.x = e.x + t.x), (this.y = e.y + t.y), this;
    },
    addSelf: function (e) {
      return (this.x = this.x + e.x), (this.y = this.y + e.y), this;
    },
    sub: function (e, t) {
      return (this.x = e.x - t.x), (this.y = e.y - t.y), this;
    },
    subSelf: function (e) {
      return (this.x = this.x - e.x), (this.y = this.y - e.y), this;
    },
    multiplyScalar: function (e) {
      return (this.x = this.x * e), (this.y = this.y * e), this;
    },
    divideScalar: function (e) {
      return (
        e ? ((this.x = this.x / e), (this.y = this.y / e)) : this.set(0, 0),
        this
      );
    },
    negate: function () {
      return this.multiplyScalar(-1);
    },
    dot: function (e) {
      return this.x * e.x + this.y * e.y;
    },
    lengthSq: function () {
      return this.x * this.x + this.y * this.y;
    },
    length: function () {
      return Math.sqrt(this.lengthSq());
    },
    normalize: function () {
      return this.divideScalar(this.length());
    },
    distanceTo: function (e) {
      return Math.sqrt(this.distanceToSquared(e));
    },
    distanceToSquared: function (e) {
      var t = this.x - e.x,
        e = this.y - e.y;
      return t * t + e * e;
    },
    setLength: function (e) {
      return this.normalize().multiplyScalar(e);
    },
    lerpSelf: function (e, t) {
      return (
        (this.x = this.x + (e.x - this.x) * t),
        (this.y = this.y + (e.y - this.y) * t),
        this
      );
    },
    equals: function (e) {
      return e.x === this.x && e.y === this.y;
    },
    isZero: function () {
      return 1e-4 > this.lengthSq();
    },
    clone: function () {
      return new THREE.Vector2(this.x, this.y);
    },
  }),
  (THREE.Vector3 = function (e, t, i) {
    (this.x = e || 0), (this.y = t || 0), (this.z = i || 0);
  }),
  (THREE.Vector3.prototype = {
    constructor: THREE.Vector3,
    set: function (e, t, i) {
      return (this.x = e), (this.y = t), (this.z = i), this;
    },
    setX: function (e) {
      return (this.x = e), this;
    },
    setY: function (e) {
      return (this.y = e), this;
    },
    setZ: function (e) {
      return (this.z = e), this;
    },
    copy: function (e) {
      return (this.x = e.x), (this.y = e.y), (this.z = e.z), this;
    },
    add: function (e, t) {
      return (
        (this.x = e.x + t.x), (this.y = e.y + t.y), (this.z = e.z + t.z), this
      );
    },
    addSelf: function (e) {
      return (
        (this.x = this.x + e.x),
        (this.y = this.y + e.y),
        (this.z = this.z + e.z),
        this
      );
    },
    addScalar: function (e) {
      return (
        (this.x = this.x + e),
        (this.y = this.y + e),
        (this.z = this.z + e),
        this
      );
    },
    sub: function (e, t) {
      return (
        (this.x = e.x - t.x), (this.y = e.y - t.y), (this.z = e.z - t.z), this
      );
    },
    subSelf: function (e) {
      return (
        (this.x = this.x - e.x),
        (this.y = this.y - e.y),
        (this.z = this.z - e.z),
        this
      );
    },
    multiply: function (e, t) {
      return (
        (this.x = e.x * t.x), (this.y = e.y * t.y), (this.z = e.z * t.z), this
      );
    },
    multiplySelf: function (e) {
      return (
        (this.x = this.x * e.x),
        (this.y = this.y * e.y),
        (this.z = this.z * e.z),
        this
      );
    },
    multiplyScalar: function (e) {
      return (
        (this.x = this.x * e),
        (this.y = this.y * e),
        (this.z = this.z * e),
        this
      );
    },
    divideSelf: function (e) {
      return (
        (this.x = this.x / e.x),
        (this.y = this.y / e.y),
        (this.z = this.z / e.z),
        this
      );
    },
    divideScalar: function (e) {
      return (
        e
          ? ((this.x = this.x / e),
            (this.y = this.y / e),
            (this.z = this.z / e))
          : (this.z = this.y = this.x = 0),
        this
      );
    },
    negate: function () {
      return this.multiplyScalar(-1);
    },
    dot: function (e) {
      return this.x * e.x + this.y * e.y + this.z * e.z;
    },
    lengthSq: function () {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    },
    length: function () {
      return Math.sqrt(this.lengthSq());
    },
    lengthManhattan: function () {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    },
    normalize: function () {
      return this.divideScalar(this.length());
    },
    setLength: function (e) {
      return this.normalize().multiplyScalar(e);
    },
    lerpSelf: function (e, t) {
      return (
        (this.x = this.x + (e.x - this.x) * t),
        (this.y = this.y + (e.y - this.y) * t),
        (this.z = this.z + (e.z - this.z) * t),
        this
      );
    },
    cross: function (e, t) {
      return (
        (this.x = e.y * t.z - e.z * t.y),
        (this.y = e.z * t.x - e.x * t.z),
        (this.z = e.x * t.y - e.y * t.x),
        this
      );
    },
    crossSelf: function (e) {
      var t = this.x,
        i = this.y,
        r = this.z;
      return (
        (this.x = i * e.z - r * e.y),
        (this.y = r * e.x - t * e.z),
        (this.z = t * e.y - i * e.x),
        this
      );
    },
    distanceTo: function (e) {
      return Math.sqrt(this.distanceToSquared(e));
    },
    distanceToSquared: function (e) {
      return new THREE.Vector3().sub(this, e).lengthSq();
    },
    getPositionFromMatrix: function (e) {
      return (
        (this.x = e.elements[12]),
        (this.y = e.elements[13]),
        (this.z = e.elements[14]),
        this
      );
    },
    setEulerFromRotationMatrix: function (e, t) {
      function i(e) {
        return Math.min(Math.max(e, -1), 1);
      }
      var r = e.elements,
        o = r[0],
        n = r[4],
        a = r[8],
        s = r[1],
        l = r[5],
        h = r[9],
        c = r[2],
        f = r[6],
        r = r[10];
      return (
        void 0 === t || "XYZ" === t
          ? ((this.y = Math.asin(i(a))),
            0.99999 > Math.abs(a)
              ? ((this.x = Math.atan2(-h, r)), (this.z = Math.atan2(-n, o)))
              : ((this.x = Math.atan2(s, l)), (this.z = 0)))
          : "YXZ" === t
          ? ((this.x = Math.asin(-i(h))),
            0.99999 > Math.abs(h)
              ? ((this.y = Math.atan2(a, r)), (this.z = Math.atan2(s, l)))
              : ((this.y = Math.atan2(-c, o)), (this.z = 0)))
          : "ZXY" === t
          ? ((this.x = Math.asin(i(f))),
            0.99999 > Math.abs(f)
              ? ((this.y = Math.atan2(-c, r)), (this.z = Math.atan2(-n, l)))
              : ((this.y = 0), (this.z = Math.atan2(a, o))))
          : "ZYX" === t
          ? ((this.y = Math.asin(-i(c))),
            0.99999 > Math.abs(c)
              ? ((this.x = Math.atan2(f, r)), (this.z = Math.atan2(s, o)))
              : ((this.x = 0), (this.z = Math.atan2(-n, l))))
          : "YZX" === t
          ? ((this.z = Math.asin(i(s))),
            0.99999 > Math.abs(s)
              ? ((this.x = Math.atan2(-h, l)), (this.y = Math.atan2(-c, o)))
              : ((this.x = 0), (this.y = Math.atan2(c, r))))
          : "XZY" === t &&
            ((this.z = Math.asin(-i(n))),
            0.99999 > Math.abs(n)
              ? ((this.x = Math.atan2(f, l)), (this.y = Math.atan2(a, o)))
              : ((this.x = Math.atan2(-a, r)), (this.y = 0))),
        this
      );
    },
    setEulerFromQuaternion: function (e, t) {
      function i(e) {
        return Math.min(Math.max(e, -1), 1);
      }
      var r = e.x * e.x,
        o = e.y * e.y,
        n = e.z * e.z,
        a = e.w * e.w;
      return (
        void 0 === t || "XYZ" === t
          ? ((this.x = Math.atan2(2 * (e.x * e.w - e.y * e.z), a - r - o + n)),
            (this.y = Math.asin(i(2 * (e.x * e.z + e.y * e.w)))),
            (this.z = Math.atan2(2 * (e.z * e.w - e.x * e.y), a + r - o - n)))
          : "YXZ" === t
          ? ((this.x = Math.asin(i(2 * (e.x * e.w - e.y * e.z)))),
            (this.y = Math.atan2(2 * (e.x * e.z + e.y * e.w), a - r - o + n)),
            (this.z = Math.atan2(2 * (e.x * e.y + e.z * e.w), a - r + o - n)))
          : "ZXY" === t
          ? ((this.x = Math.asin(i(2 * (e.x * e.w + e.y * e.z)))),
            (this.y = Math.atan2(2 * (e.y * e.w - e.z * e.x), a - r - o + n)),
            (this.z = Math.atan2(2 * (e.z * e.w - e.x * e.y), a - r + o - n)))
          : "ZYX" === t
          ? ((this.x = Math.atan2(2 * (e.x * e.w + e.z * e.y), a - r - o + n)),
            (this.y = Math.asin(i(2 * (e.y * e.w - e.x * e.z)))),
            (this.z = Math.atan2(2 * (e.x * e.y + e.z * e.w), a + r - o - n)))
          : "YZX" === t
          ? ((this.x = Math.atan2(2 * (e.x * e.w - e.z * e.y), a - r + o - n)),
            (this.y = Math.atan2(2 * (e.y * e.w - e.x * e.z), a + r - o - n)),
            (this.z = Math.asin(i(2 * (e.x * e.y + e.z * e.w)))))
          : "XZY" === t &&
            ((this.x = Math.atan2(2 * (e.x * e.w + e.y * e.z), a - r + o - n)),
            (this.y = Math.atan2(2 * (e.x * e.z + e.y * e.w), a + r - o - n)),
            (this.z = Math.asin(i(2 * (e.z * e.w - e.x * e.y))))),
        this
      );
    },
    getScaleFromMatrix: function (e) {
      var t = this.set(e.elements[0], e.elements[1], e.elements[2]).length(),
        i = this.set(e.elements[4], e.elements[5], e.elements[6]).length(),
        e = this.set(e.elements[8], e.elements[9], e.elements[10]).length();
      return (this.x = t), (this.y = i), (this.z = e), this;
    },
    equals: function (e) {
      return e.x === this.x && e.y === this.y && e.z === this.z;
    },
    isZero: function () {
      return 1e-4 > this.lengthSq();
    },
    clone: function () {
      return new THREE.Vector3(this.x, this.y, this.z);
    },
  }),
  (THREE.Vector4 = function (e, t, i, r) {
    (this.x = e || 0),
      (this.y = t || 0),
      (this.z = i || 0),
      (this.w = void 0 !== r ? r : 1);
  }),
  (THREE.Vector4.prototype = {
    constructor: THREE.Vector4,
    set: function (e, t, i, r) {
      return (this.x = e), (this.y = t), (this.z = i), (this.w = r), this;
    },
    copy: function (e) {
      return (
        (this.x = e.x),
        (this.y = e.y),
        (this.z = e.z),
        (this.w = void 0 !== e.w ? e.w : 1),
        this
      );
    },
    add: function (e, t) {
      return (
        (this.x = e.x + t.x),
        (this.y = e.y + t.y),
        (this.z = e.z + t.z),
        (this.w = e.w + t.w),
        this
      );
    },
    addSelf: function (e) {
      return (
        (this.x = this.x + e.x),
        (this.y = this.y + e.y),
        (this.z = this.z + e.z),
        (this.w = this.w + e.w),
        this
      );
    },
    sub: function (e, t) {
      return (
        (this.x = e.x - t.x),
        (this.y = e.y - t.y),
        (this.z = e.z - t.z),
        (this.w = e.w - t.w),
        this
      );
    },
    subSelf: function (e) {
      return (
        (this.x = this.x - e.x),
        (this.y = this.y - e.y),
        (this.z = this.z - e.z),
        (this.w = this.w - e.w),
        this
      );
    },
    multiplyScalar: function (e) {
      return (
        (this.x = this.x * e),
        (this.y = this.y * e),
        (this.z = this.z * e),
        (this.w = this.w * e),
        this
      );
    },
    divideScalar: function (e) {
      return (
        e
          ? ((this.x = this.x / e),
            (this.y = this.y / e),
            (this.z = this.z / e),
            (this.w = this.w / e))
          : ((this.z = this.y = this.x = 0), (this.w = 1)),
        this
      );
    },
    negate: function () {
      return this.multiplyScalar(-1);
    },
    dot: function (e) {
      return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
    },
    lengthSq: function () {
      return this.dot(this);
    },
    length: function () {
      return Math.sqrt(this.lengthSq());
    },
    normalize: function () {
      return this.divideScalar(this.length());
    },
    setLength: function (e) {
      return this.normalize().multiplyScalar(e);
    },
    lerpSelf: function (e, t) {
      return (
        (this.x = this.x + (e.x - this.x) * t),
        (this.y = this.y + (e.y - this.y) * t),
        (this.z = this.z + (e.z - this.z) * t),
        (this.w = this.w + (e.w - this.w) * t),
        this
      );
    },
    clone: function () {
      return new THREE.Vector4(this.x, this.y, this.z, this.w);
    },
    setAxisAngleFromQuaternion: function (e) {
      this.w = 2 * Math.acos(e.w);
      var t = Math.sqrt(1 - e.w * e.w);
      return (
        t < 1e-4
          ? ((this.x = 1), (this.z = this.y = 0))
          : ((this.x = e.x / t), (this.y = e.y / t), (this.z = e.z / t)),
        this
      );
    },
    setAxisAngleFromRotationMatrix: function (e) {
      var t,
        i,
        r,
        e = e.elements,
        o = e[0];
      r = e[4];
      var n = e[8],
        a = e[1],
        s = e[5],
        l = e[9];
      (i = e[2]), (t = e[6]);
      var h = e[10];
      return 0.01 > Math.abs(r - a) &&
        0.01 > Math.abs(n - i) &&
        0.01 > Math.abs(l - t)
        ? 0.1 > Math.abs(r + a) &&
          0.1 > Math.abs(n + i) &&
          0.1 > Math.abs(l + t) &&
          0.1 > Math.abs(o + s + h - 3)
          ? (this.set(1, 0, 0, 0), this)
          : ((e = Math.PI),
            (o = (o + 1) / 2),
            (s = (s + 1) / 2),
            (h = (h + 1) / 2),
            (r = (r + a) / 4),
            (n = (n + i) / 4),
            (l = (l + t) / 4),
            o > s && o > h
              ? o < 0.01
                ? ((t = 0), (r = i = 0.707106781))
                : ((i = r / (t = Math.sqrt(o))), (r = n / t))
              : s > h
              ? s < 0.01
                ? ((t = 0.707106781), (i = 0), (r = 0.707106781))
                : ((t = r / (i = Math.sqrt(s))), (r = l / i))
              : h < 0.01
              ? ((i = t = 0.707106781), (r = 0))
              : ((t = n / (r = Math.sqrt(h))), (i = l / r)),
            this.set(t, i, r, e),
            this)
        : (0.001 >
            Math.abs(
              (e = Math.sqrt(
                (t - l) * (t - l) + (n - i) * (n - i) + (a - r) * (a - r)
              ))
            ) && (e = 1),
          (this.x = (t - l) / e),
          (this.y = (n - i) / e),
          (this.z = (a - r) / e),
          (this.w = Math.acos((o + s + h - 1) / 2)),
          this);
    },
  }),
  (THREE.EventTarget = function () {
    var e = {};
    (this.addEventListener = function (t, i) {
      void 0 === e[t] && (e[t] = []), -1 === e[t].indexOf(i) && e[t].push(i);
    }),
      (this.dispatchEvent = function (t) {
        for (var i in e[t.type]) e[t.type][i](t);
      }),
      (this.removeEventListener = function (t, i) {
        var r = e[t].indexOf(i);
        -1 !== r && e[t].splice(r, 1);
      });
  }),
  (THREE.Frustum = function () {
    this.planes = [
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
    ];
  }),
  (THREE.Frustum.prototype.setFromMatrix = function (e) {
    var t = this.planes,
      i = e.elements,
      e = i[0],
      r = i[1],
      o = i[2],
      n = i[3],
      a = i[4],
      s = i[5],
      l = i[6],
      h = i[7],
      c = i[8],
      f = i[9],
      u = i[10],
      p = i[11],
      d = i[12],
      E = i[13],
      m = i[14],
      i = i[15];
    for (
      t[0].set(n - e, h - a, p - c, i - d),
        t[1].set(n + e, h + a, p + c, i + d),
        t[2].set(n + r, h + s, p + f, i + E),
        t[3].set(n - r, h - s, p - f, i - E),
        t[4].set(n - o, h - l, p - u, i - m),
        t[5].set(n + o, h + l, p + u, i + m),
        r = 0;
      r < 6;
      r++
    )
      (e = t[r]).divideScalar(Math.sqrt(e.x * e.x + e.y * e.y + e.z * e.z));
  }),
  (THREE.Frustum.prototype.contains = function (e) {
    for (
      var t = 0,
        i = this.planes,
        t = e.matrixWorld,
        r = t.elements,
        e = -e.geometry.boundingSphere.radius * t.getMaxScaleOnAxis(),
        o = 0;
      o < 6;
      o++
    )
      if ((t = i[o].x * r[12] + i[o].y * r[13] + i[o].z * r[14] + i[o].w) <= e)
        return !1;
    return !0;
  }),
  (THREE.Frustum.__v1 = new THREE.Vector3()),
  (THREE.Ray = function (e, t, i, r) {
    (this.origin = e || new THREE.Vector3()),
      (this.direction = t || new THREE.Vector3()),
      (this.near = i || 0),
      (this.far = r || 1 / 0);
    var o,
      n,
      a,
      s,
      l,
      h,
      c,
      f,
      u,
      p,
      d,
      E = new THREE.Vector3(),
      m = new THREE.Vector3(),
      v = new THREE.Vector3(),
      g = new THREE.Vector3(),
      $ = new THREE.Vector3(),
      T = new THREE.Vector3(),
      R = new THREE.Vector3(),
      y = new THREE.Vector3(),
      _ = new THREE.Vector3(),
      x = function (e, t) {
        return e.distance - t.distance;
      },
      H = new THREE.Vector3(),
      b = new THREE.Vector3(),
      w = new THREE.Vector3(),
      S = function (e, t, i) {
        return (
          H.sub(i, e),
          (o = H.dot(t)),
          (n = b.add(e, w.copy(t).multiplyScalar(o))),
          (a = i.distanceTo(n))
        );
      },
      C = function (e, t, i, r) {
        return (
          H.sub(r, t),
          b.sub(i, t),
          w.sub(e, t),
          (s = H.dot(H)),
          (l = H.dot(b)),
          (h = H.dot(w)),
          (c = b.dot(b)),
          (f = b.dot(w)),
          (u = 1 / (s * c - l * l)),
          (p = (c * h - l * f) * u),
          (d = (s * f - l * h) * u),
          p >= 0 && d >= 0 && p + d < 1
        );
      },
      M = 1e-4;
    (this.setPrecision = function (e) {
      M = e;
    }),
      (this.intersectObject = function (e, t) {
        var i,
          r = [];
        if (!0 === t)
          for (var o = 0, n = e.children.length; o < n; o++)
            Array.prototype.push.apply(
              r,
              this.intersectObject(e.children[o], t)
            );
        if (e instanceof THREE.Particle) {
          if (
            (a = S(this.origin, this.direction, e.matrixWorld.getPosition())) >
            e.scale.x
          )
            return [];
          (i = { distance: a, point: e.position, face: null, object: e }),
            r.push(i);
        } else if (e instanceof THREE.Mesh) {
          if (
            ((o = THREE.Frustum.__v1.set(
              e.matrixWorld.getColumnX().length(),
              e.matrixWorld.getColumnY().length(),
              e.matrixWorld.getColumnZ().length()
            )),
            (o =
              e.geometry.boundingSphere.radius *
              Math.max(o.x, Math.max(o.y, o.z))),
            (a = S(this.origin, this.direction, e.matrixWorld.getPosition())) >
              o)
          )
            return r;
          var s,
            l,
            h,
            c = e.geometry,
            f = c.vertices;
          for (
            e.matrixRotationWorld.extractRotation(e.matrixWorld),
              o = 0,
              n = c.faces.length;
            o < n;
            o++
          )
            (i = c.faces[o]),
              $.copy(this.origin),
              T.copy(this.direction),
              (R = (h = e.matrixWorld)
                .multiplyVector3(R.copy(i.centroid))
                .subSelf($)),
              (y = e.matrixRotationWorld.multiplyVector3(y.copy(i.normal))),
              !(Math.abs((s = T.dot(y))) < M) &&
                !((l = y.dot(R) / s) < 0) &&
                (e.doubleSided || (e.flipSided ? s > 0 : s < 0)) &&
                (_.add($, T.multiplyScalar(l)),
                !((a = $.distanceTo(_)) < this.near) &&
                  !(a > this.far) &&
                  (i instanceof THREE.Face3
                    ? ((E = h.multiplyVector3(E.copy(f[i.a]))),
                      C(
                        _,
                        E,
                        (m = h.multiplyVector3(m.copy(f[i.b]))),
                        (v = h.multiplyVector3(v.copy(f[i.c])))
                      ) &&
                        ((i = {
                          distance: a,
                          point: _.clone(),
                          face: i,
                          object: e,
                        }),
                        r.push(i)))
                    : i instanceof THREE.Face4 &&
                      ((E = h.multiplyVector3(E.copy(f[i.a]))),
                      (m = h.multiplyVector3(m.copy(f[i.b]))),
                      (v = h.multiplyVector3(v.copy(f[i.c]))),
                      (C(_, E, m, (g = h.multiplyVector3(g.copy(f[i.d])))) ||
                        C(_, m, v, g)) &&
                        ((i = {
                          distance: a,
                          point: _.clone(),
                          face: i,
                          object: e,
                        }),
                        r.push(i)))));
        }
        return r.sort(x), r;
      }),
      (this.intersectObjects = function (e, t) {
        for (var i = [], r = 0, o = e.length; r < o; r++)
          Array.prototype.push.apply(i, this.intersectObject(e[r], t));
        return i.sort(x), i;
      });
  }),
  (THREE.Rectangle = function () {
    function e() {
      (n = r - t), (a = o - i);
    }
    var t = 0,
      i = 0,
      r = 0,
      o = 0,
      n = 0,
      a = 0,
      s = !0;
    (this.getX = function () {
      return t;
    }),
      (this.getY = function () {
        return i;
      }),
      (this.getWidth = function () {
        return n;
      }),
      (this.getHeight = function () {
        return a;
      }),
      (this.getLeft = function () {
        return t;
      }),
      (this.getTop = function () {
        return i;
      }),
      (this.getRight = function () {
        return r;
      }),
      (this.getBottom = function () {
        return o;
      }),
      (this.set = function (n, a, l, h) {
        (s = !1), (t = n), (i = a), (r = l), (o = h), e();
      }),
      (this.addPoint = function (n, a) {
        !0 === s
          ? ((s = !1), (t = n), (i = a), (r = n), (o = a))
          : ((t = t < n ? t : n),
            (i = i < a ? i : a),
            (r = r > n ? r : n),
            (o = o > a ? o : a)),
          e();
      }),
      (this.add3Points = function (n, a, l, h, c, f) {
        !0 === s
          ? ((s = !1),
            (t = n < l ? (n < c ? n : c) : l < c ? l : c),
            (i = a < h ? (a < f ? a : f) : h < f ? h : f),
            (r = n > l ? (n > c ? n : c) : l > c ? l : c),
            (o = a > h ? (a > f ? a : f) : h > f ? h : f))
          : ((t =
              n < l
                ? n < c
                  ? n < t
                    ? n
                    : t
                  : c < t
                  ? c
                  : t
                : l < c
                ? l < t
                  ? l
                  : t
                : c < t
                ? c
                : t),
            (i =
              a < h
                ? a < f
                  ? a < i
                    ? a
                    : i
                  : f < i
                  ? f
                  : i
                : h < f
                ? h < i
                  ? h
                  : i
                : f < i
                ? f
                : i),
            (r =
              n > l
                ? n > c
                  ? n > r
                    ? n
                    : r
                  : c > r
                  ? c
                  : r
                : l > c
                ? l > r
                  ? l
                  : r
                : c > r
                ? c
                : r),
            (o =
              a > h
                ? a > f
                  ? a > o
                    ? a
                    : o
                  : f > o
                  ? f
                  : o
                : h > f
                ? h > o
                  ? h
                  : o
                : f > o
                ? f
                : o)),
          e();
      }),
      (this.addRectangle = function (n) {
        !0 === s
          ? ((s = !1),
            (t = n.getLeft()),
            (i = n.getTop()),
            (r = n.getRight()),
            (o = n.getBottom()))
          : ((t = t < n.getLeft() ? t : n.getLeft()),
            (i = i < n.getTop() ? i : n.getTop()),
            (r = r > n.getRight() ? r : n.getRight()),
            (o = o > n.getBottom() ? o : n.getBottom())),
          e();
      }),
      (this.inflate = function (n) {
        (t -= n), (i -= n), (r += n), (o += n), e();
      }),
      (this.minSelf = function (n) {
        (t = t > n.getLeft() ? t : n.getLeft()),
          (i = i > n.getTop() ? i : n.getTop()),
          (r = r < n.getRight() ? r : n.getRight()),
          (o = o < n.getBottom() ? o : n.getBottom()),
          e();
      }),
      (this.intersects = function (e) {
        return !(
          r < e.getLeft() ||
          t > e.getRight() ||
          o < e.getTop() ||
          i > e.getBottom()
        );
      }),
      (this.empty = function () {
        (s = !0), (o = r = i = t = 0), e();
      }),
      (this.isEmpty = function () {
        return s;
      });
  }),
  (THREE.Math = {
    clamp: function (e, t, i) {
      return e < t ? t : e > i ? i : e;
    },
    clampBottom: function (e, t) {
      return e < t ? t : e;
    },
    mapLinear: function (e, t, i, r, o) {
      return r + ((e - t) * (o - r)) / (i - t);
    },
    random16: function () {
      return (65280 * Math.random() + 255 * Math.random()) / 65535;
    },
    randInt: function (e, t) {
      return e + Math.floor(Math.random() * (t - e + 1));
    },
    randFloat: function (e, t) {
      return e + Math.random() * (t - e);
    },
    randFloatSpread: function (e) {
      return e * (0.5 - Math.random());
    },
    sign: function (e) {
      return e < 0 ? -1 : e > 0 ? 1 : 0;
    },
  }),
  (THREE.Matrix3 = function () {
    this.elements = new Float32Array(9);
  }),
  (THREE.Matrix3.prototype = {
    constructor: THREE.Matrix3,
    getInverse: function (e) {
      var t = e.elements,
        e = t[10] * t[5] - t[6] * t[9],
        i = -t[10] * t[1] + t[2] * t[9],
        r = t[6] * t[1] - t[2] * t[5],
        o = -t[10] * t[4] + t[6] * t[8],
        n = t[10] * t[0] - t[2] * t[8],
        a = -t[6] * t[0] + t[2] * t[4],
        s = t[9] * t[4] - t[5] * t[8],
        l = -t[9] * t[0] + t[1] * t[8],
        h = t[5] * t[0] - t[1] * t[4],
        t = t[0] * e + t[1] * o + t[2] * s;
      0 === t && console.warn("Matrix3.getInverse(): determinant == 0");
      var t = 1 / t,
        c = this.elements;
      return (
        (c[0] = t * e),
        (c[1] = t * i),
        (c[2] = t * r),
        (c[3] = t * o),
        (c[4] = t * n),
        (c[5] = t * a),
        (c[6] = t * s),
        (c[7] = t * l),
        (c[8] = t * h),
        this
      );
    },
    transpose: function () {
      var e,
        t = this.elements;
      return (
        (e = t[1]),
        (t[1] = t[3]),
        (t[3] = e),
        (e = t[2]),
        (t[2] = t[6]),
        (t[6] = e),
        (e = t[5]),
        (t[5] = t[7]),
        (t[7] = e),
        this
      );
    },
    transposeIntoArray: function (e) {
      var t = this.m;
      return (
        (e[0] = t[0]),
        (e[1] = t[3]),
        (e[2] = t[6]),
        (e[3] = t[1]),
        (e[4] = t[4]),
        (e[5] = t[7]),
        (e[6] = t[2]),
        (e[7] = t[5]),
        (e[8] = t[8]),
        this
      );
    },
  }),
  (THREE.Matrix4 = function (e, t, i, r, o, n, a, s, l, h, c, f, u, p, d, E) {
    (this.elements = new Float32Array(16)),
      this.set(
        void 0 !== e ? e : 1,
        t || 0,
        i || 0,
        r || 0,
        o || 0,
        void 0 !== n ? n : 1,
        a || 0,
        s || 0,
        l || 0,
        h || 0,
        void 0 !== c ? c : 1,
        f || 0,
        u || 0,
        p || 0,
        d || 0,
        void 0 !== E ? E : 1
      );
  }),
  (THREE.Matrix4.prototype = {
    constructor: THREE.Matrix4,
    set: function (e, t, i, r, o, n, a, s, l, h, c, f, u, p, d, E) {
      var m = this.elements;
      return (
        (m[0] = e),
        (m[4] = t),
        (m[8] = i),
        (m[12] = r),
        (m[1] = o),
        (m[5] = n),
        (m[9] = a),
        (m[13] = s),
        (m[2] = l),
        (m[6] = h),
        (m[10] = c),
        (m[14] = f),
        (m[3] = u),
        (m[7] = p),
        (m[11] = d),
        (m[15] = E),
        this
      );
    },
    identity: function () {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    },
    copy: function (e) {
      return (
        (e = e.elements),
        this.set(
          e[0],
          e[4],
          e[8],
          e[12],
          e[1],
          e[5],
          e[9],
          e[13],
          e[2],
          e[6],
          e[10],
          e[14],
          e[3],
          e[7],
          e[11],
          e[15]
        ),
        this
      );
    },
    lookAt: function (e, t, i) {
      var r = this.elements,
        o = THREE.Matrix4.__v1,
        n = THREE.Matrix4.__v2,
        a = THREE.Matrix4.__v3;
      return (
        a.sub(e, t).normalize(),
        0 === a.length() && (a.z = 1),
        o.cross(i, a).normalize(),
        0 === o.length() && ((a.x = a.x + 1e-4), o.cross(i, a).normalize()),
        n.cross(a, o),
        (r[0] = o.x),
        (r[4] = n.x),
        (r[8] = a.x),
        (r[1] = o.y),
        (r[5] = n.y),
        (r[9] = a.y),
        (r[2] = o.z),
        (r[6] = n.z),
        (r[10] = a.z),
        this
      );
    },
    multiply: function (e, t) {
      var i = e.elements,
        r = t.elements,
        o = this.elements,
        n = i[0],
        a = i[4],
        s = i[8],
        l = i[12],
        h = i[1],
        c = i[5],
        f = i[9],
        u = i[13],
        p = i[2],
        d = i[6],
        E = i[10],
        m = i[14],
        v = i[3],
        g = i[7],
        $ = i[11],
        i = i[15],
        T = r[0],
        R = r[4],
        y = r[8],
        _ = r[12],
        x = r[1],
        H = r[5],
        b = r[9],
        w = r[13],
        S = r[2],
        C = r[6],
        M = r[10],
        A = r[14],
        L = r[3],
        P = r[7],
        U = r[11],
        r = r[15];
      return (
        (o[0] = n * T + a * x + s * S + l * L),
        (o[4] = n * R + a * H + s * C + l * P),
        (o[8] = n * y + a * b + s * M + l * U),
        (o[12] = n * _ + a * w + s * A + l * r),
        (o[1] = h * T + c * x + f * S + u * L),
        (o[5] = h * R + c * H + f * C + u * P),
        (o[9] = h * y + c * b + f * M + u * U),
        (o[13] = h * _ + c * w + f * A + u * r),
        (o[2] = p * T + d * x + E * S + m * L),
        (o[6] = p * R + d * H + E * C + m * P),
        (o[10] = p * y + d * b + E * M + m * U),
        (o[14] = p * _ + d * w + E * A + m * r),
        (o[3] = v * T + g * x + $ * S + i * L),
        (o[7] = v * R + g * H + $ * C + i * P),
        (o[11] = v * y + g * b + $ * M + i * U),
        (o[15] = v * _ + g * w + $ * A + i * r),
        this
      );
    },
    multiplySelf: function (e) {
      return this.multiply(this, e);
    },
    multiplyToArray: function (e, t, i) {
      var r = this.elements;
      return (
        this.multiply(e, t),
        (i[0] = r[0]),
        (i[1] = r[1]),
        (i[2] = r[2]),
        (i[3] = r[3]),
        (i[4] = r[4]),
        (i[5] = r[5]),
        (i[6] = r[6]),
        (i[7] = r[7]),
        (i[8] = r[8]),
        (i[9] = r[9]),
        (i[10] = r[10]),
        (i[11] = r[11]),
        (i[12] = r[12]),
        (i[13] = r[13]),
        (i[14] = r[14]),
        (i[15] = r[15]),
        this
      );
    },
    multiplyScalar: function (e) {
      var t = this.elements;
      return (
        (t[0] = t[0] * e),
        (t[4] = t[4] * e),
        (t[8] = t[8] * e),
        (t[12] = t[12] * e),
        (t[1] = t[1] * e),
        (t[5] = t[5] * e),
        (t[9] = t[9] * e),
        (t[13] = t[13] * e),
        (t[2] = t[2] * e),
        (t[6] = t[6] * e),
        (t[10] = t[10] * e),
        (t[14] = t[14] * e),
        (t[3] = t[3] * e),
        (t[7] = t[7] * e),
        (t[11] = t[11] * e),
        (t[15] = t[15] * e),
        this
      );
    },
    multiplyVector3: function (e) {
      var t = this.elements,
        i = e.x,
        r = e.y,
        o = e.z,
        n = 1 / (t[3] * i + t[7] * r + t[11] * o + t[15]);
      return (
        (e.x = (t[0] * i + t[4] * r + t[8] * o + t[12]) * n),
        (e.y = (t[1] * i + t[5] * r + t[9] * o + t[13]) * n),
        (e.z = (t[2] * i + t[6] * r + t[10] * o + t[14]) * n),
        e
      );
    },
    multiplyVector4: function (e) {
      var t = this.elements,
        i = e.x,
        r = e.y,
        o = e.z,
        n = e.w;
      return (
        (e.x = t[0] * i + t[4] * r + t[8] * o + t[12] * n),
        (e.y = t[1] * i + t[5] * r + t[9] * o + t[13] * n),
        (e.z = t[2] * i + t[6] * r + t[10] * o + t[14] * n),
        (e.w = t[3] * i + t[7] * r + t[11] * o + t[15] * n),
        e
      );
    },
    multiplyVector3Array: function (e) {
      for (var t = THREE.Matrix4.__v1, i = 0, r = e.length; i < r; i += 3)
        (t.x = e[i]),
          (t.y = e[i + 1]),
          (t.z = e[i + 2]),
          this.multiplyVector3(t),
          (e[i] = t.x),
          (e[i + 1] = t.y),
          (e[i + 2] = t.z);
      return e;
    },
    rotateAxis: function (e) {
      var t = this.elements,
        i = e.x,
        r = e.y,
        o = e.z;
      return (
        (e.x = i * t[0] + r * t[4] + o * t[8]),
        (e.y = i * t[1] + r * t[5] + o * t[9]),
        (e.z = i * t[2] + r * t[6] + o * t[10]),
        e.normalize(),
        e
      );
    },
    crossVector: function (e) {
      var t = this.elements,
        i = new THREE.Vector4();
      return (
        (i.x = t[0] * e.x + t[4] * e.y + t[8] * e.z + t[12] * e.w),
        (i.y = t[1] * e.x + t[5] * e.y + t[9] * e.z + t[13] * e.w),
        (i.z = t[2] * e.x + t[6] * e.y + t[10] * e.z + t[14] * e.w),
        (i.w = e.w ? t[3] * e.x + t[7] * e.y + t[11] * e.z + t[15] * e.w : 1),
        i
      );
    },
    determinant: function () {
      var e = this.elements,
        t = e[0],
        i = e[4],
        r = e[8],
        o = e[12],
        n = e[1],
        a = e[5],
        s = e[9],
        l = e[13],
        h = e[2],
        c = e[6],
        f = e[10],
        u = e[14],
        p = e[3],
        d = e[7],
        E = e[11],
        e = e[15];
      return (
        o * s * c * p -
        r * l * c * p -
        o * a * f * p +
        i * l * f * p +
        r * a * u * p -
        i * s * u * p -
        o * s * h * d +
        r * l * h * d +
        o * n * f * d -
        t * l * f * d -
        r * n * u * d +
        t * s * u * d +
        o * a * h * E -
        i * l * h * E -
        o * n * c * E +
        t * l * c * E +
        i * n * u * E -
        t * a * u * E -
        r * a * h * e +
        i * s * h * e +
        r * n * c * e -
        t * s * c * e -
        i * n * f * e +
        t * a * f * e
      );
    },
    transpose: function () {
      var e,
        t = this.elements;
      return (
        (e = t[1]),
        (t[1] = t[4]),
        (t[4] = e),
        (e = t[2]),
        (t[2] = t[8]),
        (t[8] = e),
        (e = t[6]),
        (t[6] = t[9]),
        (t[9] = e),
        (e = t[3]),
        (t[3] = t[12]),
        (t[12] = e),
        (e = t[7]),
        (t[7] = t[13]),
        (t[13] = e),
        (e = t[11]),
        (t[11] = t[14]),
        (t[14] = e),
        this
      );
    },
    flattenToArray: function (e) {
      var t = this.elements;
      return (
        (e[0] = t[0]),
        (e[1] = t[1]),
        (e[2] = t[2]),
        (e[3] = t[3]),
        (e[4] = t[4]),
        (e[5] = t[5]),
        (e[6] = t[6]),
        (e[7] = t[7]),
        (e[8] = t[8]),
        (e[9] = t[9]),
        (e[10] = t[10]),
        (e[11] = t[11]),
        (e[12] = t[12]),
        (e[13] = t[13]),
        (e[14] = t[14]),
        (e[15] = t[15]),
        e
      );
    },
    flattenToArrayOffset: function (e, t) {
      var i = this.elements;
      return (
        (e[t] = i[0]),
        (e[t + 1] = i[1]),
        (e[t + 2] = i[2]),
        (e[t + 3] = i[3]),
        (e[t + 4] = i[4]),
        (e[t + 5] = i[5]),
        (e[t + 6] = i[6]),
        (e[t + 7] = i[7]),
        (e[t + 8] = i[8]),
        (e[t + 9] = i[9]),
        (e[t + 10] = i[10]),
        (e[t + 11] = i[11]),
        (e[t + 12] = i[12]),
        (e[t + 13] = i[13]),
        (e[t + 14] = i[14]),
        (e[t + 15] = i[15]),
        e
      );
    },
    getPosition: function () {
      var e = this.elements;
      return THREE.Matrix4.__v1.set(e[12], e[13], e[14]);
    },
    setPosition: function (e) {
      var t = this.elements;
      return (t[12] = e.x), (t[13] = e.y), (t[14] = e.z), this;
    },
    getColumnX: function () {
      var e = this.elements;
      return THREE.Matrix4.__v1.set(e[0], e[1], e[2]);
    },
    getColumnY: function () {
      var e = this.elements;
      return THREE.Matrix4.__v1.set(e[4], e[5], e[6]);
    },
    getColumnZ: function () {
      var e = this.elements;
      return THREE.Matrix4.__v1.set(e[8], e[9], e[10]);
    },
    getInverse: function (e) {
      var t = this.elements,
        i = e.elements,
        r = i[0],
        o = i[4],
        n = i[8],
        a = i[12],
        s = i[1],
        l = i[5],
        h = i[9],
        c = i[13],
        f = i[2],
        u = i[6],
        p = i[10],
        d = i[14],
        E = i[3],
        m = i[7],
        v = i[11],
        i = i[15];
      return (
        (t[0] =
          h * d * m -
          c * p * m +
          c * u * v -
          l * d * v -
          h * u * i +
          l * p * i),
        (t[4] =
          a * p * m -
          n * d * m -
          a * u * v +
          o * d * v +
          n * u * i -
          o * p * i),
        (t[8] =
          n * c * m -
          a * h * m +
          a * l * v -
          o * c * v -
          n * l * i +
          o * h * i),
        (t[12] =
          a * h * u -
          n * c * u -
          a * l * p +
          o * c * p +
          n * l * d -
          o * h * d),
        (t[1] =
          c * p * E -
          h * d * E -
          c * f * v +
          s * d * v +
          h * f * i -
          s * p * i),
        (t[5] =
          n * d * E -
          a * p * E +
          a * f * v -
          r * d * v -
          n * f * i +
          r * p * i),
        (t[9] =
          a * h * E -
          n * c * E -
          a * s * v +
          r * c * v +
          n * s * i -
          r * h * i),
        (t[13] =
          n * c * f -
          a * h * f +
          a * s * p -
          r * c * p -
          n * s * d +
          r * h * d),
        (t[2] =
          l * d * E -
          c * u * E +
          c * f * m -
          s * d * m -
          l * f * i +
          s * u * i),
        (t[6] =
          a * u * E -
          o * d * E -
          a * f * m +
          r * d * m +
          o * f * i -
          r * u * i),
        (t[10] =
          o * c * E -
          a * l * E +
          a * s * m -
          r * c * m -
          o * s * i +
          r * l * i),
        (t[14] =
          a * l * f -
          o * c * f -
          a * s * u +
          r * c * u +
          o * s * d -
          r * l * d),
        (t[3] =
          h * u * E -
          l * p * E -
          h * f * m +
          s * p * m +
          l * f * v -
          s * u * v),
        (t[7] =
          o * p * E -
          n * u * E +
          n * f * m -
          r * p * m -
          o * f * v +
          r * u * v),
        (t[11] =
          n * l * E -
          o * h * E -
          n * s * m +
          r * h * m +
          o * s * v -
          r * l * v),
        (t[15] =
          o * h * f -
          n * l * f +
          n * s * u -
          r * h * u -
          o * s * p +
          r * l * p),
        this.multiplyScalar(1 / e.determinant()),
        this
      );
    },
    setRotationFromEuler: function (e, t) {
      var i = this.elements,
        r = e.x,
        o = e.y,
        n = e.z,
        a = Math.cos(r),
        r = Math.sin(r),
        s = Math.cos(o),
        o = Math.sin(o),
        l = Math.cos(n),
        n = Math.sin(n);
      if (void 0 === t || "XYZ" === t) {
        var h = a * l,
          c = a * n,
          f = r * l,
          u = r * n;
        (i[0] = s * l),
          (i[4] = -s * n),
          (i[8] = o),
          (i[1] = c + f * o),
          (i[5] = h - u * o),
          (i[9] = -r * s),
          (i[2] = u - h * o),
          (i[6] = f + c * o),
          (i[10] = a * s);
      } else
        "YXZ" === t
          ? ((h = s * l),
            (c = s * n),
            (f = o * l),
            (u = o * n),
            (i[0] = h + u * r),
            (i[4] = f * r - c),
            (i[8] = a * o),
            (i[1] = a * n),
            (i[5] = a * l),
            (i[9] = -r),
            (i[2] = c * r - f),
            (i[6] = u + h * r),
            (i[10] = a * s))
          : "ZXY" === t
          ? ((h = s * l),
            (c = s * n),
            (f = o * l),
            (u = o * n),
            (i[0] = h - u * r),
            (i[4] = -a * n),
            (i[8] = f + c * r),
            (i[1] = c + f * r),
            (i[5] = a * l),
            (i[9] = u - h * r),
            (i[2] = -a * o),
            (i[6] = r),
            (i[10] = a * s))
          : "ZYX" === t
          ? ((h = a * l),
            (c = a * n),
            (f = r * l),
            (u = r * n),
            (i[0] = s * l),
            (i[4] = f * o - c),
            (i[8] = h * o + u),
            (i[1] = s * n),
            (i[5] = u * o + h),
            (i[9] = c * o - f),
            (i[2] = -o),
            (i[6] = r * s),
            (i[10] = a * s))
          : "YZX" === t
          ? ((h = a * s),
            (c = a * o),
            (f = r * s),
            (u = r * o),
            (i[0] = s * l),
            (i[4] = u - h * n),
            (i[8] = f * n + c),
            (i[1] = n),
            (i[5] = a * l),
            (i[9] = -r * l),
            (i[2] = -o * l),
            (i[6] = c * n + f),
            (i[10] = h - u * n))
          : "XZY" === t &&
            ((h = a * s),
            (c = a * o),
            (f = r * s),
            (u = r * o),
            (i[0] = s * l),
            (i[4] = -n),
            (i[8] = o * l),
            (i[1] = h * n + u),
            (i[5] = a * l),
            (i[9] = c * n - f),
            (i[2] = f * n - c),
            (i[6] = r * l),
            (i[10] = u * n + h));
      return this;
    },
    setRotationFromQuaternion: function (e) {
      var t = this.elements,
        i = e.x,
        r = e.y,
        o = e.z,
        n = e.w,
        a = i + i,
        s = r + r,
        l = o + o,
        e = i * a,
        h = i * s,
        i = i * l,
        c = r * s,
        r = r * l,
        o = o * l,
        a = n * a,
        s = n * s,
        n = n * l;
      return (
        (t[0] = 1 - (c + o)),
        (t[4] = h - n),
        (t[8] = i + s),
        (t[1] = h + n),
        (t[5] = 1 - (e + o)),
        (t[9] = r - a),
        (t[2] = i - s),
        (t[6] = r + a),
        (t[10] = 1 - (e + c)),
        this
      );
    },
    compose: function (e, t, i) {
      var r = this.elements,
        o = THREE.Matrix4.__m1,
        n = THREE.Matrix4.__m2;
      return (
        o.identity(),
        o.setRotationFromQuaternion(t),
        n.makeScale(i.x, i.y, i.z),
        this.multiply(o, n),
        (r[12] = e.x),
        (r[13] = e.y),
        (r[14] = e.z),
        this
      );
    },
    decompose: function (e, t, i) {
      var r = this.elements,
        o = THREE.Matrix4.__v1,
        n = THREE.Matrix4.__v2,
        a = THREE.Matrix4.__v3;
      return (
        o.set(r[0], r[1], r[2]),
        n.set(r[4], r[5], r[6]),
        a.set(r[8], r[9], r[10]),
        (e = e instanceof THREE.Vector3 ? e : new THREE.Vector3()),
        (t = t instanceof THREE.Quaternion ? t : new THREE.Quaternion()),
        ((i = i instanceof THREE.Vector3 ? i : new THREE.Vector3()).x =
          o.length()),
        (i.y = n.length()),
        (i.z = a.length()),
        (e.x = r[12]),
        (e.y = r[13]),
        (e.z = r[14]),
        (r = THREE.Matrix4.__m1).copy(this),
        (r.elements[0] = r.elements[0] / i.x),
        (r.elements[1] = r.elements[1] / i.x),
        (r.elements[2] = r.elements[2] / i.x),
        (r.elements[4] = r.elements[4] / i.y),
        (r.elements[5] = r.elements[5] / i.y),
        (r.elements[6] = r.elements[6] / i.y),
        (r.elements[8] = r.elements[8] / i.z),
        (r.elements[9] = r.elements[9] / i.z),
        (r.elements[10] = r.elements[10] / i.z),
        t.setFromRotationMatrix(r),
        [e, t, i]
      );
    },
    extractPosition: function (e) {
      var t = this.elements,
        e = e.elements;
      return (t[12] = e[12]), (t[13] = e[13]), (t[14] = e[14]), this;
    },
    extractRotation: function (e) {
      var t = this.elements,
        e = e.elements,
        i = THREE.Matrix4.__v1,
        r = 1 / i.set(e[0], e[1], e[2]).length(),
        o = 1 / i.set(e[4], e[5], e[6]).length(),
        i = 1 / i.set(e[8], e[9], e[10]).length();
      return (
        (t[0] = e[0] * r),
        (t[1] = e[1] * r),
        (t[2] = e[2] * r),
        (t[4] = e[4] * o),
        (t[5] = e[5] * o),
        (t[6] = e[6] * o),
        (t[8] = e[8] * i),
        (t[9] = e[9] * i),
        (t[10] = e[10] * i),
        this
      );
    },
    translate: function (e) {
      var t = this.elements,
        i = e.x,
        r = e.y,
        e = e.z;
      return (
        (t[12] = t[0] * i + t[4] * r + t[8] * e + t[12]),
        (t[13] = t[1] * i + t[5] * r + t[9] * e + t[13]),
        (t[14] = t[2] * i + t[6] * r + t[10] * e + t[14]),
        (t[15] = t[3] * i + t[7] * r + t[11] * e + t[15]),
        this
      );
    },
    rotateX: function (e) {
      var t = this.elements,
        i = t[4],
        r = t[5],
        o = t[6],
        n = t[7],
        a = t[8],
        s = t[9],
        l = t[10],
        h = t[11],
        c = Math.cos(e),
        e = Math.sin(e);
      return (
        (t[4] = c * i + e * a),
        (t[5] = c * r + e * s),
        (t[6] = c * o + e * l),
        (t[7] = c * n + e * h),
        (t[8] = c * a - e * i),
        (t[9] = c * s - e * r),
        (t[10] = c * l - e * o),
        (t[11] = c * h - e * n),
        this
      );
    },
    rotateY: function (e) {
      var t = this.elements,
        i = t[0],
        r = t[1],
        o = t[2],
        n = t[3],
        a = t[8],
        s = t[9],
        l = t[10],
        h = t[11],
        c = Math.cos(e),
        e = Math.sin(e);
      return (
        (t[0] = c * i - e * a),
        (t[1] = c * r - e * s),
        (t[2] = c * o - e * l),
        (t[3] = c * n - e * h),
        (t[8] = c * a + e * i),
        (t[9] = c * s + e * r),
        (t[10] = c * l + e * o),
        (t[11] = c * h + e * n),
        this
      );
    },
    rotateZ: function (e) {
      var t = this.elements,
        i = t[0],
        r = t[1],
        o = t[2],
        n = t[3],
        a = t[4],
        s = t[5],
        l = t[6],
        h = t[7],
        c = Math.cos(e),
        e = Math.sin(e);
      return (
        (t[0] = c * i + e * a),
        (t[1] = c * r + e * s),
        (t[2] = c * o + e * l),
        (t[3] = c * n + e * h),
        (t[4] = c * a - e * i),
        (t[5] = c * s - e * r),
        (t[6] = c * l - e * o),
        (t[7] = c * h - e * n),
        this
      );
    },
    rotateByAxis: function (e, t) {
      var i = this.elements;
      if (1 === e.x && 0 === e.y && 0 === e.z) return this.rotateX(t);
      if (0 === e.x && 1 === e.y && 0 === e.z) return this.rotateY(t);
      if (0 === e.x && 0 === e.y && 1 === e.z) return this.rotateZ(t);
      var r = e.x,
        o = e.y,
        n = e.z,
        a = Math.sqrt(r * r + o * o + n * n),
        r = r / a,
        o = o / a,
        n = n / a,
        a = r * r,
        s = o * o,
        l = n * n,
        h = Math.cos(t),
        c = Math.sin(t),
        f = 1 - h,
        u = r * o * f,
        p = r * n * f,
        f = o * n * f,
        r = r * c,
        d = o * c,
        c = n * c,
        n = a + (1 - a) * h,
        a = u + c,
        o = p - d,
        u = u - c,
        s = s + (1 - s) * h,
        c = f + r,
        p = p + d,
        f = f - r,
        l = l + (1 - l) * h,
        h = i[0],
        r = i[1],
        d = i[2],
        E = i[3],
        m = i[4],
        v = i[5],
        g = i[6],
        $ = i[7],
        T = i[8],
        R = i[9],
        y = i[10],
        _ = i[11];
      return (
        (i[0] = n * h + a * m + o * T),
        (i[1] = n * r + a * v + o * R),
        (i[2] = n * d + a * g + o * y),
        (i[3] = n * E + a * $ + o * _),
        (i[4] = u * h + s * m + c * T),
        (i[5] = u * r + s * v + c * R),
        (i[6] = u * d + s * g + c * y),
        (i[7] = u * E + s * $ + c * _),
        (i[8] = p * h + f * m + l * T),
        (i[9] = p * r + f * v + l * R),
        (i[10] = p * d + f * g + l * y),
        (i[11] = p * E + f * $ + l * _),
        this
      );
    },
    scale: function (e) {
      var t = this.elements,
        i = e.x,
        r = e.y,
        e = e.z;
      return (
        (t[0] = t[0] * i),
        (t[4] = t[4] * r),
        (t[8] = t[8] * e),
        (t[1] = t[1] * i),
        (t[5] = t[5] * r),
        (t[9] = t[9] * e),
        (t[2] = t[2] * i),
        (t[6] = t[6] * r),
        (t[10] = t[10] * e),
        (t[3] = t[3] * i),
        (t[7] = t[7] * r),
        (t[11] = t[11] * e),
        this
      );
    },
    getMaxScaleOnAxis: function () {
      var e = this.elements;
      return Math.sqrt(
        Math.max(
          e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
          Math.max(
            e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
            e[8] * e[8] + e[9] * e[9] + e[10] * e[10]
          )
        )
      );
    },
    makeTranslation: function (e, t, i) {
      return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, i, 0, 0, 0, 1), this;
    },
    makeRotationX: function (e) {
      var t = Math.cos(e),
        e = Math.sin(e);
      return this.set(1, 0, 0, 0, 0, t, -e, 0, 0, e, t, 0, 0, 0, 0, 1), this;
    },
    makeRotationY: function (e) {
      var t = Math.cos(e),
        e = Math.sin(e);
      return this.set(t, 0, e, 0, 0, 1, 0, 0, -e, 0, t, 0, 0, 0, 0, 1), this;
    },
    makeRotationZ: function (e) {
      var t = Math.cos(e),
        e = Math.sin(e);
      return this.set(t, -e, 0, 0, e, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    },
    makeRotationAxis: function (e, t) {
      var i = Math.cos(t),
        r = Math.sin(t),
        o = 1 - i,
        n = e.x,
        a = e.y,
        s = e.z,
        l = o * n,
        h = o * a;
      return (
        this.set(
          l * n + i,
          l * a - r * s,
          l * s + r * a,
          0,
          l * a + r * s,
          h * a + i,
          h * s - r * n,
          0,
          l * s - r * a,
          h * s + r * n,
          o * s * s + i,
          0,
          0,
          0,
          0,
          1
        ),
        this
      );
    },
    makeScale: function (e, t, i) {
      return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this;
    },
    makeFrustum: function (e, t, i, r, o, n) {
      var a = this.elements;
      return (
        (a[0] = (2 * o) / (t - e)),
        (a[4] = 0),
        (a[8] = (t + e) / (t - e)),
        (a[12] = 0),
        (a[1] = 0),
        (a[5] = (2 * o) / (r - i)),
        (a[9] = (r + i) / (r - i)),
        (a[13] = 0),
        (a[2] = 0),
        (a[6] = 0),
        (a[10] = -(n + o) / (n - o)),
        (a[14] = (-2 * n * o) / (n - o)),
        (a[3] = 0),
        (a[7] = 0),
        (a[11] = -1),
        (a[15] = 0),
        this
      );
    },
    makePerspective: function (e, t, i, r) {
      var e = i * Math.tan((e * Math.PI) / 360),
        o = -e;
      return this.makeFrustum(o * t, e * t, o, e, i, r);
    },
    makeOrthographic: function (e, t, i, r, o, n) {
      var a = this.elements,
        s = t - e,
        l = i - r,
        h = n - o;
      return (
        (a[0] = 2 / s),
        (a[4] = 0),
        (a[8] = 0),
        (a[12] = -((t + e) / s)),
        (a[1] = 0),
        (a[5] = 2 / l),
        (a[9] = 0),
        (a[13] = -((i + r) / l)),
        (a[2] = 0),
        (a[6] = 0),
        (a[10] = -2 / h),
        (a[14] = -((n + o) / h)),
        (a[3] = 0),
        (a[7] = 0),
        (a[11] = 0),
        (a[15] = 1),
        this
      );
    },
    clone: function () {
      var e = this.elements;
      return new THREE.Matrix4(
        e[0],
        e[4],
        e[8],
        e[12],
        e[1],
        e[5],
        e[9],
        e[13],
        e[2],
        e[6],
        e[10],
        e[14],
        e[3],
        e[7],
        e[11],
        e[15]
      );
    },
  }),
  (THREE.Matrix4.__v1 = new THREE.Vector3()),
  (THREE.Matrix4.__v2 = new THREE.Vector3()),
  (THREE.Matrix4.__v3 = new THREE.Vector3()),
  (THREE.Matrix4.__m1 = new THREE.Matrix4()),
  (THREE.Matrix4.__m2 = new THREE.Matrix4()),
  (THREE.Object3D = function () {
    (this.id = THREE.Object3DCount++),
      (this.name = ""),
      (this.parent = void 0),
      (this.children = []),
      (this.up = new THREE.Vector3(0, 1, 0)),
      (this.position = new THREE.Vector3()),
      (this.rotation = new THREE.Vector3()),
      (this.eulerOrder = "XYZ"),
      (this.scale = new THREE.Vector3(1, 1, 1)),
      (this.flipSided = this.doubleSided = !1),
      (this.renderDepth = null),
      (this.rotationAutoUpdate = !0),
      (this.matrix = new THREE.Matrix4()),
      (this.matrixWorld = new THREE.Matrix4()),
      (this.matrixRotationWorld = new THREE.Matrix4()),
      (this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = !0),
      (this.quaternion = new THREE.Quaternion()),
      (this.useQuaternion = !1),
      (this.boundRadius = 0),
      (this.boundRadiusScale = 1),
      (this.visible = !0),
      (this.receiveShadow = this.castShadow = !1),
      (this.frustumCulled = !0),
      (this._vector = new THREE.Vector3());
  }),
  (THREE.Object3D.prototype = {
    constructor: THREE.Object3D,
    applyMatrix: function (e) {
      this.matrix.multiply(e, this.matrix),
        this.scale.getScaleFromMatrix(this.matrix),
        this.rotation.setEulerFromRotationMatrix(
          new THREE.Matrix4().extractRotation(this.matrix),
          this.eulerOrder
        ),
        this.position.getPositionFromMatrix(this.matrix);
    },
    translate: function (e, t) {
      this.matrix.rotateAxis(t), this.position.addSelf(t.multiplyScalar(e));
    },
    translateX: function (e) {
      this.translate(e, this._vector.set(1, 0, 0));
    },
    translateY: function (e) {
      this.translate(e, this._vector.set(0, 1, 0));
    },
    translateZ: function (e) {
      this.translate(e, this._vector.set(0, 0, 1));
    },
    lookAt: function (e) {
      this.matrix.lookAt(e, this.position, this.up),
        this.rotationAutoUpdate &&
          this.rotation.setEulerFromRotationMatrix(
            this.matrix,
            this.eulerOrder
          );
    },
    add: function (e) {
      if (e === this)
        console.warn(
          "THREE.Object3D.add: An object can't be added as a child of itself."
        );
      else if (e instanceof THREE.Object3D) {
        void 0 !== e.parent && e.parent.remove(e),
          (e.parent = this),
          this.children.push(e);
        for (var t = this; void 0 !== t.parent; ) t = t.parent;
        void 0 !== t && t instanceof THREE.Scene && t.__addObject(e);
      }
    },
    remove: function (e) {
      var t = this.children.indexOf(e);
      if (-1 !== t) {
        for (
          e.parent = void 0, this.children.splice(t, 1), t = this;
          void 0 !== t.parent;

        )
          t = t.parent;
        void 0 !== t && t instanceof THREE.Scene && t.__removeObject(e);
      }
    },
    getChildByName: function (e, t) {
      var i, r, o;
      for (i = 0, r = this.children.length; i < r; i++)
        if (
          (o = this.children[i]).name === e ||
          (t && void 0 !== (o = o.getChildByName(e, t)))
        )
          return o;
    },
    updateMatrix: function () {
      this.matrix.setPosition(this.position),
        !0 === this.useQuaternion
          ? this.matrix.setRotationFromQuaternion(this.quaternion)
          : this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder),
        (1 !== this.scale.x || 1 !== this.scale.y || 1 !== this.scale.z) &&
          (this.matrix.scale(this.scale),
          (this.boundRadiusScale = Math.max(
            this.scale.x,
            Math.max(this.scale.y, this.scale.z)
          ))),
        (this.matrixWorldNeedsUpdate = !0);
    },
    updateMatrixWorld: function (e) {
      !0 === this.matrixAutoUpdate && this.updateMatrix(),
        (!0 === this.matrixWorldNeedsUpdate || !0 === e) &&
          (void 0 !== this.parent
            ? this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix)
            : this.matrixWorld.copy(this.matrix),
          (this.matrixWorldNeedsUpdate = !1),
          (e = !0));
      for (var t = 0, i = this.children.length; t < i; t++)
        this.children[t].updateMatrixWorld(e);
    },
    worldToLocal: function (e) {
      return THREE.Object3D.__m1
        .getInverse(this.matrixWorld)
        .multiplyVector3(e);
    },
    localToWorld: function (e) {
      return this.matrixWorld.multiplyVector3(e);
    },
  }),
  (THREE.Object3D.__m1 = new THREE.Matrix4()),
  (THREE.Object3DCount = 0),
  (THREE.Projector = function () {
    function e() {
      var e;
      return (
        n === E.length
          ? ((e = new THREE.RenderableObject()), E.push(e))
          : (e = E[n]),
        n++,
        e
      );
    }
    function t() {
      var e;
      return (
        s === m.length
          ? ((e = new THREE.RenderableVertex()), m.push(e))
          : (e = m[s]),
        s++,
        e
      );
    }
    function i(e, t) {
      return t.z - e.z;
    }
    function r(e, t) {
      var i = 0,
        r = 1,
        o = e.z + e.w,
        n = t.z + t.w,
        a = -e.z + e.w,
        s = -t.z + t.w;
      return (
        (o >= 0 && n >= 0 && a >= 0 && s >= 0) ||
        ((!(o < 0) || !(n < 0)) &&
          (!(a < 0) || !(s < 0)) &&
          (o < 0
            ? (i = Math.max(i, o / (o - n)))
            : n < 0 && (r = Math.min(r, o / (o - n))),
          a < 0
            ? (i = Math.max(i, a / (a - s)))
            : s < 0 && (r = Math.min(r, a / (a - s))),
          !(r < i) && (e.lerpSelf(t, i), t.lerpSelf(e, 1 - r), !0)))
      );
    }
    var o,
      n,
      a,
      s,
      l,
      h,
      c,
      f,
      u,
      p,
      d,
      E = [],
      m = [],
      v = [],
      g = [],
      $ = [],
      T = [],
      R = { objects: [], sprites: [], lights: [], elements: [] },
      y = new THREE.Vector3(),
      _ = new THREE.Vector4(),
      x = new THREE.Matrix4(),
      H = new THREE.Matrix4(),
      b = new THREE.Frustum(),
      w = new THREE.Vector4(),
      S = new THREE.Vector4();
    (this.projectVector = function (e, t) {
      return (
        t.matrixWorldInverse.getInverse(t.matrixWorld),
        x.multiply(t.projectionMatrix, t.matrixWorldInverse),
        x.multiplyVector3(e),
        e
      );
    }),
      (this.unprojectVector = function (e, t) {
        return (
          t.projectionMatrixInverse.getInverse(t.projectionMatrix),
          x.multiply(t.matrixWorld, t.projectionMatrixInverse),
          x.multiplyVector3(e),
          e
        );
      }),
      (this.pickingRay = function (e, t) {
        var i;
        return (
          (e.z = -1),
          (i = new THREE.Vector3(e.x, e.y, 1)),
          this.unprojectVector(e, t),
          this.unprojectVector(i, t),
          i.subSelf(e).normalize(),
          new THREE.Ray(e, i)
        );
      }),
      (this.projectScene = function (E, C, M) {
        var A,
          L,
          P,
          U,
          F,
          D,
          V,
          z,
          B,
          N,
          O,
          I,
          k,
          W,
          G,
          j,
          X,
          Y,
          q = C.near,
          K = C.far,
          Z = !1;
        for (
          d = u = c = h = 0,
            R.elements.length = 0,
            void 0 === C.parent &&
              (console.warn(
                "DEPRECATED: Camera hasn't been added to a Scene. Adding it..."
              ),
              E.add(C)),
            E.updateMatrixWorld(),
            C.matrixWorldInverse.getInverse(C.matrixWorld),
            x.multiply(C.projectionMatrix, C.matrixWorldInverse),
            b.setFromMatrix(x),
            R =
              ((j = E),
              (X = !1),
              (n = 0),
              (R.objects.length = 0),
              (R.sprites.length = 0),
              (R.lights.length = 0),
              (Y = function (t) {
                if (!1 !== t.visible) {
                  (t instanceof THREE.Mesh || t instanceof THREE.Line) &&
                  (!1 === t.frustumCulled || !0 === b.contains(t))
                    ? (y.copy(t.matrixWorld.getPosition()),
                      x.multiplyVector3(y),
                      ((o = e()).object = t),
                      (o.z = y.z),
                      R.objects.push(o))
                    : t instanceof THREE.Sprite || t instanceof THREE.Particle
                    ? (y.copy(t.matrixWorld.getPosition()),
                      x.multiplyVector3(y),
                      ((o = e()).object = t),
                      (o.z = y.z),
                      R.sprites.push(o))
                    : t instanceof THREE.Light && R.lights.push(t);
                  for (var i = 0, r = t.children.length; i < r; i++)
                    Y(t.children[i]);
                }
              })(j),
              !0 === X && R.objects.sort(i),
              R),
            E = 0,
            A = R.objects.length;
          E < A;
          E++
        )
          if (
            ((N = (B = R.objects[E].object).matrixWorld),
            (s = 0),
            B instanceof THREE.Mesh)
          ) {
            for (
              O = B.geometry,
                I = B.geometry.materials,
                U = O.vertices,
                k = O.faces,
                W = O.faceVertexUvs,
                O = B.matrixRotationWorld.extractRotation(N),
                L = 0,
                P = U.length;
              L < P;
              L++
            )
              (a = t()).positionWorld.copy(U[L]),
                N.multiplyVector3(a.positionWorld),
                a.positionScreen.copy(a.positionWorld),
                x.multiplyVector4(a.positionScreen),
                (a.positionScreen.x = a.positionScreen.x / a.positionScreen.w),
                (a.positionScreen.y = a.positionScreen.y / a.positionScreen.w),
                (a.visible = a.positionScreen.z > q && a.positionScreen.z < K);
            for (U = 0, L = k.length; U < L; U++) {
              if ((P = k[U]) instanceof THREE.Face3) {
                if (
                  ((F = m[P.a]),
                  (D = m[P.b]),
                  (V = m[P.c]),
                  !0 !== F.visible ||
                    !0 !== D.visible ||
                    !0 !== V.visible ||
                    ((Z =
                      (V.positionScreen.x - F.positionScreen.x) *
                        (D.positionScreen.y - F.positionScreen.y) -
                        (V.positionScreen.y - F.positionScreen.y) *
                          (D.positionScreen.x - F.positionScreen.x) <
                      0),
                    !0 !== B.doubleSided && Z === B.flipSided))
                )
                  continue;
                (z = void 0),
                  h === v.length
                    ? ((z = new THREE.RenderableFace3()), v.push(z))
                    : (z = v[h]),
                  h++,
                  (l = z).v1.copy(F),
                  l.v2.copy(D),
                  l.v3.copy(V);
              } else if (P instanceof THREE.Face4) {
                if (
                  ((F = m[P.a]),
                  (D = m[P.b]),
                  (V = m[P.c]),
                  (z = m[P.d]),
                  !0 !== F.visible ||
                    !0 !== D.visible ||
                    !0 !== V.visible ||
                    !0 !== z.visible ||
                    ((Z =
                      (z.positionScreen.x - F.positionScreen.x) *
                        (D.positionScreen.y - F.positionScreen.y) -
                        (z.positionScreen.y - F.positionScreen.y) *
                          (D.positionScreen.x - F.positionScreen.x) <
                        0 ||
                      (D.positionScreen.x - V.positionScreen.x) *
                        (z.positionScreen.y - V.positionScreen.y) -
                        (D.positionScreen.y - V.positionScreen.y) *
                          (z.positionScreen.x - V.positionScreen.x) <
                        0),
                    !0 !== B.doubleSided && Z === B.flipSided))
                )
                  continue;
                (G = void 0),
                  c === g.length
                    ? ((G = new THREE.RenderableFace4()), g.push(G))
                    : (G = g[c]),
                  c++,
                  (l = G).v1.copy(F),
                  l.v2.copy(D),
                  l.v3.copy(V),
                  l.v4.copy(z);
              }
              for (
                l.normalWorld.copy(P.normal),
                  !1 === Z &&
                    (!0 === B.flipSided || !0 === B.doubleSided) &&
                    l.normalWorld.negate(),
                  O.multiplyVector3(l.normalWorld),
                  l.centroidWorld.copy(P.centroid),
                  N.multiplyVector3(l.centroidWorld),
                  l.centroidScreen.copy(l.centroidWorld),
                  x.multiplyVector3(l.centroidScreen),
                  V = P.vertexNormals,
                  F = 0,
                  D = V.length;
                F < D;
                F++
              )
                (z = l.vertexNormalsWorld[F]).copy(V[F]),
                  !1 === Z &&
                    (!0 === B.flipSided || !0 === B.doubleSided) &&
                    z.negate(),
                  O.multiplyVector3(z);
              for (F = 0, D = W.length; F < D; F++)
                if (void 0 !== (G = W[F][U]))
                  for (V = 0, z = G.length; V < z; V++) l.uvs[F][V] = G[V];
              (l.material = B.material),
                (l.faceMaterial =
                  null !== P.materialIndex ? I[P.materialIndex] : null),
                (l.z = l.centroidScreen.z),
                R.elements.push(l);
            }
          } else if (B instanceof THREE.Line)
            for (
              H.multiply(x, N),
                U = B.geometry.vertices,
                (F = t()).positionScreen.copy(U[0]),
                H.multiplyVector4(F.positionScreen),
                N = B.type === THREE.LinePieces ? 2 : 1,
                L = 1,
                P = U.length;
              L < P;
              L++
            )
              (F = t()).positionScreen.copy(U[L]),
                H.multiplyVector4(F.positionScreen),
                (L + 1) % N > 0 ||
                  ((D = m[s - 2]),
                  w.copy(F.positionScreen),
                  S.copy(D.positionScreen),
                  !0 === r(w, S) &&
                    (w.multiplyScalar(1 / w.w),
                    S.multiplyScalar(1 / S.w),
                    (I = void 0),
                    u === $.length
                      ? ((I = new THREE.RenderableLine()), $.push(I))
                      : (I = $[u]),
                    u++,
                    (f = I).v1.positionScreen.copy(w),
                    f.v2.positionScreen.copy(S),
                    (f.z = Math.max(w.z, S.z)),
                    (f.material = B.material),
                    R.elements.push(f)));
        for (E = 0, A = R.sprites.length; E < A; E++)
          (N = (B = R.sprites[E].object).matrixWorld),
            B instanceof THREE.Particle &&
              (_.set(N.elements[12], N.elements[13], N.elements[14], 1),
              x.multiplyVector4(_),
              (_.z = _.z / _.w),
              _.z > 0 &&
                _.z < 1 &&
                ((q = void 0),
                d === T.length
                  ? ((q = new THREE.RenderableParticle()), T.push(q))
                  : (q = T[d]),
                d++,
                ((p = q).x = _.x / _.w),
                (p.y = _.y / _.w),
                (p.z = _.z),
                (p.rotation = B.rotation.z),
                (p.scale.x =
                  B.scale.x *
                  Math.abs(
                    p.x -
                      (_.x + C.projectionMatrix.elements[0]) /
                        (_.w + C.projectionMatrix.elements[12])
                  )),
                (p.scale.y =
                  B.scale.y *
                  Math.abs(
                    p.y -
                      (_.y + C.projectionMatrix.elements[5]) /
                        (_.w + C.projectionMatrix.elements[13])
                  )),
                (p.material = B.material),
                R.elements.push(p)));
        return M && R.elements.sort(i), R;
      });
  }),
  (THREE.Quaternion = function (e, t, i, r) {
    (this.x = e || 0),
      (this.y = t || 0),
      (this.z = i || 0),
      (this.w = void 0 !== r ? r : 1);
  }),
  (THREE.Quaternion.prototype = {
    constructor: THREE.Quaternion,
    set: function (e, t, i, r) {
      return (this.x = e), (this.y = t), (this.z = i), (this.w = r), this;
    },
    copy: function (e) {
      return (
        (this.x = e.x), (this.y = e.y), (this.z = e.z), (this.w = e.w), this
      );
    },
    setFromEuler: function (e, t) {
      var i = Math.cos(e.x / 2),
        r = Math.cos(e.y / 2),
        o = Math.cos(e.z / 2),
        n = Math.sin(e.x / 2),
        a = Math.sin(e.y / 2),
        s = Math.sin(e.z / 2);
      return (
        void 0 === t || "XYZ" === t
          ? ((this.x = n * r * o + i * a * s),
            (this.y = i * a * o - n * r * s),
            (this.z = i * r * s + n * a * o),
            (this.w = i * r * o - n * a * s))
          : "YXZ" === t
          ? ((this.x = n * r * o + i * a * s),
            (this.y = i * a * o - n * r * s),
            (this.z = i * r * s - n * a * o),
            (this.w = i * r * o + n * a * s))
          : "ZXY" === t
          ? ((this.x = n * r * o - i * a * s),
            (this.y = i * a * o + n * r * s),
            (this.z = i * r * s + n * a * o),
            (this.w = i * r * o - n * a * s))
          : "ZYX" === t
          ? ((this.x = n * r * o - i * a * s),
            (this.y = i * a * o + n * r * s),
            (this.z = i * r * s - n * a * o),
            (this.w = i * r * o + n * a * s))
          : "YZX" === t
          ? ((this.x = n * r * o + i * a * s),
            (this.y = i * a * o + n * r * s),
            (this.z = i * r * s - n * a * o),
            (this.w = i * r * o - n * a * s))
          : "XZY" === t &&
            ((this.x = n * r * o - i * a * s),
            (this.y = i * a * o - n * r * s),
            (this.z = i * r * s + n * a * o),
            (this.w = i * r * o + n * a * s)),
        this
      );
    },
    setFromAxisAngle: function (e, t) {
      var i = t / 2,
        r = Math.sin(i);
      return (
        (this.x = e.x * r),
        (this.y = e.y * r),
        (this.z = e.z * r),
        (this.w = Math.cos(i)),
        this
      );
    },
    setFromRotationMatrix: function (e) {
      var t = e.elements,
        i = t[0],
        e = t[4],
        r = t[8],
        o = t[1],
        n = t[5],
        a = t[9],
        s = t[2],
        l = t[6],
        t = t[10],
        h = i + n + t;
      return (
        h > 0
          ? ((i = 0.5 / Math.sqrt(h + 1)),
            (this.w = 0.25 / i),
            (this.x = (l - a) * i),
            (this.y = (r - s) * i),
            (this.z = (o - e) * i))
          : i > n && i > t
          ? ((i = 2 * Math.sqrt(1 + i - n - t)),
            (this.w = (l - a) / i),
            (this.x = 0.25 * i),
            (this.y = (e + o) / i),
            (this.z = (r + s) / i))
          : n > t
          ? ((i = 2 * Math.sqrt(1 + n - i - t)),
            (this.w = (r - s) / i),
            (this.x = (e + o) / i),
            (this.y = 0.25 * i),
            (this.z = (a + l) / i))
          : ((i = 2 * Math.sqrt(1 + t - i - n)),
            (this.w = (o - e) / i),
            (this.x = (r + s) / i),
            (this.y = (a + l) / i),
            (this.z = 0.25 * i)),
        this
      );
    },
    calculateW: function () {
      return (
        (this.w = -Math.sqrt(
          Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z)
        )),
        this
      );
    },
    inverse: function () {
      return (
        (this.x = -1 * this.x),
        (this.y = -1 * this.y),
        (this.z = -1 * this.z),
        this
      );
    },
    length: function () {
      return Math.sqrt(
        this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
      );
    },
    normalize: function () {
      var e = Math.sqrt(
        this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
      );
      return (
        0 === e
          ? (this.w = this.z = this.y = this.x = 0)
          : ((e = 1 / e),
            (this.x = this.x * e),
            (this.y = this.y * e),
            (this.z = this.z * e),
            (this.w = this.w * e)),
        this
      );
    },
    multiply: function (e, t) {
      return (
        (this.x = e.x * t.w + e.y * t.z - e.z * t.y + e.w * t.x),
        (this.y = -e.x * t.z + e.y * t.w + e.z * t.x + e.w * t.y),
        (this.z = e.x * t.y - e.y * t.x + e.z * t.w + e.w * t.z),
        (this.w = -e.x * t.x - e.y * t.y - e.z * t.z + e.w * t.w),
        this
      );
    },
    multiplySelf: function (e) {
      var t = this.x,
        i = this.y,
        r = this.z,
        o = this.w,
        n = e.x,
        a = e.y,
        s = e.z,
        e = e.w;
      return (
        (this.x = t * e + o * n + i * s - r * a),
        (this.y = i * e + o * a + r * n - t * s),
        (this.z = r * e + o * s + t * a - i * n),
        (this.w = o * e - t * n - i * a - r * s),
        this
      );
    },
    multiplyVector3: function (e, t) {
      t || (t = e);
      var i = e.x,
        r = e.y,
        o = e.z,
        n = this.x,
        a = this.y,
        s = this.z,
        l = this.w,
        h = l * i + a * o - s * r,
        c = l * r + s * i - n * o,
        f = l * o + n * r - a * i,
        i = -n * i - a * r - s * o;
      return (
        (t.x = h * l + -(i * n) + -(c * s) - -(f * a)),
        (t.y = c * l + -(i * a) + -(f * n) - -(h * s)),
        (t.z = f * l + -(i * s) + -(h * a) - -(c * n)),
        t
      );
    },
    slerpSelf: function (e, t) {
      var i = this.x,
        r = this.y,
        o = this.z,
        n = this.w,
        a = n * e.w + i * e.x + r * e.y + o * e.z;
      if (
        (a < 0
          ? ((this.w = -e.w),
            (this.x = -e.x),
            (this.y = -e.y),
            (this.z = -e.z),
            (a = -a))
          : this.copy(e),
        a >= 1)
      )
        return (this.w = n), (this.x = i), (this.y = r), (this.z = o), this;
      var s = Math.acos(a),
        l = Math.sqrt(1 - a * a);
      return 0.001 > Math.abs(l)
        ? ((this.w = 0.5 * (n + this.w)),
          (this.x = 0.5 * (i + this.x)),
          (this.y = 0.5 * (r + this.y)),
          (this.z = 0.5 * (o + this.z)),
          this)
        : ((a = Math.sin((1 - t) * s) / l),
          (s = Math.sin(t * s) / l),
          (this.w = n * a + this.w * s),
          (this.x = i * a + this.x * s),
          (this.y = r * a + this.y * s),
          (this.z = o * a + this.z * s),
          this);
    },
    clone: function () {
      return new THREE.Quaternion(this.x, this.y, this.z, this.w);
    },
  }),
  (THREE.Quaternion.slerp = function (e, t, i, r) {
    var o = e.w * t.w + e.x * t.x + e.y * t.y + e.z * t.z;
    if (
      (o < 0
        ? ((i.w = -t.w), (i.x = -t.x), (i.y = -t.y), (i.z = -t.z), (o = -o))
        : i.copy(t),
      Math.abs(o) >= 1)
    )
      return (i.w = e.w), (i.x = e.x), (i.y = e.y), (i.z = e.z), i;
    var t = Math.acos(o),
      n = Math.sqrt(1 - o * o);
    return 0.001 > Math.abs(n)
      ? ((i.w = 0.5 * (e.w + i.w)),
        (i.x = 0.5 * (e.x + i.x)),
        (i.y = 0.5 * (e.y + i.y)),
        (i.z = 0.5 * (e.z + i.z)),
        i)
      : ((o = Math.sin((1 - r) * t) / n),
        (r = Math.sin(r * t) / n),
        (i.w = e.w * o + i.w * r),
        (i.x = e.x * o + i.x * r),
        (i.y = e.y * o + i.y * r),
        (i.z = e.z * o + i.z * r),
        i);
  }),
  (THREE.Vertex = function (e) {
    return (
      console.warn(
        "THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead."
      ),
      e
    );
  }),
  (THREE.Face3 = function (e, t, i, r, o, n) {
    (this.a = e),
      (this.b = t),
      (this.c = i),
      (this.normal = r instanceof THREE.Vector3 ? r : new THREE.Vector3()),
      (this.vertexNormals = r instanceof Array ? r : []),
      (this.color = o instanceof THREE.Color ? o : new THREE.Color()),
      (this.vertexColors = o instanceof Array ? o : []),
      (this.vertexTangents = []),
      (this.materialIndex = n),
      (this.centroid = new THREE.Vector3());
  }),
  (THREE.Face3.prototype = {
    constructor: THREE.Face3,
    clone: function () {
      var e,
        t,
        i = new THREE.Face3(this.a, this.b, this.c);
      for (
        i.normal.copy(this.normal),
          i.color.copy(this.color),
          i.centroid.copy(this.centroid),
          i.materialIndex = this.materialIndex,
          e = 0,
          t = this.vertexNormals.length;
        e < t;
        e++
      )
        i.vertexNormals[e] = this.vertexNormals[e].clone();
      for (e = 0, t = this.vertexColors.length; e < t; e++)
        i.vertexColors[e] = this.vertexColors[e].clone();
      for (e = 0, t = this.vertexTangents.length; e < t; e++)
        i.vertexTangents[e] = this.vertexTangents[e].clone();
      return i;
    },
  }),
  (THREE.Face4 = function (e, t, i, r, o, n, a) {
    (this.a = e),
      (this.b = t),
      (this.c = i),
      (this.d = r),
      (this.normal = o instanceof THREE.Vector3 ? o : new THREE.Vector3()),
      (this.vertexNormals = o instanceof Array ? o : []),
      (this.color = n instanceof THREE.Color ? n : new THREE.Color()),
      (this.vertexColors = n instanceof Array ? n : []),
      (this.vertexTangents = []),
      (this.materialIndex = a),
      (this.centroid = new THREE.Vector3());
  }),
  (THREE.Face4.prototype = {
    constructor: THREE.Face4,
    clone: function () {
      var e,
        t,
        i = new THREE.Face4(this.a, this.b, this.c, this.d);
      for (
        i.normal.copy(this.normal),
          i.color.copy(this.color),
          i.centroid.copy(this.centroid),
          i.materialIndex = this.materialIndex,
          e = 0,
          t = this.vertexNormals.length;
        e < t;
        e++
      )
        i.vertexNormals[e] = this.vertexNormals[e].clone();
      for (e = 0, t = this.vertexColors.length; e < t; e++)
        i.vertexColors[e] = this.vertexColors[e].clone();
      for (e = 0, t = this.vertexTangents.length; e < t; e++)
        i.vertexTangents[e] = this.vertexTangents[e].clone();
      return i;
    },
  }),
  (THREE.UV = function (e, t) {
    (this.u = e || 0), (this.v = t || 0);
  }),
  (THREE.UV.prototype = {
    constructor: THREE.UV,
    set: function (e, t) {
      return (this.u = e), (this.v = t), this;
    },
    copy: function (e) {
      return (this.u = e.u), (this.v = e.v), this;
    },
    lerpSelf: function (e, t) {
      return (
        (this.u = this.u + (e.u - this.u) * t),
        (this.v = this.v + (e.v - this.v) * t),
        this
      );
    },
    clone: function () {
      return new THREE.UV(this.u, this.v);
    },
  }),
  (THREE.Geometry = function () {
    (this.id = THREE.GeometryCount++),
      (this.name = ""),
      (this.vertices = []),
      (this.colors = []),
      (this.materials = []),
      (this.faces = []),
      (this.faceUvs = [[]]),
      (this.faceVertexUvs = [[]]),
      (this.morphTargets = []),
      (this.morphColors = []),
      (this.morphNormals = []),
      (this.skinWeights = []),
      (this.skinIndices = []),
      (this.boundingSphere = this.boundingBox = null),
      (this.dynamic = this.hasTangents = !1);
  }),
  (THREE.Geometry.prototype = {
    constructor: THREE.Geometry,
    applyMatrix: function (e) {
      var t = new THREE.Matrix4();
      t.extractRotation(e);
      for (var i = 0, r = this.vertices.length; i < r; i++)
        e.multiplyVector3(this.vertices[i]);
      for (i = 0, r = this.faces.length; i < r; i++) {
        var o = this.faces[i];
        t.multiplyVector3(o.normal);
        for (var n = 0, a = o.vertexNormals.length; n < a; n++)
          t.multiplyVector3(o.vertexNormals[n]);
        e.multiplyVector3(o.centroid);
      }
    },
    computeCentroids: function () {
      var e, t, i;
      for (e = 0, t = this.faces.length; e < t; e++)
        (i = this.faces[e]).centroid.set(0, 0, 0),
          i instanceof THREE.Face3
            ? (i.centroid.addSelf(this.vertices[i.a]),
              i.centroid.addSelf(this.vertices[i.b]),
              i.centroid.addSelf(this.vertices[i.c]),
              i.centroid.divideScalar(3))
            : i instanceof THREE.Face4 &&
              (i.centroid.addSelf(this.vertices[i.a]),
              i.centroid.addSelf(this.vertices[i.b]),
              i.centroid.addSelf(this.vertices[i.c]),
              i.centroid.addSelf(this.vertices[i.d]),
              i.centroid.divideScalar(4));
    },
    computeFaceNormals: function () {
      var e,
        t,
        i,
        r,
        o,
        n,
        a = new THREE.Vector3(),
        s = new THREE.Vector3();
      for (e = 0, t = this.faces.length; e < t; e++)
        (i = this.faces[e]),
          (r = this.vertices[i.a]),
          (o = this.vertices[i.b]),
          (n = this.vertices[i.c]),
          a.sub(n, o),
          s.sub(r, o),
          a.crossSelf(s),
          a.isZero() || a.normalize(),
          i.normal.copy(a);
    },
    computeVertexNormals: function () {
      var e, t, i, r;
      if (void 0 === this.__tmpVertices) {
        for (
          r = this.__tmpVertices = Array(this.vertices.length),
            e = 0,
            t = this.vertices.length;
          e < t;
          e++
        )
          r[e] = new THREE.Vector3();
        for (e = 0, t = this.faces.length; e < t; e++)
          (i = this.faces[e]) instanceof THREE.Face3
            ? (i.vertexNormals = [
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
              ])
            : i instanceof THREE.Face4 &&
              (i.vertexNormals = [
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
              ]);
      } else
        for (
          r = this.__tmpVertices, e = 0, t = this.vertices.length;
          e < t;
          e++
        )
          r[e].set(0, 0, 0);
      for (e = 0, t = this.faces.length; e < t; e++)
        (i = this.faces[e]) instanceof THREE.Face3
          ? (r[i.a].addSelf(i.normal),
            r[i.b].addSelf(i.normal),
            r[i.c].addSelf(i.normal))
          : i instanceof THREE.Face4 &&
            (r[i.a].addSelf(i.normal),
            r[i.b].addSelf(i.normal),
            r[i.c].addSelf(i.normal),
            r[i.d].addSelf(i.normal));
      for (e = 0, t = this.vertices.length; e < t; e++) r[e].normalize();
      for (e = 0, t = this.faces.length; e < t; e++)
        (i = this.faces[e]) instanceof THREE.Face3
          ? (i.vertexNormals[0].copy(r[i.a]),
            i.vertexNormals[1].copy(r[i.b]),
            i.vertexNormals[2].copy(r[i.c]))
          : i instanceof THREE.Face4 &&
            (i.vertexNormals[0].copy(r[i.a]),
            i.vertexNormals[1].copy(r[i.b]),
            i.vertexNormals[2].copy(r[i.c]),
            i.vertexNormals[3].copy(r[i.d]));
    },
    computeMorphNormals: function () {
      for (r = 0, o = this.faces.length; r < o; r++)
        for (
          (n = this.faces[r]).__originalFaceNormal
            ? n.__originalFaceNormal.copy(n.normal)
            : (n.__originalFaceNormal = n.normal.clone()),
            n.__originalVertexNormals || (n.__originalVertexNormals = []),
            t = 0,
            i = n.vertexNormals.length;
          t < i;
          t++
        )
          n.__originalVertexNormals[t]
            ? n.__originalVertexNormals[t].copy(n.vertexNormals[t])
            : (n.__originalVertexNormals[t] = n.vertexNormals[t].clone());
      var e = new THREE.Geometry();
      for (
        e.faces = this.faces, t = 0, i = this.morphTargets.length;
        t < i;
        t++
      ) {
        if (!this.morphNormals[t]) {
          (this.morphNormals[t] = {}),
            (this.morphNormals[t].faceNormals = []),
            (this.morphNormals[t].vertexNormals = []);
          var t,
            i,
            r,
            o,
            n,
            a,
            s,
            l = this.morphNormals[t].faceNormals,
            h = this.morphNormals[t].vertexNormals;
          for (r = 0, o = this.faces.length; r < o; r++)
            (n = this.faces[r]),
              (a = new THREE.Vector3()),
              (s =
                n instanceof THREE.Face3
                  ? {
                      a: new THREE.Vector3(),
                      b: new THREE.Vector3(),
                      c: new THREE.Vector3(),
                    }
                  : {
                      a: new THREE.Vector3(),
                      b: new THREE.Vector3(),
                      c: new THREE.Vector3(),
                      d: new THREE.Vector3(),
                    }),
              l.push(a),
              h.push(s);
        }
        for (
          l = this.morphNormals[t],
            e.vertices = this.morphTargets[t].vertices,
            e.computeFaceNormals(),
            e.computeVertexNormals(),
            r = 0,
            o = this.faces.length;
          r < o;
          r++
        )
          (n = this.faces[r]),
            (a = l.faceNormals[r]),
            (s = l.vertexNormals[r]),
            a.copy(n.normal),
            n instanceof THREE.Face3
              ? (s.a.copy(n.vertexNormals[0]),
                s.b.copy(n.vertexNormals[1]),
                s.c.copy(n.vertexNormals[2]))
              : (s.a.copy(n.vertexNormals[0]),
                s.b.copy(n.vertexNormals[1]),
                s.c.copy(n.vertexNormals[2]),
                s.d.copy(n.vertexNormals[3]));
      }
      for (r = 0, o = this.faces.length; r < o; r++)
        ((n = this.faces[r]).normal = n.__originalFaceNormal),
          (n.vertexNormals = n.__originalVertexNormals);
    },
    computeTangents: function () {
      function e(e, t, i, r, o, n, x) {
        (s = e.vertices[t]),
          (l = e.vertices[i]),
          (h = e.vertices[r]),
          (c = a[o]),
          (f = a[n]),
          (u = a[x]),
          (p = l.x - s.x),
          (d = h.x - s.x),
          (E = l.y - s.y),
          (m = h.y - s.y),
          (v = l.z - s.z),
          (g = h.z - s.z),
          ($ = f.u - c.u),
          (T = u.u - c.u),
          (R = f.v - c.v),
          (_ = 1 / ($ * (y = u.v - c.v) - T * R)),
          w.set((y * p - R * d) * _, (y * E - R * m) * _, (y * v - R * g) * _),
          S.set(($ * d - T * p) * _, ($ * m - T * E) * _, ($ * g - T * v) * _),
          H[t].addSelf(w),
          H[i].addSelf(w),
          H[r].addSelf(w),
          b[t].addSelf(S),
          b[i].addSelf(S),
          b[r].addSelf(S);
      }
      var t,
        i,
        r,
        o,
        n,
        a,
        s,
        l,
        h,
        c,
        f,
        u,
        p,
        d,
        E,
        m,
        v,
        g,
        $,
        T,
        R,
        y,
        _,
        x,
        H = [],
        b = [],
        w = new THREE.Vector3(),
        S = new THREE.Vector3(),
        C = new THREE.Vector3(),
        M = new THREE.Vector3(),
        A = new THREE.Vector3();
      for (t = 0, i = this.vertices.length; t < i; t++)
        (H[t] = new THREE.Vector3()), (b[t] = new THREE.Vector3());
      for (t = 0, i = this.faces.length; t < i; t++)
        (n = this.faces[t]),
          (a = this.faceVertexUvs[0][t]),
          n instanceof THREE.Face3
            ? e(this, n.a, n.b, n.c, 0, 1, 2)
            : n instanceof THREE.Face4 &&
              (e(this, n.a, n.b, n.d, 0, 1, 3),
              e(this, n.b, n.c, n.d, 1, 2, 3));
      var L = ["a", "b", "c", "d"];
      for (t = 0, i = this.faces.length; t < i; t++)
        for (r = 0, n = this.faces[t]; r < n.vertexNormals.length; r++)
          A.copy(n.vertexNormals[r]),
            (x = H[(o = n[L[r]])]),
            C.copy(x),
            C.subSelf(A.multiplyScalar(A.dot(x))).normalize(),
            M.cross(n.vertexNormals[r], x),
            (o = (o = M.dot(b[o])) < 0 ? -1 : 1),
            (n.vertexTangents[r] = new THREE.Vector4(C.x, C.y, C.z, o));
      this.hasTangents = !0;
    },
    computeBoundingBox: function () {
      if (
        (this.boundingBox ||
          (this.boundingBox = {
            min: new THREE.Vector3(),
            max: new THREE.Vector3(),
          }),
        this.vertices.length > 0)
      ) {
        var e;
        (e = this.vertices[0]),
          this.boundingBox.min.copy(e),
          this.boundingBox.max.copy(e);
        for (
          var t = this.boundingBox.min,
            i = this.boundingBox.max,
            r = 1,
            o = this.vertices.length;
          r < o;
          r++
        )
          (e = this.vertices[r]).x < t.x
            ? (t.x = e.x)
            : e.x > i.x && (i.x = e.x),
            e.y < t.y ? (t.y = e.y) : e.y > i.y && (i.y = e.y),
            e.z < t.z ? (t.z = e.z) : e.z > i.z && (i.z = e.z);
      } else
        this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0);
    },
    computeBoundingSphere: function () {
      this.boundingSphere || (this.boundingSphere = { radius: 0 });
      for (var e, t = 0, i = 0, r = this.vertices.length; i < r; i++)
        (e = this.vertices[i].length()) > t && (t = e);
      this.boundingSphere.radius = t;
    },
    mergeVertices: function () {
      var e,
        t,
        i,
        r,
        o,
        n = {},
        a = [],
        s = [],
        l = 1e4;
      for (t = 0, i = this.vertices.length; t < i; t++)
        void 0 ===
        n[
          (e = [
            Math.round((e = this.vertices[t]).x * l),
            Math.round(e.y * l),
            Math.round(e.z * l),
          ].join("_"))
        ]
          ? ((n[e] = t), a.push(this.vertices[t]), (s[t] = a.length - 1))
          : (s[t] = s[n[e]]);
      for (t = 0, i = this.faces.length; t < i; t++)
        if ((n = this.faces[t]) instanceof THREE.Face3)
          (n.a = s[n.a]), (n.b = s[n.b]), (n.c = s[n.c]);
        else if (n instanceof THREE.Face4) {
          for (
            l = 3,
              n.a = s[n.a],
              n.b = s[n.b],
              n.c = s[n.c],
              n.d = s[n.d],
              e = [n.a, n.b, n.c, n.d];
            l > 0;
            l--
          )
            if (e.indexOf(n["abcd"[l]]) !== l) {
              for (
                e.splice(l, 1),
                  this.faces[t] = new THREE.Face3(
                    e[0],
                    e[1],
                    e[2],
                    n.normal,
                    n.color,
                    n.materialIndex
                  ),
                  e = 0,
                  r = this.faceVertexUvs.length;
                e < r;
                e++
              )
                (o = this.faceVertexUvs[e][t]) && o.splice(l, 1);
              this.faces[t].vertexColors = n.vertexColors;
              break;
            }
        }
      return (s = this.vertices.length - a.length), (this.vertices = a), s;
    },
  }),
  (THREE.GeometryCount = 0),
  (THREE.Spline = function (e) {
    function t(e, t, i, r, o, n, a) {
      return (
        (e = (i - e) * 0.5),
        (r = (r - t) * 0.5),
        (2 * (t - i) + e + r) * a + (-3 * (t - i) - 2 * e - r) * n + e * o + t
      );
    }
    this.points = e;
    var i,
      r,
      o,
      n,
      a,
      s,
      l,
      h,
      c,
      f = [],
      u = { x: 0, y: 0, z: 0 };
    (this.initFromArray = function (e) {
      this.points = [];
      for (var t = 0; t < e.length; t++)
        this.points[t] = { x: e[t][0], y: e[t][1], z: e[t][2] };
    }),
      (this.getPoint = function (e) {
        return (
          (r = Math.floor((i = (this.points.length - 1) * e))),
          (o = i - r),
          (f[0] = 0 === r ? r : r - 1),
          (f[1] = r),
          (f[2] = r > this.points.length - 2 ? this.points.length - 1 : r + 1),
          (f[3] = r > this.points.length - 3 ? this.points.length - 1 : r + 2),
          (s = this.points[f[0]]),
          (l = this.points[f[1]]),
          (h = this.points[f[2]]),
          (c = this.points[f[3]]),
          (n = o * o),
          (a = o * n),
          (u.x = t(s.x, l.x, h.x, c.x, o, n, a)),
          (u.y = t(s.y, l.y, h.y, c.y, o, n, a)),
          (u.z = t(s.z, l.z, h.z, c.z, o, n, a)),
          u
        );
      }),
      (this.getControlPointsArray = function () {
        var e,
          t,
          i = this.points.length,
          r = [];
        for (e = 0; e < i; e++) (t = this.points[e]), (r[e] = [t.x, t.y, t.z]);
        return r;
      }),
      (this.getLength = function (e) {
        var t,
          i,
          r,
          o = (t = t = 0),
          n = new THREE.Vector3(),
          a = new THREE.Vector3(),
          s = [],
          l = 0;
        for (
          s[0] = 0,
            e || (e = 100),
            i = this.points.length * e,
            n.copy(this.points[0]),
            e = 1;
          e < i;
          e++
        )
          (t = e / i),
            (r = this.getPoint(t)),
            a.copy(r),
            (l += a.distanceTo(n)),
            n.copy(r),
            (t = Math.floor((t = (this.points.length - 1) * t))) != o &&
              ((s[t] = l), (o = t));
        return (s[s.length] = l), { chunks: s, total: l };
      }),
      (this.reparametrizeByArcLength = function (e) {
        var t,
          i,
          r,
          o,
          n,
          a,
          s = [],
          l = new THREE.Vector3(),
          h = this.getLength();
        for (
          s.push(l.copy(this.points[0]).clone()), t = 1;
          t < this.points.length;
          t++
        ) {
          for (
            a = Math.ceil((e * (i = h.chunks[t] - h.chunks[t - 1])) / h.total),
              o = (t - 1) / (this.points.length - 1),
              n = t / (this.points.length - 1),
              i = 1;
            i < a - 1;
            i++
          )
            (r = o + i * (1 / a) * (n - o)),
              (r = this.getPoint(r)),
              s.push(l.copy(r).clone());
          s.push(l.copy(this.points[t]).clone());
        }
        this.points = s;
      });
  }),
  (THREE.Camera = function () {
    THREE.Object3D.call(this),
      (this.matrixWorldInverse = new THREE.Matrix4()),
      (this.projectionMatrix = new THREE.Matrix4()),
      (this.projectionMatrixInverse = new THREE.Matrix4());
  }),
  (THREE.Camera.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.Camera.prototype.lookAt = function (e) {
    this.matrix.lookAt(this.position, e, this.up),
      !0 === this.rotationAutoUpdate &&
        this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder);
  }),
  (THREE.OrthographicCamera = function (e, t, i, r, o, n) {
    THREE.Camera.call(this),
      (this.left = e),
      (this.right = t),
      (this.top = i),
      (this.bottom = r),
      (this.near = void 0 !== o ? o : 0.1),
      (this.far = void 0 !== n ? n : 2e3),
      this.updateProjectionMatrix();
  }),
  (THREE.OrthographicCamera.prototype = Object.create(THREE.Camera.prototype)),
  (THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {
    this.projectionMatrix.makeOrthographic(
      this.left,
      this.right,
      this.top,
      this.bottom,
      this.near,
      this.far
    );
  }),
  (THREE.PerspectiveCamera = function (e, t, i, r) {
    THREE.Camera.call(this),
      (this.fov = void 0 !== e ? e : 50),
      (this.aspect = void 0 !== t ? t : 1),
      (this.near = void 0 !== i ? i : 0.1),
      (this.far = void 0 !== r ? r : 2e3),
      this.updateProjectionMatrix();
  }),
  (THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype)),
  (THREE.PerspectiveCamera.prototype.setLens = function (e, t) {
    (this.fov =
      2 * Math.atan((void 0 !== t ? t : 24) / (2 * e)) * (180 / Math.PI)),
      this.updateProjectionMatrix();
  }),
  (THREE.PerspectiveCamera.prototype.setViewOffset = function (
    e,
    t,
    i,
    r,
    o,
    n
  ) {
    (this.fullWidth = e),
      (this.fullHeight = t),
      (this.x = i),
      (this.y = r),
      (this.width = o),
      (this.height = n),
      this.updateProjectionMatrix();
  }),
  (THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function () {
    if (this.fullWidth) {
      var e = this.fullWidth / this.fullHeight,
        t = Math.tan((this.fov * Math.PI) / 360) * this.near,
        i = -t,
        r = e * i,
        e = Math.abs(e * t - r),
        i = Math.abs(t - i);
      this.projectionMatrix.makeFrustum(
        r + (this.x * e) / this.fullWidth,
        r + ((this.x + this.width) * e) / this.fullWidth,
        t - ((this.y + this.height) * i) / this.fullHeight,
        t - (this.y * i) / this.fullHeight,
        this.near,
        this.far
      );
    } else
      this.projectionMatrix.makePerspective(
        this.fov,
        this.aspect,
        this.near,
        this.far
      );
  }),
  (THREE.Light = function (e) {
    THREE.Object3D.call(this), (this.color = new THREE.Color(e));
  }),
  (THREE.Light.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.AmbientLight = function (e) {
    THREE.Light.call(this, e);
  }),
  (THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype)),
  (THREE.DirectionalLight = function (e, t, i) {
    THREE.Light.call(this, e),
      (this.position = new THREE.Vector3(0, 1, 0)),
      (this.target = new THREE.Object3D()),
      (this.intensity = void 0 !== t ? t : 1),
      (this.distance = void 0 !== i ? i : 0),
      (this.onlyShadow = this.castShadow = !1),
      (this.shadowCameraNear = 50),
      (this.shadowCameraFar = 5e3),
      (this.shadowCameraLeft = -500),
      (this.shadowCameraTop = this.shadowCameraRight = 500),
      (this.shadowCameraBottom = -500),
      (this.shadowCameraVisible = !1),
      (this.shadowBias = 0),
      (this.shadowDarkness = 0.5),
      (this.shadowMapHeight = this.shadowMapWidth = 512),
      (this.shadowCascade = !1),
      (this.shadowCascadeOffset = new THREE.Vector3(0, 0, -1e3)),
      (this.shadowCascadeCount = 2),
      (this.shadowCascadeBias = [0, 0, 0]),
      (this.shadowCascadeWidth = [512, 512, 512]),
      (this.shadowCascadeHeight = [512, 512, 512]),
      (this.shadowCascadeNearZ = [-1, 0.99, 0.998]),
      (this.shadowCascadeFarZ = [0.99, 0.998, 1]),
      (this.shadowCascadeArray = []),
      (this.shadowMatrix =
        this.shadowCamera =
        this.shadowMapSize =
        this.shadowMap =
          null);
  }),
  (THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype)),
  (THREE.PointLight = function (e, t, i) {
    THREE.Light.call(this, e),
      (this.position = new THREE.Vector3(0, 0, 0)),
      (this.intensity = void 0 !== t ? t : 1),
      (this.distance = void 0 !== i ? i : 0);
  }),
  (THREE.PointLight.prototype = Object.create(THREE.Light.prototype)),
  (THREE.SpotLight = function (e, t, i, r, o) {
    THREE.Light.call(this, e),
      (this.position = new THREE.Vector3(0, 1, 0)),
      (this.target = new THREE.Object3D()),
      (this.intensity = void 0 !== t ? t : 1),
      (this.distance = void 0 !== i ? i : 0),
      (this.angle = void 0 !== r ? r : Math.PI / 2),
      (this.exponent = void 0 !== o ? o : 10),
      (this.onlyShadow = this.castShadow = !1),
      (this.shadowCameraNear = 50),
      (this.shadowCameraFar = 5e3),
      (this.shadowCameraFov = 50),
      (this.shadowCameraVisible = !1),
      (this.shadowBias = 0),
      (this.shadowDarkness = 0.5),
      (this.shadowMapHeight = this.shadowMapWidth = 512),
      (this.shadowMatrix =
        this.shadowCamera =
        this.shadowMapSize =
        this.shadowMap =
          null);
  }),
  (THREE.SpotLight.prototype = Object.create(THREE.Light.prototype)),
  (THREE.Loader = function (e) {
    (this.statusDomElement = (this.showStatus = e)
      ? THREE.Loader.prototype.addStatusElement()
      : null),
      (this.onLoadStart = function () {}),
      (this.onLoadProgress = function () {}),
      (this.onLoadComplete = function () {});
  }),
  (THREE.Loader.prototype = {
    constructor: THREE.Loader,
    crossOrigin: "anonymous",
    addStatusElement: function () {
      var e = document.createElement("div");
      return (
        (e.style.position = "absolute"),
        (e.style.right = "0px"),
        (e.style.top = "0px"),
        (e.style.fontSize = "0.8em"),
        (e.style.textAlign = "left"),
        (e.style.background = "rgba(0,0,0,0.25)"),
        (e.style.color = "#fff"),
        (e.style.width = "120px"),
        (e.style.padding = "0.5em 0.5em 0.5em 0.5em"),
        (e.style.zIndex = 1e3),
        (e.innerHTML = "Loading ..."),
        e
      );
    },
    updateProgress: function (e) {
      var t = "Loaded ",
        t = e.total
          ? t + (((100 * e.loaded) / e.total).toFixed(0) + "%")
          : t + ((e.loaded / 1e3).toFixed(2) + " KB");
      this.statusDomElement.innerHTML = t;
    },
    extractUrlBase: function (e) {
      return (e = e.split("/")).pop(), (e.length < 1 ? "." : e.join("/")) + "/";
    },
    initMaterials: function (e, t, i) {
      e.materials = [];
      for (var r = 0; r < t.length; ++r)
        e.materials[r] = THREE.Loader.prototype.createMaterial(t[r], i);
    },
    hasNormals: function (e) {
      var t,
        i,
        r = e.materials.length;
      for (i = 0; i < r; i++)
        if ((t = e.materials[i]) instanceof THREE.ShaderMaterial) return !0;
      return !1;
    },
    createMaterial: function (e, t) {
      function i(e) {
        return Math.floor((e = Math.log(e) / Math.LN2)) == e;
      }
      function r(e) {
        return Math.pow(2, Math.round((e = Math.log(e) / Math.LN2)));
      }
      function o(e, o, n, s, l, h) {
        var c,
          f,
          u,
          p = document.createElement("canvas");
        (e[o] = new THREE.Texture(p)),
          (e[o].sourceFile = n),
          s &&
            (e[o].repeat.set(s[0], s[1]),
            1 != s[0] && (e[o].wrapS = THREE.RepeatWrapping),
            1 != s[1] && (e[o].wrapT = THREE.RepeatWrapping)),
          l && e[o].offset.set(l[0], l[1]),
          h &&
            (void 0 !==
              (s = {
                repeat: THREE.RepeatWrapping,
                mirror: THREE.MirroredRepeatWrapping,
              })[h[0]] && (e[o].wrapS = s[h[0]]),
            void 0 !== s[h[1]] && (e[o].wrapT = s[h[1]])),
          (c = e[o]),
          (f = t + "/" + n),
          ((u = new Image()).onload = function () {
            if (i(this.width) && i(this.height)) c.image = this;
            else {
              var e = r(this.width),
                t = r(this.height);
              (c.image.width = e),
                (c.image.height = t),
                c.image.getContext("2d").drawImage(this, 0, 0, e, t);
            }
            c.needsUpdate = !0;
          }),
          (u.crossOrigin = a.crossOrigin),
          (u.src = f);
      }
      function n(e) {
        return ((255 * e[0]) << 16) + ((255 * e[1]) << 8) + 255 * e[2];
      }
      var a = this,
        s = "MeshLambertMaterial",
        l = {
          color: 15658734,
          opacity: 1,
          map: null,
          lightMap: null,
          normalMap: null,
          wireframe: e.wireframe,
        };
      if (e.shading) {
        var h = e.shading.toLowerCase();
        "phong" === h
          ? (s = "MeshPhongMaterial")
          : "basic" === h && (s = "MeshBasicMaterial");
      }
      return (
        void 0 !== e.blending &&
          void 0 !== THREE[e.blending] &&
          (l.blending = THREE[e.blending]),
        (void 0 !== e.transparent || e.opacity < 1) &&
          (l.transparent = e.transparent),
        void 0 !== e.depthTest && (l.depthTest = e.depthTest),
        void 0 !== e.depthWrite && (l.depthWrite = e.depthWrite),
        void 0 !== e.vertexColors &&
          ("face" == e.vertexColors
            ? (l.vertexColors = THREE.FaceColors)
            : e.vertexColors && (l.vertexColors = THREE.VertexColors)),
        e.colorDiffuse
          ? (l.color = n(e.colorDiffuse))
          : e.DbgColor && (l.color = e.DbgColor),
        e.colorSpecular && (l.specular = n(e.colorSpecular)),
        e.colorAmbient && (l.ambient = n(e.colorAmbient)),
        e.transparency && (l.opacity = e.transparency),
        e.specularCoef && (l.shininess = e.specularCoef),
        e.mapDiffuse &&
          t &&
          o(
            l,
            "map",
            e.mapDiffuse,
            e.mapDiffuseRepeat,
            e.mapDiffuseOffset,
            e.mapDiffuseWrap
          ),
        e.mapLight &&
          t &&
          o(
            l,
            "lightMap",
            e.mapLight,
            e.mapLightRepeat,
            e.mapLightOffset,
            e.mapLightWrap
          ),
        e.mapNormal &&
          t &&
          o(
            l,
            "normalMap",
            e.mapNormal,
            e.mapNormalRepeat,
            e.mapNormalOffset,
            e.mapNormalWrap
          ),
        e.mapSpecular &&
          t &&
          o(
            l,
            "specularMap",
            e.mapSpecular,
            e.mapSpecularRepeat,
            e.mapSpecularOffset,
            e.mapSpecularWrap
          ),
        e.mapNormal
          ? ((s = THREE.ShaderUtils.lib.normal),
            ((h = THREE.UniformsUtils.clone(s.uniforms)).tNormal.texture =
              l.normalMap),
            e.mapNormalFactor && (h.uNormalScale.value = e.mapNormalFactor),
            l.map &&
              ((h.tDiffuse.texture = l.map), (h.enableDiffuse.value = !0)),
            l.specularMap &&
              ((h.tSpecular.texture = l.specularMap),
              (h.enableSpecular.value = !0)),
            l.lightMap &&
              ((h.tAO.texture = l.lightMap), (h.enableAO.value = !0)),
            h.uDiffuseColor.value.setHex(l.color),
            h.uSpecularColor.value.setHex(l.specular),
            h.uAmbientColor.value.setHex(l.ambient),
            (h.uShininess.value = l.shininess),
            void 0 !== l.opacity && (h.uOpacity.value = l.opacity),
            (l = new THREE.ShaderMaterial({
              fragmentShader: s.fragmentShader,
              vertexShader: s.vertexShader,
              uniforms: h,
              lights: !0,
              fog: !0,
            })))
          : (l = new THREE[s](l)),
        void 0 !== e.DbgName && (l.name = e.DbgName),
        l
      );
    },
  }),
  (THREE.BinaryLoader = function (e) {
    THREE.Loader.call(this, e);
  }),
  (THREE.BinaryLoader.prototype = Object.create(THREE.Loader.prototype)),
  (THREE.BinaryLoader.prototype.load = function (e, t, i, r) {
    var i = i || this.extractUrlBase(e),
      r = r || this.extractUrlBase(e),
      o = this.showProgress ? THREE.Loader.prototype.updateProgress : null;
    this.onLoadStart(), this.loadAjaxJSON(this, e, t, i, r, o);
  }),
  (THREE.BinaryLoader.prototype.loadAjaxJSON = function (e, t, i, r, o, n) {
    var a = new XMLHttpRequest();
    (a.onreadystatechange = function () {
      if (4 == a.readyState) {
        if (200 == a.status || 0 == a.status) {
          var s = JSON.parse(a.responseText);
          e.loadAjaxBuffers(s, i, o, r, n);
        } else
          console.error(
            "THREE.BinaryLoader: Couldn't load [" + t + "] [" + a.status + "]"
          );
      }
    }),
      a.open("GET", t, !0),
      a.overrideMimeType &&
        a.overrideMimeType("text/plain; charset=x-user-defined"),
      a.setRequestHeader("Content-Type", "text/plain"),
      a.send(null);
  }),
  (THREE.BinaryLoader.prototype.loadAjaxBuffers = function (e, t, i, r, o) {
    var n = new XMLHttpRequest(),
      a = i + "/" + e.buffers,
      s = 0;
    (n.onreadystatechange = function () {
      4 == n.readyState
        ? 200 == n.status || 0 == n.status
          ? THREE.BinaryLoader.prototype.createBinModel(
              n.response,
              t,
              r,
              e.materials
            )
          : console.error(
              "THREE.BinaryLoader: Couldn't load [" + a + "] [" + n.status + "]"
            )
        : 3 == n.readyState
        ? o &&
          (0 == s && (s = n.getResponseHeader("Content-Length")),
          o({ total: s, loaded: n.responseText.length }))
        : 2 == n.readyState && (s = n.getResponseHeader("Content-Length"));
    }),
      n.open("GET", a, !0),
      (n.responseType = "arraybuffer"),
      n.send(null);
  }),
  (THREE.BinaryLoader.prototype.createBinModel = function (e, t, i, r) {
    var o = function (t) {
      function i(e) {
        return e % 4 ? 4 - (e % 4) : 0;
      }
      function o(e, t) {
        return new Uint8Array(e, t, 1)[0];
      }
      function n(e, t) {
        return new Uint32Array(e, t, 1)[0];
      }
      function a(t, i) {
        var r,
          o,
          n,
          a,
          s,
          l,
          h,
          c,
          f = new Uint32Array(e, i, 3 * t);
        for (r = 0; r < t; r++) {
          (o = f[3 * r]),
            (n = f[3 * r + 1]),
            (a = f[3 * r + 2]),
            (s = P[2 * o]),
            (o = P[2 * o + 1]),
            (l = P[2 * n]),
            (h = P[2 * n + 1]),
            (n = P[2 * a]),
            (c = P[2 * a + 1]),
            (a = M.faceVertexUvs[0]);
          var u = [];
          u.push(new THREE.UV(s, o)),
            u.push(new THREE.UV(l, h)),
            u.push(new THREE.UV(n, c)),
            a.push(u);
        }
      }
      function s(t, i) {
        var r,
          o,
          n,
          a,
          s,
          l,
          h,
          c,
          f,
          u,
          p = new Uint32Array(e, i, 4 * t);
        for (r = 0; r < t; r++) {
          (o = p[4 * r]),
            (n = p[4 * r + 1]),
            (a = p[4 * r + 2]),
            (s = p[4 * r + 3]),
            (l = P[2 * o]),
            (o = P[2 * o + 1]),
            (h = P[2 * n]),
            (f = P[2 * n + 1]),
            (c = P[2 * a]),
            (u = P[2 * a + 1]),
            (a = P[2 * s]),
            (n = P[2 * s + 1]),
            (s = M.faceVertexUvs[0]);
          var d = [];
          d.push(new THREE.UV(l, o)),
            d.push(new THREE.UV(h, f)),
            d.push(new THREE.UV(c, u)),
            d.push(new THREE.UV(a, n)),
            s.push(d);
        }
      }
      function l(t, i, r) {
        for (
          var o,
            n,
            a,
            s,
            i = new Uint32Array(e, i, 3 * t),
            l = new Uint16Array(e, r, t),
            r = 0;
          r < t;
          r++
        )
          (o = i[3 * r]),
            (n = i[3 * r + 1]),
            (a = i[3 * r + 2]),
            (s = l[r]),
            M.faces.push(new THREE.Face3(o, n, a, null, null, s));
      }
      function h(t, i, r) {
        for (
          var o,
            n,
            a,
            s,
            l,
            i = new Uint32Array(e, i, 4 * t),
            h = new Uint16Array(e, r, t),
            r = 0;
          r < t;
          r++
        )
          (o = i[4 * r]),
            (n = i[4 * r + 1]),
            (a = i[4 * r + 2]),
            (s = i[4 * r + 3]),
            (l = h[r]),
            M.faces.push(new THREE.Face4(o, n, a, s, null, null, l));
      }
      function c(t, i, r, o) {
        for (
          var n,
            a,
            s,
            l,
            h,
            c,
            f,
            i = new Uint32Array(e, i, 3 * t),
            r = new Uint32Array(e, r, 3 * t),
            u = new Uint16Array(e, o, t),
            o = 0;
          o < t;
          o++
        ) {
          (n = i[3 * o]),
            (a = i[3 * o + 1]),
            (s = i[3 * o + 2]),
            (h = r[3 * o]),
            (c = r[3 * o + 1]),
            (f = r[3 * o + 2]),
            (l = u[o]);
          var p = L[3 * c],
            d = L[3 * c + 1];
          c = L[3 * c + 2];
          var E = L[3 * f],
            m = L[3 * f + 1];
          (f = L[3 * f + 2]),
            M.faces.push(
              new THREE.Face3(
                n,
                a,
                s,
                [
                  new THREE.Vector3(L[3 * h], L[3 * h + 1], L[3 * h + 2]),
                  new THREE.Vector3(p, d, c),
                  new THREE.Vector3(E, m, f),
                ],
                null,
                l
              )
            );
        }
      }
      function f(t, i, r, o) {
        for (
          var n,
            a,
            s,
            l,
            h,
            c,
            f,
            u,
            p,
            i = new Uint32Array(e, i, 4 * t),
            r = new Uint32Array(e, r, 4 * t),
            d = new Uint16Array(e, o, t),
            o = 0;
          o < t;
          o++
        ) {
          (n = i[4 * o]),
            (a = i[4 * o + 1]),
            (s = i[4 * o + 2]),
            (l = i[4 * o + 3]),
            (c = r[4 * o]),
            (f = r[4 * o + 1]),
            (u = r[4 * o + 2]),
            (p = r[4 * o + 3]),
            (h = d[o]);
          var E = L[3 * f],
            m = L[3 * f + 1];
          f = L[3 * f + 2];
          var v = L[3 * u],
            g = L[3 * u + 1];
          u = L[3 * u + 2];
          var $ = L[3 * p],
            T = L[3 * p + 1];
          (p = L[3 * p + 2]),
            M.faces.push(
              new THREE.Face4(
                n,
                a,
                s,
                l,
                [
                  new THREE.Vector3(L[3 * c], L[3 * c + 1], L[3 * c + 2]),
                  new THREE.Vector3(E, m, f),
                  new THREE.Vector3(v, g, u),
                  new THREE.Vector3($, T, p),
                ],
                null,
                h
              )
            );
        }
      }
      var u,
        p,
        d,
        E,
        m,
        v,
        g,
        $,
        T,
        R,
        y,
        _,
        x,
        H,
        b,
        w,
        S,
        C,
        M = this,
        A = 0,
        L = [],
        P = [];
      THREE.Geometry.call(this),
        THREE.Loader.prototype.initMaterials(M, r, t),
        (function (e, t, i) {
          for (var e = new Uint8Array(e, t, i), r = "", o = 0; o < i; o++)
            r += String.fromCharCode(e[t + o]);
        })(e, A, 12),
        (u = o(e, A + 12)),
        o(e, A + 13),
        o(e, A + 14),
        o(e, A + 15),
        (p = o(e, A + 16)),
        (d = o(e, A + 17)),
        (E = o(e, A + 18)),
        (m = o(e, A + 19)),
        (v = n(e, A + 20)),
        (g = n(e, A + 20 + 4)),
        ($ = n(e, A + 20 + 8)),
        (t = n(e, A + 20 + 12)),
        (T = n(e, A + 20 + 16)),
        (R = n(e, A + 20 + 20)),
        (y = n(e, A + 20 + 24)),
        (_ = n(e, A + 20 + 28)),
        (x = n(e, A + 20 + 32)),
        (H = n(e, A + 20 + 36)),
        (b = n(e, A + 20 + 40)),
        (A += u),
        (u = 3 * p + m),
        (C = 4 * p + m),
        (w = t * u),
        (S = T * (u + 3 * d)),
        (p = R * (u + 3 * E)),
        (m = y * (u + 3 * d + 3 * E)),
        (u = _ * C),
        (d = x * (C + 4 * d)),
        (E = H * (C + 4 * E)),
        (A += (function (t) {
          var i,
            r,
            o,
            n,
            t = new Float32Array(e, t, 3 * v);
          for (i = 0; i < v; i++)
            (r = t[3 * i]),
              (o = t[3 * i + 1]),
              (n = t[3 * i + 2]),
              M.vertices.push(new THREE.Vector3(r, o, n));
          return 3 * v * Float32Array.BYTES_PER_ELEMENT;
        })(A)),
        (A += (function (t) {
          if (g) {
            var i,
              r,
              o,
              n,
              t = new Int8Array(e, t, 3 * g);
            for (i = 0; i < g; i++)
              (r = t[3 * i]),
                (o = t[3 * i + 1]),
                (n = t[3 * i + 2]),
                L.push(r / 127, o / 127, n / 127);
          }
          return 3 * g * Int8Array.BYTES_PER_ELEMENT;
        })(A)),
        (A += i(3 * g)),
        (A += (function (t) {
          if ($) {
            var i,
              r,
              o,
              t = new Float32Array(e, t, 2 * $);
            for (i = 0; i < $; i++)
              (r = t[2 * i]), (o = t[2 * i + 1]), P.push(r, o);
          }
          return 2 * $ * Float32Array.BYTES_PER_ELEMENT;
        })(A)),
        (w = A + w + i(2 * t)),
        (S = w + S + i(2 * T)),
        (p = S + p + i(2 * R)),
        (m = p + m + i(2 * y)),
        (u = m + u + i(2 * _)),
        (d = u + d + i(2 * x)),
        (E = d + E + i(2 * H)),
        (function (e) {
          if (R) {
            var t = e + R * Uint32Array.BYTES_PER_ELEMENT * 3;
            l(R, e, t + R * Uint32Array.BYTES_PER_ELEMENT * 3), a(R, t);
          }
        })(S),
        (function (e) {
          if (y) {
            var t = e + y * Uint32Array.BYTES_PER_ELEMENT * 3,
              i = t + y * Uint32Array.BYTES_PER_ELEMENT * 3;
            c(y, e, t, i + y * Uint32Array.BYTES_PER_ELEMENT * 3), a(y, i);
          }
        })(p),
        (function (e) {
          if (H) {
            var t = e + H * Uint32Array.BYTES_PER_ELEMENT * 4;
            h(H, e, t + H * Uint32Array.BYTES_PER_ELEMENT * 4), s(H, t);
          }
        })(d),
        (function (e) {
          if (b) {
            var t = e + b * Uint32Array.BYTES_PER_ELEMENT * 4,
              i = t + b * Uint32Array.BYTES_PER_ELEMENT * 4;
            f(b, e, t, i + b * Uint32Array.BYTES_PER_ELEMENT * 4), s(b, i);
          }
        })(E),
        t && l(t, A, A + t * Uint32Array.BYTES_PER_ELEMENT * 3),
        (function (e) {
          if (T) {
            var t = e + T * Uint32Array.BYTES_PER_ELEMENT * 3;
            c(T, e, t, t + T * Uint32Array.BYTES_PER_ELEMENT * 3);
          }
        })(w),
        _ && h(_, m, m + _ * Uint32Array.BYTES_PER_ELEMENT * 4),
        (function (e) {
          if (x) {
            var t = e + x * Uint32Array.BYTES_PER_ELEMENT * 4;
            f(x, e, t, t + x * Uint32Array.BYTES_PER_ELEMENT * 4);
          }
        })(u),
        this.computeCentroids(),
        this.computeFaceNormals(),
        THREE.Loader.prototype.hasNormals(this) && this.computeTangents();
    };
    (o.prototype = Object.create(THREE.Geometry.prototype)), t(new o(i));
  }),
  (THREE.ImageLoader = function () {
    THREE.EventTarget.call(this), (this.crossOrigin = null);
  }),
  (THREE.ImageLoader.prototype = {
    constructor: THREE.ImageLoader,
    load: function (e) {
      var t = this,
        i = new Image();
      i.addEventListener(
        "load",
        function () {
          t.dispatchEvent({ type: "load", content: i });
        },
        !1
      ),
        i.addEventListener(
          "error",
          function () {
            t.dispatchEvent({
              type: "error",
              message: "Couldn't load URL [" + e + "]",
            });
          },
          !1
        ),
        t.crossOrigin && (i.crossOrigin = t.crossOrigin),
        (i.src = e);
    },
  }),
  (THREE.JSONLoader = function (e) {
    THREE.Loader.call(this, e);
  }),
  (THREE.JSONLoader.prototype = Object.create(THREE.Loader.prototype)),
  (THREE.JSONLoader.prototype.load = function (e, t, i) {
    (i = i || this.extractUrlBase(e)),
      this.onLoadStart(),
      this.loadAjaxJSON(this, e, t, i);
  }),
  (THREE.JSONLoader.prototype.loadAjaxJSON = function (e, t, i, r, o) {
    var n = new XMLHttpRequest(),
      a = 0;
    (n.onreadystatechange = function () {
      if (n.readyState === n.DONE) {
        if (200 === n.status || 0 === n.status) {
          if (n.responseText) {
            var s = JSON.parse(n.responseText);
            e.createModel(s, i, r);
          } else
            console.warn(
              "THREE.JSONLoader: [" +
                t +
                "] seems to be unreachable or file there is empty"
            );
          e.onLoadComplete();
        } else
          console.error(
            "THREE.JSONLoader: Couldn't load [" + t + "] [" + n.status + "]"
          );
      } else
        n.readyState === n.LOADING
          ? o &&
            (0 === a && (a = n.getResponseHeader("Content-Length")),
            o({ total: a, loaded: n.responseText.length }))
          : n.readyState === n.HEADERS_RECEIVED &&
            (a = n.getResponseHeader("Content-Length"));
    }),
      n.open("GET", t, !0),
      n.overrideMimeType &&
        n.overrideMimeType("text/plain; charset=x-user-defined"),
      n.setRequestHeader("Content-Type", "text/plain"),
      n.send(null);
  }),
  (THREE.JSONLoader.prototype.createModel = function (e, t, i) {
    var r = new THREE.Geometry(),
      o = void 0 !== e.scale ? 1 / e.scale : 1;
    this.initMaterials(r, e.materials, i),
      (function (t) {
        var i,
          o,
          n,
          a,
          s,
          l,
          h,
          c,
          f,
          u,
          p,
          d,
          E,
          m,
          v = e.faces;
        l = e.vertices;
        var g = e.normals,
          $ = e.colors,
          T = 0;
        for (i = 0; i < e.uvs.length; i++) e.uvs[i].length && T++;
        for (i = 0; i < T; i++) (r.faceUvs[i] = []), (r.faceVertexUvs[i] = []);
        for (a = 0, s = l.length; a < s; )
          ((h = new THREE.Vector3()).x = l[a++] * t),
            (h.y = l[a++] * t),
            (h.z = l[a++] * t),
            r.vertices.push(h);
        for (a = 0, s = v.length; a < s; ) {
          if (
            ((l = 1 & (t = v[a++])),
            (n = 2 & t),
            (i = 4 & t),
            (o = 8 & t),
            (c = 16 & t),
            (h = 32 & t),
            (u = 64 & t),
            (t &= 128),
            l
              ? (((p = new THREE.Face4()).a = v[a++]),
                (p.b = v[a++]),
                (p.c = v[a++]),
                (p.d = v[a++]),
                (l = 4))
              : (((p = new THREE.Face3()).a = v[a++]),
                (p.b = v[a++]),
                (p.c = v[a++]),
                (l = 3)),
            n && ((n = v[a++]), (p.materialIndex = n)),
            (n = r.faces.length),
            i)
          )
            for (i = 0; i < T; i++)
              (m = (d = e.uvs[i])[2 * (f = v[a++])]),
                (f = d[2 * f + 1]),
                (r.faceUvs[i][n] = new THREE.UV(m, f));
          if (o)
            for (i = 0; i < T; i++) {
              for (o = 0, d = e.uvs[i], E = []; o < l; o++)
                (m = d[2 * (f = v[a++])]),
                  (f = d[2 * f + 1]),
                  (E[o] = new THREE.UV(m, f));
              r.faceVertexUvs[i][n] = E;
            }
          if (
            (c &&
              ((c = 3 * v[a++]),
              ((o = new THREE.Vector3()).x = g[c++]),
              (o.y = g[c++]),
              (o.z = g[c]),
              (p.normal = o)),
            h)
          )
            for (i = 0; i < l; i++)
              (c = 3 * v[a++]),
                ((o = new THREE.Vector3()).x = g[c++]),
                (o.y = g[c++]),
                (o.z = g[c]),
                p.vertexNormals.push(o);
          if (
            (u && ((h = v[a++]), (h = new THREE.Color($[h])), (p.color = h)), t)
          )
            for (i = 0; i < l; i++)
              (h = v[a++]), (h = new THREE.Color($[h])), p.vertexColors.push(h);
          r.faces.push(p);
        }
      })(o),
      (function () {
        var t, i, o, n;
        if (e.skinWeights)
          for (t = 0, i = e.skinWeights.length; t < i; t += 2)
            (o = e.skinWeights[t]),
              (n = e.skinWeights[t + 1]),
              r.skinWeights.push(new THREE.Vector4(o, n, 0, 0));
        if (e.skinIndices)
          for (t = 0, i = e.skinIndices.length; t < i; t += 2)
            (o = e.skinIndices[t]),
              (n = e.skinIndices[t + 1]),
              r.skinIndices.push(new THREE.Vector4(o, n, 0, 0));
        (r.bones = e.bones), (r.animation = e.animation);
      })(),
      (function (t) {
        if (void 0 !== e.morphTargets) {
          var i, o, n, a, s, l;
          for (i = 0, o = e.morphTargets.length; i < o; i++)
            for (
              r.morphTargets[i] = {},
                r.morphTargets[i].name = e.morphTargets[i].name,
                r.morphTargets[i].vertices = [],
                s = r.morphTargets[i].vertices,
                l = e.morphTargets[i].vertices,
                n = 0,
                a = l.length;
              n < a;
              n += 3
            ) {
              var h = new THREE.Vector3();
              (h.x = l[n] * t),
                (h.y = l[n + 1] * t),
                (h.z = l[n + 2] * t),
                s.push(h);
            }
        }
        if (void 0 !== e.morphColors)
          for (i = 0, o = e.morphColors.length; i < o; i++)
            for (
              r.morphColors[i] = {},
                r.morphColors[i].name = e.morphColors[i].name,
                r.morphColors[i].colors = [],
                a = r.morphColors[i].colors,
                s = e.morphColors[i].colors,
                t = 0,
                n = s.length;
              t < n;
              t += 3
            )
              (l = new THREE.Color(16755200)).setRGB(s[t], s[t + 1], s[t + 2]),
                a.push(l);
      })(o),
      r.computeCentroids(),
      r.computeFaceNormals(),
      this.hasNormals(r) && r.computeTangents(),
      t(r);
  }),
  (THREE.GeometryLoader = function () {
    THREE.EventTarget.call(this), (this.path = this.crossOrigin = null);
  }),
  (THREE.GeometryLoader.prototype = {
    constructor: THREE.GeometryLoader,
    load: function (e) {
      var t = this,
        i = null;
      if (null === t.path) {
        var r = e.split("/");
        r.pop(), (t.path = r.length < 1 ? "." : r.join("/"));
      }
      (r = new XMLHttpRequest()).addEventListener(
        "load",
        function (r) {
          r.target.responseText
            ? (i = t.parse(JSON.parse(r.target.responseText), o))
            : t.dispatchEvent({
                type: "error",
                message: "Invalid file [" + e + "]",
              });
        },
        !1
      ),
        r.addEventListener(
          "error",
          function () {
            t.dispatchEvent({
              type: "error",
              message: "Couldn't load URL [" + e + "]",
            });
          },
          !1
        ),
        r.open("GET", e, !0),
        r.send(null);
      var o = new THREE.LoadingMonitor();
      o.addEventListener("load", function () {
        t.dispatchEvent({ type: "load", content: i });
      }),
        o.add(r);
    },
    parse: function (e, t) {
      var i = this,
        r = new THREE.Geometry(),
        o = void 0 !== e.scale ? 1 / e.scale : 1;
      if (e.materials) {
        r.materials = [];
        for (var n = 0; n < e.materials.length; ++n) {
          var a = e.materials[n],
            s = function (e) {
              return Math.floor((e = Math.log(e) / Math.LN2)) == e;
            },
            l = function (e) {
              return Math.pow(2, Math.round((e = Math.log(e) / Math.LN2)));
            },
            h = function (e, r, o, n, a, h) {
              (e[r] = new THREE.Texture()),
                (e[r].sourceFile = o),
                n &&
                  (e[r].repeat.set(n[0], n[1]),
                  1 != n[0] && (e[r].wrapS = THREE.RepeatWrapping),
                  1 != n[1] && (e[r].wrapT = THREE.RepeatWrapping)),
                a && e[r].offset.set(a[0], a[1]),
                h &&
                  (void 0 !==
                    (n = {
                      repeat: THREE.RepeatWrapping,
                      mirror: THREE.MirroredRepeatWrapping,
                    })[h[0]] && (e[r].wrapS = n[h[0]]),
                  void 0 !== n[h[1]] && (e[r].wrapT = n[h[1]]));
              var c = e[r],
                e = new THREE.ImageLoader();
              e.addEventListener("load", function (e) {
                if (s((e = e.content).width) && s(e.height)) c.image = e;
                else {
                  var t = l(e.width),
                    i = l(e.height);
                  (c.image = document.createElement("canvas")),
                    (c.image.width = t),
                    (c.image.height = i),
                    c.image.getContext("2d").drawImage(e, 0, 0, t, i);
                }
                c.needsUpdate = !0;
              }),
                (e.crossOrigin = i.crossOrigin),
                e.load(i.path + "/" + o),
                t && t.add(e);
            },
            c = function (e) {
              return ((255 * e[0]) << 16) + ((255 * e[1]) << 8) + 255 * e[2];
            },
            f = "MeshLambertMaterial",
            u = {
              color: 15658734,
              opacity: 1,
              map: null,
              lightMap: null,
              normalMap: null,
              wireframe: a.wireframe,
            };
          if (a.shading) {
            var p = a.shading.toLowerCase();
            "phong" === p
              ? (f = "MeshPhongMaterial")
              : "basic" === p && (f = "MeshBasicMaterial");
          }
          void 0 !== a.blending &&
            void 0 !== THREE[a.blending] &&
            (u.blending = THREE[a.blending]),
            (void 0 !== a.transparent || a.opacity < 1) &&
              (u.transparent = a.transparent),
            void 0 !== a.depthTest && (u.depthTest = a.depthTest),
            void 0 !== a.depthWrite && (u.depthWrite = a.depthWrite),
            void 0 !== a.vertexColors &&
              ("face" == a.vertexColors
                ? (u.vertexColors = THREE.FaceColors)
                : a.vertexColors && (u.vertexColors = THREE.VertexColors)),
            a.colorDiffuse
              ? (u.color = c(a.colorDiffuse))
              : a.DbgColor && (u.color = a.DbgColor),
            a.colorSpecular && (u.specular = c(a.colorSpecular)),
            a.colorAmbient && (u.ambient = c(a.colorAmbient)),
            a.transparency && (u.opacity = a.transparency),
            a.specularCoef && (u.shininess = a.specularCoef),
            a.mapDiffuse &&
              h(
                u,
                "map",
                a.mapDiffuse,
                a.mapDiffuseRepeat,
                a.mapDiffuseOffset,
                a.mapDiffuseWrap
              ),
            a.mapLight &&
              h(
                u,
                "lightMap",
                a.mapLight,
                a.mapLightRepeat,
                a.mapLightOffset,
                a.mapLightWrap
              ),
            a.mapNormal &&
              h(
                u,
                "normalMap",
                a.mapNormal,
                a.mapNormalRepeat,
                a.mapNormalOffset,
                a.mapNormalWrap
              ),
            a.mapSpecular &&
              h(
                u,
                "specularMap",
                a.mapSpecular,
                a.mapSpecularRepeat,
                a.mapSpecularOffset,
                a.mapSpecularWrap
              ),
            a.mapNormal
              ? ((h = THREE.ShaderUtils.lib.normal),
                ((c = THREE.UniformsUtils.clone(h.uniforms)).tNormal.texture =
                  u.normalMap),
                a.mapNormalFactor && (c.uNormalScale.value = a.mapNormalFactor),
                u.map &&
                  ((c.tDiffuse.texture = u.map), (c.enableDiffuse.value = !0)),
                u.specularMap &&
                  ((c.tSpecular.texture = u.specularMap),
                  (c.enableSpecular.value = !0)),
                u.lightMap &&
                  ((c.tAO.texture = u.lightMap), (c.enableAO.value = !0)),
                c.uDiffuseColor.value.setHex(u.color),
                c.uSpecularColor.value.setHex(u.specular),
                c.uAmbientColor.value.setHex(u.ambient),
                (c.uShininess.value = u.shininess),
                void 0 !== u.opacity && (c.uOpacity.value = u.opacity),
                (u = new THREE.ShaderMaterial({
                  fragmentShader: h.fragmentShader,
                  vertexShader: h.vertexShader,
                  uniforms: c,
                  lights: !0,
                  fog: !0,
                })))
              : (u = new THREE[f](u)),
            void 0 !== a.DbgName && (u.name = a.DbgName),
            (r.materials[n] = u);
        }
      }
      var a = e.faces,
        d = e.vertices,
        u = e.normals,
        h = e.colors,
        c = 0;
      if (e.uvs) for (n = 0; n < e.uvs.length; n++) e.uvs[n].length && c++;
      for (n = 0; n < c; n++) (r.faceUvs[n] = []), (r.faceVertexUvs[n] = []);
      for (f = 0, p = d.length; f < p; ) {
        var E = new THREE.Vector3();
        (E.x = d[f++] * o),
          (E.y = d[f++] * o),
          (E.z = d[f++] * o),
          r.vertices.push(E);
      }
      for (f = 0, p = a.length; f < p; ) {
        var m = a[f++],
          v = 2 & m,
          n = 4 & m,
          g = 8 & m,
          $ = 16 & m,
          d = 32 & m,
          T = 64 & m,
          E = 128 & m;
        if (1 & m) {
          ((m = new THREE.Face4()).a = a[f++]),
            (m.b = a[f++]),
            (m.c = a[f++]),
            (m.d = a[f++]);
          var R = 4;
        } else
          ((m = new THREE.Face3()).a = a[f++]),
            (m.b = a[f++]),
            (m.c = a[f++]),
            (R = 3);
        v && ((v = a[f++]), (m.materialIndex = v));
        var y = r.faces.length;
        if (n)
          for (n = 0; n < c; n++) {
            var _ = e.uvs[n],
              v = a[f++],
              x = _[2 * v],
              v = _[2 * v + 1];
            r.faceUvs[n][y] = new THREE.UV(x, v);
          }
        if (g)
          for (n = 0; n < c; n++) {
            for (var _ = e.uvs[n], g = [], H = 0; H < R; H++)
              (x = _[2 * (v = a[f++])]),
                (v = _[2 * v + 1]),
                (g[H] = new THREE.UV(x, v));
            r.faceVertexUvs[n][y] = g;
          }
        if (
          ($ &&
            (($ = 3 * a[f++]),
            ((v = new THREE.Vector3()).x = u[$++]),
            (v.y = u[$++]),
            (v.z = u[$]),
            (m.normal = v)),
          d)
        )
          for (n = 0; n < R; n++)
            ($ = 3 * a[f++]),
              ((v = new THREE.Vector3()).x = u[$++]),
              (v.y = u[$++]),
              (v.z = u[$]),
              m.vertexNormals.push(v);
        if ((T && ((d = a[f++]), (m.color = new THREE.Color(h[d]))), E))
          for (n = 0; n < R; n++)
            (d = a[f++]), m.vertexColors.push(new THREE.Color(h[d]));
        r.faces.push(m);
      }
      if (e.skinWeights)
        for (n = 0, a = e.skinWeights.length; n < a; n += 2)
          r.skinWeights.push(
            new THREE.Vector4(e.skinWeights[n], e.skinWeights[n + 1], 0, 0)
          );
      if (e.skinIndices)
        for (n = 0, a = e.skinIndices.length; n < a; n += 2)
          (u = 0),
            r.skinIndices.push(
              new THREE.Vector4(e.skinIndices[n], e.skinIndices[n + 1], u, 0)
            );
      if (((r.bones = e.bones), (r.animation = e.animation), e.morphTargets))
        for (n = 0, a = e.morphTargets.length; n < a; n++)
          for (
            r.morphTargets[n] = {},
              r.morphTargets[n].name = e.morphTargets[n].name,
              r.morphTargets[n].vertices = [],
              u = r.morphTargets[n].vertices,
              h = e.morphTargets[n].vertices,
              v = 0,
              c = h.length;
            v < c;
            v += 3
          )
            ((E = new THREE.Vector3()).x = h[v] * o),
              (E.y = h[v + 1] * o),
              (E.z = h[v + 2] * o),
              u.push(E);
      if (e.morphColors)
        for (n = 0, a = e.morphColors.length; n < a; n++)
          for (
            r.morphColors[n] = {},
              r.morphColors[n].name = e.morphColors[n].name,
              r.morphColors[n].colors = [],
              o = r.morphColors[n].colors,
              h = e.morphColors[n].colors,
              u = 0,
              c = h.length;
            u < c;
            u += 3
          )
            (f = new THREE.Color(16755200)).setRGB(h[u], h[u + 1], h[u + 2]),
              o.push(f);
      return r.computeCentroids(), r.computeFaceNormals(), r;
    },
  }),
  (THREE.SceneLoader = function () {
    (this.onLoadStart = function () {}),
      (this.onLoadProgress = function () {}),
      (this.onLoadComplete = function () {}),
      (this.callbackSync = function () {}),
      (this.callbackProgress = function () {});
  }),
  (THREE.SceneLoader.prototype.constructor = THREE.SceneLoader),
  (THREE.SceneLoader.prototype.load = function (e, t) {
    var i = this,
      r = new XMLHttpRequest();
    (r.onreadystatechange = function () {
      if (4 === r.readyState) {
        if (200 === r.status || 0 === r.status) {
          var o = JSON.parse(r.responseText);
          i.createScene(o, t, e);
        } else
          console.error(
            "THREE.SceneLoader: Couldn't load [" + e + "] [" + r.status + "]"
          );
      }
    }),
      r.open("GET", e, !0),
      r.overrideMimeType &&
        r.overrideMimeType("text/plain; charset=x-user-defined"),
      r.setRequestHeader("Content-Type", "text/plain"),
      r.send(null);
  }),
  (THREE.SceneLoader.prototype.createScene = function (e, t, i) {
    function r(e, t) {
      return "relativeToHTML" == t ? e : V + "/" + e;
    }
    function o() {
      var e;
      for (c in C.objects)
        !F.objects[c] &&
          (void 0 !== (E = C.objects[c]).geometry
            ? (H = F.geometries[E.geometry]) &&
              ((e = !1),
              (e =
                (b = F.materials[E.materials[0]]) instanceof
                THREE.ShaderMaterial) && H.computeTangents(),
              ($ = E.position),
              (T = E.rotation),
              (R = E.quaternion),
              (y = E.scale),
              (m = E.matrix),
              (R = 0),
              0 == E.materials.length && (b = new THREE.MeshFaceMaterial()),
              E.materials.length > 1 && (b = new THREE.MeshFaceMaterial()),
              ((e = new THREE.Mesh(H, b)).name = c),
              m
                ? ((e.matrixAutoUpdate = !1),
                  e.matrix.set(
                    m[0],
                    m[1],
                    m[2],
                    m[3],
                    m[4],
                    m[5],
                    m[6],
                    m[7],
                    m[8],
                    m[9],
                    m[10],
                    m[11],
                    m[12],
                    m[13],
                    m[14],
                    m[15]
                  ))
                : (e.position.set($[0], $[1], $[2]),
                  R
                    ? (e.quaternion.set(R[0], R[1], R[2], R[3]),
                      (e.useQuaternion = !0))
                    : e.rotation.set(T[0], T[1], T[2]),
                  e.scale.set(y[0], y[1], y[2])),
              (e.visible = E.visible),
              (e.doubleSided = E.doubleSided),
              (e.castShadow = E.castShadow),
              (e.receiveShadow = E.receiveShadow),
              F.scene.add(e),
              (F.objects[c] = e))
            : (($ = E.position),
              (T = E.rotation),
              (R = E.quaternion),
              (y = E.scale),
              (R = 0),
              ((e = new THREE.Object3D()).name = c),
              e.position.set($[0], $[1], $[2]),
              R
                ? (e.quaternion.set(R[0], R[1], R[2], R[3]),
                  (e.useQuaternion = !0))
                : e.rotation.set(T[0], T[1], T[2]),
              e.scale.set(y[0], y[1], y[2]),
              (e.visible = void 0 !== E.visible && E.visible),
              F.scene.add(e),
              (F.objects[c] = e),
              (F.empties[c] = e)));
    }
    function n(e) {
      return function (t) {
        (F.geometries[e] = t), o(), (A -= 1), D.onLoadComplete(), s();
      };
    }
    function a(e) {
      return function (t) {
        F.geometries[e] = t;
      };
    }
    function s() {
      D.callbackProgress(
        {
          totalModels: P,
          totalTextures: U,
          loadedModels: P - A,
          loadedTextures: U - L,
        },
        F
      ),
        D.onLoadProgress(),
        0 === A && 0 === L && t(F);
    }
    var l,
      h,
      c,
      f,
      u,
      p,
      d,
      E,
      m,
      v,
      g,
      $,
      T,
      R,
      y,
      _,
      x,
      H,
      b,
      w,
      S,
      C,
      M,
      A,
      L,
      P,
      U,
      F,
      D = this,
      V = THREE.Loader.prototype.extractUrlBase(i);
    for (u in ((C = e),
    (i = new THREE.BinaryLoader()),
    (M = new THREE.JSONLoader()),
    (L = A = 0),
    (F = {
      scene: new THREE.Scene(),
      geometries: {},
      materials: {},
      textures: {},
      objects: {},
      cameras: {},
      lights: {},
      fogs: {},
      empties: {},
    }),
    C.transform &&
      ((e = C.transform.position),
      (v = C.transform.rotation),
      (_ = C.transform.scale),
      e && F.scene.position.set(e[0], e[1], e[2]),
      v && F.scene.rotation.set(v[0], v[1], v[2]),
      _ && F.scene.scale.set(_[0], _[1], _[2]),
      (e || v || _) && (F.scene.updateMatrix(), F.scene.updateMatrixWorld())),
    (e = function (e) {
      return function () {
        (L -= e), s(), D.onLoadComplete();
      };
    }),
    C.cameras))
      "perspective" === (_ = C.cameras[u]).type
        ? (w = new THREE.PerspectiveCamera(_.fov, _.aspect, _.near, _.far))
        : "ortho" === _.type &&
          (w = new THREE.OrthographicCamera(
            _.left,
            _.right,
            _.top,
            _.bottom,
            _.near,
            _.far
          )),
        ($ = _.position),
        (v = _.target),
        (_ = _.up),
        w.position.set($[0], $[1], $[2]),
        (w.target = new THREE.Vector3(v[0], v[1], v[2])),
        _ && w.up.set(_[0], _[1], _[2]),
        (F.cameras[u] = w);
    for (f in C.lights)
      (u = void 0 !== (v = C.lights[f]).color ? v.color : 16777215),
        (w = void 0 !== v.intensity ? v.intensity : 1),
        "directional" === v.type
          ? (($ = v.direction),
            (g = new THREE.DirectionalLight(u, w)).position.set(
              $[0],
              $[1],
              $[2]
            ),
            g.position.normalize())
          : "point" === v.type
          ? (($ = v.position),
            (g = v.distance),
            (g = new THREE.PointLight(u, w, g)).position.set($[0], $[1], $[2]))
          : "ambient" === v.type && (g = new THREE.AmbientLight(u)),
        F.scene.add(g),
        (F.lights[f] = g);
    for (p in C.fogs)
      "linear" === (f = C.fogs[p]).type
        ? (S = new THREE.Fog(0, f.near, f.far))
        : "exp2" === f.type && (S = new THREE.FogExp2(0, f.density)),
        (_ = f.color),
        S.color.setRGB(_[0], _[1], _[2]),
        (F.fogs[p] = S);
    for (l in (F.cameras &&
      C.defaults.camera &&
      (F.currentCamera = F.cameras[C.defaults.camera]),
    F.fogs && C.defaults.fog && (F.scene.fog = F.fogs[C.defaults.fog]),
    (_ = C.defaults.bgcolor),
    (F.bgColor = new THREE.Color()),
    F.bgColor.setRGB(_[0], _[1], _[2]),
    (F.bgColorAlpha = C.defaults.bgalpha),
    C.geometries))
      ("bin_mesh" == (p = C.geometries[l]).type || "ascii_mesh" == p.type) &&
        ((A += 1), D.onLoadStart());
    for (l in ((P = A), C.geometries))
      "cube" === (p = C.geometries[l]).type
        ? ((H = new THREE.CubeGeometry(
            p.width,
            p.height,
            p.depth,
            p.segmentsWidth,
            p.segmentsHeight,
            p.segmentsDepth,
            null,
            p.flipped,
            p.sides
          )),
          (F.geometries[l] = H))
        : "plane" === p.type
        ? ((H = new THREE.PlaneGeometry(
            p.width,
            p.height,
            p.segmentsWidth,
            p.segmentsHeight
          )),
          (F.geometries[l] = H))
        : "sphere" === p.type
        ? ((H = new THREE.SphereGeometry(
            p.radius,
            p.segmentsWidth,
            p.segmentsHeight
          )),
          (F.geometries[l] = H))
        : "cylinder" === p.type
        ? ((H = new THREE.CylinderGeometry(
            p.topRad,
            p.botRad,
            p.height,
            p.radSegs,
            p.heightSegs
          )),
          (F.geometries[l] = H))
        : "torus" === p.type
        ? ((H = new THREE.TorusGeometry(
            p.radius,
            p.tube,
            p.segmentsR,
            p.segmentsT
          )),
          (F.geometries[l] = H))
        : "icosahedron" === p.type
        ? ((H = new THREE.IcosahedronGeometry(p.radius, p.subdivisions)),
          (F.geometries[l] = H))
        : "bin_mesh" === p.type
        ? i.load(r(p.url, C.urlBaseType), n(l))
        : "ascii_mesh" === p.type
        ? M.load(r(p.url, C.urlBaseType), n(l))
        : "embedded_mesh" === p.type &&
          (((p = C.embeds[p.id]).metadata = C.metadata),
          p && M.createModel(p, a(l), ""));
    for (d in C.textures)
      if ((l = C.textures[d]).url instanceof Array)
        for (L += l.url.length, p = 0; p < l.url.length; p++) D.onLoadStart();
      else (L += 1), D.onLoadStart();
    for (d in ((U = L), C.textures)) {
      if (
        (void 0 !== (l = C.textures[d]).mapping &&
          void 0 !== THREE[l.mapping] &&
          (l.mapping = new THREE[l.mapping]()),
        l.url instanceof Array)
      ) {
        for (i = 0, p = l.url.length, S = []; i < p; i++)
          S[i] = r(l.url[i], C.urlBaseType);
        p = THREE.ImageUtils.loadTextureCube(S, l.mapping, e(p));
      } else
        (p = THREE.ImageUtils.loadTexture(
          r(l.url, C.urlBaseType),
          l.mapping,
          e(1)
        )),
          void 0 !== THREE[l.minFilter] && (p.minFilter = THREE[l.minFilter]),
          void 0 !== THREE[l.magFilter] && (p.magFilter = THREE[l.magFilter]),
          l.repeat &&
            (p.repeat.set(l.repeat[0], l.repeat[1]),
            1 !== l.repeat[0] && (p.wrapS = THREE.RepeatWrapping),
            1 !== l.repeat[1] && (p.wrapT = THREE.RepeatWrapping)),
          l.offset && p.offset.set(l.offset[0], l.offset[1]),
          l.wrap &&
            (void 0 !==
              (S = {
                repeat: THREE.RepeatWrapping,
                mirror: THREE.MirroredRepeatWrapping,
              })[l.wrap[0]] && (p.wrapS = S[l.wrap[0]]),
            void 0 !== S[l.wrap[1]] && (p.wrapT = S[l.wrap[1]]));
      F.textures[d] = p;
    }
    for (h in C.materials) {
      for (x in (m = C.materials[h]).parameters)
        "envMap" === x || "map" === x || "lightMap" === x
          ? (m.parameters[x] = F.textures[m.parameters[x]])
          : "shading" === x
          ? (m.parameters[x] =
              "flat" == m.parameters[x]
                ? THREE.FlatShading
                : THREE.SmoothShading)
          : "blending" === x
          ? (m.parameters[x] =
              m.parameters[x] in THREE
                ? THREE[m.parameters[x]]
                : THREE.NormalBlending)
          : "combine" === x
          ? (m.parameters[x] =
              "MixOperation" == m.parameters[x]
                ? THREE.MixOperation
                : THREE.MultiplyOperation)
          : "vertexColors" === x &&
            ("face" == m.parameters[x]
              ? (m.parameters[x] = THREE.FaceColors)
              : m.parameters[x] && (m.parameters[x] = THREE.VertexColors));
      void 0 !== m.parameters.opacity &&
        m.parameters.opacity < 1 &&
        (m.parameters.transparent = !0),
        m.parameters.normalMap
          ? ((d = THREE.ShaderUtils.lib.normal),
            (e = THREE.UniformsUtils.clone(d.uniforms)),
            (l = m.parameters.color),
            (p = m.parameters.specular),
            (S = m.parameters.ambient),
            (i = m.parameters.shininess),
            (e.tNormal.texture = F.textures[m.parameters.normalMap]),
            m.parameters.normalMapFactor &&
              (e.uNormalScale.value = m.parameters.normalMapFactor),
            m.parameters.map &&
              ((e.tDiffuse.texture = m.parameters.map),
              (e.enableDiffuse.value = !0)),
            m.parameters.lightMap &&
              ((e.tAO.texture = m.parameters.lightMap),
              (e.enableAO.value = !0)),
            m.parameters.specularMap &&
              ((e.tSpecular.texture = F.textures[m.parameters.specularMap]),
              (e.enableSpecular.value = !0)),
            e.uDiffuseColor.value.setHex(l),
            e.uSpecularColor.value.setHex(p),
            e.uAmbientColor.value.setHex(S),
            (e.uShininess.value = i),
            m.parameters.opacity && (e.uOpacity.value = m.parameters.opacity),
            (b = new THREE.ShaderMaterial({
              fragmentShader: d.fragmentShader,
              vertexShader: d.vertexShader,
              uniforms: e,
              lights: !0,
              fog: !0,
            })))
          : (b = new THREE[m.type](m.parameters)),
        (F.materials[h] = b);
    }
    o(), D.callbackSync(F), s();
  }),
  (THREE.TextureLoader = function () {
    THREE.EventTarget.call(this), (this.crossOrigin = null);
  }),
  (THREE.TextureLoader.prototype = {
    constructor: THREE.TextureLoader,
    load: function (e) {
      var t = this,
        i = new Image();
      i.addEventListener(
        "load",
        function () {
          var e = new THREE.Texture(i);
          (e.needsUpdate = !0), t.dispatchEvent({ type: "load", content: e });
        },
        !1
      ),
        i.addEventListener(
          "error",
          function () {
            t.dispatchEvent({
              type: "error",
              message: "Couldn't load URL [" + e + "]",
            });
          },
          !1
        ),
        t.crossOrigin && (i.crossOrigin = t.crossOrigin),
        (i.src = e);
    },
  }),
  (THREE.Material = function (e) {
    (e = e || {}),
      (this.id = THREE.MaterialCount++),
      (this.name = ""),
      (this.opacity = void 0 !== e.opacity ? e.opacity : 1),
      (this.transparent = void 0 !== e.transparent && e.transparent),
      (this.blending =
        void 0 !== e.blending ? e.blending : THREE.NormalBlending),
      (this.blendSrc =
        void 0 !== e.blendSrc ? e.blendSrc : THREE.SrcAlphaFactor),
      (this.blendDst =
        void 0 !== e.blendDst ? e.blendDst : THREE.OneMinusSrcAlphaFactor),
      (this.blendEquation =
        void 0 !== e.blendEquation ? e.blendEquation : THREE.AddEquation),
      (this.depthTest = void 0 === e.depthTest || e.depthTest),
      (this.depthWrite = void 0 === e.depthWrite || e.depthWrite),
      (this.polygonOffset = void 0 !== e.polygonOffset && e.polygonOffset),
      (this.polygonOffsetFactor =
        void 0 !== e.polygonOffsetFactor ? e.polygonOffsetFactor : 0),
      (this.polygonOffsetUnits =
        void 0 !== e.polygonOffsetUnits ? e.polygonOffsetUnits : 0),
      (this.alphaTest = void 0 !== e.alphaTest ? e.alphaTest : 0),
      (this.overdraw = void 0 !== e.overdraw && e.overdraw),
      (this.needsUpdate = this.visible = !0);
  }),
  (THREE.MaterialCount = 0),
  (THREE.LineBasicMaterial = function (e) {
    THREE.Material.call(this, e),
      (e = e || {}),
      (this.color = new THREE.Color(void 0 !== e.color ? e.color : 16777215)),
      (this.linewidth = void 0 !== e.linewidth ? e.linewidth : 1),
      (this.linecap = void 0 !== e.linecap ? e.linecap : "round"),
      (this.linejoin = void 0 !== e.linejoin ? e.linejoin : "round"),
      (this.vertexColors = !!e.vertexColors && e.vertexColors),
      (this.fog = void 0 === e.fog || e.fog);
  }),
  (THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype)),
  (THREE.MeshBasicMaterial = function (e) {
    THREE.Material.call(this, e),
      (e = e || {}),
      (this.color = new THREE.Color(void 0 !== e.color ? e.color : 16777215)),
      (this.map = void 0 !== e.map ? e.map : null),
      (this.lightMap = void 0 !== e.lightMap ? e.lightMap : null),
      (this.envMap = void 0 !== e.envMap ? e.envMap : null),
      (this.combine =
        void 0 !== e.combine ? e.combine : THREE.MultiplyOperation),
      (this.reflectivity = void 0 !== e.reflectivity ? e.reflectivity : 1),
      (this.refractionRatio =
        void 0 !== e.refractionRatio ? e.refractionRatio : 0.98),
      (this.fog = void 0 === e.fog || e.fog),
      (this.shading = void 0 !== e.shading ? e.shading : THREE.SmoothShading),
      (this.wireframe = void 0 !== e.wireframe && e.wireframe),
      (this.wireframeLinewidth =
        void 0 !== e.wireframeLinewidth ? e.wireframeLinewidth : 1),
      (this.wireframeLinecap =
        void 0 !== e.wireframeLinecap ? e.wireframeLinecap : "round"),
      (this.wireframeLinejoin =
        void 0 !== e.wireframeLinejoin ? e.wireframeLinejoin : "round"),
      (this.vertexColors =
        void 0 !== e.vertexColors ? e.vertexColors : THREE.NoColors),
      (this.skinning = void 0 !== e.skinning && e.skinning),
      (this.morphTargets = void 0 !== e.morphTargets && e.morphTargets);
  }),
  (THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype)),
  (THREE.MeshLambertMaterial = function (e) {
    THREE.Material.call(this, e),
      (e = e || {}),
      (this.color = new THREE.Color(void 0 !== e.color ? e.color : 16777215)),
      (this.ambient = new THREE.Color(
        void 0 !== e.ambient ? e.ambient : 16777215
      )),
      (this.emissive = new THREE.Color(void 0 !== e.emissive ? e.emissive : 0)),
      (this.wrapAround = void 0 !== e.wrapAround && e.wrapAround),
      (this.wrapRGB = new THREE.Vector3(1, 1, 1)),
      (this.map = void 0 !== e.map ? e.map : null),
      (this.lightMap = void 0 !== e.lightMap ? e.lightMap : null),
      (this.envMap = void 0 !== e.envMap ? e.envMap : null),
      (this.combine =
        void 0 !== e.combine ? e.combine : THREE.MultiplyOperation),
      (this.reflectivity = void 0 !== e.reflectivity ? e.reflectivity : 1),
      (this.refractionRatio =
        void 0 !== e.refractionRatio ? e.refractionRatio : 0.98),
      (this.fog = void 0 === e.fog || e.fog),
      (this.shading = void 0 !== e.shading ? e.shading : THREE.SmoothShading),
      (this.wireframe = void 0 !== e.wireframe && e.wireframe),
      (this.wireframeLinewidth =
        void 0 !== e.wireframeLinewidth ? e.wireframeLinewidth : 1),
      (this.wireframeLinecap =
        void 0 !== e.wireframeLinecap ? e.wireframeLinecap : "round"),
      (this.wireframeLinejoin =
        void 0 !== e.wireframeLinejoin ? e.wireframeLinejoin : "round"),
      (this.vertexColors =
        void 0 !== e.vertexColors ? e.vertexColors : THREE.NoColors),
      (this.skinning = void 0 !== e.skinning && e.skinning),
      (this.morphTargets = void 0 !== e.morphTargets && e.morphTargets),
      (this.morphNormals = void 0 !== e.morphNormals && e.morphNormals);
  }),
  (THREE.MeshLambertMaterial.prototype = Object.create(
    THREE.Material.prototype
  )),
  (THREE.MeshPhongMaterial = function (e) {
    THREE.Material.call(this, e),
      (e = e || {}),
      (this.color = new THREE.Color(void 0 !== e.color ? e.color : 16777215)),
      (this.ambient = new THREE.Color(
        void 0 !== e.ambient ? e.ambient : 16777215
      )),
      (this.emissive = new THREE.Color(void 0 !== e.emissive ? e.emissive : 0)),
      (this.specular = new THREE.Color(
        void 0 !== e.specular ? e.specular : 1118481
      )),
      (this.shininess = void 0 !== e.shininess ? e.shininess : 30),
      (this.metal = void 0 !== e.metal && e.metal),
      (this.perPixel = void 0 !== e.perPixel && e.perPixel),
      (this.wrapAround = void 0 !== e.wrapAround && e.wrapAround),
      (this.wrapRGB = new THREE.Vector3(1, 1, 1)),
      (this.map = void 0 !== e.map ? e.map : null),
      (this.lightMap = void 0 !== e.lightMap ? e.lightMap : null),
      (this.envMap = void 0 !== e.envMap ? e.envMap : null),
      (this.combine =
        void 0 !== e.combine ? e.combine : THREE.MultiplyOperation),
      (this.reflectivity = void 0 !== e.reflectivity ? e.reflectivity : 1),
      (this.refractionRatio =
        void 0 !== e.refractionRatio ? e.refractionRatio : 0.98),
      (this.fog = void 0 === e.fog || e.fog),
      (this.shading = void 0 !== e.shading ? e.shading : THREE.SmoothShading),
      (this.wireframe = void 0 !== e.wireframe && e.wireframe),
      (this.wireframeLinewidth =
        void 0 !== e.wireframeLinewidth ? e.wireframeLinewidth : 1),
      (this.wireframeLinecap =
        void 0 !== e.wireframeLinecap ? e.wireframeLinecap : "round"),
      (this.wireframeLinejoin =
        void 0 !== e.wireframeLinejoin ? e.wireframeLinejoin : "round"),
      (this.vertexColors =
        void 0 !== e.vertexColors ? e.vertexColors : THREE.NoColors),
      (this.skinning = void 0 !== e.skinning && e.skinning),
      (this.morphTargets = void 0 !== e.morphTargets && e.morphTargets),
      (this.morphNormals = void 0 !== e.morphNormals && e.morphNormals);
  }),
  (THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype)),
  (THREE.MeshDepthMaterial = function (e) {
    THREE.Material.call(this, e),
      (e = e || {}),
      (this.shading = void 0 !== e.shading ? e.shading : THREE.SmoothShading),
      (this.wireframe = void 0 !== e.wireframe && e.wireframe),
      (this.wireframeLinewidth =
        void 0 !== e.wireframeLinewidth ? e.wireframeLinewidth : 1);
  }),
  (THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype)),
  (THREE.MeshNormalMaterial = function (e) {
    THREE.Material.call(this, e),
      (e = e || {}),
      (this.shading = e.shading ? e.shading : THREE.FlatShading),
      (this.wireframe = !!e.wireframe && e.wireframe),
      (this.wireframeLinewidth = e.wireframeLinewidth
        ? e.wireframeLinewidth
        : 1);
  }),
  (THREE.MeshNormalMaterial.prototype = Object.create(
    THREE.Material.prototype
  )),
  (THREE.MeshFaceMaterial = function () {}),
  (THREE.ParticleBasicMaterial = function (e) {
    THREE.Material.call(this, e),
      (e = e || {}),
      (this.color = new THREE.Color(void 0 !== e.color ? e.color : 16777215)),
      (this.map = void 0 !== e.map ? e.map : null),
      (this.size = void 0 !== e.size ? e.size : 1),
      (this.sizeAttenuation =
        void 0 === e.sizeAttenuation || e.sizeAttenuation),
      (this.vertexColors = void 0 !== e.vertexColors && e.vertexColors),
      (this.fog = void 0 === e.fog || e.fog);
  }),
  (THREE.ParticleBasicMaterial.prototype = Object.create(
    THREE.Material.prototype
  )),
  (THREE.ParticleCanvasMaterial = function (e) {
    THREE.Material.call(this, e),
      (e = e || {}),
      (this.color = new THREE.Color(void 0 !== e.color ? e.color : 16777215)),
      (this.program = void 0 !== e.program ? e.program : function () {});
  }),
  (THREE.ParticleCanvasMaterial.prototype = Object.create(
    THREE.Material.prototype
  )),
  (THREE.ParticleDOMMaterial = function (e) {
    THREE.Material.call(this), (this.domElement = e);
  }),
  (THREE.ShaderMaterial = function (e) {
    THREE.Material.call(this, e),
      (e = e || {}),
      (this.fragmentShader =
        void 0 !== e.fragmentShader ? e.fragmentShader : "void main() {}"),
      (this.vertexShader =
        void 0 !== e.vertexShader ? e.vertexShader : "void main() {}"),
      (this.uniforms = void 0 !== e.uniforms ? e.uniforms : {}),
      (this.attributes = e.attributes),
      (this.shading = void 0 !== e.shading ? e.shading : THREE.SmoothShading),
      (this.wireframe = void 0 !== e.wireframe && e.wireframe),
      (this.wireframeLinewidth =
        void 0 !== e.wireframeLinewidth ? e.wireframeLinewidth : 1),
      (this.fog = void 0 !== e.fog && e.fog),
      (this.lights = void 0 !== e.lights && e.lights),
      (this.vertexColors =
        void 0 !== e.vertexColors ? e.vertexColors : THREE.NoColors),
      (this.skinning = void 0 !== e.skinning && e.skinning),
      (this.morphTargets = void 0 !== e.morphTargets && e.morphTargets),
      (this.morphNormals = void 0 !== e.morphNormals && e.morphNormals);
  }),
  (THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype)),
  (THREE.Texture = function (e, t, i, r, o, n, a, s, l) {
    (this.id = THREE.TextureCount++),
      (this.image = e),
      (this.mapping = void 0 !== t ? t : new THREE.UVMapping()),
      (this.wrapS = void 0 !== i ? i : THREE.ClampToEdgeWrapping),
      (this.wrapT = void 0 !== r ? r : THREE.ClampToEdgeWrapping),
      (this.magFilter = void 0 !== o ? o : THREE.LinearFilter),
      (this.minFilter = void 0 !== n ? n : THREE.LinearMipMapLinearFilter),
      (this.anisotropy = void 0 !== l ? l : 1),
      (this.format = void 0 !== a ? a : THREE.RGBAFormat),
      (this.type = void 0 !== s ? s : THREE.UnsignedByteType),
      (this.offset = new THREE.Vector2(0, 0)),
      (this.repeat = new THREE.Vector2(1, 1)),
      (this.generateMipmaps = !0),
      (this.premultiplyAlpha = !1),
      (this.flipY = !0),
      (this.needsUpdate = !1),
      (this.onUpdate = null);
  }),
  (THREE.Texture.prototype = {
    constructor: THREE.Texture,
    clone: function () {
      var e = new THREE.Texture(
        this.image,
        this.mapping,
        this.wrapS,
        this.wrapT,
        this.magFilter,
        this.minFilter,
        this.format,
        this.type,
        this.anisotropy
      );
      return (
        e.offset.copy(this.offset),
        e.repeat.copy(this.repeat),
        (e.generateMipmaps = this.generateMipmaps),
        (e.premultiplyAlpha = this.premultiplyAlpha),
        (e.flipY = this.flipY),
        e
      );
    },
  }),
  (THREE.TextureCount = 0),
  (THREE.DataTexture = function (e, t, i, r, o, n, a, s, l, h) {
    THREE.Texture.call(this, null, n, a, s, l, h, r, o),
      (this.image = { data: e, width: t, height: i });
  }),
  (THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype)),
  (THREE.DataTexture.prototype.clone = function () {
    var e = new THREE.DataTexture(
      this.image.data,
      this.image.width,
      this.image.height,
      this.format,
      this.type,
      this.mapping,
      this.wrapS,
      this.wrapT,
      this.magFilter,
      this.minFilter
    );
    return e.offset.copy(this.offset), e.repeat.copy(this.repeat), e;
  }),
  (THREE.Particle = function (e) {
    THREE.Object3D.call(this), (this.material = e);
  }),
  (THREE.Particle.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.ParticleSystem = function (e, t) {
    THREE.Object3D.call(this),
      (this.geometry = e),
      (this.material =
        void 0 !== t
          ? t
          : new THREE.ParticleBasicMaterial({
              color: 16777215 * Math.random(),
            })),
      (this.sortParticles = !1),
      this.geometry &&
        (this.geometry.boundingSphere || this.geometry.computeBoundingSphere(),
        (this.boundRadius = e.boundingSphere.radius)),
      (this.frustumCulled = !1);
  }),
  (THREE.ParticleSystem.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.Line = function (e, t, i) {
    THREE.Object3D.call(this),
      (this.geometry = e),
      (this.material =
        void 0 !== t
          ? t
          : new THREE.LineBasicMaterial({ color: 16777215 * Math.random() })),
      (this.type = void 0 !== i ? i : THREE.LineStrip),
      this.geometry &&
        (this.geometry.boundingSphere || this.geometry.computeBoundingSphere());
  }),
  (THREE.LineStrip = 0),
  (THREE.LinePieces = 1),
  (THREE.Line.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.Mesh = function (e, t) {
    if (
      (THREE.Object3D.call(this),
      (this.geometry = e),
      (this.material =
        void 0 !== t
          ? t
          : new THREE.MeshBasicMaterial({
              color: 16777215 * Math.random(),
              wireframe: !0,
            })),
      this.geometry &&
        (this.geometry.boundingSphere || this.geometry.computeBoundingSphere(),
        (this.boundRadius = e.boundingSphere.radius),
        this.geometry.morphTargets.length))
    ) {
      (this.morphTargetBase = -1),
        (this.morphTargetForcedOrder = []),
        (this.morphTargetInfluences = []),
        (this.morphTargetDictionary = {});
      for (var i = 0; i < this.geometry.morphTargets.length; i++)
        this.morphTargetInfluences.push(0),
          (this.morphTargetDictionary[this.geometry.morphTargets[i].name] = i);
    }
  }),
  (THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.Mesh.prototype.getMorphTargetIndexByName = function (e) {
    return void 0 !== this.morphTargetDictionary[e]
      ? this.morphTargetDictionary[e]
      : (console.log(
          "THREE.Mesh.getMorphTargetIndexByName: morph target " +
            e +
            " does not exist. Returning 0."
        ),
        0);
  }),
  (THREE.Bone = function (e) {
    THREE.Object3D.call(this),
      (this.skin = e),
      (this.skinMatrix = new THREE.Matrix4());
  }),
  (THREE.Bone.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.Bone.prototype.update = function (e, t) {
    this.matrixAutoUpdate && (t |= this.updateMatrix()),
      (t || this.matrixWorldNeedsUpdate) &&
        (e
          ? this.skinMatrix.multiply(e, this.matrix)
          : this.skinMatrix.copy(this.matrix),
        (this.matrixWorldNeedsUpdate = !1),
        (t = !0));
    var i,
      r = this.children.length;
    for (i = 0; i < r; i++) this.children[i].update(this.skinMatrix, t);
  }),
  (THREE.SkinnedMesh = function (e, t, i) {
    var r, o, n;
    if (
      (THREE.Mesh.call(this, e, t),
      (this.useVertexTexture = void 0 === i || i),
      (this.identityMatrix = new THREE.Matrix4()),
      (this.bones = []),
      (this.boneMatrices = []),
      void 0 !== this.geometry.bones)
    ) {
      for (e = 0; e < this.geometry.bones.length; e++)
        (r = (i = this.geometry.bones[e]).pos),
          (o = i.rotq),
          (n = i.scl),
          ((t = this.addBone()).name = i.name),
          t.position.set(r[0], r[1], r[2]),
          t.quaternion.set(o[0], o[1], o[2], o[3]),
          (t.useQuaternion = !0),
          void 0 !== n ? t.scale.set(n[0], n[1], n[2]) : t.scale.set(1, 1, 1);
      for (e = 0; e < this.bones.length; e++)
        (i = this.geometry.bones[e]),
          (t = this.bones[e]),
          -1 === i.parent ? this.add(t) : this.bones[i.parent].add(t);
      (e = this.bones.length),
        this.useVertexTexture
          ? ((this.boneTextureHeight =
              this.boneTextureWidth =
              e =
                e > 256 ? 64 : e > 64 ? 32 : e > 16 ? 16 : 8),
            (this.boneMatrices = new Float32Array(
              this.boneTextureWidth * this.boneTextureHeight * 4
            )),
            (this.boneTexture = new THREE.DataTexture(
              this.boneMatrices,
              this.boneTextureWidth,
              this.boneTextureHeight,
              THREE.RGBAFormat,
              THREE.FloatType
            )),
            (this.boneTexture.minFilter = THREE.NearestFilter),
            (this.boneTexture.magFilter = THREE.NearestFilter),
            (this.boneTexture.generateMipmaps = !1),
            (this.boneTexture.flipY = !1))
          : (this.boneMatrices = new Float32Array(16 * e)),
        this.pose();
    }
  }),
  (THREE.SkinnedMesh.prototype = Object.create(THREE.Mesh.prototype)),
  (THREE.SkinnedMesh.prototype.addBone = function (e) {
    return void 0 === e && (e = new THREE.Bone(this)), this.bones.push(e), e;
  }),
  (THREE.SkinnedMesh.prototype.updateMatrixWorld = function (e) {
    this.matrixAutoUpdate && this.updateMatrix(),
      (this.matrixWorldNeedsUpdate || e) &&
        (this.parent
          ? this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix)
          : this.matrixWorld.copy(this.matrix),
        (this.matrixWorldNeedsUpdate = !1));
    for (var e = 0, t = this.children.length; e < t; e++) {
      var i = this.children[e];
      i instanceof THREE.Bone
        ? i.update(this.identityMatrix, !1)
        : i.updateMatrixWorld(!0);
    }
    for (
      var t = this.bones.length, i = this.bones, r = this.boneMatrices, e = 0;
      e < t;
      e++
    )
      i[e].skinMatrix.flattenToArrayOffset(r, 16 * e);
    this.useVertexTexture && (this.boneTexture.needsUpdate = !0);
  }),
  (THREE.SkinnedMesh.prototype.pose = function () {
    this.updateMatrixWorld(!0);
    for (var e, t = [], i = 0; i < this.bones.length; i++) {
      e = this.bones[i];
      var r = new THREE.Matrix4();
      r.getInverse(e.skinMatrix),
        t.push(r),
        e.skinMatrix.flattenToArrayOffset(this.boneMatrices, 16 * i);
    }
    if (void 0 === this.geometry.skinVerticesA)
      for (
        e = 0,
          this.geometry.skinVerticesA = [],
          this.geometry.skinVerticesB = [];
        e < this.geometry.skinIndices.length;
        e++
      ) {
        var i = this.geometry.vertices[e],
          o = this.geometry.skinIndices[e].x,
          n = this.geometry.skinIndices[e].y,
          r = new THREE.Vector3(i.x, i.y, i.z);
        this.geometry.skinVerticesA.push(t[o].multiplyVector3(r)),
          (r = new THREE.Vector3(i.x, i.y, i.z)),
          this.geometry.skinVerticesB.push(t[n].multiplyVector3(r)),
          this.geometry.skinWeights[e].x + this.geometry.skinWeights[e].y !==
            1 &&
            ((i =
              (1 -
                (this.geometry.skinWeights[e].x +
                  this.geometry.skinWeights[e].y)) *
              0.5),
            (this.geometry.skinWeights[e].x =
              this.geometry.skinWeights[e].x + i),
            (this.geometry.skinWeights[e].y =
              this.geometry.skinWeights[e].y + i));
      }
  }),
  (THREE.MorphAnimMesh = function (e, t) {
    THREE.Mesh.call(this, e, t),
      (this.duration = 1e3),
      (this.mirroredLoop = !1),
      (this.currentKeyframe = this.lastKeyframe = this.time = 0),
      (this.direction = 1),
      (this.directionBackwards = !1),
      this.setFrameRange(0, this.geometry.morphTargets.length - 1);
  }),
  (THREE.MorphAnimMesh.prototype = Object.create(THREE.Mesh.prototype)),
  (THREE.MorphAnimMesh.prototype.setFrameRange = function (e, t) {
    (this.startKeyframe = e),
      (this.endKeyframe = t),
      (this.length = this.endKeyframe - this.startKeyframe + 1);
  }),
  (THREE.MorphAnimMesh.prototype.setDirectionForward = function () {
    (this.direction = 1), (this.directionBackwards = !1);
  }),
  (THREE.MorphAnimMesh.prototype.setDirectionBackward = function () {
    (this.direction = -1), (this.directionBackwards = !0);
  }),
  (THREE.MorphAnimMesh.prototype.parseAnimations = function () {
    var e = this.geometry;
    e.animations || (e.animations = {});
    for (
      var t,
        i = e.animations,
        r = /([a-z]+)(\d+)/,
        o = 0,
        n = e.morphTargets.length;
      o < n;
      o++
    ) {
      var a = e.morphTargets[o].name.match(r);
      if (a && a.length > 1) {
        i[(a = a[1])] || (i[a] = { start: 1 / 0, end: -1 / 0 });
        var s = i[a];
        o < s.start && (s.start = o), o > s.end && (s.end = o), t || (t = a);
      }
    }
    e.firstAnimation = t;
  }),
  (THREE.MorphAnimMesh.prototype.setAnimationLabel = function (e, t, i) {
    this.geometry.animations || (this.geometry.animations = {}),
      (this.geometry.animations[e] = { start: t, end: i });
  }),
  (THREE.MorphAnimMesh.prototype.playAnimation = function (e, t) {
    var i = this.geometry.animations[e];
    i
      ? (this.setFrameRange(i.start, i.end),
        (this.duration = 1e3 * ((i.end - i.start) / t)),
        (this.time = 0))
      : console.warn("animation[" + e + "] undefined");
  }),
  (THREE.MorphAnimMesh.prototype.updateAnimation = function (e) {
    var t = this.duration / this.length;
    (this.time = this.time + this.direction * e),
      this.mirroredLoop
        ? (this.time > this.duration || this.time < 0) &&
          ((this.direction = -1 * this.direction),
          this.time > this.duration &&
            ((this.time = this.duration), (this.directionBackwards = !0)),
          this.time < 0 && ((this.time = 0), (this.directionBackwards = !1)))
        : ((this.time = this.time % this.duration),
          this.time < 0 && (this.time = this.time + this.duration)),
      (e =
        this.startKeyframe +
        THREE.Math.clamp(Math.floor(this.time / t), 0, this.length - 1)) !==
        this.currentKeyframe &&
        ((this.morphTargetInfluences[this.lastKeyframe] = 0),
        (this.morphTargetInfluences[this.currentKeyframe] = 1),
        (this.morphTargetInfluences[e] = 0),
        (this.lastKeyframe = this.currentKeyframe),
        (this.currentKeyframe = e)),
      (t = (this.time % t) / t),
      this.directionBackwards && (t = 1 - t),
      (this.morphTargetInfluences[this.currentKeyframe] = t),
      (this.morphTargetInfluences[this.lastKeyframe] = 1 - t);
  }),
  (THREE.Ribbon = function (e, t) {
    THREE.Object3D.call(this), (this.geometry = e), (this.material = t);
  }),
  (THREE.Ribbon.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.LOD = function () {
    THREE.Object3D.call(this), (this.LODs = []);
  }),
  (THREE.LOD.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.LOD.prototype.addLevel = function (e, t) {
    void 0 === t && (t = 0);
    for (
      var t = Math.abs(t), i = 0;
      i < this.LODs.length && !(t < this.LODs[i].visibleAtDistance);
      i++
    );
    this.LODs.splice(i, 0, { visibleAtDistance: t, object3D: e }), this.add(e);
  }),
  (THREE.LOD.prototype.update = function (e) {
    if (this.LODs.length > 1) {
      e.matrixWorldInverse.getInverse(e.matrixWorld),
        (e = -(
          (e = e.matrixWorldInverse).elements[2] *
            this.matrixWorld.elements[12] +
          e.elements[6] * this.matrixWorld.elements[13] +
          e.elements[10] * this.matrixWorld.elements[14] +
          e.elements[14]
        )),
        (this.LODs[0].object3D.visible = !0);
      for (var t = 1; t < this.LODs.length; t++)
        if (e >= this.LODs[t].visibleAtDistance)
          (this.LODs[t - 1].object3D.visible = !1),
            (this.LODs[t].object3D.visible = !0);
        else break;
      for (; t < this.LODs.length; t++) this.LODs[t].object3D.visible = !1;
    }
  }),
  (THREE.Sprite = function (e) {
    THREE.Object3D.call(this),
      (this.color = new THREE.Color(void 0 !== e.color ? e.color : 16777215)),
      (this.map = void 0 !== e.map ? e.map : new THREE.Texture()),
      (this.blending =
        void 0 !== e.blending ? e.blending : THREE.NormalBlending),
      (this.blendSrc =
        void 0 !== e.blendSrc ? e.blendSrc : THREE.SrcAlphaFactor),
      (this.blendDst =
        void 0 !== e.blendDst ? e.blendDst : THREE.OneMinusSrcAlphaFactor),
      (this.blendEquation =
        void 0 !== e.blendEquation ? e.blendEquation : THREE.AddEquation),
      (this.useScreenCoordinates =
        void 0 === e.useScreenCoordinates || e.useScreenCoordinates),
      (this.mergeWith3D =
        void 0 !== e.mergeWith3D ? e.mergeWith3D : !this.useScreenCoordinates),
      (this.affectedByDistance =
        void 0 !== e.affectedByDistance
          ? e.affectedByDistance
          : !this.useScreenCoordinates),
      (this.scaleByViewport =
        void 0 !== e.scaleByViewport
          ? e.scaleByViewport
          : !this.affectedByDistance),
      (this.alignment =
        e.alignment instanceof THREE.Vector2
          ? e.alignment
          : THREE.SpriteAlignment.center),
      (this.rotation3d = this.rotation),
      (this.rotation = 0),
      (this.opacity = 1),
      (this.uvOffset = new THREE.Vector2(0, 0)),
      (this.uvScale = new THREE.Vector2(1, 1));
  }),
  (THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.Sprite.prototype.updateMatrix = function () {
    this.matrix.setPosition(this.position),
      this.rotation3d.set(0, 0, this.rotation),
      this.matrix.setRotationFromEuler(this.rotation3d),
      (1 !== this.scale.x || 1 !== this.scale.y) &&
        (this.matrix.scale(this.scale),
        (this.boundRadiusScale = Math.max(this.scale.x, this.scale.y))),
      (this.matrixWorldNeedsUpdate = !0);
  }),
  (THREE.SpriteAlignment = {}),
  (THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1)),
  (THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1)),
  (THREE.SpriteAlignment.topRight = new THREE.Vector2(-1, -1)),
  (THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0)),
  (THREE.SpriteAlignment.center = new THREE.Vector2(0, 0)),
  (THREE.SpriteAlignment.centerRight = new THREE.Vector2(-1, 0)),
  (THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1)),
  (THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1)),
  (THREE.SpriteAlignment.bottomRight = new THREE.Vector2(-1, 1)),
  (THREE.Scene = function () {
    THREE.Object3D.call(this),
      (this.overrideMaterial = this.fog = null),
      (this.matrixAutoUpdate = !1),
      (this.__objects = []),
      (this.__lights = []),
      (this.__objectsAdded = []),
      (this.__objectsRemoved = []);
  }),
  (THREE.Scene.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.Scene.prototype.__addObject = function (e) {
    if (e instanceof THREE.Light)
      -1 === this.__lights.indexOf(e) && this.__lights.push(e),
        e.target && void 0 === e.target.parent && this.add(e.target);
    else if (
      !(e instanceof THREE.Camera || e instanceof THREE.Bone) &&
      -1 === this.__objects.indexOf(e)
    ) {
      this.__objects.push(e), this.__objectsAdded.push(e);
      var t = this.__objectsRemoved.indexOf(e);
      -1 !== t && this.__objectsRemoved.splice(t, 1);
    }
    for (t = 0; t < e.children.length; t++) this.__addObject(e.children[t]);
  }),
  (THREE.Scene.prototype.__removeObject = function (e) {
    if (e instanceof THREE.Light) {
      var t = this.__lights.indexOf(e);
      -1 !== t && this.__lights.splice(t, 1);
    } else
      e instanceof THREE.Camera ||
        -1 === (t = this.__objects.indexOf(e)) ||
        (this.__objects.splice(t, 1),
        this.__objectsRemoved.push(e),
        -1 !== (t = this.__objectsAdded.indexOf(e)) &&
          this.__objectsAdded.splice(t, 1));
    for (t = 0; t < e.children.length; t++) this.__removeObject(e.children[t]);
  }),
  (THREE.Fog = function (e, t, i) {
    (this.color = new THREE.Color(e)),
      (this.near = void 0 !== t ? t : 1),
      (this.far = void 0 !== i ? i : 1e3);
  }),
  (THREE.FogExp2 = function (e, t) {
    (this.color = new THREE.Color(e)),
      (this.density = void 0 !== t ? t : 25e-5);
  }),
  (THREE.CanvasRenderer = function (e) {
    function t(e) {
      K !== e && (K = X.globalAlpha = e);
    }
    function i(e) {
      Z !== e &&
        (e === THREE.NormalBlending
          ? (X.globalCompositeOperation = "source-over")
          : e === THREE.AdditiveBlending
          ? (X.globalCompositeOperation = "lighter")
          : e === THREE.SubtractiveBlending &&
            (X.globalCompositeOperation = "darker"),
        (Z = e));
    }
    function r(e) {
      Q !== e && (Q = X.strokeStyle = e);
    }
    function o(e) {
      J !== e && (J = X.fillStyle = e);
    }
    console.log("THREE.CanvasRenderer", THREE.REVISION);
    var n,
      a,
      s,
      l,
      h,
      c,
      f,
      u,
      p,
      d,
      E,
      m,
      v,
      g,
      $,
      T,
      R,
      y,
      _,
      x,
      H,
      b,
      w,
      S,
      C,
      M,
      A,
      L,
      P,
      U,
      F,
      D,
      V,
      z,
      B,
      N,
      O,
      I,
      k,
      e = e || {},
      W = this,
      G = new THREE.Projector(),
      j = void 0 !== e.canvas ? e.canvas : document.createElement("canvas"),
      X = j.getContext("2d"),
      Y = new THREE.Color(0),
      q = 0,
      K = 1,
      Z = 0,
      Q = null,
      J = null,
      ee = null,
      et = null,
      ei = null,
      er = new THREE.RenderableVertex(),
      eo = new THREE.RenderableVertex(),
      en = new THREE.Color(),
      ea = new THREE.Color(),
      es = new THREE.Color(),
      el = new THREE.Color(),
      eh = new THREE.Color(),
      ec = [],
      ef = [],
      eu = new THREE.Rectangle(),
      ep = new THREE.Rectangle(),
      ed = new THREE.Rectangle(),
      eE = !1,
      em = new THREE.Color(),
      ev = new THREE.Color(),
      eg = new THREE.Color(),
      e$ = new THREE.Vector3(),
      e = 16;
    ((z = document.createElement("canvas")).width = z.height = 2),
      ((B = z.getContext("2d")).fillStyle = "rgba(0,0,0,1)"),
      B.fillRect(0, 0, 2, 2),
      (O = (N = B.getImageData(0, 0, 2, 2)).data),
      ((I = document.createElement("canvas")).width = I.height = e),
      (k = I.getContext("2d")).translate(-e / 2, -e / 2),
      k.scale(e, e),
      e--,
      (this.domElement = j),
      (this.sortElements = this.sortObjects = this.autoClear = !0),
      (this.info = { render: { vertices: 0, faces: 0 } }),
      (this.setSize = function (e, t) {
        (l = e),
          (h = t),
          (c = Math.floor(l / 2)),
          (f = Math.floor(h / 2)),
          (j.width = l),
          (j.height = h),
          eu.set(-c, -f, c, f),
          ep.set(-c, -f, c, f),
          (K = 1),
          (Z = 0),
          (ei = et = ee = J = Q = null);
      }),
      (this.setClearColor = function (e, t) {
        Y.copy(e), (q = void 0 !== t ? t : 1), ep.set(-c, -f, c, f);
      }),
      (this.setClearColorHex = function (e, t) {
        Y.setHex(e), (q = void 0 !== t ? t : 1), ep.set(-c, -f, c, f);
      }),
      (this.clear = function () {
        X.setTransform(1, 0, 0, -1, c, f),
          !1 === ep.isEmpty() &&
            (ep.minSelf(eu),
            ep.inflate(2),
            q < 1 &&
              X.clearRect(
                Math.floor(ep.getX()),
                Math.floor(ep.getY()),
                Math.floor(ep.getWidth()),
                Math.floor(ep.getHeight())
              ),
            q > 0 &&
              (i(THREE.NormalBlending),
              t(1),
              o(
                "rgba(" +
                  Math.floor(255 * Y.r) +
                  "," +
                  Math.floor(255 * Y.g) +
                  "," +
                  Math.floor(255 * Y.b) +
                  "," +
                  q +
                  ")"
              ),
              X.fillRect(
                Math.floor(ep.getX()),
                Math.floor(ep.getY()),
                Math.floor(ep.getWidth()),
                Math.floor(ep.getHeight())
              )),
            ep.empty());
      }),
      (this.render = function (e, l) {
        var h, j, Y, q;
        function K(e, t, i, r) {
          var o, n, a, s, l, h;
          for (o = 0, n = e.length; o < n; o++)
            (s = (a = e[o]).color),
              a instanceof THREE.DirectionalLight
                ? ((l = a.matrixWorld.getPosition()),
                  (h = i.dot(l)) <= 0 ||
                    ((h *= a.intensity),
                    (r.r = r.r + s.r * h),
                    (r.g = r.g + s.g * h),
                    (r.b = r.b + s.b * h)))
                : a instanceof THREE.PointLight &&
                  ((l = a.matrixWorld.getPosition()),
                  (h = i.dot(e$.sub(l, t).normalize())) <= 0 ||
                    0 ==
                      (h *=
                        0 == a.distance
                          ? 1
                          : 1 - Math.min(t.distanceTo(l) / a.distance, 1)) ||
                    ((h *= a.intensity),
                    (r.r = r.r + s.r * h),
                    (r.g = r.g + s.g * h),
                    (r.b = r.b + s.b * h)));
        }
        function Z(e, n, a) {
          var s, l, h, u, p, d;
          t(a.opacity),
            i(a.blending),
            a instanceof THREE.ParticleBasicMaterial
              ? null !== a.map &&
                ((p = (u = a.map.image).width >> 1),
                (d = u.height >> 1),
                (a = n.scale.x * c),
                (h = n.scale.y * f),
                (s = a * p),
                (l = h * d),
                ed.set(e.x - s, e.y - l, e.x + s, e.y + l),
                !1 !== eu.intersects(ed) &&
                  (X.save(),
                  X.translate(e.x, e.y),
                  X.rotate(-n.rotation),
                  X.scale(a, -h),
                  X.translate(-p, -d),
                  X.drawImage(u, 0, 0),
                  X.restore()))
              : a instanceof THREE.ParticleCanvasMaterial &&
                ((s = n.scale.x * c),
                (l = n.scale.y * f),
                ed.set(e.x - s, e.y - l, e.x + s, e.y + l),
                !1 !== eu.intersects(ed) &&
                  (r(a.color.getContextStyle()),
                  o(a.color.getContextStyle()),
                  X.save(),
                  X.translate(e.x, e.y),
                  X.rotate(-n.rotation),
                  X.scale(s, l),
                  a.program(X),
                  X.restore()));
        }
        function Q(e, o, n, a) {
          t(a.opacity),
            i(a.blending),
            X.beginPath(),
            X.moveTo(e.positionScreen.x, e.positionScreen.y),
            X.lineTo(o.positionScreen.x, o.positionScreen.y),
            X.closePath(),
            a instanceof THREE.LineBasicMaterial &&
              (ee !== (e = a.linewidth) && (ee = X.lineWidth = e),
              et !== (e = a.linecap) && (et = X.lineCap = e),
              ei !== (e = a.linejoin) && (ei = X.lineJoin = e),
              r(a.color.getContextStyle()),
              X.stroke(),
              ed.inflate(2 * a.linewidth));
        }
        function J(e, r, o, n, a, h, c, f) {
          (W.info.render.vertices = W.info.render.vertices + 3),
            W.info.render.faces++,
            t(f.opacity),
            i(f.blending),
            (m = e.positionScreen.x),
            (v = e.positionScreen.y),
            (g = r.positionScreen.x),
            ($ = r.positionScreen.y),
            eR(m, v, g, $, (T = o.positionScreen.x), (R = o.positionScreen.y)),
            f instanceof THREE.MeshBasicMaterial
              ? null !== f.map
                ? f.map.mapping instanceof THREE.UVMapping &&
                  eH(
                    m,
                    v,
                    g,
                    $,
                    T,
                    R,
                    (A = c.uvs[0])[n].u,
                    A[n].v,
                    A[a].u,
                    A[a].v,
                    A[h].u,
                    A[h].v,
                    f.map
                  )
                : null !== f.envMap
                ? f.envMap.mapping instanceof
                    THREE.SphericalReflectionMapping &&
                  ((e = l.matrixWorldInverse),
                  e$.copy(c.vertexNormalsWorld[n]),
                  (L =
                    (e$.x * e.elements[0] +
                      e$.y * e.elements[4] +
                      e$.z * e.elements[8]) *
                      0.5 +
                    0.5),
                  (P =
                    (e$.x * e.elements[1] +
                      e$.y * e.elements[5] +
                      e$.z * e.elements[9]) *
                      0.5 +
                    0.5),
                  e$.copy(c.vertexNormalsWorld[a]),
                  (U =
                    (e$.x * e.elements[0] +
                      e$.y * e.elements[4] +
                      e$.z * e.elements[8]) *
                      0.5 +
                    0.5),
                  (F =
                    (e$.x * e.elements[1] +
                      e$.y * e.elements[5] +
                      e$.z * e.elements[9]) *
                      0.5 +
                    0.5),
                  e$.copy(c.vertexNormalsWorld[h]),
                  eH(
                    m,
                    v,
                    g,
                    $,
                    T,
                    R,
                    L,
                    P,
                    U,
                    F,
                    (D =
                      (e$.x * e.elements[0] +
                        e$.y * e.elements[4] +
                        e$.z * e.elements[8]) *
                        0.5 +
                      0.5),
                    (V =
                      (e$.x * e.elements[1] +
                        e$.y * e.elements[5] +
                        e$.z * e.elements[9]) *
                        0.5 +
                      0.5),
                    f.envMap
                  ))
                : !0 === f.wireframe
                ? e_(
                    f.color,
                    f.wireframeLinewidth,
                    f.wireframeLinecap,
                    f.wireframeLinejoin
                  )
                : ex(f.color)
              : f instanceof THREE.MeshLambertMaterial
              ? !0 === eE
                ? !1 === f.wireframe &&
                  f.shading == THREE.SmoothShading &&
                  3 == c.vertexNormalsWorld.length
                  ? ((ea.r = es.r = el.r = em.r),
                    (ea.g = es.g = el.g = em.g),
                    (ea.b = es.b = el.b = em.b),
                    K(s, c.v1.positionWorld, c.vertexNormalsWorld[0], ea),
                    K(s, c.v2.positionWorld, c.vertexNormalsWorld[1], es),
                    K(s, c.v3.positionWorld, c.vertexNormalsWorld[2], el),
                    (ea.r = Math.max(0, Math.min(f.color.r * ea.r, 1))),
                    (ea.g = Math.max(0, Math.min(f.color.g * ea.g, 1))),
                    (ea.b = Math.max(0, Math.min(f.color.b * ea.b, 1))),
                    (es.r = Math.max(0, Math.min(f.color.r * es.r, 1))),
                    (es.g = Math.max(0, Math.min(f.color.g * es.g, 1))),
                    (es.b = Math.max(0, Math.min(f.color.b * es.b, 1))),
                    (el.r = Math.max(0, Math.min(f.color.r * el.r, 1))),
                    (el.g = Math.max(0, Math.min(f.color.g * el.g, 1))),
                    (el.b = Math.max(0, Math.min(f.color.b * el.b, 1))),
                    (eh.r = (es.r + el.r) * 0.5),
                    (eh.g = (es.g + el.g) * 0.5),
                    (eh.b = (es.b + el.b) * 0.5),
                    eb(
                      m,
                      v,
                      g,
                      $,
                      T,
                      R,
                      0,
                      0,
                      1,
                      0,
                      0,
                      1,
                      (M = e8(ea, es, el, eh))
                    ))
                  : ((en.r = em.r),
                    (en.g = em.g),
                    (en.b = em.b),
                    K(s, c.centroidWorld, c.normalWorld, en),
                    (en.r = Math.max(0, Math.min(f.color.r * en.r, 1))),
                    (en.g = Math.max(0, Math.min(f.color.g * en.g, 1))),
                    (en.b = Math.max(0, Math.min(f.color.b * en.b, 1))),
                    !0 === f.wireframe
                      ? e_(
                          en,
                          f.wireframeLinewidth,
                          f.wireframeLinecap,
                          f.wireframeLinejoin
                        )
                      : ex(en))
                : !0 === f.wireframe
                ? e_(
                    f.color,
                    f.wireframeLinewidth,
                    f.wireframeLinecap,
                    f.wireframeLinejoin
                  )
                : ex(f.color)
              : f instanceof THREE.MeshDepthMaterial
              ? ((S = l.near),
                (C = l.far),
                (ea.r = ea.g = ea.b = 1 - ew(e.positionScreen.z, S, C)),
                (es.r = es.g = es.b = 1 - ew(r.positionScreen.z, S, C)),
                (el.r = el.g = el.b = 1 - ew(o.positionScreen.z, S, C)),
                (eh.r = (es.r + el.r) * 0.5),
                (eh.g = (es.g + el.g) * 0.5),
                (eh.b = (es.b + el.b) * 0.5),
                eb(
                  m,
                  v,
                  g,
                  $,
                  T,
                  R,
                  0,
                  0,
                  1,
                  0,
                  0,
                  1,
                  (M = e8(ea, es, el, eh))
                ))
              : f instanceof THREE.MeshNormalMaterial &&
                ((en.r = eS(c.normalWorld.x)),
                (en.g = eS(c.normalWorld.y)),
                (en.b = eS(c.normalWorld.z)),
                !0 === f.wireframe
                  ? e_(
                      en,
                      f.wireframeLinewidth,
                      f.wireframeLinecap,
                      f.wireframeLinejoin
                    )
                  : ex(en));
        }
        function eT(e, r, o, n, a, h, c, f, u) {
          (W.info.render.vertices = W.info.render.vertices + 4),
            W.info.render.faces++,
            t(f.opacity),
            i(f.blending),
            (void 0 !== f.map && null !== f.map) ||
            (void 0 !== f.envMap && null !== f.envMap)
              ? (J(e, r, n, 0, 1, 3, c, f, u), J(a, o, h, 1, 2, 3, c, f, u))
              : ((m = e.positionScreen.x),
                (v = e.positionScreen.y),
                (g = r.positionScreen.x),
                ($ = r.positionScreen.y),
                (T = o.positionScreen.x),
                (R = o.positionScreen.y),
                (y = n.positionScreen.x),
                (_ = n.positionScreen.y),
                (x = a.positionScreen.x),
                (H = a.positionScreen.y),
                (b = h.positionScreen.x),
                (w = h.positionScreen.y),
                f instanceof THREE.MeshBasicMaterial
                  ? (ey(m, v, g, $, T, R, y, _),
                    !0 === f.wireframe
                      ? e_(
                          f.color,
                          f.wireframeLinewidth,
                          f.wireframeLinecap,
                          f.wireframeLinejoin
                        )
                      : ex(f.color))
                  : f instanceof THREE.MeshLambertMaterial
                  ? !0 === eE
                    ? f.wireframe ||
                      f.shading != THREE.SmoothShading ||
                      4 != c.vertexNormalsWorld.length
                      ? ((en.r = em.r),
                        (en.g = em.g),
                        (en.b = em.b),
                        K(s, c.centroidWorld, c.normalWorld, en),
                        (en.r = Math.max(0, Math.min(f.color.r * en.r, 1))),
                        (en.g = Math.max(0, Math.min(f.color.g * en.g, 1))),
                        (en.b = Math.max(0, Math.min(f.color.b * en.b, 1))),
                        ey(m, v, g, $, T, R, y, _),
                        !0 === f.wireframe
                          ? e_(
                              en,
                              f.wireframeLinewidth,
                              f.wireframeLinecap,
                              f.wireframeLinejoin
                            )
                          : ex(en))
                      : ((ea.r = es.r = el.r = eh.r = em.r),
                        (ea.g = es.g = el.g = eh.g = em.g),
                        (ea.b = es.b = el.b = eh.b = em.b),
                        K(s, c.v1.positionWorld, c.vertexNormalsWorld[0], ea),
                        K(s, c.v2.positionWorld, c.vertexNormalsWorld[1], es),
                        K(s, c.v4.positionWorld, c.vertexNormalsWorld[3], el),
                        K(s, c.v3.positionWorld, c.vertexNormalsWorld[2], eh),
                        (ea.r = Math.max(0, Math.min(f.color.r * ea.r, 1))),
                        (ea.g = Math.max(0, Math.min(f.color.g * ea.g, 1))),
                        (ea.b = Math.max(0, Math.min(f.color.b * ea.b, 1))),
                        (es.r = Math.max(0, Math.min(f.color.r * es.r, 1))),
                        (es.g = Math.max(0, Math.min(f.color.g * es.g, 1))),
                        (es.b = Math.max(0, Math.min(f.color.b * es.b, 1))),
                        (el.r = Math.max(0, Math.min(f.color.r * el.r, 1))),
                        (el.g = Math.max(0, Math.min(f.color.g * el.g, 1))),
                        (el.b = Math.max(0, Math.min(f.color.b * el.b, 1))),
                        (eh.r = Math.max(0, Math.min(f.color.r * eh.r, 1))),
                        (eh.g = Math.max(0, Math.min(f.color.g * eh.g, 1))),
                        (eh.b = Math.max(0, Math.min(f.color.b * eh.b, 1))),
                        (M = e8(ea, es, el, eh)),
                        eR(m, v, g, $, y, _),
                        eb(m, v, g, $, y, _, 0, 0, 1, 0, 0, 1, M),
                        eR(x, H, T, R, b, w),
                        eb(x, H, T, R, b, w, 1, 0, 1, 1, 0, 1, M))
                    : (ey(m, v, g, $, T, R, y, _),
                      !0 === f.wireframe
                        ? e_(
                            f.color,
                            f.wireframeLinewidth,
                            f.wireframeLinecap,
                            f.wireframeLinejoin
                          )
                        : ex(f.color))
                  : f instanceof THREE.MeshNormalMaterial
                  ? ((en.r = eS(c.normalWorld.x)),
                    (en.g = eS(c.normalWorld.y)),
                    (en.b = eS(c.normalWorld.z)),
                    ey(m, v, g, $, T, R, y, _),
                    !0 === f.wireframe
                      ? e_(
                          en,
                          f.wireframeLinewidth,
                          f.wireframeLinecap,
                          f.wireframeLinejoin
                        )
                      : ex(en))
                  : f instanceof THREE.MeshDepthMaterial &&
                    ((S = l.near),
                    (C = l.far),
                    (ea.r = ea.g = ea.b = 1 - ew(e.positionScreen.z, S, C)),
                    (es.r = es.g = es.b = 1 - ew(r.positionScreen.z, S, C)),
                    (el.r = el.g = el.b = 1 - ew(n.positionScreen.z, S, C)),
                    (eh.r = eh.g = eh.b = 1 - ew(o.positionScreen.z, S, C)),
                    (M = e8(ea, es, el, eh)),
                    eR(m, v, g, $, y, _),
                    eb(m, v, g, $, y, _, 0, 0, 1, 0, 0, 1, M),
                    eR(x, H, T, R, b, w),
                    eb(x, H, T, R, b, w, 1, 0, 1, 1, 0, 1, M)));
        }
        function eR(e, t, i, r, o, n) {
          X.beginPath(),
            X.moveTo(e, t),
            X.lineTo(i, r),
            X.lineTo(o, n),
            X.lineTo(e, t);
        }
        function ey(e, t, i, r, o, n, a, s) {
          X.beginPath(),
            X.moveTo(e, t),
            X.lineTo(i, r),
            X.lineTo(o, n),
            X.lineTo(a, s),
            X.lineTo(e, t);
        }
        function e_(e, t, i, o) {
          ee !== t && (ee = X.lineWidth = t),
            et !== i && (et = X.lineCap = i),
            ei !== o && (ei = X.lineJoin = o),
            r(e.getContextStyle()),
            X.stroke(),
            ed.inflate(2 * t);
        }
        function ex(e) {
          o(e.getContextStyle()), X.fill();
        }
        function eH(e, t, i, r, n, a, s, l, h, c, f, u, p) {
          if (!(void 0 === p.image || 0 === p.image.width)) {
            if (!0 === p.needsUpdate || void 0 === ec[p.id]) {
              var d = p.wrapS == THREE.RepeatWrapping,
                E = p.wrapT == THREE.RepeatWrapping;
              (ec[p.id] = X.createPattern(
                p.image,
                !0 === d && !0 === E
                  ? "repeat"
                  : !0 === d && !1 === E
                  ? "repeat-x"
                  : !1 === d && !0 === E
                  ? "repeat-y"
                  : "no-repeat"
              )),
                (p.needsUpdate = !1);
            }
            o(ec[p.id]);
            var d = p.offset.x / p.repeat.x,
              E = p.offset.y / p.repeat.y,
              m = p.image.width * p.repeat.x,
              v = p.image.height * p.repeat.y,
              s = (s + d) * m,
              l = (1 - l + E) * v,
              i = i - e,
              r = r - t,
              n = n - e,
              a = a - t,
              h = (h + d) * m - s,
              c = (1 - c + E) * v - l,
              f = (f + d) * m - s,
              u = (1 - u + E) * v - l,
              d = h * u - f * c;
            0 === d
              ? (void 0 === ef[p.id] &&
                  (((t = document.createElement("canvas")).width =
                    p.image.width),
                  (t.height = p.image.height),
                  (t = t.getContext("2d")).drawImage(p.image, 0, 0),
                  (ef[p.id] = t.getImageData(
                    0,
                    0,
                    p.image.width,
                    p.image.height
                  ).data)),
                (t = ef[p.id]),
                (s = (Math.floor(s) + Math.floor(l) * p.image.width) * 4),
                en.setRGB(t[s] / 255, t[s + 1] / 255, t[s + 2] / 255),
                ex(en))
              : ((p = (u * i - c * n) * (d = 1 / d)),
                (c = (u * r - c * a) * d),
                (i = (h * n - f * i) * d),
                (r = (h * a - f * r) * d),
                (e = e - p * s - i * l),
                (s = t - c * s - r * l),
                X.save(),
                X.transform(p, c, i, r, e, s),
                X.fill(),
                X.restore());
          }
        }
        function eb(e, t, i, r, o, n, a, s, l, h, c, f, u) {
          var p, d;
          (p = u.width - 1),
            (d = u.height - 1),
            (a *= p),
            (s *= d),
            (i -= e),
            (r -= t),
            (o -= e),
            (n -= t),
            (l = l * p - a),
            (h = h * d - s),
            (c = c * p - a),
            (d = 1 / (l * (f = f * d - s) - c * h)),
            (p = (f * i - h * o) * d),
            (h = (f * r - h * n) * d),
            (i = (l * o - c * i) * d),
            (r = (l * n - c * r) * d),
            (e = e - p * a - i * s),
            (t = t - h * a - r * s),
            X.save(),
            X.transform(p, h, i, r, e, t),
            X.clip(),
            X.drawImage(u, 0, 0),
            X.restore();
        }
        function e8(e, t, i, r) {
          var o = ~~(255 * e.r),
            n = ~~(255 * e.g),
            e = ~~(255 * e.b),
            a = ~~(255 * t.r),
            s = ~~(255 * t.g),
            t = ~~(255 * t.b),
            l = ~~(255 * i.r),
            h = ~~(255 * i.g),
            i = ~~(255 * i.b),
            c = ~~(255 * r.r),
            f = ~~(255 * r.g),
            r = ~~(255 * r.b);
          return (
            (O[0] = o < 0 ? 0 : o > 255 ? 255 : o),
            (O[1] = n < 0 ? 0 : n > 255 ? 255 : n),
            (O[2] = e < 0 ? 0 : e > 255 ? 255 : e),
            (O[4] = a < 0 ? 0 : a > 255 ? 255 : a),
            (O[5] = s < 0 ? 0 : s > 255 ? 255 : s),
            (O[6] = t < 0 ? 0 : t > 255 ? 255 : t),
            (O[8] = l < 0 ? 0 : l > 255 ? 255 : l),
            (O[9] = h < 0 ? 0 : h > 255 ? 255 : h),
            (O[10] = i < 0 ? 0 : i > 255 ? 255 : i),
            (O[12] = c < 0 ? 0 : c > 255 ? 255 : c),
            (O[13] = f < 0 ? 0 : f > 255 ? 255 : f),
            (O[14] = r < 0 ? 0 : r > 255 ? 255 : r),
            B.putImageData(N, 0, 0),
            k.drawImage(z, 0, 0),
            I
          );
        }
        function ew(e, t, i) {
          return (e = (e - t) / (i - t)) * e * (3 - 2 * e);
        }
        function eS(e) {
          return (e = (e + 1) * 0.5) < 0 ? 0 : e > 1 ? 1 : e;
        }
        function e0(e, t) {
          var i = t.x - e.x,
            r = t.y - e.y,
            o = i * i + r * r;
          0 !== o &&
            ((i *= o = 1 / Math.sqrt(o)),
            (r *= o),
            (t.x = t.x + i),
            (t.y = t.y + r),
            (e.x = e.x - i),
            (e.y = e.y - r));
        }
        for (
          !0 === this.autoClear
            ? this.clear()
            : X.setTransform(1, 0, 0, -1, c, f),
            W.info.render.vertices = 0,
            W.info.render.faces = 0,
            a = (n = G.projectScene(e, l, this.sortElements)).elements,
            !0 == (eE = (s = n.lights).length > 0) &&
              (function e(t) {
                var i, r, o, n;
                for (
                  em.setRGB(0, 0, 0),
                    ev.setRGB(0, 0, 0),
                    eg.setRGB(0, 0, 0),
                    i = 0,
                    r = t.length;
                  i < r;
                  i++
                )
                  (n = (o = t[i]).color),
                    o instanceof THREE.AmbientLight
                      ? ((em.r = em.r + n.r),
                        (em.g = em.g + n.g),
                        (em.b = em.b + n.b))
                      : o instanceof THREE.DirectionalLight
                      ? ((ev.r = ev.r + n.r),
                        (ev.g = ev.g + n.g),
                        (ev.b = ev.b + n.b))
                      : o instanceof THREE.PointLight &&
                        ((eg.r = eg.r + n.r),
                        (eg.g = eg.g + n.g),
                        (eg.b = eg.b + n.b));
              })(s),
            h = 0,
            j = a.length;
          h < j;
          h++
        )
          void 0 ===
            (q =
              (q = (Y = a[h]).material) instanceof THREE.MeshFaceMaterial
                ? Y.faceMaterial
                : q) ||
            !1 === q.visible ||
            (ed.empty(),
            Y instanceof THREE.RenderableParticle
              ? (((u = Y).x = u.x * c), (u.y = u.y * f), Z(u, Y, q, e))
              : Y instanceof THREE.RenderableLine
              ? ((u = Y.v1),
                (p = Y.v2),
                (u.positionScreen.x = u.positionScreen.x * c),
                (u.positionScreen.y = u.positionScreen.y * f),
                (p.positionScreen.x = p.positionScreen.x * c),
                (p.positionScreen.y = p.positionScreen.y * f),
                ed.addPoint(u.positionScreen.x, u.positionScreen.y),
                ed.addPoint(p.positionScreen.x, p.positionScreen.y),
                !0 === eu.intersects(ed) && Q(u, p, Y, q, e))
              : Y instanceof THREE.RenderableFace3
              ? ((u = Y.v1),
                (p = Y.v2),
                (d = Y.v3),
                (u.positionScreen.x = u.positionScreen.x * c),
                (u.positionScreen.y = u.positionScreen.y * f),
                (p.positionScreen.x = p.positionScreen.x * c),
                (p.positionScreen.y = p.positionScreen.y * f),
                (d.positionScreen.x = d.positionScreen.x * c),
                (d.positionScreen.y = d.positionScreen.y * f),
                !0 === q.overdraw &&
                  (e0(u.positionScreen, p.positionScreen),
                  e0(p.positionScreen, d.positionScreen),
                  e0(d.positionScreen, u.positionScreen)),
                ed.add3Points(
                  u.positionScreen.x,
                  u.positionScreen.y,
                  p.positionScreen.x,
                  p.positionScreen.y,
                  d.positionScreen.x,
                  d.positionScreen.y
                ),
                !0 === eu.intersects(ed) && J(u, p, d, 0, 1, 2, Y, q, e))
              : Y instanceof THREE.RenderableFace4 &&
                ((u = Y.v1),
                (p = Y.v2),
                (d = Y.v3),
                (E = Y.v4),
                (u.positionScreen.x = u.positionScreen.x * c),
                (u.positionScreen.y = u.positionScreen.y * f),
                (p.positionScreen.x = p.positionScreen.x * c),
                (p.positionScreen.y = p.positionScreen.y * f),
                (d.positionScreen.x = d.positionScreen.x * c),
                (d.positionScreen.y = d.positionScreen.y * f),
                (E.positionScreen.x = E.positionScreen.x * c),
                (E.positionScreen.y = E.positionScreen.y * f),
                er.positionScreen.copy(p.positionScreen),
                eo.positionScreen.copy(E.positionScreen),
                !0 === q.overdraw &&
                  (e0(u.positionScreen, p.positionScreen),
                  e0(p.positionScreen, E.positionScreen),
                  e0(E.positionScreen, u.positionScreen),
                  e0(d.positionScreen, er.positionScreen),
                  e0(d.positionScreen, eo.positionScreen)),
                ed.addPoint(u.positionScreen.x, u.positionScreen.y),
                ed.addPoint(p.positionScreen.x, p.positionScreen.y),
                ed.addPoint(d.positionScreen.x, d.positionScreen.y),
                ed.addPoint(E.positionScreen.x, E.positionScreen.y),
                !0 === eu.intersects(ed) && eT(u, p, d, E, er, eo, Y, q, e)),
            ep.addRectangle(ed));
        X.setTransform(1, 0, 0, 1, 0, 0);
      });
  }),
  (THREE.ShaderChunk = {
    fog_pars_fragment:
      "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
    fog_fragment:
      "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
    envmap_pars_fragment:
      "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#endif",
    envmap_fragment:
      "#ifdef USE_ENVMAP\n#ifdef DOUBLE_SIDED\nfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\nvec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * vReflect.x, vReflect.yz ) );\n#else\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * vReflect.x, vReflect.yz ) );\n#endif\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity );\n} else {\ngl_FragColor.xyz = gl_FragColor.xyz * cubeColor.xyz;\n}\n#endif",
    envmap_pars_vertex:
      "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
    envmap_vertex:
      "#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[ 0 ].xyz, objectMatrix[ 1 ].xyz, objectMatrix[ 2 ].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",
    map_particle_pars_fragment:
      "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
    map_particle_fragment:
      "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\n#endif",
    map_pars_vertex:
      "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",
    map_pars_fragment:
      "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",
    map_vertex:
      "#ifdef USE_MAP\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
    map_fragment:
      "#ifdef USE_MAP\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( map, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif\n#endif",
    lightmap_pars_fragment:
      "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
    lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
    lightmap_fragment:
      "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
    lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
    lights_lambert_pars_vertex:
      "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngle[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif",
    lights_lambert_vertex:
      "vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\nvLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, dirVector );\nvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\ndirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\ndirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n#ifdef DOUBLE_SIDED\nvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\npointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\npointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef DOUBLE_SIDED\nvLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nlVector = normalize( lVector );\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - mPosition.xyz ) );\nif ( spotEffect > spotLightAngle[ i ] ) {\nspotEffect = pow( spotEffect, spotLightExponent[ i ] );\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\nspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\nspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n#ifdef DOUBLE_SIDED\nvLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n#endif\n}\n}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\nvLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
    lights_phong_pars_vertex:
      "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvarying vec3 vWorldPosition;\n#endif",
    lights_phong_vertex:
      "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nvSpotLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvWorldPosition = mPosition.xyz;\n#endif",
    lights_phong_pars_fragment:
      "uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngle[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#else\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\nvarying vec3 vWorldPosition;\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
    lights_phong_fragment:
      "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\nnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = max( pow( pointDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse  = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vSpotLight[ i ].xyz );\nfloat lDistance = vSpotLight[ i ].w;\n#endif\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngle[ i ] ) {\nspotEffect = pow( spotEffect, spotLightExponent[ i ] );\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n#endif\nspotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\nvec3 spotHalfVector = normalize( lVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = max( pow( spotDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, dirVector );\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = max( pow( dirDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
    color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_fragment:
      "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
    color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_vertex:
      "#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",
    skinning_pars_vertex:
      "#ifdef USE_SKINNING\n#ifdef BONE_TEXTURE\nuniform sampler2D boneTexture;\nmat4 getBoneMatrix( const in float i ) {\nfloat j = i * 4.0;\nfloat x = mod( j, N_BONE_PIXEL_X );\nfloat y = floor( j / N_BONE_PIXEL_X );\nconst float dx = 1.0 / N_BONE_PIXEL_X;\nconst float dy = 1.0 / N_BONE_PIXEL_Y;\ny = dy * ( y + 0.5 );\nvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\nvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\nvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\nvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\nmat4 bone = mat4( v1, v2, v3, v4 );\nreturn bone;\n}\n#else\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\nmat4 getBoneMatrix( const in float i ) {\nmat4 bone = boneGlobalMatrices[ int(i) ];\nreturn bone;\n}\n#endif\n#endif",
    skinbase_vertex:
      "#ifdef USE_SKINNING\nmat4 boneMatX = getBoneMatrix( skinIndex.x );\nmat4 boneMatY = getBoneMatrix( skinIndex.y );\n#endif",
    skinning_vertex:
      "#ifdef USE_SKINNING\nvec4 skinned  = boneMatX * skinVertexA * skinWeight.x;\nskinned 	  += boneMatY * skinVertexB * skinWeight.y;\ngl_Position  = projectionMatrix * modelViewMatrix * skinned;\n#endif",
    morphtarget_pars_vertex:
      "#ifdef USE_MORPHTARGETS\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[ 8 ];\n#else\nuniform float morphTargetInfluences[ 4 ];\n#endif\n#endif",
    morphtarget_vertex:
      "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n#ifndef USE_MORPHNORMALS\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n#endif\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif",
    default_vertex:
      "#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif",
    morphnormal_vertex:
      "#ifdef USE_MORPHNORMALS\nvec3 morphedNormal = vec3( 0.0 );\nmorphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\nmorphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\nmorphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\nmorphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\nmorphedNormal += normal;\n#endif",
    skinnormal_vertex:
      "#ifdef USE_SKINNING\nmat4 skinMatrix = skinWeight.x * boneMatX;\nskinMatrix 	+= skinWeight.y * boneMatY;\nvec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n#endif",
    defaultnormal_vertex:
      "vec3 transformedNormal;\n#ifdef USE_SKINNING\ntransformedNormal = skinnedNormal.xyz;\n#endif\n#ifdef USE_MORPHNORMALS\ntransformedNormal = morphedNormal;\n#endif\n#ifndef USE_MORPHNORMALS\n#ifndef USE_SKINNING\ntransformedNormal = normal;\n#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;",
    shadowmap_pars_fragment:
      "#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform vec2 shadowMapSize[ MAX_SHADOWS ];\nuniform float shadowDarkness[ MAX_SHADOWS ];\nuniform float shadowBias[ MAX_SHADOWS ];\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
    shadowmap_fragment:
      "#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_DEBUG\nvec3 frustumColors[3];\nfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\nfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\nfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n#endif\n#ifdef SHADOWMAP_CASCADE\nint inFrustumCount = 0;\n#endif\nfloat fDepth;\nvec3 shadowColor = vec3( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\nbool inFrustum = all( inFrustumVec );\n#ifdef SHADOWMAP_CASCADE\ninFrustumCount += int( inFrustum );\nbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n#else\nbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n#endif\nbool frustumTest = all( frustumTestVec );\nif ( frustumTest ) {\nshadowCoord.z += shadowBias[ i ];\n#ifdef SHADOWMAP_SOFT\nfloat shadow = 0.0;\nconst float shadowDelta = 1.0 / 9.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.25 * xPixelOffset;\nfloat dy0 = -1.25 * yPixelOffset;\nfloat dx1 = 1.25 * xPixelOffset;\nfloat dy1 = 1.25 * yPixelOffset;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n#endif\n}\n#ifdef SHADOWMAP_DEBUG\n#ifdef SHADOWMAP_CASCADE\nif ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n#else\nif ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n#endif\n#endif\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
    shadowmap_pars_vertex:
      "#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
    shadowmap_vertex:
      "#ifdef USE_SHADOWMAP\nvec4 transformedPosition;\n#ifdef USE_MORPHTARGETS\ntransformedPosition = objectMatrix * vec4( morphed, 1.0 );\n#else\n#ifdef USE_SKINNING\ntransformedPosition = objectMatrix * skinned;\n#else\ntransformedPosition = objectMatrix * vec4( position, 1.0 );\n#endif\n#endif\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * transformedPosition;\n}\n#endif",
    alphatest_fragment:
      "#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
    linear_to_gamma_fragment:
      "#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif",
  }),
  (THREE.UniformsUtils = {
    merge: function (e) {
      var t,
        i,
        r,
        o = {};
      for (t = 0; t < e.length; t++)
        for (i in (r = this.clone(e[t]))) o[i] = r[i];
      return o;
    },
    clone: function (e) {
      var t,
        i,
        r,
        o = {};
      for (t in e)
        for (i in ((o[t] = {}), e[t]))
          (r = e[t][i]),
            (o[t][i] =
              r instanceof THREE.Color ||
              r instanceof THREE.Vector2 ||
              r instanceof THREE.Vector3 ||
              r instanceof THREE.Vector4 ||
              r instanceof THREE.Matrix4 ||
              r instanceof THREE.Texture
                ? r.clone()
                : r instanceof Array
                ? r.slice()
                : r);
      return o;
    },
  }),
  (THREE.UniformsLib = {
    common: {
      diffuse: { type: "c", value: new THREE.Color(15658734) },
      opacity: { type: "f", value: 1 },
      map: { type: "t", value: 0, texture: null },
      offsetRepeat: { type: "v4", value: new THREE.Vector4(0, 0, 1, 1) },
      lightMap: { type: "t", value: 2, texture: null },
      envMap: { type: "t", value: 1, texture: null },
      flipEnvMap: { type: "f", value: -1 },
      useRefract: { type: "i", value: 0 },
      reflectivity: { type: "f", value: 1 },
      refractionRatio: { type: "f", value: 0.98 },
      combine: { type: "i", value: 0 },
      morphTargetInfluences: { type: "f", value: 0 },
    },
    fog: {
      fogDensity: { type: "f", value: 25e-5 },
      fogNear: { type: "f", value: 1 },
      fogFar: { type: "f", value: 2e3 },
      fogColor: { type: "c", value: new THREE.Color(16777215) },
    },
    lights: {
      ambientLightColor: { type: "fv", value: [] },
      directionalLightDirection: { type: "fv", value: [] },
      directionalLightColor: { type: "fv", value: [] },
      pointLightColor: { type: "fv", value: [] },
      pointLightPosition: { type: "fv", value: [] },
      pointLightDistance: { type: "fv1", value: [] },
      spotLightColor: { type: "fv", value: [] },
      spotLightPosition: { type: "fv", value: [] },
      spotLightDirection: { type: "fv", value: [] },
      spotLightDistance: { type: "fv1", value: [] },
      spotLightAngle: { type: "fv1", value: [] },
      spotLightExponent: { type: "fv1", value: [] },
    },
    particle: {
      psColor: { type: "c", value: new THREE.Color(15658734) },
      opacity: { type: "f", value: 1 },
      size: { type: "f", value: 1 },
      scale: { type: "f", value: 1 },
      map: { type: "t", value: 0, texture: null },
      fogDensity: { type: "f", value: 25e-5 },
      fogNear: { type: "f", value: 1 },
      fogFar: { type: "f", value: 2e3 },
      fogColor: { type: "c", value: new THREE.Color(16777215) },
    },
    shadowmap: {
      shadowMap: { type: "tv", value: 6, texture: [] },
      shadowMapSize: { type: "v2v", value: [] },
      shadowBias: { type: "fv1", value: [] },
      shadowDarkness: { type: "fv1", value: [] },
      shadowMatrix: { type: "m4v", value: [] },
    },
  }),
  (THREE.ShaderLib = {
    depth: {
      uniforms: {
        mNear: { type: "f", value: 1 },
        mFar: { type: "f", value: 2e3 },
        opacity: { type: "f", value: 1 },
      },
      vertexShader:
        "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
      fragmentShader:
        "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}",
    },
    normal: {
      uniforms: { opacity: { type: "f", value: 1 } },
      vertexShader:
        "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalMatrix * normal;\ngl_Position = projectionMatrix * mvPosition;\n}",
      fragmentShader:
        "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}",
    },
    basic: {
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        THREE.UniformsLib.fog,
        THREE.UniformsLib.shadowmap,
      ]),
      vertexShader: [
        THREE.ShaderChunk.map_pars_vertex,
        THREE.ShaderChunk.lightmap_pars_vertex,
        THREE.ShaderChunk.envmap_pars_vertex,
        THREE.ShaderChunk.color_pars_vertex,
        THREE.ShaderChunk.skinning_pars_vertex,
        THREE.ShaderChunk.morphtarget_pars_vertex,
        THREE.ShaderChunk.shadowmap_pars_vertex,
        "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
        THREE.ShaderChunk.map_vertex,
        THREE.ShaderChunk.lightmap_vertex,
        THREE.ShaderChunk.envmap_vertex,
        THREE.ShaderChunk.color_vertex,
        THREE.ShaderChunk.skinbase_vertex,
        THREE.ShaderChunk.skinning_vertex,
        THREE.ShaderChunk.morphtarget_vertex,
        THREE.ShaderChunk.default_vertex,
        THREE.ShaderChunk.shadowmap_vertex,
        "}",
      ].join("\n"),
      fragmentShader: [
        "uniform vec3 diffuse;\nuniform float opacity;",
        THREE.ShaderChunk.color_pars_fragment,
        THREE.ShaderChunk.map_pars_fragment,
        THREE.ShaderChunk.lightmap_pars_fragment,
        THREE.ShaderChunk.envmap_pars_fragment,
        THREE.ShaderChunk.fog_pars_fragment,
        THREE.ShaderChunk.shadowmap_pars_fragment,
        "void main() {\ngl_FragColor = vec4( diffuse, opacity );",
        THREE.ShaderChunk.map_fragment,
        THREE.ShaderChunk.alphatest_fragment,
        THREE.ShaderChunk.lightmap_fragment,
        THREE.ShaderChunk.color_fragment,
        THREE.ShaderChunk.envmap_fragment,
        THREE.ShaderChunk.shadowmap_fragment,
        THREE.ShaderChunk.linear_to_gamma_fragment,
        THREE.ShaderChunk.fog_fragment,
        "}",
      ].join("\n"),
    },
    lambert: {
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        THREE.UniformsLib.fog,
        THREE.UniformsLib.lights,
        THREE.UniformsLib.shadowmap,
        {
          ambient: { type: "c", value: new THREE.Color(16777215) },
          emissive: { type: "c", value: new THREE.Color(0) },
          wrapRGB: { type: "v3", value: new THREE.Vector3(1, 1, 1) },
        },
      ]),
      vertexShader: [
        "varying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",
        THREE.ShaderChunk.map_pars_vertex,
        THREE.ShaderChunk.lightmap_pars_vertex,
        THREE.ShaderChunk.envmap_pars_vertex,
        THREE.ShaderChunk.lights_lambert_pars_vertex,
        THREE.ShaderChunk.color_pars_vertex,
        THREE.ShaderChunk.skinning_pars_vertex,
        THREE.ShaderChunk.morphtarget_pars_vertex,
        THREE.ShaderChunk.shadowmap_pars_vertex,
        "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
        THREE.ShaderChunk.map_vertex,
        THREE.ShaderChunk.lightmap_vertex,
        THREE.ShaderChunk.envmap_vertex,
        THREE.ShaderChunk.color_vertex,
        THREE.ShaderChunk.morphnormal_vertex,
        THREE.ShaderChunk.skinbase_vertex,
        THREE.ShaderChunk.skinnormal_vertex,
        THREE.ShaderChunk.defaultnormal_vertex,
        "#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif",
        THREE.ShaderChunk.lights_lambert_vertex,
        THREE.ShaderChunk.skinning_vertex,
        THREE.ShaderChunk.morphtarget_vertex,
        THREE.ShaderChunk.default_vertex,
        THREE.ShaderChunk.shadowmap_vertex,
        "}",
      ].join("\n"),
      fragmentShader: [
        "uniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif",
        THREE.ShaderChunk.color_pars_fragment,
        THREE.ShaderChunk.map_pars_fragment,
        THREE.ShaderChunk.lightmap_pars_fragment,
        THREE.ShaderChunk.envmap_pars_fragment,
        THREE.ShaderChunk.fog_pars_fragment,
        THREE.ShaderChunk.shadowmap_pars_fragment,
        "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );",
        THREE.ShaderChunk.map_fragment,
        THREE.ShaderChunk.alphatest_fragment,
        "#ifdef DOUBLE_SIDED\nif ( gl_FrontFacing )\ngl_FragColor.xyz *= vLightFront;\nelse\ngl_FragColor.xyz *= vLightBack;\n#else\ngl_FragColor.xyz *= vLightFront;\n#endif",
        THREE.ShaderChunk.lightmap_fragment,
        THREE.ShaderChunk.color_fragment,
        THREE.ShaderChunk.envmap_fragment,
        THREE.ShaderChunk.shadowmap_fragment,
        THREE.ShaderChunk.linear_to_gamma_fragment,
        THREE.ShaderChunk.fog_fragment,
        "}",
      ].join("\n"),
    },
    phong: {
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.common,
        THREE.UniformsLib.fog,
        THREE.UniformsLib.lights,
        THREE.UniformsLib.shadowmap,
        {
          ambient: { type: "c", value: new THREE.Color(16777215) },
          emissive: { type: "c", value: new THREE.Color(0) },
          specular: { type: "c", value: new THREE.Color(1118481) },
          shininess: { type: "f", value: 30 },
          wrapRGB: { type: "v3", value: new THREE.Vector3(1, 1, 1) },
        },
      ]),
      vertexShader: [
        "varying vec3 vViewPosition;\nvarying vec3 vNormal;",
        THREE.ShaderChunk.map_pars_vertex,
        THREE.ShaderChunk.lightmap_pars_vertex,
        THREE.ShaderChunk.envmap_pars_vertex,
        THREE.ShaderChunk.lights_phong_pars_vertex,
        THREE.ShaderChunk.color_pars_vertex,
        THREE.ShaderChunk.skinning_pars_vertex,
        THREE.ShaderChunk.morphtarget_pars_vertex,
        THREE.ShaderChunk.shadowmap_pars_vertex,
        "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
        THREE.ShaderChunk.map_vertex,
        THREE.ShaderChunk.lightmap_vertex,
        THREE.ShaderChunk.envmap_vertex,
        THREE.ShaderChunk.color_vertex,
        "#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif\nvViewPosition = -mvPosition.xyz;",
        THREE.ShaderChunk.morphnormal_vertex,
        THREE.ShaderChunk.skinbase_vertex,
        THREE.ShaderChunk.skinnormal_vertex,
        THREE.ShaderChunk.defaultnormal_vertex,
        "vNormal = transformedNormal;",
        THREE.ShaderChunk.lights_phong_vertex,
        THREE.ShaderChunk.skinning_vertex,
        THREE.ShaderChunk.morphtarget_vertex,
        THREE.ShaderChunk.default_vertex,
        THREE.ShaderChunk.shadowmap_vertex,
        "}",
      ].join("\n"),
      fragmentShader: [
        "uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;",
        THREE.ShaderChunk.color_pars_fragment,
        THREE.ShaderChunk.map_pars_fragment,
        THREE.ShaderChunk.lightmap_pars_fragment,
        THREE.ShaderChunk.envmap_pars_fragment,
        THREE.ShaderChunk.fog_pars_fragment,
        THREE.ShaderChunk.lights_phong_pars_fragment,
        THREE.ShaderChunk.shadowmap_pars_fragment,
        "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );",
        THREE.ShaderChunk.map_fragment,
        THREE.ShaderChunk.alphatest_fragment,
        THREE.ShaderChunk.lights_phong_fragment,
        THREE.ShaderChunk.lightmap_fragment,
        THREE.ShaderChunk.color_fragment,
        THREE.ShaderChunk.envmap_fragment,
        THREE.ShaderChunk.shadowmap_fragment,
        THREE.ShaderChunk.linear_to_gamma_fragment,
        THREE.ShaderChunk.fog_fragment,
        "}",
      ].join("\n"),
    },
    particle_basic: {
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.particle,
        THREE.UniformsLib.shadowmap,
      ]),
      vertexShader: [
        "uniform float size;\nuniform float scale;",
        THREE.ShaderChunk.color_pars_vertex,
        THREE.ShaderChunk.shadowmap_pars_vertex,
        "void main() {",
        THREE.ShaderChunk.color_vertex,
        "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;",
        THREE.ShaderChunk.shadowmap_vertex,
        "}",
      ].join("\n"),
      fragmentShader: [
        "uniform vec3 psColor;\nuniform float opacity;",
        THREE.ShaderChunk.color_pars_fragment,
        THREE.ShaderChunk.map_particle_pars_fragment,
        THREE.ShaderChunk.fog_pars_fragment,
        THREE.ShaderChunk.shadowmap_pars_fragment,
        "void main() {\ngl_FragColor = vec4( psColor, opacity );",
        THREE.ShaderChunk.map_particle_fragment,
        THREE.ShaderChunk.alphatest_fragment,
        THREE.ShaderChunk.color_fragment,
        THREE.ShaderChunk.shadowmap_fragment,
        THREE.ShaderChunk.fog_fragment,
        "}",
      ].join("\n"),
    },
    depthRGBA: {
      uniforms: {},
      vertexShader: [
        THREE.ShaderChunk.skinning_pars_vertex,
        THREE.ShaderChunk.morphtarget_pars_vertex,
        "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
        THREE.ShaderChunk.skinbase_vertex,
        THREE.ShaderChunk.skinning_vertex,
        THREE.ShaderChunk.morphtarget_vertex,
        THREE.ShaderChunk.default_vertex,
        "}",
      ].join("\n"),
      fragmentShader:
        "vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}",
    },
  }),
  (THREE.WebGLRenderer = function (e) {
    function t(e, t) {
      var i = e.vertices.length,
        r = t.material;
      if (r.attributes)
        for (var o in (void 0 === e.__webglCustomAttributesList &&
          (e.__webglCustomAttributesList = []),
        r.attributes)) {
          var n = r.attributes[o];
          if (!n.__webglInitialized || n.createUniqueBuffers) {
            n.__webglInitialized = !0;
            var a = 1;
            "v2" === n.type
              ? (a = 2)
              : "v3" === n.type
              ? (a = 3)
              : "v4" === n.type
              ? (a = 4)
              : "c" === n.type && (a = 3),
              (n.size = a),
              (n.array = new Float32Array(i * a)),
              (n.buffer = U.createBuffer()),
              (n.buffer.belongsToAttribute = o),
              (n.needsUpdate = !0);
          }
          e.__webglCustomAttributesList.push(n);
        }
    }
    function i(e, t) {
      return !e.material || e.material instanceof THREE.MeshFaceMaterial
        ? t.materialIndex >= 0
          ? e.geometry.materials[t.materialIndex]
          : void 0
        : e.material;
    }
    function r(e) {
      return (
        (!(e instanceof THREE.MeshBasicMaterial) || !!e.envMap) &&
        !(e instanceof THREE.MeshDepthMaterial) &&
        (e && void 0 !== e.shading && e.shading === THREE.SmoothShading
          ? THREE.SmoothShading
          : THREE.FlatShading)
      );
    }
    function o(e) {
      return !!e.map || !!e.lightMap || e instanceof THREE.ShaderMaterial;
    }
    function n(e, t, i) {
      var r,
        o,
        n,
        a,
        s = e.vertices;
      a = s.length;
      var l = e.colors,
        h = l.length,
        c = e.__vertexArray,
        f = e.__colorArray,
        u = e.__sortArray,
        p = e.verticesNeedUpdate,
        d = e.colorsNeedUpdate,
        E = e.__webglCustomAttributesList;
      if (i.sortParticles) {
        for (ef.copy(ec), ef.multiplySelf(i.matrixWorld), r = 0; r < a; r++)
          (o = s[r]), eu.copy(o), ef.multiplyVector3(eu), (u[r] = [eu.z, r]);
        for (
          u.sort(function (e, t) {
            return t[0] - e[0];
          }),
            r = 0;
          r < a;
          r++
        )
          (o = s[u[r][1]]),
            (c[(n = 3 * r)] = o.x),
            (c[n + 1] = o.y),
            (c[n + 2] = o.z);
        for (r = 0; r < h; r++)
          (n = 3 * r),
            (o = l[u[r][1]]),
            (f[n] = o.r),
            (f[n + 1] = o.g),
            (f[n + 2] = o.b);
        if (E) {
          for (l = 0, h = E.length; l < h; l++)
            if (void 0 === (s = E[l]).boundTo || "vertices" === s.boundTo) {
              if (((n = 0), (o = s.value.length), 1 === s.size))
                for (r = 0; r < o; r++)
                  (a = u[r][1]), (s.array[r] = s.value[a]);
              else if (2 === s.size)
                for (r = 0; r < o; r++)
                  (a = u[r][1]),
                    (a = s.value[a]),
                    (s.array[n] = a.x),
                    (s.array[n + 1] = a.y),
                    (n += 2);
              else if (3 === s.size) {
                if ("c" === s.type)
                  for (r = 0; r < o; r++)
                    (a = u[r][1]),
                      (a = s.value[a]),
                      (s.array[n] = a.r),
                      (s.array[n + 1] = a.g),
                      (s.array[n + 2] = a.b),
                      (n += 3);
                else
                  for (r = 0; r < o; r++)
                    (a = u[r][1]),
                      (a = s.value[a]),
                      (s.array[n] = a.x),
                      (s.array[n + 1] = a.y),
                      (s.array[n + 2] = a.z),
                      (n += 3);
              } else if (4 === s.size)
                for (r = 0; r < o; r++)
                  (a = u[r][1]),
                    (a = s.value[a]),
                    (s.array[n] = a.x),
                    (s.array[n + 1] = a.y),
                    (s.array[n + 2] = a.z),
                    (s.array[n + 3] = a.w),
                    (n += 4);
            }
        }
      } else {
        if (p)
          for (r = 0; r < a; r++)
            (o = s[r]),
              (c[(n = 3 * r)] = o.x),
              (c[n + 1] = o.y),
              (c[n + 2] = o.z);
        if (d)
          for (r = 0; r < h; r++)
            (o = l[r]),
              (f[(n = 3 * r)] = o.r),
              (f[n + 1] = o.g),
              (f[n + 2] = o.b);
        if (E) {
          for (l = 0, h = E.length; l < h; l++)
            if (
              (s = E[l]).needsUpdate &&
              (void 0 === s.boundTo || "vertices" === s.boundTo)
            ) {
              if (((o = s.value.length), (n = 0), 1 === s.size))
                for (r = 0; r < o; r++) s.array[r] = s.value[r];
              else if (2 === s.size)
                for (r = 0; r < o; r++)
                  (a = s.value[r]),
                    (s.array[n] = a.x),
                    (s.array[n + 1] = a.y),
                    (n += 2);
              else if (3 === s.size) {
                if ("c" === s.type)
                  for (r = 0; r < o; r++)
                    (a = s.value[r]),
                      (s.array[n] = a.r),
                      (s.array[n + 1] = a.g),
                      (s.array[n + 2] = a.b),
                      (n += 3);
                else
                  for (r = 0; r < o; r++)
                    (a = s.value[r]),
                      (s.array[n] = a.x),
                      (s.array[n + 1] = a.y),
                      (s.array[n + 2] = a.z),
                      (n += 3);
              } else if (4 === s.size)
                for (r = 0; r < o; r++)
                  (a = s.value[r]),
                    (s.array[n] = a.x),
                    (s.array[n + 1] = a.y),
                    (s.array[n + 2] = a.z),
                    (s.array[n + 3] = a.w),
                    (n += 4);
            }
        }
      }
      if (
        ((p || i.sortParticles) &&
          (U.bindBuffer(U.ARRAY_BUFFER, e.__webglVertexBuffer),
          U.bufferData(U.ARRAY_BUFFER, c, t)),
        (d || i.sortParticles) &&
          (U.bindBuffer(U.ARRAY_BUFFER, e.__webglColorBuffer),
          U.bufferData(U.ARRAY_BUFFER, f, t)),
        E)
      )
        for (l = 0, h = E.length; l < h; l++)
          ((s = E[l]).needsUpdate || i.sortParticles) &&
            (U.bindBuffer(U.ARRAY_BUFFER, s.buffer),
            U.bufferData(U.ARRAY_BUFFER, s.array, t));
    }
    function a(e, t) {
      return t.z - e.z;
    }
    function s(e, t) {
      return t[1] - e[1];
    }
    function l(e, t, i) {
      if (e.length)
        for (var r = 0, o = e.length; r < o; r++)
          (k = B = null),
            (O = I = j = G = Q = Z = X = -1),
            (ed = !0),
            e[r].render(t, i, es, el),
            (k = B = null),
            (O = I = j = G = Q = Z = X = -1),
            (ed = !0);
    }
    function h(e, t, i, r, o, n, a, s) {
      var l, h, c, f;
      t
        ? ((h = e.length - 1), (f = t = -1))
        : ((h = 0), (t = e.length), (f = 1));
      for (var u = h; u !== t; u += f)
        if ((l = e[u]).render) {
          if (((h = l.object), (c = l.buffer), s)) l = s;
          else {
            if (!(l = l[i])) continue;
            a &&
              D.setBlending(
                l.blending,
                l.blendEquation,
                l.blendSrc,
                l.blendDst
              ),
              D.setDepthTest(l.depthTest),
              D.setDepthWrite(l.depthWrite),
              g(l.polygonOffset, l.polygonOffsetFactor, l.polygonOffsetUnits);
          }
          D.setObjectFaces(h),
            c instanceof THREE.BufferGeometry
              ? D.renderBufferDirect(r, o, n, l, c, h)
              : D.renderBuffer(r, o, n, l, c, h);
        }
    }
    function c(e, t, i, r, o, n, a) {
      for (var s, l, h = 0, c = e.length; h < c; h++)
        if ((l = (s = e[h]).object).visible) {
          if (a) s = a;
          else {
            if (!(s = s[t])) continue;
            n &&
              D.setBlending(
                s.blending,
                s.blendEquation,
                s.blendSrc,
                s.blendDst
              ),
              D.setDepthTest(s.depthTest),
              D.setDepthWrite(s.depthWrite),
              g(s.polygonOffset, s.polygonOffsetFactor, s.polygonOffsetUnits);
          }
          D.renderImmediateObject(i, r, o, s, l);
        }
    }
    function f(e, t, i) {
      e.push({ buffer: t, object: i, opaque: null, transparent: null });
    }
    function u(e) {
      for (var t in e.attributes) if (e.attributes[t].needsUpdate) return !0;
      return !1;
    }
    function p(e) {
      for (var t in e.attributes) e.attributes[t].needsUpdate = !1;
    }
    function d(e, t) {
      for (var i = e.length - 1; i >= 0; i--)
        e[i].object === t && e.splice(i, 1);
    }
    function E(e, t) {
      for (var i = e.length - 1; i >= 0; i--) e[i] === t && e.splice(i, 1);
    }
    function m(e, t, i, r, o) {
      r.needsUpdate &&
        (r.program && D.deallocateMaterial(r),
        D.initMaterial(r, t, i, o),
        (r.needsUpdate = !1)),
        r.morphTargets &&
          !o.__webglMorphTargetInfluences &&
          (o.__webglMorphTargetInfluences = new Float32Array(
            D.maxMorphTargets
          ));
      var n = !1,
        a = r.program,
        s = a.uniforms,
        l = r.uniforms;
      if (
        (a !== B && (U.useProgram(a), (B = a), (n = !0)),
        r.id !== O && ((O = r.id), (n = !0)),
        (n || e !== k) &&
          (U.uniformMatrix4fv(s.projectionMatrix, !1, e._projectionMatrixArray),
          e !== k && (k = e)),
        n)
      ) {
        if (
          (i &&
            r.fog &&
            ((l.fogColor.value = i.color),
            i instanceof THREE.Fog
              ? ((l.fogNear.value = i.near), (l.fogFar.value = i.far))
              : i instanceof THREE.FogExp2 && (l.fogDensity.value = i.density)),
          r instanceof THREE.MeshPhongMaterial ||
            r instanceof THREE.MeshLambertMaterial ||
            r.lights)
        ) {
          if (ed) {
            for (
              var h,
                c,
                f,
                u,
                p = 0,
                d = 0,
                E = 0,
                m = eE,
                v = m.directional.colors,
                g = m.directional.positions,
                $ = m.point.colors,
                R = m.point.positions,
                y = m.point.distances,
                H = m.spot.colors,
                b = m.spot.positions,
                w = m.spot.distances,
                S = m.spot.directions,
                C = m.spot.angles,
                M = m.spot.exponents,
                A = 0,
                L = 0,
                P = 0,
                F = (u = 0),
                i = (F = 0),
                n = t.length;
              i < n;
              i++
            )
              !(h = t[i]).onlyShadow &&
                h.visible &&
                ((c = h.color),
                (f = h.intensity),
                (u = h.distance),
                h instanceof THREE.AmbientLight
                  ? D.gammaInput
                    ? ((p += c.r * c.r), (d += c.g * c.g), (E += c.b * c.b))
                    : ((p += c.r), (d += c.g), (E += c.b))
                  : h instanceof THREE.DirectionalLight
                  ? ((u = 3 * A),
                    D.gammaInput
                      ? ((v[u] = c.r * c.r * f * f),
                        (v[u + 1] = c.g * c.g * f * f),
                        (v[u + 2] = c.b * c.b * f * f))
                      : ((v[u] = c.r * f),
                        (v[u + 1] = c.g * f),
                        (v[u + 2] = c.b * f)),
                    ep.copy(h.matrixWorld.getPosition()),
                    ep.subSelf(h.target.matrixWorld.getPosition()),
                    ep.normalize(),
                    (g[u] = ep.x),
                    (g[u + 1] = ep.y),
                    (g[u + 2] = ep.z),
                    (A += 1))
                  : h instanceof THREE.PointLight
                  ? ((F = 3 * L),
                    D.gammaInput
                      ? (($[F] = c.r * c.r * f * f),
                        ($[F + 1] = c.g * c.g * f * f),
                        ($[F + 2] = c.b * c.b * f * f))
                      : (($[F] = c.r * f),
                        ($[F + 1] = c.g * f),
                        ($[F + 2] = c.b * f)),
                    (c = h.matrixWorld.getPosition()),
                    (R[F] = c.x),
                    (R[F + 1] = c.y),
                    (R[F + 2] = c.z),
                    (y[L] = u),
                    (L += 1))
                  : h instanceof THREE.SpotLight &&
                    ((F = 3 * P),
                    D.gammaInput
                      ? ((H[F] = c.r * c.r * f * f),
                        (H[F + 1] = c.g * c.g * f * f),
                        (H[F + 2] = c.b * c.b * f * f))
                      : ((H[F] = c.r * f),
                        (H[F + 1] = c.g * f),
                        (H[F + 2] = c.b * f)),
                    (c = h.matrixWorld.getPosition()),
                    (b[F] = c.x),
                    (b[F + 1] = c.y),
                    (b[F + 2] = c.z),
                    (w[P] = u),
                    ep.copy(c),
                    ep.subSelf(h.target.matrixWorld.getPosition()),
                    ep.normalize(),
                    (S[F] = ep.x),
                    (S[F + 1] = ep.y),
                    (S[F + 2] = ep.z),
                    (C[P] = Math.cos(h.angle)),
                    (M[P] = h.exponent),
                    (P += 1)));
            for (i = 3 * A, n = v.length; i < n; i++) v[i] = 0;
            for (i = 3 * L, n = $.length; i < n; i++) $[i] = 0;
            for (i = 3 * P, n = H.length; i < n; i++) H[i] = 0;
            (m.directional.length = A),
              (m.point.length = L),
              (m.spot.length = P),
              (m.ambient[0] = p),
              (m.ambient[1] = d),
              (m.ambient[2] = E),
              (ed = !1);
          }
          (i = eE),
            (l.ambientLightColor.value = i.ambient),
            (l.directionalLightColor.value = i.directional.colors),
            (l.directionalLightDirection.value = i.directional.positions),
            (l.pointLightColor.value = i.point.colors),
            (l.pointLightPosition.value = i.point.positions),
            (l.pointLightDistance.value = i.point.distances),
            (l.spotLightColor.value = i.spot.colors),
            (l.spotLightPosition.value = i.spot.positions),
            (l.spotLightDistance.value = i.spot.distances),
            (l.spotLightDirection.value = i.spot.directions),
            (l.spotLightAngle.value = i.spot.angles),
            (l.spotLightExponent.value = i.spot.exponents);
        }
        if (
          ((r instanceof THREE.MeshBasicMaterial ||
            r instanceof THREE.MeshLambertMaterial ||
            r instanceof THREE.MeshPhongMaterial) &&
            ((l.opacity.value = r.opacity),
            D.gammaInput
              ? l.diffuse.value.copyGammaToLinear(r.color)
              : (l.diffuse.value = r.color),
            (l.map.texture = r.map) &&
              l.offsetRepeat.value.set(
                r.map.offset.x,
                r.map.offset.y,
                r.map.repeat.x,
                r.map.repeat.y
              ),
            (l.lightMap.texture = r.lightMap),
            (l.envMap.texture = r.envMap),
            (l.flipEnvMap.value =
              r.envMap instanceof THREE.WebGLRenderTargetCube ? 1 : -1),
            (l.reflectivity.value = r.reflectivity),
            (l.refractionRatio.value = r.refractionRatio),
            (l.combine.value = r.combine),
            (l.useRefract.value =
              r.envMap &&
              r.envMap.mapping instanceof THREE.CubeRefractionMapping)),
          r instanceof THREE.LineBasicMaterial
            ? ((l.diffuse.value = r.color), (l.opacity.value = r.opacity))
            : r instanceof THREE.ParticleBasicMaterial
            ? ((l.psColor.value = r.color),
              (l.opacity.value = r.opacity),
              (l.size.value = r.size),
              (l.scale.value = x.height / 2),
              (l.map.texture = r.map))
            : r instanceof THREE.MeshPhongMaterial
            ? ((l.shininess.value = r.shininess),
              D.gammaInput
                ? (l.ambient.value.copyGammaToLinear(r.ambient),
                  l.emissive.value.copyGammaToLinear(r.emissive),
                  l.specular.value.copyGammaToLinear(r.specular))
                : ((l.ambient.value = r.ambient),
                  (l.emissive.value = r.emissive),
                  (l.specular.value = r.specular)),
              r.wrapAround && l.wrapRGB.value.copy(r.wrapRGB))
            : r instanceof THREE.MeshLambertMaterial
            ? (D.gammaInput
                ? (l.ambient.value.copyGammaToLinear(r.ambient),
                  l.emissive.value.copyGammaToLinear(r.emissive))
                : ((l.ambient.value = r.ambient),
                  (l.emissive.value = r.emissive)),
              r.wrapAround && l.wrapRGB.value.copy(r.wrapRGB))
            : r instanceof THREE.MeshDepthMaterial
            ? ((l.mNear.value = e.near),
              (l.mFar.value = e.far),
              (l.opacity.value = r.opacity))
            : r instanceof THREE.MeshNormalMaterial &&
              (l.opacity.value = r.opacity),
          o.receiveShadow && !r._shadowPass && l.shadowMatrix)
        )
          for (n = i = 0, h = t.length; n < h; n++)
            (p = t[n]).castShadow &&
              (p instanceof THREE.SpotLight ||
                (p instanceof THREE.DirectionalLight && !p.shadowCascade)) &&
              ((l.shadowMap.texture[i] = p.shadowMap),
              (l.shadowMapSize.value[i] = p.shadowMapSize),
              (l.shadowMatrix.value[i] = p.shadowMatrix),
              (l.shadowDarkness.value[i] = p.shadowDarkness),
              (l.shadowBias.value[i] = p.shadowBias),
              i++);
        for (t = r.uniformsList, l = 0, i = t.length; l < i; l++)
          if ((p = a.uniforms[t[l][1]])) {
            if (((d = (n = t[l][0]).type), (h = n.value), "i" === d))
              U.uniform1i(p, h);
            else if ("f" === d) U.uniform1f(p, h);
            else if ("v2" === d) U.uniform2f(p, h.x, h.y);
            else if ("v3" === d) U.uniform3f(p, h.x, h.y, h.z);
            else if ("v4" === d) U.uniform4f(p, h.x, h.y, h.z, h.w);
            else if ("c" === d) U.uniform3f(p, h.r, h.g, h.b);
            else if ("iv1" === d) U.uniform1iv(p, h);
            else if ("iv" === d) U.uniform3iv(p, h);
            else if ("fv1" === d) U.uniform1fv(p, h);
            else if ("fv" === d) U.uniform3fv(p, h);
            else if ("v2v" === d) {
              for (
                void 0 === n._array &&
                  (n._array = new Float32Array(2 * h.length)),
                  d = 0,
                  E = h.length;
                d < E;
                d++
              )
                (m = 2 * d), (n._array[m] = h[d].x), (n._array[m + 1] = h[d].y);
              U.uniform2fv(p, n._array);
            } else if ("v3v" === d) {
              for (
                void 0 === n._array &&
                  (n._array = new Float32Array(3 * h.length)),
                  d = 0,
                  E = h.length;
                d < E;
                d++
              )
                (m = 3 * d),
                  (n._array[m] = h[d].x),
                  (n._array[m + 1] = h[d].y),
                  (n._array[m + 2] = h[d].z);
              U.uniform3fv(p, n._array);
            } else if ("v4v" === d) {
              for (
                void 0 === n._array &&
                  (n._array = new Float32Array(4 * h.length)),
                  d = 0,
                  E = h.length;
                d < E;
                d++
              )
                (m = 4 * d),
                  (n._array[m] = h[d].x),
                  (n._array[m + 1] = h[d].y),
                  (n._array[m + 2] = h[d].z),
                  (n._array[m + 3] = h[d].w);
              U.uniform4fv(p, n._array);
            } else if ("m4" === d)
              void 0 === n._array && (n._array = new Float32Array(16)),
                h.flattenToArray(n._array),
                U.uniformMatrix4fv(p, !1, n._array);
            else if ("m4v" === d) {
              for (
                void 0 === n._array &&
                  (n._array = new Float32Array(16 * h.length)),
                  d = 0,
                  E = h.length;
                d < E;
                d++
              )
                h[d].flattenToArrayOffset(n._array, 16 * d);
              U.uniformMatrix4fv(p, !1, n._array);
            } else if ("t" === d) {
              if ((U.uniform1i(p, h), (p = n.texture))) {
                if (p.image instanceof Array && 6 === p.image.length) {
                  if (6 === (n = p).image.length) {
                    if (n.needsUpdate) {
                      for (
                        n.image.__webglTextureCube ||
                          (n.image.__webglTextureCube = U.createTexture()),
                          U.activeTexture(U.TEXTURE0 + h),
                          U.bindTexture(
                            U.TEXTURE_CUBE_MAP,
                            n.image.__webglTextureCube
                          ),
                          U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL, n.flipY),
                          h = [],
                          p = 0;
                        p < 6;
                        p++
                      )
                        (d = h),
                          (E = p),
                          D.autoScaleCubemaps
                            ? ((m = n.image[p]),
                              (g = ev),
                              (m.width <= g && m.height <= g) ||
                                (($ = Math.max(m.width, m.height)),
                                (v = Math.floor((m.width * g) / $)),
                                (g = Math.floor((m.height * g) / $)),
                                (($ = document.createElement("canvas")).width =
                                  v),
                                ($.height = g),
                                $.getContext("2d").drawImage(
                                  m,
                                  0,
                                  0,
                                  m.width,
                                  m.height,
                                  0,
                                  0,
                                  v,
                                  g
                                ),
                                (m = $)))
                            : (m = n.image[p]),
                          (d[E] = m);
                      for (
                        d =
                          ((p = h[0]).width & (p.width - 1)) == 0 &&
                          (p.height & (p.height - 1)) == 0,
                          E = _(n.format),
                          m = _(n.type),
                          T(U.TEXTURE_CUBE_MAP, n, d),
                          p = 0;
                        p < 6;
                        p++
                      )
                        U.texImage2D(
                          U.TEXTURE_CUBE_MAP_POSITIVE_X + p,
                          0,
                          E,
                          E,
                          m,
                          h[p]
                        );
                      n.generateMipmaps &&
                        d &&
                        U.generateMipmap(U.TEXTURE_CUBE_MAP),
                        (n.needsUpdate = !1),
                        n.onUpdate && n.onUpdate();
                    } else
                      U.activeTexture(U.TEXTURE0 + h),
                        U.bindTexture(
                          U.TEXTURE_CUBE_MAP,
                          n.image.__webglTextureCube
                        );
                  }
                } else
                  p instanceof THREE.WebGLRenderTargetCube
                    ? ((n = p),
                      U.activeTexture(U.TEXTURE0 + h),
                      U.bindTexture(U.TEXTURE_CUBE_MAP, n.__webglTexture))
                    : D.setTexture(p, h);
              }
            } else if ("tv" === d) {
              if (void 0 === n._array)
                for (n._array = [], d = 0, E = n.texture.length; d < E; d++)
                  n._array[d] = h + d;
              for (
                U.uniform1iv(p, n._array), d = 0, E = n.texture.length;
                d < E;
                d++
              )
                (p = n.texture[d]) && D.setTexture(p, n._array[d]);
            }
          }
        (r instanceof THREE.ShaderMaterial ||
          r instanceof THREE.MeshPhongMaterial ||
          r.envMap) &&
          null !== s.cameraPosition &&
          ((t = e.matrixWorld.getPosition()),
          U.uniform3f(s.cameraPosition, t.x, t.y, t.z)),
          (r instanceof THREE.MeshPhongMaterial ||
            r instanceof THREE.MeshLambertMaterial ||
            r instanceof THREE.ShaderMaterial ||
            r.skinning) &&
            null !== s.viewMatrix &&
            U.uniformMatrix4fv(s.viewMatrix, !1, e._viewMatrixArray);
      }
      return (
        r.skinning &&
          (eT && o.useVertexTexture
            ? null !== s.boneTexture &&
              (U.uniform1i(s.boneTexture, 12), D.setTexture(o.boneTexture, 12))
            : null !== s.boneGlobalMatrices &&
              U.uniformMatrix4fv(s.boneGlobalMatrices, !1, o.boneMatrices)),
        U.uniformMatrix4fv(s.modelViewMatrix, !1, o._modelViewMatrix.elements),
        s.normalMatrix &&
          U.uniformMatrix3fv(s.normalMatrix, !1, o._normalMatrix.elements),
        null !== s.objectMatrix &&
          U.uniformMatrix4fv(s.objectMatrix, !1, o.matrixWorld.elements),
        a
      );
    }
    function v(e, t) {
      e._modelViewMatrix.multiply(t.matrixWorldInverse, e.matrixWorld),
        e._normalMatrix.getInverse(e._modelViewMatrix),
        e._normalMatrix.transpose();
    }
    function g(e, t, i) {
      J !== e &&
        (e ? U.enable(U.POLYGON_OFFSET_FILL) : U.disable(U.POLYGON_OFFSET_FILL),
        (J = e)),
        e &&
          (ee !== t || et !== i) &&
          (U.polygonOffset(t, i), (ee = t), (et = i));
    }
    function $(e, t) {
      var i;
      return ("fragment" === e
        ? (i = U.createShader(U.FRAGMENT_SHADER))
        : "vertex" === e && (i = U.createShader(U.VERTEX_SHADER)),
      U.shaderSource(i, t),
      U.compileShader(i),
      U.getShaderParameter(i, U.COMPILE_STATUS))
        ? i
        : (console.error(U.getShaderInfoLog(i)), console.error(t), null);
    }
    function T(e, t, i) {
      i
        ? (U.texParameteri(e, U.TEXTURE_WRAP_S, _(t.wrapS)),
          U.texParameteri(e, U.TEXTURE_WRAP_T, _(t.wrapT)),
          U.texParameteri(e, U.TEXTURE_MAG_FILTER, _(t.magFilter)),
          U.texParameteri(e, U.TEXTURE_MIN_FILTER, _(t.minFilter)))
        : (U.texParameteri(e, U.TEXTURE_WRAP_S, U.CLAMP_TO_EDGE),
          U.texParameteri(e, U.TEXTURE_WRAP_T, U.CLAMP_TO_EDGE),
          U.texParameteri(e, U.TEXTURE_MAG_FILTER, y(t.magFilter)),
          U.texParameteri(e, U.TEXTURE_MIN_FILTER, y(t.minFilter))),
        F &&
          t.type !== THREE.FloatType &&
          (t.anisotropy > 1 || t.__oldAnisotropy) &&
          (U.texParameterf(
            e,
            F.TEXTURE_MAX_ANISOTROPY_EXT,
            Math.min(t.anisotropy, eg)
          ),
          (t.__oldAnisotropy = t.anisotropy));
    }
    function R(e, t) {
      U.bindRenderbuffer(U.RENDERBUFFER, e),
        t.depthBuffer && !t.stencilBuffer
          ? (U.renderbufferStorage(
              U.RENDERBUFFER,
              U.DEPTH_COMPONENT16,
              t.width,
              t.height
            ),
            U.framebufferRenderbuffer(
              U.FRAMEBUFFER,
              U.DEPTH_ATTACHMENT,
              U.RENDERBUFFER,
              e
            ))
          : t.depthBuffer && t.stencilBuffer
          ? (U.renderbufferStorage(
              U.RENDERBUFFER,
              U.DEPTH_STENCIL,
              t.width,
              t.height
            ),
            U.framebufferRenderbuffer(
              U.FRAMEBUFFER,
              U.DEPTH_STENCIL_ATTACHMENT,
              U.RENDERBUFFER,
              e
            ))
          : U.renderbufferStorage(U.RENDERBUFFER, U.RGBA4, t.width, t.height);
    }
    function y(e) {
      return e === THREE.NearestFilter ||
        e === THREE.NearestMipMapNearestFilter ||
        e === THREE.NearestMipMapLinearFilter
        ? U.NEAREST
        : U.LINEAR;
    }
    function _(e) {
      return e === THREE.RepeatWrapping
        ? U.REPEAT
        : e === THREE.ClampToEdgeWrapping
        ? U.CLAMP_TO_EDGE
        : e === THREE.MirroredRepeatWrapping
        ? U.MIRRORED_REPEAT
        : e === THREE.NearestFilter
        ? U.NEAREST
        : e === THREE.NearestMipMapNearestFilter
        ? U.NEAREST_MIPMAP_NEAREST
        : e === THREE.NearestMipMapLinearFilter
        ? U.NEAREST_MIPMAP_LINEAR
        : e === THREE.LinearFilter
        ? U.LINEAR
        : e === THREE.LinearMipMapNearestFilter
        ? U.LINEAR_MIPMAP_NEAREST
        : e === THREE.LinearMipMapLinearFilter
        ? U.LINEAR_MIPMAP_LINEAR
        : e === THREE.UnsignedByteType
        ? U.UNSIGNED_BYTE
        : e === THREE.UnsignedShort4444Type
        ? U.UNSIGNED_SHORT_4_4_4_4
        : e === THREE.UnsignedShort5551Type
        ? U.UNSIGNED_SHORT_5_5_5_1
        : e === THREE.UnsignedShort565Type
        ? U.UNSIGNED_SHORT_5_6_5
        : e === THREE.ByteType
        ? U.BYTE
        : e === THREE.ShortType
        ? U.SHORT
        : e === THREE.UnsignedShortType
        ? U.UNSIGNED_SHORT
        : e === THREE.IntType
        ? U.INT
        : e === THREE.UnsignedIntType
        ? U.UNSIGNED_INT
        : e === THREE.FloatType
        ? U.FLOAT
        : e === THREE.AlphaFormat
        ? U.ALPHA
        : e === THREE.RGBFormat
        ? U.RGB
        : e === THREE.RGBAFormat
        ? U.RGBA
        : e === THREE.LuminanceFormat
        ? U.LUMINANCE
        : e === THREE.LuminanceAlphaFormat
        ? U.LUMINANCE_ALPHA
        : e === THREE.AddEquation
        ? U.FUNC_ADD
        : e === THREE.SubtractEquation
        ? U.FUNC_SUBTRACT
        : e === THREE.ReverseSubtractEquation
        ? U.FUNC_REVERSE_SUBTRACT
        : e === THREE.ZeroFactor
        ? U.ZERO
        : e === THREE.OneFactor
        ? U.ONE
        : e === THREE.SrcColorFactor
        ? U.SRC_COLOR
        : e === THREE.OneMinusSrcColorFactor
        ? U.ONE_MINUS_SRC_COLOR
        : e === THREE.SrcAlphaFactor
        ? U.SRC_ALPHA
        : e === THREE.OneMinusSrcAlphaFactor
        ? U.ONE_MINUS_SRC_ALPHA
        : e === THREE.DstAlphaFactor
        ? U.DST_ALPHA
        : e === THREE.OneMinusDstAlphaFactor
        ? U.ONE_MINUS_DST_ALPHA
        : e === THREE.DstColorFactor
        ? U.DST_COLOR
        : e === THREE.OneMinusDstColorFactor
        ? U.ONE_MINUS_DST_COLOR
        : e === THREE.SrcAlphaSaturateFactor
        ? U.SRC_ALPHA_SATURATE
        : 0;
    }
    console.log("THREE.WebGLRenderer", THREE.REVISION);
    var e = e || {},
      x = void 0 !== e.canvas ? e.canvas : document.createElement("canvas"),
      H = void 0 !== e.precision ? e.precision : "highp",
      b = void 0 === e.alpha || e.alpha,
      w = void 0 === e.premultipliedAlpha || e.premultipliedAlpha,
      S = void 0 !== e.antialias && e.antialias,
      C = void 0 === e.stencil || e.stencil,
      M = void 0 !== e.preserveDrawingBuffer && e.preserveDrawingBuffer,
      A = new THREE.Color(void 0 !== e.clearColor ? e.clearColor : 0),
      L = void 0 !== e.clearAlpha ? e.clearAlpha : 0,
      P = void 0 !== e.maxLights ? e.maxLights : 4;
    (this.domElement = x),
      (this.context = null),
      (this.autoUpdateScene =
        this.autoUpdateObjects =
        this.sortObjects =
        this.autoClearStencil =
        this.autoClearDepth =
        this.autoClearColor =
        this.autoClear =
          !0),
      (this.shadowMapEnabled =
        this.physicallyBasedShading =
        this.gammaOutput =
        this.gammaInput =
          !1),
      (this.shadowMapCullFrontFaces =
        this.shadowMapSoft =
        this.shadowMapAutoUpdate =
          !0),
      (this.shadowMapCascade = this.shadowMapDebug = !1),
      (this.maxMorphTargets = 8),
      (this.maxMorphNormals = 4),
      (this.autoScaleCubemaps = !0),
      (this.renderPluginsPre = []),
      (this.renderPluginsPost = []),
      (this.info = {
        memory: { programs: 0, geometries: 0, textures: 0 },
        render: { calls: 0, vertices: 0, faces: 0, points: 0 },
      });
    var U,
      F,
      D = this,
      V = [],
      z = 0,
      B = null,
      N = null,
      O = -1,
      I = null,
      k = null,
      W = 0,
      G = -1,
      j = -1,
      X = -1,
      Y = -1,
      q = -1,
      K = -1,
      Z = -1,
      Q = -1,
      J = null,
      ee = null,
      et = null,
      ei = null,
      er = 0,
      eo = 0,
      en = 0,
      ea = 0,
      es = 0,
      el = 0,
      eh = new THREE.Frustum(),
      ec = new THREE.Matrix4(),
      ef = new THREE.Matrix4(),
      eu = new THREE.Vector4(),
      ep = new THREE.Vector3(),
      ed = !0,
      eE = {
        ambient: [0, 0, 0],
        directional: { length: 0, colors: [], positions: [] },
        point: { length: 0, colors: [], positions: [], distances: [] },
        spot: {
          length: 0,
          colors: [],
          positions: [],
          distances: [],
          directions: [],
          angles: [],
          exponents: [],
        },
      };
    try {
      if (
        !(U = x.getContext("experimental-webgl", {
          alpha: b,
          premultipliedAlpha: w,
          antialias: S,
          stencil: C,
          preserveDrawingBuffer: M,
        }))
      )
        throw "Error creating WebGL context.";
    } catch (em) {
      console.error(em);
    }
    (e = U.getExtension("OES_texture_float")),
      (b = U.getExtension("OES_standard_derivatives")),
      (F =
        U.getExtension("EXT_texture_filter_anisotropic") ||
        U.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
        U.getExtension("WEBKIT_EXT_texture_filter_anisotropic")),
      e || console.log("THREE.WebGLRenderer: Float textures not supported."),
      b ||
        console.log("THREE.WebGLRenderer: Standard derivatives not supported."),
      F ||
        console.log(
          "THREE.WebGLRenderer: Anisotropic texture filtering not supported."
        ),
      U.clearColor(0, 0, 0, 1),
      U.clearDepth(1),
      U.clearStencil(0),
      U.enable(U.DEPTH_TEST),
      U.depthFunc(U.LEQUAL),
      U.frontFace(U.CCW),
      U.cullFace(U.BACK),
      U.enable(U.CULL_FACE),
      U.enable(U.BLEND),
      U.blendEquation(U.FUNC_ADD),
      U.blendFunc(U.SRC_ALPHA, U.ONE_MINUS_SRC_ALPHA),
      U.clearColor(A.r, A.g, A.b, L),
      (this.context = U),
      (b = U.getParameter(U.MAX_VERTEX_TEXTURE_IMAGE_UNITS)),
      U.getParameter(U.MAX_TEXTURE_SIZE);
    var ev = U.getParameter(U.MAX_CUBE_MAP_TEXTURE_SIZE),
      eg = F ? U.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0,
      e$ = b > 0,
      eT = e$ && e;
    (this.getContext = function () {
      return U;
    }),
      (this.supportsVertexTextures = function () {
        return e$;
      }),
      (this.getMaxAnisotropy = function () {
        return eg;
      }),
      (this.setSize = function (e, t) {
        (x.width = e),
          (x.height = t),
          this.setViewport(0, 0, x.width, x.height);
      }),
      (this.setViewport = function (e, t, i, r) {
        (er = void 0 !== e ? e : 0),
          (eo = void 0 !== t ? t : 0),
          (en = void 0 !== i ? i : x.width),
          (ea = void 0 !== r ? r : x.height),
          U.viewport(er, eo, en, ea);
      }),
      (this.setScissor = function (e, t, i, r) {
        U.scissor(e, t, i, r);
      }),
      (this.enableScissorTest = function (e) {
        e ? U.enable(U.SCISSOR_TEST) : U.disable(U.SCISSOR_TEST);
      }),
      (this.setClearColorHex = function (e, t) {
        A.setHex(e), (L = t), U.clearColor(A.r, A.g, A.b, L);
      }),
      (this.setClearColor = function (e, t) {
        A.copy(e), (L = t), U.clearColor(A.r, A.g, A.b, L);
      }),
      (this.getClearColor = function () {
        return A;
      }),
      (this.getClearAlpha = function () {
        return L;
      }),
      (this.clear = function (e, t, i) {
        var r = 0;
        (void 0 === e || e) && (r |= U.COLOR_BUFFER_BIT),
          (void 0 === t || t) && (r |= U.DEPTH_BUFFER_BIT),
          (void 0 === i || i) && (r |= U.STENCIL_BUFFER_BIT),
          U.clear(r);
      }),
      (this.clearTarget = function (e, t, i, r) {
        this.setRenderTarget(e), this.clear(t, i, r);
      }),
      (this.addPostPlugin = function (e) {
        e.init(this), this.renderPluginsPost.push(e);
      }),
      (this.addPrePlugin = function (e) {
        e.init(this), this.renderPluginsPre.push(e);
      }),
      (this.deallocateObject = function (e) {
        if (e.__webglInit) {
          if (
            ((e.__webglInit = !1),
            delete e._modelViewMatrix,
            delete e._normalMatrix,
            delete e._normalMatrixArray,
            delete e._modelViewMatrixArray,
            delete e._objectMatrixArray,
            e instanceof THREE.Mesh)
          )
            for (var t in e.geometry.geometryGroups) {
              var i = e.geometry.geometryGroups[t];
              U.deleteBuffer(i.__webglVertexBuffer),
                U.deleteBuffer(i.__webglNormalBuffer),
                U.deleteBuffer(i.__webglTangentBuffer),
                U.deleteBuffer(i.__webglColorBuffer),
                U.deleteBuffer(i.__webglUVBuffer),
                U.deleteBuffer(i.__webglUV2Buffer),
                U.deleteBuffer(i.__webglSkinVertexABuffer),
                U.deleteBuffer(i.__webglSkinVertexBBuffer),
                U.deleteBuffer(i.__webglSkinIndicesBuffer),
                U.deleteBuffer(i.__webglSkinWeightsBuffer),
                U.deleteBuffer(i.__webglFaceBuffer),
                U.deleteBuffer(i.__webglLineBuffer);
              var r = void 0,
                o = void 0;
              if (i.numMorphTargets)
                for (r = 0, o = i.numMorphTargets; r < o; r++)
                  U.deleteBuffer(i.__webglMorphTargetsBuffers[r]);
              if (i.numMorphNormals)
                for (r = 0, o = i.numMorphNormals; r < o; r++)
                  U.deleteBuffer(i.__webglMorphNormalsBuffers[r]);
              if (i.__webglCustomAttributesList)
                for (r in ((r = void 0), i.__webglCustomAttributesList))
                  U.deleteBuffer(i.__webglCustomAttributesList[r].buffer);
              D.info.memory.geometries--;
            }
          else
            e instanceof THREE.Ribbon
              ? ((e = e.geometry),
                U.deleteBuffer(e.__webglVertexBuffer),
                U.deleteBuffer(e.__webglColorBuffer),
                D.info.memory.geometries--)
              : e instanceof THREE.Line
              ? ((e = e.geometry),
                U.deleteBuffer(e.__webglVertexBuffer),
                U.deleteBuffer(e.__webglColorBuffer),
                D.info.memory.geometries--)
              : e instanceof THREE.ParticleSystem &&
                ((e = e.geometry),
                U.deleteBuffer(e.__webglVertexBuffer),
                U.deleteBuffer(e.__webglColorBuffer),
                D.info.memory.geometries--);
        }
      }),
      (this.deallocateTexture = function (e) {
        e.__webglInit &&
          ((e.__webglInit = !1),
          U.deleteTexture(e.__webglTexture),
          D.info.memory.textures--);
      }),
      (this.deallocateRenderTarget = function (e) {
        if (e && e.__webglTexture) {
          if (
            (U.deleteTexture(e.__webglTexture),
            e instanceof THREE.WebGLRenderTargetCube)
          )
            for (var t = 0; t < 6; t++)
              U.deleteFramebuffer(e.__webglFramebuffer[t]),
                U.deleteRenderbuffer(e.__webglRenderbuffer[t]);
          else
            U.deleteFramebuffer(e.__webglFramebuffer),
              U.deleteRenderbuffer(e.__webglRenderbuffer);
        }
      }),
      (this.deallocateMaterial = function (e) {
        var t = e.program;
        if (t) {
          e.program = void 0;
          var i,
            r,
            o = !1,
            e = 0;
          for (i = V.length; e < i; e++)
            if ((r = V[e]).program === t) {
              r.usedTimes--, 0 === r.usedTimes && (o = !0);
              break;
            }
          if (o) {
            for (o = [], e = 0, i = V.length; e < i; e++)
              (r = V[e]).program !== t && o.push(r);
            (V = o), U.deleteProgram(t), D.info.memory.programs--;
          }
        }
      }),
      (this.updateShadowMap = function (e, t) {
        (B = null),
          (O = I = Q = Z = X = -1),
          (ed = !0),
          (j = G = -1),
          this.shadowMapPlugin.update(e, t);
      }),
      (this.renderBufferImmediate = function (e, t, i) {
        if (
          (e.hasPositions &&
            !e.__webglVertexBuffer &&
            (e.__webglVertexBuffer = U.createBuffer()),
          e.hasNormals &&
            !e.__webglNormalBuffer &&
            (e.__webglNormalBuffer = U.createBuffer()),
          e.hasUvs &&
            !e.__webglUvBuffer &&
            (e.__webglUvBuffer = U.createBuffer()),
          e.hasColors &&
            !e.__webglColorBuffer &&
            (e.__webglColorBuffer = U.createBuffer()),
          e.hasPositions &&
            (U.bindBuffer(U.ARRAY_BUFFER, e.__webglVertexBuffer),
            U.bufferData(U.ARRAY_BUFFER, e.positionArray, U.DYNAMIC_DRAW),
            U.enableVertexAttribArray(t.attributes.position),
            U.vertexAttribPointer(t.attributes.position, 3, U.FLOAT, !1, 0, 0)),
          e.hasNormals)
        ) {
          if (
            (U.bindBuffer(U.ARRAY_BUFFER, e.__webglNormalBuffer),
            i.shading === THREE.FlatShading)
          ) {
            var r,
              o,
              n,
              a,
              s,
              l,
              h,
              c,
              f,
              u,
              p,
              d = 3 * e.count;
            for (p = 0; p < d; p += 9)
              (r = (u = e.normalArray)[p]),
                (o = u[p + 1]),
                (n = u[p + 2]),
                (a = u[p + 3]),
                (l = u[p + 4]),
                (c = u[p + 5]),
                (s = u[p + 6]),
                (h = u[p + 7]),
                (f = u[p + 8]),
                (r = (r + a + s) / 3),
                (o = (o + l + h) / 3),
                (n = (n + c + f) / 3),
                (u[p] = r),
                (u[p + 1] = o),
                (u[p + 2] = n),
                (u[p + 3] = r),
                (u[p + 4] = o),
                (u[p + 5] = n),
                (u[p + 6] = r),
                (u[p + 7] = o),
                (u[p + 8] = n);
          }
          U.bufferData(U.ARRAY_BUFFER, e.normalArray, U.DYNAMIC_DRAW),
            U.enableVertexAttribArray(t.attributes.normal),
            U.vertexAttribPointer(t.attributes.normal, 3, U.FLOAT, !1, 0, 0);
        }
        e.hasUvs &&
          i.map &&
          (U.bindBuffer(U.ARRAY_BUFFER, e.__webglUvBuffer),
          U.bufferData(U.ARRAY_BUFFER, e.uvArray, U.DYNAMIC_DRAW),
          U.enableVertexAttribArray(t.attributes.uv),
          U.vertexAttribPointer(t.attributes.uv, 2, U.FLOAT, !1, 0, 0)),
          e.hasColors &&
            i.vertexColors !== THREE.NoColors &&
            (U.bindBuffer(U.ARRAY_BUFFER, e.__webglColorBuffer),
            U.bufferData(U.ARRAY_BUFFER, e.colorArray, U.DYNAMIC_DRAW),
            U.enableVertexAttribArray(t.attributes.color),
            U.vertexAttribPointer(t.attributes.color, 3, U.FLOAT, !1, 0, 0)),
          U.drawArrays(U.TRIANGLES, 0, e.count),
          (e.count = 0);
      }),
      (this.renderBufferDirect = function (e, t, i, r, o, n) {
        if (
          !1 !== r.visible &&
          ((e = (i = m(e, t, i, r, n)).attributes),
          (t = !1),
          (r = 16777215 * o.id + 2 * i.id + (r.wireframe ? 1 : 0)) !== I &&
            ((I = r), (t = !0)),
          n instanceof THREE.Mesh)
        )
          for (
            (n = o.offsets).length > 1 && (t = !0), r = 0, i = n.length;
            r < i;
            ++r
          ) {
            var a = n[r].index;
            if (t) {
              var s = o.attributes.position,
                l = s.itemSize;
              U.bindBuffer(U.ARRAY_BUFFER, s.buffer),
                U.vertexAttribPointer(e.position, l, U.FLOAT, !1, 0, a * l * 4),
                (s = o.attributes.normal),
                e.normal >= 0 &&
                  s &&
                  ((l = s.itemSize),
                  U.bindBuffer(U.ARRAY_BUFFER, s.buffer),
                  U.vertexAttribPointer(
                    e.normal,
                    l,
                    U.FLOAT,
                    !1,
                    0,
                    a * l * 4
                  )),
                (s = o.attributes.uv),
                e.uv >= 0 &&
                  s &&
                  (s.buffer
                    ? ((l = s.itemSize),
                      U.bindBuffer(U.ARRAY_BUFFER, s.buffer),
                      U.vertexAttribPointer(e.uv, l, U.FLOAT, !1, 0, a * l * 4),
                      U.enableVertexAttribArray(e.uv))
                    : U.disableVertexAttribArray(e.uv)),
                (s = o.attributes.color),
                e.color >= 0 &&
                  s &&
                  ((l = s.itemSize),
                  U.bindBuffer(U.ARRAY_BUFFER, s.buffer),
                  U.vertexAttribPointer(e.color, l, U.FLOAT, !1, 0, a * l * 4)),
                (s = o.attributes.tangent),
                e.tangent >= 0 &&
                  s &&
                  ((l = s.itemSize),
                  U.bindBuffer(U.ARRAY_BUFFER, s.buffer),
                  U.vertexAttribPointer(
                    e.tangent,
                    l,
                    U.FLOAT,
                    !1,
                    0,
                    a * l * 4
                  )),
                U.bindBuffer(U.ELEMENT_ARRAY_BUFFER, o.attributes.index.buffer);
            }
            U.drawElements(
              U.TRIANGLES,
              n[r].count,
              U.UNSIGNED_SHORT,
              2 * n[r].start
            ),
              D.info.render.calls++,
              (D.info.render.vertices = D.info.render.vertices + n[r].count),
              (D.info.render.faces = D.info.render.faces + n[r].count / 3);
          }
      }),
      (this.renderBuffer = function (e, t, i, r, o, n) {
        if (!1 !== r.visible) {
          var a,
            l,
            i = m(e, t, i, r, n),
            t = i.attributes,
            e = !1,
            i = 16777215 * o.id + 2 * i.id + (r.wireframe ? 1 : 0);
          if (
            (i !== I && ((I = i), (e = !0)), !r.morphTargets && t.position >= 0)
          )
            e &&
              (U.bindBuffer(U.ARRAY_BUFFER, o.__webglVertexBuffer),
              U.vertexAttribPointer(t.position, 3, U.FLOAT, !1, 0, 0));
          else if (n.morphTargetBase) {
            if (
              ((i = r.program.attributes),
              -1 !== n.morphTargetBase
                ? (U.bindBuffer(
                    U.ARRAY_BUFFER,
                    o.__webglMorphTargetsBuffers[n.morphTargetBase]
                  ),
                  U.vertexAttribPointer(i.position, 3, U.FLOAT, !1, 0, 0))
                : i.position >= 0 &&
                  (U.bindBuffer(U.ARRAY_BUFFER, o.__webglVertexBuffer),
                  U.vertexAttribPointer(i.position, 3, U.FLOAT, !1, 0, 0)),
              n.morphTargetForcedOrder.length)
            ) {
              var h = 0;
              for (
                l = n.morphTargetForcedOrder, a = n.morphTargetInfluences;
                h < r.numSupportedMorphTargets && h < l.length;

              )
                U.bindBuffer(
                  U.ARRAY_BUFFER,
                  o.__webglMorphTargetsBuffers[l[h]]
                ),
                  U.vertexAttribPointer(
                    i["morphTarget" + h],
                    3,
                    U.FLOAT,
                    !1,
                    0,
                    0
                  ),
                  r.morphNormals &&
                    (U.bindBuffer(
                      U.ARRAY_BUFFER,
                      o.__webglMorphNormalsBuffers[l[h]]
                    ),
                    U.vertexAttribPointer(
                      i["morphNormal" + h],
                      3,
                      U.FLOAT,
                      !1,
                      0,
                      0
                    )),
                  (n.__webglMorphTargetInfluences[h] = a[l[h]]),
                  h++;
            } else {
              l = [];
              var c,
                f = (a = n.morphTargetInfluences).length;
              for (c = 0; c < f; c++) (h = a[c]) > 0 && l.push([c, h]);
              for (
                l.length > r.numSupportedMorphTargets
                  ? (l.sort(s), (l.length = r.numSupportedMorphTargets))
                  : l.length > r.numSupportedMorphNormals
                  ? l.sort(s)
                  : 0 === l.length && l.push([0, 0]),
                  h = 0;
                h < r.numSupportedMorphTargets;

              )
                l[h]
                  ? ((c = l[h][0]),
                    U.bindBuffer(
                      U.ARRAY_BUFFER,
                      o.__webglMorphTargetsBuffers[c]
                    ),
                    U.vertexAttribPointer(
                      i["morphTarget" + h],
                      3,
                      U.FLOAT,
                      !1,
                      0,
                      0
                    ),
                    r.morphNormals &&
                      (U.bindBuffer(
                        U.ARRAY_BUFFER,
                        o.__webglMorphNormalsBuffers[c]
                      ),
                      U.vertexAttribPointer(
                        i["morphNormal" + h],
                        3,
                        U.FLOAT,
                        !1,
                        0,
                        0
                      )),
                    (n.__webglMorphTargetInfluences[h] = a[c]))
                  : (U.vertexAttribPointer(
                      i["morphTarget" + h],
                      3,
                      U.FLOAT,
                      !1,
                      0,
                      0
                    ),
                    r.morphNormals &&
                      U.vertexAttribPointer(
                        i["morphNormal" + h],
                        3,
                        U.FLOAT,
                        !1,
                        0,
                        0
                      ),
                    (n.__webglMorphTargetInfluences[h] = 0)),
                  h++;
            }
            null !== r.program.uniforms.morphTargetInfluences &&
              U.uniform1fv(
                r.program.uniforms.morphTargetInfluences,
                n.__webglMorphTargetInfluences
              );
          }
          if (e) {
            if (o.__webglCustomAttributesList)
              for (a = 0, l = o.__webglCustomAttributesList.length; a < l; a++)
                t[
                  (i = o.__webglCustomAttributesList[a]).buffer
                    .belongsToAttribute
                ] >= 0 &&
                  (U.bindBuffer(U.ARRAY_BUFFER, i.buffer),
                  U.vertexAttribPointer(
                    t[i.buffer.belongsToAttribute],
                    i.size,
                    U.FLOAT,
                    !1,
                    0,
                    0
                  ));
            t.color >= 0 &&
              (U.bindBuffer(U.ARRAY_BUFFER, o.__webglColorBuffer),
              U.vertexAttribPointer(t.color, 3, U.FLOAT, !1, 0, 0)),
              t.normal >= 0 &&
                (U.bindBuffer(U.ARRAY_BUFFER, o.__webglNormalBuffer),
                U.vertexAttribPointer(t.normal, 3, U.FLOAT, !1, 0, 0)),
              t.tangent >= 0 &&
                (U.bindBuffer(U.ARRAY_BUFFER, o.__webglTangentBuffer),
                U.vertexAttribPointer(t.tangent, 4, U.FLOAT, !1, 0, 0)),
              t.uv >= 0 &&
                (o.__webglUVBuffer
                  ? (U.bindBuffer(U.ARRAY_BUFFER, o.__webglUVBuffer),
                    U.vertexAttribPointer(t.uv, 2, U.FLOAT, !1, 0, 0),
                    U.enableVertexAttribArray(t.uv))
                  : U.disableVertexAttribArray(t.uv)),
              t.uv2 >= 0 &&
                (o.__webglUV2Buffer
                  ? (U.bindBuffer(U.ARRAY_BUFFER, o.__webglUV2Buffer),
                    U.vertexAttribPointer(t.uv2, 2, U.FLOAT, !1, 0, 0),
                    U.enableVertexAttribArray(t.uv2))
                  : U.disableVertexAttribArray(t.uv2)),
              r.skinning &&
                t.skinVertexA >= 0 &&
                t.skinVertexB >= 0 &&
                t.skinIndex >= 0 &&
                t.skinWeight >= 0 &&
                (U.bindBuffer(U.ARRAY_BUFFER, o.__webglSkinVertexABuffer),
                U.vertexAttribPointer(t.skinVertexA, 4, U.FLOAT, !1, 0, 0),
                U.bindBuffer(U.ARRAY_BUFFER, o.__webglSkinVertexBBuffer),
                U.vertexAttribPointer(t.skinVertexB, 4, U.FLOAT, !1, 0, 0),
                U.bindBuffer(U.ARRAY_BUFFER, o.__webglSkinIndicesBuffer),
                U.vertexAttribPointer(t.skinIndex, 4, U.FLOAT, !1, 0, 0),
                U.bindBuffer(U.ARRAY_BUFFER, o.__webglSkinWeightsBuffer),
                U.vertexAttribPointer(t.skinWeight, 4, U.FLOAT, !1, 0, 0));
          }
          n instanceof THREE.Mesh
            ? (r.wireframe
                ? ((r = r.wireframeLinewidth) !== ei &&
                    (U.lineWidth(r), (ei = r)),
                  e &&
                    U.bindBuffer(U.ELEMENT_ARRAY_BUFFER, o.__webglLineBuffer),
                  U.drawElements(
                    U.LINES,
                    o.__webglLineCount,
                    U.UNSIGNED_SHORT,
                    0
                  ))
                : (e &&
                    U.bindBuffer(U.ELEMENT_ARRAY_BUFFER, o.__webglFaceBuffer),
                  U.drawElements(
                    U.TRIANGLES,
                    o.__webglFaceCount,
                    U.UNSIGNED_SHORT,
                    0
                  )),
              D.info.render.calls++,
              (D.info.render.vertices =
                D.info.render.vertices + o.__webglFaceCount),
              (D.info.render.faces =
                D.info.render.faces + o.__webglFaceCount / 3))
            : n instanceof THREE.Line
            ? ((n = n.type === THREE.LineStrip ? U.LINE_STRIP : U.LINES),
              (r = r.linewidth) !== ei && (U.lineWidth(r), (ei = r)),
              U.drawArrays(n, 0, o.__webglLineCount),
              D.info.render.calls++)
            : n instanceof THREE.ParticleSystem
            ? (U.drawArrays(U.POINTS, 0, o.__webglParticleCount),
              D.info.render.calls++,
              (D.info.render.points =
                D.info.render.points + o.__webglParticleCount))
            : n instanceof THREE.Ribbon &&
              (U.drawArrays(U.TRIANGLE_STRIP, 0, o.__webglVertexCount),
              D.info.render.calls++);
        }
      }),
      (this.render = function (e, t, i, r) {
        var o,
          n,
          s,
          f,
          u = e.__lights,
          p = e.fog;
        for (
          O = -1,
            ed = !0,
            void 0 === t.parent &&
              (console.warn(
                "DEPRECATED: Camera hasn't been added to a Scene. Adding it..."
              ),
              e.add(t)),
            this.autoUpdateScene && e.updateMatrixWorld(),
            t._viewMatrixArray || (t._viewMatrixArray = new Float32Array(16)),
            t._projectionMatrixArray ||
              (t._projectionMatrixArray = new Float32Array(16)),
            t.matrixWorldInverse.getInverse(t.matrixWorld),
            t.matrixWorldInverse.flattenToArray(t._viewMatrixArray),
            t.projectionMatrix.flattenToArray(t._projectionMatrixArray),
            ec.multiply(t.projectionMatrix, t.matrixWorldInverse),
            eh.setFromMatrix(ec),
            this.autoUpdateObjects && this.initWebGLObjects(e),
            l(this.renderPluginsPre, e, t),
            D.info.render.calls = 0,
            D.info.render.vertices = 0,
            D.info.render.faces = 0,
            D.info.render.points = 0,
            this.setRenderTarget(i),
            (this.autoClear || r) &&
              this.clear(
                this.autoClearColor,
                this.autoClearDepth,
                this.autoClearStencil
              ),
            f = e.__webglObjects,
            r = 0,
            o = f.length;
          r < o;
          r++
        )
          if (
            ((s = (n = f[r]).object),
            (n.render = !1),
            s.visible &&
              (!(
                s instanceof THREE.Mesh || s instanceof THREE.ParticleSystem
              ) ||
                !s.frustumCulled ||
                eh.contains(s)))
          ) {
            v(s, t);
            var d = n,
              E = d.object,
              m = d.buffer,
              $ = void 0,
              $ = ($ = void 0),
              $ = E.material;
            $ instanceof THREE.MeshFaceMaterial
              ? ($ = m.materialIndex) >= 0 &&
                (($ = E.geometry.materials[$]).transparent
                  ? ((d.transparent = $), (d.opaque = null))
                  : ((d.opaque = $), (d.transparent = null)))
              : $ &&
                ($.transparent
                  ? ((d.transparent = $), (d.opaque = null))
                  : ((d.opaque = $), (d.transparent = null))),
              (n.render = !0),
              this.sortObjects &&
                (s.renderDepth
                  ? (n.z = s.renderDepth)
                  : (eu.copy(s.matrixWorld.getPosition()),
                    ec.multiplyVector3(eu),
                    (n.z = eu.z)));
          }
        for (
          this.sortObjects && f.sort(a),
            f = e.__webglObjectsImmediate,
            r = 0,
            o = f.length;
          r < o;
          r++
        )
          (s = (n = f[r]).object).visible &&
            (v(s, t),
            (s = n.object.material).transparent
              ? ((n.transparent = s), (n.opaque = null))
              : ((n.opaque = s), (n.transparent = null)));
        e.overrideMaterial
          ? ((r = e.overrideMaterial),
            this.setBlending(
              r.blending,
              r.blendEquation,
              r.blendSrc,
              r.blendDst
            ),
            this.setDepthTest(r.depthTest),
            this.setDepthWrite(r.depthWrite),
            g(r.polygonOffset, r.polygonOffsetFactor, r.polygonOffsetUnits),
            h(e.__webglObjects, !1, "", t, u, p, !0, r),
            c(e.__webglObjectsImmediate, "", t, u, p, !1, r))
          : (this.setBlending(THREE.NormalBlending),
            h(e.__webglObjects, !0, "opaque", t, u, p, !1),
            c(e.__webglObjectsImmediate, "opaque", t, u, p, !1),
            h(e.__webglObjects, !1, "transparent", t, u, p, !0),
            c(e.__webglObjectsImmediate, "transparent", t, u, p, !0)),
          l(this.renderPluginsPost, e, t),
          i &&
            i.generateMipmaps &&
            i.minFilter !== THREE.NearestFilter &&
            i.minFilter !== THREE.LinearFilter &&
            (i instanceof THREE.WebGLRenderTargetCube
              ? (U.bindTexture(U.TEXTURE_CUBE_MAP, i.__webglTexture),
                U.generateMipmap(U.TEXTURE_CUBE_MAP),
                U.bindTexture(U.TEXTURE_CUBE_MAP, null))
              : (U.bindTexture(U.TEXTURE_2D, i.__webglTexture),
                U.generateMipmap(U.TEXTURE_2D),
                U.bindTexture(U.TEXTURE_2D, null))),
          this.setDepthTest(!0),
          this.setDepthWrite(!0);
      }),
      (this.renderImmediateObject = function (e, t, i, r, o) {
        var n = m(e, t, i, r, o);
        (I = -1),
          D.setObjectFaces(o),
          o.immediateRenderCallback
            ? o.immediateRenderCallback(n, U, eh)
            : o.render(function (e) {
                D.renderBufferImmediate(e, n, r);
              });
      }),
      (this.initWebGLObjects = function (e) {
        for (
          e.__webglObjects ||
          ((e.__webglObjects = []),
          (e.__webglObjectsImmediate = []),
          (e.__webglSprites = []),
          (e.__webglFlares = []));
          e.__objectsAdded.length;

        ) {
          var a = e.__objectsAdded[0],
            s = e,
            l = void 0,
            h = void 0,
            c = void 0;
          if (!a.__webglInit) {
            if (
              ((a.__webglInit = !0),
              (a._modelViewMatrix = new THREE.Matrix4()),
              (a._normalMatrix = new THREE.Matrix3()),
              a instanceof THREE.Mesh)
            ) {
              if ((h = a.geometry) instanceof THREE.Geometry) {
                if (void 0 === h.geometryGroups) {
                  var m = h,
                    v = void 0,
                    g = void 0,
                    $ = void 0,
                    T = void 0,
                    R = void 0,
                    y = void 0,
                    _ = void 0,
                    x = {},
                    H = m.morphTargets.length,
                    b = m.morphNormals.length;
                  for (
                    m.geometryGroups = {}, v = 0, g = m.faces.length;
                    v < g;
                    v++
                  )
                    void 0 ===
                      x[
                        (y =
                          void 0 !== (T = ($ = m.faces[v]).materialIndex)
                            ? T
                            : -1)
                      ] && (x[y] = { hash: y, counter: 0 }),
                      (_ = x[y].hash + "_" + x[y].counter),
                      void 0 === m.geometryGroups[_] &&
                        (m.geometryGroups[_] = {
                          faces3: [],
                          faces4: [],
                          materialIndex: T,
                          vertices: 0,
                          numMorphTargets: H,
                          numMorphNormals: b,
                        }),
                      (R = $ instanceof THREE.Face3 ? 3 : 4),
                      m.geometryGroups[_].vertices + R > 65535 &&
                        ((x[y].counter = x[y].counter + 1),
                        (_ = x[y].hash + "_" + x[y].counter),
                        void 0 === m.geometryGroups[_] &&
                          (m.geometryGroups[_] = {
                            faces3: [],
                            faces4: [],
                            materialIndex: T,
                            vertices: 0,
                            numMorphTargets: H,
                            numMorphNormals: b,
                          })),
                      $ instanceof THREE.Face3
                        ? m.geometryGroups[_].faces3.push(v)
                        : m.geometryGroups[_].faces4.push(v),
                      (m.geometryGroups[_].vertices =
                        m.geometryGroups[_].vertices + R);
                  m.geometryGroupsList = [];
                  var w = void 0;
                  for (w in m.geometryGroups)
                    (m.geometryGroups[w].id = W++),
                      m.geometryGroupsList.push(m.geometryGroups[w]);
                }
                for (l in h.geometryGroups)
                  if (!(c = h.geometryGroups[l]).__webglVertexBuffer) {
                    var S = c;
                    (S.__webglVertexBuffer = U.createBuffer()),
                      (S.__webglNormalBuffer = U.createBuffer()),
                      (S.__webglTangentBuffer = U.createBuffer()),
                      (S.__webglColorBuffer = U.createBuffer()),
                      (S.__webglUVBuffer = U.createBuffer()),
                      (S.__webglUV2Buffer = U.createBuffer()),
                      (S.__webglSkinVertexABuffer = U.createBuffer()),
                      (S.__webglSkinVertexBBuffer = U.createBuffer()),
                      (S.__webglSkinIndicesBuffer = U.createBuffer()),
                      (S.__webglSkinWeightsBuffer = U.createBuffer()),
                      (S.__webglFaceBuffer = U.createBuffer()),
                      (S.__webglLineBuffer = U.createBuffer());
                    var C = void 0,
                      M = void 0;
                    if (S.numMorphTargets)
                      for (
                        S.__webglMorphTargetsBuffers = [],
                          C = 0,
                          M = S.numMorphTargets;
                        C < M;
                        C++
                      )
                        S.__webglMorphTargetsBuffers.push(U.createBuffer());
                    if (S.numMorphNormals)
                      for (
                        S.__webglMorphNormalsBuffers = [],
                          C = 0,
                          M = S.numMorphNormals;
                        C < M;
                        C++
                      )
                        S.__webglMorphNormalsBuffers.push(U.createBuffer());
                    D.info.memory.geometries++;
                    var A = c,
                      L = a,
                      P = L.geometry,
                      F = A.faces3,
                      V = A.faces4,
                      z = 3 * F.length + 4 * V.length,
                      B = 1 * F.length + 2 * V.length,
                      N = 3 * F.length + 4 * V.length,
                      O = i(L, A),
                      I = o(O),
                      k = r(O),
                      G = !!O.vertexColors && O.vertexColors;
                    (A.__vertexArray = new Float32Array(3 * z)),
                      k && (A.__normalArray = new Float32Array(3 * z)),
                      P.hasTangents &&
                        (A.__tangentArray = new Float32Array(4 * z)),
                      G && (A.__colorArray = new Float32Array(3 * z)),
                      I &&
                        ((P.faceUvs.length > 0 || P.faceVertexUvs.length > 0) &&
                          (A.__uvArray = new Float32Array(2 * z)),
                        (P.faceUvs.length > 1 || P.faceVertexUvs.length > 1) &&
                          (A.__uv2Array = new Float32Array(2 * z))),
                      L.geometry.skinWeights.length &&
                        L.geometry.skinIndices.length &&
                        ((A.__skinVertexAArray = new Float32Array(4 * z)),
                        (A.__skinVertexBArray = new Float32Array(4 * z)),
                        (A.__skinIndexArray = new Float32Array(4 * z)),
                        (A.__skinWeightArray = new Float32Array(4 * z))),
                      (A.__faceArray = new Uint16Array(3 * B)),
                      (A.__lineArray = new Uint16Array(2 * N));
                    var j = void 0,
                      X = void 0;
                    if (A.numMorphTargets)
                      for (
                        A.__morphTargetsArrays = [],
                          j = 0,
                          X = A.numMorphTargets;
                        j < X;
                        j++
                      )
                        A.__morphTargetsArrays.push(new Float32Array(3 * z));
                    if (A.numMorphNormals)
                      for (
                        A.__morphNormalsArrays = [],
                          j = 0,
                          X = A.numMorphNormals;
                        j < X;
                        j++
                      )
                        A.__morphNormalsArrays.push(new Float32Array(3 * z));
                    if (
                      ((A.__webglFaceCount = 3 * B),
                      (A.__webglLineCount = 2 * N),
                      O.attributes)
                    ) {
                      void 0 === A.__webglCustomAttributesList &&
                        (A.__webglCustomAttributesList = []);
                      var Y = void 0;
                      for (Y in O.attributes) {
                        var q,
                          K = O.attributes[Y],
                          Z = {};
                        for (q in K) Z[q] = K[q];
                        if (!Z.__webglInitialized || Z.createUniqueBuffers) {
                          Z.__webglInitialized = !0;
                          var Q = 1;
                          "v2" === Z.type
                            ? (Q = 2)
                            : "v3" === Z.type
                            ? (Q = 3)
                            : "v4" === Z.type
                            ? (Q = 4)
                            : "c" === Z.type && (Q = 3),
                            (Z.size = Q),
                            (Z.array = new Float32Array(z * Q)),
                            (Z.buffer = U.createBuffer()),
                            (Z.buffer.belongsToAttribute = Y),
                            (K.needsUpdate = !0),
                            (Z.__original = K);
                        }
                        A.__webglCustomAttributesList.push(Z);
                      }
                    }
                    (A.__inittedArrays = !0),
                      (h.verticesNeedUpdate = !0),
                      (h.morphTargetsNeedUpdate = !0),
                      (h.elementsNeedUpdate = !0),
                      (h.uvsNeedUpdate = !0),
                      (h.normalsNeedUpdate = !0),
                      (h.tangentsNeedUpdate = !0),
                      (h.colorsNeedUpdate = !0);
                  }
              } else if (h instanceof THREE.BufferGeometry) {
                var J = h,
                  ee = void 0,
                  et = void 0,
                  ei = void 0;
                for (ee in J.attributes)
                  (ei =
                    "index" === ee ? U.ELEMENT_ARRAY_BUFFER : U.ARRAY_BUFFER),
                    ((et = J.attributes[ee]).buffer = U.createBuffer()),
                    U.bindBuffer(ei, et.buffer),
                    U.bufferData(ei, et.array, U.STATIC_DRAW);
              }
            } else if (a instanceof THREE.Ribbon) {
              if (!(h = a.geometry).__webglVertexBuffer) {
                var er = h;
                (er.__webglVertexBuffer = U.createBuffer()),
                  (er.__webglColorBuffer = U.createBuffer()),
                  D.info.memory.geometries++;
                var eo = h,
                  en = eo.vertices.length;
                (eo.__vertexArray = new Float32Array(3 * en)),
                  (eo.__colorArray = new Float32Array(3 * en)),
                  (eo.__webglVertexCount = en),
                  (h.verticesNeedUpdate = !0),
                  (h.colorsNeedUpdate = !0);
              }
            } else if (a instanceof THREE.Line) {
              if (!(h = a.geometry).__webglVertexBuffer) {
                var ea = h;
                (ea.__webglVertexBuffer = U.createBuffer()),
                  (ea.__webglColorBuffer = U.createBuffer()),
                  D.info.memory.geometries++;
                var es = h,
                  el = a,
                  eh = es.vertices.length;
                (es.__vertexArray = new Float32Array(3 * eh)),
                  (es.__colorArray = new Float32Array(3 * eh)),
                  (es.__webglLineCount = eh),
                  t(es, el),
                  (h.verticesNeedUpdate = !0),
                  (h.colorsNeedUpdate = !0);
              }
            } else if (
              a instanceof THREE.ParticleSystem &&
              !(h = a.geometry).__webglVertexBuffer
            ) {
              var ec = h;
              (ec.__webglVertexBuffer = U.createBuffer()),
                (ec.__webglColorBuffer = U.createBuffer()),
                D.info.geometries++;
              var ef = h,
                eu = a,
                ep = ef.vertices.length;
              (ef.__vertexArray = new Float32Array(3 * ep)),
                (ef.__colorArray = new Float32Array(3 * ep)),
                (ef.__sortArray = []),
                (ef.__webglParticleCount = ep),
                t(ef, eu),
                (h.verticesNeedUpdate = !0),
                (h.colorsNeedUpdate = !0);
            }
          }
          if (!a.__webglActive) {
            if (a instanceof THREE.Mesh) {
              if ((h = a.geometry) instanceof THREE.BufferGeometry)
                f(s.__webglObjects, h, a);
              else
                for (l in h.geometryGroups)
                  (c = h.geometryGroups[l]), f(s.__webglObjects, c, a);
            } else
              a instanceof THREE.Ribbon ||
              a instanceof THREE.Line ||
              a instanceof THREE.ParticleSystem
                ? ((h = a.geometry), f(s.__webglObjects, h, a))
                : a instanceof THREE.ImmediateRenderObject ||
                  a.immediateRenderCallback
                ? s.__webglObjectsImmediate.push({
                    object: a,
                    opaque: null,
                    transparent: null,
                  })
                : a instanceof THREE.Sprite
                ? s.__webglSprites.push(a)
                : a instanceof THREE.LensFlare && s.__webglFlares.push(a);
            a.__webglActive = !0;
          }
          e.__objectsAdded.splice(0, 1);
        }
        for (; e.__objectsRemoved.length; ) {
          var ed = e.__objectsRemoved[0],
            eE = e;
          ed instanceof THREE.Mesh ||
          ed instanceof THREE.ParticleSystem ||
          ed instanceof THREE.Ribbon ||
          ed instanceof THREE.Line
            ? d(eE.__webglObjects, ed)
            : ed instanceof THREE.Sprite
            ? E(eE.__webglSprites, ed)
            : ed instanceof THREE.LensFlare
            ? E(eE.__webglFlares, ed)
            : (ed instanceof THREE.ImmediateRenderObject ||
                ed.immediateRenderCallback) &&
              d(eE.__webglObjectsImmediate, ed),
            (ed.__webglActive = !1),
            e.__objectsRemoved.splice(0, 1);
        }
        for (var em = 0, ev = e.__webglObjects.length; em < ev; em++) {
          var eg = e.__webglObjects[em].object,
            e$ = eg.geometry,
            eT = void 0,
            eR = void 0,
            ey = void 0;
          if (eg instanceof THREE.Mesh) {
            if (e$ instanceof THREE.BufferGeometry) {
              if (
                e$.verticesNeedUpdate ||
                e$.elementsNeedUpdate ||
                e$.uvsNeedUpdate ||
                e$.normalsNeedUpdate ||
                e$.colorsNeedUpdate ||
                e$.tangentsNeedUpdate
              ) {
                var e_ = e$,
                  ex = U.DYNAMIC_DRAW,
                  eH = !e$.dynamic,
                  eb = e_.attributes,
                  e8 = eb.index,
                  ew = eb.position,
                  eS = eb.normal,
                  e0 = eb.uv,
                  eC = eb.color,
                  eM = eb.tangent;
                if (
                  (e_.elementsNeedUpdate &&
                    void 0 !== e8 &&
                    (U.bindBuffer(U.ELEMENT_ARRAY_BUFFER, e8.buffer),
                    U.bufferData(U.ELEMENT_ARRAY_BUFFER, e8.array, ex)),
                  e_.verticesNeedUpdate &&
                    void 0 !== ew &&
                    (U.bindBuffer(U.ARRAY_BUFFER, ew.buffer),
                    U.bufferData(U.ARRAY_BUFFER, ew.array, ex)),
                  e_.normalsNeedUpdate &&
                    void 0 !== eS &&
                    (U.bindBuffer(U.ARRAY_BUFFER, eS.buffer),
                    U.bufferData(U.ARRAY_BUFFER, eS.array, ex)),
                  e_.uvsNeedUpdate &&
                    void 0 !== e0 &&
                    (U.bindBuffer(U.ARRAY_BUFFER, e0.buffer),
                    U.bufferData(U.ARRAY_BUFFER, e0.array, ex)),
                  e_.colorsNeedUpdate &&
                    void 0 !== eC &&
                    (U.bindBuffer(U.ARRAY_BUFFER, eC.buffer),
                    U.bufferData(U.ARRAY_BUFFER, eC.array, ex)),
                  e_.tangentsNeedUpdate &&
                    void 0 !== eM &&
                    (U.bindBuffer(U.ARRAY_BUFFER, eM.buffer),
                    U.bufferData(U.ARRAY_BUFFER, eM.array, ex)),
                  eH)
                ) {
                  var eA = void 0;
                  for (eA in e_.attributes) delete e_.attributes[eA].array;
                }
              }
              (e$.verticesNeedUpdate = !1),
                (e$.elementsNeedUpdate = !1),
                (e$.uvsNeedUpdate = !1),
                (e$.normalsNeedUpdate = !1),
                (e$.colorsNeedUpdate = !1),
                (e$.tangentsNeedUpdate = !1);
            } else {
              for (var e1 = 0, eL = e$.geometryGroupsList.length; e1 < eL; e1++)
                if (
                  ((eR =
                    (ey = i(eg, (eT = e$.geometryGroupsList[e1]))).attributes &&
                    u(ey)),
                  e$.verticesNeedUpdate ||
                    e$.morphTargetsNeedUpdate ||
                    e$.elementsNeedUpdate ||
                    e$.uvsNeedUpdate ||
                    e$.normalsNeedUpdate ||
                    e$.colorsNeedUpdate ||
                    e$.tangentsNeedUpdate ||
                    eR)
                ) {
                  var eP = eT,
                    eU = eg,
                    eF = U.DYNAMIC_DRAW,
                    eD = !e$.dynamic,
                    eV = ey;
                  if (eP.__inittedArrays) {
                    var ez,
                      eB = r(eV),
                      eN = !!eV.vertexColors && eV.vertexColors,
                      eO = o(eV),
                      e2 = eB === THREE.SmoothShading,
                      eI = void 0,
                      e3 = void 0,
                      ek = void 0,
                      eW = void 0,
                      eG = void 0,
                      ej = void 0,
                      e4 = void 0,
                      eX = void 0,
                      eY = void 0,
                      e6 = void 0,
                      e5 = void 0,
                      e7 = void 0,
                      eq = void 0,
                      eK = void 0,
                      eZ = void 0,
                      eQ = void 0,
                      eJ = void 0,
                      e9 = void 0,
                      te = void 0,
                      tt = void 0,
                      ti = void 0,
                      tr = void 0,
                      to = void 0,
                      tn = void 0,
                      ta = void 0,
                      ts = void 0,
                      tl = void 0,
                      th = void 0,
                      tc = void 0,
                      tf = void 0,
                      tu = void 0,
                      tp = void 0,
                      td = void 0,
                      tE = void 0,
                      tm = void 0,
                      tv = void 0,
                      tg = void 0,
                      t$ = void 0,
                      tT = void 0,
                      tR = void 0,
                      ty = void 0,
                      t_ = void 0,
                      tx = void 0,
                      tH = void 0,
                      tb = void 0,
                      t8 = void 0,
                      tw = void 0,
                      tS = void 0,
                      t0 = void 0,
                      tC = void 0,
                      tM = void 0,
                      tA = void 0,
                      t1 = void 0,
                      tL = void 0,
                      tP = 0,
                      tU = 0,
                      tF = 0,
                      tD = 0,
                      tV = 0,
                      tz = 0,
                      tB = 0,
                      tN = 0,
                      tO = 0,
                      t2 = 0,
                      tI = 0,
                      t3 = 0,
                      tk = void 0,
                      tW = eP.__vertexArray,
                      tG = eP.__uvArray,
                      tj = eP.__uv2Array,
                      t4 = eP.__normalArray,
                      tX = eP.__tangentArray,
                      tY = eP.__colorArray,
                      t6 = eP.__skinVertexAArray,
                      t5 = eP.__skinVertexBArray,
                      t7 = eP.__skinIndexArray,
                      tq = eP.__skinWeightArray,
                      tK = eP.__morphTargetsArrays,
                      tZ = eP.__morphNormalsArrays,
                      tQ = eP.__webglCustomAttributesList,
                      tJ = void 0,
                      t9 = eP.__faceArray,
                      ie = eP.__lineArray,
                      it = eU.geometry,
                      ii = it.elementsNeedUpdate,
                      ir = it.uvsNeedUpdate,
                      io = it.normalsNeedUpdate,
                      ia = it.tangentsNeedUpdate,
                      is = it.colorsNeedUpdate,
                      il = it.morphTargetsNeedUpdate,
                      ih = it.vertices,
                      ic = eP.faces3,
                      iu = eP.faces4,
                      ip = it.faces,
                      id = it.faceVertexUvs[0],
                      iE = it.faceVertexUvs[1],
                      im = it.skinVerticesA,
                      iv = it.skinVerticesB,
                      ig = it.skinIndices,
                      i$ = it.skinWeights,
                      iT = it.morphTargets,
                      iR = it.morphNormals;
                    if (it.verticesNeedUpdate) {
                      for (eI = 0, e3 = ic.length; eI < e3; eI++)
                        (e7 = ih[(eW = ip[ic[eI]]).a]),
                          (eq = ih[eW.b]),
                          (eK = ih[eW.c]),
                          (tW[tU] = e7.x),
                          (tW[tU + 1] = e7.y),
                          (tW[tU + 2] = e7.z),
                          (tW[tU + 3] = eq.x),
                          (tW[tU + 4] = eq.y),
                          (tW[tU + 5] = eq.z),
                          (tW[tU + 6] = eK.x),
                          (tW[tU + 7] = eK.y),
                          (tW[tU + 8] = eK.z),
                          (tU += 9);
                      for (eI = 0, e3 = iu.length; eI < e3; eI++)
                        (e7 = ih[(eW = ip[iu[eI]]).a]),
                          (eq = ih[eW.b]),
                          (eK = ih[eW.c]),
                          (eZ = ih[eW.d]),
                          (tW[tU] = e7.x),
                          (tW[tU + 1] = e7.y),
                          (tW[tU + 2] = e7.z),
                          (tW[tU + 3] = eq.x),
                          (tW[tU + 4] = eq.y),
                          (tW[tU + 5] = eq.z),
                          (tW[tU + 6] = eK.x),
                          (tW[tU + 7] = eK.y),
                          (tW[tU + 8] = eK.z),
                          (tW[tU + 9] = eZ.x),
                          (tW[tU + 10] = eZ.y),
                          (tW[tU + 11] = eZ.z),
                          (tU += 12);
                      U.bindBuffer(U.ARRAY_BUFFER, eP.__webglVertexBuffer),
                        U.bufferData(U.ARRAY_BUFFER, tW, eF);
                    }
                    if (il)
                      for (t0 = 0, tC = iT.length; t0 < tC; t0++) {
                        for (eI = tI = 0, e3 = ic.length; eI < e3; eI++)
                          (eW = ip[(t1 = ic[eI])]),
                            (e7 = iT[t0].vertices[eW.a]),
                            (eq = iT[t0].vertices[eW.b]),
                            (eK = iT[t0].vertices[eW.c]),
                            ((tM = tK[t0])[tI] = e7.x),
                            (tM[tI + 1] = e7.y),
                            (tM[tI + 2] = e7.z),
                            (tM[tI + 3] = eq.x),
                            (tM[tI + 4] = eq.y),
                            (tM[tI + 5] = eq.z),
                            (tM[tI + 6] = eK.x),
                            (tM[tI + 7] = eK.y),
                            (tM[tI + 8] = eK.z),
                            eV.morphNormals &&
                              (e2
                                ? ((tt = (tL = iR[t0].vertexNormals[t1]).a),
                                  (ti = tL.b),
                                  (tr = tL.c))
                                : (tr = ti = tt = iR[t0].faceNormals[t1]),
                              ((tA = tZ[t0])[tI] = tt.x),
                              (tA[tI + 1] = tt.y),
                              (tA[tI + 2] = tt.z),
                              (tA[tI + 3] = ti.x),
                              (tA[tI + 4] = ti.y),
                              (tA[tI + 5] = ti.z),
                              (tA[tI + 6] = tr.x),
                              (tA[tI + 7] = tr.y),
                              (tA[tI + 8] = tr.z)),
                            (tI += 9);
                        for (eI = 0, e3 = iu.length; eI < e3; eI++)
                          (eW = ip[(t1 = iu[eI])]),
                            (e7 = iT[t0].vertices[eW.a]),
                            (eq = iT[t0].vertices[eW.b]),
                            (eK = iT[t0].vertices[eW.c]),
                            (eZ = iT[t0].vertices[eW.d]),
                            ((tM = tK[t0])[tI] = e7.x),
                            (tM[tI + 1] = e7.y),
                            (tM[tI + 2] = e7.z),
                            (tM[tI + 3] = eq.x),
                            (tM[tI + 4] = eq.y),
                            (tM[tI + 5] = eq.z),
                            (tM[tI + 6] = eK.x),
                            (tM[tI + 7] = eK.y),
                            (tM[tI + 8] = eK.z),
                            (tM[tI + 9] = eZ.x),
                            (tM[tI + 10] = eZ.y),
                            (tM[tI + 11] = eZ.z),
                            eV.morphNormals &&
                              (e2
                                ? ((tt = (tL = iR[t0].vertexNormals[t1]).a),
                                  (ti = tL.b),
                                  (tr = tL.c),
                                  (to = tL.d))
                                : (to = tr = ti = tt = iR[t0].faceNormals[t1]),
                              ((tA = tZ[t0])[tI] = tt.x),
                              (tA[tI + 1] = tt.y),
                              (tA[tI + 2] = tt.z),
                              (tA[tI + 3] = ti.x),
                              (tA[tI + 4] = ti.y),
                              (tA[tI + 5] = ti.z),
                              (tA[tI + 6] = tr.x),
                              (tA[tI + 7] = tr.y),
                              (tA[tI + 8] = tr.z),
                              (tA[tI + 9] = to.x),
                              (tA[tI + 10] = to.y),
                              (tA[tI + 11] = to.z)),
                            (tI += 12);
                        U.bindBuffer(
                          U.ARRAY_BUFFER,
                          eP.__webglMorphTargetsBuffers[t0]
                        ),
                          U.bufferData(U.ARRAY_BUFFER, tK[t0], eF),
                          eV.morphNormals &&
                            (U.bindBuffer(
                              U.ARRAY_BUFFER,
                              eP.__webglMorphNormalsBuffers[t0]
                            ),
                            U.bufferData(U.ARRAY_BUFFER, tZ[t0], eF));
                      }
                    if (i$.length) {
                      for (eI = 0, e3 = ic.length; eI < e3; eI++)
                        (th = i$[(eW = ip[ic[eI]]).a]),
                          (tc = i$[eW.b]),
                          (tf = i$[eW.c]),
                          (tq[t2] = th.x),
                          (tq[t2 + 1] = th.y),
                          (tq[t2 + 2] = th.z),
                          (tq[t2 + 3] = th.w),
                          (tq[t2 + 4] = tc.x),
                          (tq[t2 + 5] = tc.y),
                          (tq[t2 + 6] = tc.z),
                          (tq[t2 + 7] = tc.w),
                          (tq[t2 + 8] = tf.x),
                          (tq[t2 + 9] = tf.y),
                          (tq[t2 + 10] = tf.z),
                          (tq[t2 + 11] = tf.w),
                          (tp = ig[eW.a]),
                          (td = ig[eW.b]),
                          (tE = ig[eW.c]),
                          (t7[t2] = tp.x),
                          (t7[t2 + 1] = tp.y),
                          (t7[t2 + 2] = tp.z),
                          (t7[t2 + 3] = tp.w),
                          (t7[t2 + 4] = td.x),
                          (t7[t2 + 5] = td.y),
                          (t7[t2 + 6] = td.z),
                          (t7[t2 + 7] = td.w),
                          (t7[t2 + 8] = tE.x),
                          (t7[t2 + 9] = tE.y),
                          (t7[t2 + 10] = tE.z),
                          (t7[t2 + 11] = tE.w),
                          (tv = im[eW.a]),
                          (tg = im[eW.b]),
                          (t$ = im[eW.c]),
                          (t6[t2] = tv.x),
                          (t6[t2 + 1] = tv.y),
                          (t6[t2 + 2] = tv.z),
                          (t6[t2 + 3] = 1),
                          (t6[t2 + 4] = tg.x),
                          (t6[t2 + 5] = tg.y),
                          (t6[t2 + 6] = tg.z),
                          (t6[t2 + 7] = 1),
                          (t6[t2 + 8] = t$.x),
                          (t6[t2 + 9] = t$.y),
                          (t6[t2 + 10] = t$.z),
                          (t6[t2 + 11] = 1),
                          (tR = iv[eW.a]),
                          (ty = iv[eW.b]),
                          (t_ = iv[eW.c]),
                          (t5[t2] = tR.x),
                          (t5[t2 + 1] = tR.y),
                          (t5[t2 + 2] = tR.z),
                          (t5[t2 + 3] = 1),
                          (t5[t2 + 4] = ty.x),
                          (t5[t2 + 5] = ty.y),
                          (t5[t2 + 6] = ty.z),
                          (t5[t2 + 7] = 1),
                          (t5[t2 + 8] = t_.x),
                          (t5[t2 + 9] = t_.y),
                          (t5[t2 + 10] = t_.z),
                          (t5[t2 + 11] = 1),
                          (t2 += 12);
                      for (eI = 0, e3 = iu.length; eI < e3; eI++)
                        (th = i$[(eW = ip[iu[eI]]).a]),
                          (tc = i$[eW.b]),
                          (tf = i$[eW.c]),
                          (tu = i$[eW.d]),
                          (tq[t2] = th.x),
                          (tq[t2 + 1] = th.y),
                          (tq[t2 + 2] = th.z),
                          (tq[t2 + 3] = th.w),
                          (tq[t2 + 4] = tc.x),
                          (tq[t2 + 5] = tc.y),
                          (tq[t2 + 6] = tc.z),
                          (tq[t2 + 7] = tc.w),
                          (tq[t2 + 8] = tf.x),
                          (tq[t2 + 9] = tf.y),
                          (tq[t2 + 10] = tf.z),
                          (tq[t2 + 11] = tf.w),
                          (tq[t2 + 12] = tu.x),
                          (tq[t2 + 13] = tu.y),
                          (tq[t2 + 14] = tu.z),
                          (tq[t2 + 15] = tu.w),
                          (tp = ig[eW.a]),
                          (td = ig[eW.b]),
                          (tE = ig[eW.c]),
                          (tm = ig[eW.d]),
                          (t7[t2] = tp.x),
                          (t7[t2 + 1] = tp.y),
                          (t7[t2 + 2] = tp.z),
                          (t7[t2 + 3] = tp.w),
                          (t7[t2 + 4] = td.x),
                          (t7[t2 + 5] = td.y),
                          (t7[t2 + 6] = td.z),
                          (t7[t2 + 7] = td.w),
                          (t7[t2 + 8] = tE.x),
                          (t7[t2 + 9] = tE.y),
                          (t7[t2 + 10] = tE.z),
                          (t7[t2 + 11] = tE.w),
                          (t7[t2 + 12] = tm.x),
                          (t7[t2 + 13] = tm.y),
                          (t7[t2 + 14] = tm.z),
                          (t7[t2 + 15] = tm.w),
                          (tv = im[eW.a]),
                          (tg = im[eW.b]),
                          (t$ = im[eW.c]),
                          (tT = im[eW.d]),
                          (t6[t2] = tv.x),
                          (t6[t2 + 1] = tv.y),
                          (t6[t2 + 2] = tv.z),
                          (t6[t2 + 3] = 1),
                          (t6[t2 + 4] = tg.x),
                          (t6[t2 + 5] = tg.y),
                          (t6[t2 + 6] = tg.z),
                          (t6[t2 + 7] = 1),
                          (t6[t2 + 8] = t$.x),
                          (t6[t2 + 9] = t$.y),
                          (t6[t2 + 10] = t$.z),
                          (t6[t2 + 11] = 1),
                          (t6[t2 + 12] = tT.x),
                          (t6[t2 + 13] = tT.y),
                          (t6[t2 + 14] = tT.z),
                          (t6[t2 + 15] = 1),
                          (tR = iv[eW.a]),
                          (ty = iv[eW.b]),
                          (t_ = iv[eW.c]),
                          (tx = iv[eW.d]),
                          (t5[t2] = tR.x),
                          (t5[t2 + 1] = tR.y),
                          (t5[t2 + 2] = tR.z),
                          (t5[t2 + 3] = 1),
                          (t5[t2 + 4] = ty.x),
                          (t5[t2 + 5] = ty.y),
                          (t5[t2 + 6] = ty.z),
                          (t5[t2 + 7] = 1),
                          (t5[t2 + 8] = t_.x),
                          (t5[t2 + 9] = t_.y),
                          (t5[t2 + 10] = t_.z),
                          (t5[t2 + 11] = 1),
                          (t5[t2 + 12] = tx.x),
                          (t5[t2 + 13] = tx.y),
                          (t5[t2 + 14] = tx.z),
                          (t5[t2 + 15] = 1),
                          (t2 += 16);
                      t2 > 0 &&
                        (U.bindBuffer(
                          U.ARRAY_BUFFER,
                          eP.__webglSkinVertexABuffer
                        ),
                        U.bufferData(U.ARRAY_BUFFER, t6, eF),
                        U.bindBuffer(
                          U.ARRAY_BUFFER,
                          eP.__webglSkinVertexBBuffer
                        ),
                        U.bufferData(U.ARRAY_BUFFER, t5, eF),
                        U.bindBuffer(
                          U.ARRAY_BUFFER,
                          eP.__webglSkinIndicesBuffer
                        ),
                        U.bufferData(U.ARRAY_BUFFER, t7, eF),
                        U.bindBuffer(
                          U.ARRAY_BUFFER,
                          eP.__webglSkinWeightsBuffer
                        ),
                        U.bufferData(U.ARRAY_BUFFER, tq, eF));
                    }
                    if (is && eN) {
                      for (eI = 0, e3 = ic.length; eI < e3; eI++)
                        (e4 = (eW = ip[ic[eI]]).vertexColors),
                          (eX = eW.color),
                          3 === e4.length && eN === THREE.VertexColors
                            ? ((tn = e4[0]), (ta = e4[1]), (ts = e4[2]))
                            : (ts = ta = tn = eX),
                          (tY[tO] = tn.r),
                          (tY[tO + 1] = tn.g),
                          (tY[tO + 2] = tn.b),
                          (tY[tO + 3] = ta.r),
                          (tY[tO + 4] = ta.g),
                          (tY[tO + 5] = ta.b),
                          (tY[tO + 6] = ts.r),
                          (tY[tO + 7] = ts.g),
                          (tY[tO + 8] = ts.b),
                          (tO += 9);
                      for (eI = 0, e3 = iu.length; eI < e3; eI++)
                        (e4 = (eW = ip[iu[eI]]).vertexColors),
                          (eX = eW.color),
                          4 === e4.length && eN === THREE.VertexColors
                            ? ((tn = e4[0]),
                              (ta = e4[1]),
                              (ts = e4[2]),
                              (tl = e4[3]))
                            : (tl = ts = ta = tn = eX),
                          (tY[tO] = tn.r),
                          (tY[tO + 1] = tn.g),
                          (tY[tO + 2] = tn.b),
                          (tY[tO + 3] = ta.r),
                          (tY[tO + 4] = ta.g),
                          (tY[tO + 5] = ta.b),
                          (tY[tO + 6] = ts.r),
                          (tY[tO + 7] = ts.g),
                          (tY[tO + 8] = ts.b),
                          (tY[tO + 9] = tl.r),
                          (tY[tO + 10] = tl.g),
                          (tY[tO + 11] = tl.b),
                          (tO += 12);
                      tO > 0 &&
                        (U.bindBuffer(U.ARRAY_BUFFER, eP.__webglColorBuffer),
                        U.bufferData(U.ARRAY_BUFFER, tY, eF));
                    }
                    if (ia && it.hasTangents) {
                      for (eI = 0, e3 = ic.length; eI < e3; eI++)
                        (eQ = (eY = (eW = ip[ic[eI]]).vertexTangents)[0]),
                          (eJ = eY[1]),
                          (e9 = eY[2]),
                          (tX[tB] = eQ.x),
                          (tX[tB + 1] = eQ.y),
                          (tX[tB + 2] = eQ.z),
                          (tX[tB + 3] = eQ.w),
                          (tX[tB + 4] = eJ.x),
                          (tX[tB + 5] = eJ.y),
                          (tX[tB + 6] = eJ.z),
                          (tX[tB + 7] = eJ.w),
                          (tX[tB + 8] = e9.x),
                          (tX[tB + 9] = e9.y),
                          (tX[tB + 10] = e9.z),
                          (tX[tB + 11] = e9.w),
                          (tB += 12);
                      for (eI = 0, e3 = iu.length; eI < e3; eI++)
                        (eQ = (eY = (eW = ip[iu[eI]]).vertexTangents)[0]),
                          (eJ = eY[1]),
                          (e9 = eY[2]),
                          (te = eY[3]),
                          (tX[tB] = eQ.x),
                          (tX[tB + 1] = eQ.y),
                          (tX[tB + 2] = eQ.z),
                          (tX[tB + 3] = eQ.w),
                          (tX[tB + 4] = eJ.x),
                          (tX[tB + 5] = eJ.y),
                          (tX[tB + 6] = eJ.z),
                          (tX[tB + 7] = eJ.w),
                          (tX[tB + 8] = e9.x),
                          (tX[tB + 9] = e9.y),
                          (tX[tB + 10] = e9.z),
                          (tX[tB + 11] = e9.w),
                          (tX[tB + 12] = te.x),
                          (tX[tB + 13] = te.y),
                          (tX[tB + 14] = te.z),
                          (tX[tB + 15] = te.w),
                          (tB += 16);
                      U.bindBuffer(U.ARRAY_BUFFER, eP.__webglTangentBuffer),
                        U.bufferData(U.ARRAY_BUFFER, tX, eF);
                    }
                    if (io && eB) {
                      for (eI = 0, e3 = ic.length; eI < e3; eI++)
                        if (
                          ((eG = (eW = ip[ic[eI]]).vertexNormals),
                          (ej = eW.normal),
                          3 === eG.length && e2)
                        )
                          for (tH = 0; tH < 3; tH++)
                            (t8 = eG[tH]),
                              (t4[tz] = t8.x),
                              (t4[tz + 1] = t8.y),
                              (t4[tz + 2] = t8.z),
                              (tz += 3);
                        else
                          for (tH = 0; tH < 3; tH++)
                            (t4[tz] = ej.x),
                              (t4[tz + 1] = ej.y),
                              (t4[tz + 2] = ej.z),
                              (tz += 3);
                      for (eI = 0, e3 = iu.length; eI < e3; eI++)
                        if (
                          ((eG = (eW = ip[iu[eI]]).vertexNormals),
                          (ej = eW.normal),
                          4 === eG.length && e2)
                        )
                          for (tH = 0; tH < 4; tH++)
                            (t8 = eG[tH]),
                              (t4[tz] = t8.x),
                              (t4[tz + 1] = t8.y),
                              (t4[tz + 2] = t8.z),
                              (tz += 3);
                        else
                          for (tH = 0; tH < 4; tH++)
                            (t4[tz] = ej.x),
                              (t4[tz + 1] = ej.y),
                              (t4[tz + 2] = ej.z),
                              (tz += 3);
                      U.bindBuffer(U.ARRAY_BUFFER, eP.__webglNormalBuffer),
                        U.bufferData(U.ARRAY_BUFFER, t4, eF);
                    }
                    if (ir && id && eO) {
                      for (eI = 0, e3 = ic.length; eI < e3; eI++)
                        if (
                          ((eW = ip[(ek = ic[eI])]), void 0 !== (e6 = id[ek]))
                        )
                          for (tH = 0; tH < 3; tH++)
                            (tw = e6[tH]),
                              (tG[tF] = tw.u),
                              (tG[tF + 1] = tw.v),
                              (tF += 2);
                      for (eI = 0, e3 = iu.length; eI < e3; eI++)
                        if (
                          ((eW = ip[(ek = iu[eI])]), void 0 !== (e6 = id[ek]))
                        )
                          for (tH = 0; tH < 4; tH++)
                            (tw = e6[tH]),
                              (tG[tF] = tw.u),
                              (tG[tF + 1] = tw.v),
                              (tF += 2);
                      tF > 0 &&
                        (U.bindBuffer(U.ARRAY_BUFFER, eP.__webglUVBuffer),
                        U.bufferData(U.ARRAY_BUFFER, tG, eF));
                    }
                    if (ir && iE && eO) {
                      for (eI = 0, e3 = ic.length; eI < e3; eI++)
                        if (
                          ((eW = ip[(ek = ic[eI])]), void 0 !== (e5 = iE[ek]))
                        )
                          for (tH = 0; tH < 3; tH++)
                            (tS = e5[tH]),
                              (tj[tD] = tS.u),
                              (tj[tD + 1] = tS.v),
                              (tD += 2);
                      for (eI = 0, e3 = iu.length; eI < e3; eI++)
                        if (
                          ((eW = ip[(ek = iu[eI])]), void 0 !== (e5 = iE[ek]))
                        )
                          for (tH = 0; tH < 4; tH++)
                            (tS = e5[tH]),
                              (tj[tD] = tS.u),
                              (tj[tD + 1] = tS.v),
                              (tD += 2);
                      tD > 0 &&
                        (U.bindBuffer(U.ARRAY_BUFFER, eP.__webglUV2Buffer),
                        U.bufferData(U.ARRAY_BUFFER, tj, eF));
                    }
                    if (ii) {
                      for (eI = 0, e3 = ic.length; eI < e3; eI++)
                        (eW = ip[ic[eI]]),
                          (t9[tV] = tP),
                          (t9[tV + 1] = tP + 1),
                          (t9[tV + 2] = tP + 2),
                          (tV += 3),
                          (ie[tN] = tP),
                          (ie[tN + 1] = tP + 1),
                          (ie[tN + 2] = tP),
                          (ie[tN + 3] = tP + 2),
                          (ie[tN + 4] = tP + 1),
                          (ie[tN + 5] = tP + 2),
                          (tN += 6),
                          (tP += 3);
                      for (eI = 0, e3 = iu.length; eI < e3; eI++)
                        (eW = ip[iu[eI]]),
                          (t9[tV] = tP),
                          (t9[tV + 1] = tP + 1),
                          (t9[tV + 2] = tP + 3),
                          (t9[tV + 3] = tP + 1),
                          (t9[tV + 4] = tP + 2),
                          (t9[tV + 5] = tP + 3),
                          (tV += 6),
                          (ie[tN] = tP),
                          (ie[tN + 1] = tP + 1),
                          (ie[tN + 2] = tP),
                          (ie[tN + 3] = tP + 3),
                          (ie[tN + 4] = tP + 1),
                          (ie[tN + 5] = tP + 2),
                          (ie[tN + 6] = tP + 2),
                          (ie[tN + 7] = tP + 3),
                          (tN += 8),
                          (tP += 4);
                      U.bindBuffer(
                        U.ELEMENT_ARRAY_BUFFER,
                        eP.__webglFaceBuffer
                      ),
                        U.bufferData(U.ELEMENT_ARRAY_BUFFER, t9, eF),
                        U.bindBuffer(
                          U.ELEMENT_ARRAY_BUFFER,
                          eP.__webglLineBuffer
                        ),
                        U.bufferData(U.ELEMENT_ARRAY_BUFFER, ie, eF);
                    }
                    if (tQ) {
                      for (tH = 0, tb = tQ.length; tH < tb; tH++)
                        if ((tJ = tQ[tH]).__original.needsUpdate) {
                          if (((t3 = 0), 1 === tJ.size)) {
                            if (
                              void 0 === tJ.boundTo ||
                              "vertices" === tJ.boundTo
                            ) {
                              for (eI = 0, e3 = ic.length; eI < e3; eI++)
                                (eW = ip[ic[eI]]),
                                  (tJ.array[t3] = tJ.value[eW.a]),
                                  (tJ.array[t3 + 1] = tJ.value[eW.b]),
                                  (tJ.array[t3 + 2] = tJ.value[eW.c]),
                                  (t3 += 3);
                              for (eI = 0, e3 = iu.length; eI < e3; eI++)
                                (eW = ip[iu[eI]]),
                                  (tJ.array[t3] = tJ.value[eW.a]),
                                  (tJ.array[t3 + 1] = tJ.value[eW.b]),
                                  (tJ.array[t3 + 2] = tJ.value[eW.c]),
                                  (tJ.array[t3 + 3] = tJ.value[eW.d]),
                                  (t3 += 4);
                            } else if ("faces" === tJ.boundTo) {
                              for (eI = 0, e3 = ic.length; eI < e3; eI++)
                                (tk = tJ.value[ic[eI]]),
                                  (tJ.array[t3] = tk),
                                  (tJ.array[t3 + 1] = tk),
                                  (tJ.array[t3 + 2] = tk),
                                  (t3 += 3);
                              for (eI = 0, e3 = iu.length; eI < e3; eI++)
                                (tk = tJ.value[iu[eI]]),
                                  (tJ.array[t3] = tk),
                                  (tJ.array[t3 + 1] = tk),
                                  (tJ.array[t3 + 2] = tk),
                                  (tJ.array[t3 + 3] = tk),
                                  (t3 += 4);
                            }
                          } else if (2 === tJ.size) {
                            if (
                              void 0 === tJ.boundTo ||
                              "vertices" === tJ.boundTo
                            ) {
                              for (eI = 0, e3 = ic.length; eI < e3; eI++)
                                (eW = ip[ic[eI]]),
                                  (e7 = tJ.value[eW.a]),
                                  (eq = tJ.value[eW.b]),
                                  (eK = tJ.value[eW.c]),
                                  (tJ.array[t3] = e7.x),
                                  (tJ.array[t3 + 1] = e7.y),
                                  (tJ.array[t3 + 2] = eq.x),
                                  (tJ.array[t3 + 3] = eq.y),
                                  (tJ.array[t3 + 4] = eK.x),
                                  (tJ.array[t3 + 5] = eK.y),
                                  (t3 += 6);
                              for (eI = 0, e3 = iu.length; eI < e3; eI++)
                                (eW = ip[iu[eI]]),
                                  (e7 = tJ.value[eW.a]),
                                  (eq = tJ.value[eW.b]),
                                  (eK = tJ.value[eW.c]),
                                  (eZ = tJ.value[eW.d]),
                                  (tJ.array[t3] = e7.x),
                                  (tJ.array[t3 + 1] = e7.y),
                                  (tJ.array[t3 + 2] = eq.x),
                                  (tJ.array[t3 + 3] = eq.y),
                                  (tJ.array[t3 + 4] = eK.x),
                                  (tJ.array[t3 + 5] = eK.y),
                                  (tJ.array[t3 + 6] = eZ.x),
                                  (tJ.array[t3 + 7] = eZ.y),
                                  (t3 += 8);
                            } else if ("faces" === tJ.boundTo) {
                              for (eI = 0, e3 = ic.length; eI < e3; eI++)
                                (eK = eq = e7 = tk = tJ.value[ic[eI]]),
                                  (tJ.array[t3] = e7.x),
                                  (tJ.array[t3 + 1] = e7.y),
                                  (tJ.array[t3 + 2] = eq.x),
                                  (tJ.array[t3 + 3] = eq.y),
                                  (tJ.array[t3 + 4] = eK.x),
                                  (tJ.array[t3 + 5] = eK.y),
                                  (t3 += 6);
                              for (eI = 0, e3 = iu.length; eI < e3; eI++)
                                (eZ = eK = eq = e7 = tk = tJ.value[iu[eI]]),
                                  (tJ.array[t3] = e7.x),
                                  (tJ.array[t3 + 1] = e7.y),
                                  (tJ.array[t3 + 2] = eq.x),
                                  (tJ.array[t3 + 3] = eq.y),
                                  (tJ.array[t3 + 4] = eK.x),
                                  (tJ.array[t3 + 5] = eK.y),
                                  (tJ.array[t3 + 6] = eZ.x),
                                  (tJ.array[t3 + 7] = eZ.y),
                                  (t3 += 8);
                            }
                          } else if (3 === tJ.size) {
                            if (
                              ((ez =
                                "c" === tJ.type
                                  ? ["r", "g", "b"]
                                  : ["x", "y", "z"]),
                              void 0 === tJ.boundTo ||
                                "vertices" === tJ.boundTo)
                            ) {
                              for (eI = 0, e3 = ic.length; eI < e3; eI++)
                                (eW = ip[ic[eI]]),
                                  (e7 = tJ.value[eW.a]),
                                  (eq = tJ.value[eW.b]),
                                  (eK = tJ.value[eW.c]),
                                  (tJ.array[t3] = e7[ez[0]]),
                                  (tJ.array[t3 + 1] = e7[ez[1]]),
                                  (tJ.array[t3 + 2] = e7[ez[2]]),
                                  (tJ.array[t3 + 3] = eq[ez[0]]),
                                  (tJ.array[t3 + 4] = eq[ez[1]]),
                                  (tJ.array[t3 + 5] = eq[ez[2]]),
                                  (tJ.array[t3 + 6] = eK[ez[0]]),
                                  (tJ.array[t3 + 7] = eK[ez[1]]),
                                  (tJ.array[t3 + 8] = eK[ez[2]]),
                                  (t3 += 9);
                              for (eI = 0, e3 = iu.length; eI < e3; eI++)
                                (eW = ip[iu[eI]]),
                                  (e7 = tJ.value[eW.a]),
                                  (eq = tJ.value[eW.b]),
                                  (eK = tJ.value[eW.c]),
                                  (eZ = tJ.value[eW.d]),
                                  (tJ.array[t3] = e7[ez[0]]),
                                  (tJ.array[t3 + 1] = e7[ez[1]]),
                                  (tJ.array[t3 + 2] = e7[ez[2]]),
                                  (tJ.array[t3 + 3] = eq[ez[0]]),
                                  (tJ.array[t3 + 4] = eq[ez[1]]),
                                  (tJ.array[t3 + 5] = eq[ez[2]]),
                                  (tJ.array[t3 + 6] = eK[ez[0]]),
                                  (tJ.array[t3 + 7] = eK[ez[1]]),
                                  (tJ.array[t3 + 8] = eK[ez[2]]),
                                  (tJ.array[t3 + 9] = eZ[ez[0]]),
                                  (tJ.array[t3 + 10] = eZ[ez[1]]),
                                  (tJ.array[t3 + 11] = eZ[ez[2]]),
                                  (t3 += 12);
                            } else if ("faces" === tJ.boundTo) {
                              for (eI = 0, e3 = ic.length; eI < e3; eI++)
                                (eK = eq = e7 = tk = tJ.value[ic[eI]]),
                                  (tJ.array[t3] = e7[ez[0]]),
                                  (tJ.array[t3 + 1] = e7[ez[1]]),
                                  (tJ.array[t3 + 2] = e7[ez[2]]),
                                  (tJ.array[t3 + 3] = eq[ez[0]]),
                                  (tJ.array[t3 + 4] = eq[ez[1]]),
                                  (tJ.array[t3 + 5] = eq[ez[2]]),
                                  (tJ.array[t3 + 6] = eK[ez[0]]),
                                  (tJ.array[t3 + 7] = eK[ez[1]]),
                                  (tJ.array[t3 + 8] = eK[ez[2]]),
                                  (t3 += 9);
                              for (eI = 0, e3 = iu.length; eI < e3; eI++)
                                (eZ = eK = eq = e7 = tk = tJ.value[iu[eI]]),
                                  (tJ.array[t3] = e7[ez[0]]),
                                  (tJ.array[t3 + 1] = e7[ez[1]]),
                                  (tJ.array[t3 + 2] = e7[ez[2]]),
                                  (tJ.array[t3 + 3] = eq[ez[0]]),
                                  (tJ.array[t3 + 4] = eq[ez[1]]),
                                  (tJ.array[t3 + 5] = eq[ez[2]]),
                                  (tJ.array[t3 + 6] = eK[ez[0]]),
                                  (tJ.array[t3 + 7] = eK[ez[1]]),
                                  (tJ.array[t3 + 8] = eK[ez[2]]),
                                  (tJ.array[t3 + 9] = eZ[ez[0]]),
                                  (tJ.array[t3 + 10] = eZ[ez[1]]),
                                  (tJ.array[t3 + 11] = eZ[ez[2]]),
                                  (t3 += 12);
                            }
                          } else if (4 === tJ.size) {
                            if (
                              void 0 === tJ.boundTo ||
                              "vertices" === tJ.boundTo
                            ) {
                              for (eI = 0, e3 = ic.length; eI < e3; eI++)
                                (eW = ip[ic[eI]]),
                                  (e7 = tJ.value[eW.a]),
                                  (eq = tJ.value[eW.b]),
                                  (eK = tJ.value[eW.c]),
                                  (tJ.array[t3] = e7.x),
                                  (tJ.array[t3 + 1] = e7.y),
                                  (tJ.array[t3 + 2] = e7.z),
                                  (tJ.array[t3 + 3] = e7.w),
                                  (tJ.array[t3 + 4] = eq.x),
                                  (tJ.array[t3 + 5] = eq.y),
                                  (tJ.array[t3 + 6] = eq.z),
                                  (tJ.array[t3 + 7] = eq.w),
                                  (tJ.array[t3 + 8] = eK.x),
                                  (tJ.array[t3 + 9] = eK.y),
                                  (tJ.array[t3 + 10] = eK.z),
                                  (tJ.array[t3 + 11] = eK.w),
                                  (t3 += 12);
                              for (eI = 0, e3 = iu.length; eI < e3; eI++)
                                (eW = ip[iu[eI]]),
                                  (e7 = tJ.value[eW.a]),
                                  (eq = tJ.value[eW.b]),
                                  (eK = tJ.value[eW.c]),
                                  (eZ = tJ.value[eW.d]),
                                  (tJ.array[t3] = e7.x),
                                  (tJ.array[t3 + 1] = e7.y),
                                  (tJ.array[t3 + 2] = e7.z),
                                  (tJ.array[t3 + 3] = e7.w),
                                  (tJ.array[t3 + 4] = eq.x),
                                  (tJ.array[t3 + 5] = eq.y),
                                  (tJ.array[t3 + 6] = eq.z),
                                  (tJ.array[t3 + 7] = eq.w),
                                  (tJ.array[t3 + 8] = eK.x),
                                  (tJ.array[t3 + 9] = eK.y),
                                  (tJ.array[t3 + 10] = eK.z),
                                  (tJ.array[t3 + 11] = eK.w),
                                  (tJ.array[t3 + 12] = eZ.x),
                                  (tJ.array[t3 + 13] = eZ.y),
                                  (tJ.array[t3 + 14] = eZ.z),
                                  (tJ.array[t3 + 15] = eZ.w),
                                  (t3 += 16);
                            } else if ("faces" === tJ.boundTo) {
                              for (eI = 0, e3 = ic.length; eI < e3; eI++)
                                (eK = eq = e7 = tk = tJ.value[ic[eI]]),
                                  (tJ.array[t3] = e7.x),
                                  (tJ.array[t3 + 1] = e7.y),
                                  (tJ.array[t3 + 2] = e7.z),
                                  (tJ.array[t3 + 3] = e7.w),
                                  (tJ.array[t3 + 4] = eq.x),
                                  (tJ.array[t3 + 5] = eq.y),
                                  (tJ.array[t3 + 6] = eq.z),
                                  (tJ.array[t3 + 7] = eq.w),
                                  (tJ.array[t3 + 8] = eK.x),
                                  (tJ.array[t3 + 9] = eK.y),
                                  (tJ.array[t3 + 10] = eK.z),
                                  (tJ.array[t3 + 11] = eK.w),
                                  (t3 += 12);
                              for (eI = 0, e3 = iu.length; eI < e3; eI++)
                                (eZ = eK = eq = e7 = tk = tJ.value[iu[eI]]),
                                  (tJ.array[t3] = e7.x),
                                  (tJ.array[t3 + 1] = e7.y),
                                  (tJ.array[t3 + 2] = e7.z),
                                  (tJ.array[t3 + 3] = e7.w),
                                  (tJ.array[t3 + 4] = eq.x),
                                  (tJ.array[t3 + 5] = eq.y),
                                  (tJ.array[t3 + 6] = eq.z),
                                  (tJ.array[t3 + 7] = eq.w),
                                  (tJ.array[t3 + 8] = eK.x),
                                  (tJ.array[t3 + 9] = eK.y),
                                  (tJ.array[t3 + 10] = eK.z),
                                  (tJ.array[t3 + 11] = eK.w),
                                  (tJ.array[t3 + 12] = eZ.x),
                                  (tJ.array[t3 + 13] = eZ.y),
                                  (tJ.array[t3 + 14] = eZ.z),
                                  (tJ.array[t3 + 15] = eZ.w),
                                  (t3 += 16);
                            }
                          }
                          U.bindBuffer(U.ARRAY_BUFFER, tJ.buffer),
                            U.bufferData(U.ARRAY_BUFFER, tJ.array, eF);
                        }
                    }
                    eD &&
                      (delete eP.__inittedArrays,
                      delete eP.__colorArray,
                      delete eP.__normalArray,
                      delete eP.__tangentArray,
                      delete eP.__uvArray,
                      delete eP.__uv2Array,
                      delete eP.__faceArray,
                      delete eP.__vertexArray,
                      delete eP.__lineArray,
                      delete eP.__skinVertexAArray,
                      delete eP.__skinVertexBArray,
                      delete eP.__skinIndexArray,
                      delete eP.__skinWeightArray);
                  }
                }
              (e$.verticesNeedUpdate = !1),
                (e$.morphTargetsNeedUpdate = !1),
                (e$.elementsNeedUpdate = !1),
                (e$.uvsNeedUpdate = !1),
                (e$.normalsNeedUpdate = !1),
                (e$.colorsNeedUpdate = !1),
                (e$.tangentsNeedUpdate = !1),
                ey.attributes && p(ey);
            }
          } else if (eg instanceof THREE.Ribbon) {
            if (e$.verticesNeedUpdate || e$.colorsNeedUpdate) {
              var iy = e$,
                i_ = U.DYNAMIC_DRAW,
                ix = void 0,
                iH = void 0,
                ib = void 0,
                i8 = void 0,
                iw = void 0,
                iS = iy.vertices,
                i0 = iy.colors,
                iC = iS.length,
                iM = i0.length,
                iA = iy.__vertexArray,
                i1 = iy.__colorArray,
                iL = iy.colorsNeedUpdate;
              if (iy.verticesNeedUpdate) {
                for (ix = 0; ix < iC; ix++)
                  (ib = iS[ix]),
                    (iA[(i8 = 3 * ix)] = ib.x),
                    (iA[i8 + 1] = ib.y),
                    (iA[i8 + 2] = ib.z);
                U.bindBuffer(U.ARRAY_BUFFER, iy.__webglVertexBuffer),
                  U.bufferData(U.ARRAY_BUFFER, iA, i_);
              }
              if (iL) {
                for (iH = 0; iH < iM; iH++)
                  (iw = i0[iH]),
                    (i1[(i8 = 3 * iH)] = iw.r),
                    (i1[i8 + 1] = iw.g),
                    (i1[i8 + 2] = iw.b);
                U.bindBuffer(U.ARRAY_BUFFER, iy.__webglColorBuffer),
                  U.bufferData(U.ARRAY_BUFFER, i1, i_);
              }
            }
            (e$.verticesNeedUpdate = !1), (e$.colorsNeedUpdate = !1);
          } else if (eg instanceof THREE.Line) {
            if (
              ((eR = (ey = i(eg, eT)).attributes && u(ey)),
              e$.verticesNeedUpdate || e$.colorsNeedUpdate || eR)
            ) {
              var iP = e$,
                iU = U.DYNAMIC_DRAW,
                iF = void 0,
                iD = void 0,
                iV = void 0,
                iz = void 0,
                iB = void 0,
                iN = iP.vertices,
                iO = iP.colors,
                i2 = iN.length,
                iI = iO.length,
                i3 = iP.__vertexArray,
                ik = iP.__colorArray,
                iW = iP.colorsNeedUpdate,
                iG = iP.__webglCustomAttributesList,
                ij = void 0,
                i4 = void 0,
                iX = void 0,
                iY = void 0,
                i6 = void 0,
                i5 = void 0;
              if (iP.verticesNeedUpdate) {
                for (iF = 0; iF < i2; iF++)
                  (iV = iN[iF]),
                    (i3[(iz = 3 * iF)] = iV.x),
                    (i3[iz + 1] = iV.y),
                    (i3[iz + 2] = iV.z);
                U.bindBuffer(U.ARRAY_BUFFER, iP.__webglVertexBuffer),
                  U.bufferData(U.ARRAY_BUFFER, i3, iU);
              }
              if (iW) {
                for (iD = 0; iD < iI; iD++)
                  (iB = iO[iD]),
                    (ik[(iz = 3 * iD)] = iB.r),
                    (ik[iz + 1] = iB.g),
                    (ik[iz + 2] = iB.b);
                U.bindBuffer(U.ARRAY_BUFFER, iP.__webglColorBuffer),
                  U.bufferData(U.ARRAY_BUFFER, ik, iU);
              }
              if (iG) {
                for (ij = 0, i4 = iG.length; ij < i4; ij++)
                  if (
                    (i5 = iG[ij]).needsUpdate &&
                    (void 0 === i5.boundTo || "vertices" === i5.boundTo)
                  ) {
                    if (((iz = 0), (iY = i5.value.length), 1 === i5.size))
                      for (iX = 0; iX < iY; iX++) i5.array[iX] = i5.value[iX];
                    else if (2 === i5.size)
                      for (iX = 0; iX < iY; iX++)
                        (i6 = i5.value[iX]),
                          (i5.array[iz] = i6.x),
                          (i5.array[iz + 1] = i6.y),
                          (iz += 2);
                    else if (3 === i5.size) {
                      if ("c" === i5.type)
                        for (iX = 0; iX < iY; iX++)
                          (i6 = i5.value[iX]),
                            (i5.array[iz] = i6.r),
                            (i5.array[iz + 1] = i6.g),
                            (i5.array[iz + 2] = i6.b),
                            (iz += 3);
                      else
                        for (iX = 0; iX < iY; iX++)
                          (i6 = i5.value[iX]),
                            (i5.array[iz] = i6.x),
                            (i5.array[iz + 1] = i6.y),
                            (i5.array[iz + 2] = i6.z),
                            (iz += 3);
                    } else if (4 === i5.size)
                      for (iX = 0; iX < iY; iX++)
                        (i6 = i5.value[iX]),
                          (i5.array[iz] = i6.x),
                          (i5.array[iz + 1] = i6.y),
                          (i5.array[iz + 2] = i6.z),
                          (i5.array[iz + 3] = i6.w),
                          (iz += 4);
                    U.bindBuffer(U.ARRAY_BUFFER, i5.buffer),
                      U.bufferData(U.ARRAY_BUFFER, i5.array, iU);
                  }
              }
            }
            (e$.verticesNeedUpdate = !1),
              (e$.colorsNeedUpdate = !1),
              ey.attributes && p(ey);
          } else
            eg instanceof THREE.ParticleSystem &&
              ((eR = (ey = i(eg, eT)).attributes && u(ey)),
              (e$.verticesNeedUpdate ||
                e$.colorsNeedUpdate ||
                eg.sortParticles ||
                eR) &&
                n(e$, U.DYNAMIC_DRAW, eg),
              (e$.verticesNeedUpdate = !1),
              (e$.colorsNeedUpdate = !1),
              ey.attributes && p(ey));
        }
      }),
      (this.initMaterial = function (e, t, i, r) {
        if (
          (e instanceof THREE.MeshDepthMaterial
            ? (u = "depth")
            : e instanceof THREE.MeshNormalMaterial
            ? (u = "normal")
            : e instanceof THREE.MeshBasicMaterial
            ? (u = "basic")
            : e instanceof THREE.MeshLambertMaterial
            ? (u = "lambert")
            : e instanceof THREE.MeshPhongMaterial
            ? (u = "phong")
            : e instanceof THREE.LineBasicMaterial
            ? (u = "basic")
            : e instanceof THREE.ParticleBasicMaterial &&
              (u = "particle_basic"),
          u)
        ) {
          var o = THREE.ShaderLib[u];
          (e.uniforms = THREE.UniformsUtils.clone(o.uniforms)),
            (e.vertexShader = o.vertexShader),
            (e.fragmentShader = o.fragmentShader);
        }
        for (p = s = n = o = 0, a = t.length; p < a; p++)
          !(d = t[p]).onlyShadow &&
            (d instanceof THREE.DirectionalLight && s++,
            d instanceof THREE.PointLight && n++,
            d instanceof THREE.SpotLight && o++);
        for (
          n + o + s <= P
            ? ((p = s), (a = n))
            : ((p = Math.ceil((P * s) / (n + s))), (o = a = P - p)),
            n = p,
            s = o,
            o = f = 0,
            p = t.length;
          o < p;
          o++
        )
          (d = t[o]).castShadow &&
            (d instanceof THREE.SpotLight && f++,
            d instanceof THREE.DirectionalLight && !d.shadowCascade && f++);
        eT && r && r.useVertexTexture
          ? (c = 1024)
          : ((t = Math.floor(
              ((t = U.getParameter(U.MAX_VERTEX_UNIFORM_VECTORS)) - 20) / 4
            )),
            void 0 !== r &&
              r instanceof THREE.SkinnedMesh &&
              (t = Math.min(r.bones.length, t)) < r.bones.length &&
              console.warn(
                "WebGLRenderer: too many bones - " +
                  r.bones.length +
                  ", this GPU supports just " +
                  t +
                  " (try OpenGL instead of ANGLE)"
              ),
            (c = t));
        a: {
          (d = e.fragmentShader), (p = e.vertexShader);
          var n,
            a,
            s,
            l,
            h,
            c,
            f,
            u,
            p,
            d,
            E,
            m,
            o = e.uniforms,
            t = e.attributes,
            i = {
              map: !!e.map,
              envMap: !!e.envMap,
              lightMap: !!e.lightMap,
              vertexColors: e.vertexColors,
              fog: i,
              useFog: e.fog,
              sizeAttenuation: e.sizeAttenuation,
              skinning: e.skinning,
              maxBones: c,
              useVertexTexture: eT && r && r.useVertexTexture,
              boneTextureWidth: r && r.boneTextureWidth,
              boneTextureHeight: r && r.boneTextureHeight,
              morphTargets: e.morphTargets,
              morphNormals: e.morphNormals,
              maxMorphTargets: this.maxMorphTargets,
              maxMorphNormals: this.maxMorphNormals,
              maxDirLights: n,
              maxPointLights: a,
              maxSpotLights: s,
              maxShadows: f,
              shadowMapEnabled: this.shadowMapEnabled && r.receiveShadow,
              shadowMapSoft: this.shadowMapSoft,
              shadowMapDebug: this.shadowMapDebug,
              shadowMapCascade: this.shadowMapCascade,
              alphaTest: e.alphaTest,
              metal: e.metal,
              perPixel: e.perPixel,
              wrapAround: e.wrapAround,
              doubleSided: r && r.doubleSided,
            },
            r = [];
          for (m in (u ? r.push(u) : (r.push(d), r.push(p)), i))
            r.push(m), r.push(i[m]);
          for (u = r.join(), m = 0, r = V.length; m < r; m++)
            if ((n = V[m]).code === u) {
              n.usedTimes++, (E = n.program);
              break a;
            }
          (m = U.createProgram()),
            (r = [
              "precision " + H + " float;",
              e$ ? "#define VERTEX_TEXTURES" : "",
              D.gammaInput ? "#define GAMMA_INPUT" : "",
              D.gammaOutput ? "#define GAMMA_OUTPUT" : "",
              D.physicallyBasedShading
                ? "#define PHYSICALLY_BASED_SHADING"
                : "",
              "#define MAX_DIR_LIGHTS " + i.maxDirLights,
              "#define MAX_POINT_LIGHTS " + i.maxPointLights,
              "#define MAX_SPOT_LIGHTS " + i.maxSpotLights,
              "#define MAX_SHADOWS " + i.maxShadows,
              "#define MAX_BONES " + i.maxBones,
              i.map ? "#define USE_MAP" : "",
              i.envMap ? "#define USE_ENVMAP" : "",
              i.lightMap ? "#define USE_LIGHTMAP" : "",
              i.vertexColors ? "#define USE_COLOR" : "",
              i.skinning ? "#define USE_SKINNING" : "",
              i.useVertexTexture ? "#define BONE_TEXTURE" : "",
              i.boneTextureWidth
                ? "#define N_BONE_PIXEL_X " + i.boneTextureWidth.toFixed(1)
                : "",
              i.boneTextureHeight
                ? "#define N_BONE_PIXEL_Y " + i.boneTextureHeight.toFixed(1)
                : "",
              i.morphTargets ? "#define USE_MORPHTARGETS" : "",
              i.morphNormals ? "#define USE_MORPHNORMALS" : "",
              i.perPixel ? "#define PHONG_PER_PIXEL" : "",
              i.wrapAround ? "#define WRAP_AROUND" : "",
              i.doubleSided ? "#define DOUBLE_SIDED" : "",
              i.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
              i.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "",
              i.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "",
              i.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "",
              i.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
              "uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\n#ifdef USE_MORPHNORMALS\nattribute vec3 morphNormal0;\nattribute vec3 morphNormal1;\nattribute vec3 morphNormal2;\nattribute vec3 morphNormal3;\n#else\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n",
            ].join("\n")),
            (n = $(
              "fragment",
              (n = [
                "precision " + H + " float;",
                "#define MAX_DIR_LIGHTS " + i.maxDirLights,
                "#define MAX_POINT_LIGHTS " + i.maxPointLights,
                "#define MAX_SPOT_LIGHTS " + i.maxSpotLights,
                "#define MAX_SHADOWS " + i.maxShadows,
                i.alphaTest ? "#define ALPHATEST " + i.alphaTest : "",
                D.gammaInput ? "#define GAMMA_INPUT" : "",
                D.gammaOutput ? "#define GAMMA_OUTPUT" : "",
                D.physicallyBasedShading
                  ? "#define PHYSICALLY_BASED_SHADING"
                  : "",
                i.useFog && i.fog ? "#define USE_FOG" : "",
                i.useFog && i.fog instanceof THREE.FogExp2
                  ? "#define FOG_EXP2"
                  : "",
                i.map ? "#define USE_MAP" : "",
                i.envMap ? "#define USE_ENVMAP" : "",
                i.lightMap ? "#define USE_LIGHTMAP" : "",
                i.vertexColors ? "#define USE_COLOR" : "",
                i.metal ? "#define METAL" : "",
                i.perPixel ? "#define PHONG_PER_PIXEL" : "",
                i.wrapAround ? "#define WRAP_AROUND" : "",
                i.doubleSided ? "#define DOUBLE_SIDED" : "",
                i.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
                i.shadowMapSoft ? "#define SHADOWMAP_SOFT" : "",
                i.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "",
                i.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "",
                "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n",
              ].join("\n")) + d
            )),
            (r = $("vertex", r + p)),
            U.attachShader(m, r),
            U.attachShader(m, n),
            U.linkProgram(m),
            U.getProgramParameter(m, U.LINK_STATUS) ||
              console.error(
                "Could not initialise shader\nVALIDATE_STATUS: " +
                  U.getProgramParameter(m, U.VALIDATE_STATUS) +
                  ", gl error [" +
                  U.getError() +
                  "]"
              ),
            U.deleteShader(n),
            U.deleteShader(r),
            (m.uniforms = {}),
            (m.attributes = {});
          var v,
            r = [
              "viewMatrix",
              "modelViewMatrix",
              "projectionMatrix",
              "normalMatrix",
              "objectMatrix",
              "cameraPosition",
              "morphTargetInfluences",
            ];
          for (v in (i.useVertexTexture
            ? r.push("boneTexture")
            : r.push("boneGlobalMatrices"),
          o))
            r.push(v);
          for (v = r, r = 0, o = v.length; r < o; r++)
            (n = v[r]), (m.uniforms[n] = U.getUniformLocation(m, n));
          for (
            v = 0,
              r = [
                "position",
                "normal",
                "uv",
                "uv2",
                "tangent",
                "color",
                "skinVertexA",
                "skinVertexB",
                "skinIndex",
                "skinWeight",
              ];
            v < i.maxMorphTargets;
            v++
          )
            r.push("morphTarget" + v);
          for (v = 0; v < i.maxMorphNormals; v++) r.push("morphNormal" + v);
          for (E in t) r.push(E);
          for (v = 0, i = (E = r).length; v < i; v++)
            (r = E[v]), (m.attributes[r] = U.getAttribLocation(m, r));
          (m.id = z++),
            V.push({ program: m, code: u, usedTimes: 1 }),
            (D.info.memory.programs = V.length),
            (E = m);
        }
        if (
          ((e.program = E),
          (E = e.program.attributes).position >= 0 &&
            U.enableVertexAttribArray(E.position),
          E.color >= 0 && U.enableVertexAttribArray(E.color),
          E.normal >= 0 && U.enableVertexAttribArray(E.normal),
          E.tangent >= 0 && U.enableVertexAttribArray(E.tangent),
          e.skinning &&
            E.skinVertexA >= 0 &&
            E.skinVertexB >= 0 &&
            E.skinIndex >= 0 &&
            E.skinWeight >= 0 &&
            (U.enableVertexAttribArray(E.skinVertexA),
            U.enableVertexAttribArray(E.skinVertexB),
            U.enableVertexAttribArray(E.skinIndex),
            U.enableVertexAttribArray(E.skinWeight)),
          e.attributes)
        )
          for (h in e.attributes)
            void 0 !== E[h] && E[h] >= 0 && U.enableVertexAttribArray(E[h]);
        if (e.morphTargets)
          for (
            h = 0, e.numSupportedMorphTargets = 0, m = "morphTarget";
            h < this.maxMorphTargets;
            h++
          )
            E[(v = m + h)] >= 0 &&
              (U.enableVertexAttribArray(E[v]), e.numSupportedMorphTargets++);
        if (e.morphNormals)
          for (
            h = 0, e.numSupportedMorphNormals = 0, m = "morphNormal";
            h < this.maxMorphNormals;
            h++
          )
            E[(v = m + h)] >= 0 &&
              (U.enableVertexAttribArray(E[v]), e.numSupportedMorphNormals++);
        for (l in ((e.uniformsList = []), e.uniforms))
          e.uniformsList.push([e.uniforms[l], l]);
      }),
      (this.setFaceCulling = function (e, t) {
        e
          ? (t && "ccw" !== t ? U.frontFace(U.CW) : U.frontFace(U.CCW),
            "back" === e
              ? U.cullFace(U.BACK)
              : "front" === e
              ? U.cullFace(U.FRONT)
              : U.cullFace(U.FRONT_AND_BACK),
            U.enable(U.CULL_FACE))
          : U.disable(U.CULL_FACE);
      }),
      (this.setObjectFaces = function (e) {
        G !== e.doubleSided &&
          (e.doubleSided ? U.disable(U.CULL_FACE) : U.enable(U.CULL_FACE),
          (G = e.doubleSided)),
          j !== e.flipSided &&
            (e.flipSided ? U.frontFace(U.CW) : U.frontFace(U.CCW),
            (j = e.flipSided));
      }),
      (this.setDepthTest = function (e) {
        Z !== e &&
          (e ? U.enable(U.DEPTH_TEST) : U.disable(U.DEPTH_TEST), (Z = e));
      }),
      (this.setDepthWrite = function (e) {
        Q !== e && (U.depthMask(e), (Q = e));
      }),
      (this.setBlending = function (e, t, i, r) {
        e !== X &&
          (e === THREE.NoBlending
            ? U.disable(U.BLEND)
            : e === THREE.AdditiveBlending
            ? (U.enable(U.BLEND),
              U.blendEquation(U.FUNC_ADD),
              U.blendFunc(U.SRC_ALPHA, U.ONE))
            : e === THREE.SubtractiveBlending
            ? (U.enable(U.BLEND),
              U.blendEquation(U.FUNC_ADD),
              U.blendFunc(U.ZERO, U.ONE_MINUS_SRC_COLOR))
            : e === THREE.MultiplyBlending
            ? (U.enable(U.BLEND),
              U.blendEquation(U.FUNC_ADD),
              U.blendFunc(U.ZERO, U.SRC_COLOR))
            : e === THREE.CustomBlending
            ? U.enable(U.BLEND)
            : (U.enable(U.BLEND),
              U.blendEquationSeparate(U.FUNC_ADD, U.FUNC_ADD),
              U.blendFuncSeparate(
                U.SRC_ALPHA,
                U.ONE_MINUS_SRC_ALPHA,
                U.ONE,
                U.ONE_MINUS_SRC_ALPHA
              )),
          (X = e)),
          e === THREE.CustomBlending
            ? (t !== Y && (U.blendEquation(_(t)), (Y = t)),
              (i !== q || r !== K) &&
                (U.blendFunc(_(i), _(r)), (q = i), (K = r)))
            : (K = q = Y = null);
      }),
      (this.setTexture = function (e, t) {
        if (e.needsUpdate) {
          !e.__webglInit &&
            ((e.__webglInit = !0),
            (e.__webglTexture = U.createTexture()),
            D.info.memory.textures++),
            U.activeTexture(U.TEXTURE0 + t),
            U.bindTexture(U.TEXTURE_2D, e.__webglTexture),
            U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL, e.flipY),
            U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.premultiplyAlpha);
          var i = e.image,
            r =
              (i.width & (i.width - 1)) == 0 &&
              (i.height & (i.height - 1)) == 0,
            o = _(e.format),
            n = _(e.type);
          T(U.TEXTURE_2D, e, r),
            e instanceof THREE.DataTexture
              ? U.texImage2D(
                  U.TEXTURE_2D,
                  0,
                  o,
                  i.width,
                  i.height,
                  0,
                  o,
                  n,
                  i.data
                )
              : U.texImage2D(U.TEXTURE_2D, 0, o, o, n, e.image),
            e.generateMipmaps && r && U.generateMipmap(U.TEXTURE_2D),
            (e.needsUpdate = !1),
            e.onUpdate && e.onUpdate();
        } else
          U.activeTexture(U.TEXTURE0 + t),
            U.bindTexture(U.TEXTURE_2D, e.__webglTexture);
      }),
      (this.setRenderTarget = function (e) {
        var t = e instanceof THREE.WebGLRenderTargetCube;
        if (e && !e.__webglFramebuffer) {
          void 0 === e.depthBuffer && (e.depthBuffer = !0),
            void 0 === e.stencilBuffer && (e.stencilBuffer = !0),
            (e.__webglTexture = U.createTexture());
          var i =
              (e.width & (e.width - 1)) == 0 &&
              (e.height & (e.height - 1)) == 0,
            r = _(e.format),
            o = _(e.type);
          if (t) {
            (e.__webglFramebuffer = []),
              (e.__webglRenderbuffer = []),
              U.bindTexture(U.TEXTURE_CUBE_MAP, e.__webglTexture),
              T(U.TEXTURE_CUBE_MAP, e, i);
            for (var n = 0; n < 6; n++) {
              (e.__webglFramebuffer[n] = U.createFramebuffer()),
                (e.__webglRenderbuffer[n] = U.createRenderbuffer()),
                U.texImage2D(
                  U.TEXTURE_CUBE_MAP_POSITIVE_X + n,
                  0,
                  r,
                  e.width,
                  e.height,
                  0,
                  r,
                  o,
                  null
                );
              var a = e,
                s = U.TEXTURE_CUBE_MAP_POSITIVE_X + n;
              U.bindFramebuffer(U.FRAMEBUFFER, e.__webglFramebuffer[n]),
                U.framebufferTexture2D(
                  U.FRAMEBUFFER,
                  U.COLOR_ATTACHMENT0,
                  s,
                  a.__webglTexture,
                  0
                ),
                R(e.__webglRenderbuffer[n], e);
            }
            i && U.generateMipmap(U.TEXTURE_CUBE_MAP);
          } else
            (e.__webglFramebuffer = U.createFramebuffer()),
              (e.__webglRenderbuffer = U.createRenderbuffer()),
              U.bindTexture(U.TEXTURE_2D, e.__webglTexture),
              T(U.TEXTURE_2D, e, i),
              U.texImage2D(
                U.TEXTURE_2D,
                0,
                r,
                e.width,
                e.height,
                0,
                r,
                o,
                null
              ),
              (r = U.TEXTURE_2D),
              U.bindFramebuffer(U.FRAMEBUFFER, e.__webglFramebuffer),
              U.framebufferTexture2D(
                U.FRAMEBUFFER,
                U.COLOR_ATTACHMENT0,
                r,
                e.__webglTexture,
                0
              ),
              R(e.__webglRenderbuffer, e),
              i && U.generateMipmap(U.TEXTURE_2D);
          t
            ? U.bindTexture(U.TEXTURE_CUBE_MAP, null)
            : U.bindTexture(U.TEXTURE_2D, null),
            U.bindRenderbuffer(U.RENDERBUFFER, null),
            U.bindFramebuffer(U.FRAMEBUFFER, null);
        }
        e
          ? ((t = t
              ? e.__webglFramebuffer[e.activeCubeFace]
              : e.__webglFramebuffer),
            (i = e.width),
            (e = e.height),
            (o = r = 0))
          : ((t = null), (i = en), (e = ea), (r = er), (o = eo)),
          t !== N &&
            (U.bindFramebuffer(U.FRAMEBUFFER, t),
            U.viewport(r, o, i, e),
            (N = t)),
          (es = i),
          (el = e);
      }),
      (this.shadowMapPlugin = new THREE.ShadowMapPlugin()),
      this.addPrePlugin(this.shadowMapPlugin),
      this.addPostPlugin(new THREE.SpritePlugin()),
      this.addPostPlugin(new THREE.LensFlarePlugin());
  }),
  (THREE.WebGLRenderTarget = function (e, t, i) {
    (this.width = e),
      (this.height = t),
      (i = i || {}),
      (this.wrapS = void 0 !== i.wrapS ? i.wrapS : THREE.ClampToEdgeWrapping),
      (this.wrapT = void 0 !== i.wrapT ? i.wrapT : THREE.ClampToEdgeWrapping),
      (this.magFilter =
        void 0 !== i.magFilter ? i.magFilter : THREE.LinearFilter),
      (this.minFilter =
        void 0 !== i.minFilter ? i.minFilter : THREE.LinearMipMapLinearFilter),
      (this.anisotropy = void 0 !== i.anisotropy ? i.anisotropy : 1),
      (this.offset = new THREE.Vector2(0, 0)),
      (this.repeat = new THREE.Vector2(1, 1)),
      (this.format = void 0 !== i.format ? i.format : THREE.RGBAFormat),
      (this.type = void 0 !== i.type ? i.type : THREE.UnsignedByteType),
      (this.depthBuffer = void 0 === i.depthBuffer || i.depthBuffer),
      (this.stencilBuffer = void 0 === i.stencilBuffer || i.stencilBuffer),
      (this.generateMipmaps = !0);
  }),
  (THREE.WebGLRenderTarget.prototype.clone = function () {
    var e = new THREE.WebGLRenderTarget(this.width, this.height);
    return (
      (e.wrapS = this.wrapS),
      (e.wrapT = this.wrapT),
      (e.magFilter = this.magFilter),
      (e.anisotropy = this.anisotropy),
      (e.minFilter = this.minFilter),
      e.offset.copy(this.offset),
      e.repeat.copy(this.repeat),
      (e.format = this.format),
      (e.type = this.type),
      (e.depthBuffer = this.depthBuffer),
      (e.stencilBuffer = this.stencilBuffer),
      (e.generateMipmaps = this.generateMipmaps),
      e
    );
  }),
  (THREE.WebGLRenderTargetCube = function (e, t, i) {
    THREE.WebGLRenderTarget.call(this, e, t, i), (this.activeCubeFace = 0);
  }),
  (THREE.WebGLRenderTargetCube.prototype = Object.create(
    THREE.WebGLRenderTarget.prototype
  )),
  (THREE.RenderableVertex = function () {
    (this.positionWorld = new THREE.Vector3()),
      (this.positionScreen = new THREE.Vector4()),
      (this.visible = !0);
  }),
  (THREE.RenderableVertex.prototype.copy = function (e) {
    this.positionWorld.copy(e.positionWorld),
      this.positionScreen.copy(e.positionScreen);
  }),
  (THREE.RenderableFace3 = function () {
    (this.v1 = new THREE.RenderableVertex()),
      (this.v2 = new THREE.RenderableVertex()),
      (this.v3 = new THREE.RenderableVertex()),
      (this.centroidWorld = new THREE.Vector3()),
      (this.centroidScreen = new THREE.Vector3()),
      (this.normalWorld = new THREE.Vector3()),
      (this.vertexNormalsWorld = [
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
      (this.faceMaterial = this.material = null),
      (this.uvs = [[]]),
      (this.z = null);
  }),
  (THREE.RenderableFace4 = function () {
    (this.v1 = new THREE.RenderableVertex()),
      (this.v2 = new THREE.RenderableVertex()),
      (this.v3 = new THREE.RenderableVertex()),
      (this.v4 = new THREE.RenderableVertex()),
      (this.centroidWorld = new THREE.Vector3()),
      (this.centroidScreen = new THREE.Vector3()),
      (this.normalWorld = new THREE.Vector3()),
      (this.vertexNormalsWorld = [
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
      (this.faceMaterial = this.material = null),
      (this.uvs = [[]]),
      (this.z = null);
  }),
  (THREE.RenderableObject = function () {
    this.z = this.object = null;
  }),
  (THREE.RenderableParticle = function () {
    (this.rotation = this.z = this.y = this.x = null),
      (this.scale = new THREE.Vector2()),
      (this.material = null);
  }),
  (THREE.RenderableLine = function () {
    (this.z = null),
      (this.v1 = new THREE.RenderableVertex()),
      (this.v2 = new THREE.RenderableVertex()),
      (this.material = null);
  }),
  (THREE.ColorUtils = {
    adjustHSV: function (e, t, i, r) {
      var o = THREE.ColorUtils.__hsv;
      THREE.ColorUtils.rgbToHsv(e, o),
        (o.h = THREE.Math.clamp(o.h + t, 0, 1)),
        (o.s = THREE.Math.clamp(o.s + i, 0, 1)),
        (o.v = THREE.Math.clamp(o.v + r, 0, 1)),
        e.setHSV(o.h, o.s, o.v);
    },
    rgbToHsv: function (e, t) {
      var i = e.r,
        r = e.g,
        o = e.b,
        n = Math.max(Math.max(i, r), o),
        a = Math.min(Math.min(i, r), o);
      if (a === n) a = i = 0;
      else {
        var s = n - a,
          a = s / n,
          i =
            (i === n
              ? (r - o) / s
              : r === n
              ? 2 + (o - i) / s
              : 4 + (i - r) / s) / 6;
        i < 0 && (i += 1), i > 1 && (i -= 1);
      }
      return (
        void 0 === t && (t = { h: 0, s: 0, v: 0 }),
        (t.h = i),
        (t.s = a),
        (t.v = n),
        t
      );
    },
  }),
  (THREE.ColorUtils.__hsv = { h: 0, s: 0, v: 0 }),
  (THREE.GeometryUtils = {
    merge: function (e, t) {
      for (
        var i,
          r,
          o = e.vertices.length,
          n = t instanceof THREE.Mesh ? t.geometry : t,
          a = e.vertices,
          s = n.vertices,
          l = e.faces,
          h = n.faces,
          c = e.faceVertexUvs[0],
          f = n.faceVertexUvs[0],
          u = {},
          p = 0;
        p < e.materials.length;
        p++
      )
        u[e.materials[p].id] = p;
      t instanceof THREE.Mesh &&
        (t.matrixAutoUpdate && t.updateMatrix(),
        (i = t.matrix),
        (r = new THREE.Matrix4()).extractRotation(i, t.scale));
      for (var p = 0, d = s.length; p < d; p++) {
        var E = s[p].clone();
        i && i.multiplyVector3(E), a.push(E);
      }
      for (p = 0, d = h.length; p < d; p++) {
        var m,
          v,
          a = h[p],
          g = a.vertexNormals,
          $ = a.vertexColors;
        for (
          a instanceof THREE.Face3
            ? (m = new THREE.Face3(a.a + o, a.b + o, a.c + o))
            : a instanceof THREE.Face4 &&
              (m = new THREE.Face4(a.a + o, a.b + o, a.c + o, a.d + o)),
            m.normal.copy(a.normal),
            r && r.multiplyVector3(m.normal),
            s = 0,
            E = g.length;
          s < E;
          s++
        )
          (v = g[s].clone()),
            r && r.multiplyVector3(v),
            m.vertexNormals.push(v);
        for (m.color.copy(a.color), s = 0, E = $.length; s < E; s++)
          (v = $[s]), m.vertexColors.push(v.clone());
        void 0 !== a.materialIndex &&
          (void 0 === ($ = u[(E = (s = n.materials[a.materialIndex]).id)]) &&
            (($ = e.materials.length), (u[E] = $), e.materials.push(s)),
          (m.materialIndex = $)),
          m.centroid.copy(a.centroid),
          i && i.multiplyVector3(m.centroid),
          l.push(m);
      }
      for (p = 0, d = f.length; p < d; p++) {
        for (i = f[p], r = [], s = 0, E = i.length; s < E; s++)
          r.push(new THREE.UV(i[s].u, i[s].v));
        c.push(r);
      }
    },
    clone: function (e) {
      var t,
        i = new THREE.Geometry(),
        r = e.vertices,
        o = e.faces,
        n = e.faceVertexUvs[0];
      for (
        e.materials && (i.materials = e.materials.slice()), e = 0, t = r.length;
        e < t;
        e++
      )
        i.vertices.push(r[e].clone());
      for (e = 0, t = o.length; e < t; e++) i.faces.push(o[e].clone());
      for (e = 0, t = n.length; e < t; e++) {
        for (var r = n[e], o = [], a = 0, s = r.length; a < s; a++)
          o.push(new THREE.UV(r[a].u, r[a].v));
        i.faceVertexUvs[0].push(o);
      }
      return i;
    },
    randomPointInTriangle: function (e, t, i) {
      var r,
        o,
        n,
        a = new THREE.Vector3(),
        s = THREE.GeometryUtils.__v1;
      return (
        (r = THREE.GeometryUtils.random()) +
          (o = THREE.GeometryUtils.random()) >
          1 && ((r = 1 - r), (o = 1 - o)),
        (n = 1 - r - o),
        a.copy(e),
        a.multiplyScalar(r),
        s.copy(t),
        s.multiplyScalar(o),
        a.addSelf(s),
        s.copy(i),
        s.multiplyScalar(n),
        a.addSelf(s),
        a
      );
    },
    randomPointInFace: function (e, t, i) {
      var r, o, n;
      if (e instanceof THREE.Face3)
        return (
          (r = t.vertices[e.a]),
          (o = t.vertices[e.b]),
          (n = t.vertices[e.c]),
          THREE.GeometryUtils.randomPointInTriangle(r, o, n)
        );
      if (e instanceof THREE.Face4) {
        (r = t.vertices[e.a]), (o = t.vertices[e.b]), (n = t.vertices[e.c]);
        var a,
          t = t.vertices[e.d];
        return (
          i
            ? e._area1 && e._area2
              ? ((i = e._area1), (a = e._area2))
              : ((i = THREE.GeometryUtils.triangleArea(r, o, t)),
                (a = THREE.GeometryUtils.triangleArea(o, n, t)),
                (e._area1 = i),
                (e._area2 = a))
            : ((i = THREE.GeometryUtils.triangleArea(r, o, t)),
              (a = THREE.GeometryUtils.triangleArea(o, n, t))),
          THREE.GeometryUtils.random() * (i + a) < i
            ? THREE.GeometryUtils.randomPointInTriangle(r, o, t)
            : THREE.GeometryUtils.randomPointInTriangle(o, n, t)
        );
      }
    },
    randomPointsInGeometry: function (e, t) {
      function i(e) {
        return (function t(i, r) {
          if (r < i) return i;
          var o = i + Math.floor((r - i) / 2);
          return p[o] > e ? t(i, o - 1) : p[o] < e ? t(o + 1, r) : o;
        })(0, p.length - 1);
      }
      var r,
        o,
        n,
        a,
        s,
        l,
        h = e.faces,
        c = e.vertices,
        f = h.length,
        u = 0,
        p = [];
      for (o = 0; o < f; o++)
        (r = h[o]) instanceof THREE.Face3
          ? ((n = c[r.a]),
            (a = c[r.b]),
            (s = c[r.c]),
            (r._area = THREE.GeometryUtils.triangleArea(n, a, s)))
          : r instanceof THREE.Face4 &&
            ((n = c[r.a]),
            (a = c[r.b]),
            (s = c[r.c]),
            (l = c[r.d]),
            (r._area1 = THREE.GeometryUtils.triangleArea(n, a, l)),
            (r._area2 = THREE.GeometryUtils.triangleArea(a, s, l)),
            (r._area = r._area1 + r._area2)),
          (u += r._area),
          (p[o] = u);
      for (o = 0, r = []; o < t; o++)
        (c = i((c = THREE.GeometryUtils.random() * u))),
          (r[o] = THREE.GeometryUtils.randomPointInFace(h[c], e, !0));
      return r;
    },
    triangleArea: function (e, t, i) {
      var r,
        o = THREE.GeometryUtils.__v1;
      return (
        o.sub(e, t),
        (r = o.length()),
        o.sub(e, i),
        (e = o.length()),
        o.sub(t, i),
        Math.sqrt(
          (t = 0.5 * (r + e + (i = o.length()))) * (t - r) * (t - e) * (t - i)
        )
      );
    },
    center: function (e) {
      e.computeBoundingBox();
      var t = e.boundingBox,
        i = new THREE.Vector3();
      return (
        i.add(t.min, t.max),
        i.multiplyScalar(-0.5),
        e.applyMatrix(new THREE.Matrix4().makeTranslation(i.x, i.y, i.z)),
        e.computeBoundingBox(),
        i
      );
    },
    normalizeUVs: function (e) {
      for (var e = e.faceVertexUvs[0], t = 0, i = e.length; t < i; t++)
        for (var r = e[t], o = 0, n = r.length; o < n; o++)
          1 !== r[o].u && (r[o].u = r[o].u - Math.floor(r[o].u)),
            1 !== r[o].v && (r[o].v = r[o].v - Math.floor(r[o].v));
    },
    triangulateQuads: function (e) {
      var t,
        i,
        r,
        o,
        n = [],
        a = [],
        s = [];
      for (t = 0, i = e.faceUvs.length; t < i; t++) a[t] = [];
      for (t = 0, i = e.faceVertexUvs.length; t < i; t++) s[t] = [];
      for (t = 0, i = e.faces.length; t < i; t++)
        if ((r = e.faces[t]) instanceof THREE.Face4) {
          o = r.a;
          var l = r.b,
            h = r.c,
            c = r.d,
            f = new THREE.Face3(),
            u = new THREE.Face3();
          for (
            f.color.copy(r.color),
              u.color.copy(r.color),
              f.materialIndex = r.materialIndex,
              u.materialIndex = r.materialIndex,
              f.a = o,
              f.b = l,
              f.c = c,
              u.a = l,
              u.b = h,
              u.c = c,
              4 === r.vertexColors.length &&
                ((f.vertexColors[0] = r.vertexColors[0].clone()),
                (f.vertexColors[1] = r.vertexColors[1].clone()),
                (f.vertexColors[2] = r.vertexColors[3].clone()),
                (u.vertexColors[0] = r.vertexColors[1].clone()),
                (u.vertexColors[1] = r.vertexColors[2].clone()),
                (u.vertexColors[2] = r.vertexColors[3].clone())),
              n.push(f, u),
              r = 0,
              o = e.faceVertexUvs.length;
            r < o;
            r++
          )
            e.faceVertexUvs[r].length &&
              ((l = (f = e.faceVertexUvs[r][t])[1]),
              (h = f[2]),
              (c = f[3]),
              (f = [f[0].clone(), l.clone(), c.clone()]),
              (l = [l.clone(), h.clone(), c.clone()]),
              s[r].push(f, l));
          for (r = 0, o = e.faceUvs.length; r < o; r++)
            e.faceUvs[r].length && ((l = e.faceUvs[r][t]), a[r].push(l, l));
        } else {
          for (n.push(r), r = 0, o = e.faceUvs.length; r < o; r++)
            a[r].push(e.faceUvs[r]);
          for (r = 0, o = e.faceVertexUvs.length; r < o; r++)
            s[r].push(e.faceVertexUvs[r]);
        }
      (e.faces = n),
        (e.faceUvs = a),
        (e.faceVertexUvs = s),
        e.computeCentroids(),
        e.computeFaceNormals(),
        e.computeVertexNormals(),
        e.hasTangents && e.computeTangents();
    },
    explode: function (e) {
      for (var t = [], i = 0, r = e.faces.length; i < r; i++) {
        var o = t.length,
          n = e.faces[i];
        if (n instanceof THREE.Face4) {
          var a = n.a,
            s = n.b,
            l = n.c,
            a = e.vertices[a],
            s = e.vertices[s],
            l = e.vertices[l],
            h = e.vertices[n.d];
          t.push(a.clone()),
            t.push(s.clone()),
            t.push(l.clone()),
            t.push(h.clone()),
            (n.a = o),
            (n.b = o + 1),
            (n.c = o + 2),
            (n.d = o + 3);
        } else
          (a = n.a),
            (s = n.b),
            (l = n.c),
            (a = e.vertices[a]),
            (s = e.vertices[s]),
            (l = e.vertices[l]),
            t.push(a.clone()),
            t.push(s.clone()),
            t.push(l.clone()),
            (n.a = o),
            (n.b = o + 1),
            (n.c = o + 2);
      }
      (e.vertices = t), delete e.__tmpVertices;
    },
    tessellate: function (e, t) {
      var i,
        r,
        o,
        n,
        a,
        s,
        l,
        h,
        c,
        f,
        u,
        p,
        d,
        E,
        m,
        v,
        g,
        $,
        T,
        R = [],
        y = [];
      for (i = 0, r = e.faceVertexUvs.length; i < r; i++) y[i] = [];
      for (i = 0, r = e.faces.length; i < r; i++)
        if ((o = e.faces[i]) instanceof THREE.Face3) {
          if (
            ((n = o.a),
            (a = o.b),
            (s = o.c),
            (h = e.vertices[n]),
            (c = e.vertices[a]),
            (f = e.vertices[s]),
            (p = h.distanceTo(c)),
            (d = c.distanceTo(f)),
            (u = h.distanceTo(f)),
            p > t || d > t || u > t)
          )
            for (
              l = e.vertices.length,
                $ = o.clone(),
                T = o.clone(),
                p >= d && p >= u
                  ? ((h = h.clone()).lerpSelf(c, 0.5),
                    ($.a = n),
                    ($.b = l),
                    ($.c = s),
                    (T.a = l),
                    (T.b = a),
                    (T.c = s),
                    3 === o.vertexNormals.length &&
                      ((n = o.vertexNormals[0].clone()).lerpSelf(
                        o.vertexNormals[1],
                        0.5
                      ),
                      $.vertexNormals[1].copy(n),
                      T.vertexNormals[0].copy(n)),
                    3 === o.vertexColors.length &&
                      ((n = o.vertexColors[0].clone()).lerpSelf(
                        o.vertexColors[1],
                        0.5
                      ),
                      $.vertexColors[1].copy(n),
                      T.vertexColors[0].copy(n)),
                    (o = 0))
                  : d >= p && d >= u
                  ? ((h = c.clone()).lerpSelf(f, 0.5),
                    ($.a = n),
                    ($.b = a),
                    ($.c = l),
                    (T.a = l),
                    (T.b = s),
                    (T.c = n),
                    3 === o.vertexNormals.length &&
                      ((n = o.vertexNormals[1].clone()).lerpSelf(
                        o.vertexNormals[2],
                        0.5
                      ),
                      $.vertexNormals[2].copy(n),
                      T.vertexNormals[0].copy(n),
                      T.vertexNormals[1].copy(o.vertexNormals[2]),
                      T.vertexNormals[2].copy(o.vertexNormals[0])),
                    3 === o.vertexColors.length &&
                      ((n = o.vertexColors[1].clone()).lerpSelf(
                        o.vertexColors[2],
                        0.5
                      ),
                      $.vertexColors[2].copy(n),
                      T.vertexColors[0].copy(n),
                      T.vertexColors[1].copy(o.vertexColors[2]),
                      T.vertexColors[2].copy(o.vertexColors[0])),
                    (o = 1))
                  : ((h = h.clone()).lerpSelf(f, 0.5),
                    ($.a = n),
                    ($.b = a),
                    ($.c = l),
                    (T.a = l),
                    (T.b = a),
                    (T.c = s),
                    3 === o.vertexNormals.length &&
                      ((n = o.vertexNormals[0].clone()).lerpSelf(
                        o.vertexNormals[2],
                        0.5
                      ),
                      $.vertexNormals[2].copy(n),
                      T.vertexNormals[0].copy(n)),
                    3 === o.vertexColors.length &&
                      ((n = o.vertexColors[0].clone()).lerpSelf(
                        o.vertexColors[2],
                        0.5
                      ),
                      $.vertexColors[2].copy(n),
                      T.vertexColors[0].copy(n)),
                    (o = 2)),
                R.push($, T),
                e.vertices.push(h),
                n = 0,
                a = e.faceVertexUvs.length;
              n < a;
              n++
            )
              e.faceVertexUvs[n].length &&
                ((T = (h = e.faceVertexUvs[n][i])[0]),
                (s = h[1]),
                ($ = h[2]),
                0 === o
                  ? ((c = T.clone()).lerpSelf(s, 0.5),
                    (h = [T.clone(), c.clone(), $.clone()]),
                    (s = [c.clone(), s.clone(), $.clone()]))
                  : 1 === o
                  ? ((c = s.clone()).lerpSelf($, 0.5),
                    (h = [T.clone(), s.clone(), c.clone()]),
                    (s = [c.clone(), $.clone(), T.clone()]))
                  : ((c = T.clone()).lerpSelf($, 0.5),
                    (h = [T.clone(), s.clone(), c.clone()]),
                    (s = [c.clone(), s.clone(), $.clone()])),
                y[n].push(h, s));
          else
            for (R.push(o), n = 0, a = e.faceVertexUvs.length; n < a; n++)
              y[n].push(e.faceVertexUvs[n][i]);
        } else if (
          ((n = o.a),
          (a = o.b),
          (s = o.c),
          (l = o.d),
          (h = e.vertices[n]),
          (c = e.vertices[a]),
          (f = e.vertices[s]),
          (u = e.vertices[l]),
          (p = h.distanceTo(c)),
          (d = c.distanceTo(f)),
          (E = f.distanceTo(u)),
          (m = h.distanceTo(u)),
          p > t || d > t || E > t || m > t)
        )
          for (
            v = e.vertices.length,
              g = e.vertices.length + 1,
              $ = o.clone(),
              T = o.clone(),
              (p >= d && p >= E && p >= m) || (E >= d && E >= p && E >= m)
                ? ((p = h.clone()).lerpSelf(c, 0.5),
                  (c = f.clone()).lerpSelf(u, 0.5),
                  ($.a = n),
                  ($.b = v),
                  ($.c = g),
                  ($.d = l),
                  (T.a = v),
                  (T.b = a),
                  (T.c = s),
                  (T.d = g),
                  4 === o.vertexNormals.length &&
                    ((n = o.vertexNormals[0].clone()).lerpSelf(
                      o.vertexNormals[1],
                      0.5
                    ),
                    (a = o.vertexNormals[2].clone()).lerpSelf(
                      o.vertexNormals[3],
                      0.5
                    ),
                    $.vertexNormals[1].copy(n),
                    $.vertexNormals[2].copy(a),
                    T.vertexNormals[0].copy(n),
                    T.vertexNormals[3].copy(a)),
                  4 === o.vertexColors.length &&
                    ((n = o.vertexColors[0].clone()).lerpSelf(
                      o.vertexColors[1],
                      0.5
                    ),
                    (a = o.vertexColors[2].clone()).lerpSelf(
                      o.vertexColors[3],
                      0.5
                    ),
                    $.vertexColors[1].copy(n),
                    $.vertexColors[2].copy(a),
                    T.vertexColors[0].copy(n),
                    T.vertexColors[3].copy(a)),
                  (o = 0))
                : ((p = c.clone()).lerpSelf(f, 0.5),
                  (c = u.clone()).lerpSelf(h, 0.5),
                  ($.a = n),
                  ($.b = a),
                  ($.c = v),
                  ($.d = g),
                  (T.a = g),
                  (T.b = v),
                  (T.c = s),
                  (T.d = l),
                  4 === o.vertexNormals.length &&
                    ((n = o.vertexNormals[1].clone()).lerpSelf(
                      o.vertexNormals[2],
                      0.5
                    ),
                    (a = o.vertexNormals[3].clone()).lerpSelf(
                      o.vertexNormals[0],
                      0.5
                    ),
                    $.vertexNormals[2].copy(n),
                    $.vertexNormals[3].copy(a),
                    T.vertexNormals[0].copy(a),
                    T.vertexNormals[1].copy(n)),
                  4 === o.vertexColors.length &&
                    ((n = o.vertexColors[1].clone()).lerpSelf(
                      o.vertexColors[2],
                      0.5
                    ),
                    (a = o.vertexColors[3].clone()).lerpSelf(
                      o.vertexColors[0],
                      0.5
                    ),
                    $.vertexColors[2].copy(n),
                    $.vertexColors[3].copy(a),
                    T.vertexColors[0].copy(a),
                    T.vertexColors[1].copy(n)),
                  (o = 1)),
              R.push($, T),
              e.vertices.push(p, c),
              n = 0,
              a = e.faceVertexUvs.length;
            n < a;
            n++
          )
            e.faceVertexUvs[n].length &&
              ((T = (h = e.faceVertexUvs[n][i])[0]),
              (s = h[1]),
              ($ = h[2]),
              (h = h[3]),
              0 === o
                ? ((c = T.clone()).lerpSelf(s, 0.5),
                  (f = $.clone()).lerpSelf(h, 0.5),
                  (T = [T.clone(), c.clone(), f.clone(), h.clone()]),
                  (s = [c.clone(), s.clone(), $.clone(), f.clone()]))
                : ((c = s.clone()).lerpSelf($, 0.5),
                  (f = h.clone()).lerpSelf(T, 0.5),
                  (T = [T.clone(), s.clone(), c.clone(), f.clone()]),
                  (s = [f.clone(), c.clone(), $.clone(), h.clone()])),
              y[n].push(T, s));
        else
          for (R.push(o), n = 0, a = e.faceVertexUvs.length; n < a; n++)
            y[n].push(e.faceVertexUvs[n][i]);
      (e.faces = R), (e.faceVertexUvs = y);
    },
  }),
  (THREE.GeometryUtils.random = THREE.Math.random16),
  (THREE.GeometryUtils.__v1 = new THREE.Vector3()),
  (THREE.ImageUtils = {
    crossOrigin: "anonymous",
    loadTexture: function (e, t, i, r) {
      var o = new THREE.Texture(void 0, t),
        t = new THREE.ImageLoader();
      return (
        t.addEventListener("load", function (e) {
          (o.image = e.content), (o.needsUpdate = !0), i && i(o);
        }),
        t.addEventListener("error", function (e) {
          r && r(e.message);
        }),
        (t.crossOrigin = this.crossOrigin),
        t.load(e),
        o
      );
    },
    loadTextureCube: function (e, t, i) {
      var r,
        o = [],
        n = new THREE.Texture(o, t);
      for (n.flipY = !1, t = o.loadCount = 0, r = e.length; t < r; ++t)
        (o[t] = new Image()),
          (o[t].onload = function () {
            (o.loadCount = o.loadCount + 1),
              6 === o.loadCount && ((n.needsUpdate = !0), i && i());
          }),
          (o[t].crossOrigin = this.crossOrigin),
          (o[t].src = e[t]);
      return n;
    },
    getNormalMap: function (e, t) {
      var t = 1 | t,
        i = e.width,
        r = e.height,
        o = document.createElement("canvas");
      (o.width = i), (o.height = r);
      var n = o.getContext("2d");
      n.drawImage(e, 0, 0);
      for (
        var a = n.getImageData(0, 0, i, r).data,
          s = n.createImageData(i, r),
          l = s.data,
          h = 0;
        h < i;
        h++
      )
        for (var c = 0; c < r; c++) {
          var f = c - 1 < 0 ? 0 : c - 1,
            u = c + 1 > r - 1 ? r - 1 : c + 1,
            p = h - 1 < 0 ? 0 : h - 1,
            d = h + 1 > i - 1 ? i - 1 : h + 1,
            E = [],
            m = [0, 0, (a[(c * i + h) * 4] / 255) * t];
          for (
            E.push([-1, 0, (a[(c * i + p) * 4] / 255) * t]),
              E.push([-1, -1, (a[(f * i + p) * 4] / 255) * t]),
              E.push([0, -1, (a[(f * i + h) * 4] / 255) * t]),
              E.push([1, -1, (a[(f * i + d) * 4] / 255) * t]),
              E.push([1, 0, (a[(c * i + d) * 4] / 255) * t]),
              E.push([1, 1, (a[(u * i + d) * 4] / 255) * t]),
              E.push([0, 1, (a[(u * i + h) * 4] / 255) * t]),
              E.push([-1, 1, (a[(u * i + p) * 4] / 255) * t]),
              f = [],
              p = E.length,
              u = 0;
            u < p;
            u++
          ) {
            var d = E[u],
              v = E[(u + 1) % p],
              d = [d[0] - m[0], d[1] - m[1], d[2] - m[2]],
              v = [v[0] - m[0], v[1] - m[1], v[2] - m[2]];
            f.push(
              (function (e) {
                var t = Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
                return [e[0] / t, e[1] / t, e[2] / t];
              })([
                d[1] * v[2] - d[2] * v[1],
                d[2] * v[0] - d[0] * v[2],
                d[0] * v[1] - d[1] * v[0],
              ])
            );
          }
          for (u = 0, E = [0, 0, 0]; u < f.length; u++)
            (E[0] = E[0] + f[u][0]),
              (E[1] = E[1] + f[u][1]),
              (E[2] = E[2] + f[u][2]);
          (E[0] = E[0] / f.length),
            (E[1] = E[1] / f.length),
            (E[2] = E[2] / f.length),
            (l[(m = (c * i + h) * 4)] = (((E[0] + 1) / 2) * 255) | 0),
            (l[m + 1] = (((E[1] + 1) / 2) * 255) | 0),
            (l[m + 2] = (255 * E[2]) | 0),
            (l[m + 3] = 255);
        }
      return n.putImageData(s, 0, 0), o;
    },
    generateDataTexture: function (e, t, i) {
      for (
        var r = e * t,
          o = new Uint8Array(3 * r),
          n = Math.floor(255 * i.r),
          a = Math.floor(255 * i.g),
          i = Math.floor(255 * i.b),
          s = 0;
        s < r;
        s++
      )
        (o[3 * s] = n), (o[3 * s + 1] = a), (o[3 * s + 2] = i);
      return (
        ((e = new THREE.DataTexture(o, e, t, THREE.RGBFormat)).needsUpdate =
          !0),
        e
      );
    },
  }),
  (THREE.SceneUtils = {
    showHierarchy: function (e, t) {
      THREE.SceneUtils.traverseHierarchy(e, function (e) {
        e.visible = t;
      });
    },
    traverseHierarchy: function (e, t) {
      var i,
        r,
        o = e.children.length;
      for (r = 0; r < o; r++)
        t((i = e.children[r])), THREE.SceneUtils.traverseHierarchy(i, t);
    },
    createMultiMaterialObject: function (e, t) {
      var i,
        r = t.length,
        o = new THREE.Object3D();
      for (i = 0; i < r; i++) {
        var n = new THREE.Mesh(e, t[i]);
        o.add(n);
      }
      return o;
    },
    cloneObject: function (e) {
      var t;
      e instanceof THREE.MorphAnimMesh
        ? (((t = new THREE.MorphAnimMesh(e.geometry, e.material)).duration =
            e.duration),
          (t.mirroredLoop = e.mirroredLoop),
          (t.time = e.time),
          (t.lastKeyframe = e.lastKeyframe),
          (t.currentKeyframe = e.currentKeyframe),
          (t.direction = e.direction),
          (t.directionBackwards = e.directionBackwards))
        : e instanceof THREE.SkinnedMesh
        ? (t = new THREE.SkinnedMesh(e.geometry, e.material))
        : e instanceof THREE.Mesh
        ? (t = new THREE.Mesh(e.geometry, e.material))
        : e instanceof THREE.Line
        ? (t = new THREE.Line(e.geometry, e.material, e.type))
        : e instanceof THREE.Ribbon
        ? (t = new THREE.Ribbon(e.geometry, e.material))
        : e instanceof THREE.ParticleSystem
        ? ((t = new THREE.ParticleSystem(
            e.geometry,
            e.material
          )).sortParticles = e.sortParticles)
        : e instanceof THREE.Particle
        ? (t = new THREE.Particle(e.material))
        : e instanceof THREE.Sprite
        ? ((t = new THREE.Sprite({})).color.copy(e.color),
          (t.map = e.map),
          (t.blending = e.blending),
          (t.useScreenCoordinates = e.useScreenCoordinates),
          (t.mergeWith3D = e.mergeWith3D),
          (t.affectedByDistance = e.affectedByDistance),
          (t.scaleByViewport = e.scaleByViewport),
          (t.alignment = e.alignment),
          t.rotation3d.copy(e.rotation3d),
          (t.rotation = e.rotation),
          (t.opacity = e.opacity),
          t.uvOffset.copy(e.uvOffset),
          t.uvScale.copy(e.uvScale))
        : e instanceof THREE.LOD
        ? (t = new THREE.LOD())
        : e instanceof THREE.Object3D && (t = new THREE.Object3D()),
        (t.name = e.name),
        (t.parent = e.parent),
        t.up.copy(e.up),
        t.position.copy(e.position),
        t.rotation instanceof THREE.Vector3 && t.rotation.copy(e.rotation),
        (t.eulerOrder = e.eulerOrder),
        t.scale.copy(e.scale),
        (t.dynamic = e.dynamic),
        (t.doubleSided = e.doubleSided),
        (t.flipSided = e.flipSided),
        (t.renderDepth = e.renderDepth),
        (t.rotationAutoUpdate = e.rotationAutoUpdate),
        t.matrix.copy(e.matrix),
        t.matrixWorld.copy(e.matrixWorld),
        t.matrixRotationWorld.copy(e.matrixRotationWorld),
        (t.matrixAutoUpdate = e.matrixAutoUpdate),
        (t.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate),
        t.quaternion.copy(e.quaternion),
        (t.useQuaternion = e.useQuaternion),
        (t.boundRadius = e.boundRadius),
        (t.boundRadiusScale = e.boundRadiusScale),
        (t.visible = e.visible),
        (t.castShadow = e.castShadow),
        (t.receiveShadow = e.receiveShadow),
        (t.frustumCulled = e.frustumCulled);
      for (var i = 0; i < e.children.length; i++) {
        var r = THREE.SceneUtils.cloneObject(e.children[i]);
        (t.children[i] = r), (r.parent = t);
      }
      if (e instanceof THREE.LOD)
        for (i = 0; i < e.LODs.length; i++)
          t.LODs[i] = {
            visibleAtDistance: e.LODs[i].visibleAtDistance,
            object3D: t.children[i],
          };
      return t;
    },
    detach: function (e, t, i) {
      e.applyMatrix(t.matrixWorld), t.remove(e), i.add(e);
    },
    attach: function (e, t, i) {
      var r = new THREE.Matrix4();
      r.getInverse(i.matrixWorld), e.applyMatrix(r), t.remove(e), i.add(e);
    },
  }),
  THREE.WebGLRenderer &&
    (THREE.ShaderUtils = {
      lib: {
        fresnel: {
          uniforms: {
            mRefractionRatio: { type: "f", value: 1.02 },
            mFresnelBias: { type: "f", value: 0.1 },
            mFresnelPower: { type: "f", value: 2 },
            mFresnelScale: { type: "f", value: 1 },
            tCube: { type: "t", value: 1, texture: null },
          },
          fragmentShader:
            "uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0, 1.0, 1.0, 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\nrefractedColor.a = 1.0;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
          vertexShader:
            "uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = normalize ( mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal );\nvec3 I = mPosition.xyz - cameraPosition;\nvReflect = reflect( I, nWorld );\nvRefract[0] = refract( normalize( I ), nWorld, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), nWorld, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), nWorld, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), nWorld ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}",
        },
        normal: {
          uniforms: THREE.UniformsUtils.merge([
            THREE.UniformsLib.fog,
            THREE.UniformsLib.lights,
            THREE.UniformsLib.shadowmap,
            {
              enableAO: { type: "i", value: 0 },
              enableDiffuse: { type: "i", value: 0 },
              enableSpecular: { type: "i", value: 0 },
              enableReflection: { type: "i", value: 0 },
              enableDisplacement: { type: "i", value: 0 },
              tDiffuse: { type: "t", value: 0, texture: null },
              tCube: { type: "t", value: 1, texture: null },
              tNormal: { type: "t", value: 2, texture: null },
              tSpecular: { type: "t", value: 3, texture: null },
              tAO: { type: "t", value: 4, texture: null },
              tDisplacement: { type: "t", value: 5, texture: null },
              uNormalScale: { type: "f", value: 1 },
              uDisplacementBias: { type: "f", value: 0 },
              uDisplacementScale: { type: "f", value: 1 },
              uDiffuseColor: { type: "c", value: new THREE.Color(16777215) },
              uSpecularColor: { type: "c", value: new THREE.Color(1118481) },
              uAmbientColor: { type: "c", value: new THREE.Color(16777215) },
              uShininess: { type: "f", value: 30 },
              uOpacity: { type: "f", value: 1 },
              uReflectivity: { type: "f", value: 0.5 },
              uOffset: { type: "v2", value: new THREE.Vector2(0, 0) },
              uRepeat: { type: "v2", value: new THREE.Vector2(1, 1) },
              wrapRGB: { type: "v3", value: new THREE.Vector3(1, 1, 1) },
            },
          ]),
          fragmentShader: [
            "uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform float uNormalScale;\nuniform float uReflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngle[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vWorldPosition;",
            THREE.ShaderChunk.shadowmap_pars_fragment,
            THREE.ShaderChunk.fog_pars_fragment,
            "void main() {\nvec3 vViewPosition = cameraPosition - vWorldPosition;\ngl_FragColor = vec4( vec3( 1.0 ), uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse ) {\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( tDiffuse, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\n#endif\n}\nif( enableAO ) {\n#ifdef GAMMA_INPUT\nvec4 aoColor = texture2D( tAO, vUv );\naoColor.xyz *= aoColor.xyz;\ngl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\n#endif\n}\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\nvec3 finalNormal = tsb * normalTex;\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 pointVector = lPosition.xyz + vViewPosition.xyz;\nfloat pointDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\npointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );\npointVector = normalize( pointVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\n#endif\npointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\nvec3 pointHalfVector = normalize( pointVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;\n#else\npointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 spotVector = lPosition.xyz + vViewPosition.xyz;\nfloat spotDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nspotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );\nspotVector = normalize( spotVector );\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngle[ i ] ) {\nspotEffect = pow( spotEffect, spotLightExponent[ i ] );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );\n#endif\nspotDiffuse += spotDistance * spotLightColor[ i ] * uDiffuseColor * spotDiffuseWeight * spotEffect;\nvec3 spotHalfVector = normalize( spotVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( spotVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += spotDistance * spotLightColor[ i ] * uSpecularColor * spotSpecularWeight * spotDiffuseWeight * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\n#ifdef WRAP_AROUND\nfloat directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\nfloat directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n#endif\ndirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor) + totalSpecular;\nif ( enableReflection ) {\nvec3 vReflect = reflect( normalize( vWorldPosition ), normal );\nvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );\n}",
            THREE.ShaderChunk.shadowmap_fragment,
            THREE.ShaderChunk.linear_to_gamma_fragment,
            THREE.ShaderChunk.fog_fragment,
            "}",
          ].join("\n"),
          vertexShader: [
            "attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\nuniform bool enableDisplacement;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vWorldPosition;",
            THREE.ShaderChunk.shadowmap_pars_vertex,
            "void main() {\nvNormal = normalMatrix * normal;\nvTangent = normalMatrix * tangent.xyz;\nvBinormal = cross( vNormal, vTangent ) * tangent.w;\nvUv = uv * uRepeat + uOffset;\nvec3 displacedPosition;\n#ifdef VERTEX_TEXTURES\nif ( enableDisplacement ) {\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\ndisplacedPosition = position + normalize( normal ) * df;\n} else {\ndisplacedPosition = position;\n}\n#else\ndisplacedPosition = position;\n#endif\nvec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );\nvec4 wPosition = objectMatrix * vec4( displacedPosition, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\nvWorldPosition = wPosition.xyz;\n#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * wPosition;\n}\n#endif\n}",
          ].join("\n"),
        },
        cube: {
          uniforms: {
            tCube: { type: "t", value: 1, texture: null },
            tFlip: { type: "f", value: -1 },
          },
          vertexShader:
            "varying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
          fragmentShader:
            "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 wPos = cameraPosition - vViewPosition;\ngl_FragColor = textureCube( tCube, vec3( tFlip * wPos.x, wPos.yz ) );\n}",
        },
      },
    }),
  (THREE.FontUtils = {
    faces: {},
    face: "helvetiker",
    weight: "normal",
    style: "normal",
    size: 150,
    divisions: 10,
    getFace: function () {
      return this.faces[this.face][this.weight][this.style];
    },
    loadFace: function (e) {
      var t = e.familyName.toLowerCase();
      return (
        (this.faces[t] = this.faces[t] || {}),
        (this.faces[t][e.cssFontWeight] = this.faces[t][e.cssFontWeight] || {}),
        (this.faces[t][e.cssFontWeight][e.cssFontStyle] = e),
        (this.faces[t][e.cssFontWeight][e.cssFontStyle] = e)
      );
    },
    drawText: function (e) {
      for (
        var t = this.getFace(),
          i = this.size / t.resolution,
          r = 0,
          o = ("" + e).split(""),
          n = o.length,
          a = [],
          e = 0;
        e < n;
        e++
      ) {
        var s = new THREE.Path(),
          s = this.extractGlyphPoints(o[e], t, i, r, s),
          r = r + s.offset;
        a.push(s.path);
      }
      return { paths: a, offset: r / 2 };
    },
    extractGlyphPoints: function (e, t, i, r, o) {
      var n,
        a,
        s,
        l,
        h,
        c,
        f,
        u,
        p,
        d,
        E,
        m = [],
        v = t.glyphs[e] || t.glyphs["?"];
      if (v) {
        if (v.o)
          for (
            e = 0,
              l = (t = v._cachedOutline || (v._cachedOutline = v.o.split(" ")))
                .length;
            e < l;

          )
            switch ((s = t[e++])) {
              case "m":
                (s = t[e++] * i + r), (h = t[e++] * i), o.moveTo(s, h);
                break;
              case "l":
                (s = t[e++] * i + r), (h = t[e++] * i), o.lineTo(s, h);
                break;
              case "q":
                if (
                  ((s = t[e++] * i + r),
                  (h = t[e++] * i),
                  (u = t[e++] * i + r),
                  (p = t[e++] * i),
                  o.quadraticCurveTo(u, p, s, h),
                  (n = m[m.length - 1]))
                )
                  for (
                    c = n.x, f = n.y, n = 1, a = this.divisions;
                    n <= a;
                    n++
                  ) {
                    var g = n / a;
                    THREE.Shape.Utils.b2(g, c, u, s),
                      THREE.Shape.Utils.b2(g, f, p, h);
                  }
                break;
              case "b":
                if (
                  ((s = t[e++] * i + r),
                  (h = t[e++] * i),
                  (u = t[e++] * i + r),
                  (p = -(t[e++] * i)),
                  (d = t[e++] * i + r),
                  (E = -(t[e++] * i)),
                  o.bezierCurveTo(s, h, u, p, d, E),
                  (n = m[m.length - 1]))
                )
                  for (c = n.x, f = n.y, n = 1, a = this.divisions; n <= a; n++)
                    (g = n / a),
                      THREE.Shape.Utils.b3(g, c, u, d, s),
                      THREE.Shape.Utils.b3(g, f, p, E, h);
            }
        return { offset: v.ha * i, path: o };
      }
    },
  }),
  (THREE.FontUtils.generateShapes = function (e, t) {
    var t = t || {},
      i = void 0 !== t.curveSegments ? t.curveSegments : 4,
      r = void 0 !== t.font ? t.font : "helvetiker",
      o = void 0 !== t.weight ? t.weight : "normal",
      n = void 0 !== t.style ? t.style : "normal";
    for (
      THREE.FontUtils.size = void 0 !== t.size ? t.size : 100,
        THREE.FontUtils.divisions = i,
        THREE.FontUtils.face = r,
        THREE.FontUtils.weight = o,
        THREE.FontUtils.style = n,
        i = THREE.FontUtils.drawText(e).paths,
        r = [],
        o = 0,
        n = i.length;
      o < n;
      o++
    )
      Array.prototype.push.apply(r, i[o].toShapes());
    return r;
  }),
  (function (e) {
    var t = function (e) {
      for (var t = e.length, i = 0, r = t - 1, o = 0; o < t; r = o++)
        i += e[r].x * e[o].y - e[o].x * e[r].y;
      return 0.5 * i;
    };
    (e.Triangulate = function (e, i) {
      var r = e.length;
      if (r < 3) return null;
      var o,
        n,
        a,
        s = [],
        l = [],
        h = [];
      if (t(e) > 0) for (n = 0; n < r; n++) l[n] = n;
      else for (n = 0; n < r; n++) l[n] = r - 1 - n;
      var c = 2 * r;
      for (n = r - 1; r > 2; ) {
        if (c-- <= 0) {
          console.log("Warning, unable to triangulate polygon!");
          break;
        }
        r <= (o = n) && (o = 0),
          r <= (n = o + 1) && (n = 0),
          r <= (a = n + 1) && (a = 0);
        a: {
          var f,
            u = o,
            p = n,
            d = a,
            E = r,
            m = l,
            v = void 0,
            g = void 0,
            $ = void 0,
            T = void 0,
            R = void 0,
            y = void 0,
            _ = void 0,
            x = void 0,
            H = void 0,
            g = (f = e)[m[u]].x,
            $ = f[m[u]].y,
            T = f[m[p]].x,
            R = f[m[p]].y,
            y = f[m[d]].x,
            _ = f[m[d]].y;
          if (1e-10 > (T - g) * (_ - $) - (R - $) * (y - g)) f = !1;
          else {
            for (v = 0; v < E; v++)
              if (!(v == u || v == p || v == d)) {
                var x = f[m[v]].x,
                  H = f[m[v]].y,
                  b = void 0,
                  w = void 0,
                  S = void 0,
                  C = void 0,
                  M = void 0,
                  A = void 0,
                  L = void 0,
                  P = void 0,
                  U = void 0,
                  F = void 0,
                  D = void 0,
                  V = void 0,
                  b = (S = M = void 0),
                  b = y - T,
                  w = _ - R,
                  S = g - y,
                  C = $ - _,
                  M = T - g,
                  A = R - $,
                  L = x - g,
                  P = H - $,
                  U = x - T,
                  F = H - R,
                  D = x - y,
                  V = H - _,
                  b = b * F - w * U,
                  M = M * P - A * L,
                  S = S * V - C * D;
                if (b >= 0 && S >= 0 && M >= 0) {
                  f = !1;
                  break a;
                }
              }
            f = !0;
          }
        }
        if (f) {
          for (
            s.push([e[l[o]], e[l[n]], e[l[a]]]),
              h.push([l[o], l[n], l[a]]),
              o = n,
              a = n + 1;
            a < r;
            o++, a++
          )
            l[o] = l[a];
          c = 2 * --r;
        }
      }
      return i ? h : s;
    }),
      (e.Triangulate.area = t);
  })(THREE.FontUtils),
  (self._typeface_js = {
    faces: THREE.FontUtils.faces,
    loadFace: THREE.FontUtils.loadFace,
  }),
  (THREE.BufferGeometry = function () {
    (this.id = THREE.GeometryCount++),
      (this.attributes = {}),
      (this.dynamic = !1),
      (this.boundingSphere = this.boundingBox = null),
      (this.hasTangents = !1),
      (this.morphTargets = []);
  }),
  (THREE.BufferGeometry.prototype = {
    constructor: THREE.BufferGeometry,
    applyMatrix: function (e) {
      var t, i;
      this.attributes.position && (t = this.attributes.position.array),
        this.attributes.normal && (i = this.attributes.normal.array),
        void 0 !== t &&
          (e.multiplyVector3Array(t), (this.verticesNeedUpdate = !0)),
        void 0 !== i &&
          ((t = new THREE.Matrix4()).extractRotation(e),
          t.multiplyVector3Array(i),
          (this.normalsNeedUpdate = !0));
    },
    computeBoundingBox: function () {
      this.boundingBox ||
        (this.boundingBox = {
          min: new THREE.Vector3(1 / 0, 1 / 0, 1 / 0),
          max: new THREE.Vector3(-1 / 0, -1 / 0, -1 / 0),
        });
      var e = this.attributes.position.array;
      if (e)
        for (
          var t, i, r, o = this.boundingBox, n = 0, a = e.length;
          n < a;
          n += 3
        )
          (t = e[n]),
            (i = e[n + 1]),
            (r = e[n + 2]),
            t < o.min.x ? (o.min.x = t) : t > o.max.x && (o.max.x = t),
            i < o.min.y ? (o.min.y = i) : i > o.max.y && (o.max.y = i),
            r < o.min.z ? (o.min.z = r) : r > o.max.z && (o.max.z = r);
      (void 0 === e || 0 === e.length) &&
        (this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0));
    },
    computeBoundingSphere: function () {
      this.boundingSphere || (this.boundingSphere = { radius: 0 });
      var e = this.attributes.position.array;
      if (e) {
        for (var t, i, r, o = 0, n = 0, a = e.length; n < a; n += 3)
          (t = e[n]),
            (t = Math.sqrt(t * t + (i = e[n + 1]) * i + (r = e[n + 2]) * r)) >
              o && (o = t);
        this.boundingSphere.radius = o;
      }
    },
    computeVertexNormals: function () {
      if (this.attributes.position && this.attributes.index) {
        if (
          ((e = this.attributes.position.array.length),
          void 0 === this.attributes.normal)
        )
          this.attributes.normal = {
            itemSize: 3,
            array: new Float32Array(e),
            numItems: e,
          };
        else
          for (e = 0, t = this.attributes.normal.array.length; e < t; e++)
            this.attributes.normal.array[e] = 0;
        var e,
          t,
          i,
          r,
          o,
          n,
          a,
          s,
          l,
          h,
          c = this.offsets,
          f = this.attributes.index.array,
          u = this.attributes.position.array,
          p = this.attributes.normal.array,
          d = new THREE.Vector3(),
          E = new THREE.Vector3(),
          m = new THREE.Vector3(),
          v = new THREE.Vector3(),
          g = new THREE.Vector3();
        for (i = 0, r = c.length; i < r; ++i) {
          (t = c[i].start), (o = c[i].count);
          var $ = c[i].index;
          for (e = t, t += o; e < t; e += 3)
            (o = $ + f[e]),
              (n = $ + f[e + 1]),
              (a = $ + f[e + 2]),
              (s = u[3 * o]),
              (l = u[3 * o + 1]),
              (h = u[3 * o + 2]),
              d.set(s, l, h),
              (s = u[3 * n]),
              (l = u[3 * n + 1]),
              (h = u[3 * n + 2]),
              E.set(s, l, h),
              (s = u[3 * a]),
              (l = u[3 * a + 1]),
              (h = u[3 * a + 2]),
              m.set(s, l, h),
              v.sub(m, E),
              g.sub(d, E),
              v.crossSelf(g),
              (p[3 * o] = p[3 * o] + v.x),
              (p[3 * o + 1] = p[3 * o + 1] + v.y),
              (p[3 * o + 2] = p[3 * o + 2] + v.z),
              (p[3 * n] = p[3 * n] + v.x),
              (p[3 * n + 1] = p[3 * n + 1] + v.y),
              (p[3 * n + 2] = p[3 * n + 2] + v.z),
              (p[3 * a] = p[3 * a] + v.x),
              (p[3 * a + 1] = p[3 * a + 1] + v.y),
              (p[3 * a + 2] = p[3 * a + 2] + v.z);
        }
        for (e = 0, t = p.length; e < t; e += 3)
          (s = p[e]),
            (i =
              1 / Math.sqrt(s * s + (l = p[e + 1]) * l + (h = p[e + 2]) * h)),
            (p[e] = p[e] * i),
            (p[e + 1] = p[e + 1] * i),
            (p[e + 2] = p[e + 2] * i);
        this.normalsNeedUpdate = !0;
      }
    },
    computeTangents: function () {
      function e(e, t, i) {
        (f = r[3 * e]),
          (u = r[3 * e + 1]),
          (p = r[3 * e + 2]),
          (d = r[3 * t]),
          (E = r[3 * t + 1]),
          (m = r[3 * t + 2]),
          (v = r[3 * i]),
          (g = r[3 * i + 1]),
          ($ = r[3 * i + 2]),
          (T = n[2 * e]),
          (R = n[2 * e + 1]),
          (y = n[2 * t]),
          (_ = n[2 * t + 1]),
          (x = n[2 * i]),
          (H = n[2 * i + 1]),
          (b = d - f),
          (w = v - f),
          (S = E - u),
          (C = g - u),
          (M = m - p),
          (A = $ - p),
          (L = y - T),
          (P = x - T),
          (U = _ - R),
          (D = 1 / (L * (F = H - R) - P * U)),
          I.set((F * b - U * w) * D, (F * S - U * C) * D, (F * M - U * A) * D),
          k.set((L * w - P * b) * D, (L * C - P * S) * D, (L * A - P * M) * D),
          h[e].addSelf(I),
          h[t].addSelf(I),
          h[i].addSelf(I),
          c[e].addSelf(k),
          c[t].addSelf(k),
          c[i].addSelf(k);
      }
      function t(e) {
        (Z.x = o[3 * e]),
          (Z.y = o[3 * e + 1]),
          (Z.z = o[3 * e + 2]),
          Q.copy(Z),
          (X = h[e]),
          q.copy(X),
          q.subSelf(Z.multiplyScalar(Z.dot(X))).normalize(),
          K.cross(Q, X),
          (j = (Y = K.dot(c[e])) < 0 ? -1 : 1),
          (l[4 * e] = q.x),
          (l[4 * e + 1] = q.y),
          (l[4 * e + 2] = q.z),
          (l[4 * e + 3] = j);
      }
      if (
        void 0 === this.attributes.index ||
        void 0 === this.attributes.position ||
        void 0 === this.attributes.normal ||
        void 0 === this.attributes.uv
      )
        console.warn(
          "Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()"
        );
      else {
        var i = this.attributes.index.array,
          r = this.attributes.position.array,
          o = this.attributes.normal.array,
          n = this.attributes.uv.array,
          a = r.length / 3;
        if (void 0 === this.attributes.tangent) {
          var s = 4 * a;
          this.attributes.tangent = {
            itemSize: 4,
            array: new Float32Array(s),
            numItems: s,
          };
        }
        for (
          var l = this.attributes.tangent.array, h = [], c = [], s = 0;
          s < a;
          s++
        )
          (h[s] = new THREE.Vector3()), (c[s] = new THREE.Vector3());
        var f,
          u,
          p,
          d,
          E,
          m,
          v,
          g,
          $,
          T,
          R,
          y,
          _,
          x,
          H,
          b,
          w,
          S,
          C,
          M,
          A,
          L,
          P,
          U,
          F,
          D,
          V,
          z,
          B,
          N,
          O,
          I = new THREE.Vector3(),
          k = new THREE.Vector3(),
          W = this.offsets,
          s = 0;
        for (z = W.length; s < z; ++s) {
          (V = W[s].start), (B = W[s].count);
          var G = W[s].index,
            a = V;
          for (V += B; a < V; a += 3)
            (B = G + i[a]), e(B, (N = G + i[a + 1]), (O = G + i[a + 2]));
        }
        var j,
          X,
          Y,
          q = new THREE.Vector3(),
          K = new THREE.Vector3(),
          Z = new THREE.Vector3(),
          Q = new THREE.Vector3(),
          s = 0;
        for (z = W.length; s < z; ++s)
          for (
            V = W[s].start, B = W[s].count, G = W[s].index, a = V, V += B;
            a < V;
            a += 3
          )
            (B = G + i[a]),
              (N = G + i[a + 1]),
              (O = G + i[a + 2]),
              t(B),
              t(N),
              t(O);
        this.tangentsNeedUpdate = this.hasTangents = !0;
      }
    },
  }),
  (THREE.Curve = function () {}),
  (THREE.Curve.prototype.getPoint = function () {
    return console.log("Warning, getPoint() not implemented!"), null;
  }),
  (THREE.Curve.prototype.getPointAt = function (e) {
    return this.getPoint(this.getUtoTmapping(e));
  }),
  (THREE.Curve.prototype.getPoints = function (e) {
    e || (e = 5);
    var t,
      i = [];
    for (t = 0; t <= e; t++) i.push(this.getPoint(t / e));
    return i;
  }),
  (THREE.Curve.prototype.getSpacedPoints = function (e) {
    e || (e = 5);
    var t,
      i = [];
    for (t = 0; t <= e; t++) i.push(this.getPointAt(t / e));
    return i;
  }),
  (THREE.Curve.prototype.getLength = function () {
    var e = this.getLengths();
    return e[e.length - 1];
  }),
  (THREE.Curve.prototype.getLengths = function (e) {
    if (
      (e || (e = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200),
      this.cacheArcLengths &&
        this.cacheArcLengths.length == e + 1 &&
        !this.needsUpdate)
    )
      return this.cacheArcLengths;
    this.needsUpdate = !1;
    var t,
      i,
      r = [],
      o = this.getPoint(0),
      n = 0;
    for (r.push(0), i = 1; i <= e; i++)
      r.push((n += (t = this.getPoint(i / e)).distanceTo(o))), (o = t);
    return (this.cacheArcLengths = r);
  }),
  (THREE.Curve.prototype.updateArcLengths = function () {
    (this.needsUpdate = !0), this.getLengths();
  }),
  (THREE.Curve.prototype.getUtoTmapping = function (e, t) {
    var i,
      r = this.getLengths(),
      o = 0,
      n = r.length;
    i = t || e * r[n - 1];
    for (var a, s = 0, l = n - 1; s <= l; )
      if ((a = r[(o = Math.floor(s + (l - s) / 2))] - i) < 0) s = o + 1;
      else if (a > 0) l = o - 1;
      else {
        l = o;
        break;
      }
    return r[(o = l)] == i
      ? o / (n - 1)
      : ((s = r[o]), (o + (i - s) / (r[o + 1] - s)) / (n - 1));
  }),
  (THREE.Curve.prototype.getNormalVector = function (e) {
    return (e = this.getTangent(e)), new THREE.Vector2(-e.y, e.x);
  }),
  (THREE.Curve.prototype.getTangent = function (e) {
    var t = e - 1e-4,
      e = e + 1e-4;
    return (
      t < 0 && (t = 0),
      e > 1 && (e = 1),
      (t = this.getPoint(t)),
      this.getPoint(e).clone().subSelf(t).normalize()
    );
  }),
  (THREE.Curve.prototype.getTangentAt = function (e) {
    return this.getTangent(this.getUtoTmapping(e));
  }),
  (THREE.LineCurve = function (e, t) {
    (this.v1 = e), (this.v2 = t);
  }),
  (THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype)),
  (THREE.LineCurve.prototype.getPoint = function (e) {
    var t = this.v2.clone().subSelf(this.v1);
    return t.multiplyScalar(e).addSelf(this.v1), t;
  }),
  (THREE.LineCurve.prototype.getPointAt = function (e) {
    return this.getPoint(e);
  }),
  (THREE.LineCurve.prototype.getTangent = function () {
    return this.v2.clone().subSelf(this.v1).normalize();
  }),
  (THREE.QuadraticBezierCurve = function (e, t, i) {
    (this.v0 = e), (this.v1 = t), (this.v2 = i);
  }),
  (THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype)),
  (THREE.QuadraticBezierCurve.prototype.getPoint = function (e) {
    var t;
    return (
      (t = THREE.Shape.Utils.b2(e, this.v0.x, this.v1.x, this.v2.x)),
      (e = THREE.Shape.Utils.b2(e, this.v0.y, this.v1.y, this.v2.y)),
      new THREE.Vector2(t, e)
    );
  }),
  (THREE.QuadraticBezierCurve.prototype.getTangent = function (e) {
    var t;
    return (
      (t = THREE.Curve.Utils.tangentQuadraticBezier(
        e,
        this.v0.x,
        this.v1.x,
        this.v2.x
      )),
      (e = THREE.Curve.Utils.tangentQuadraticBezier(
        e,
        this.v0.y,
        this.v1.y,
        this.v2.y
      )),
      (t = new THREE.Vector2(t, e)).normalize(),
      t
    );
  }),
  (THREE.CubicBezierCurve = function (e, t, i, r) {
    (this.v0 = e), (this.v1 = t), (this.v2 = i), (this.v3 = r);
  }),
  (THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype)),
  (THREE.CubicBezierCurve.prototype.getPoint = function (e) {
    var t;
    return (
      (t = THREE.Shape.Utils.b3(e, this.v0.x, this.v1.x, this.v2.x, this.v3.x)),
      (e = THREE.Shape.Utils.b3(e, this.v0.y, this.v1.y, this.v2.y, this.v3.y)),
      new THREE.Vector2(t, e)
    );
  }),
  (THREE.CubicBezierCurve.prototype.getTangent = function (e) {
    var t;
    return (
      (t = THREE.Curve.Utils.tangentCubicBezier(
        e,
        this.v0.x,
        this.v1.x,
        this.v2.x,
        this.v3.x
      )),
      (e = THREE.Curve.Utils.tangentCubicBezier(
        e,
        this.v0.y,
        this.v1.y,
        this.v2.y,
        this.v3.y
      )),
      (t = new THREE.Vector2(t, e)).normalize(),
      t
    );
  }),
  (THREE.SplineCurve = function (e) {
    this.points = void 0 == e ? [] : e;
  }),
  (THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype)),
  (THREE.SplineCurve.prototype.getPoint = function (e) {
    var t,
      i = new THREE.Vector2(),
      r = [],
      o = this.points;
    return (
      (e = Math.floor((t = (o.length - 1) * e))),
      (t -= e),
      (r[0] = 0 == e ? e : e - 1),
      (r[1] = e),
      (r[2] = e > o.length - 2 ? o.length - 1 : e + 1),
      (r[3] = e > o.length - 3 ? o.length - 1 : e + 2),
      (i.x = THREE.Curve.Utils.interpolate(
        o[r[0]].x,
        o[r[1]].x,
        o[r[2]].x,
        o[r[3]].x,
        t
      )),
      (i.y = THREE.Curve.Utils.interpolate(
        o[r[0]].y,
        o[r[1]].y,
        o[r[2]].y,
        o[r[3]].y,
        t
      )),
      i
    );
  }),
  (THREE.EllipseCurve = function (e, t, i, r, o, n, a) {
    (this.aX = e),
      (this.aY = t),
      (this.xRadius = i),
      (this.yRadius = r),
      (this.aStartAngle = o),
      (this.aEndAngle = n),
      (this.aClockwise = a);
  }),
  (THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype)),
  (THREE.EllipseCurve.prototype.getPoint = function (e) {
    var t = this.aEndAngle - this.aStartAngle;
    return (
      this.aClockwise || (e = 1 - e),
      (t = this.aStartAngle + e * t),
      (e = this.aX + this.xRadius * Math.cos(t)),
      (t = this.aY + this.yRadius * Math.sin(t)),
      new THREE.Vector2(e, t)
    );
  }),
  (THREE.ArcCurve = function (e, t, i, r, o, n) {
    THREE.EllipseCurve.call(this, e, t, i, i, r, o, n);
  }),
  (THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype)),
  (THREE.Curve.Utils = {
    tangentQuadraticBezier: function (e, t, i, r) {
      return 2 * (1 - e) * (i - t) + 2 * e * (r - i);
    },
    tangentCubicBezier: function (e, t, i, r, o) {
      return (
        -3 * t * (1 - e) * (1 - e) +
        3 * i * (1 - e) * (1 - e) -
        6 * e * i * (1 - e) +
        6 * e * r * (1 - e) -
        3 * e * e * r +
        3 * e * e * o
      );
    },
    tangentSpline: function (e) {
      return (
        6 * e * e -
        6 * e +
        (3 * e * e - 4 * e + 1) +
        (-6 * e * e + 6 * e) +
        (3 * e * e - 2 * e)
      );
    },
    interpolate: function (e, t, i, r, o) {
      var e = (i - e) * 0.5,
        r = (r - t) * 0.5,
        n = o * o;
      return (
        (2 * t - 2 * i + e + r) * o * n +
        (-3 * t + 3 * i - 2 * e - r) * n +
        e * o +
        t
      );
    },
  }),
  (THREE.Curve.create = function (e, t) {
    return (
      (e.prototype = Object.create(THREE.Curve.prototype)),
      (e.prototype.getPoint = t),
      e
    );
  }),
  (THREE.LineCurve3 = THREE.Curve.create(
    function (e, t) {
      (this.v1 = e), (this.v2 = t);
    },
    function (e) {
      var t = new THREE.Vector3();
      return (
        t.sub(this.v2, this.v1), t.multiplyScalar(e), t.addSelf(this.v1), t
      );
    }
  )),
  (THREE.QuadraticBezierCurve3 = THREE.Curve.create(
    function (e, t, i) {
      (this.v0 = e), (this.v1 = t), (this.v2 = i);
    },
    function (e) {
      var t, i;
      return (
        (t = THREE.Shape.Utils.b2(e, this.v0.x, this.v1.x, this.v2.x)),
        (i = THREE.Shape.Utils.b2(e, this.v0.y, this.v1.y, this.v2.y)),
        (e = THREE.Shape.Utils.b2(e, this.v0.z, this.v1.z, this.v2.z)),
        new THREE.Vector3(t, i, e)
      );
    }
  )),
  (THREE.CubicBezierCurve3 = THREE.Curve.create(
    function (e, t, i, r) {
      (this.v0 = e), (this.v1 = t), (this.v2 = i), (this.v3 = r);
    },
    function (e) {
      var t, i;
      return (
        (t = THREE.Shape.Utils.b3(
          e,
          this.v0.x,
          this.v1.x,
          this.v2.x,
          this.v3.x
        )),
        (i = THREE.Shape.Utils.b3(
          e,
          this.v0.y,
          this.v1.y,
          this.v2.y,
          this.v3.y
        )),
        (e = THREE.Shape.Utils.b3(
          e,
          this.v0.z,
          this.v1.z,
          this.v2.z,
          this.v3.z
        )),
        new THREE.Vector3(t, i, e)
      );
    }
  )),
  (THREE.SplineCurve3 = THREE.Curve.create(
    function (e) {
      this.points = void 0 == e ? [] : e;
    },
    function (e) {
      var t,
        i = new THREE.Vector3(),
        r = [],
        o = this.points,
        e = (o.length - 1) * e;
      (t = Math.floor(e)),
        (e -= t),
        (r[0] = 0 == t ? t : t - 1),
        (r[1] = t),
        (r[2] = t > o.length - 2 ? o.length - 1 : t + 1),
        (r[3] = t > o.length - 3 ? o.length - 1 : t + 2),
        (t = o[r[0]]);
      var n = o[r[1]],
        a = o[r[2]],
        r = o[r[3]];
      return (
        (i.x = THREE.Curve.Utils.interpolate(t.x, n.x, a.x, r.x, e)),
        (i.y = THREE.Curve.Utils.interpolate(t.y, n.y, a.y, r.y, e)),
        (i.z = THREE.Curve.Utils.interpolate(t.z, n.z, a.z, r.z, e)),
        i
      );
    }
  )),
  (THREE.ClosedSplineCurve3 = THREE.Curve.create(
    function (e) {
      this.points = void 0 == e ? [] : e;
    },
    function (e) {
      var t,
        i = new THREE.Vector3(),
        r = [],
        o = this.points;
      return (
        (e = Math.floor((t = (o.length - 0) * e))),
        (t -= e),
        (e += e > 0 ? 0 : (Math.floor(Math.abs(e) / o.length) + 1) * o.length),
        (r[0] = (e - 1) % o.length),
        (r[1] = e % o.length),
        (r[2] = (e + 1) % o.length),
        (r[3] = (e + 2) % o.length),
        (i.x = THREE.Curve.Utils.interpolate(
          o[r[0]].x,
          o[r[1]].x,
          o[r[2]].x,
          o[r[3]].x,
          t
        )),
        (i.y = THREE.Curve.Utils.interpolate(
          o[r[0]].y,
          o[r[1]].y,
          o[r[2]].y,
          o[r[3]].y,
          t
        )),
        (i.z = THREE.Curve.Utils.interpolate(
          o[r[0]].z,
          o[r[1]].z,
          o[r[2]].z,
          o[r[3]].z,
          t
        )),
        i
      );
    }
  )),
  (THREE.CurvePath = function () {
    (this.curves = []), (this.bends = []), (this.autoClose = !1);
  }),
  (THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype)),
  (THREE.CurvePath.prototype.add = function (e) {
    this.curves.push(e);
  }),
  (THREE.CurvePath.prototype.checkConnection = function () {}),
  (THREE.CurvePath.prototype.closePath = function () {
    var e = this.curves[0].getPoint(0),
      t = this.curves[this.curves.length - 1].getPoint(1);
    e.equals(t) || this.curves.push(new THREE.LineCurve(t, e));
  }),
  (THREE.CurvePath.prototype.getPoint = function (e) {
    for (
      var t = e * this.getLength(), i = this.getCurveLengths(), e = 0;
      e < i.length;

    ) {
      if (i[e] >= t)
        return (
          (t = 1 - (t = i[e] - t) / (e = this.curves[e]).getLength()),
          e.getPointAt(t)
        );
      e++;
    }
    return null;
  }),
  (THREE.CurvePath.prototype.getLength = function () {
    var e = this.getCurveLengths();
    return e[e.length - 1];
  }),
  (THREE.CurvePath.prototype.getCurveLengths = function () {
    if (this.cacheLengths && this.cacheLengths.length == this.curves.length)
      return this.cacheLengths;
    var e,
      t = [],
      i = 0,
      r = this.curves.length;
    for (e = 0; e < r; e++) t.push((i += this.curves[e].getLength()));
    return (this.cacheLengths = t);
  }),
  (THREE.CurvePath.prototype.getBoundingBox = function () {
    var e,
      t,
      i,
      r,
      o,
      n,
      a,
      s,
      l = this.getPoints();
    for (
      o = n = Number.NEGATIVE_INFINITY,
        a = s = Number.POSITIVE_INFINITY,
        r = new THREE.Vector2(),
        t = 0,
        i = l.length;
      t < i;
      t++
    )
      (e = l[t]).x > o ? (o = e.x) : e.x < a && (a = e.x),
        e.y > n ? (n = e.y) : e.y < s && (s = e.y),
        r.addSelf(e.x, e.y);
    return { minX: a, minY: s, maxX: o, maxY: n, centroid: r.divideScalar(i) };
  }),
  (THREE.CurvePath.prototype.createPointsGeometry = function (e) {
    return this.createGeometry(this.getPoints(e, !0));
  }),
  (THREE.CurvePath.prototype.createSpacedPointsGeometry = function (e) {
    return this.createGeometry(this.getSpacedPoints(e, !0));
  }),
  (THREE.CurvePath.prototype.createGeometry = function (e) {
    for (var t = new THREE.Geometry(), i = 0; i < e.length; i++)
      t.vertices.push(new THREE.Vector3(e[i].x, e[i].y, 0));
    return t;
  }),
  (THREE.CurvePath.prototype.addWrapPath = function (e) {
    this.bends.push(e);
  }),
  (THREE.CurvePath.prototype.getTransformedPoints = function (e, t) {
    var i,
      r,
      o = this.getPoints(e);
    for (t || (t = this.bends), i = 0, r = t.length; i < r; i++)
      o = this.getWrapPoints(o, t[i]);
    return o;
  }),
  (THREE.CurvePath.prototype.getTransformedSpacedPoints = function (e, t) {
    var i,
      r,
      o = this.getSpacedPoints(e);
    for (t || (t = this.bends), i = 0, r = t.length; i < r; i++)
      o = this.getWrapPoints(o, t[i]);
    return o;
  }),
  (THREE.CurvePath.prototype.getWrapPoints = function (e, t) {
    var i,
      r,
      o,
      n,
      a,
      s,
      l = this.getBoundingBox();
    for (i = 0, r = e.length; i < r; i++)
      (n = (o = e[i]).x),
        (a = o.y),
        (s = n / l.maxX),
        (s = t.getUtoTmapping(s, n)),
        (n = t.getPoint(s)),
        (a = t.getNormalVector(s).multiplyScalar(a)),
        (o.x = n.x + a.x),
        (o.y = n.y + a.y);
    return e;
  }),
  (THREE.Gyroscope = function () {
    THREE.Object3D.call(this);
  }),
  (THREE.Gyroscope.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.Gyroscope.prototype.updateMatrixWorld = function (e) {
    this.matrixAutoUpdate && this.updateMatrix(),
      (this.matrixWorldNeedsUpdate || e) &&
        (this.parent
          ? (this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix),
            this.matrixWorld.decompose(
              this.translationWorld,
              this.rotationWorld,
              this.scaleWorld
            ),
            this.matrix.decompose(
              this.translationObject,
              this.rotationObject,
              this.scaleObject
            ),
            this.matrixWorld.compose(
              this.translationWorld,
              this.rotationObject,
              this.scaleWorld
            ))
          : this.matrixWorld.copy(this.matrix),
        (this.matrixWorldNeedsUpdate = !1),
        (e = !0));
    for (var t = 0, i = this.children.length; t < i; t++)
      this.children[t].updateMatrixWorld(e);
  }),
  (THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3()),
  (THREE.Gyroscope.prototype.translationObject = new THREE.Vector3()),
  (THREE.Gyroscope.prototype.rotationWorld = new THREE.Quaternion()),
  (THREE.Gyroscope.prototype.rotationObject = new THREE.Quaternion()),
  (THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3()),
  (THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3()),
  (THREE.Path = function (e) {
    THREE.CurvePath.call(this), (this.actions = []), e && this.fromPoints(e);
  }),
  (THREE.Path.prototype = Object.create(THREE.CurvePath.prototype)),
  (THREE.PathActions = {
    MOVE_TO: "moveTo",
    LINE_TO: "lineTo",
    QUADRATIC_CURVE_TO: "quadraticCurveTo",
    BEZIER_CURVE_TO: "bezierCurveTo",
    CSPLINE_THRU: "splineThru",
    ARC: "arc",
    ELLIPSE: "ellipse",
  }),
  (THREE.Path.prototype.fromPoints = function (e) {
    this.moveTo(e[0].x, e[0].y);
    for (var t = 1, i = e.length; t < i; t++) this.lineTo(e[t].x, e[t].y);
  }),
  (THREE.Path.prototype.moveTo = function (e, t) {
    var i = Array.prototype.slice.call(arguments);
    this.actions.push({ action: THREE.PathActions.MOVE_TO, args: i });
  }),
  (THREE.Path.prototype.lineTo = function (e, t) {
    var i = Array.prototype.slice.call(arguments),
      r = this.actions[this.actions.length - 1].args;
    this.curves.push(
      new THREE.LineCurve(
        new THREE.Vector2(r[r.length - 2], r[r.length - 1]),
        new THREE.Vector2(e, t)
      )
    ),
      this.actions.push({ action: THREE.PathActions.LINE_TO, args: i });
  }),
  (THREE.Path.prototype.quadraticCurveTo = function (e, t, i, r) {
    var o = Array.prototype.slice.call(arguments),
      n = this.actions[this.actions.length - 1].args;
    this.curves.push(
      new THREE.QuadraticBezierCurve(
        new THREE.Vector2(n[n.length - 2], n[n.length - 1]),
        new THREE.Vector2(e, t),
        new THREE.Vector2(i, r)
      )
    ),
      this.actions.push({
        action: THREE.PathActions.QUADRATIC_CURVE_TO,
        args: o,
      });
  }),
  (THREE.Path.prototype.bezierCurveTo = function (e, t, i, r, o, n) {
    var a = Array.prototype.slice.call(arguments),
      s = this.actions[this.actions.length - 1].args;
    this.curves.push(
      new THREE.CubicBezierCurve(
        new THREE.Vector2(s[s.length - 2], s[s.length - 1]),
        new THREE.Vector2(e, t),
        new THREE.Vector2(i, r),
        new THREE.Vector2(o, n)
      )
    ),
      this.actions.push({ action: THREE.PathActions.BEZIER_CURVE_TO, args: a });
  }),
  (THREE.Path.prototype.splineThru = function (e) {
    var t = Array.prototype.slice.call(arguments),
      i = this.actions[this.actions.length - 1].args,
      i = [new THREE.Vector2(i[i.length - 2], i[i.length - 1])];
    Array.prototype.push.apply(i, e),
      this.curves.push(new THREE.SplineCurve(i)),
      this.actions.push({ action: THREE.PathActions.CSPLINE_THRU, args: t });
  }),
  (THREE.Path.prototype.ellipse = function (e, t, i, r, o, n, a) {
    var s = this.actions[this.actions.length - 1];
    this.absellipse(s.x + e, s.y + t, i, r, o, n, a);
  }),
  (THREE.Path.prototype.arc = function (e, t, i, r, o, n) {
    var a = this.actions[this.actions.length - 1];
    this.absarc(a.x + e, a.y + t, i, r, o, n);
  }),
  (THREE.Path.prototype.absellipse = function (e, t, i, r, o, n, a) {
    var s = Array.prototype.slice.call(arguments),
      l = new THREE.EllipseCurve(e, t, i, r, o, n, a);
    this.curves.push(l),
      (l = l.getPoint(a ? 1 : 0)),
      s.push(l.x),
      s.push(l.y),
      this.actions.push({ action: THREE.PathActions.ELLIPSE, args: s });
  }),
  (THREE.Path.prototype.absarc = function (e, t, i, r, o, n) {
    this.absellipse(e, t, i, i, r, o, n);
  }),
  (THREE.Path.prototype.getSpacedPoints = function (e) {
    e || (e = 40);
    for (var t = [], i = 0; i < e; i++) t.push(this.getPoint(i / e));
    return t;
  }),
  (THREE.Path.prototype.getPoints = function (e, t) {
    if (this.useSpacedPoints)
      return console.log("tata"), this.getSpacedPoints(e, t);
    var i,
      r,
      o,
      n,
      a,
      s,
      l,
      h,
      c,
      f,
      u,
      p,
      d,
      e = e || 12,
      E = [];
    for (i = 0, r = this.actions.length; i < r; i++)
      switch (((n = (o = this.actions[i]).action), (o = o.args), n)) {
        case THREE.PathActions.MOVE_TO:
        case THREE.PathActions.LINE_TO:
          E.push(new THREE.Vector2(o[0], o[1]));
          break;
        case THREE.PathActions.QUADRATIC_CURVE_TO:
          for (
            a = o[2],
              s = o[3],
              c = o[0],
              f = o[1],
              E.length > 0
                ? ((u = (n = E[E.length - 1]).x), (p = n.y))
                : ((u = (n = this.actions[i - 1].args)[n.length - 2]),
                  (p = n[n.length - 1])),
              o = 1;
            o <= e;
            o++
          )
            (d = o / e),
              (n = THREE.Shape.Utils.b2(d, u, c, a)),
              (d = THREE.Shape.Utils.b2(d, p, f, s)),
              E.push(new THREE.Vector2(n, d));
          break;
        case THREE.PathActions.BEZIER_CURVE_TO:
          for (
            a = o[4],
              s = o[5],
              c = o[0],
              f = o[1],
              l = o[2],
              h = o[3],
              E.length > 0
                ? ((u = (n = E[E.length - 1]).x), (p = n.y))
                : ((u = (n = this.actions[i - 1].args)[n.length - 2]),
                  (p = n[n.length - 1])),
              o = 1;
            o <= e;
            o++
          )
            (d = o / e),
              (n = THREE.Shape.Utils.b3(d, u, c, l, a)),
              (d = THREE.Shape.Utils.b3(d, p, f, h, s)),
              E.push(new THREE.Vector2(n, d));
          break;
        case THREE.PathActions.CSPLINE_THRU:
          for (
            n = this.actions[i - 1].args,
              d = [new THREE.Vector2(n[n.length - 2], n[n.length - 1])],
              n = e * o[0].length,
              d = d.concat(o[0]),
              d = new THREE.SplineCurve(d),
              o = 1;
            o <= n;
            o++
          )
            E.push(d.getPointAt(o / n));
          break;
        case THREE.PathActions.ARC:
          for (
            a = o[0],
              s = o[1],
              f = o[2],
              l = o[3],
              n = o[4],
              c = !!o[5],
              u = n - l,
              p = 2 * e,
              o = 1;
            o <= p;
            o++
          )
            (d = o / p),
              c || (d = 1 - d),
              (n = a + f * Math.cos((d = l + d * u))),
              (d = s + f * Math.sin(d)),
              E.push(new THREE.Vector2(n, d));
          break;
        case THREE.PathActions.ELLIPSE:
          for (
            a = o[0],
              s = o[1],
              f = o[2],
              h = o[3],
              l = o[4],
              n = o[5],
              c = !!o[6],
              u = n - l,
              p = 2 * e,
              o = 1;
            o <= p;
            o++
          )
            (d = o / p),
              c || (d = 1 - d),
              (n = a + f * Math.cos((d = l + d * u))),
              (d = s + h * Math.sin(d)),
              E.push(new THREE.Vector2(n, d));
      }
    return (
      1e-10 > Math.abs((i = E[E.length - 1]).x - E[0].x) &&
        1e-10 > Math.abs(i.y - E[0].y) &&
        E.splice(E.length - 1, 1),
      t && E.push(E[0]),
      E
    );
  }),
  (THREE.Path.prototype.toShapes = function () {
    var e,
      t,
      i,
      r,
      o,
      n = [],
      a = new THREE.Path();
    for (t = 0, i = this.actions.length; t < i; t++)
      (o = (r = this.actions[t]).args),
        (r = r.action) == THREE.PathActions.MOVE_TO &&
          0 != a.actions.length &&
          (n.push(a), (a = new THREE.Path())),
        a[r].apply(a, o);
    if ((0 != a.actions.length && n.push(a), 0 == n.length)) return [];
    if (
      ((o = []),
      (t = !THREE.Shape.Utils.isClockWise(n[0].getPoints())),
      1 == n.length)
    )
      return (
        (a = n[0]),
        ((e = new THREE.Shape()).actions = a.actions),
        (e.curves = a.curves),
        o.push(e),
        o
      );
    if (t)
      for (e = new THREE.Shape(), t = 0, i = n.length; t < i; t++)
        (a = n[t]),
          THREE.Shape.Utils.isClockWise(a.getPoints())
            ? ((e.actions = a.actions),
              (e.curves = a.curves),
              o.push(e),
              (e = new THREE.Shape()))
            : e.holes.push(a);
    else {
      for (t = 0, i = n.length; t < i; t++)
        (a = n[t]),
          THREE.Shape.Utils.isClockWise(a.getPoints())
            ? (e && o.push(e),
              ((e = new THREE.Shape()).actions = a.actions),
              (e.curves = a.curves))
            : e.holes.push(a);
      o.push(e);
    }
    return o;
  }),
  (THREE.Shape = function () {
    THREE.Path.apply(this, arguments), (this.holes = []);
  }),
  (THREE.Shape.prototype = Object.create(THREE.Path.prototype)),
  (THREE.Shape.prototype.extrude = function (e) {
    return new THREE.ExtrudeGeometry(this, e);
  }),
  (THREE.Shape.prototype.getPointsHoles = function (e) {
    var t,
      i = this.holes.length,
      r = [];
    for (t = 0; t < i; t++)
      r[t] = this.holes[t].getTransformedPoints(e, this.bends);
    return r;
  }),
  (THREE.Shape.prototype.getSpacedPointsHoles = function (e) {
    var t,
      i = this.holes.length,
      r = [];
    for (t = 0; t < i; t++)
      r[t] = this.holes[t].getTransformedSpacedPoints(e, this.bends);
    return r;
  }),
  (THREE.Shape.prototype.extractAllPoints = function (e) {
    return {
      shape: this.getTransformedPoints(e),
      holes: this.getPointsHoles(e),
    };
  }),
  (THREE.Shape.prototype.extractPoints = function (e) {
    return this.useSpacedPoints
      ? this.extractAllSpacedPoints(e)
      : this.extractAllPoints(e);
  }),
  (THREE.Shape.prototype.extractAllSpacedPoints = function (e) {
    return {
      shape: this.getTransformedSpacedPoints(e),
      holes: this.getSpacedPointsHoles(e),
    };
  }),
  (THREE.Shape.Utils = {
    removeHoles: function (e, t) {
      var i,
        r,
        o,
        n,
        a,
        s,
        l,
        h,
        c,
        f,
        u = e.concat(),
        p = u.concat(),
        d = [];
      for (a = 0; a < t.length; a++) {
        for (
          s = t[a],
            Array.prototype.push.apply(p, s),
            r = Number.POSITIVE_INFINITY,
            i = 0;
          i < s.length;
          i++
        )
          for (h = 0, c = s[i], f = []; h < u.length; h++)
            (l = u[h]),
              (l = c.distanceToSquared(l)),
              f.push(l),
              l < r && ((r = l), (o = i), (n = h));
        (i = n - 1 >= 0 ? n - 1 : u.length - 1),
          (r = o - 1 >= 0 ? o - 1 : s.length - 1);
        var E = [s[o], u[n], u[i]];
        h = THREE.FontUtils.Triangulate.area(E);
        var m = [s[o], s[r], u[n]];
        (c = THREE.FontUtils.Triangulate.area(m)),
          (f = n),
          (l = o),
          (o += -1),
          (n += 1) < 0 && (n += u.length),
          (n %= u.length),
          o < 0 && (o += s.length),
          (o %= s.length),
          (i = n - 1 >= 0 ? n - 1 : u.length - 1),
          (r = o - 1 >= 0 ? o - 1 : s.length - 1),
          (E = [s[o], u[n], u[i]]),
          (E = THREE.FontUtils.Triangulate.area(E)),
          (m = [s[o], s[r], u[n]]),
          h + c > E + (m = THREE.FontUtils.Triangulate.area(m)) &&
            ((n = f),
            (o = l),
            n < 0 && (n += u.length),
            (n %= u.length),
            o < 0 && (o += s.length),
            (o %= s.length),
            (i = n - 1 >= 0 ? n - 1 : u.length - 1),
            (r = o - 1 >= 0 ? o - 1 : s.length - 1)),
          (h = u.slice(0, n)),
          (c = u.slice(n)),
          (f = s.slice(o)),
          (l = s.slice(0, o)),
          (r = [s[o], s[r], u[n]]),
          d.push([s[o], u[n], u[i]]),
          d.push(r),
          (u = h.concat(f).concat(l).concat(c));
      }
      return { shape: u, isolatedPts: d, allpoints: p };
    },
    triangulateShape: function (e, t) {
      var i,
        r,
        o,
        n,
        a = THREE.Shape.Utils.removeHoles(e, t),
        s = a.allpoints,
        l = a.isolatedPts,
        a = THREE.FontUtils.Triangulate(a.shape, !1),
        h = {};
      for (i = 0, r = s.length; i < r; i++)
        void 0 !== h[(n = s[i].x + ":" + s[i].y)] &&
          console.log("Duplicate point", n),
          (h[n] = i);
      for (i = 0, r = a.length; i < r; i++)
        for (s = 0, o = a[i]; s < 3; s++)
          void 0 !== (n = h[(n = o[s].x + ":" + o[s].y)]) && (o[s] = n);
      for (i = 0, r = l.length; i < r; i++)
        for (s = 0, o = l[i]; s < 3; s++)
          void 0 !== (n = h[(n = o[s].x + ":" + o[s].y)]) && (o[s] = n);
      return a.concat(l);
    },
    isClockWise: function (e) {
      return 0 > THREE.FontUtils.Triangulate.area(e);
    },
    b2p0: function (e, t) {
      var i = 1 - e;
      return i * i * t;
    },
    b2p1: function (e, t) {
      return 2 * (1 - e) * e * t;
    },
    b2p2: function (e, t) {
      return e * e * t;
    },
    b2: function (e, t, i, r) {
      return this.b2p0(e, t) + this.b2p1(e, i) + this.b2p2(e, r);
    },
    b3p0: function (e, t) {
      var i = 1 - e;
      return i * i * i * t;
    },
    b3p1: function (e, t) {
      var i = 1 - e;
      return 3 * i * i * e * t;
    },
    b3p2: function (e, t) {
      return 3 * (1 - e) * e * e * t;
    },
    b3p3: function (e, t) {
      return e * e * e * t;
    },
    b3: function (e, t, i, r, o) {
      return (
        this.b3p0(e, t) + this.b3p1(e, i) + this.b3p2(e, r) + this.b3p3(e, o)
      );
    },
  }),
  (THREE.AnimationHandler = (function () {
    var e = [],
      t = {},
      i = {
        update: function (t) {
          for (var i = 0; i < e.length; i++) e[i].update(t);
        },
        addToUpdate: function (t) {
          -1 === e.indexOf(t) && e.push(t);
        },
        removeFromUpdate: function (t) {
          -1 !== (t = e.indexOf(t)) && e.splice(t, 1);
        },
        add: function (e) {
          if (
            (void 0 !== t[e.name] &&
              console.log(
                "THREE.AnimationHandler.add: Warning! " +
                  e.name +
                  " already exists in library. Overwriting."
              ),
            (t[e.name] = e),
            !0 !== e.initialized)
          ) {
            for (var i = 0; i < e.hierarchy.length; i++) {
              for (var r = 0; r < e.hierarchy[i].keys.length; r++)
                if (
                  (e.hierarchy[i].keys[r].time < 0 &&
                    (e.hierarchy[i].keys[r].time = 0),
                  void 0 !== e.hierarchy[i].keys[r].rot &&
                    !(e.hierarchy[i].keys[r].rot instanceof THREE.Quaternion))
                ) {
                  var o = e.hierarchy[i].keys[r].rot;
                  e.hierarchy[i].keys[r].rot = new THREE.Quaternion(
                    o[0],
                    o[1],
                    o[2],
                    o[3]
                  );
                }
              if (
                e.hierarchy[i].keys.length &&
                void 0 !== e.hierarchy[i].keys[0].morphTargets
              ) {
                for (r = 0, o = {}; r < e.hierarchy[i].keys.length; r++)
                  for (
                    var n = 0;
                    n < e.hierarchy[i].keys[r].morphTargets.length;
                    n++
                  ) {
                    var a = e.hierarchy[i].keys[r].morphTargets[n];
                    o[a] = -1;
                  }
                for (
                  r = 0, e.hierarchy[i].usedMorphTargets = o;
                  r < e.hierarchy[i].keys.length;
                  r++
                ) {
                  var s = {};
                  for (a in o) {
                    for (
                      n = 0;
                      n < e.hierarchy[i].keys[r].morphTargets.length;
                      n++
                    )
                      if (e.hierarchy[i].keys[r].morphTargets[n] === a) {
                        s[a] = e.hierarchy[i].keys[r].morphTargetsInfluences[n];
                        break;
                      }
                    n === e.hierarchy[i].keys[r].morphTargets.length &&
                      (s[a] = 0);
                  }
                  e.hierarchy[i].keys[r].morphTargetsInfluences = s;
                }
              }
              for (r = 1; r < e.hierarchy[i].keys.length; r++)
                e.hierarchy[i].keys[r].time ===
                  e.hierarchy[i].keys[r - 1].time &&
                  (e.hierarchy[i].keys.splice(r, 1), r--);
              for (r = 0; r < e.hierarchy[i].keys.length; r++)
                e.hierarchy[i].keys[r].index = r;
            }
            for (
              i = 0,
                r = parseInt(e.length * e.fps, 10),
                e.JIT = {},
                e.JIT.hierarchy = [];
              i < e.hierarchy.length;
              i++
            )
              e.JIT.hierarchy.push(Array(r));
            e.initialized = !0;
          }
        },
        get: function (e) {
          if ("string" == typeof e)
            return t[e]
              ? t[e]
              : (console.log(
                  "THREE.AnimationHandler.get: Couldn't find animation " + e
                ),
                null);
        },
        parse: function (e) {
          var t = [];
          if (e instanceof THREE.SkinnedMesh)
            for (var i = 0; i < e.bones.length; i++) t.push(e.bones[i]);
          else r(e, t);
          return t;
        },
      },
      r = function (e, t) {
        t.push(e);
        for (var i = 0; i < e.children.length; i++) r(e.children[i], t);
      };
    return (i.LINEAR = 0), (i.CATMULLROM = 1), (i.CATMULLROM_FORWARD = 2), i;
  })()),
  (THREE.Animation = function (e, t, i) {
    (this.root = e),
      (this.data = THREE.AnimationHandler.get(t)),
      (this.hierarchy = THREE.AnimationHandler.parse(e)),
      (this.currentTime = 0),
      (this.timeScale = 1),
      (this.isPlaying = !1),
      (this.loop = this.isPaused = !0),
      (this.interpolationType =
        void 0 !== i ? i : THREE.AnimationHandler.LINEAR),
      (this.points = []),
      (this.target = new THREE.Vector3());
  }),
  (THREE.Animation.prototype.play = function (e, t) {
    if (!1 === this.isPlaying) {
      (this.isPlaying = !0),
        (this.loop = void 0 === e || e),
        (this.currentTime = void 0 !== t ? t : 0);
      var i,
        r,
        o = this.hierarchy.length;
      for (i = 0; i < o; i++) {
        (r = this.hierarchy[i]),
          this.interpolationType !==
            THREE.AnimationHandler.CATMULLROM_FORWARD && (r.useQuaternion = !0),
          (r.matrixAutoUpdate = !0),
          void 0 === r.animationCache &&
            ((r.animationCache = {}),
            (r.animationCache.prevKey = { pos: 0, rot: 0, scl: 0 }),
            (r.animationCache.nextKey = { pos: 0, rot: 0, scl: 0 }),
            (r.animationCache.originalMatrix =
              r instanceof THREE.Bone ? r.skinMatrix : r.matrix));
        var n = r.animationCache.prevKey;
        (r = r.animationCache.nextKey),
          (n.pos = this.data.hierarchy[i].keys[0]),
          (n.rot = this.data.hierarchy[i].keys[0]),
          (n.scl = this.data.hierarchy[i].keys[0]),
          (r.pos = this.getNextKeyWith("pos", i, 1)),
          (r.rot = this.getNextKeyWith("rot", i, 1)),
          (r.scl = this.getNextKeyWith("scl", i, 1));
      }
      this.update(0);
    }
    (this.isPaused = !1), THREE.AnimationHandler.addToUpdate(this);
  }),
  (THREE.Animation.prototype.pause = function () {
    !0 === this.isPaused
      ? THREE.AnimationHandler.addToUpdate(this)
      : THREE.AnimationHandler.removeFromUpdate(this),
      (this.isPaused = !this.isPaused);
  }),
  (THREE.Animation.prototype.stop = function () {
    (this.isPaused = this.isPlaying = !1),
      THREE.AnimationHandler.removeFromUpdate(this);
  }),
  (THREE.Animation.prototype.update = function (e) {
    if (!1 !== this.isPlaying) {
      var t,
        i,
        r,
        o,
        n,
        a,
        s,
        l,
        h,
        c = ["pos", "rot", "scl"];
      (h = this.currentTime = this.currentTime + e * this.timeScale),
        parseInt(
          Math.min(
            (l = this.currentTime = this.currentTime % this.data.length) *
              this.data.fps,
            this.data.length * this.data.fps
          ),
          10
        );
      for (var f = 0, u = this.hierarchy.length; f < u; f++) {
        s = (e = this.hierarchy[f]).animationCache;
        for (var p = 0; p < 3; p++) {
          if (((t = c[p]), (n = s.prevKey[t]), (a = s.nextKey[t]).time <= h)) {
            if (l < h) {
              if (this.loop)
                for (
                  n = this.data.hierarchy[f].keys[0],
                    a = this.getNextKeyWith(t, f, 1);
                  a.time < l;

                )
                  (n = a), (a = this.getNextKeyWith(t, f, a.index + 1));
              else {
                this.stop();
                return;
              }
            } else
              do (n = a), (a = this.getNextKeyWith(t, f, a.index + 1));
              while (a.time < l);
            (s.prevKey[t] = n), (s.nextKey[t] = a);
          }
          (e.matrixAutoUpdate = !0),
            (e.matrixWorldNeedsUpdate = !0),
            (i = (l - n.time) / (a.time - n.time)),
            (r = n[t]),
            (o = a[t]),
            (i < 0 || i > 1) &&
              (console.log(
                "THREE.Animation.update: Warning! Scale out of bounds:" +
                  i +
                  " on bone " +
                  f
              ),
              (i = i < 0 ? 0 : 1)),
            "pos" === t
              ? ((t = e.position),
                this.interpolationType === THREE.AnimationHandler.LINEAR
                  ? ((t.x = r[0] + (o[0] - r[0]) * i),
                    (t.y = r[1] + (o[1] - r[1]) * i),
                    (t.z = r[2] + (o[2] - r[2]) * i))
                  : (this.interpolationType ===
                      THREE.AnimationHandler.CATMULLROM ||
                      this.interpolationType ===
                        THREE.AnimationHandler.CATMULLROM_FORWARD) &&
                    ((this.points[0] = this.getPrevKeyWith(
                      "pos",
                      f,
                      n.index - 1
                    ).pos),
                    (this.points[1] = r),
                    (this.points[2] = o),
                    (this.points[3] = this.getNextKeyWith(
                      "pos",
                      f,
                      a.index + 1
                    ).pos),
                    (i = 0.33 * i + 0.33),
                    (r = this.interpolateCatmullRom(this.points, i)),
                    (t.x = r[0]),
                    (t.y = r[1]),
                    (t.z = r[2]),
                    this.interpolationType ===
                      THREE.AnimationHandler.CATMULLROM_FORWARD &&
                      ((i = this.interpolateCatmullRom(this.points, 1.01 * i)),
                      this.target.set(i[0], i[1], i[2]),
                      this.target.subSelf(t),
                      (this.target.y = 0),
                      this.target.normalize(),
                      (i = Math.atan2(this.target.x, this.target.z)),
                      e.rotation.set(0, i, 0))))
              : "rot" === t
              ? THREE.Quaternion.slerp(r, o, e.quaternion, i)
              : "scl" === t &&
                (((t = e.scale).x = r[0] + (o[0] - r[0]) * i),
                (t.y = r[1] + (o[1] - r[1]) * i),
                (t.z = r[2] + (o[2] - r[2]) * i));
        }
      }
    }
  }),
  (THREE.Animation.prototype.interpolateCatmullRom = function (e, t) {
    var i,
      r,
      o,
      n,
      a,
      s,
      l = [],
      h = [];
    return (
      (r = Math.floor((i = (e.length - 1) * t))),
      (i -= r),
      (l[0] = 0 === r ? r : r - 1),
      (l[1] = r),
      (l[2] = r > e.length - 2 ? r : r + 1),
      (l[3] = r > e.length - 3 ? r : r + 2),
      (r = e[l[0]]),
      (n = e[l[1]]),
      (a = e[l[2]]),
      (s = e[l[3]]),
      (l = i * i),
      (o = i * l),
      (h[0] = this.interpolate(r[0], n[0], a[0], s[0], i, l, o)),
      (h[1] = this.interpolate(r[1], n[1], a[1], s[1], i, l, o)),
      (h[2] = this.interpolate(r[2], n[2], a[2], s[2], i, l, o)),
      h
    );
  }),
  (THREE.Animation.prototype.interpolate = function (e, t, i, r, o, n, a) {
    return (
      (e = (i - e) * 0.5),
      (r = (r - t) * 0.5),
      (2 * (t - i) + e + r) * a + (-3 * (t - i) - 2 * e - r) * n + e * o + t
    );
  }),
  (THREE.Animation.prototype.getNextKeyWith = function (e, t, i) {
    for (
      var r = this.data.hierarchy[t].keys,
        i =
          this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
          this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD
            ? i < r.length - 1
              ? i
              : r.length - 1
            : i % r.length;
      i < r.length;
      i++
    )
      if (void 0 !== r[i][e]) return r[i];
    return this.data.hierarchy[t].keys[0];
  }),
  (THREE.Animation.prototype.getPrevKeyWith = function (e, t, i) {
    for (
      var r = this.data.hierarchy[t].keys,
        i =
          this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
          this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD
            ? i > 0
              ? i
              : 0
            : i >= 0
            ? i
            : i + r.length;
      i >= 0;
      i--
    )
      if (void 0 !== r[i][e]) return r[i];
    return this.data.hierarchy[t].keys[r.length - 1];
  }),
  (THREE.KeyFrameAnimation = function (e, t, i) {
    for (
      this.root = e,
        this.data = THREE.AnimationHandler.get(t),
        this.hierarchy = THREE.AnimationHandler.parse(e),
        this.currentTime = 0,
        this.timeScale = 0.001,
        this.isPlaying = !1,
        this.loop = this.isPaused = !0,
        this.JITCompile = void 0 === i || i,
        e = 0,
        t = this.hierarchy.length;
      e < t;
      e++
    ) {
      var i = this.data.hierarchy[e].sids,
        r = this.hierarchy[e];
      if (this.data.hierarchy[e].keys.length && i) {
        for (var o = 0; o < i.length; o++) {
          var n = i[o],
            a = this.getNextKeyWith(n, e, 0);
          a && a.apply(n);
        }
        (r.matrixAutoUpdate = !1),
          this.data.hierarchy[e].node.updateMatrix(),
          (r.matrixWorldNeedsUpdate = !0);
      }
    }
  }),
  (THREE.KeyFrameAnimation.prototype.play = function (e, t) {
    if (!this.isPlaying) {
      (this.isPlaying = !0),
        (this.loop = void 0 === e || e),
        (this.currentTime = void 0 !== t ? t : 0),
        (this.startTimeMs = t),
        (this.startTime = 1e7),
        (this.endTime = -this.startTime);
      var i,
        r,
        o,
        n = this.hierarchy.length;
      for (i = 0; i < n; i++)
        (r = this.hierarchy[i]),
          (o = this.data.hierarchy[i]),
          (r.useQuaternion = !0),
          void 0 === o.animationCache &&
            ((o.animationCache = {}),
            (o.animationCache.prevKey = null),
            (o.animationCache.nextKey = null),
            (o.animationCache.originalMatrix =
              r instanceof THREE.Bone ? r.skinMatrix : r.matrix)),
          (r = this.data.hierarchy[i].keys).length &&
            ((o.animationCache.prevKey = r[0]),
            (o.animationCache.nextKey = r[1]),
            (this.startTime = Math.min(r[0].time, this.startTime)),
            (this.endTime = Math.max(r[r.length - 1].time, this.endTime)));
      this.update(0);
    }
    (this.isPaused = !1), THREE.AnimationHandler.addToUpdate(this);
  }),
  (THREE.KeyFrameAnimation.prototype.pause = function () {
    this.isPaused
      ? THREE.AnimationHandler.addToUpdate(this)
      : THREE.AnimationHandler.removeFromUpdate(this),
      (this.isPaused = !this.isPaused);
  }),
  (THREE.KeyFrameAnimation.prototype.stop = function () {
    (this.isPaused = this.isPlaying = !1),
      THREE.AnimationHandler.removeFromUpdate(this);
    for (var e = 0; e < this.data.hierarchy.length; e++) {
      var t = this.hierarchy[e],
        i = this.data.hierarchy[e];
      if (void 0 !== i.animationCache) {
        var r = i.animationCache.originalMatrix;
        t instanceof THREE.Bone
          ? (r.copy(t.skinMatrix), (t.skinMatrix = r))
          : (r.copy(t.matrix), (t.matrix = r)),
          delete i.animationCache;
      }
    }
  }),
  (THREE.KeyFrameAnimation.prototype.update = function (e) {
    if (this.isPlaying) {
      var t,
        i,
        r,
        o,
        n,
        a,
        s,
        l = this.data.JIT.hierarchy;
      if (
        ((a = this.currentTime = this.currentTime + e * this.timeScale),
        (n = this.currentTime = this.currentTime % this.data.length) <
          this.startTimeMs && (n = this.currentTime = this.startTimeMs + n),
        (o = parseInt(
          Math.min(n * this.data.fps, this.data.length * this.data.fps),
          10
        )),
        (s = n < a) && !this.loop)
      ) {
        for (var e = 0, h = this.hierarchy.length; e < h; e++) {
          var c = this.data.hierarchy[e].keys,
            l = this.data.hierarchy[e].sids;
          if (((r = c.length - 1), (o = this.hierarchy[e]), c.length)) {
            for (c = 0; c < l.length; c++)
              (n = l[c]), (a = this.getPrevKeyWith(n, e, r)) && a.apply(n);
            this.data.hierarchy[e].node.updateMatrix(),
              (o.matrixWorldNeedsUpdate = !0);
          }
        }
        this.stop();
      } else if (!(n < this.startTime)) {
        for (e = 0, h = this.hierarchy.length; e < h; e++) {
          r = this.hierarchy[e];
          var c = (t = this.data.hierarchy[e]).keys,
            f = t.animationCache;
          if (this.JITCompile && void 0 !== l[e][o])
            r instanceof THREE.Bone
              ? ((r.skinMatrix = l[e][o]), (r.matrixWorldNeedsUpdate = !1))
              : ((r.matrix = l[e][o]), (r.matrixWorldNeedsUpdate = !0));
          else if (c.length) {
            if (
              (this.JITCompile &&
                f &&
                (r instanceof THREE.Bone
                  ? (r.skinMatrix = f.originalMatrix)
                  : (r.matrix = f.originalMatrix)),
              (t = f.prevKey),
              (i = f.nextKey),
              t && i)
            ) {
              if (i.time <= a) {
                if (s && this.loop)
                  for (t = c[0], i = c[1]; i.time < n; )
                    i = c[(t = i).index + 1];
                else if (!s)
                  for (var u = c.length - 1; i.time < n && i.index !== u; )
                    i = c[(t = i).index + 1];
                (f.prevKey = t), (f.nextKey = i);
              }
              i.time >= n ? t.interpolate(i, n) : t.interpolate(i, i.time);
            }
            this.data.hierarchy[e].node.updateMatrix(),
              (r.matrixWorldNeedsUpdate = !0);
          }
        }
        if (this.JITCompile && void 0 === l[0][o])
          for (
            this.hierarchy[0].updateMatrixWorld(!0), e = 0;
            e < this.hierarchy.length;
            e++
          )
            l[e][o] =
              this.hierarchy[e] instanceof THREE.Bone
                ? this.hierarchy[e].skinMatrix.clone()
                : this.hierarchy[e].matrix.clone();
      }
    }
  }),
  (THREE.KeyFrameAnimation.prototype.getNextKeyWith = function (e, t, i) {
    for (i %= (t = this.data.hierarchy[t].keys).length; i < t.length; i++)
      if (t[i].hasTarget(e)) return t[i];
    return t[0];
  }),
  (THREE.KeyFrameAnimation.prototype.getPrevKeyWith = function (e, t, i) {
    for (
      t = this.data.hierarchy[t].keys, i = i >= 0 ? i : i + t.length;
      i >= 0;
      i--
    )
      if (t[i].hasTarget(e)) return t[i];
    return t[t.length - 1];
  }),
  (THREE.CubeCamera = function (e, t, i) {
    THREE.Object3D.call(this);
    var r = new THREE.PerspectiveCamera(90, 1, e, t);
    r.up.set(0, -1, 0), r.lookAt(new THREE.Vector3(1, 0, 0)), this.add(r);
    var o = new THREE.PerspectiveCamera(90, 1, e, t);
    o.up.set(0, -1, 0), o.lookAt(new THREE.Vector3(-1, 0, 0)), this.add(o);
    var n = new THREE.PerspectiveCamera(90, 1, e, t);
    n.up.set(0, 0, 1), n.lookAt(new THREE.Vector3(0, 1, 0)), this.add(n);
    var a = new THREE.PerspectiveCamera(90, 1, e, t);
    a.up.set(0, 0, -1), a.lookAt(new THREE.Vector3(0, -1, 0)), this.add(a);
    var s = new THREE.PerspectiveCamera(90, 1, e, t);
    s.up.set(0, -1, 0), s.lookAt(new THREE.Vector3(0, 0, 1)), this.add(s);
    var l = new THREE.PerspectiveCamera(90, 1, e, t);
    l.up.set(0, -1, 0),
      l.lookAt(new THREE.Vector3(0, 0, -1)),
      this.add(l),
      (this.renderTarget = new THREE.WebGLRenderTargetCube(i, i, {
        format: THREE.RGBFormat,
        magFilter: THREE.LinearFilter,
        minFilter: THREE.LinearFilter,
      })),
      (this.updateCubeMap = function (e, t) {
        var i = this.renderTarget,
          h = i.generateMipmaps;
        (i.generateMipmaps = !1),
          (i.activeCubeFace = 0),
          e.render(t, r, i),
          (i.activeCubeFace = 1),
          e.render(t, o, i),
          (i.activeCubeFace = 2),
          e.render(t, n, i),
          (i.activeCubeFace = 3),
          e.render(t, a, i),
          (i.activeCubeFace = 4),
          e.render(t, s, i),
          (i.generateMipmaps = h),
          (i.activeCubeFace = 5),
          e.render(t, l, i);
      });
  }),
  (THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.CombinedCamera = function (e, t, i, r, o, n, a) {
    THREE.Camera.call(this),
      (this.fov = i),
      (this.left = -e / 2),
      (this.right = e / 2),
      (this.top = t / 2),
      (this.bottom = -t / 2),
      (this.cameraO = new THREE.OrthographicCamera(
        -(e / 2),
        e / 2,
        t / 2,
        -(t / 2),
        n,
        a
      )),
      (this.cameraP = new THREE.PerspectiveCamera(i, e / t, r, o)),
      (this.zoom = 1),
      this.toPerspective();
  }),
  (THREE.CombinedCamera.prototype = Object.create(THREE.Camera.prototype)),
  (THREE.CombinedCamera.prototype.toPerspective = function () {
    (this.near = this.cameraP.near),
      (this.far = this.cameraP.far),
      (this.cameraP.fov = this.fov / this.zoom),
      this.cameraP.updateProjectionMatrix(),
      (this.projectionMatrix = this.cameraP.projectionMatrix),
      (this.inPerspectiveMode = !0),
      (this.inOrthographicMode = !1);
  }),
  (THREE.CombinedCamera.prototype.toOrthographic = function () {
    var e = this.cameraP.aspect,
      t = (this.cameraP.near + this.cameraP.far) / 2,
      t = Math.tan(this.fov / 2) * t,
      e = (2 * t * e) / 2,
      t = t / this.zoom,
      e = e / this.zoom;
    (this.cameraO.left = -e),
      (this.cameraO.right = e),
      (this.cameraO.top = t),
      (this.cameraO.bottom = -t),
      this.cameraO.updateProjectionMatrix(),
      (this.near = this.cameraO.near),
      (this.far = this.cameraO.far),
      (this.projectionMatrix = this.cameraO.projectionMatrix),
      (this.inPerspectiveMode = !1),
      (this.inOrthographicMode = !0);
  }),
  (THREE.CombinedCamera.prototype.setSize = function (e, t) {
    (this.cameraP.aspect = e / t),
      (this.left = -e / 2),
      (this.right = e / 2),
      (this.top = t / 2),
      (this.bottom = -t / 2);
  }),
  (THREE.CombinedCamera.prototype.setFov = function (e) {
    (this.fov = e),
      this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic();
  }),
  (THREE.CombinedCamera.prototype.updateProjectionMatrix = function () {
    this.inPerspectiveMode
      ? this.toPerspective()
      : (this.toPerspective(), this.toOrthographic());
  }),
  (THREE.CombinedCamera.prototype.setLens = function (e, t) {
    var i = 2 * Math.atan((void 0 !== t ? t : 24) / (2 * e)) * (180 / Math.PI);
    return this.setFov(i), i;
  }),
  (THREE.CombinedCamera.prototype.setZoom = function (e) {
    (this.zoom = e),
      this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic();
  }),
  (THREE.CombinedCamera.prototype.toFrontView = function () {
    (this.rotation.x = 0),
      (this.rotation.y = 0),
      (this.rotation.z = 0),
      (this.rotationAutoUpdate = !1);
  }),
  (THREE.CombinedCamera.prototype.toBackView = function () {
    (this.rotation.x = 0),
      (this.rotation.y = Math.PI),
      (this.rotation.z = 0),
      (this.rotationAutoUpdate = !1);
  }),
  (THREE.CombinedCamera.prototype.toLeftView = function () {
    (this.rotation.x = 0),
      (this.rotation.y = -Math.PI / 2),
      (this.rotation.z = 0),
      (this.rotationAutoUpdate = !1);
  }),
  (THREE.CombinedCamera.prototype.toRightView = function () {
    (this.rotation.x = 0),
      (this.rotation.y = Math.PI / 2),
      (this.rotation.z = 0),
      (this.rotationAutoUpdate = !1);
  }),
  (THREE.CombinedCamera.prototype.toTopView = function () {
    (this.rotation.x = -Math.PI / 2),
      (this.rotation.y = 0),
      (this.rotation.z = 0),
      (this.rotationAutoUpdate = !1);
  }),
  (THREE.CombinedCamera.prototype.toBottomView = function () {
    (this.rotation.x = Math.PI / 2),
      (this.rotation.y = 0),
      (this.rotation.z = 0),
      (this.rotationAutoUpdate = !1);
  }),
  (THREE.FirstPersonControls = function (e, t) {
    function i(e, t) {
      return function () {
        t.apply(e, arguments);
      };
    }
    (this.object = e),
      (this.target = new THREE.Vector3(0, 0, 0)),
      (this.domElement = void 0 !== t ? t : document),
      (this.movementSpeed = 1),
      (this.lookSpeed = 0.005),
      (this.lookVertical = !0),
      (this.autoForward = !1),
      (this.activeLook = !0),
      (this.heightSpeed = !1),
      (this.heightCoef = 1),
      (this.heightMin = 0),
      (this.heightMax = 1),
      (this.constrainVertical = !1),
      (this.verticalMin = 0),
      (this.verticalMax = Math.PI),
      (this.theta =
        this.phi =
        this.lon =
        this.lat =
        this.mouseY =
        this.mouseX =
        this.autoSpeedFactor =
          0),
      (this.mouseDragOn =
        this.freeze =
        this.moveRight =
        this.moveLeft =
        this.moveBackward =
        this.moveForward =
          !1),
      (this.viewHalfY = this.viewHalfX = 0),
      this.domElement !== document &&
        this.domElement.setAttribute("tabindex", -1),
      (this.handleResize = function () {
        this.domElement === document
          ? ((this.viewHalfX = window.innerWidth / 2),
            (this.viewHalfY = window.innerHeight / 2))
          : ((this.viewHalfX = this.domElement.offsetWidth / 2),
            (this.viewHalfY = this.domElement.offsetHeight / 2));
      }),
      (this.onMouseDown = function (e) {
        if (
          (this.domElement !== document && this.domElement.focus(),
          e.preventDefault(),
          e.stopPropagation(),
          this.activeLook)
        )
          switch (e.button) {
            case 0:
              this.moveForward = !0;
              break;
            case 2:
              this.moveBackward = !0;
          }
        this.mouseDragOn = !0;
      }),
      (this.onMouseUp = function (e) {
        if ((e.preventDefault(), e.stopPropagation(), this.activeLook))
          switch (e.button) {
            case 0:
              this.moveForward = !1;
              break;
            case 2:
              this.moveBackward = !1;
          }
        this.mouseDragOn = !1;
      }),
      (this.onMouseMove = function (e) {
        this.domElement === document
          ? ((this.mouseX = e.pageX - this.viewHalfX),
            (this.mouseY = e.pageY - this.viewHalfY))
          : ((this.mouseX =
              e.pageX - this.domElement.offsetLeft - this.viewHalfX),
            (this.mouseY =
              e.pageY - this.domElement.offsetTop - this.viewHalfY));
      }),
      (this.onKeyDown = function (e) {
        switch (e.keyCode) {
          case 38:
          case 87:
            this.moveForward = !0;
            break;
          case 37:
          case 65:
            this.moveLeft = !0;
            break;
          case 40:
          case 83:
            this.moveBackward = !0;
            break;
          case 39:
          case 68:
            this.moveRight = !0;
            break;
          case 82:
            this.moveUp = !0;
            break;
          case 70:
            this.moveDown = !0;
            break;
          case 81:
            this.freeze = !this.freeze;
        }
      }),
      (this.onKeyUp = function (e) {
        switch (e.keyCode) {
          case 38:
          case 87:
            this.moveForward = !1;
            break;
          case 37:
          case 65:
            this.moveLeft = !1;
            break;
          case 40:
          case 83:
            this.moveBackward = !1;
            break;
          case 39:
          case 68:
            this.moveRight = !1;
            break;
          case 82:
            this.moveUp = !1;
            break;
          case 70:
            this.moveDown = !1;
        }
      }),
      (this.update = function (e) {
        var t = 0;
        if (!this.freeze) {
          this.heightSpeed
            ? ((t =
                THREE.Math.clamp(
                  this.object.position.y,
                  this.heightMin,
                  this.heightMax
                ) - this.heightMin),
              (this.autoSpeedFactor = e * t * this.heightCoef))
            : (this.autoSpeedFactor = 0),
            (t = e * this.movementSpeed),
            (this.moveForward || (this.autoForward && !this.moveBackward)) &&
              this.object.translateZ(-(t + this.autoSpeedFactor)),
            this.moveBackward && this.object.translateZ(t),
            this.moveLeft && this.object.translateX(-t),
            this.moveRight && this.object.translateX(t),
            this.moveUp && this.object.translateY(t),
            this.moveDown && this.object.translateY(-t),
            (e *= this.lookSpeed),
            this.activeLook || (e = 0),
            (this.lon = this.lon + this.mouseX * e),
            this.lookVertical && (this.lat = this.lat - this.mouseY * e),
            (this.lat = Math.max(-85, Math.min(85, this.lat))),
            (this.phi = ((90 - this.lat) * Math.PI) / 180),
            (this.theta = (this.lon * Math.PI) / 180);
          var t = this.target,
            i = this.object.position;
          (t.x = i.x + 100 * Math.sin(this.phi) * Math.cos(this.theta)),
            (t.y = i.y + 100 * Math.cos(this.phi)),
            (t.z = i.z + 100 * Math.sin(this.phi) * Math.sin(this.theta)),
            (t = 1),
            this.constrainVertical &&
              (t = Math.PI / (this.verticalMax - this.verticalMin)),
            (this.lon = this.lon + this.mouseX * e),
            this.lookVertical && (this.lat = this.lat - this.mouseY * e * t),
            (this.lat = Math.max(-85, Math.min(85, this.lat))),
            (this.phi = ((90 - this.lat) * Math.PI) / 180),
            (this.theta = (this.lon * Math.PI) / 180),
            this.constrainVertical &&
              (this.phi = THREE.Math.mapLinear(
                this.phi,
                0,
                Math.PI,
                this.verticalMin,
                this.verticalMax
              )),
            (t = this.target),
            (i = this.object.position),
            (t.x = i.x + 100 * Math.sin(this.phi) * Math.cos(this.theta)),
            (t.y = i.y + 100 * Math.cos(this.phi)),
            (t.z = i.z + 100 * Math.sin(this.phi) * Math.sin(this.theta)),
            this.object.lookAt(t);
        }
      }),
      this.domElement.addEventListener(
        "contextmenu",
        function (e) {
          e.preventDefault();
        },
        !1
      ),
      this.domElement.addEventListener(
        "mousemove",
        i(this, this.onMouseMove),
        !1
      ),
      this.domElement.addEventListener(
        "mousedown",
        i(this, this.onMouseDown),
        !1
      ),
      this.domElement.addEventListener("mouseup", i(this, this.onMouseUp), !1),
      this.domElement.addEventListener("keydown", i(this, this.onKeyDown), !1),
      this.domElement.addEventListener("keyup", i(this, this.onKeyUp), !1),
      this.handleResize();
  }),
  (THREE.PathControls = function (e, t) {
    function i(e) {
      return (e *= 2) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1);
    }
    function r(e, t, i, r) {
      var o,
        n = { name: i, fps: 0.6, length: r, hierarchy: [] },
        a = t.getControlPointsArray(),
        s = t.getLength(),
        l = a.length,
        h = 0;
      for (
        o = l - 1,
          (t = { parent: -1, keys: [] }).keys[0] = {
            time: 0,
            pos: a[0],
            rot: [0, 0, 0, 1],
            scl: [1, 1, 1],
          },
          t.keys[o] = { time: r, pos: a[o], rot: [0, 0, 0, 1], scl: [1, 1, 1] },
          o = 1;
        o < l - 1;
        o++
      )
        (h = (r * s.chunks[o]) / s.total), (t.keys[o] = { time: h, pos: a[o] });
      return (
        (n.hierarchy[0] = t),
        THREE.AnimationHandler.add(n),
        new THREE.Animation(e, i, THREE.AnimationHandler.CATMULLROM_FORWARD, !1)
      );
    }
    function o(e, t) {
      var i,
        r,
        o = new THREE.Geometry();
      for (i = 0; i < e.points.length * t; i++)
        (r = i / (e.points.length * t)),
          (r = e.getPoint(r)),
          (o.vertices[i] = new THREE.Vector3(r.x, r.y, r.z));
      return o;
    }
    (this.object = e),
      (this.domElement = void 0 !== t ? t : document),
      (this.id = "PathControls" + THREE.PathControlsIdCounter++),
      (this.duration = 1e4),
      (this.waypoints = []),
      (this.useConstantSpeed = !0),
      (this.resamplingCoef = 50),
      (this.debugPath = new THREE.Object3D()),
      (this.debugDummy = new THREE.Object3D()),
      (this.animationParent = new THREE.Object3D()),
      (this.lookSpeed = 0.005),
      (this.lookHorizontal = this.lookVertical = !0),
      (this.verticalAngleMap = {
        srcRange: [0, 2 * Math.PI],
        dstRange: [0, 2 * Math.PI],
      }),
      (this.horizontalAngleMap = {
        srcRange: [0, 2 * Math.PI],
        dstRange: [0, 2 * Math.PI],
      }),
      (this.target = new THREE.Object3D()),
      (this.theta =
        this.phi =
        this.lon =
        this.lat =
        this.mouseY =
        this.mouseX =
          0);
    var n = 2 * Math.PI,
      a = Math.PI / 180;
    (this.viewHalfY = this.viewHalfX = 0),
      this.domElement !== document &&
        this.domElement.setAttribute("tabindex", -1),
      (this.handleResize = function () {
        this.domElement === document
          ? ((this.viewHalfX = window.innerWidth / 2),
            (this.viewHalfY = window.innerHeight / 2))
          : ((this.viewHalfX = this.domElement.offsetWidth / 2),
            (this.viewHalfY = this.domElement.offsetHeight / 2));
      }),
      (this.update = function (e) {
        this.lookHorizontal &&
          (this.lon = this.lon + this.mouseX * this.lookSpeed * e),
          this.lookVertical &&
            (this.lat = this.lat - this.mouseY * this.lookSpeed * e),
          (this.lon = Math.max(0, Math.min(360, this.lon))),
          (this.lat = Math.max(-85, Math.min(85, this.lat))),
          (this.phi = (90 - this.lat) * a),
          (this.theta = this.lon * a),
          (e = this.phi % n),
          (this.phi = e >= 0 ? e : e + n),
          (t = this.verticalAngleMap.srcRange),
          (e = this.verticalAngleMap.dstRange),
          (t = THREE.Math.mapLinear(this.phi, t[0], t[1], e[0], e[1]));
        var t,
          r = e[1] - e[0];
        (this.phi = i((t - e[0]) / r) * r + e[0]),
          (t = this.horizontalAngleMap.srcRange),
          (e = this.horizontalAngleMap.dstRange),
          (t = THREE.Math.mapLinear(this.theta, t[0], t[1], e[0], e[1])),
          (r = e[1] - e[0]),
          (this.theta = i((t - e[0]) / r) * r + e[0]),
          ((e = this.target.position).x =
            100 * Math.sin(this.phi) * Math.cos(this.theta)),
          (e.y = 100 * Math.cos(this.phi)),
          (e.z = 100 * Math.sin(this.phi) * Math.sin(this.theta)),
          this.object.lookAt(this.target.position);
      }),
      (this.onMouseMove = function (e) {
        this.domElement === document
          ? ((this.mouseX = e.pageX - this.viewHalfX),
            (this.mouseY = e.pageY - this.viewHalfY))
          : ((this.mouseX =
              e.pageX - this.domElement.offsetLeft - this.viewHalfX),
            (this.mouseY =
              e.pageY - this.domElement.offsetTop - this.viewHalfY));
      }),
      (this.init = function () {
        if (
          ((this.spline = new THREE.Spline()),
          this.spline.initFromArray(this.waypoints),
          this.useConstantSpeed &&
            this.spline.reparametrizeByArcLength(this.resamplingCoef),
          this.createDebugDummy)
        ) {
          var e,
            t,
            i = new THREE.MeshLambertMaterial({ color: 30719 }),
            n = new THREE.MeshLambertMaterial({ color: 65280 }),
            a = new THREE.CubeGeometry(10, 10, 20),
            s = new THREE.CubeGeometry(2, 2, 10);
          (this.animationParent = new THREE.Mesh(a, i)),
            (i = new THREE.Mesh(s, n)).position.set(0, 10, 0),
            (this.animation = r(
              this.animationParent,
              this.spline,
              this.id,
              this.duration
            )),
            this.animationParent.add(this.object),
            this.animationParent.add(this.target),
            this.animationParent.add(i);
        } else
          (this.animation = r(
            this.animationParent,
            this.spline,
            this.id,
            this.duration
          )),
            this.animationParent.add(this.target),
            this.animationParent.add(this.object);
        if (this.createDebugPath) {
          var i = this.debugPath,
            n = this.spline,
            s = o(n, 10),
            a = o(n, 10),
            l = new THREE.LineBasicMaterial({ color: 16711680, linewidth: 3 }),
            s = new THREE.Line(s, l),
            a = new THREE.ParticleSystem(
              a,
              new THREE.ParticleBasicMaterial({ color: 16755200, size: 3 })
            );
          s.scale.set(1, 1, 1), i.add(s), a.scale.set(1, 1, 1), i.add(a);
          for (
            var s = new THREE.SphereGeometry(1, 16, 8),
              l = new THREE.MeshBasicMaterial({ color: 65280 }),
              h = 0;
            h < n.points.length;
            h++
          )
            (a = new THREE.Mesh(s, l)).position.copy(n.points[h]), i.add(a);
        }
        this.domElement.addEventListener(
          "mousemove",
          ((e = this),
          (t = this.onMouseMove),
          function () {
            t.apply(e, arguments);
          }),
          !1
        );
      }),
      this.handleResize();
  }),
  (THREE.PathControlsIdCounter = 0),
  (THREE.FlyControls = function (e, t) {
    function i(e, t) {
      return function () {
        t.apply(e, arguments);
      };
    }
    (this.object = e),
      (this.domElement = void 0 !== t ? t : document),
      t && this.domElement.setAttribute("tabindex", -1),
      (this.movementSpeed = 1),
      (this.rollSpeed = 0.005),
      (this.autoForward = this.dragToLook = !1),
      (this.object.useQuaternion = !0),
      (this.tmpQuaternion = new THREE.Quaternion()),
      (this.mouseStatus = 0),
      (this.moveState = {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
        forward: 0,
        back: 0,
        pitchUp: 0,
        pitchDown: 0,
        yawLeft: 0,
        yawRight: 0,
        rollLeft: 0,
        rollRight: 0,
      }),
      (this.moveVector = new THREE.Vector3(0, 0, 0)),
      (this.rotationVector = new THREE.Vector3(0, 0, 0)),
      (this.handleEvent = function (e) {
        "function" == typeof this[e.type] && this[e.type](e);
      }),
      (this.keydown = function (e) {
        if (!e.altKey) {
          switch (e.keyCode) {
            case 16:
              this.movementSpeedMultiplier = 0.1;
              break;
            case 87:
              this.moveState.forward = 1;
              break;
            case 83:
              this.moveState.back = 1;
              break;
            case 65:
              this.moveState.left = 1;
              break;
            case 68:
              this.moveState.right = 1;
              break;
            case 82:
              this.moveState.up = 1;
              break;
            case 70:
              this.moveState.down = 1;
              break;
            case 38:
              this.moveState.pitchUp = 1;
              break;
            case 40:
              this.moveState.pitchDown = 1;
              break;
            case 37:
              this.moveState.yawLeft = 1;
              break;
            case 39:
              this.moveState.yawRight = 1;
              break;
            case 81:
              this.moveState.rollLeft = 1;
              break;
            case 69:
              this.moveState.rollRight = 1;
          }
          this.updateMovementVector(), this.updateRotationVector();
        }
      }),
      (this.keyup = function (e) {
        switch (e.keyCode) {
          case 16:
            this.movementSpeedMultiplier = 1;
            break;
          case 87:
            this.moveState.forward = 0;
            break;
          case 83:
            this.moveState.back = 0;
            break;
          case 65:
            this.moveState.left = 0;
            break;
          case 68:
            this.moveState.right = 0;
            break;
          case 82:
            this.moveState.up = 0;
            break;
          case 70:
            this.moveState.down = 0;
            break;
          case 38:
            this.moveState.pitchUp = 0;
            break;
          case 40:
            this.moveState.pitchDown = 0;
            break;
          case 37:
            this.moveState.yawLeft = 0;
            break;
          case 39:
            this.moveState.yawRight = 0;
            break;
          case 81:
            this.moveState.rollLeft = 0;
            break;
          case 69:
            this.moveState.rollRight = 0;
        }
        this.updateMovementVector(), this.updateRotationVector();
      }),
      (this.mousedown = function (e) {
        if (
          (this.domElement !== document && this.domElement.focus(),
          e.preventDefault(),
          e.stopPropagation(),
          this.dragToLook)
        )
          this.mouseStatus++;
        else
          switch (e.button) {
            case 0:
              this.object.moveForward = !0;
              break;
            case 2:
              this.object.moveBackward = !0;
          }
      }),
      (this.mousemove = function (e) {
        if (!this.dragToLook || this.mouseStatus > 0) {
          var t = this.getContainerDimensions(),
            i = t.size[0] / 2,
            r = t.size[1] / 2;
          (this.moveState.yawLeft = -(e.pageX - t.offset[0] - i) / i),
            (this.moveState.pitchDown = (e.pageY - t.offset[1] - r) / r),
            this.updateRotationVector();
        }
      }),
      (this.mouseup = function (e) {
        if ((e.preventDefault(), e.stopPropagation(), this.dragToLook))
          this.mouseStatus--,
            (this.moveState.yawLeft = this.moveState.pitchDown = 0);
        else
          switch (e.button) {
            case 0:
              this.moveForward = !1;
              break;
            case 2:
              this.moveBackward = !1;
          }
        this.updateRotationVector();
      }),
      (this.update = function (e) {
        var t = e * this.movementSpeed,
          e = e * this.rollSpeed;
        this.object.translateX(this.moveVector.x * t),
          this.object.translateY(this.moveVector.y * t),
          this.object.translateZ(this.moveVector.z * t),
          this.tmpQuaternion
            .set(
              this.rotationVector.x * e,
              this.rotationVector.y * e,
              this.rotationVector.z * e,
              1
            )
            .normalize(),
          this.object.quaternion.multiplySelf(this.tmpQuaternion),
          this.object.matrix.setPosition(this.object.position),
          this.object.matrix.setRotationFromQuaternion(this.object.quaternion),
          (this.object.matrixWorldNeedsUpdate = !0);
      }),
      (this.updateMovementVector = function () {
        var e =
          this.moveState.forward || (this.autoForward && !this.moveState.back)
            ? 1
            : 0;
        (this.moveVector.x = -this.moveState.left + this.moveState.right),
          (this.moveVector.y = -this.moveState.down + this.moveState.up),
          (this.moveVector.z = -e + this.moveState.back);
      }),
      (this.updateRotationVector = function () {
        (this.rotationVector.x =
          -this.moveState.pitchDown + this.moveState.pitchUp),
          (this.rotationVector.y =
            -this.moveState.yawRight + this.moveState.yawLeft),
          (this.rotationVector.z =
            -this.moveState.rollRight + this.moveState.rollLeft);
      }),
      (this.getContainerDimensions = function () {
        return this.domElement != document
          ? {
              size: [this.domElement.offsetWidth, this.domElement.offsetHeight],
              offset: [this.domElement.offsetLeft, this.domElement.offsetTop],
            }
          : { size: [window.innerWidth, window.innerHeight], offset: [0, 0] };
      }),
      this.domElement.addEventListener(
        "mousemove",
        i(this, this.mousemove),
        !1
      ),
      this.domElement.addEventListener(
        "mousedown",
        i(this, this.mousedown),
        !1
      ),
      this.domElement.addEventListener("mouseup", i(this, this.mouseup), !1),
      this.domElement.addEventListener("keydown", i(this, this.keydown), !1),
      this.domElement.addEventListener("keyup", i(this, this.keyup), !1),
      this.updateMovementVector(),
      this.updateRotationVector();
  }),
  (THREE.RollControls = function (e, t) {
    (this.object = e),
      (this.domElement = void 0 !== t ? t : document),
      (this.mouseLook = !0),
      (this.autoForward = !1),
      (this.rollSpeed = this.movementSpeed = this.lookSpeed = 1),
      (this.constrainVertical = [-0.9, 0.9]),
      (this.object.matrixAutoUpdate = !1),
      (this.forward = new THREE.Vector3(0, 0, 1)),
      (this.roll = 0);
    var i = new THREE.Vector3(),
      r = new THREE.Vector3(),
      o = new THREE.Vector3(),
      n = new THREE.Matrix4(),
      a = !1,
      s = 1,
      l = 0,
      h = 0,
      c = 0,
      f = 0,
      u = 0,
      p = 0,
      d = 0;
    (this.handleResize = function () {
      (p = window.innerWidth / 2), (d = window.innerHeight / 2);
    }),
      (this.update = function (e) {
        if (this.mouseLook) {
          var t = e * this.lookSpeed;
          this.rotateHorizontally(t * f), this.rotateVertically(t * u);
        }
        (t = e * this.movementSpeed),
          this.object.translateZ(
            -t * (l > 0 || (this.autoForward && !(l < 0)) ? 1 : l)
          ),
          this.object.translateX(t * h),
          this.object.translateY(t * c),
          a && (this.roll = this.roll + this.rollSpeed * e * s),
          this.forward.y > this.constrainVertical[1]
            ? ((this.forward.y = this.constrainVertical[1]),
              this.forward.normalize())
            : this.forward.y < this.constrainVertical[0] &&
              ((this.forward.y = this.constrainVertical[0]),
              this.forward.normalize()),
          o.copy(this.forward),
          r.set(0, 1, 0),
          i.cross(r, o).normalize(),
          r.cross(o, i).normalize(),
          (this.object.matrix.elements[0] = i.x),
          (this.object.matrix.elements[4] = r.x),
          (this.object.matrix.elements[8] = o.x),
          (this.object.matrix.elements[1] = i.y),
          (this.object.matrix.elements[5] = r.y),
          (this.object.matrix.elements[9] = o.y),
          (this.object.matrix.elements[2] = i.z),
          (this.object.matrix.elements[6] = r.z),
          (this.object.matrix.elements[10] = o.z),
          n.identity(),
          (n.elements[0] = Math.cos(this.roll)),
          (n.elements[4] = -Math.sin(this.roll)),
          (n.elements[1] = Math.sin(this.roll)),
          (n.elements[5] = Math.cos(this.roll)),
          this.object.matrix.multiplySelf(n),
          (this.object.matrixWorldNeedsUpdate = !0),
          (this.object.matrix.elements[12] = this.object.position.x),
          (this.object.matrix.elements[13] = this.object.position.y),
          (this.object.matrix.elements[14] = this.object.position.z);
      }),
      (this.translateX = function (e) {
        (this.object.position.x =
          this.object.position.x + this.object.matrix.elements[0] * e),
          (this.object.position.y =
            this.object.position.y + this.object.matrix.elements[1] * e),
          (this.object.position.z =
            this.object.position.z + this.object.matrix.elements[2] * e);
      }),
      (this.translateY = function (e) {
        (this.object.position.x =
          this.object.position.x + this.object.matrix.elements[4] * e),
          (this.object.position.y =
            this.object.position.y + this.object.matrix.elements[5] * e),
          (this.object.position.z =
            this.object.position.z + this.object.matrix.elements[6] * e);
      }),
      (this.translateZ = function (e) {
        (this.object.position.x =
          this.object.position.x - this.object.matrix.elements[8] * e),
          (this.object.position.y =
            this.object.position.y - this.object.matrix.elements[9] * e),
          (this.object.position.z =
            this.object.position.z - this.object.matrix.elements[10] * e);
      }),
      (this.rotateHorizontally = function (e) {
        i.set(
          this.object.matrix.elements[0],
          this.object.matrix.elements[1],
          this.object.matrix.elements[2]
        ),
          i.multiplyScalar(e),
          this.forward.subSelf(i),
          this.forward.normalize();
      }),
      (this.rotateVertically = function (e) {
        r.set(
          this.object.matrix.elements[4],
          this.object.matrix.elements[5],
          this.object.matrix.elements[6]
        ),
          r.multiplyScalar(e),
          this.forward.addSelf(r),
          this.forward.normalize();
      }),
      this.domElement.addEventListener(
        "contextmenu",
        function (e) {
          e.preventDefault();
        },
        !1
      ),
      this.domElement.addEventListener(
        "mousemove",
        function (e) {
          (f = (e.clientX - p) / window.innerWidth),
            (u = (e.clientY - d) / window.innerHeight);
        },
        !1
      ),
      this.domElement.addEventListener(
        "mousedown",
        function (e) {
          switch ((e.preventDefault(), e.stopPropagation(), e.button)) {
            case 0:
              l = 1;
              break;
            case 2:
              l = -1;
          }
        },
        !1
      ),
      this.domElement.addEventListener(
        "mouseup",
        function (e) {
          switch ((e.preventDefault(), e.stopPropagation(), e.button)) {
            case 0:
            case 2:
              l = 0;
          }
        },
        !1
      ),
      this.domElement.addEventListener(
        "keydown",
        function (e) {
          switch (e.keyCode) {
            case 38:
            case 87:
              l = 1;
              break;
            case 37:
            case 65:
              h = -1;
              break;
            case 40:
            case 83:
              l = -1;
              break;
            case 39:
            case 68:
              h = 1;
              break;
            case 81:
              (a = !0), (s = 1);
              break;
            case 69:
              (a = !0), (s = -1);
              break;
            case 82:
              c = 1;
              break;
            case 70:
              c = -1;
          }
        },
        !1
      ),
      this.domElement.addEventListener(
        "keyup",
        function (e) {
          switch (e.keyCode) {
            case 38:
            case 87:
            case 40:
            case 83:
              l = 0;
              break;
            case 37:
            case 65:
            case 39:
            case 68:
              h = 0;
              break;
            case 81:
            case 69:
              a = !1;
              break;
            case 82:
            case 70:
              c = 0;
          }
        },
        !1
      ),
      this.handleResize();
  }),
  (THREE.TrackballControls = function (e, t) {
    THREE.EventTarget.call(this);
    var i = this;
    (this.object = e),
      (this.domElement = void 0 !== t ? t : document),
      (this.enabled = !0),
      (this.screen = { width: 0, height: 0, offsetLeft: 0, offsetTop: 0 }),
      (this.radius = (this.screen.width + this.screen.height) / 4),
      (this.rotateSpeed = 1),
      (this.zoomSpeed = 1.2),
      (this.panSpeed = 0.3),
      (this.staticMoving = this.noPan = this.noZoom = this.noRotate = !1),
      (this.dynamicDampingFactor = 0.2),
      (this.minDistance = 0),
      (this.maxDistance = 1 / 0),
      (this.keys = [65, 83, 68]),
      (this.target = new THREE.Vector3());
    var r = new THREE.Vector3(),
      o = !1,
      n = -1,
      a = new THREE.Vector3(),
      s = new THREE.Vector3(),
      l = new THREE.Vector3(),
      h = new THREE.Vector2(),
      c = new THREE.Vector2(),
      f = new THREE.Vector2(),
      u = new THREE.Vector2(),
      p = { type: "change" };
    (this.handleResize = function () {
      (this.screen.width = window.innerWidth),
        (this.screen.height = window.innerHeight),
        (this.screen.offsetLeft = 0),
        (this.screen.offsetTop = 0),
        (this.radius = (this.screen.width + this.screen.height) / 4);
    }),
      (this.handleEvent = function (e) {
        "function" == typeof this[e.type] && this[e.type](e);
      }),
      (this.getMouseOnScreen = function (e, t) {
        return new THREE.Vector2(
          ((e - i.screen.offsetLeft) / i.radius) * 0.5,
          ((t - i.screen.offsetTop) / i.radius) * 0.5
        );
      }),
      (this.getMouseProjectionOnBall = function (e, t) {
        var r = new THREE.Vector3(
            (e - 0.5 * i.screen.width - i.screen.offsetLeft) / i.radius,
            (0.5 * i.screen.height + i.screen.offsetTop - t) / i.radius,
            0
          ),
          o = r.length();
        return (
          o > 1 ? r.normalize() : (r.z = Math.sqrt(1 - o * o)),
          a.copy(i.object.position).subSelf(i.target),
          (o = i.object.up.clone().setLength(r.y)).addSelf(
            i.object.up.clone().crossSelf(a).setLength(r.x)
          ),
          o.addSelf(a.setLength(r.z)),
          o
        );
      }),
      (this.rotateCamera = function () {
        var e = Math.acos(s.dot(l) / s.length() / l.length());
        if (e) {
          var t = new THREE.Vector3().cross(s, l).normalize(),
            r = new THREE.Quaternion(),
            e = e * i.rotateSpeed;
          r.setFromAxisAngle(t, -e),
            r.multiplyVector3(a),
            r.multiplyVector3(i.object.up),
            r.multiplyVector3(l),
            i.staticMoving
              ? (s = l)
              : (r.setFromAxisAngle(t, e * (i.dynamicDampingFactor - 1)),
                r.multiplyVector3(s));
        }
      }),
      (this.zoomCamera = function () {
        var e = 1 + (c.y - h.y) * i.zoomSpeed;
        1 !== e &&
          e > 0 &&
          (a.multiplyScalar(e),
          i.staticMoving
            ? (h = c)
            : (h.y = h.y + (c.y - h.y) * this.dynamicDampingFactor));
      }),
      (this.panCamera = function () {
        var e = u.clone().subSelf(f);
        if (e.lengthSq()) {
          e.multiplyScalar(a.length() * i.panSpeed);
          var t = a.clone().crossSelf(i.object.up).setLength(e.x);
          t.addSelf(i.object.up.clone().setLength(e.y)),
            i.object.position.addSelf(t),
            i.target.addSelf(t),
            i.staticMoving
              ? (f = u)
              : f.addSelf(e.sub(u, f).multiplyScalar(i.dynamicDampingFactor));
        }
      }),
      (this.checkDistances = function () {
        (i.noZoom && i.noPan) ||
          (i.object.position.lengthSq() > i.maxDistance * i.maxDistance &&
            i.object.position.setLength(i.maxDistance),
          a.lengthSq() < i.minDistance * i.minDistance &&
            i.object.position.add(i.target, a.setLength(i.minDistance)));
      }),
      (this.update = function () {
        a.copy(i.object.position).subSelf(i.target),
          i.noRotate || i.rotateCamera(),
          i.noZoom || i.zoomCamera(),
          i.noPan || i.panCamera(),
          i.object.position.add(i.target, a),
          i.checkDistances(),
          i.object.lookAt(i.target),
          r.distanceToSquared(i.object.position) > 0 &&
            (i.dispatchEvent(p), r.copy(i.object.position));
      }),
      this.domElement.addEventListener(
        "contextmenu",
        function (e) {
          e.preventDefault();
        },
        !1
      ),
      this.domElement.addEventListener(
        "mousemove",
        function (e) {
          i.enabled &&
            (o &&
              ((s = l = i.getMouseProjectionOnBall(e.clientX, e.clientY)),
              (h = c = i.getMouseOnScreen(e.clientX, e.clientY)),
              (f = u = i.getMouseOnScreen(e.clientX, e.clientY)),
              (o = !1)),
            -1 === n ||
              (0 !== n || i.noRotate
                ? 1 !== n || i.noZoom
                  ? 2 !== n ||
                    i.noPan ||
                    (u = i.getMouseOnScreen(e.clientX, e.clientY))
                  : (c = i.getMouseOnScreen(e.clientX, e.clientY))
                : (l = i.getMouseProjectionOnBall(e.clientX, e.clientY))));
        },
        !1
      ),
      this.domElement.addEventListener(
        "mousedown",
        function (e) {
          i.enabled &&
            (e.preventDefault(),
            e.stopPropagation(),
            -1 === n &&
              (0 !== (n = e.button) || i.noRotate
                ? 1 !== n || i.noZoom
                  ? this.noPan ||
                    (f = u = i.getMouseOnScreen(e.clientX, e.clientY))
                  : (h = c = i.getMouseOnScreen(e.clientX, e.clientY))
                : (s = l = i.getMouseProjectionOnBall(e.clientX, e.clientY))));
        },
        !1
      ),
      this.domElement.addEventListener(
        "mouseup",
        function (e) {
          i.enabled && (e.preventDefault(), e.stopPropagation(), (n = -1));
        },
        !1
      ),
      window.addEventListener(
        "keydown",
        function (e) {
          i.enabled &&
            -1 === n &&
            (e.keyCode !== i.keys[0] || i.noRotate
              ? e.keyCode !== i.keys[1] || i.noZoom
                ? e.keyCode !== i.keys[2] || i.noPan || (n = 2)
                : (n = 1)
              : (n = 0),
            -1 !== n && (o = !0));
        },
        !1
      ),
      window.addEventListener(
        "keyup",
        function () {
          i.enabled && -1 !== n && (n = -1);
        },
        !1
      ),
      this.handleResize();
  }),
  (THREE.OrbitControls = function (e, t) {
    function i() {
      return ((2 * Math.PI) / 60 / 60) * l.autoRotateSpeed;
    }
    function r(e) {
      e.preventDefault(),
        T === n
          ? (f.set(e.clientX, e.clientY),
            u.sub(f, c),
            l.rotateLeft(((2 * Math.PI * u.x) / h) * l.userRotateSpeed),
            l.rotateUp(((2 * Math.PI * u.y) / h) * l.userRotateSpeed),
            c.copy(f))
          : T === a &&
            (d.set(e.clientX, e.clientY),
            E.sub(d, p),
            E.y > 0 ? l.zoomIn() : l.zoomOut(),
            p.copy(d));
    }
    function o() {
      l.userRotate &&
        (document.removeEventListener("mousemove", r, !1),
        document.removeEventListener("mouseup", o, !1),
        (T = s));
    }
    THREE.EventTarget.call(this),
      (this.object = e),
      (this.domElement = void 0 !== t ? t : document),
      (this.center = new THREE.Vector3()),
      (this.userZoom = !0),
      (this.userZoomSpeed = 1),
      (this.userRotate = !0),
      (this.userRotateSpeed = 1),
      (this.autoRotate = !1),
      (this.autoRotateSpeed = 2);
    var n,
      a,
      s,
      l = this,
      h = 1800,
      c = new THREE.Vector2(),
      f = new THREE.Vector2(),
      u = new THREE.Vector2(),
      p = new THREE.Vector2(),
      d = new THREE.Vector2(),
      E = new THREE.Vector2(),
      m = 0,
      v = 0,
      g = 1,
      $ = new THREE.Vector3();
    (n = 0), (a = 1);
    var T = (s = -1),
      R = { type: "change" };
    (this.rotateLeft = function (e) {
      void 0 === e && (e = i()), (v -= e);
    }),
      (this.rotateRight = function (e) {
        void 0 === e && (e = i()), (v += e);
      }),
      (this.rotateUp = function (e) {
        void 0 === e && (e = i()), (m -= e);
      }),
      (this.rotateDown = function (e) {
        void 0 === e && (e = i()), (m += e);
      }),
      (this.zoomIn = function (e) {
        void 0 === e && (e = Math.pow(0.95, l.userZoomSpeed)), (g /= e);
      }),
      (this.zoomOut = function (e) {
        void 0 === e && (e = Math.pow(0.95, l.userZoomSpeed)), (g *= e);
      }),
      (this.update = function () {
        var e = this.object.position,
          t = e.clone().subSelf(this.center),
          r = Math.atan2(t.x, t.z),
          o = Math.atan2(Math.sqrt(t.x * t.x + t.z * t.z), t.y);
        this.autoRotate && this.rotateLeft(i());
        var r = r + v,
          o = o + m,
          o = Math.max(1e-6, Math.min(Math.PI - 1e-6, o)),
          n = t.length();
        (t.x = n * Math.sin(o) * Math.sin(r)),
          (t.y = n * Math.cos(o)),
          (t.z = n * Math.sin(o) * Math.cos(r)),
          t.multiplyScalar(g),
          e.copy(this.center).addSelf(t),
          this.object.lookAt(this.center),
          (m = v = 0),
          (g = 1),
          $.distanceTo(this.object.position) > 0 &&
            (this.dispatchEvent(R), $.copy(this.object.position));
      }),
      this.domElement.addEventListener(
        "contextmenu",
        function (e) {
          e.preventDefault();
        },
        !1
      ),
      this.domElement.addEventListener(
        "mousedown",
        function (e) {
          l.userRotate &&
            (e.preventDefault(),
            0 === e.button || 2 === e.button
              ? ((T = n), c.set(e.clientX, e.clientY))
              : 1 === e.button && ((T = a), p.set(e.clientX, e.clientY)),
            document.addEventListener("mousemove", r, !1),
            document.addEventListener("mouseup", o, !1));
        },
        !1
      ),
      this.domElement.addEventListener(
        "mousewheel",
        function (e) {
          l.userZoom && (e.wheelDelta > 0 ? l.zoomOut() : l.zoomIn());
        },
        !1
      );
  }),
  (THREE.CubeGeometry = function (e, t, i, r, o, n, a, s) {
    function l(e, t, i, a, s, l, h, c) {
      var f,
        u = r || 1,
        p = o || 1,
        d = s / 2,
        m = l / 2,
        v = E.vertices.length;
      ("x" === e && "y" === t) || ("y" === e && "x" === t)
        ? (f = "z")
        : ("x" === e && "z" === t) || ("z" === e && "x" === t)
        ? ((f = "y"), (p = n || 1))
        : (("z" === e && "y" === t) || ("y" === e && "z" === t)) &&
          ((f = "x"), (u = n || 1));
      var g = u + 1,
        $ = p + 1,
        T = s / u,
        R = l / p,
        y = new THREE.Vector3();
      for (s = 0, y[f] = h > 0 ? 1 : -1; s < $; s++)
        for (l = 0; l < g; l++) {
          var _ = new THREE.Vector3();
          (_[e] = (l * T - d) * i),
            (_[t] = (s * R - m) * a),
            (_[f] = h),
            E.vertices.push(_);
        }
      for (s = 0; s < p; s++)
        for (l = 0; l < u; l++)
          (e = new THREE.Face4(
            l + g * s + v,
            l + g * (s + 1) + v,
            l + 1 + g * (s + 1) + v,
            l + 1 + g * s + v
          )).normal.copy(y),
            e.vertexNormals.push(y.clone(), y.clone(), y.clone(), y.clone()),
            (e.materialIndex = c),
            E.faces.push(e),
            E.faceVertexUvs[0].push([
              new THREE.UV(l / u, 1 - s / p),
              new THREE.UV(l / u, 1 - (s + 1) / p),
              new THREE.UV((l + 1) / u, 1 - (s + 1) / p),
              new THREE.UV((l + 1) / u, 1 - s / p),
            ]);
    }
    THREE.Geometry.call(this);
    var h,
      c,
      f,
      u,
      p,
      d,
      E = this,
      m = e / 2,
      v = t / 2,
      g = i / 2;
    if (void 0 !== a) {
      if (a instanceof Array) this.materials = a;
      else for (h = 0, this.materials = []; h < 6; h++) this.materials.push(a);
      (h = 0), (u = 1), (c = 2), (p = 3), (f = 4), (d = 5);
    } else this.materials = [];
    if (
      ((this.sides = { px: !0, nx: !0, py: !0, ny: !0, pz: !0, nz: !0 }),
      void 0 != s)
    )
      for (var $ in s) void 0 !== this.sides[$] && (this.sides[$] = s[$]);
    this.sides.px && l("z", "y", -1, -1, i, t, m, h),
      this.sides.nx && l("z", "y", 1, -1, i, t, -m, u),
      this.sides.py && l("x", "z", 1, 1, e, i, v, c),
      this.sides.ny && l("x", "z", 1, -1, e, i, -v, p),
      this.sides.pz && l("x", "y", 1, -1, e, t, g, f),
      this.sides.nz && l("x", "y", -1, -1, e, t, -g, d),
      this.computeCentroids(),
      this.mergeVertices();
  }),
  (THREE.CubeGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.CylinderGeometry = function (e, t, i, r, o, n) {
    THREE.Geometry.call(this);
    var a,
      s,
      e = void 0 !== e ? e : 20,
      t = void 0 !== t ? t : 20,
      i = void 0 !== i ? i : 100,
      l = i / 2,
      r = r || 8,
      o = o || 1,
      h = [],
      c = [];
    for (s = 0; s <= o; s++) {
      var f = [],
        u = [],
        p = s / o,
        d = p * (t - e) + e;
      for (a = 0; a <= r; a++) {
        var E = a / r,
          m = new THREE.Vector3();
        (m.x = d * Math.sin(E * Math.PI * 2)),
          (m.y = -p * i + l),
          (m.z = d * Math.cos(E * Math.PI * 2)),
          this.vertices.push(m),
          f.push(this.vertices.length - 1),
          u.push(new THREE.UV(E, p));
      }
      h.push(f), c.push(u);
    }
    for (a = 0, i = (t - e) / i; a < r; a++)
      for (
        0 !== e
          ? ((f = this.vertices[h[0][a]].clone()),
            (u = this.vertices[h[0][a + 1]].clone()))
          : ((f = this.vertices[h[1][a]].clone()),
            (u = this.vertices[h[1][a + 1]].clone())),
          f.setY(Math.sqrt(f.x * f.x + f.z * f.z) * i).normalize(),
          u.setY(Math.sqrt(u.x * u.x + u.z * u.z) * i).normalize(),
          s = 0;
        s < o;
        s++
      ) {
        var p = h[s][a],
          d = h[s + 1][a],
          E = h[s + 1][a + 1],
          m = h[s][a + 1],
          v = f.clone(),
          g = f.clone(),
          $ = u.clone(),
          T = u.clone(),
          R = c[s][a].clone(),
          y = c[s + 1][a].clone(),
          _ = c[s + 1][a + 1].clone(),
          x = c[s][a + 1].clone();
        this.faces.push(new THREE.Face4(p, d, E, m, [v, g, $, T])),
          this.faceVertexUvs[0].push([R, y, _, x]);
      }
    if (!n && e > 0)
      for (this.vertices.push(new THREE.Vector3(0, l, 0)), a = 0; a < r; a++)
        (p = h[0][a]),
          (d = h[0][a + 1]),
          (E = this.vertices.length - 1),
          (v = new THREE.Vector3(0, 1, 0)),
          (g = new THREE.Vector3(0, 1, 0)),
          ($ = new THREE.Vector3(0, 1, 0)),
          (R = c[0][a].clone()),
          (y = c[0][a + 1].clone()),
          (_ = new THREE.UV(y.u, 0)),
          this.faces.push(new THREE.Face3(p, d, E, [v, g, $])),
          this.faceVertexUvs[0].push([R, y, _]);
    if (!n && t > 0)
      for (this.vertices.push(new THREE.Vector3(0, -l, 0)), a = 0; a < r; a++)
        (p = h[s][a + 1]),
          (d = h[s][a]),
          (E = this.vertices.length - 1),
          (v = new THREE.Vector3(0, -1, 0)),
          (g = new THREE.Vector3(0, -1, 0)),
          ($ = new THREE.Vector3(0, -1, 0)),
          (R = c[s][a + 1].clone()),
          (y = c[s][a].clone()),
          (_ = new THREE.UV(y.u, 1)),
          this.faces.push(new THREE.Face3(p, d, E, [v, g, $])),
          this.faceVertexUvs[0].push([R, y, _]);
    this.computeCentroids(), this.computeFaceNormals();
  }),
  (THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.ExtrudeGeometry = function (e, t) {
    void 0 !== e &&
      (THREE.Geometry.call(this),
      (e = e instanceof Array ? e : [e]),
      (this.shapebb = e[e.length - 1].getBoundingBox()),
      this.addShapeList(e, t),
      this.computeCentroids(),
      this.computeFaceNormals());
  }),
  (THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.ExtrudeGeometry.prototype.addShapeList = function (e, t) {
    for (var i = e.length, r = 0; r < i; r++) this.addShape(e[r], t);
  }),
  (THREE.ExtrudeGeometry.prototype.addShape = function (e, t) {
    function i(e, t, i) {
      return t || console.log("die"), t.clone().multiplyScalar(i).addSelf(e);
    }
    function r(e, t, i) {
      var r = THREE.ExtrudeGeometry.__v1,
        o = THREE.ExtrudeGeometry.__v2,
        n = THREE.ExtrudeGeometry.__v3,
        a = THREE.ExtrudeGeometry.__v4,
        s = THREE.ExtrudeGeometry.__v5,
        l = THREE.ExtrudeGeometry.__v6;
      return (r.set(e.x - t.x, e.y - t.y),
      o.set(e.x - i.x, e.y - i.y),
      (r = r.normalize()),
      (o = o.normalize()),
      n.set(-r.y, r.x),
      a.set(o.y, -o.x),
      s.copy(e).addSelf(n),
      l.copy(e).addSelf(a),
      s.equals(l))
        ? a.clone()
        : (s.copy(t).addSelf(n),
          l.copy(i).addSelf(a),
          (n = r.dot(a)),
          (a = l.subSelf(s).dot(a)),
          0 === n &&
            (console.log("Either infinite or no solutions!"),
            0 === a
              ? console.log("Its finite solutions.")
              : console.log("Too bad, no solutions.")),
          (a /= n) < 0)
        ? ((t = Math.atan2(t.y - e.y, t.x - e.x)) >
            (e = Math.atan2(i.y - e.y, i.x - e.x)) && (e += 2 * Math.PI),
          (e = -Math.cos((i = (t + e) / 2))),
          (i = -Math.sin(i)),
          new THREE.Vector2(e, i))
        : r.multiplyScalar(a).addSelf(s).subSelf(e).clone();
    }
    function o(i, r) {
      var o, n;
      for (N = i.length; --N >= 0; ) {
        (o = N), (n = N - 1) < 0 && (n = i.length - 1);
        for (var a = 0, s = v + 2 * E, a = 0; a < s; a++) {
          var l = z * a,
            h = z * (a + 1),
            c = r + o + l,
            l = r + n + l,
            f = r + n + h,
            h = r + o + h,
            u = i,
            p = a,
            d = s,
            m = o,
            g = n,
            c = c + S,
            l = l + S,
            f = f + S,
            h = h + S;
          w.faces.push(new THREE.Face4(c, l, f, h, null, null, y)),
            (c = _.generateSideWallUV(w, e, u, t, c, l, f, h, p, d, m, g)),
            w.faceVertexUvs[0].push(c);
        }
      }
    }
    function n(e, t, i) {
      w.vertices.push(new THREE.Vector3(e, t, i));
    }
    function a(i, r, o, n) {
      (i += S),
        (r += S),
        (o += S),
        w.faces.push(new THREE.Face3(i, r, o, null, null, R)),
        (i = n
          ? _.generateBottomUV(w, e, t, i, r, o)
          : _.generateTopUV(w, e, t, i, r, o)),
        w.faceVertexUvs[0].push(i);
    }
    var s,
      l,
      h,
      c,
      f,
      u = void 0 !== t.amount ? t.amount : 100,
      p = void 0 !== t.bevelThickness ? t.bevelThickness : 6,
      d = void 0 !== t.bevelSize ? t.bevelSize : p - 2,
      E = void 0 !== t.bevelSegments ? t.bevelSegments : 3,
      m = void 0 === t.bevelEnabled || t.bevelEnabled,
      v = void 0 !== t.steps ? t.steps : 1,
      g = t.bendPath,
      $ = t.extrudePath,
      T = !1,
      R = t.material,
      y = t.extrudeMaterial,
      _ =
        void 0 !== t.UVGenerator
          ? t.UVGenerator
          : THREE.ExtrudeGeometry.WorldUVGenerator;
    $ &&
      ((s = $.getSpacedPoints(v)),
      (T = !0),
      (m = !1),
      (l =
        void 0 !== t.frames
          ? t.frames
          : new THREE.TubeGeometry.FrenetFrames($, v, !1)),
      (h = new THREE.Vector3()),
      (c = new THREE.Vector3()),
      (f = new THREE.Vector3())),
      m || (d = p = E = 0);
    var x,
      H,
      b,
      w = this,
      S = this.vertices.length;
    g && e.addWrapPath(g);
    var $ = e.extractPoints(),
      g = $.shape,
      C = $.holes;
    if (($ = !THREE.Shape.Utils.isClockWise(g))) {
      for (g = g.reverse(), H = 0, b = C.length; H < b; H++)
        (x = C[H]), THREE.Shape.Utils.isClockWise(x) && (C[H] = x.reverse());
      $ = !1;
    }
    var M = THREE.Shape.Utils.triangulateShape(g, C),
      A = g;
    for (H = 0, b = C.length; H < b; H++) (x = C[H]), (g = g.concat(x));
    var L,
      P,
      U,
      F,
      D,
      V,
      z = g.length,
      B = M.length,
      $ = [],
      N = 0;
    for (L = (U = A.length) - 1, P = N + 1; N < U; N++, L++, P++)
      L === U && (L = 0), P === U && (P = 0), ($[N] = r(A[N], A[L], A[P]));
    var O,
      I = [],
      k = $.concat();
    for (H = 0, b = C.length; H < b; H++) {
      for (
        x = C[H], O = [], N = 0, L = (U = x.length) - 1, P = N + 1;
        N < U;
        N++, L++, P++
      )
        L === U && (L = 0), P === U && (P = 0), (O[N] = r(x[N], x[L], x[P]));
      I.push(O), (k = k.concat(O));
    }
    for (L = 0; L < E; L++) {
      for (
        F = p * (1 - (U = L / E)),
          P = d * Math.sin((U * Math.PI) / 2),
          N = 0,
          U = A.length;
        N < U;
        N++
      )
        n((D = i(A[N], $[N], P)).x, D.y, -F);
      for (H = 0, b = C.length; H < b; H++)
        for (x = C[H], O = I[H], N = 0, U = x.length; N < U; N++)
          n((D = i(x[N], O[N], P)).x, D.y, -F);
    }
    for (N = 0, P = d; N < z; N++)
      (D = m ? i(g[N], k[N], P) : g[N]),
        T
          ? (c.copy(l.normals[0]).multiplyScalar(D.x),
            h.copy(l.binormals[0]).multiplyScalar(D.y),
            f.copy(s[0]).addSelf(c).addSelf(h),
            n(f.x, f.y, f.z))
          : n(D.x, D.y, 0);
    for (U = 1; U <= v; U++)
      for (N = 0; N < z; N++)
        (D = m ? i(g[N], k[N], P) : g[N]),
          T
            ? (c.copy(l.normals[U]).multiplyScalar(D.x),
              h.copy(l.binormals[U]).multiplyScalar(D.y),
              f.copy(s[U]).addSelf(c).addSelf(h),
              n(f.x, f.y, f.z))
            : n(D.x, D.y, (u / v) * U);
    for (L = E - 1; L >= 0; L--) {
      for (
        F = p * (1 - (U = L / E)),
          P = d * Math.sin((U * Math.PI) / 2),
          N = 0,
          U = A.length;
        N < U;
        N++
      )
        n((D = i(A[N], $[N], P)).x, D.y, u + F);
      for (H = 0, b = C.length; H < b; H++)
        for (x = C[H], O = I[H], N = 0, U = x.length; N < U; N++)
          (D = i(x[N], O[N], P)),
            T ? n(D.x, D.y + s[v - 1].y, s[v - 1].x + F) : n(D.x, D.y, u + F);
    }
    (function () {
      if (m) {
        var e;
        for (N = 0, e = 0 * z; N < B; N++)
          a((V = M[N])[2] + e, V[1] + e, V[0] + e, !0);
        for (e = v + 2 * E, e *= z, N = 0; N < B; N++)
          a((V = M[N])[0] + e, V[1] + e, V[2] + e, !1);
      } else {
        for (N = 0; N < B; N++) a((V = M[N])[2], V[1], V[0], !0);
        for (N = 0; N < B; N++)
          a((V = M[N])[0] + z * v, V[1] + z * v, V[2] + z * v, !1);
      }
    })(),
      (function () {
        var e = 0;
        for (o(A, e), e += A.length, H = 0, b = C.length; H < b; H++)
          o((x = C[H]), e), (e += x.length);
      })();
  }),
  (THREE.ExtrudeGeometry.WorldUVGenerator = {
    generateTopUV: function (e, t, i, r, o, n) {
      return (
        (t = e.vertices[o].x),
        (o = e.vertices[o].y),
        (i = e.vertices[n].x),
        (n = e.vertices[n].y),
        [
          new THREE.UV(e.vertices[r].x, 1 - e.vertices[r].y),
          new THREE.UV(t, 1 - o),
          new THREE.UV(i, 1 - n),
        ]
      );
    },
    generateBottomUV: function (e, t, i, r, o, n) {
      return this.generateTopUV(e, t, i, r, o, n);
    },
    generateSideWallUV: function (e, t, i, r, o, n, a, s) {
      var t = e.vertices[o].x,
        i = e.vertices[o].y,
        o = e.vertices[o].z,
        r = e.vertices[n].x,
        l = e.vertices[n].y,
        n = e.vertices[n].z,
        h = e.vertices[a].x,
        c = e.vertices[a].y,
        a = e.vertices[a].z,
        f = e.vertices[s].x,
        u = e.vertices[s].y,
        e = e.vertices[s].z;
      return 0.01 > Math.abs(i - l)
        ? [
            new THREE.UV(t, o),
            new THREE.UV(r, n),
            new THREE.UV(h, a),
            new THREE.UV(f, e),
          ]
        : [
            new THREE.UV(i, o),
            new THREE.UV(l, n),
            new THREE.UV(c, a),
            new THREE.UV(u, e),
          ];
    },
  }),
  (THREE.ExtrudeGeometry.__v1 = new THREE.Vector2()),
  (THREE.ExtrudeGeometry.__v2 = new THREE.Vector2()),
  (THREE.ExtrudeGeometry.__v3 = new THREE.Vector2()),
  (THREE.ExtrudeGeometry.__v4 = new THREE.Vector2()),
  (THREE.ExtrudeGeometry.__v5 = new THREE.Vector2()),
  (THREE.ExtrudeGeometry.__v6 = new THREE.Vector2()),
  (THREE.LatheGeometry = function (e, t, i) {
    THREE.Geometry.call(this);
    for (
      var t = t || 12,
        i = i || 2 * Math.PI,
        r = [],
        o = new THREE.Matrix4().makeRotationZ(i / t),
        n = 0;
      n < e.length;
      n++
    )
      (r[n] = e[n].clone()), this.vertices.push(r[n]);
    for (var a = t + 1, i = 0; i < a; i++)
      for (n = 0; n < r.length; n++)
        (r[n] = o.multiplyVector3(r[n].clone())), this.vertices.push(r[n]);
    for (i = 0; i < t; i++)
      for (r = 0, o = e.length; r < o - 1; r++)
        this.faces.push(
          new THREE.Face4(
            i * o + r,
            ((i + 1) % a) * o + r,
            ((i + 1) % a) * o + ((r + 1) % o),
            i * o + ((r + 1) % o)
          )
        ),
          this.faceVertexUvs[0].push([
            new THREE.UV(1 - i / t, r / o),
            new THREE.UV(1 - (i + 1) / t, r / o),
            new THREE.UV(1 - (i + 1) / t, (r + 1) / o),
            new THREE.UV(1 - i / t, (r + 1) / o),
          ]);
    this.computeCentroids(),
      this.computeFaceNormals(),
      this.computeVertexNormals();
  }),
  (THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.PlaneGeometry = function (e, t, i, r) {
    THREE.Geometry.call(this);
    for (
      var o = e / 2,
        n = t / 2,
        i = i || 1,
        r = r || 1,
        a = i + 1,
        s = r + 1,
        l = e / i,
        h = t / r,
        c = new THREE.Vector3(0, 1, 0),
        e = 0;
      e < s;
      e++
    )
      for (t = 0; t < a; t++)
        this.vertices.push(new THREE.Vector3(t * l - o, 0, e * h - n));
    for (e = 0; e < r; e++)
      for (t = 0; t < i; t++)
        (o = new THREE.Face4(
          t + a * e,
          t + a * (e + 1),
          t + 1 + a * (e + 1),
          t + 1 + a * e
        )).normal.copy(c),
          o.vertexNormals.push(c.clone(), c.clone(), c.clone(), c.clone()),
          this.faces.push(o),
          this.faceVertexUvs[0].push([
            new THREE.UV(t / i, 1 - e / r),
            new THREE.UV(t / i, 1 - (e + 1) / r),
            new THREE.UV((t + 1) / i, 1 - (e + 1) / r),
            new THREE.UV((t + 1) / i, 1 - e / r),
          ]);
    this.computeCentroids();
  }),
  (THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.SphereGeometry = function (e, t, i, r, o, n, a) {
    THREE.Geometry.call(this);
    var s,
      l,
      e = e || 50,
      r = void 0 !== r ? r : 0,
      o = void 0 !== o ? o : 2 * Math.PI,
      n = void 0 !== n ? n : 0,
      a = void 0 !== a ? a : Math.PI,
      t = Math.max(3, Math.floor(t) || 8),
      i = Math.max(2, Math.floor(i) || 6),
      h = [],
      c = [];
    for (l = 0; l <= i; l++) {
      var f = [],
        u = [];
      for (s = 0; s <= t; s++) {
        var p = s / t,
          d = l / i,
          E = new THREE.Vector3();
        (E.x = -e * Math.cos(r + p * o) * Math.sin(n + d * a)),
          (E.y = e * Math.cos(n + d * a)),
          (E.z = e * Math.sin(r + p * o) * Math.sin(n + d * a)),
          this.vertices.push(E),
          f.push(this.vertices.length - 1),
          u.push(new THREE.UV(p, 1 - d));
      }
      h.push(f), c.push(u);
    }
    for (l = 0; l < i; l++)
      for (s = 0; s < t; s++) {
        var r = h[l][s + 1],
          o = h[l][s],
          n = h[l + 1][s],
          a = h[l + 1][s + 1],
          f = this.vertices[r].clone().normalize(),
          u = this.vertices[o].clone().normalize(),
          p = this.vertices[n].clone().normalize(),
          d = this.vertices[a].clone().normalize(),
          E = c[l][s + 1].clone(),
          m = c[l][s].clone(),
          v = c[l + 1][s].clone(),
          g = c[l + 1][s + 1].clone();
        Math.abs(this.vertices[r].y) == e
          ? (this.faces.push(new THREE.Face3(r, n, a, [f, p, d])),
            this.faceVertexUvs[0].push([E, v, g]))
          : Math.abs(this.vertices[n].y) == e
          ? (this.faces.push(new THREE.Face3(r, o, n, [f, u, p])),
            this.faceVertexUvs[0].push([E, m, v]))
          : (this.faces.push(new THREE.Face4(r, o, n, a, [f, u, p, d])),
            this.faceVertexUvs[0].push([E, m, v, g]));
      }
    this.computeCentroids(),
      this.computeFaceNormals(),
      (this.boundingSphere = { radius: e });
  }),
  (THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.TextGeometry = function (e, t) {
    var i = THREE.FontUtils.generateShapes(e, t);
    if (
      ((t.amount = void 0 !== t.height ? t.height : 50),
      void 0 === t.bevelThickness && (t.bevelThickness = 10),
      void 0 === t.bevelSize && (t.bevelSize = 8),
      void 0 === t.bevelEnabled && (t.bevelEnabled = !1),
      t.bend)
    ) {
      var r = i[i.length - 1].getBoundingBox().maxX;
      t.bendPath = new THREE.QuadraticBezierCurve(
        new THREE.Vector2(0, 0),
        new THREE.Vector2(r / 2, 120),
        new THREE.Vector2(r, 0)
      );
    }
    THREE.ExtrudeGeometry.call(this, i, t);
  }),
  (THREE.TextGeometry.prototype = Object.create(
    THREE.ExtrudeGeometry.prototype
  )),
  (THREE.TorusGeometry = function (e, t, i, r, o) {
    for (
      THREE.Geometry.call(this),
        this.radius = e || 100,
        this.tube = t || 40,
        this.segmentsR = i || 8,
        this.segmentsT = r || 6,
        this.arc = o || 2 * Math.PI,
        o = new THREE.Vector3(),
        e = [],
        t = [],
        i = 0;
      i <= this.segmentsR;
      i++
    )
      for (r = 0; r <= this.segmentsT; r++) {
        var n = (r / this.segmentsT) * this.arc,
          a = (i / this.segmentsR) * Math.PI * 2;
        (o.x = this.radius * Math.cos(n)), (o.y = this.radius * Math.sin(n));
        var s = new THREE.Vector3();
        (s.x = (this.radius + this.tube * Math.cos(a)) * Math.cos(n)),
          (s.y = (this.radius + this.tube * Math.cos(a)) * Math.sin(n)),
          (s.z = this.tube * Math.sin(a)),
          this.vertices.push(s),
          e.push(new THREE.UV(r / this.segmentsT, 1 - i / this.segmentsR)),
          t.push(s.clone().subSelf(o).normalize());
      }
    for (i = 1; i <= this.segmentsR; i++)
      for (r = 1; r <= this.segmentsT; r++) {
        var o = (this.segmentsT + 1) * i + r - 1,
          n = (this.segmentsT + 1) * (i - 1) + r - 1,
          a = (this.segmentsT + 1) * (i - 1) + r,
          s = (this.segmentsT + 1) * i + r,
          l = new THREE.Face4(o, n, a, s, [t[o], t[n], t[a], t[s]]);
        l.normal.addSelf(t[o]),
          l.normal.addSelf(t[n]),
          l.normal.addSelf(t[a]),
          l.normal.addSelf(t[s]),
          l.normal.normalize(),
          this.faces.push(l),
          this.faceVertexUvs[0].push([
            e[o].clone(),
            e[n].clone(),
            e[a].clone(),
            e[s].clone(),
          ]);
      }
    this.computeCentroids();
  }),
  (THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.TorusKnotGeometry = function (e, t, i, r, o, n, a) {
    function s(e, t, i, r, o, n) {
      var a = Math.cos(e);
      return (
        (t = Math.sin(e)),
        (a = o * (2 + (i = Math.cos((e = (i / r) * e)))) * 0.5 * a),
        (t = o * (2 + i) * t * 0.5),
        (o = n * o * Math.sin(e) * 0.5),
        new THREE.Vector3(a, t, o)
      );
    }
    for (
      THREE.Geometry.call(this),
        this.radius = e || 200,
        this.tube = t || 40,
        this.segmentsR = i || 64,
        this.segmentsT = r || 8,
        this.p = o || 2,
        this.q = n || 3,
        this.heightScale = a || 1,
        this.grid = Array(this.segmentsR),
        i = new THREE.Vector3(),
        r = new THREE.Vector3(),
        o = new THREE.Vector3(),
        e = 0;
      e < this.segmentsR;
      ++e
    )
      for (
        t = 0, this.grid[e] = Array(this.segmentsT);
        t < this.segmentsT;
        ++t
      ) {
        var l = (e / this.segmentsR) * 2 * this.p * Math.PI,
          a = (t / this.segmentsT) * 2 * Math.PI,
          n = s(l, a, this.q, this.p, this.radius, this.heightScale),
          l = s(l + 0.01, a, this.q, this.p, this.radius, this.heightScale);
        i.sub(l, n),
          r.add(l, n),
          o.cross(i, r),
          r.cross(o, i),
          o.normalize(),
          r.normalize(),
          (l = -this.tube * Math.cos(a)),
          (a = this.tube * Math.sin(a)),
          (n.x = n.x + (l * r.x + a * o.x)),
          (n.y = n.y + (l * r.y + a * o.y)),
          (n.z = n.z + (l * r.z + a * o.z)),
          (this.grid[e][t] =
            this.vertices.push(new THREE.Vector3(n.x, n.y, n.z)) - 1);
      }
    for (e = 0; e < this.segmentsR; ++e)
      for (t = 0; t < this.segmentsT; ++t) {
        var o = (e + 1) % this.segmentsR,
          n = (t + 1) % this.segmentsT,
          i = this.grid[e][t],
          r = this.grid[o][t],
          o = this.grid[o][n],
          n = this.grid[e][n],
          a = new THREE.UV(e / this.segmentsR, t / this.segmentsT),
          l = new THREE.UV((e + 1) / this.segmentsR, t / this.segmentsT),
          h = new THREE.UV((e + 1) / this.segmentsR, (t + 1) / this.segmentsT),
          c = new THREE.UV(e / this.segmentsR, (t + 1) / this.segmentsT);
        this.faces.push(new THREE.Face4(i, r, o, n)),
          this.faceVertexUvs[0].push([a, l, h, c]);
      }
    this.computeCentroids(),
      this.computeFaceNormals(),
      this.computeVertexNormals();
  }),
  (THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.TubeGeometry = function (e, t, i, r, o, n) {
    THREE.Geometry.call(this),
      (this.path = e),
      (this.segments = t || 64),
      (this.radius = i || 1),
      (this.segmentsRadius = r || 8),
      (this.closed = o || !1),
      n && (this.debug = new THREE.Object3D()),
      (this.grid = []);
    var a,
      s,
      l,
      h,
      c,
      f,
      u,
      p,
      n = this.segments + 1,
      d = new THREE.Vector3(),
      t = new THREE.TubeGeometry.FrenetFrames(e, t, o);
    for (
      f = t.tangents,
        u = t.normals,
        p = t.binormals,
        this.tangents = f,
        this.normals = u,
        this.binormals = p,
        t = 0;
      t < n;
      t++
    )
      for (
        this.grid[t] = [],
          r = t / (n - 1),
          c = e.getPointAt(r),
          r = f[t],
          a = u[t],
          s = p[t],
          this.debug &&
            (this.debug.add(new THREE.ArrowHelper(r, c, i, 255)),
            this.debug.add(new THREE.ArrowHelper(a, c, i, 16711680)),
            this.debug.add(new THREE.ArrowHelper(s, c, i, 65280))),
          r = 0;
        r < this.segmentsRadius;
        r++
      )
        (l = (r / this.segmentsRadius) * 2 * Math.PI),
          (h = -this.radius * Math.cos(l)),
          (l = this.radius * Math.sin(l)),
          d.copy(c),
          (d.x = d.x + (h * a.x + l * s.x)),
          (d.y = d.y + (h * a.y + l * s.y)),
          (d.z = d.z + (h * a.z + l * s.z)),
          (this.grid[t][r] =
            this.vertices.push(new THREE.Vector3(d.x, d.y, d.z)) - 1);
    for (t = 0; t < this.segments; t++)
      for (r = 0; r < this.segmentsRadius; r++)
        (n = o ? (t + 1) % this.segments : t + 1),
          (d = (r + 1) % this.segmentsRadius),
          (e = this.grid[t][r]),
          (i = this.grid[n][r]),
          (n = this.grid[n][d]),
          (d = this.grid[t][d]),
          (f = new THREE.UV(t / this.segments, r / this.segmentsRadius)),
          (u = new THREE.UV((t + 1) / this.segments, r / this.segmentsRadius)),
          (p = new THREE.UV(
            (t + 1) / this.segments,
            (r + 1) / this.segmentsRadius
          )),
          (a = new THREE.UV(t / this.segments, (r + 1) / this.segmentsRadius)),
          this.faces.push(new THREE.Face4(e, i, n, d)),
          this.faceVertexUvs[0].push([f, u, p, a]);
    this.computeCentroids(),
      this.computeFaceNormals(),
      this.computeVertexNormals();
  }),
  (THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.TubeGeometry.FrenetFrames = function (e, t, i) {
    new THREE.Vector3();
    var r = new THREE.Vector3();
    new THREE.Vector3();
    var o,
      n,
      a,
      s = [],
      l = [],
      h = [],
      c = new THREE.Vector3(),
      f = new THREE.Matrix4(),
      t = t + 1;
    for (
      o = 0, this.tangents = s, this.normals = l, this.binormals = h;
      o < t;
      o++
    )
      (n = o / (t - 1)), (s[o] = e.getTangentAt(n)), s[o].normalize();
    for (
      l[0] = new THREE.Vector3(),
        h[0] = new THREE.Vector3(),
        e = Number.MAX_VALUE,
        o = Math.abs(s[0].x),
        n = Math.abs(s[0].y),
        a = Math.abs(s[0].z),
        o <= e && ((e = o), r.set(1, 0, 0)),
        n <= e && ((e = n), r.set(0, 1, 0)),
        a <= e && r.set(0, 0, 1),
        c.cross(s[0], r).normalize(),
        l[0].cross(s[0], c),
        h[0].cross(s[0], l[0]),
        o = 1;
      o < t;
      o++
    )
      (l[o] = l[o - 1].clone()),
        (h[o] = h[o - 1].clone()),
        c.cross(s[o - 1], s[o]),
        c.length() > 1e-4 &&
          (c.normalize(),
          (r = Math.acos(s[o - 1].dot(s[o]))),
          f.makeRotationAxis(c, r).multiplyVector3(l[o])),
        h[o].cross(s[o], l[o]);
    if (i)
      for (
        r = Math.acos(l[0].dot(l[t - 1])),
          r /= t - 1,
          s[0].dot(c.cross(l[0], l[t - 1])) > 0 && (r = -r),
          o = 1;
        o < t;
        o++
      )
        f.makeRotationAxis(s[o], r * o).multiplyVector3(l[o]),
          h[o].cross(s[o], l[o]);
  }),
  (THREE.PolyhedronGeometry = function (e, t, i, r) {
    function o(e) {
      var t = e.normalize().clone();
      t.index = l.vertices.push(t) - 1;
      var i = Math.atan2(e.z, -e.x) / 2 / Math.PI + 0.5,
        e = Math.atan2(-e.y, Math.sqrt(e.x * e.x + e.z * e.z)) / Math.PI + 0.5;
      return (t.uv = new THREE.UV(i, e)), t;
    }
    function n(e, t, i, r) {
      r < 1
        ? ((r = new THREE.Face3(e.index, t.index, i.index, [
            e.clone(),
            t.clone(),
            i.clone(),
          ])).centroid
            .addSelf(e)
            .addSelf(t)
            .addSelf(i)
            .divideScalar(3),
          (r.normal = r.centroid.clone().normalize()),
          l.faces.push(r),
          (r = Math.atan2(r.centroid.z, -r.centroid.x)),
          l.faceVertexUvs[0].push([
            s(e.uv, e, r),
            s(t.uv, t, r),
            s(i.uv, i, r),
          ]))
        : ((r -= 1),
          n(e, a(e, t), a(e, i), r),
          n(a(e, t), t, a(t, i), r),
          n(a(e, i), a(t, i), i, r),
          n(a(e, t), a(t, i), a(e, i), r));
    }
    function a(e, t) {
      f[e.index] || (f[e.index] = []), f[t.index] || (f[t.index] = []);
      var i = f[e.index][t.index];
      return (
        void 0 === i &&
          (f[e.index][t.index] =
            f[t.index][e.index] =
            i =
              o(new THREE.Vector3().add(e, t).divideScalar(2))),
        i
      );
    }
    function s(e, t, i) {
      return (
        i < 0 && 1 === e.u && (e = new THREE.UV(e.u - 1, e.v)),
        0 === t.x &&
          0 === t.z &&
          (e = new THREE.UV(i / 2 / Math.PI + 0.5, e.v)),
        e
      );
    }
    THREE.Geometry.call(this);
    for (var i = i || 1, r = r || 0, l = this, h = 0, c = e.length; h < c; h++)
      o(new THREE.Vector3(e[h][0], e[h][1], e[h][2]));
    for (var f = [], e = this.vertices, h = 0, c = t.length; h < c; h++)
      n(e[t[h][0]], e[t[h][1]], e[t[h][2]], r);
    for (this.mergeVertices(), h = 0, c = this.vertices.length; h < c; h++)
      this.vertices[h].multiplyScalar(i);
    this.computeCentroids(), (this.boundingSphere = { radius: i });
  }),
  (THREE.PolyhedronGeometry.prototype = Object.create(
    THREE.Geometry.prototype
  )),
  (THREE.IcosahedronGeometry = function (e, t) {
    var i = (1 + Math.sqrt(5)) / 2;
    THREE.PolyhedronGeometry.call(
      this,
      [
        [-1, i, 0],
        [1, i, 0],
        [-1, -i, 0],
        [1, -i, 0],
        [0, -1, i],
        [0, 1, i],
        [0, -1, -i],
        [0, 1, -i],
        [i, 0, -1],
        [i, 0, 1],
        [-i, 0, -1],
        [-i, 0, 1],
      ],
      [
        [0, 11, 5],
        [0, 5, 1],
        [0, 1, 7],
        [0, 7, 10],
        [0, 10, 11],
        [1, 5, 9],
        [5, 11, 4],
        [11, 10, 2],
        [10, 7, 6],
        [7, 1, 8],
        [3, 9, 4],
        [3, 4, 2],
        [3, 2, 6],
        [3, 6, 8],
        [3, 8, 9],
        [4, 9, 5],
        [2, 4, 11],
        [6, 2, 10],
        [8, 6, 7],
        [9, 8, 1],
      ],
      e,
      t
    );
  }),
  (THREE.IcosahedronGeometry.prototype = Object.create(
    THREE.Geometry.prototype
  )),
  (THREE.OctahedronGeometry = function (e, t) {
    THREE.PolyhedronGeometry.call(
      this,
      [
        [1, 0, 0],
        [-1, 0, 0],
        [0, 1, 0],
        [0, -1, 0],
        [0, 0, 1],
        [0, 0, -1],
      ],
      [
        [0, 2, 4],
        [0, 4, 3],
        [0, 3, 5],
        [0, 5, 2],
        [1, 2, 5],
        [1, 5, 3],
        [1, 3, 4],
        [1, 4, 2],
      ],
      e,
      t
    );
  }),
  (THREE.OctahedronGeometry.prototype = Object.create(
    THREE.Geometry.prototype
  )),
  (THREE.TetrahedronGeometry = function (e, t) {
    THREE.PolyhedronGeometry.call(
      this,
      [
        [1, 1, 1],
        [-1, -1, 1],
        [-1, 1, -1],
        [1, -1, -1],
      ],
      [
        [2, 1, 0],
        [0, 3, 2],
        [1, 3, 0],
        [2, 3, 1],
      ],
      e,
      t
    );
  }),
  (THREE.TetrahedronGeometry.prototype = Object.create(
    THREE.Geometry.prototype
  )),
  (THREE.ParametricGeometry = function (e, t, i, r) {
    THREE.Geometry.call(this);
    var o,
      n,
      a,
      s,
      l,
      h,
      c,
      f,
      u = this.vertices,
      p = this.faces,
      d = this.faceVertexUvs[0],
      r = void 0 !== r && r,
      E = t + 1;
    for (l = 0; l <= i; l++)
      for (h = 0, f = l / i; h <= t; h++) (c = e((c = h / t), f)), u.push(c);
    for (l = 0; l < i; l++)
      for (h = 0; h < t; h++)
        (e = l * E + h),
          (u = l * E + h + 1),
          (f = (l + 1) * E + h),
          (c = (l + 1) * E + h + 1),
          (o = new THREE.UV(h / t, l / i)),
          (n = new THREE.UV((h + 1) / t, l / i)),
          (a = new THREE.UV(h / t, (l + 1) / i)),
          (s = new THREE.UV((h + 1) / t, (l + 1) / i)),
          r
            ? (p.push(new THREE.Face3(e, u, f)),
              p.push(new THREE.Face3(u, c, f)),
              d.push([o, n, a]),
              d.push([n, s, a]))
            : (p.push(new THREE.Face4(e, u, c, f)), d.push([o, n, s, a]));
    this.computeCentroids(),
      this.computeFaceNormals(),
      this.computeVertexNormals();
  }),
  (THREE.ParametricGeometry.prototype = Object.create(
    THREE.Geometry.prototype
  )),
  (THREE.ConvexGeometry = function (e) {
    function t(t) {
      var r = e[t].clone(),
        n = r.length();
      (r.x = r.x + n * i()), (r.y = r.y + n * i()), (r.z = r.z + n * i());
      for (var n = [], a = 0; a < o.length; ) {
        var s,
          l = o[a],
          h = r,
          c = e[l[0]];
        s = c;
        var f = e[l[1]],
          u = e[l[2]],
          p = new THREE.Vector3(),
          d = new THREE.Vector3();
        if (
          (p.sub(u, f),
          d.sub(s, f),
          p.crossSelf(d),
          p.isZero() || p.normalize(),
          (c = (s = p).dot(c)),
          s.dot(h) >= c)
        ) {
          for (h = 0; h < 3; h++) {
            for (f = 0, c = [l[h], l[(h + 1) % 3]], s = !0; f < n.length; f++)
              if (n[f][0] === c[1] && n[f][1] === c[0]) {
                (n[f] = n[n.length - 1]), n.pop(), (s = !1);
                break;
              }
            s && n.push(c);
          }
          (o[a] = o[o.length - 1]), o.pop();
        } else a++;
      }
      for (f = 0; f < n.length; f++) o.push([n[f][0], n[f][1], t]);
    }
    function i() {
      return (Math.random() - 0.5) * 2e-6;
    }
    function r(e) {
      var t = e.length();
      return new THREE.UV(e.x / t, e.y / t);
    }
    THREE.Geometry.call(this);
    for (
      var o = [
          [0, 1, 2],
          [0, 2, 1],
        ],
        n = 3;
      n < e.length;
      n++
    )
      t(n);
    for (var a = 0, s = Array(e.length), n = 0; n < o.length; n++)
      for (var l = o[n], h = 0; h < 3; h++)
        void 0 === s[l[h]] && ((s[l[h]] = a++), this.vertices.push(e[l[h]])),
          (l[h] = s[l[h]]);
    for (n = 0; n < o.length; n++)
      this.faces.push(new THREE.Face3(o[n][0], o[n][1], o[n][2]));
    for (n = 0; n < this.faces.length; n++)
      (l = this.faces[n]),
        this.faceVertexUvs[0].push([
          r(this.vertices[l.a]),
          r(this.vertices[l.b]),
          r(this.vertices[l.c]),
        ]);
    this.computeCentroids(),
      this.computeFaceNormals(),
      this.computeVertexNormals();
  }),
  (THREE.ConvexGeometry.prototype = Object.create(THREE.Geometry.prototype)),
  (THREE.AxisHelper = function () {
    THREE.Object3D.call(this);
    var e = new THREE.Geometry();
    e.vertices.push(new THREE.Vector3()),
      e.vertices.push(new THREE.Vector3(0, 100, 0));
    var t,
      i = new THREE.CylinderGeometry(0, 5, 25, 5, 1);
    ((t = new THREE.Line(
      e,
      new THREE.LineBasicMaterial({ color: 16711680 })
    )).rotation.z = -Math.PI / 2),
      this.add(t),
      ((t = new THREE.Mesh(
        i,
        new THREE.MeshBasicMaterial({ color: 16711680 })
      )).position.x = 100),
      (t.rotation.z = -Math.PI / 2),
      this.add(t),
      (t = new THREE.Line(e, new THREE.LineBasicMaterial({ color: 65280 }))),
      this.add(t),
      ((t = new THREE.Mesh(
        i,
        new THREE.MeshBasicMaterial({ color: 65280 })
      )).position.y = 100),
      this.add(t),
      ((t = new THREE.Line(
        e,
        new THREE.LineBasicMaterial({ color: 255 })
      )).rotation.x = Math.PI / 2),
      this.add(t),
      ((t = new THREE.Mesh(
        i,
        new THREE.MeshBasicMaterial({ color: 255 })
      )).position.z = 100),
      (t.rotation.x = Math.PI / 2),
      this.add(t);
  }),
  (THREE.AxisHelper.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.ArrowHelper = function (e, t, i, r) {
    THREE.Object3D.call(this),
      void 0 === r && (r = 16776960),
      void 0 === i && (i = 20);
    var o = new THREE.Geometry();
    o.vertices.push(new THREE.Vector3(0, 0, 0)),
      o.vertices.push(new THREE.Vector3(0, 1, 0)),
      (this.line = new THREE.Line(
        o,
        new THREE.LineBasicMaterial({ color: r })
      )),
      this.add(this.line),
      (o = new THREE.CylinderGeometry(0, 0.05, 0.25, 5, 1)),
      (this.cone = new THREE.Mesh(
        o,
        new THREE.MeshBasicMaterial({ color: r })
      )),
      this.cone.position.set(0, 1, 0),
      this.add(this.cone),
      t instanceof THREE.Vector3 && (this.position = t),
      this.setDirection(e),
      this.setLength(i);
  }),
  (THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.ArrowHelper.prototype.setDirection = function (e) {
    var t = new THREE.Vector3(0, 1, 0).crossSelf(e),
      e = Math.acos(new THREE.Vector3(0, 1, 0).dot(e.clone().normalize()));
    (this.matrix = new THREE.Matrix4().makeRotationAxis(t.normalize(), e)),
      this.rotation.setEulerFromRotationMatrix(this.matrix, this.eulerOrder);
  }),
  (THREE.ArrowHelper.prototype.setLength = function (e) {
    this.scale.set(e, e, e);
  }),
  (THREE.ArrowHelper.prototype.setColor = function (e) {
    this.line.material.color.setHex(e), this.cone.material.color.setHex(e);
  }),
  (THREE.CameraHelper = function (e) {
    function t(e, t, r) {
      i(e, r), i(t, r);
    }
    function i(e, t) {
      r.lineGeometry.vertices.push(new THREE.Vector3()),
        r.lineGeometry.colors.push(new THREE.Color(t)),
        void 0 === r.pointMap[e] && (r.pointMap[e] = []),
        r.pointMap[e].push(r.lineGeometry.vertices.length - 1);
    }
    THREE.Object3D.call(this);
    var r = this;
    (this.lineGeometry = new THREE.Geometry()),
      (this.lineMaterial = new THREE.LineBasicMaterial({
        color: 16777215,
        vertexColors: THREE.FaceColors,
      })),
      (this.pointMap = {}),
      t("n1", "n2", 16755200),
      t("n2", "n4", 16755200),
      t("n4", "n3", 16755200),
      t("n3", "n1", 16755200),
      t("f1", "f2", 16755200),
      t("f2", "f4", 16755200),
      t("f4", "f3", 16755200),
      t("f3", "f1", 16755200),
      t("n1", "f1", 16755200),
      t("n2", "f2", 16755200),
      t("n3", "f3", 16755200),
      t("n4", "f4", 16755200),
      t("p", "n1", 16711680),
      t("p", "n2", 16711680),
      t("p", "n3", 16711680),
      t("p", "n4", 16711680),
      t("u1", "u2", 43775),
      t("u2", "u3", 43775),
      t("u3", "u1", 43775),
      t("c", "t", 16777215),
      t("p", "c", 3355443),
      t("cn1", "cn2", 3355443),
      t("cn3", "cn4", 3355443),
      t("cf1", "cf2", 3355443),
      t("cf3", "cf4", 3355443),
      (this.camera = e),
      this.update(e),
      (this.lines = new THREE.Line(
        this.lineGeometry,
        this.lineMaterial,
        THREE.LinePieces
      )),
      this.add(this.lines);
  }),
  (THREE.CameraHelper.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.CameraHelper.prototype.update = function () {
    function e(e, i, r, o) {
      if (
        (THREE.CameraHelper.__v.set(i, r, o),
        THREE.CameraHelper.__projector.unprojectVector(
          THREE.CameraHelper.__v,
          THREE.CameraHelper.__c
        ),
        void 0 !== (e = t.pointMap[e]))
      )
        for (i = 0, r = e.length; i < r; i++)
          t.lineGeometry.vertices[e[i]].copy(THREE.CameraHelper.__v);
    }
    var t = this;
    THREE.CameraHelper.__c.projectionMatrix.copy(this.camera.projectionMatrix),
      e("c", 0, 0, -1),
      e("t", 0, 0, 1),
      e("n1", -1, -1, -1),
      e("n2", 1, -1, -1),
      e("n3", -1, 1, -1),
      e("n4", 1, 1, -1),
      e("f1", -1, -1, 1),
      e("f2", 1, -1, 1),
      e("f3", -1, 1, 1),
      e("f4", 1, 1, 1),
      e("u1", 0.7, 1.1, -1),
      e("u2", -0.7, 1.1, -1),
      e("u3", 0, 2, -1),
      e("cf1", -1, 0, 1),
      e("cf2", 1, 0, 1),
      e("cf3", 0, -1, 1),
      e("cf4", 0, 1, 1),
      e("cn1", -1, 0, -1),
      e("cn2", 1, 0, -1),
      e("cn3", 0, -1, -1),
      e("cn4", 0, 1, -1),
      (this.lineGeometry.verticesNeedUpdate = !0);
  }),
  (THREE.CameraHelper.__projector = new THREE.Projector()),
  (THREE.CameraHelper.__v = new THREE.Vector3()),
  (THREE.CameraHelper.__c = new THREE.Camera()),
  (THREE.SubdivisionModifier = function (e) {
    (this.subdivisions = void 0 === e ? 1 : e),
      (this.useOldVertexColors = !1),
      (this.supportUVs = !0),
      (this.debug = !1);
  }),
  (THREE.SubdivisionModifier.prototype.modify = function (e) {
    for (var t = this.subdivisions; t-- > 0; ) this.smooth(e);
  }),
  (THREE.SubdivisionModifier.prototype.smooth = function (e) {
    function t() {
      T.debug && console.log.apply(console, arguments);
    }
    function i() {
      console && console.log.apply(console, arguments);
    }
    function r(e, i, r, o, a, s, l) {
      var h = new THREE.Face4(e, i, r, o, null, a.color, a.materialIndex);
      if (T.useOldVertexColors) {
        h.vertexColors = [];
        for (var c, f, u, p = 0; p < 4; p++) {
          (u = s[p]), (c = new THREE.Color()).setRGB(0, 0, 0);
          for (var d = 0; d < u.length; d++)
            (f = a.vertexColors[u[d] - 1]),
              (c.r = c.r + f.r),
              (c.g = c.g + f.g),
              (c.b = c.b + f.b);
          (c.r = c.r / u.length),
            (c.g = c.g / u.length),
            (c.b = c.b / u.length),
            (h.vertexColors[p] = c);
        }
      }
      g.push(h),
        T.supportUVs &&
          ((a = [n(e, ""), n(i, l), n(r, l), n(o, l)])[0]
            ? a[1]
              ? a[2]
                ? a[3]
                  ? $.push(a)
                  : t("d :( ", o + ":" + l)
                : t("c :( ", r + ":" + l)
              : t("b :( ", i + ":" + l)
            : t("a :( ", e + ":" + l));
    }
    function o(e, t) {
      return Math.min(e, t) + "_" + Math.max(e, t);
    }
    function n(e, r) {
      var o = e + ":" + r,
        n = b[o];
      return (
        n ||
        (e >= w && e < w + y.length ? t("face pt") : t("edge pt"),
        i("warning, UV not found for", o),
        null)
      );
    }
    function a(e, t, r) {
      var o = e + ":" + t;
      o in b
        ? i("dup vertexNo", e, "oldFaceNo", t, "value", r, "key", o, b[o])
        : (b[o] = r);
    }
    function s(e, t) {
      void 0 === A[e] && (A[e] = []), A[e].push(t);
    }
    function l(e, t, i) {
      void 0 === L[e] && (L[e] = {}), (L[e][t] = i);
    }
    var h,
      c,
      f,
      u,
      p,
      d,
      E,
      m,
      v = [],
      g = [],
      $ = [],
      T = this,
      R = e.vertices,
      y = e.faces,
      v = R.concat(),
      _ = [],
      x = {},
      H = {},
      b = {},
      w = R.length,
      S = e.faceVertexUvs[0];
    if (
      (t("originalFaces, uvs, originalVerticesLength", y.length, S.length, w),
      T.supportUVs)
    )
      for (f = 0, u = S.length; f < u; f++)
        for (p = 0, d = S[f].length; p < d; p++)
          a((m = y[f]["abcd".charAt(p)]), f, S[f][p]);
    for (E in (0 == S.length && (T.supportUVs = !1), (f = 0), b)) f++;
    for (
      f || ((T.supportUVs = !1), t("no uvs")),
        t("-- Original Faces + Vertices UVs completed", b, "vs", S.length),
        f = 0,
        u = y.length;
      f < u;
      f++
    )
      (E = y[f]),
        _.push(E.centroid),
        v.push(E.centroid),
        T.supportUVs &&
          ((S = new THREE.UV()),
          E instanceof THREE.Face3
            ? ((S.u = n(E.a, f).u + n(E.b, f).u + n(E.c, f).u),
              (S.v = n(E.a, f).v + n(E.b, f).v + n(E.c, f).v),
              (S.u = S.u / 3),
              (S.v = S.v / 3))
            : E instanceof THREE.Face4 &&
              ((S.u = n(E.a, f).u + n(E.b, f).u + n(E.c, f).u + n(E.d, f).u),
              (S.v = n(E.a, f).v + n(E.b, f).v + n(E.c, f).v + n(E.d, f).v),
              (S.u = S.u / 4),
              (S.v = S.v / 4)),
          a(w + f, "", S));
    t("-- added UVs for new Faces", b),
      (u = (function (e) {
        function t(e, t) {
          void 0 === s[e] && (s[e] = []), s[e].push(t);
        }
        var i,
          r,
          n,
          a,
          s = {};
        for (i = 0, r = e.faces.length; i < r; i++)
          (n = e.faces[i]) instanceof THREE.Face3
            ? (t((a = o(n.a, n.b)), i),
              t((a = o(n.b, n.c)), i),
              t((a = o(n.c, n.a)), i))
            : n instanceof THREE.Face4 &&
              (t((a = o(n.a, n.b)), i),
              t((a = o(n.b, n.c)), i),
              t((a = o(n.c, n.d)), i),
              t((a = o(n.d, n.a)), i));
        return s;
      })(e)),
      (m = 0);
    var C,
      M,
      A = {},
      L = {};
    for (f in u) {
      for (
        S = u[f],
          s((M = (C = f.split("_"))[0]), [M, (C = C[1])]),
          s(C, [M, C]),
          p = 0,
          d = S.length;
        p < d;
        p++
      )
        l(M, (E = S[p]), f), l(C, E, f);
      S.length < 2 && (H[f] = !0);
    }
    for (f in (t("vertexEdgeMap", A, "vertexFaceMap", L), u))
      (E = (S = u[f])[0]),
        (d = S[1]),
        (M = (C = f.split("_"))[0]),
        (C = C[1]),
        (S = new THREE.Vector3()),
        H[f]
          ? (S.addSelf(R[M]), S.addSelf(R[C]), S.multiplyScalar(0.5))
          : (S.addSelf(_[E]),
            S.addSelf(_[d]),
            S.addSelf(R[M]),
            S.addSelf(R[C]),
            S.multiplyScalar(0.25)),
        (x[f] = w + y.length + m),
        v.push(S),
        m++,
        T.supportUVs &&
          (((S = new THREE.UV()).u = n(M, E).u + n(C, E).u),
          (S.v = n(M, E).v + n(C, E).v),
          (S.u = S.u / 2),
          (S.v = S.v / 2),
          a(x[f], E, S),
          H[f] ||
            (((S = new THREE.UV()).u = n(M, d).u + n(C, d).u),
            (S.v = n(M, d).v + n(C, d).v),
            (S.u = S.u / 2),
            (S.v = S.v / 2),
            a(x[f], d, S)));
    t("-- Step 2 done"),
      (d = ["123", "12", "2", "23"]),
      (C = ["123", "23", "3", "31"]);
    var P = ["123", "31", "1", "12"],
      U = ["1234", "12", "2", "23"],
      F = ["1234", "23", "3", "34"],
      D = ["1234", "34", "4", "41"],
      V = ["1234", "41", "1", "12"];
    for (f = 0, u = _.length; f < u; f++)
      (E = y[f]),
        (S = w + f),
        E instanceof THREE.Face3
          ? ((m = o(E.a, E.b)),
            (M = o(E.b, E.c)),
            (h = o(E.c, E.a)),
            r(S, x[m], E.b, x[M], E, d, f),
            r(S, x[M], E.c, x[h], E, C, f),
            r(S, x[h], E.a, x[m], E, P, f))
          : E instanceof THREE.Face4
          ? ((m = o(E.a, E.b)),
            (M = o(E.b, E.c)),
            (h = o(E.c, E.d)),
            (c = o(E.d, E.a)),
            r(S, x[m], E.b, x[M], E, U, f),
            r(S, x[M], E.c, x[h], E, F, f),
            r(S, x[h], E.d, x[c], E, D, f),
            r(S, x[c], E.a, x[m], E, V, f))
          : t("face should be a face!", E);
    for (
      x = new THREE.Vector3(), E = new THREE.Vector3(), f = 0, u = R.length;
      f < u;
      f++
    )
      if (void 0 !== A[f]) {
        for (p in (x.set(0, 0, 0),
        E.set(0, 0, 0),
        (M = new THREE.Vector3(0, 0, 0)),
        (S = 0),
        L[f]))
          x.addSelf(_[p]), S++;
        for (p = 0, d = 0, m = A[f].length; p < m; p++)
          H[o(A[f][p][0], A[f][p][1])] && d++;
        if (2 != d) {
          for (x.divideScalar(S), p = 0; p < m; p++)
            (S = R[(S = A[f][p])[0]].clone().addSelf(R[S[1]]).divideScalar(2)),
              E.addSelf(S);
          E.divideScalar(m),
            M.addSelf(R[f]),
            M.multiplyScalar(m - 3),
            M.addSelf(x),
            M.addSelf(E.multiplyScalar(2)),
            M.divideScalar(m),
            (v[f] = M);
        }
      }
    (e.vertices = v),
      (e.faces = g),
      (e.faceVertexUvs[0] = $),
      delete e.__tmpVertices,
      e.computeCentroids(),
      e.computeFaceNormals(),
      e.computeVertexNormals();
  }),
  (THREE.ImmediateRenderObject = function () {
    THREE.Object3D.call(this), (this.render = function () {});
  }),
  (THREE.ImmediateRenderObject.prototype = Object.create(
    THREE.Object3D.prototype
  )),
  (THREE.LensFlare = function (e, t, i, r, o) {
    THREE.Object3D.call(this),
      (this.lensFlares = []),
      (this.positionScreen = new THREE.Vector3()),
      (this.customUpdateCallback = void 0),
      void 0 !== e && this.add(e, t, i, r, o);
  }),
  (THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype)),
  (THREE.LensFlare.prototype.add = function (e, t, i, r, o, n) {
    void 0 === t && (t = -1),
      void 0 === i && (i = 0),
      void 0 === n && (n = 1),
      void 0 === o && (o = new THREE.Color(16777215)),
      void 0 === r && (r = THREE.NormalBlending),
      (i = Math.min(i, Math.max(0, i))),
      this.lensFlares.push({
        texture: e,
        size: t,
        distance: i,
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        rotation: 1,
        opacity: n,
        color: o,
        blending: r,
      });
  }),
  (THREE.LensFlare.prototype.updateLensFlares = function () {
    var e,
      t,
      i = this.lensFlares.length,
      r = -(2 * this.positionScreen.x),
      o = -(2 * this.positionScreen.y);
    for (e = 0; e < i; e++)
      ((t = this.lensFlares[e]).x = this.positionScreen.x + r * t.distance),
        (t.y = this.positionScreen.y + o * t.distance),
        (t.wantedRotation = t.x * Math.PI * 0.25),
        (t.rotation = t.rotation + (t.wantedRotation - t.rotation) * 0.25);
  }),
  (THREE.MorphBlendMesh = function (e, t) {
    THREE.Mesh.call(this, e, t),
      (this.animationsMap = {}),
      (this.animationsList = []);
    var i = this.geometry.morphTargets.length;
    this.createAnimation("__default", 0, i - 1, i / 1),
      this.setAnimationWeight("__default", 1);
  }),
  (THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype)),
  (THREE.MorphBlendMesh.prototype.createAnimation = function (e, t, i, r) {
    (t = {
      startFrame: t,
      endFrame: i,
      length: i - t + 1,
      fps: r,
      duration: (i - t) / r,
      lastFrame: 0,
      currentFrame: 0,
      active: !1,
      time: 0,
      direction: 1,
      weight: 1,
      directionBackwards: !1,
      mirroredLoop: !1,
    }),
      (this.animationsMap[e] = t),
      this.animationsList.push(t);
  }),
  (THREE.MorphBlendMesh.prototype.autoCreateAnimations = function (e) {
    for (
      var t,
        i = /([a-z]+)(\d+)/,
        r = {},
        o = this.geometry,
        n = 0,
        a = o.morphTargets.length;
      n < a;
      n++
    ) {
      var s = o.morphTargets[n].name.match(i);
      if (s && s.length > 1) {
        var l = s[1];
        r[l] || (r[l] = { start: 1 / 0, end: -1 / 0 }),
          n < (s = r[l]).start && (s.start = n),
          n > s.end && (s.end = n),
          t || (t = l);
      }
    }
    for (l in r) (s = r[l]), this.createAnimation(l, s.start, s.end, e);
    this.firstAnimation = t;
  }),
  (THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function (e) {
    (e = this.animationsMap[e]) &&
      ((e.direction = 1), (e.directionBackwards = !1));
  }),
  (THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function (e) {
    (e = this.animationsMap[e]) &&
      ((e.direction = -1), (e.directionBackwards = !0));
  }),
  (THREE.MorphBlendMesh.prototype.setAnimationFPS = function (e, t) {
    var i = this.animationsMap[e];
    i && ((i.fps = t), (i.duration = (i.end - i.start) / i.fps));
  }),
  (THREE.MorphBlendMesh.prototype.setAnimationDuration = function (e, t) {
    var i = this.animationsMap[e];
    i && ((i.duration = t), (i.fps = (i.end - i.start) / i.duration));
  }),
  (THREE.MorphBlendMesh.prototype.setAnimationWeight = function (e, t) {
    var i = this.animationsMap[e];
    i && (i.weight = t);
  }),
  (THREE.MorphBlendMesh.prototype.setAnimationTime = function (e, t) {
    var i = this.animationsMap[e];
    i && (i.time = t);
  }),
  (THREE.MorphBlendMesh.prototype.getAnimationTime = function (e) {
    var t = 0;
    return (e = this.animationsMap[e]) && (t = e.time), t;
  }),
  (THREE.MorphBlendMesh.prototype.getAnimationDuration = function (e) {
    var t = -1;
    return (e = this.animationsMap[e]) && (t = e.duration), t;
  }),
  (THREE.MorphBlendMesh.prototype.playAnimation = function (e) {
    var t = this.animationsMap[e];
    t
      ? ((t.time = 0), (t.active = !0))
      : console.warn("animation[" + e + "] undefined");
  }),
  (THREE.MorphBlendMesh.prototype.stopAnimation = function (e) {
    (e = this.animationsMap[e]) && (e.active = !1);
  }),
  (THREE.MorphBlendMesh.prototype.update = function (e) {
    for (var t = 0, i = this.animationsList.length; t < i; t++) {
      var r = this.animationsList[t];
      if (r.active) {
        var o = r.duration / r.length;
        (r.time = r.time + r.direction * e),
          r.mirroredLoop
            ? (r.time > r.duration || r.time < 0) &&
              ((r.direction = -1 * r.direction),
              r.time > r.duration &&
                ((r.time = r.duration), (r.directionBackwards = !0)),
              r.time < 0 && ((r.time = 0), (r.directionBackwards = !1)))
            : ((r.time = r.time % r.duration),
              r.time < 0 && (r.time = r.time + r.duration));
        var n =
            r.startFrame +
            THREE.Math.clamp(Math.floor(r.time / o), 0, r.length - 1),
          a = r.weight;
        n !== r.currentFrame &&
          ((this.morphTargetInfluences[r.lastFrame] = 0),
          (this.morphTargetInfluences[r.currentFrame] = 1 * a),
          (this.morphTargetInfluences[n] = 0),
          (r.lastFrame = r.currentFrame),
          (r.currentFrame = n)),
          (o = (r.time % o) / o),
          r.directionBackwards && (o = 1 - o),
          (this.morphTargetInfluences[r.currentFrame] = o * a),
          (this.morphTargetInfluences[r.lastFrame] = (1 - o) * a);
      }
    }
  }),
  (THREE.LensFlarePlugin = function () {
    var e, t, i, r, o, n, a, s, l, h, c, f, u;
    function p(t) {
      var i = e.createProgram(),
        r = e.createShader(e.FRAGMENT_SHADER),
        o = e.createShader(e.VERTEX_SHADER);
      return (
        e.shaderSource(r, t.fragmentShader),
        e.shaderSource(o, t.vertexShader),
        e.compileShader(r),
        e.compileShader(o),
        e.attachShader(i, r),
        e.attachShader(i, o),
        e.linkProgram(i),
        i
      );
    }
    (this.init = function (d) {
      (e = d.context),
        (t = d),
        (i = new Float32Array(16)),
        (r = new Uint16Array(6)),
        (d = 0),
        (i[d++] = -1),
        (i[d++] = -1),
        (i[d++] = 0),
        (i[d++] = 0),
        (i[d++] = 1),
        (i[d++] = -1),
        (i[d++] = 1),
        (i[d++] = 0),
        (i[d++] = 1),
        (i[d++] = 1),
        (i[d++] = 1),
        (i[d++] = 1),
        (i[d++] = -1),
        (i[d++] = 1),
        (i[d++] = 0),
        (i[d++] = 1),
        (d = 0),
        (r[d++] = 0),
        (r[d++] = 1),
        (r[d++] = 2),
        (r[d++] = 0),
        (r[d++] = 2),
        (r[d++] = 3),
        (o = e.createBuffer()),
        (n = e.createBuffer()),
        e.bindBuffer(e.ARRAY_BUFFER, o),
        e.bufferData(e.ARRAY_BUFFER, i, e.STATIC_DRAW),
        e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, n),
        e.bufferData(e.ELEMENT_ARRAY_BUFFER, r, e.STATIC_DRAW),
        (a = e.createTexture()),
        (s = e.createTexture()),
        e.bindTexture(e.TEXTURE_2D, a),
        e.texImage2D(
          e.TEXTURE_2D,
          0,
          e.RGB,
          16,
          16,
          0,
          e.RGB,
          e.UNSIGNED_BYTE,
          null
        ),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST),
        e.bindTexture(e.TEXTURE_2D, s),
        e.texImage2D(
          e.TEXTURE_2D,
          0,
          e.RGBA,
          16,
          16,
          0,
          e.RGBA,
          e.UNSIGNED_BYTE,
          null
        ),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST),
        0 >= e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)
          ? ((l = !1), (h = p(THREE.ShaderFlares.lensFlare)))
          : ((l = !0), (h = p(THREE.ShaderFlares.lensFlareVertexTexture))),
        (f = {}),
        ((c = {}).vertex = e.getAttribLocation(h, "position")),
        (c.uv = e.getAttribLocation(h, "uv")),
        (f.renderType = e.getUniformLocation(h, "renderType")),
        (f.map = e.getUniformLocation(h, "map")),
        (f.occlusionMap = e.getUniformLocation(h, "occlusionMap")),
        (f.opacity = e.getUniformLocation(h, "opacity")),
        (f.color = e.getUniformLocation(h, "color")),
        (f.scale = e.getUniformLocation(h, "scale")),
        (f.rotation = e.getUniformLocation(h, "rotation")),
        (f.screenPosition = e.getUniformLocation(h, "screenPosition")),
        (u = !1);
    }),
      (this.render = function (i, r, p, d) {
        var i = i.__webglFlares,
          E = i.length;
        if (E) {
          var m,
            v,
            g,
            $,
            T,
            R = new THREE.Vector3(),
            y = d / p,
            _ = 0.5 * p,
            x = 0.5 * d,
            H = 16 / d,
            b = new THREE.Vector2(H * y, H),
            w = new THREE.Vector3(1, 1, 0),
            S = new THREE.Vector2(1, 1),
            C = f,
            H = c;
          for (
            e.useProgram(h),
              u ||
                (e.enableVertexAttribArray(c.vertex),
                e.enableVertexAttribArray(c.uv),
                (u = !0)),
              e.uniform1i(C.occlusionMap, 0),
              e.uniform1i(C.map, 1),
              e.bindBuffer(e.ARRAY_BUFFER, o),
              e.vertexAttribPointer(H.vertex, 2, e.FLOAT, !1, 16, 0),
              e.vertexAttribPointer(H.uv, 2, e.FLOAT, !1, 16, 8),
              e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, n),
              e.disable(e.CULL_FACE),
              e.depthMask(!1),
              m = 0;
            m < E;
            m++
          )
            if (
              ((H = 16 / d),
              b.set(H * y, H),
              ($ = i[m]),
              R.set(
                $.matrixWorld.elements[12],
                $.matrixWorld.elements[13],
                $.matrixWorld.elements[14]
              ),
              r.matrixWorldInverse.multiplyVector3(R),
              r.projectionMatrix.multiplyVector3(R),
              w.copy(R),
              (S.x = w.x * _ + _),
              (S.y = w.y * x + x),
              l || (S.x > 0 && S.x < p && S.y > 0 && S.y < d))
            )
              for (
                e.activeTexture(e.TEXTURE1),
                  e.bindTexture(e.TEXTURE_2D, a),
                  e.copyTexImage2D(
                    e.TEXTURE_2D,
                    0,
                    e.RGB,
                    S.x - 8,
                    S.y - 8,
                    16,
                    16,
                    0
                  ),
                  e.uniform1i(C.renderType, 0),
                  e.uniform2f(C.scale, b.x, b.y),
                  e.uniform3f(C.screenPosition, w.x, w.y, w.z),
                  e.disable(e.BLEND),
                  e.enable(e.DEPTH_TEST),
                  e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0),
                  e.activeTexture(e.TEXTURE0),
                  e.bindTexture(e.TEXTURE_2D, s),
                  e.copyTexImage2D(
                    e.TEXTURE_2D,
                    0,
                    e.RGBA,
                    S.x - 8,
                    S.y - 8,
                    16,
                    16,
                    0
                  ),
                  e.uniform1i(C.renderType, 1),
                  e.disable(e.DEPTH_TEST),
                  e.activeTexture(e.TEXTURE1),
                  e.bindTexture(e.TEXTURE_2D, a),
                  e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0),
                  $.positionScreen.copy(w),
                  $.customUpdateCallback
                    ? $.customUpdateCallback($)
                    : $.updateLensFlares(),
                  e.uniform1i(C.renderType, 2),
                  e.enable(e.BLEND),
                  v = 0,
                  g = $.lensFlares.length;
                v < g;
                v++
              )
                (T = $.lensFlares[v]).opacity > 0.001 &&
                  T.scale > 0.001 &&
                  ((w.x = T.x),
                  (w.y = T.y),
                  (w.z = T.z),
                  (H = (T.size * T.scale) / d),
                  (b.x = H * y),
                  (b.y = H),
                  e.uniform3f(C.screenPosition, w.x, w.y, w.z),
                  e.uniform2f(C.scale, b.x, b.y),
                  e.uniform1f(C.rotation, T.rotation),
                  e.uniform1f(C.opacity, T.opacity),
                  e.uniform3f(C.color, T.color.r, T.color.g, T.color.b),
                  t.setBlending(
                    T.blending,
                    T.blendEquation,
                    T.blendSrc,
                    T.blendDst
                  ),
                  t.setTexture(T.texture, 1),
                  e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0));
          e.enable(e.CULL_FACE), e.enable(e.DEPTH_TEST), e.depthMask(!0);
        }
      });
  }),
  (THREE.ShadowMapPlugin = function () {
    var e,
      t,
      i,
      r,
      o,
      n = new THREE.Frustum(),
      a = new THREE.Matrix4(),
      s = new THREE.Vector3(),
      l = new THREE.Vector3();
    (this.init = function (n) {
      (e = n.context), (t = n);
      var n = THREE.ShaderLib.depthRGBA,
        a = THREE.UniformsUtils.clone(n.uniforms);
      (i = new THREE.ShaderMaterial({
        fragmentShader: n.fragmentShader,
        vertexShader: n.vertexShader,
        uniforms: a,
      })),
        (r = new THREE.ShaderMaterial({
          fragmentShader: n.fragmentShader,
          vertexShader: n.vertexShader,
          uniforms: a,
          morphTargets: !0,
        })),
        (o = new THREE.ShaderMaterial({
          fragmentShader: n.fragmentShader,
          vertexShader: n.vertexShader,
          uniforms: a,
          skinning: !0,
        })),
        (i._shadowPass = !0),
        (r._shadowPass = !0),
        (o._shadowPass = !0);
    }),
      (this.render = function (e, i) {
        t.shadowMapEnabled && t.shadowMapAutoUpdate && this.update(e, i);
      }),
      (this.update = function (h, c) {
        var f,
          u,
          p,
          d,
          E,
          m,
          v,
          g,
          $,
          T,
          R = [];
        for (
          E = 0,
            e.clearColor(1, 1, 1, 1),
            e.disable(e.BLEND),
            e.enable(e.CULL_FACE),
            t.shadowMapCullFrontFaces
              ? e.cullFace(e.FRONT)
              : e.cullFace(e.BACK),
            t.setDepthTest(!0),
            u = 0,
            p = h.__lights.length;
          u < p;
          u++
        )
          if ((d = h.__lights[u]).castShadow) {
            if (d instanceof THREE.DirectionalLight && d.shadowCascade)
              for (m = 0; m < d.shadowCascadeCount; m++) {
                if (d.shadowCascadeArray[m]) f = d.shadowCascadeArray[m];
                else {
                  (T = d),
                    (g = m),
                    ((f = new THREE.DirectionalLight()).isVirtual = !0),
                    (f.onlyShadow = !0),
                    (f.castShadow = !0),
                    (f.shadowCameraNear = T.shadowCameraNear),
                    (f.shadowCameraFar = T.shadowCameraFar),
                    (f.shadowCameraLeft = T.shadowCameraLeft),
                    (f.shadowCameraRight = T.shadowCameraRight),
                    (f.shadowCameraBottom = T.shadowCameraBottom),
                    (f.shadowCameraTop = T.shadowCameraTop),
                    (f.shadowCameraVisible = T.shadowCameraVisible),
                    (f.shadowDarkness = T.shadowDarkness),
                    (f.shadowBias = T.shadowCascadeBias[g]),
                    (f.shadowMapWidth = T.shadowCascadeWidth[g]),
                    (f.shadowMapHeight = T.shadowCascadeHeight[g]),
                    (f.pointsWorld = []),
                    (f.pointsFrustum = []),
                    ($ = f.pointsWorld),
                    (v = f.pointsFrustum);
                  for (var y = 0; y < 8; y++)
                    ($[y] = new THREE.Vector3()), (v[y] = new THREE.Vector3());
                  ($ = T.shadowCascadeNearZ[g]),
                    (T = T.shadowCascadeFarZ[g]),
                    v[0].set(-1, -1, $),
                    v[1].set(1, -1, $),
                    v[2].set(-1, 1, $),
                    v[3].set(1, 1, $),
                    v[4].set(-1, -1, T),
                    v[5].set(1, -1, T),
                    v[6].set(-1, 1, T),
                    v[7].set(1, 1, T),
                    (f.originalCamera = c),
                    ((v = new THREE.Gyroscope()).position =
                      d.shadowCascadeOffset),
                    v.add(f),
                    v.add(f.target),
                    c.add(v),
                    (d.shadowCascadeArray[m] = f),
                    console.log("Created virtualLight", f);
                }
                (g = d),
                  ($ = m),
                  (T = g.shadowCascadeArray[$]).position.copy(g.position),
                  T.target.position.copy(g.target.position),
                  T.lookAt(T.target),
                  (T.shadowCameraVisible = g.shadowCameraVisible),
                  (T.shadowDarkness = g.shadowDarkness),
                  (T.shadowBias = g.shadowCascadeBias[$]),
                  (v = g.shadowCascadeNearZ[$]),
                  (g = g.shadowCascadeFarZ[$]),
                  ((T = T.pointsFrustum)[0].z = v),
                  (T[1].z = v),
                  (T[2].z = v),
                  (T[3].z = v),
                  (T[4].z = g),
                  (T[5].z = g),
                  (T[6].z = g),
                  (T[7].z = g),
                  (R[E] = f),
                  E++;
              }
            else (R[E] = d), E++;
          }
        for (u = 0, p = R.length; u < p; u++) {
          if (
            ((d = R[u]).shadowMap ||
              ((d.shadowMap = new THREE.WebGLRenderTarget(
                d.shadowMapWidth,
                d.shadowMapHeight,
                {
                  minFilter: THREE.LinearFilter,
                  magFilter: THREE.LinearFilter,
                  format: THREE.RGBAFormat,
                }
              )),
              (d.shadowMapSize = new THREE.Vector2(
                d.shadowMapWidth,
                d.shadowMapHeight
              )),
              (d.shadowMatrix = new THREE.Matrix4())),
            !d.shadowCamera)
          ) {
            if (d instanceof THREE.SpotLight)
              d.shadowCamera = new THREE.PerspectiveCamera(
                d.shadowCameraFov,
                d.shadowMapWidth / d.shadowMapHeight,
                d.shadowCameraNear,
                d.shadowCameraFar
              );
            else if (d instanceof THREE.DirectionalLight)
              d.shadowCamera = new THREE.OrthographicCamera(
                d.shadowCameraLeft,
                d.shadowCameraRight,
                d.shadowCameraTop,
                d.shadowCameraBottom,
                d.shadowCameraNear,
                d.shadowCameraFar
              );
            else {
              console.error("Unsupported light type for shadow");
              continue;
            }
            h.add(d.shadowCamera), t.autoUpdateScene && h.updateMatrixWorld();
          }
          if (
            (d.shadowCameraVisible &&
              !d.cameraHelper &&
              ((d.cameraHelper = new THREE.CameraHelper(d.shadowCamera)),
              d.shadowCamera.add(d.cameraHelper)),
            d.isVirtual && f.originalCamera == c)
          ) {
            for (
              m = c,
                E = d.shadowCamera,
                v = d.pointsFrustum,
                T = d.pointsWorld,
                s.set(1 / 0, 1 / 0, 1 / 0),
                l.set(-1 / 0, -1 / 0, -1 / 0),
                g = 0;
              g < 8;
              g++
            )
              ($ = T[g]).copy(v[g]),
                THREE.ShadowMapPlugin.__projector.unprojectVector($, m),
                E.matrixWorldInverse.multiplyVector3($),
                $.x < s.x && (s.x = $.x),
                $.x > l.x && (l.x = $.x),
                $.y < s.y && (s.y = $.y),
                $.y > l.y && (l.y = $.y),
                $.z < s.z && (s.z = $.z),
                $.z > l.z && (l.z = $.z);
            (E.left = s.x),
              (E.right = l.x),
              (E.top = l.y),
              (E.bottom = s.y),
              E.updateProjectionMatrix();
          }
          for (
            E = d.shadowMap,
              v = d.shadowMatrix,
              (m = d.shadowCamera).position.copy(d.matrixWorld.getPosition()),
              m.lookAt(d.target.matrixWorld.getPosition()),
              m.updateMatrixWorld(),
              m.matrixWorldInverse.getInverse(m.matrixWorld),
              d.cameraHelper &&
                (d.cameraHelper.lines.visible = d.shadowCameraVisible),
              d.shadowCameraVisible && d.cameraHelper.update(),
              v.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1),
              v.multiplySelf(m.projectionMatrix),
              v.multiplySelf(m.matrixWorldInverse),
              m._viewMatrixArray || (m._viewMatrixArray = new Float32Array(16)),
              m._projectionMatrixArray ||
                (m._projectionMatrixArray = new Float32Array(16)),
              m.matrixWorldInverse.flattenToArray(m._viewMatrixArray),
              m.projectionMatrix.flattenToArray(m._projectionMatrixArray),
              a.multiply(m.projectionMatrix, m.matrixWorldInverse),
              n.setFromMatrix(a),
              t.setRenderTarget(E),
              t.clear(),
              T = h.__webglObjects,
              d = 0,
              E = T.length;
            d < E;
            d++
          )
            (v = (g = T[d]).object),
              (g.render = !1),
              v.visible &&
                v.castShadow &&
                (!(v instanceof THREE.Mesh) ||
                  !v.frustumCulled ||
                  n.contains(v)) &&
                (v._modelViewMatrix.multiply(
                  m.matrixWorldInverse,
                  v.matrixWorld
                ),
                (g.render = !0));
          for (d = 0, E = T.length; d < E; d++)
            (g = T[d]).render &&
              ((v = g.object),
              (g = g.buffer),
              ($ = v.customDepthMaterial
                ? v.customDepthMaterial
                : v.geometry.morphTargets.length
                ? r
                : v instanceof THREE.SkinnedMesh
                ? o
                : i),
              g instanceof THREE.BufferGeometry
                ? t.renderBufferDirect(m, h.__lights, null, $, g, v)
                : t.renderBuffer(m, h.__lights, null, $, g, v));
          for (T = h.__webglObjectsImmediate, d = 0, E = T.length; d < E; d++)
            (v = (g = T[d]).object).visible &&
              v.castShadow &&
              (v._modelViewMatrix.multiply(m.matrixWorldInverse, v.matrixWorld),
              t.renderImmediateObject(m, h.__lights, null, i, v));
        }
        (u = t.getClearColor()),
          (p = t.getClearAlpha()),
          e.clearColor(u.r, u.g, u.b, p),
          e.enable(e.BLEND),
          t.shadowMapCullFrontFaces && e.cullFace(e.BACK);
      });
  }),
  (THREE.ShadowMapPlugin.__projector = new THREE.Projector()),
  (THREE.SpritePlugin = function () {
    var e, t, i, r, o, n, a, s, l, h;
    function c(e, t) {
      return t.z - e.z;
    }
    (this.init = function (c) {
      (e = c.context),
        (t = c),
        (i = new Float32Array(16)),
        (r = new Uint16Array(6)),
        (c = 0),
        (i[c++] = -1),
        (i[c++] = -1),
        (i[c++] = 0),
        (i[c++] = 0),
        (i[c++] = 1),
        (i[c++] = -1),
        (i[c++] = 1),
        (i[c++] = 0),
        (i[c++] = 1),
        (i[c++] = 1),
        (i[c++] = 1),
        (i[c++] = 1),
        (i[c++] = -1),
        (i[c++] = 1),
        (i[c++] = 0),
        (i[c++] = 1),
        (c = 0),
        (r[c++] = 0),
        (r[c++] = 1),
        (r[c++] = 2),
        (r[c++] = 0),
        (r[c++] = 2),
        (r[c++] = 3),
        (o = e.createBuffer()),
        (n = e.createBuffer()),
        e.bindBuffer(e.ARRAY_BUFFER, o),
        e.bufferData(e.ARRAY_BUFFER, i, e.STATIC_DRAW),
        e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, n),
        e.bufferData(e.ELEMENT_ARRAY_BUFFER, r, e.STATIC_DRAW);
      var c = THREE.ShaderSprite.sprite,
        f = e.createProgram(),
        u = e.createShader(e.FRAGMENT_SHADER),
        p = e.createShader(e.VERTEX_SHADER);
      e.shaderSource(u, c.fragmentShader),
        e.shaderSource(p, c.vertexShader),
        e.compileShader(u),
        e.compileShader(p),
        e.attachShader(f, u),
        e.attachShader(f, p),
        e.linkProgram(f),
        (a = f),
        (l = {}),
        ((s = {}).position = e.getAttribLocation(a, "position")),
        (s.uv = e.getAttribLocation(a, "uv")),
        (l.uvOffset = e.getUniformLocation(a, "uvOffset")),
        (l.uvScale = e.getUniformLocation(a, "uvScale")),
        (l.rotation = e.getUniformLocation(a, "rotation")),
        (l.scale = e.getUniformLocation(a, "scale")),
        (l.alignment = e.getUniformLocation(a, "alignment")),
        (l.color = e.getUniformLocation(a, "color")),
        (l.map = e.getUniformLocation(a, "map")),
        (l.opacity = e.getUniformLocation(a, "opacity")),
        (l.useScreenCoordinates = e.getUniformLocation(
          a,
          "useScreenCoordinates"
        )),
        (l.affectedByDistance = e.getUniformLocation(a, "affectedByDistance")),
        (l.screenPosition = e.getUniformLocation(a, "screenPosition")),
        (l.modelViewMatrix = e.getUniformLocation(a, "modelViewMatrix")),
        (l.projectionMatrix = e.getUniformLocation(a, "projectionMatrix")),
        (h = !1);
    }),
      (this.render = function (i, r, f, u) {
        var i = i.__webglSprites,
          p = i.length;
        if (p) {
          var d = s,
            E = l,
            m = u / f,
            f = 0.5 * f,
            v = 0.5 * u,
            g = !0;
          e.useProgram(a),
            h ||
              (e.enableVertexAttribArray(d.position),
              e.enableVertexAttribArray(d.uv),
              (h = !0)),
            e.disable(e.CULL_FACE),
            e.enable(e.BLEND),
            e.depthMask(!0),
            e.bindBuffer(e.ARRAY_BUFFER, o),
            e.vertexAttribPointer(d.position, 2, e.FLOAT, !1, 16, 0),
            e.vertexAttribPointer(d.uv, 2, e.FLOAT, !1, 16, 8),
            e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, n),
            e.uniformMatrix4fv(
              E.projectionMatrix,
              !1,
              r._projectionMatrixArray
            ),
            e.activeTexture(e.TEXTURE0),
            e.uniform1i(E.map, 0);
          for (var $, T = [], d = 0; d < p; d++)
            ($ = i[d]).visible &&
              0 !== $.opacity &&
              ($.useScreenCoordinates
                ? ($.z = -$.position.z)
                : ($._modelViewMatrix.multiply(
                    r.matrixWorldInverse,
                    $.matrixWorld
                  ),
                  ($.z = -$._modelViewMatrix.elements[14])));
          for (i.sort(c), d = 0; d < p; d++)
            ($ = i[d]).visible &&
              0 !== $.opacity &&
              $.map &&
              $.map.image &&
              $.map.image.width &&
              ($.useScreenCoordinates
                ? (e.uniform1i(E.useScreenCoordinates, 1),
                  e.uniform3f(
                    E.screenPosition,
                    ($.position.x - f) / f,
                    (v - $.position.y) / v,
                    Math.max(0, Math.min(1, $.position.z))
                  ))
                : (e.uniform1i(E.useScreenCoordinates, 0),
                  e.uniform1i(
                    E.affectedByDistance,
                    $.affectedByDistance ? 1 : 0
                  ),
                  e.uniformMatrix4fv(
                    E.modelViewMatrix,
                    !1,
                    $._modelViewMatrix.elements
                  )),
              (r = $.map.image.width / ($.scaleByViewport ? u : 1)),
              (T[0] = r * m * $.scale.x),
              (T[1] = r * $.scale.y),
              e.uniform2f(E.uvScale, $.uvScale.x, $.uvScale.y),
              e.uniform2f(E.uvOffset, $.uvOffset.x, $.uvOffset.y),
              e.uniform2f(E.alignment, $.alignment.x, $.alignment.y),
              e.uniform1f(E.opacity, $.opacity),
              e.uniform3f(E.color, $.color.r, $.color.g, $.color.b),
              e.uniform1f(E.rotation, $.rotation),
              e.uniform2fv(E.scale, T),
              $.mergeWith3D && !g
                ? (e.enable(e.DEPTH_TEST), (g = !0))
                : !$.mergeWith3D && g && (e.disable(e.DEPTH_TEST), (g = !1)),
              t.setBlending(
                $.blending,
                $.blendEquation,
                $.blendSrc,
                $.blendDst
              ),
              t.setTexture($.map, 0),
              e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0));
          e.enable(e.CULL_FACE), e.enable(e.DEPTH_TEST), e.depthMask(!0);
        }
      });
  }),
  (THREE.DepthPassPlugin = function () {
    (this.enabled = !1), (this.renderTarget = null);
    var e,
      t,
      i,
      r,
      o = new THREE.Frustum(),
      n = new THREE.Matrix4();
    (this.init = function (o) {
      (e = o.context), (t = o);
      var o = THREE.ShaderLib.depthRGBA,
        n = THREE.UniformsUtils.clone(o.uniforms);
      (i = new THREE.ShaderMaterial({
        fragmentShader: o.fragmentShader,
        vertexShader: o.vertexShader,
        uniforms: n,
      })),
        (r = new THREE.ShaderMaterial({
          fragmentShader: o.fragmentShader,
          vertexShader: o.vertexShader,
          uniforms: n,
          morphTargets: !0,
        })),
        (i._shadowPass = !0),
        (r._shadowPass = !0);
    }),
      (this.render = function (e, t) {
        this.enabled && this.update(e, t);
      }),
      (this.update = function (a, s) {
        var l, h, c, f, u, p;
        for (
          e.clearColor(1, 1, 1, 1),
            e.disable(e.BLEND),
            t.setDepthTest(!0),
            t.autoUpdateScene && a.updateMatrixWorld(),
            s._viewMatrixArray || (s._viewMatrixArray = new Float32Array(16)),
            s._projectionMatrixArray ||
              (s._projectionMatrixArray = new Float32Array(16)),
            s.matrixWorldInverse.getInverse(s.matrixWorld),
            s.matrixWorldInverse.flattenToArray(s._viewMatrixArray),
            s.projectionMatrix.flattenToArray(s._projectionMatrixArray),
            n.multiply(s.projectionMatrix, s.matrixWorldInverse),
            o.setFromMatrix(n),
            t.setRenderTarget(this.renderTarget),
            t.clear(),
            p = a.__webglObjects,
            l = 0,
            h = p.length;
          l < h;
          l++
        )
          (u = (c = p[l]).object),
            (c.render = !1),
            u.visible &&
              (!(u instanceof THREE.Mesh) ||
                !u.frustumCulled ||
                o.contains(u)) &&
              (u._modelViewMatrix.multiply(s.matrixWorldInverse, u.matrixWorld),
              (c.render = !0));
        for (l = 0, h = p.length; l < h; l++)
          (c = p[l]).render &&
            ((u = c.object),
            (c = c.buffer),
            t.setObjectFaces(u),
            (f = u.customDepthMaterial
              ? u.customDepthMaterial
              : u.geometry.morphTargets.length
              ? r
              : i),
            c instanceof THREE.BufferGeometry
              ? t.renderBufferDirect(s, a.__lights, null, f, c, u)
              : t.renderBuffer(s, a.__lights, null, f, c, u));
        for (p = a.__webglObjectsImmediate, l = 0, h = p.length; l < h; l++)
          (u = (c = p[l]).object).visible &&
            u.castShadow &&
            (u._modelViewMatrix.multiply(s.matrixWorldInverse, u.matrixWorld),
            t.renderImmediateObject(s, a.__lights, null, i, u));
        (l = t.getClearColor()),
          (h = t.getClearAlpha()),
          e.clearColor(l.r, l.g, l.b, h),
          e.enable(e.BLEND);
      });
  }),
  (THREE.ShaderFlares = {
    lensFlareVertexTexture: {
      vertexShader:
        "uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
      fragmentShader:
        "precision mediump float;\nuniform sampler2D map;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}",
    },
    lensFlare: {
      vertexShader:
        "uniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform int renderType;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
      fragmentShader:
        "precision mediump float;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform int renderType;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}",
    },
  }),
  (THREE.ShaderSprite = {
    sprite: {
      vertexShader:
        "uniform int useScreenCoordinates;\nuniform int affectedByDistance;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
      fragmentShader:
        "precision mediump float;\nuniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\n}",
    },
  });
