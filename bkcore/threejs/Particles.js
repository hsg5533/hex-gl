var bkcore = bkcore || {};
(bkcore.threejs = bkcore.threejs || {}),
  (bkcore.threejs.Particles = function (t) {
    (this.black = new THREE.Color(0)),
      (this.white = new THREE.Color(16777215)),
      (this.material = new THREE.ParticleBasicMaterial({
        color: void 0 == t.tint ? 16777215 : t.tint,
        map: void 0 == t.texture ? null : t.texture,
        size: void 0 == t.size ? 4 : t.size,
        blending: void 0 == t.blending ? THREE.AdditiveBlending : t.blending,
        depthTest: void 0 != t.depthTest && t.depthTest,
        transparent: void 0 == t.transparent || t.transparent,
        vertexColors: !0,
        opacity: void 0 == t.opacity ? 1 : t.opacity,
        sizeAttenuation: !0,
      })),
      (this.max = void 0 == t.max ? 1e3 : t.max),
      (this.spawnRate = void 0 == t.spawnRate ? 0 : t.spawnRate),
      (this.spawn = void 0 == t.spawn ? new THREE.Vector3() : t.spawn),
      (this.velocity = void 0 == t.velocity ? new THREE.Vector3() : t.velocity),
      (this.randomness =
        void 0 == t.randomness ? new THREE.Vector3() : t.randomness),
      (this.force = void 0 == t.force ? new THREE.Vector3() : t.force),
      (this.spawnRadius =
        void 0 == t.spawnRadius ? new THREE.Vector3() : t.spawnRadius),
      (this.life = void 0 == t.life ? 60 : t.life),
      (this.ageing = 1 / this.life),
      (this.friction = void 0 == t.friction ? 1 : t.friction),
      (this.color = new THREE.Color(void 0 == t.color ? 16777215 : t.color)),
      (this.color2 = void 0 == t.color2 ? null : new THREE.Color(t.color2)),
      (this.position = void 0 == t.position ? new THREE.Vector3() : t.position),
      (this.rotation = void 0 == t.rotation ? new THREE.Vector3() : t.rotation),
      (this.sort = void 0 != t.sort && t.sort),
      (this.pool = []),
      (this.buffer = []),
      (this.geometry = null),
      (this.system = null),
      this.build();
  }),
  (bkcore.threejs.Particles.prototype.build = function () {
    (this.geometry = new THREE.Geometry()),
      (this.geometry.dynamic = !0),
      (this.pool = []),
      (this.buffer = []);
    for (var t = 0; t < this.max; ++t) {
      var e = new bkcore.threejs.Particle();
      this.pool.push(e),
        this.buffer.push(e),
        this.geometry.vertices.push(e.position),
        this.geometry.colors.push(e.color);
    }
    (this.system = new THREE.ParticleSystem(this.geometry, this.material)),
      (this.system.position = this.position),
      (this.system.rotation = this.rotation),
      (this.system.sort = this.sort);
  }),
  (bkcore.threejs.Particles.prototype.emit = function (t) {
    for (var e = Math.min(t, this.pool.length), o = 0; o < e; ++o) {
      var i = this.pool.pop();
      (i.available = !1),
        i.position
          .copy(this.spawn)
          .addSelf(this.randomVector().multiplySelf(this.spawnRadius)),
        i.velocity
          .copy(this.velocity)
          .addSelf(this.randomVector().multiplySelf(this.randomness)),
        i.force.copy(this.force),
        i.basecolor.copy(this.color),
        void 0 != this.color2 &&
          i.basecolor.lerpSelf(this.color2, Math.random()),
        (i.life = 1);
    }
  }),
  (bkcore.threejs.Particles.prototype.randomVector = function () {
    return new THREE.Vector3(
      2 * Math.random() - 1,
      2 * Math.random() - 1,
      2 * Math.random() - 1
    );
  }),
  (bkcore.threejs.Particles.prototype.update = function (t) {
    for (
      var e, o, i = new THREE.Vector3(), s = new THREE.Vector3(), r = 0;
      r < this.buffer.length;
      ++r
    )
      if (!(e = this.buffer[r]).available) {
        if (((e.life -= this.ageing), e.life <= 0 && !e.available)) {
          e.reset(), this.pool.push(e);
          continue;
        }
        (o = e.life > 0.5 ? 1 : e.life + 0.5),
          e.color.setRGB(
            o * e.basecolor.r,
            o * e.basecolor.g,
            o * e.basecolor.b
          ),
          1 != this.friction && e.velocity.multiplyScalar(this.friction),
          i.copy(e.force).multiplyScalar(t),
          e.velocity.addSelf(i),
          s.copy(e.velocity).multiplyScalar(t),
          e.position.addSelf(s);
      }
    this.spawnRate > 0 && this.emit(this.spawnRate),
      (this.geometry.verticesNeedUpdate = !0),
      (this.geometry.colorsNeedUpdate = !0);
  }),
  (bkcore.threejs.Particle = function () {
    (this.position = new THREE.Vector3(-1e4, -1e4, -1e4)),
      (this.velocity = new THREE.Vector3()),
      (this.force = new THREE.Vector3()),
      (this.color = new THREE.Color(0)),
      (this.basecolor = new THREE.Color(0)),
      (this.life = 0),
      (this.available = !0);
  }),
  (bkcore.threejs.Particle.prototype.reset = function () {
    this.position.set(0, -1e5, 0),
      this.velocity.set(0, 0, 0),
      this.force.set(0, 0, 0),
      this.color.setRGB(0, 0, 0),
      this.basecolor.setRGB(0, 0, 0),
      (this.life = 0),
      (this.available = !0);
  });
