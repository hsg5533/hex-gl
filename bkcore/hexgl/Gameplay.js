var bkcore = bkcore || {};
(bkcore.hexgl = bkcore.hexgl || {}),
  (bkcore.hexgl.Gameplay = function (t) {
    var s = this;
    (this.startDelay = null == t.hud ? 0 : 1e3),
      (this.countDownDelay = null == t.hud ? 1e3 : 1500),
      (this.active = !1),
      (this.timer = new bkcore.Timer()),
      (this.modes = { timeattack: null, survival: null, replay: null }),
      (this.mode =
        void 0 != t.mode && t.mode in this.modes ? t.mode : "timeattack"),
      (this.step = 0),
      (this.hud = t.hud),
      (this.shipControls = t.shipControls),
      (this.cameraControls = t.cameraControls),
      (this.track = t.track),
      (this.analyser = t.analyser),
      (this.pixelRatio = t.pixelRatio),
      (this.previousCheckPoint = -1),
      (this.results = {
        FINISH: 1,
        DESTROYED: 2,
        WRONGWAY: 3,
        REPLAY: 4,
        NONE: -1,
      }),
      (this.result = this.results.NONE),
      (this.lap = 1),
      (this.lapTimes = []),
      (this.lapTimeElapsed = 0),
      (this.maxLaps = 3),
      (this.score = null),
      (this.finishTime = null),
      (this.onFinish =
        void 0 == t.onFinish
          ? function () {
              console.log("FINISH");
            }
          : t.onFinish),
      (this.raceData = null),
      (this.modes.timeattack = function () {
        s.raceData.tick(this.timer.time.elapsed),
          null != s.hud && s.hud.updateTime(s.timer.getElapsedTime());
        var t = s.checkPoint();
        if (
          t == s.track.checkpoints.start &&
          s.previousCheckPoint == s.track.checkpoints.last
        ) {
          s.previousCheckPoint = t;
          var i = s.timer.time.elapsed;
          s.lapTimes.push(i - s.lapTimeElapsed),
            (s.lapTimeElapsed = i),
            s.lap == this.maxLaps
              ? s.end(s.results.FINISH)
              : (s.lap++,
                null != s.hud && s.hud.updateLap(s.lap, s.maxLaps),
                s.lap == s.maxLaps &&
                  null != s.hud &&
                  s.hud.display("Final lap", 0.5));
        } else
          -1 != t && t != s.previousCheckPoint && (s.previousCheckPoint = t);
        !0 == s.shipControls.destroyed && s.end(s.results.DESTROYED);
      }),
      (this.modes.replay = function () {
        s.raceData.applyInterpolated(this.timer.time.elapsed),
          s.raceData.seek == s.raceData.last && s.end(s.result.REPLAY);
      });
  }),
  (bkcore.hexgl.Gameplay.prototype.simu = function () {
    (this.lapTimes = [92300, 91250, 90365]),
      (this.finishTime =
        this.lapTimes[0] + this.lapTimes[1] + this.lapTimes[2]),
      null != this.hud && this.hud.display("Finish"),
      (this.step = 100),
      (this.result = this.results.FINISH),
      (this.shipControls.active = !1);
  }),
  (bkcore.hexgl.Gameplay.prototype.start = function (t) {
    if (
      ((this.finishTime = null),
      (this.score = null),
      (this.lap = 1),
      this.shipControls.reset(this.track.spawn, this.track.spawnRotation),
      (this.shipControls.active = !1),
      (this.previousCheckPoint = this.track.checkpoints.start),
      (this.raceData = new bkcore.hexgl.RaceData(
        this.track.name,
        this.mode,
        this.shipControls
      )),
      "replay" == this.mode)
    ) {
      (this.cameraControls.mode = this.cameraControls.modes.ORBIT),
        null != this.hud && (this.hud.messageOnly = !0);
      try {
        var s = localStorage["race-" + this.track.name + "-replay"];
        if (void 0 == s)
          return (
            console.error(
              "No replay data for race-" + this.track.name + "-replay."
            ),
            !1
          );
        this.raceData.import(JSON.parse(s));
      } catch (i) {
        return console.error("Bad replay format : " + i), !1;
      }
    }
    (this.active = !0),
      (this.step = 0),
      this.timer.start(),
      null != this.hud &&
        (this.hud.resetTime(),
        this.hud.display("Get ready", 1),
        this.hud.updateLap(this.lap, this.maxLaps));
  }),
  (bkcore.hexgl.Gameplay.prototype.end = function (t) {
    (this.score = this.timer.getElapsedTime()),
      (this.finishTime = this.timer.time.elapsed),
      this.timer.start(),
      (this.result = t),
      (this.shipControls.active = !1),
      t == this.results.FINISH
        ? (null != this.hud && this.hud.display("Finish"), (this.step = 100))
        : t == this.results.DESTROYED &&
          (null != this.hud && this.hud.display("Destroyed"),
          (this.step = 100));
  }),
  (bkcore.hexgl.Gameplay.prototype.update = function () {
    this.active &&
      (this.timer.update(),
      0 == this.step &&
      this.timer.time.elapsed >= this.countDownDelay + this.startDelay
        ? (null != this.hud && this.hud.display("3"), (this.step = 1))
        : 1 == this.step &&
          this.timer.time.elapsed >= 2 * this.countDownDelay + this.startDelay
        ? (null != this.hud && this.hud.display("2"), (this.step = 2))
        : 2 == this.step &&
          this.timer.time.elapsed >= 3 * this.countDownDelay + this.startDelay
        ? (null != this.hud && this.hud.display("1"), (this.step = 3))
        : 3 == this.step &&
          this.timer.time.elapsed >= 4 * this.countDownDelay + this.startDelay
        ? (null != this.hud && this.hud.display("Go", 0.5),
          (this.step = 4),
          this.timer.start(),
          "replay" != this.mode && (this.shipControls.active = !0))
        : 4 == this.step
        ? this.modes[this.mode].call(this)
        : 100 == this.step &&
          this.timer.time.elapsed >= 2e3 &&
          ((this.active = !1), this.onFinish.call(this)));
  }),
  (bkcore.hexgl.Gameplay.prototype.checkPoint = function () {
    var t = Math.round(
        this.analyser.pixels.width / 2 +
          this.shipControls.dummy.position.x * this.pixelRatio
      ),
      s = Math.round(
        this.analyser.pixels.height / 2 +
          this.shipControls.dummy.position.z * this.pixelRatio
      ),
      i = this.analyser.getPixel(t, s);
    return 255 == i.r && 255 == i.g && i.b < 250 ? i.b : -1;
  });
