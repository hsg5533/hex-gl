(THREE.MaskPass = function (e, s) {
  (this.scene = e),
    (this.camera = s),
    (this.enabled = !0),
    (this.clear = !0),
    (this.needsSwap = !1),
    (this.inverse = !1);
}),
  (THREE.MaskPass.prototype = {
    render: function (e, s, t, a) {
      var n,
        i,
        c = e.context;
      c.colorMask(!1, !1, !1, !1),
        c.depthMask(!1),
        this.inverse ? ((n = 0), (i = 1)) : ((n = 1), (i = 0)),
        c.enable(c.STENCIL_TEST),
        c.stencilOp(c.REPLACE, c.REPLACE, c.REPLACE),
        c.stencilFunc(c.ALWAYS, n, 4294967295),
        c.clearStencil(i),
        e.render(this.scene, this.camera, t, this.clear),
        e.render(this.scene, this.camera, s, this.clear),
        c.colorMask(!0, !0, !0, !0),
        c.depthMask(!0),
        c.stencilFunc(c.EQUAL, 1, 4294967295),
        c.stencilOp(c.KEEP, c.KEEP, c.KEEP);
    },
  }),
  (THREE.ClearMaskPass = function () {
    this.enabled = !0;
  }),
  (THREE.ClearMaskPass.prototype = {
    render: function (e, s, t, a) {
      var n = e.context;
      n.disable(n.STENCIL_TEST);
    },
  });
