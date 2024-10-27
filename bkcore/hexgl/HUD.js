var bkcore = bkcore || {};
(bkcore.hexgl = bkcore.hexgl || {}),
  (bkcore.hexgl.HUD = function (t) {
    (this.visible = !0),
      (this.messageOnly = !1),
      (this.width = t.width),
      (this.height = t.height),
      (this.canvas = document.createElement("canvas")),
      (this.canvas.width = this.width),
      (this.canvas.height = this.height),
      (this.ctx = this.canvas.getContext("2d")),
      (this.ctx.textAlign = "center"),
      (this.bg = t.bg),
      (this.fgspeed = t.speed),
      (this.fgshield = t.shield),
      (this.speedFontRatio = 24),
      (this.speedBarRatio = 2.91),
      (this.shieldFontRatio = 64),
      (this.shieldBarYRatio = 34),
      (this.shieldBarWRatio = 18.3),
      (this.shieldBarHRatio = 14.3),
      (this.timeMarginRatio = 18),
      (this.timeFontRatio = 19.2),
      (this.font = t.font || "Arial"),
      (this.time = ""),
      (this.message = ""),
      (this.previousMessage = ""),
      (this.messageTiming = 0),
      (this.messagePos = 0),
      (this.messagePosTarget = 0),
      (this.messagePosTargetRatio = 12),
      (this.messageA = 1),
      (this.messageAS = 1),
      (this.messageDuration = 120),
      (this.messageDurationD = 120),
      (this.messageDurationS = 30),
      (this.messageYRatio = 34),
      (this.messageFontRatio = 10),
      (this.messageFontRatioStart = 6),
      (this.messageFontRatioEnd = 10),
      (this.messageFontLerp = 0.4),
      (this.messageLerp = 0.4),
      (this.messageFontAlpha = 0.8),
      (this.lapMarginRatio = 14),
      (this.lap = ""),
      (this.lapSeparator = "/"),
      (this.timeSeparators = ["", "'", "''", ""]),
      (this.step = 0),
      (this.maxStep = 2);
  }),
  (bkcore.hexgl.HUD.prototype.resize = function (t, s) {
    (this.width = t),
      (this.height = s),
      (this.canvas.width = t),
      (this.canvas.height = s);
  }),
  (bkcore.hexgl.HUD.prototype.display = function (t, s) {
    (this.messageTiming = 0),
      "" != this.message &&
        ((this.messageA = this.messageFontAlpha),
        (this.messagePos = 0),
        (this.messagePosTarget = this.width / this.messagePosTargetRatio),
        (this.previousMessage = this.message)),
      (this.messageFontRatio = this.messageFontRatioStart),
      (this.messageAS = 0),
      (this.message = t),
      (this.messageDuration = void 0 == s ? this.messageDurationD : 60 * s);
  }),
  (bkcore.hexgl.HUD.prototype.updateLap = function (t, s) {
    this.lap = t + this.lapSeparator + s;
  }),
  (bkcore.hexgl.HUD.prototype.resetLap = function () {
    this.lap = "";
  }),
  (bkcore.hexgl.HUD.prototype.updateTime = function (t) {
    this.time =
      this.timeSeparators[0] +
      t.m +
      this.timeSeparators[1] +
      t.s +
      this.timeSeparators[2] +
      t.ms +
      this.timeSeparators[3];
  }),
  (bkcore.hexgl.HUD.prototype.resetTime = function () {
    this.time = "";
  }),
  (bkcore.hexgl.HUD.prototype.update = function (t, s, i, e) {
    var h = this.width,
      a = this.height,
      o = h / 2;
    if (!this.visible) {
      this.ctx.clearRect(0, 0, h, a);
      return;
    }
    var g = this.bg.width,
      m = this.bg.height,
      n = h,
      r = n * (m / g),
      l = a - r,
      c = r,
      p = (h / this.speedBarRatio) * s,
      x = h / this.shieldBarWRatio,
      $ = h / this.shieldBarHRatio,
      f = $ * e,
      d = h / this.shieldBarYRatio + $ - f;
    if (0 == this.step)
      this.ctx.clearRect(0, l, h, r),
        this.messageOnly ||
          (this.ctx.drawImage(this.bg, 0, l, n, r),
          this.ctx.save(),
          this.ctx.beginPath(),
          this.ctx.moveTo(p + c + o, l),
          this.ctx.lineTo(-(p + c) + o, l),
          this.ctx.lineTo(-p + o, a),
          this.ctx.lineTo(p + o, a),
          this.ctx.lineTo(p + c + o, l),
          this.ctx.clip(),
          this.ctx.drawImage(this.fgspeed, 0, l, n, r),
          this.ctx.restore(),
          this.ctx.save(),
          this.ctx.beginPath(),
          this.ctx.moveTo(-x + o, l + d),
          this.ctx.lineTo(x + o, l + d),
          this.ctx.lineTo(x + o, l + f + d),
          this.ctx.lineTo(-x + o, l + f + d),
          this.ctx.lineTo(-x + o, l + f),
          this.ctx.clip(),
          this.ctx.drawImage(this.fgshield, 0, l, n, r),
          this.ctx.restore(),
          (this.ctx.font = h / this.speedFontRatio + "px " + this.font),
          (this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)"),
          this.ctx.fillText(t, o, a - 0.57 * r),
          (this.ctx.font = h / this.shieldFontRatio + "px " + this.font),
          (this.ctx.fillStyle = "rgba(255, 255, 255, 0.4)"),
          this.ctx.fillText(i, o, a - 0.44 * r));
    else if (1 == this.step) {
      this.ctx.clearRect(0, 0, h, l),
        "" != this.time &&
          ((this.ctx.font = h / this.timeFontRatio + "px " + this.font),
          (this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)"),
          this.ctx.fillText(this.time, o, h / this.timeMarginRatio)),
        "" != this.lap &&
          ((this.ctx.font = h / this.timeFontRatio + "px " + this.font),
          (this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)"),
          this.ctx.fillText(
            this.lap,
            h - h / this.lapMarginRatio,
            h / this.timeMarginRatio
          ));
      var R = a / 2 - h / this.messageYRatio;
      this.messageTiming > this.messageDuration + 2e3
        ? ((this.previousMessage = ""),
          (this.message = ""),
          (this.messageA = 0))
        : this.messageTiming > this.messageDuration &&
          "" != this.message &&
          ((this.previousMessage = this.message),
          (this.message = ""),
          (this.messagePos = 0),
          (this.messagePosTarget = h / this.messagePosTargetRatio),
          (this.messageA = this.messageFontAlpha)),
        "" != this.previousMessage &&
          (this.messageA < 0.001
            ? (this.messageA = 0)
            : (this.messageA += (0 - this.messageA) * this.messageLerp),
          (this.messagePos +=
            (this.messagePosTarget - this.messagePos) * this.messageLerp),
          (this.ctx.font = h / this.messageFontRatioEnd + "px " + this.font),
          (this.ctx.fillStyle = "rgba(255, 255, 255, " + this.messageA + ")"),
          this.ctx.fillText(this.previousMessage, o, R + this.messagePos)),
        "" != this.message &&
          (this.messageTiming < this.messageDurationS
            ? ((this.messageAS +=
                (this.messageFontAlpha - this.messageAS) *
                this.messageFontLerp),
              (this.messageFontRatio +=
                (this.messageFontRatioEnd - this.messageFontRatio) *
                this.messageFontLerp))
            : ((this.messageAS = this.messageFontAlpha),
              (this.messageFontRatio = this.messageFontRatioEnd)),
          (this.ctx.font = h / this.messageFontRatio + "px " + this.font),
          (this.ctx.fillStyle = "rgba(255, 255, 255, " + this.messageAS + ")"),
          this.ctx.fillText(this.message, o, R));
    }
    this.messageTiming++,
      this.step++,
      this.step == this.maxStep && (this.step = 0);
  });
