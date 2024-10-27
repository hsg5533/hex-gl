"use strict";
var bkcore = bkcore || {};
(bkcore.hexgl = bkcore.hexgl || {}),
  (bkcore.hexgl.HexGL = function (e) {
    var t = this;
    (this.document = e.document || document),
      (this.a = window.location.href),
      (this.mobile = void 0 != e.mobile && e.mobile),
      (this.active = !0),
      (this.displayHUD = void 0 == e.hud || e.hud),
      (this.width = void 0 == e.width ? window.innerWidth : e.width),
      (this.height = void 0 == e.height ? window.innerHeight : e.height),
      (this.quality = void 0 == e.quality ? 2 : e.quality),
      (this.difficulty = void 0 == e.difficulty ? 0 : e.difficulty),
      (this.player = void 0 == e.player ? "Anonym" : e.player),
      (this.half = void 0 != e.half && e.half),
      (this.track =
        bkcore.hexgl.tracks[void 0 == e.track ? "Cityscape" : e.track]),
      (this.mode = void 0 == e.mode ? "timeattack" : e.mode),
      (this.controlType = void 0 == e.controlType ? 1 : e.controlType),
      this.half && ((this.width /= 2), (this.height /= 2)),
      (this.settings = null),
      (this.renderer = null),
      (this.manager = null),
      (this.lib = null),
      (this.materials = {}),
      (this.components = {}),
      (this.extras = {
        vignetteColor: new THREE.Color(4557489),
        bloom: null,
        fxaa: null,
      }),
      (this.containers = {}),
      (this.containers.main =
        void 0 == e.container ? document.body : e.container),
      (this.containers.overlay =
        void 0 == e.overlay ? document.body : e.overlay),
      (this.gameover = void 0 == e.gameover ? null : e.gameover),
      (this.godmode = void 0 != e.godmode && e.godmode),
      (this.hud = null),
      (this.gameplay = null),
      (this.composers = { game: null }),
      this.initRenderer(),
      this.document.addEventListener(
        "keydown",
        function e(i) {
          27 == i.keyCode && t.reset();
        },
        !1
      );
  }),
  (bkcore.hexgl.HexGL.prototype.start = function () {
    this.manager.setCurrent("game");
    var e = this;
    (function t() {
      e && e.active && requestAnimationFrame(t), e.update();
    })(),
      this.initGameplay();
  }),
  (bkcore.hexgl.HexGL.prototype.reset = function () {
    (this.manager.get("game").objects.lowFPS = 0), this.gameplay.start();
  }),
  (bkcore.hexgl.HexGL.prototype.restart = function () {
    try {
      this.document.getElementById("finish").style.display = "none";
    } catch (e) {}
    this.reset();
  }),
  (bkcore.hexgl.HexGL.prototype.update = function () {
    this.active &&
      (null != this.gameplay && this.gameplay.update(),
      this.manager.renderCurrent());
  }),
  (bkcore.hexgl.HexGL.prototype.init = function () {
    this.initHUD(),
      this.track.buildMaterials(this.quality, this.mobile),
      this.track.buildScenes(this, this.quality, this.mobile),
      this.initGameComposer();
  }),
  (bkcore.hexgl.HexGL.prototype.load = function (e) {
    this.track.load(e, this.quality, this.mobile);
  }),
  (bkcore.hexgl.HexGL.prototype.initGameplay = function () {
    var e = this;
    (this.gameplay = new bkcore.hexgl.Gameplay({
      mode: this.mode,
      hud: this.hud,
      shipControls: this.components.shipControls,
      cameraControls: this.components.cameraChase,
      analyser: this.track.analyser,
      pixelRatio: this.track.pixelRatio,
      track: this.track,
      onFinish: function () {
        e.displayScore(this.finishTime, this.lapTimes);
      },
    })),
      this.gameplay.start();
  }),
  (bkcore.hexgl.HexGL.prototype.displayScore = function (e, t) {
    this.active = !1;
    var i = bkcore.Timer.msToTimeString(e),
      s = [
        bkcore.Timer.msToTimeString(t[0]),
        bkcore.Timer.msToTimeString(t[1]),
        bkcore.Timer.msToTimeString(t[2]),
      ];
    if (this.mobile) {
      (this.gameover.style.display = "block"),
        (this.gameover.innerHTML = i.m + "'" + i.s + "''" + i.ms),
        (this.containers.main.style.display = "none");
      return;
    }
    var a = this.track,
      r = this.document.getElementById("finish"),
      o = this.document.getElementById("finish-state"),
      n = this.document.getElementById("finish-hallmsg"),
      h = this.document.getElementById("finish-msg"),
      l = this.document.getElementById("finish-result"),
      d = this.document.getElementById("finish-lap1"),
      m = this.document.getElementById("finish-lap2"),
      c = this.document.getElementById("finish-lap3"),
      g = this.document.getElementById("finish-diff"),
      p = this.document.getElementById("finish-twitter"),
      u = this.document.getElementById("finish-fb"),
      $ = this.document.getElementById("lowfps-msg"),
      y = 0 == this.difficulty ? "casual" : "hard",
      f = this.hud.timeSeparators;
    if (this.gameplay.result == this.gameplay.results.FINISH) {
      void 0 != o && (o.innerHTML = "Finished!"),
        "undefined" != typeof Storage &&
          (void 0 == localStorage["score-" + a + "-" + y] ||
          localStorage["score-" + a + "-" + y] > e
            ? (void 0 != h && (h.innerHTML = "New local record!"),
              (localStorage["score-" + a + "-" + y] = e),
              (localStorage["race-" + a + "-replay"] = JSON.Stringify(
                this.gameplay.raceData.export()
              )))
            : void 0 != h && (h.innerHTML = "Well done!"));
      var v =
        bkcore.hexgl.Ladder.global[a][y][
          bkcore.hexgl.Ladder.global[a][y].length - 2
        ];
      void 0 != v && v.score > e
        ? void 0 != n && (n.innerHTML = "You made it to the HOF!")
        : void 0 != n && (n.innerHTML = "Hall Of Fame"),
        void 0 != l && (l.innerHTML = i.m + f[1] + i.s + f[2] + i.ms),
        void 0 != d &&
          (d.innerHTML =
            void 0 != s[0].m ? s[0].m + f[1] + s[0].s + f[2] + s[0].ms : "-"),
        void 0 != m &&
          (m.innerHTML =
            void 0 != s[1].m ? s[1].m + f[1] + s[1].s + f[2] + s[1].ms : "-"),
        void 0 != c &&
          (c.innerHTML =
            void 0 != s[2].m ? s[2].m + f[1] + s[2].s + f[2] + s[2].ms : "-");
    } else
      void 0 != o && (o.innerHTML = "Destroyed!"),
        void 0 != h && (h.innerHTML = "Maybe next time!"),
        void 0 != n && (n.innerHTML = "Hall Of Fame"),
        void 0 != l && (l.innerHTML = "None"),
        void 0 != d && (d.innerHTML = "None"),
        void 0 != m && (m.innerHTML = "None"),
        void 0 != c && (c.innerHTML = "None");
    void 0 != g && (g.innerHTML = y),
      void 0 != p &&
        (p.href =
          "http://twitter.com/share?text=" +
          encodeURIComponent(
            "I just scored " +
              l.innerHTML +
              " in Cityscape (" +
              y +
              ") on #HexGL! Come try it and beat my record on "
          )),
      void 0 != u &&
        (u.href =
          "http://www.facebook.com/sharer.php?s=100&p[title]=" +
          encodeURIComponent(
            "I just scored " +
              l.innerHTML +
              " in Cityscape (" +
              y +
              ") on HexGL!"
          ) +
          "&p[summary]=" +
          encodeURIComponent(
            "HexGL is a futuristic racing game built by Thibaut Despoulain (BKcore) using HTML5, Javascript and WebGL. Come challenge your friends on this fast-paced 3D game!"
          ) +
          "&p[url]=" +
          encodeURIComponent("http://hexgl.bkcore.com") +
          "&p[images][0]=" +
          encodeURIComponent("http://hexgl.bkcore.com/image.png")),
      bkcore.hexgl.Ladder.displayLadder("finish-ladder", a, y, 8),
      this.manager.get("game").objects.lowFPS >= 999
        ? void 0 != $ &&
          ($.innerHTML =
            "Note: Your framerate was pretty low, you should try a lesser graphic setting!")
        : void 0 != $ && ($.innerHTML = ""),
      (r.style.display = "block");
  }),
  (bkcore.hexgl.HexGL.prototype.initRenderer = function () {
    var e = new THREE.WebGLRenderer({ antialias: !1, clearColor: 0 });
    this.quality > 0 &&
      !this.mobile &&
      ((e.physicallyBasedShading = !0),
      (e.gammaInput = !0),
      (e.gammaOutput = !0),
      (e.shadowMapEnabled = !0),
      (e.shadowMapSoft = !0)),
      (e.autoClear = !1),
      (e.sortObjects = !1),
      e.setSize(this.width, this.height),
      (e.domElement.style.position = "relative"),
      this.containers.main.appendChild(e.domElement),
      (this.canvas = e.domElement),
      (this.renderer = e),
      (this.manager = new bkcore.threejs.RenderManager(e));
  }),
  (bkcore.hexgl.HexGL.prototype.initHUD = function () {
    this.displayHUD &&
      ((this.hud = new bkcore.hexgl.HUD({
        width: this.width,
        height: this.height,
        font: "BebasNeueRegular",
        bg: this.track.lib.get("images", "hud.bg"),
        speed: this.track.lib.get("images", "hud.speed"),
        shield: this.track.lib.get("images", "hud.shield"),
      })),
      this.containers.overlay.appendChild(this.hud.canvas));
  }),
  (bkcore.hexgl.HexGL.prototype.initGameComposer = function () {
    var e = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat,
        stencilBuffer: !1,
      },
      t = new THREE.WebGLRenderTarget(this.width, this.height, e),
      i = new THREE.RenderPass(
        this.manager.get("sky").scene,
        this.manager.get("sky").camera
      ),
      s = new THREE.RenderPass(
        this.manager.get("game").scene,
        this.manager.get("game").camera
      );
    (s.clear = !1),
      (this.composers.game = new THREE.EffectComposer(this.renderer, t));
    var a = new THREE.ShaderPass(THREE.ShaderExtras.screen);
    (a.renderToScreen = !0), new THREE.ShaderPass(THREE.ShaderExtras.vignette);
    var r = new THREE.ShaderPass(bkcore.threejs.Shaders.hexvignette);
    if (
      ((r.uniforms.size.value = 512 * (this.width / 1633)),
      (r.uniforms.rx.value = this.width),
      (r.uniforms.ry.value = this.height),
      (r.uniforms.tHex.texture = this.track.lib.get("textures", "hex")),
      (r.uniforms.color.value = this.extras.vignetteColor),
      (r.renderToScreen = !0),
      this.composers.game.addPass(i),
      this.composers.game.addPass(s),
      this.quality > 0 && !this.mobile)
    ) {
      var o = new THREE.ShaderPass(THREE.ShaderExtras.fxaa);
      o.uniforms.resolution.value.set(1 / this.width, 1 / this.height),
        this.composers.game.addPass(o),
        (this.extras.fxaa = o);
    }
    if (this.quality > 1 && !this.mobile) {
      var n = new THREE.BloomPass(0.8, 25, 4, 256);
      this.composers.game.addPass(n), (this.extras.bloom = n);
    }
    !this.mobile || this.quality > 0
      ? this.composers.game.addPass(r)
      : this.composers.game.addPass(a);
  }),
  (bkcore.hexgl.HexGL.prototype.createMesh = function (e, t, i, s, a, r) {
    t.computeTangents();
    var o = new THREE.Mesh(t, r);
    return (
      o.position.set(i, s, a),
      e.add(o),
      this.quality > 0 &&
        !this.mobile &&
        ((o.castShadow = !0), (o.receiveShadow = !0)),
      o
    );
  }),
  (bkcore.hexgl.HexGL.prototype.tweakShipControls = function () {
    var e = this.components.shipControls;
    1 == this.difficulty
      ? ((e.airResist = 0.035),
        (e.airDrift = 0.07),
        (e.thrust = 0.035),
        (e.airBrake = 0.04),
        (e.maxSpeed = 9.6),
        (e.boosterSpeed = 0.35 * e.maxSpeed),
        (e.boosterDecay = 0.007),
        (e.angularSpeed = 0.014),
        (e.airAngularSpeed = 0.0165),
        (e.rollAngle = 0.6),
        (e.shieldDamage = 0.03),
        (e.collisionSpeedDecrease = 0.8),
        (e.collisionSpeedDecreaseCoef = 0.5),
        (e.rollLerp = 0.1),
        (e.driftLerp = 0.4),
        (e.angularLerp = 0.4))
      : 0 == this.difficulty &&
        ((e.airResist = 0.02),
        (e.airDrift = 0.06),
        (e.thrust = 0.02),
        (e.airBrake = 0.025),
        (e.maxSpeed = 7),
        (e.boosterSpeed = 0.5 * e.maxSpeed),
        (e.boosterDecay = 0.007),
        (e.angularSpeed = 0.0125),
        (e.airAngularSpeed = 0.0135),
        (e.rollAngle = 0.6),
        (e.shieldDamage = 0.06),
        (e.collisionSpeedDecrease = 0.8),
        (e.collisionSpeedDecreaseCoef = 0.5),
        (e.rollLerp = 0.07),
        (e.driftLerp = 0.3),
        (e.angularLerp = 0.4)),
      this.godmode && (e.shieldDamage = 0);
  });
