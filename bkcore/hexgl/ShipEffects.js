var bkcore = bkcore || {};
(bkcore.hexgl = bkcore.hexgl || {}),
  (bkcore.hexgl.ShipEffects = function (t) {
    (this.scene = t.scene),
      (this.shipControls = t.shipControls),
      (this.booster = t.booster),
      (this.boosterLight = t.boosterLight),
      (this.boosterSprite = t.boosterSprite),
      (this.useParticles = t.useParticles),
      this.useParticles &&
        ((this.pVel = new THREE.Vector3(0.5, 0, 0)),
        (this.pOffset = new THREE.Vector3(-3, -0.3, 0)),
        (this.pRad = new THREE.Vector3(0, 0, 1.5)),
        (this.shipVelocity = new THREE.Vector3()),
        (this.pVelS = this.pVel.length()),
        (this.pOffsetS = this.pOffset.length()),
        (this.pRadS = this.pRad.length()),
        this.pVel.normalize(),
        this.pOffset.normalize(),
        this.pRad.normalize(),
        (this.particles = {
          leftSparks: new bkcore.threejs.Particles({
            randomness: new THREE.Vector3(0.4, 0.4, 0.4),
            tint: 16777215,
            color: 16760832,
            color2: 16777215,
            texture: t.textureSpark,
            size: 2,
            life: 60,
            max: 200,
          }),
          leftClouds: new bkcore.threejs.Particles({
            opacity: 0.8,
            tint: 16777215,
            color: 6710886,
            color2: 10809855,
            texture: t.textureCloud,
            size: 6,
            blending: THREE.NormalBlending,
            life: 60,
            max: 200,
            spawn: new THREE.Vector3(3, -0.3, 0),
            spawnRadius: new THREE.Vector3(1, 1, 2),
            velocity: new THREE.Vector3(0, 0, -0.4),
            randomness: new THREE.Vector3(0.05, 0.05, 0.1),
          }),
          rightSparks: new bkcore.threejs.Particles({
            randomness: new THREE.Vector3(0.4, 0.4, 0.4),
            tint: 16777215,
            color: 16760832,
            color2: 16777215,
            texture: t.textureSpark,
            size: 2,
            life: 60,
            max: 200,
          }),
          rightClouds: new bkcore.threejs.Particles({
            opacity: 0.8,
            tint: 16777215,
            color: 6710886,
            color2: 10809855,
            texture: t.textureCloud,
            size: 6,
            blending: THREE.NormalBlending,
            life: 60,
            max: 200,
            spawn: new THREE.Vector3(-3, -0.3, 0),
            spawnRadius: new THREE.Vector3(1, 1, 2),
            velocity: new THREE.Vector3(0, 0, -0.4),
            randomness: new THREE.Vector3(0.05, 0.05, 0.1),
          }),
        }),
        this.shipControls.mesh.add(this.particles.leftClouds.system),
        this.shipControls.mesh.add(this.particles.rightClouds.system),
        this.scene.add(this.particles.leftSparks.system),
        this.scene.add(this.particles.rightSparks.system));
  }),
  (bkcore.hexgl.ShipEffects.prototype.update = function (t) {
    var s, i, e, r, o;
    this.shipControls.destroyed
      ? ((i = 0), (e = 0), (r = 0), (o = 0))
      : ((s = this.shipControls.getBoostRatio()),
        (i = this.shipControls.key.forward ? 0.8 : 0.3 + 0.4 * s),
        (e = (this.shipControls.key.forward ? 1 : 0.8) + 0.5 * s),
        (r = this.shipControls.key.forward ? 4 : 2),
        (o = 0.2 * Math.random())),
      this.booster &&
        ((this.booster.rotation.z += 1),
        this.booster.scale.set(e, e, e),
        (this.booster.material.opacity = o + i),
        (this.boosterSprite.opacity = o + i),
        (this.boosterLight.intensity = r * (o + 0.8))),
      this.useParticles &&
        (this.shipVelocity
          .copy(this.shipControls.currentVelocity)
          .multiplyScalar(0.7),
        this.particles.rightSparks.velocity.copy(this.pVel),
        this.particles.rightSparks.spawnRadius.copy(this.pRad),
        this.particles.rightSparks.spawn.copy(this.pOffset),
        (this.particles.leftSparks.velocity.copy(this.pVel).x *= -1),
        (this.particles.leftSparks.spawn.copy(this.pOffset).x *= -1),
        this.shipControls.mesh &&
          (this.shipControls.mesh.matrix.rotateAxis(
            this.particles.rightSparks.spawn
          ),
          this.particles.rightSparks.spawn
            .multiplyScalar(this.pOffsetS)
            .addSelf(this.shipControls.dummy.position),
          this.shipControls.mesh.matrix.rotateAxis(
            this.particles.rightSparks.velocity
          ),
          this.particles.rightSparks.velocity
            .multiplyScalar(this.pVelS)
            .addSelf(this.shipVelocity),
          this.shipControls.mesh.matrix.rotateAxis(
            this.particles.rightSparks.spawnRadius
          ),
          this.particles.rightSparks.spawnRadius.multiplyScalar(this.pRadS),
          this.shipControls.mesh.matrix.rotateAxis(
            this.particles.leftSparks.spawn
          ),
          this.particles.leftSparks.spawn
            .multiplyScalar(this.pOffsetS)
            .addSelf(this.shipControls.dummy.position),
          this.shipControls.mesh.matrix.rotateAxis(
            this.particles.leftSparks.velocity
          ),
          this.particles.leftSparks.velocity
            .multiplyScalar(this.pVelS)
            .addSelf(this.shipVelocity),
          this.particles.leftSparks.spawnRadius.copy(
            this.particles.rightSparks.spawnRadius
          )),
        this.shipControls.collision.right &&
          (this.particles.rightSparks.emit(10),
          this.particles.rightClouds.emit(5)),
        this.shipControls.collision.left &&
          (this.particles.leftSparks.emit(10),
          this.particles.leftClouds.emit(5)),
        this.particles.rightSparks.update(t),
        this.particles.rightClouds.update(t),
        this.particles.leftSparks.update(t),
        this.particles.leftClouds.update(t));
  });
