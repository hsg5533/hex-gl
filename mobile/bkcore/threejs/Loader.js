var bkcore = bkcore || {};
(bkcore.threejs = bkcore.threejs || {}),
  (bkcore.NONE = void 0),
  (bkcore.threejs.Loader = function (e) {
    for (var t in ((this.jsonLoader = new THREE.JSONLoader()),
    (this.errorCallback =
      void 0 == e.onError
        ? function (e) {
            console.warn("Error while loading %s.".replace("%s", e));
          }
        : e.onError),
    (this.loadCallback =
      void 0 == e.onLoad
        ? function () {
            console.log("Loaded.");
          }
        : e.onLoad),
    (this.progressCallback =
      void 0 == e.onProgress ? function (e, t, r) {} : e.onProgress),
    (this.types = {
      textures: null,
      texturesCube: null,
      geometries: null,
      analysers: null,
      images: null,
      sounds: null,
    }),
    (this.states = {}),
    (this.data = {}),
    this.types))
      (this.data[t] = {}), (this.states[t] = {});
    this.progress = { total: 0, remaining: 0, loaded: 0, finished: !1 };
  }),
  (bkcore.threejs.Loader.prototype.load = function (e) {
    for (var t in this.types)
      if (t in e) {
        var r = 0;
        for (var a in e[t]) r++;
        (this.progress.total += r), (this.progress.remaining += r);
      }
    for (var s in e.textures) this.loadTexture(s, e.textures[s]);
    for (var o in e.texturesCube) this.loadTextureCube(o, e.texturesCube[o]);
    for (var i in e.geometries) this.loadGeometry(i, e.geometries[i]);
    for (var n in e.analysers) this.loadAnalyser(n, e.analysers[n]);
    for (var l in e.images) this.loadImage(l, e.images[l]);
    this.progressCallback.call(this, this.progress);
  }),
  (bkcore.threejs.Loader.prototype.updateState = function (e, t, r) {
    if (!(e in this.types)) {
      console.warn("Unkown loader type.");
      return;
    }
    !0 == r &&
      (this.progress.remaining--,
      this.progress.loaded++,
      this.progressCallback.call(this, this.progress, e, t)),
      (this.states[e][t] = r),
      this.progress.loaded == this.progress.total &&
        this.loadCallback.call(this);
  }),
  (bkcore.threejs.Loader.prototype.get = function (e, t) {
    return e in this.types
      ? t in this.data[e]
        ? this.data[e][t]
        : (console.warn("Unkown file."), null)
      : (console.warn("Unkown loader type."), null);
  }),
  (bkcore.threejs.Loader.prototype.loaded = function (e, t) {
    return e in this.types
      ? t in this.states[e]
        ? this.states[e][t]
        : (console.warn("Unkown file."), null)
      : (console.warn("Unkown loader type."), null);
  }),
  (bkcore.threejs.Loader.prototype.loadTexture = function (e, t) {
    var r = this;
    this.updateState("textures", e, !1),
      (this.data.textures[e] = THREE.ImageUtils.loadTexture(
        t,
        bkcore.NONE,
        function () {
          r.updateState("textures", e, !0);
        },
        function () {
          r.errorCallback.call(r, e);
        }
      ));
  }),
  (bkcore.threejs.Loader.prototype.loadTextureCube = function (e, t) {
    var r = this,
      a = [
        t.replace("%1", "px"),
        t.replace("%1", "nx"),
        t.replace("%1", "py"),
        t.replace("%1", "ny"),
        t.replace("%1", "pz"),
        t.replace("%1", "nz"),
      ];
    this.updateState("texturesCube", e, !1),
      (this.data.texturesCube[e] = THREE.ImageUtils.loadTextureCube(
        a,
        new THREE.CubeRefractionMapping(),
        function () {
          r.updateState("texturesCube", e, !0);
        }
      ));
  }),
  (bkcore.threejs.Loader.prototype.loadGeometry = function (e, t) {
    var r = this;
    (this.data.geometries[e] = null),
      this.updateState("geometries", e, !1),
      this.jsonLoader.load(t, function (t) {
        (r.data.geometries[e] = t), r.updateState("geometries", e, !0);
      });
  }),
  (bkcore.threejs.Loader.prototype.loadAnalyser = function (e, t) {
    var r = this;
    this.updateState("analysers", e, !1),
      (this.data.analysers[e] = new bkcore.ImageData(t, function () {
        r.updateState("analysers", e, !0);
      }));
  }),
  (bkcore.threejs.Loader.prototype.loadImage = function (e, t) {
    var r = this;
    this.updateState("images", e, !1);
    var a = new Image();
    (a.onload = function () {
      r.updateState("images", e, !0);
    }),
      (a.crossOrigin = "anonymous"),
      (a.src = t),
      (this.data.images[e] = a);
  });
