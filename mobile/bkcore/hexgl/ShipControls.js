var bkcore = bkcore || {};
(bkcore.hexgl = bkcore.hexgl || {}),
  (bkcore.hexgl.ShipControls = function (t) {
    var i = this,
      e = t.document;
    (this.active = !0),
      (this.destroyed = !1),
      (this.falling = !1),
      (this.dom = e),
      (this.mesh = null),
      (this.epsilon = 1e-8),
      (this.zero = new THREE.Vector3(0, 0, 0)),
      (this.airResist = 0.02),
      (this.airDrift = 0.1),
      (this.thrust = 0.02),
      (this.airBrake = 0.02),
      (this.maxSpeed = 7),
      (this.boosterSpeed = 0.4 * this.maxSpeed),
      (this.boosterDecay = 0.01),
      (this.angularSpeed = 0.005),
      (this.airAngularSpeed = 0.0065),
      (this.repulsionRatio = 0.5),
      (this.repulsionCap = 2.5),
      (this.repulsionLerp = 0.1),
      (this.collisionSpeedDecrease = 0.8),
      (this.collisionSpeedDecreaseCoef = 0.8),
      (this.maxShield = 1),
      (this.shieldDelay = 60),
      (this.shieldTiming = 0),
      (this.shieldDamage = 0.25),
      (this.driftLerp = 0.35),
      (this.angularLerp = 0.35),
      (this.movement = new THREE.Vector3(0, 0, 0)),
      (this.rotation = new THREE.Vector3(0, 0, 0)),
      (this.roll = 0),
      (this.rollAxis = new THREE.Vector3()),
      (this.drift = 0),
      (this.speed = 0),
      (this.speedRatio = 0),
      (this.boost = 0),
      (this.shield = 1),
      (this.angular = 0),
      (this.currentVelocity = new THREE.Vector3()),
      (this.quaternion = new THREE.Quaternion()),
      (this.dummy = new THREE.Object3D()),
      (this.dummy.useQuaternion = !0),
      (this.collisionMap = null),
      (this.collisionPixelRatio = 1),
      (this.collisionDetection = !1),
      (this.collisionPreviousPosition = new THREE.Vector3()),
      (this.heightMap = null),
      (this.heightPixelRatio = 1),
      (this.heightBias = 0),
      (this.heightLerp = 0.4),
      (this.heightScale = 1),
      (this.rollAngle = 0.6),
      (this.rollLerp = 0.08),
      (this.rollDirection = new THREE.Vector3(0, 0, 1)),
      (this.gradient = 0),
      (this.gradientTarget = 0),
      (this.gradientLerp = 0.05),
      (this.gradientScale = 4),
      (this.gradientVector = new THREE.Vector3(0, 0, 5)),
      (this.gradientAxis = new THREE.Vector3(1, 0, 0)),
      (this.tilt = 0),
      (this.tiltTarget = 0),
      (this.tiltLerp = 0.05),
      (this.tiltScale = 4),
      (this.tiltVector = new THREE.Vector3(5, 0, 0)),
      (this.tiltAxis = new THREE.Vector3(0, 0, 1)),
      (this.repulsionVLeft = new THREE.Vector3(1, 0, 0)),
      (this.repulsionVRight = new THREE.Vector3(-1, 0, 0)),
      (this.repulsionVFront = new THREE.Vector3(0, 0, 1)),
      (this.repulsionVScale = 4),
      (this.repulsionAmount = 0),
      (this.repulsionForce = new THREE.Vector3()),
      (this.fallVector = new THREE.Vector3(0, -20, 0)),
      (this.resetPos = null),
      (this.resetRot = null),
      (this.key = {
        forward: !1,
        backward: !1,
        left: !1,
        right: !1,
        ltrigger: !1,
        rtrigger: !1,
        use: !1,
      }),
      (this.collision = { front: !1, left: !1, right: !1 }),
      (this.touchController = null),
      (this.orientationController = null),
      1 == t.controlType && bkcore.controllers.TouchController.isCompatible()
        ? (this.touchController = new bkcore.controllers.TouchController(
            e,
            t.width / 2,
            function (e, s, o) {
              o.touches.length >= 4
                ? window.location.reload(!1)
                : 3 == o.touches.length
                ? t.restart()
                : o.touches.length <= 1
                ? (i.key.forward = !1)
                : (i.key.forward = !0);
            }
          ))
        : 2 == t.controlType &&
          bkcore.controllers.OrientationController.isCompatible() &&
          (this.orientationController =
            new bkcore.controllers.OrientationController(e, !0, function (
              e,
              s,
              o
            ) {
              console.log(o.touches.length),
                o.touches.length >= 4
                  ? window.location.reload(!1)
                  : 3 == o.touches.length
                  ? t.restart()
                  : o.touches.length < 1
                  ? (i.key.forward = !1)
                  : (i.key.forward = !0);
            })),
      e.addEventListener(
        "keydown",
        function t(e) {
          switch (e.keyCode) {
            case 38:
              i.key.forward = !0;
              break;
            case 40:
              i.key.backward = !0;
              break;
            case 37:
              i.key.left = !0;
              break;
            case 39:
              i.key.right = !0;
              break;
            case 81:
            case 65:
              i.key.ltrigger = !0;
              break;
            case 68:
            case 69:
              i.key.rtrigger = !0;
          }
        },
        !1
      ),
      e.addEventListener(
        "keyup",
        function t(e) {
          switch (e.keyCode) {
            case 38:
              i.key.forward = !1;
              break;
            case 40:
              i.key.backward = !1;
              break;
            case 37:
              i.key.left = !1;
              break;
            case 39:
              i.key.right = !1;
              break;
            case 81:
            case 65:
              i.key.ltrigger = !1;
              break;
            case 68:
            case 69:
              i.key.rtrigger = !1;
          }
        },
        !1
      );
  }),
  (bkcore.hexgl.ShipControls.prototype.control = function (t) {
    (this.mesh = t),
      (this.mesh.martixAutoUpdate = !1),
      (this.dummy.position = this.mesh.position);
  }),
  (bkcore.hexgl.ShipControls.prototype.reset = function (t, i) {
    (this.resetPos = t),
      (this.resetRot = i),
      this.movement.set(0, 0, 0),
      this.rotation.copy(i),
      (this.roll = 0),
      (this.drift = 0),
      (this.speed = 0),
      (this.speedRatio = 0),
      (this.boost = 0),
      (this.shield = this.maxShield),
      (this.destroyed = !1),
      this.dummy.position.copy(t),
      this.quaternion.set(i.x, i.y, i.z, 1).normalize(),
      this.dummy.quaternion.set(0, 0, 0, 1),
      this.dummy.quaternion.multiplySelf(this.quaternion),
      this.dummy.matrix.setPosition(this.dummy.position),
      this.dummy.matrix.setRotationFromQuaternion(this.dummy.quaternion),
      this.mesh.matrix.identity(),
      this.mesh.applyMatrix(this.dummy.matrix);
  }),
  (bkcore.hexgl.ShipControls.prototype.destroy = function () {
    (this.active = !1),
      (this.destroyed = !0),
      (this.collision.front = !1),
      (this.collision.left = !1),
      (this.collision.right = !1);
  }),
  (bkcore.hexgl.ShipControls.prototype.fall = function () {
    (this.active = !1),
      (this.collision.front = !1),
      (this.collision.left = !1),
      (this.collision.right = !1),
      (this.falling = !0),
      (_this = this),
      setTimeout(function () {
        _this.destroyed = !0;
      }, 1500);
  }),
  (bkcore.hexgl.ShipControls.prototype.update = function (t) {
    if (this.falling) {
      this.mesh.position.addSelf(this.fallVector);
      return;
    }
    if (this.active) {
      (this.rotation.y = 0),
        this.movement.set(0, 0, 0),
        (this.drift += (0 - this.drift) * this.driftLerp),
        (this.angular += (0 - this.angular) * this.angularLerp * 0.5);
      var i = 0,
        e = 0;
      if (
        (null != this.touchController &&
          ((e -=
            (this.touchController.stickVector.x / 100) * this.angularSpeed * t),
          (i += (this.touchController.stickVector.x / 100) * this.rollAngle)),
        null != this.orientationController &&
          ((e +=
            (this.orientationController.beta / 45) * this.angularSpeed * t),
          (i -= (this.orientationController.beta / 45) * this.rollAngle)),
        this.key.forward
          ? (this.speed += this.thrust * t)
          : (this.speed -= this.airResist * t),
        this.key.left && ((e += this.angularSpeed * t), (i -= this.rollAngle)),
        this.key.right && ((e -= this.angularSpeed * t), (i += this.rollAngle)),
        this.key.ltrigger &&
          (this.key.left
            ? (e += this.airAngularSpeed * t)
            : (e += 0.5 * this.airAngularSpeed * t),
          (this.speed -= this.airBrake * t),
          (this.drift += (this.airDrift - this.drift) * this.driftLerp),
          (this.movement.x += this.speed * this.drift * t),
          this.drift > 0 && (this.movement.z -= this.speed * this.drift * t),
          (i -= 0.7 * this.rollAngle)),
        this.key.rtrigger &&
          (this.key.right
            ? (e -= this.airAngularSpeed * t)
            : (e -= 0.5 * this.airAngularSpeed * t),
          (this.speed -= this.airBrake * t),
          (this.drift += (-this.airDrift - this.drift) * this.driftLerp),
          (this.movement.x += this.speed * this.drift * t),
          this.drift < 0 && (this.movement.z += this.speed * this.drift * t),
          (i += 0.7 * this.rollAngle)),
        (this.angular += (e - this.angular) * this.angularLerp),
        (this.rotation.y = this.angular),
        (this.speed = Math.max(0, Math.min(this.speed, this.maxSpeed))),
        (this.speedRatio = this.speed / this.maxSpeed),
        (this.movement.z += this.speed * t),
        this.repulsionForce.isZero()
          ? this.repulsionForce.set(0, 0, 0)
          : (0 != this.repulsionForce.z && (this.movement.z = 0),
            this.movement.addSelf(this.repulsionForce),
            this.repulsionForce.lerpSelf(
              this.zero,
              t > 1.5 ? 2 * this.repulsionLerp : this.repulsionLerp
            )),
        this.collisionPreviousPosition.copy(this.dummy.position),
        this.boosterCheck(t),
        this.dummy.translateX(this.movement.x),
        this.dummy.translateZ(this.movement.z),
        this.heightCheck(t),
        this.dummy.translateY(this.movement.y),
        this.currentVelocity
          .copy(this.dummy.position)
          .subSelf(this.collisionPreviousPosition),
        this.collisionCheck(t),
        this.quaternion
          .set(this.rotation.x, this.rotation.y, this.rotation.z, 1)
          .normalize(),
        this.dummy.quaternion.multiplySelf(this.quaternion),
        this.dummy.matrix.setPosition(this.dummy.position),
        this.dummy.matrix.setRotationFromQuaternion(this.dummy.quaternion),
        this.shield <= 0 && ((this.shield = 0), this.destroy()),
        null != this.mesh)
      ) {
        this.mesh.matrix.identity();
        var s = (this.gradientTarget - this.gradient) * this.gradientLerp;
        Math.abs(s) > this.epsilon && (this.gradient += s),
          Math.abs(this.gradient) > this.epsilon &&
            (this.gradientAxis.set(1, 0, 0),
            this.mesh.matrix.rotateByAxis(this.gradientAxis, this.gradient));
        var o = (this.tiltTarget - this.tilt) * this.tiltLerp;
        Math.abs(o) > this.epsilon && (this.tilt += o),
          Math.abs(this.tilt) > this.epsilon &&
            (this.tiltAxis.set(0, 0, 1),
            this.mesh.matrix.rotateByAxis(this.tiltAxis, this.tilt));
        var h = (i - this.roll) * this.rollLerp;
        Math.abs(h) > this.epsilon && (this.roll += h),
          Math.abs(this.roll) > this.epsilon &&
            (this.rollAxis.copy(this.rollDirection),
            this.mesh.matrix.rotateByAxis(this.rollAxis, this.roll)),
          this.mesh.applyMatrix(this.dummy.matrix),
          this.mesh.updateMatrixWorld(!0);
      }
    }
  }),
  (bkcore.hexgl.ShipControls.prototype.teleport = function (t, i) {
    this.quaternion.copy(i),
      this.dummy.quaternion.copy(this.quaternion),
      this.dummy.position.copy(t),
      this.dummy.matrix.setPosition(this.dummy.position),
      this.dummy.matrix.setRotationFromQuaternion(this.dummy.quaternion),
      null != this.mesh &&
        (this.mesh.matrix.identity(),
        this.mesh.applyMatrix(this.dummy.matrix),
        this.mesh.updateMatrixWorld(!0));
  }),
  (bkcore.hexgl.ShipControls.prototype.boosterCheck = function (t) {
    if (!this.collisionMap || !this.collisionMap.loaded) return !1;
    (this.boost -= this.boosterDecay * t), this.boost < 0 && (this.boost = 0);
    var i = Math.round(
        this.collisionMap.pixels.width / 2 +
          this.dummy.position.x * this.collisionPixelRatio
      ),
      e = Math.round(
        this.collisionMap.pixels.height / 2 +
          this.dummy.position.z * this.collisionPixelRatio
      );
    new THREE.Vector3(i, 0, e);
    var s = this.collisionMap.getPixel(i, e);
    255 == s.r && s.g < 127 && s.b < 127 && (this.boost = this.boosterSpeed),
      (this.movement.z += this.boost * t);
  }),
  (bkcore.hexgl.ShipControls.prototype.collisionCheck = function (t) {
    if (
      !this.collisionDetection ||
      !this.collisionMap ||
      !this.collisionMap.loaded
    )
      return !1;
    this.shieldDelay > 0 && (this.shieldDelay -= t),
      (this.collision.left = !1),
      (this.collision.right = !1),
      (this.collision.front = !1);
    var i = Math.round(
        this.collisionMap.pixels.width / 2 +
          this.dummy.position.x * this.collisionPixelRatio
      ),
      e = Math.round(
        this.collisionMap.pixels.height / 2 +
          this.dummy.position.z * this.collisionPixelRatio
      ),
      s = new THREE.Vector3(i, 0, e),
      o = this.collisionMap.getPixelBilinear(i, e);
    if (!(o.r < 255)) return !1;
    var h = this.getRealSpeed() / this.maxSpeed;
    (this.shield -= h * h * 0.8 * this.shieldDamage),
      this.repulsionVLeft.set(1, 0, 0),
      this.repulsionVRight.set(-1, 0, 0),
      this.dummy.matrix.rotateAxis(this.repulsionVLeft),
      this.dummy.matrix.rotateAxis(this.repulsionVRight),
      this.repulsionVLeft.multiplyScalar(this.repulsionVScale),
      this.repulsionVRight.multiplyScalar(this.repulsionVScale);
    var r = this.repulsionVLeft.addSelf(s),
      l = this.repulsionVRight.addSelf(s),
      n = this.collisionMap.getPixel(Math.round(r.x), Math.round(r.z)).r,
      a = this.collisionMap.getPixel(Math.round(l.x), Math.round(l.z)).r;
    return (
      (this.repulsionAmount = Math.max(
        0.8,
        Math.min(this.repulsionCap, this.speed * this.repulsionRatio)
      )),
      a > n
        ? ((this.repulsionForce.x += -this.repulsionAmount),
          (this.collision.left = !0))
        : a < n
        ? ((this.repulsionForce.x += this.repulsionAmount),
          (this.collision.right = !0))
        : ((this.repulsionForce.z += -(4 * this.repulsionAmount)),
          (this.collision.front = !0),
          (this.speed = 0)),
      a < 128 &&
        n < 128 &&
        this.collisionMap.getPixel(Math.round(s.x + 2), Math.round(s.z + 2)).r <
          128 &&
        (console.log("GAMEOVER"), this.fall()),
      (this.speed *= this.collisionSpeedDecrease),
      (this.speed *= 1 - this.collisionSpeedDecreaseCoef * (1 - o.r / 255)),
      (this.boost = 0),
      !0
    );
  }),
  (bkcore.hexgl.ShipControls.prototype.heightCheck = function (t) {
    if (!this.heightMap || !this.heightMap.loaded) return !1;
    var i =
        this.heightMap.pixels.width / 2 +
        this.dummy.position.x * this.heightPixelRatio,
      e =
        this.heightMap.pixels.height / 2 +
        this.dummy.position.z * this.heightPixelRatio,
      s =
        this.heightMap.getPixelFBilinear(i, e) / this.heightScale +
        this.heightBias;
    if ((this.heightMap.getPixel(i, e), s < 16777)) {
      var o = s - this.dummy.position.y;
      o > 0 ? (this.movement.y += o) : (this.movement.y += o * this.heightLerp);
    }
    this.gradientVector.set(0, 0, 5),
      this.dummy.matrix.rotateAxis(this.gradientVector),
      this.gradientVector.addSelf(this.dummy.position),
      (i =
        this.heightMap.pixels.width / 2 +
        this.gradientVector.x * this.heightPixelRatio),
      (e =
        this.heightMap.pixels.height / 2 +
        this.gradientVector.z * this.heightPixelRatio);
    var h =
      this.heightMap.getPixelFBilinear(i, e) / this.heightScale +
      this.heightBias;
    h < 16777 &&
      (this.gradientTarget = -Math.atan2(h - s, 5) * this.gradientScale),
      this.tiltVector.set(5, 0, 0),
      this.dummy.matrix.rotateAxis(this.tiltVector),
      this.tiltVector.addSelf(this.dummy.position),
      (i =
        this.heightMap.pixels.width / 2 +
        this.tiltVector.x * this.heightPixelRatio),
      (e =
        this.heightMap.pixels.height / 2 +
        this.tiltVector.z * this.heightPixelRatio),
      (h =
        this.heightMap.getPixelFBilinear(i, e) / this.heightScale +
        this.heightBias) >= 16777 &&
        (this.tiltVector
          .subSelf(this.dummy.position)
          .multiplyScalar(-1)
          .addSelf(this.dummy.position),
        (i =
          this.heightMap.pixels.width / 2 +
          this.tiltVector.x * this.heightPixelRatio),
        (e =
          this.heightMap.pixels.height / 2 +
          this.tiltVector.z * this.heightPixelRatio),
        (h =
          this.heightMap.getPixelFBilinear(i, e) / this.heightScale +
          this.heightBias)),
      h < 16777 && (this.tiltTarget = Math.atan2(h - s, 5) * this.tiltScale);
  }),
  (bkcore.hexgl.ShipControls.prototype.getRealSpeed = function (t) {
    return Math.round((this.speed + this.boost) * (void 0 == t ? 1 : t));
  }),
  (bkcore.hexgl.ShipControls.prototype.getRealSpeedRatio = function () {
    return Math.min(this.maxSpeed, this.speed + this.boost) / this.maxSpeed;
  }),
  (bkcore.hexgl.ShipControls.prototype.getSpeedRatio = function () {
    return (this.speed + this.boost) / this.maxSpeed;
  }),
  (bkcore.hexgl.ShipControls.prototype.getBoostRatio = function () {
    return this.boost / this.boosterSpeed;
  }),
  (bkcore.hexgl.ShipControls.prototype.getShieldRatio = function () {
    return this.shield / this.maxShield;
  }),
  (bkcore.hexgl.ShipControls.prototype.getShield = function (t) {
    return Math.round(this.shield * (void 0 == t ? 1 : t));
  }),
  (bkcore.hexgl.ShipControls.prototype.getPosition = function () {
    return this.dummy.position;
  }),
  (bkcore.hexgl.ShipControls.prototype.getQuaternion = function () {
    return this.dummy.quaternion;
  });
