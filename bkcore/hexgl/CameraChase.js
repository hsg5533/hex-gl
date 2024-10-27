var bkcore = bkcore || {};
(bkcore.hexgl = bkcore.hexgl || {}),
  (bkcore.hexgl.CameraChase = function (t) {
    (this.dir = new THREE.Vector3(0, 0, 1)),
      (this.up = new THREE.Vector3(0, 1, 0)),
      (this.target = new THREE.Vector3()),
      (this.speedOffset = 0),
      (this.speedOffsetMax = 10),
      (this.speedOffsetStep = 0.05),
      (this.modes = { CHASE: 0, ORBIT: 1 }),
      (this.mode = this.modes.CHASE),
      (this.camera = t.camera),
      (this.targetObject = t.target),
      (this.cameraCube = void 0 == t.cameraCube ? null : t.cameraCube),
      (this.yoffset = void 0 == t.yoffest ? 8 : t.yoffest),
      (this.zoffset = void 0 == t.zoffset ? 10 : t.zoffset),
      (this.viewOffset = void 0 == t.viewOffset ? 10 : t.viewOffset),
      (this.orbitOffset = 12),
      (this.lerp = void 0 == t.lerp ? 0.5 : t.lerp),
      (this.time = 0);
  }),
  (bkcore.hexgl.CameraChase.prototype.update = function (t, e) {
    this.mode == this.modes.CHASE
      ? (this.dir.set(0, 0, 1),
        this.up.set(0, 1, 0),
        this.targetObject.matrix.rotateAxis(this.up),
        this.targetObject.matrix.rotateAxis(this.dir),
        (this.speedOffset +=
          (this.speedOffsetMax * e - this.speedOffset) * Math.min(1, 0.3 * t)),
        this.target.copy(this.targetObject.position),
        this.target.subSelf(
          this.dir.multiplyScalar(this.zoffset + this.speedOffset)
        ),
        this.target.addSelf(this.up.multiplyScalar(this.yoffset)),
        (this.target.y += -this.up.y + this.yoffset),
        this.camera.position.copy(this.target),
        this.camera.lookAt(
          this.dir
            .normalize()
            .multiplyScalar(this.viewOffset)
            .addSelf(this.targetObject.position)
        ))
      : this.mode == this.modes.ORBIT &&
        ((this.time += 0.008 * t),
        this.dir.set(
          Math.cos(this.time) * this.orbitOffset,
          this.yoffset / 2,
          Math.sin(this.time) * this.orbitOffset
        ),
        this.target.copy(this.targetObject.position).addSelf(this.dir),
        this.camera.position.copy(this.target),
        this.camera.lookAt(this.targetObject.position)),
      null != this.cameraCube &&
        this.cameraCube.rotation.copy(this.camera.rotation);
  });
