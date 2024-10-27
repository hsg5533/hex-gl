(THREE.RenderPass = function (e, s, l, r, a) {
  (this.scene = e),
    (this.camera = s),
    (this.overrideMaterial = l),
    (this.clearColor = r),
    (this.clearAlpha = void 0 !== a ? a : 1),
    (this.oldClearColor = new THREE.Color()),
    (this.oldClearAlpha = 1),
    (this.enabled = !0),
    (this.clear = !0),
    (this.needsSwap = !1),
    (this.prePass = null),
    (this.postPass = null);
}),
  (THREE.RenderPass.prototype = {
    render: function (e, s, l, r) {
      this.prePass && this.prePass.call(this, e),
        (this.scene.overrideMaterial = this.overrideMaterial),
        this.clearColor &&
          (this.oldClearColor.copy(e.getClearColor()),
          (this.oldClearAlpha = e.getClearAlpha()),
          e.setClearColor(this.clearColor, this.clearAlpha)),
        e.render(this.scene, this.camera, l, this.clear),
        this.clearColor &&
          e.setClearColor(this.oldClearColor, this.oldClearAlpha),
        (this.scene.overrideMaterial = null),
        this.postPass && this.postPass.call(this, e);
    },
  });
