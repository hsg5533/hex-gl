"use strict";
var bkcore = bkcore || {};
(bkcore.hexgl = bkcore.hexgl || {}),
  (bkcore.hexgl.HexGL = function (e) {
    var t = this;
    (this.document = e.document || document),
      (this.a = window.location.href),
      (this.active = !0),
      (this.displayHUD = void 0 == e.hud || e.hud),
      (this.width = void 0 == e.width ? window.innerWidth : e.width),
      (this.height = void 0 == e.height ? window.innerHeight : e.height),
      (this.difficulty = void 0 == e.difficulty ? 0 : e.difficulty),
      (this.player = void 0 == e.player ? "Anonym" : e.player),
      (this.track =
        bkcore.hexgl.tracks[void 0 == e.track ? "Cityscape" : e.track]),
      (this.mode = void 0 == e.mode ? "timeattack" : e.mode),
      (this.controlType = void 0 == e.controlType ? 1 : e.controlType),
      (this.quality = void 0 == e.quality ? 3 : e.quality),
      0 === this.quality && ((this.width /= 2), (this.height /= 2)),
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
    (this.manager.get("game").objects.lowFPS = 0),
      this.gameplay.start(),
      bkcore.Audio.stop("bg"),
      bkcore.Audio.stop("wind"),
      bkcore.Audio.volume("wind", 0.35),
      bkcore.Audio.play("bg"),
      bkcore.Audio.play("wind");
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
      this.track.buildMaterials(this.quality),
      this.track.buildScenes(this, this.quality),
      this.initGameComposer();
  }),
  (bkcore.hexgl.HexGL.prototype.load = function (e) {
    this.track.load(e, this.quality);
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
        e.components.shipControls.terminate(),
          e.displayScore(this.finishTime, this.lapTimes);
      },
    })),
      this.gameplay.start(),
      bkcore.Audio.play("bg"),
      bkcore.Audio.play("wind"),
      bkcore.Audio.volume("wind", 0.35);
  }),
  (bkcore.hexgl.HexGL.prototype.displayScore = function (e, t) {
    this.active = !1;
    var i = bkcore.Timer.msToTimeString(e),
      s = [
        bkcore.Timer.msToTimeString(t[0]),
        bkcore.Timer.msToTimeString(t[1]),
        bkcore.Timer.msToTimeString(t[2]),
      ];
    if (null !== this.gameover) {
      (this.gameover.style.display = "block"),
        (this.gameover.children[0].innerHTML = i.m + "'" + i.s + "''" + i.ms),
        (this.containers.main.parentElement.style.display = "none");
      return;
    }
    var r = this.track,
      o = this.document.getElementById("finish"),
      a = this.document.getElementById("finish-state"),
      n = this.document.getElementById("finish-hallmsg"),
      h = this.document.getElementById("finish-msg"),
      l = this.document.getElementById("finish-result"),
      d = this.document.getElementById("finish-lap1"),
      c = this.document.getElementById("finish-lap2"),
      m = this.document.getElementById("finish-lap3"),
      g = this.document.getElementById("finish-diff"),
      p = this.document.getElementById("finish-twitter"),
      u = this.document.getElementById("finish-fb"),
      $ = this.document.getElementById("lowfps-msg"),
      y = 0 == this.difficulty ? "casual" : "hard",
      v = this.hud.timeSeparators;
    if (this.gameplay.result == this.gameplay.results.FINISH) {
      void 0 != a && (a.innerHTML = "Finished!"),
        "undefined" != typeof Storage &&
          (void 0 == localStorage["score-" + r + "-" + y] ||
          localStorage["score-" + r + "-" + y] > e
            ? (void 0 != h && (h.innerHTML = "New local record!"),
              (localStorage["score-" + r + "-" + y] = e),
              (localStorage["race-" + r + "-replay"] = JSON.Stringify(
                this.gameplay.raceData.export()
              )))
            : void 0 != h && (h.innerHTML = "Well done!"));
      var f =
        bkcore.hexgl.Ladder.global[r][y][
          bkcore.hexgl.Ladder.global[r][y].length - 2
        ];
      void 0 != f && f.score > e
        ? void 0 != n && (n.innerHTML = "You made it to the HOF!")
        : void 0 != n && (n.innerHTML = "Hall Of Fame"),
        void 0 != l && (l.innerHTML = i.m + v[1] + i.s + v[2] + i.ms),
        void 0 != d &&
          (d.innerHTML =
            void 0 != s[0].m ? s[0].m + v[1] + s[0].s + v[2] + s[0].ms : "-"),
        void 0 != c &&
          (c.innerHTML =
            void 0 != s[1].m ? s[1].m + v[1] + s[1].s + v[2] + s[1].ms : "-"),
        void 0 != m &&
          (m.innerHTML =
            void 0 != s[2].m ? s[2].m + v[1] + s[2].s + v[2] + s[2].ms : "-");
    } else
      void 0 != a && (a.innerHTML = "Destroyed!"),
        void 0 != h && (h.innerHTML = "Maybe next time!"),
        void 0 != n && (n.innerHTML = "Hall Of Fame"),
        void 0 != l && (l.innerHTML = "None"),
        void 0 != d && (d.innerHTML = "None"),
        void 0 != c && (c.innerHTML = "None"),
        void 0 != m && (m.innerHTML = "None");
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
      bkcore.hexgl.Ladder.displayLadder("finish-ladder", r, y, 8),
      this.manager.get("game").objects.lowFPS >= 999
        ? void 0 != $ &&
          ($.innerHTML =
            "Note: Your framerate was pretty low, you should try a lesser graphic setting!")
        : void 0 != $ && ($.innerHTML = ""),
      (o.style.display = "block");
  }),
  (bkcore.hexgl.HexGL.prototype.initRenderer = function () {
    var e = new THREE.WebGLRenderer({ antialias: !1, clearColor: 0 });
    this.quality > 2 &&
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
    var r = new THREE.ShaderPass(THREE.ShaderExtras.screen);
    (r.renderToScreen = !0), new THREE.ShaderPass(THREE.ShaderExtras.vignette);
    var o = new THREE.ShaderPass(bkcore.threejs.Shaders.hexvignette);
    if (
      ((o.uniforms.size.value = 512 * (this.width / 1633)),
      (o.uniforms.rx.value = this.width),
      (o.uniforms.ry.value = this.height),
      (o.uniforms.tHex.texture = this.track.lib.get("textures", "hex")),
      (o.uniforms.color.value = this.extras.vignetteColor),
      (o.renderToScreen = !0),
      this.composers.game.addPass(i),
      this.composers.game.addPass(s),
      this.quality > 2)
    ) {
      var a = new THREE.BloomPass(0.8, 25, 4, 256);
      this.composers.game.addPass(a), (this.extras.bloom = a);
    }
    this.quality > 0
      ? this.composers.game.addPass(o)
      : this.composers.game.addPass(r);
  }),
  (bkcore.hexgl.HexGL.prototype.createMesh = function (e, t, i, s, r, o) {
    t.computeTangents();
    var a = new THREE.Mesh(t, o);
    return (
      a.position.set(i, s, r),
      e.add(a),
      this.quality > 2 && ((a.castShadow = !0), (a.receiveShadow = !0)),
      a
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
