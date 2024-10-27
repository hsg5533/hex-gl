(THREE.ShaderPass = function (e, r) {
  (this.textureID = void 0 !== r ? r : "tDiffuse"),
    (this.uniforms = THREE.UniformsUtils.clone(e.uniforms)),
    (this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: e.vertexShader,
      fragmentShader: e.fragmentShader,
    })),
    (this.renderToScreen = !1),
    (this.enabled = !0),
    (this.needsSwap = !0),
    (this.clear = !1);
}),
  (THREE.ShaderPass.prototype = {
    render: function (e, r, t, s) {
      this.uniforms[this.textureID] &&
        (this.uniforms[this.textureID].texture = t),
        (THREE.EffectComposer.quad.material = this.material),
        this.renderToScreen
          ? e.render(THREE.EffectComposer.scene, THREE.EffectComposer.camera)
          : e.render(
              THREE.EffectComposer.scene,
              THREE.EffectComposer.camera,
              r,
              this.clear
            );
    },
  });
