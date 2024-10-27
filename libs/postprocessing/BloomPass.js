(THREE.BloomPass = function (e, r, t, n) {
  (e = void 0 !== e ? e : 1),
    (r = void 0 !== r ? r : 25),
    (t = void 0 !== t ? t : 4),
    (n = void 0 !== n ? n : 256);
  var o = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBFormat,
  };
  (this.renderTargetX = new THREE.WebGLRenderTarget(n, n, o)),
    (this.renderTargetY = new THREE.WebGLRenderTarget(n, n, o));
  var i = THREE.ShaderExtras.screen;
  (this.screenUniforms = THREE.UniformsUtils.clone(i.uniforms)),
    (this.screenUniforms.opacity.value = e),
    (this.materialScreen = new THREE.ShaderMaterial({
      uniforms: this.screenUniforms,
      vertexShader: i.vertexShader,
      fragmentShader: i.fragmentShader,
      blending: THREE.AdditiveBlending,
      transparent: !0,
    }));
  var s = THREE.ShaderExtras.convolution;
  (this.convolutionUniforms = THREE.UniformsUtils.clone(s.uniforms)),
    (this.convolutionUniforms.uImageIncrement.value = THREE.BloomPass.blurx),
    (this.convolutionUniforms.cKernel.value =
      THREE.ShaderExtras.buildKernel(t)),
    (this.materialConvolution = new THREE.ShaderMaterial({
      uniforms: this.convolutionUniforms,
      vertexShader: "#define KERNEL_SIZE " + r + ".0\n" + s.vertexShader,
      fragmentShader: "#define KERNEL_SIZE " + r + "\n" + s.fragmentShader,
    })),
    (this.enabled = !0),
    (this.needsSwap = !1),
    (this.clear = !1);
}),
  (THREE.BloomPass.prototype = {
    render: function (e, r, t, n, o) {
      o && e.context.disable(e.context.STENCIL_TEST),
        (THREE.EffectComposer.quad.material = this.materialConvolution),
        (this.convolutionUniforms.tDiffuse.texture = t),
        (this.convolutionUniforms.uImageIncrement.value =
          THREE.BloomPass.blurX),
        e.render(
          THREE.EffectComposer.scene,
          THREE.EffectComposer.camera,
          this.renderTargetX,
          !0
        ),
        (this.convolutionUniforms.tDiffuse.texture = this.renderTargetX),
        (this.convolutionUniforms.uImageIncrement.value =
          THREE.BloomPass.blurY),
        e.render(
          THREE.EffectComposer.scene,
          THREE.EffectComposer.camera,
          this.renderTargetY,
          !0
        ),
        (THREE.EffectComposer.quad.material = this.materialScreen),
        (this.screenUniforms.tDiffuse.texture = this.renderTargetY),
        o && e.context.enable(e.context.STENCIL_TEST),
        e.render(
          THREE.EffectComposer.scene,
          THREE.EffectComposer.camera,
          t,
          this.clear
        );
    },
  }),
  (THREE.BloomPass.blurX = new THREE.Vector2(0.001953125, 0)),
  (THREE.BloomPass.blurY = new THREE.Vector2(0, 0.001953125));
