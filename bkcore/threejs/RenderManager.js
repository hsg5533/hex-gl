var bkcore = bkcore || {};
(bkcore.threejs = bkcore.threejs || {}),
  (function (e) {
    var r,
      t = ["now", "webkitNow", "msNow", "mozNow"];
    if (e.performance)
      for (var n = 0; n < t.length; ++n) {
        var s = t[n];
        if (e.performance[s]) {
          r = function () {
            return e.performance[s]();
          };
          break;
        }
      }
    r || (r = Date.now), (e.perfNow = r);
  })(window),
  (bkcore.threejs.RenderManager = function (e) {
    (this.renderer = e),
      (this.time = window.perfNow()),
      (this.renders = {}),
      (this.current = {}),
      (this.size = 0),
      (this.defaultRenderMethod = function (e, r) {
        r.render(this.scene, this.camera);
      });
  }),
  (bkcore.threejs.RenderManager.prototype.add = function (e, r, t, n, s) {
    (n = n || this.defaultRenderMethod),
      (s = s || {}),
      (this.renders[e] = { id: e, scene: r, camera: t, render: n, objects: s }),
      0 == this.size && (this.current = this.renders[e]),
      this.size++;
  }),
  (bkcore.threejs.RenderManager.prototype.get = function (e) {
    return this.renders[e];
  }),
  (bkcore.threejs.RenderManager.prototype.remove = function (e) {
    e in this.renders && (delete this.renders[e], this.size--);
  }),
  (bkcore.threejs.RenderManager.prototype.renderCurrent = function () {
    if (this.current && this.current.render) {
      var e = window.perfNow(),
        r = e - this.time;
      (this.time = e), this.current.render.call(this.current, r, this.renderer);
    } else console.warn("RenderManager: No current render defined.");
  }),
  (bkcore.threejs.RenderManager.prototype.setCurrent = function (e) {
    e in this.renders
      ? (this.current = this.renders[e])
      : console.warn('RenderManager: Render "' + e + '" not found.');
  });
