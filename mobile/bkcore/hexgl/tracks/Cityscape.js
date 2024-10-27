var bkcore = bkcore || {};
(bkcore.hexgl = bkcore.hexgl || {}),
  (bkcore.hexgl.tracks = bkcore.hexgl.tracks || {}),
  (bkcore.hexgl.tracks.Cityscape = {
    lib: null,
    materials: {},
    name: "Cityscape",
    checkpoints: { list: [0, 1, 2], start: 0, last: 2 },
    spawn: { x: -2268, y: 387, z: -886 },
    spawnRotation: { x: 0, y: 0, z: 0 },
    analyser: null,
    pixelRatio: 2048 / 6e3,
    load: function (e, s, t) {
      (this.lib = new bkcore.threejs.Loader(e)),
        (s < 1 && !t) || s < 2
          ? this.lib.load({
              textures: {
                hex: "../textures/hud/hex.jpg",
                "ship.feisar.diffuse": "../textures/ships/feisar/diffuse.jpg",
                "booster.diffuse":
                  "../textures/ships/feisar/booster/booster.png",
                "booster.sprite":
                  "../textures/ships/feisar/booster/boostersprite.jpg",
                "track.cityscape.diffuse":
                  "../textures/tracks/cityscape/diffuse.jpg",
                "track.cityscape.scrapers1.diffuse":
                  "../textures/tracks/cityscape/scrapers1/diffuse.jpg",
                "track.cityscape.scrapers2.diffuse":
                  "../textures/tracks/cityscape/scrapers2/diffuse.jpg",
                "track.cityscape.start.diffuse":
                  "../textures/tracks/cityscape/start/diffuse.jpg",
                "track.cityscape.start.banner":
                  "../textures/tracks/cityscape/start/start.jpg",
                "bonus.base.diffuse": "../textures/bonus/base/diffuse.jpg",
              },
              texturesCube: {
                "skybox.dawnclouds": "../textures/skybox/dawnclouds/%1.jpg",
              },
              geometries: {
                "bonus.base": "geometries/bonus/base/base.json",
                booster: "geometries/booster/booster.json",
                "ship.feisar": "geometries/ships/feisar/feisar.json",
                "track.cityscape": "geometries/tracks/cityscape/track.json",
                "track.cityscape.scrapers1":
                  "geometries/tracks/cityscape/scrapers1.json",
                "track.cityscape.scrapers2":
                  "geometries/tracks/cityscape/scrapers2.json",
                "track.cityscape.start":
                  "geometries/tracks/cityscape/start.json",
                "track.cityscape.start.banner":
                  "geometries/tracks/cityscape/startbanner.json",
                "track.cityscape.bonus.speed":
                  "geometries/tracks/cityscape/bonus/speed.json",
              },
              analysers: {
                "track.cityscape.collision":
                  "../textures/tracks/cityscape/collision.png",
                "track.cityscape.height":
                  "../textures/tracks/cityscape/height.png",
              },
              images: {
                "hud.bg": "../textures/hud/hud-bg.png",
                "hud.speed": "../textures/hud/hud-fg-speed.png",
                "hud.shield": "../textures/hud/hud-fg-shield.png",
              },
            })
          : this.lib.load({
              textures: {
                hex: "../textures/hud/hex.jpg",
                spark: "../textures/particles/spark.png",
                cloud: "../textures/particles/cloud.png",
                "ship.feisar.diffuse": "../textures/ships/feisar/diffuse.jpg",
                "ship.feisar.specular": "../textures/ships/feisar/specular.jpg",
                "ship.feisar.normal": "../textures/ships/feisar/normal.jpg",
                "booster.diffuse":
                  "../textures/ships/feisar/booster/booster.png",
                "booster.sprite":
                  "../textures/ships/feisar/booster/boostersprite.jpg",
                "track.cityscape.diffuse":
                  "../textures/tracks/cityscape/diffuse.jpg",
                "track.cityscape.specular":
                  "../textures/tracks/cityscape/specular.jpg",
                "track.cityscape.normal":
                  "../textures/tracks/cityscape/normal.jpg",
                "track.cityscape.scrapers1.diffuse":
                  "../textures/tracks/cityscape/scrapers1/diffuse.jpg",
                "track.cityscape.scrapers1.specular":
                  "../textures/tracks/cityscape/scrapers1/specular.jpg",
                "track.cityscape.scrapers1.normal":
                  "../textures/tracks/cityscape/scrapers1/normal.jpg",
                "track.cityscape.scrapers2.diffuse":
                  "../textures/tracks/cityscape/scrapers2/diffuse.jpg",
                "track.cityscape.scrapers2.specular":
                  "../textures/tracks/cityscape/scrapers2/specular.jpg",
                "track.cityscape.scrapers2.normal":
                  "../textures/tracks/cityscape/scrapers2/normal.jpg",
                "track.cityscape.start.diffuse":
                  "../textures/tracks/cityscape/start/diffuse.jpg",
                "track.cityscape.start.specular":
                  "../textures/tracks/cityscape/start/specular.jpg",
                "track.cityscape.start.normal":
                  "../textures/tracks/cityscape/start/normal.jpg",
                "track.cityscape.start.banner":
                  "../textures/tracks/cityscape/start/start.jpg",
                "bonus.base.diffuse": "../textures/bonus/base/diffuse.jpg",
                "bonus.base.normal": "../textures/bonus/base/normal.jpg",
                "bonus.base.specular": "../textures/bonus/base/specular.jpg",
              },
              texturesCube: {
                "skybox.dawnclouds": "../textures/skybox/dawnclouds/%1.jpg",
              },
              geometries: {
                "bonus.base": "geometries/bonus/base/base.json",
                booster: "geometries/booster/booster.json",
                "ship.feisar": "geometries/ships/feisar/feisar.json",
                "track.cityscape": "geometries/tracks/cityscape/track.json",
                "track.cityscape.scrapers1":
                  "geometries/tracks/cityscape/scrapers1.json",
                "track.cityscape.scrapers2":
                  "geometries/tracks/cityscape/scrapers2.json",
                "track.cityscape.start":
                  "geometries/tracks/cityscape/start.json",
                "track.cityscape.start.banner":
                  "geometries/tracks/cityscape/startbanner.json",
                "track.cityscape.bonus.speed":
                  "geometries/tracks/cityscape/bonus/speed.json",
              },
              analysers: {
                "track.cityscape.collision":
                  "textures/tracks/cityscape/collision.png",
                "track.cityscape.height":
                  "../textures/tracks/cityscape/height.png",
              },
              images: {
                "hud.bg": "../textures/hud/hud-bg.png",
                "hud.speed": "../textures/hud/hud-fg-speed.png",
                "hud.shield": "../textures/hud/hud-fg-shield.png",
              },
            });
    },
    buildMaterials: function (e, s) {
      (e < 1 && !s) || e < 2
        ? ((this.materials.track = new THREE.MeshBasicMaterial({
            map: this.lib.get("textures", "track.cityscape.diffuse"),
            ambient: 13421772,
          })),
          (this.materials.bonusBase = new THREE.MeshBasicMaterial({
            map: this.lib.get("textures", "bonus.base.diffuse"),
            ambient: 13421772,
          })),
          (this.materials.bonusSpeed = new THREE.MeshBasicMaterial({
            color: 38655,
          })),
          (this.materials.ship = new THREE.MeshBasicMaterial({
            map: this.lib.get("textures", "ship.feisar.diffuse"),
            ambient: 11184810,
          })),
          (this.materials.booster = new THREE.MeshBasicMaterial({
            map: this.lib.get("textures", "booster.diffuse"),
            transparent: !0,
          })),
          (this.materials.scrapers1 = new THREE.MeshBasicMaterial({
            map: this.lib.get("textures", "track.cityscape.scrapers1.diffuse"),
            ambient: 13421772,
          })),
          (this.materials.scrapers2 = new THREE.MeshBasicMaterial({
            map: this.lib.get("textures", "track.cityscape.scrapers2.diffuse"),
            ambient: 13421772,
          })),
          (this.materials.start = new THREE.MeshBasicMaterial({
            map: this.lib.get("textures", "track.cityscape.start.diffuse"),
            ambient: 13421772,
          })),
          (this.materials.startBanner = new THREE.MeshBasicMaterial({
            map: this.lib.get("textures", "track.cityscape.start.banner"),
            transparent: !1,
          })))
        : ((this.materials.track = bkcore.Utils.createNormalMaterial({
            diffuse: this.lib.get("textures", "track.cityscape.diffuse"),
            specular: this.lib.get("textures", "track.cityscape.specular"),
            normal: this.lib.get("textures", "track.cityscape.normal"),
            ambient: 16777215,
            shininess: 42,
            metal: !0,
            perPixel: !0,
          })),
          (this.materials.bonusBase = bkcore.Utils.createNormalMaterial({
            diffuse: this.lib.get("textures", "bonus.base.diffuse"),
            specular: this.lib.get("textures", "bonus.base.specular"),
            normal: this.lib.get("textures", "bonus.base.normal"),
            normalScale: 3,
            ambient: 4473924,
            shininess: 42,
            metal: !1,
            perPixel: !1,
          })),
          (this.materials.bonusSpeed = new THREE.MeshBasicMaterial({
            color: 38655,
          })),
          (this.materials.ship = bkcore.Utils.createNormalMaterial({
            diffuse: this.lib.get("textures", "ship.feisar.diffuse"),
            specular: this.lib.get("textures", "ship.feisar.specular"),
            normal: this.lib.get("textures", "ship.feisar.normal"),
            ambient: 4473924,
            shininess: 42,
            metal: !0,
            perPixel: !1,
          })),
          (this.materials.booster = new THREE.MeshBasicMaterial({
            map: this.lib.get("textures", "booster.diffuse"),
            transparent: !0,
          })),
          (this.materials.scrapers1 = bkcore.Utils.createNormalMaterial({
            diffuse: this.lib.get(
              "textures",
              "track.cityscape.scrapers1.diffuse"
            ),
            specular: this.lib.get(
              "textures",
              "track.cityscape.scrapers1.specular"
            ),
            normal: this.lib.get(
              "textures",
              "track.cityscape.scrapers1.normal"
            ),
            cube: this.lib.get("texturesCube", "skybox.dawnclouds"),
            reflectivity: 0.8,
            ambient: 4473924,
            shininess: 42,
            metal: !1,
            perPixel: !1,
          })),
          (this.materials.scrapers2 = bkcore.Utils.createNormalMaterial({
            diffuse: this.lib.get(
              "textures",
              "track.cityscape.scrapers2.diffuse"
            ),
            specular: this.lib.get(
              "textures",
              "track.cityscape.scrapers2.specular"
            ),
            normal: this.lib.get(
              "textures",
              "track.cityscape.scrapers2.normal"
            ),
            cube: this.lib.get("texturesCube", "skybox.dawnclouds"),
            reflectivity: 0.8,
            ambient: 0,
            shininess: 42,
            metal: !1,
            perPixel: !1,
          })),
          (this.materials.start = bkcore.Utils.createNormalMaterial({
            diffuse: this.lib.get("textures", "track.cityscape.start.diffuse"),
            specular: this.lib.get(
              "textures",
              "track.cityscape.start.specular"
            ),
            normal: this.lib.get("textures", "track.cityscape.start.normal"),
            ambient: 11184810,
            shininess: 42,
            metal: !1,
            perPixel: !1,
          })),
          (this.materials.startBanner = new THREE.MeshBasicMaterial({
            map: this.lib.get("textures", "track.cityscape.start.banner"),
            transparent: !1,
          })));
    },
    buildScenes: function (e, s, t) {
      this.analyser = this.lib.get("analysers", "track.cityscape.collision");
      var a = new THREE.Scene(),
        r = new THREE.PerspectiveCamera(70, e.width / e.height, 1, 6e3);
      a.add(r);
      var i = THREE.ShaderUtils.lib.cube;
      i.uniforms.tCube.texture = this.lib.get(
        "texturesCube",
        "skybox.dawnclouds"
      );
      var c = new THREE.ShaderMaterial({
          fragmentShader: i.fragmentShader,
          vertexShader: i.vertexShader,
          uniforms: i.uniforms,
          depthWrite: !1,
        }),
        o = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 100), c);
      (o.flipSided = !0), a.add(o), e.manager.add("sky", a, r);
      var p = new THREE.PerspectiveCamera(70, e.width / e.height, 1, 6e4),
        l = new THREE.Scene();
      l.add(p), l.add(new THREE.AmbientLight(12303291));
      var n = new THREE.DirectionalLight(16777215, 1.5, 3e4);
      n.position.set(-4e3, 1200, 1800),
        n.lookAt(new THREE.Vector3()),
        s > 0 &&
          !t &&
          ((n.castShadow = !0),
          (n.shadowCameraNear = 50),
          (n.shadowCameraFar = 2 * p.far),
          (n.shadowCameraRight = 3e3),
          (n.shadowCameraLeft = -3e3),
          (n.shadowCameraTop = 3e3),
          (n.shadowCameraBottom = -3e3),
          (n.shadowBias = 1e-4),
          (n.shadowDarkness = 0.7),
          (n.shadowMapWidth = 2048),
          (n.shadowMapHeight = 2048)),
        l.add(n);
      var h = e.createMesh(
          l,
          this.lib.get("geometries", "ship.feisar"),
          -2268,
          10,
          -886,
          this.materials.ship
        ),
        u = e.createMesh(
          h,
          this.lib.get("geometries", "booster"),
          0,
          0.665,
          -3.8,
          this.materials.booster
        );
      u.depthWrite = !1;
      var b = new THREE.Sprite({
        map: this.lib.get("textures", "booster.sprite"),
        blending: THREE.AdditiveBlending,
        useScreenCoordinates: !1,
        color: 16777215,
      });
      b.scale.set(0.02, 0.02, 0.02), (b.mergeWith3D = !1), u.add(b);
      var g = new THREE.PointLight(41727, 4, 60);
      g.position.set(0, 0.665, -4), s > 0 && h.add(g);
      var d = new bkcore.hexgl.ShipControls(e);
      (d.collisionMap = this.lib.get("analysers", "track.cityscape.collision")),
        (d.collisionPixelRatio = 2048 / 6e3),
        (d.collisionDetection = !0),
        (d.heightMap = this.lib.get("analysers", "track.cityscape.height")),
        (d.heightPixelRatio = 2048 / 6e3),
        (d.heightBias = 4),
        (d.heightScale = 10),
        d.control(h),
        (e.components.shipControls = d),
        e.tweakShipControls();
      var f = {
        scene: l,
        shipControls: d,
        booster: u,
        boosterSprite: b,
        boosterLight: g,
        useParticles: !1,
      };
      s > 0 &&
        !t &&
        ((f.textureCloud = this.lib.get("textures", "cloud")),
        (f.textureSpark = this.lib.get("textures", "spark")),
        (f.useParticles = !0)),
        (e.components.shipEffects = new bkcore.hexgl.ShipEffects(f)),
        e.createMesh(
          l,
          this.lib.get("geometries", "track.cityscape"),
          0,
          -5,
          0,
          this.materials.track
        ),
        e.createMesh(
          l,
          this.lib.get("geometries", "bonus.base"),
          0,
          -5,
          0,
          this.materials.bonusBase
        ),
        (e.createMesh(
          l,
          this.lib.get("geometries", "track.cityscape.bonus.speed"),
          0,
          -5,
          0,
          this.materials.bonusSpeed
        ).receiveShadow = !1),
        e.createMesh(
          l,
          this.lib.get("geometries", "track.cityscape.scrapers1"),
          0,
          0,
          0,
          this.materials.scrapers1
        ),
        e.createMesh(
          l,
          this.lib.get("geometries", "track.cityscape.scrapers2"),
          0,
          0,
          0,
          this.materials.scrapers2
        ),
        e.createMesh(
          l,
          this.lib.get("geometries", "track.cityscape.start"),
          0,
          -5,
          0,
          this.materials.start
        ),
        (e.createMesh(
          l,
          this.lib.get("geometries", "track.cityscape.start.banner"),
          0,
          -5,
          0,
          this.materials.startBanner
        ).doubleSided = !0),
        (e.components.cameraChase = new bkcore.hexgl.CameraChase({
          target: h,
          camera: p,
          cameraCube: e.manager.get("sky").camera,
          lerp: 0.5,
          yoffset: 8,
          zoffset: 10,
          viewOffset: 10,
        })),
        e.manager.add(
          "game",
          l,
          p,
          function (e, s) {
            e > 25 && this.objects.lowFPS < 1e3 && this.objects.lowFPS++;
            var t = e / 16.6;
            this.objects.components.shipControls.update(t),
              this.objects.components.shipEffects.update(t),
              this.objects.components.cameraChase.update(
                t,
                this.objects.components.shipControls.getSpeedRatio()
              ),
              this.objects.composers.game.render(t),
              this.objects.hud &&
                this.objects.hud.update(
                  this.objects.components.shipControls.getRealSpeed(100),
                  this.objects.components.shipControls.getRealSpeedRatio(),
                  this.objects.components.shipControls.getShield(100),
                  this.objects.components.shipControls.getShieldRatio()
                ),
              0.2 > this.objects.components.shipControls.getShieldRatio()
                ? this.objects.extras.vignetteColor.setHex(10035232)
                : this.objects.extras.vignetteColor.setHex(4557489);
          },
          {
            components: e.components,
            composers: e.composers,
            extras: e.extras,
            quality: s,
            hud: e.hud,
            time: 0,
            lowFPS: 0,
          }
        );
    },
  });