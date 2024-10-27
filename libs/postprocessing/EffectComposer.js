(THREE.EffectComposer = function (e, r) {
  if (
    ((this.renderer = e),
    (this.renderTarget1 = r),
    void 0 === this.renderTarget1)
  ) {
    var t = window.innerWidth || 1,
      i = window.innerHeight || 1;
    (this.renderTargetParameters = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBFormat,
      stencilBuffer: !1,
    }),
      (this.renderTarget1 = new THREE.WebGLRenderTarget(
        t,
        i,
        this.renderTargetParameters
      ));
  }
  (this.renderTarget2 = this.renderTarget1.clone()),
    (this.writeBuffer = this.renderTarget1),
    (this.readBuffer = this.renderTarget2),
    (this.passes = []),
    (this.copyPass = new THREE.ShaderPass(THREE.ShaderExtras.screen));
}),
  (THREE.EffectComposer.prototype = {
    swapBuffers: function () {
      var e = this.readBuffer;
      (this.readBuffer = this.writeBuffer), (this.writeBuffer = e);
    },
    addPass: function (e) {
      this.passes.push(e);
    },
    render: function (e) {
      (this.writeBuffer = this.renderTarget1),
        (this.readBuffer = this.renderTarget2);
      var r,
        t,
        i = !1,
        s = this.passes.length;
      for (t = 0; t < s; t++)
        if ((r = this.passes[t]).enabled) {
          if (
            (r.render(this.renderer, this.writeBuffer, this.readBuffer, e, i),
            r.needsSwap)
          ) {
            if (i) {
              var f = this.renderer.context;
              f.stencilFunc(f.NOTEQUAL, 1, 4294967295),
                this.copyPass.render(
                  this.renderer,
                  this.writeBuffer,
                  this.readBuffer,
                  e
                ),
                f.stencilFunc(f.EQUAL, 1, 4294967295);
            }
            this.swapBuffers();
          }
          r instanceof THREE.MaskPass
            ? (i = !0)
            : r instanceof THREE.ClearMaskPass && (i = !1);
        }
    },
    reset: function (e) {
      (this.renderTarget1 = e),
        void 0 === this.renderTarget1 &&
          (this.renderTarget1 = new THREE.WebGLRenderTarget(
            window.innerWidth,
            window.innerHeight,
            this.renderTargetParameters
          )),
        (this.renderTarget2 = this.renderTarget1.clone()),
        (this.writeBuffer = this.renderTarget1),
        (this.readBuffer = this.renderTarget2),
        THREE.EffectComposer.quad.scale.set(
          window.innerWidth,
          window.innerHeight,
          1
        ),
        (THREE.EffectComposer.camera.left = -(window.innerWidth / 2)),
        (THREE.EffectComposer.camera.right = window.innerWidth / 2),
        (THREE.EffectComposer.camera.top = window.innerHeight / 2),
        (THREE.EffectComposer.camera.bottom = -(window.innerHeight / 2)),
        THREE.EffectComposer.camera.updateProjectionMatrix();
    },
  }),
  (THREE.EffectComposer.initWidth = window.innerWidth || 1),
  (THREE.EffectComposer.initHeight = window.innerHeight || 1),
  (THREE.EffectComposer.camera = new THREE.OrthographicCamera(
    -(THREE.EffectComposer.initWidth / 2),
    THREE.EffectComposer.initWidth / 2,
    THREE.EffectComposer.initHeight / 2,
    -(THREE.EffectComposer.initHeight / 2),
    -1e4,
    1e4
  )),
  (THREE.EffectComposer.geometry = new THREE.PlaneGeometry(1, 1)),
  THREE.EffectComposer.geometry.applyMatrix(
    new THREE.Matrix4().makeRotationX(Math.PI / 2)
  ),
  (THREE.EffectComposer.quad = new THREE.Mesh(
    THREE.EffectComposer.geometry,
    null
  )),
  (THREE.EffectComposer.quad.position.z = -100),
  THREE.EffectComposer.quad.scale.set(
    THREE.EffectComposer.initWidth,
    THREE.EffectComposer.initHeight,
    1
  ),
  (THREE.EffectComposer.scene = new THREE.Scene()),
  THREE.EffectComposer.scene.add(THREE.EffectComposer.quad),
  THREE.EffectComposer.scene.add(THREE.EffectComposer.camera);
