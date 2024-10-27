var bkcore = bkcore || {};
(bkcore.threejs = bkcore.threejs || {}),
  (bkcore.threejs.Preloader = function (e) {
    (this.document = e.document || document),
      (this.end = !1),
      (this.time = 0),
      (this.y = 0.3),
      (this.ratio = 0),
      (this.height = e.height),
      (this.width = e.width),
      (this.scale = void 0 == e.scale ? 10 : e.scale),
      (this.line = void 0 == e.line ? 3 : e.line),
      (this.container = e.container),
      (this.renderer = new THREE.CanvasRenderer({ clearColor: 16777215 })),
      this.renderer.setSize(e.width, e.height),
      this.container.appendChild(this.renderer.domElement),
      (this.ctx = this.renderer.domElement.getContext("2d")),
      (this.ctx.textAlign = "center"),
      (this.scene = new THREE.Scene()),
      (this.camera = new THREE.PerspectiveCamera(
        70,
        e.width / e.height,
        1,
        1e3
      )),
      (this.camera.position.z = 100),
      this.scene.add(this.camera),
      (this.stage = new THREE.Object3D()),
      this.stage.position.set(0, 10, 0),
      this.scene.add(this.stage),
      (this.cube = new THREE.Mesh(
        new THREE.CubeGeometry(this.scale, this.scale, this.scale, 1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 10066329 })
      )),
      this.cube.scale.set(0, 0, 0),
      this.stage.add(this.cube),
      (this.cubew = new THREE.Mesh(
        new THREE.CubeGeometry(this.scale, this.scale, this.scale, 1, 1, 1),
        new THREE.MeshBasicMaterial({
          wireframe: !0,
          wireframeLinewidth: this.line,
          color: 16777215,
        })
      )),
      this.cube.add(this.cubew),
      (this.outercube = new THREE.Mesh(
        new THREE.CubeGeometry(this.scale, this.scale, this.scale, 1, 1, 1),
        new THREE.MeshBasicMaterial({
          wireframe: !0,
          wireframeLinewidth: this.line,
          color: 37848,
        })
      )),
      this.stage.add(this.outercube);
    var t = this;
    function i(e) {
      t.mouseMove.call(t, e);
    }
    (function e() {
      t.end || (requestAnimationFrame(e), t.render());
    })(),
      (this.mmsave = i),
      this.document.addEventListener("mousemove", i, !1);
  }),
  (bkcore.threejs.Preloader.prototype.render = function () {
    (this.time += 0.02), this.ctx.clearRect(0, 0, this.width, this.height);
    var e = (this.ratio - this.cube.scale.x) * 0.3;
    this.cube.scale.addScalar(e),
      (this.cube.rotation.y = this.time),
      (this.outercube.rotation.y = this.time),
      (this.stage.rotation.x += (this.y - this.stage.rotation.x) * 0.3),
      this.renderer.render(this.scene, this.camera),
      this.ctx.save(),
      (this.ctx.font = "40px Arial"),
      (this.ctx.fillStyle = "rgb(200, 200, 200)"),
      this.ctx.fillText(
        Math.round(100 * this.ratio),
        this.width / 2,
        this.height / 2 + 30
      ),
      this.ctx.restore();
  }),
  (bkcore.threejs.Preloader.prototype.mouseMove = function (e) {
    var t = this.height / 2;
    this.y = -(e.clientY - t) / t + 0.3;
  }),
  (bkcore.threejs.Preloader.prototype.remove = function () {
    this.document.removeEventListener("mousemove", this.mm, !1),
      (this.end = !0),
      (this.renderer = null),
      (this.scene = null),
      (this.stage = null),
      (this.cube = null),
      (this.cubew = null),
      (this.innercube = null),
      (this.container.innerHTML = "");
  });
