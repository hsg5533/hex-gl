var bkcore = bkcore || {};
(bkcore.Audio = {}),
  (bkcore.Audio.sounds = {}),
  (bkcore.Audio.init = function () {
    window.AudioContext || window.webkitAudioContext
      ? ((bkcore.Audio._ctx = new (window.AudioContext ||
          window.webkitAudioContext)()),
        (bkcore.Audio._panner = bkcore.Audio._ctx.createPanner()),
        bkcore.Audio._panner.connect(bkcore.Audio._ctx.destination))
      : (bkcore.Audio._ctx = null),
      (bkcore.Audio.posMultipler = 1.5);
  }),
  bkcore.Audio.init(),
  (bkcore.Audio.addSound = function (o, e, u, n, r) {
    var i = bkcore.Audio._ctx,
      c = new Audio();
    if (i) {
      var c = { src: null, gainNode: null, bufferNode: null, loop: u },
        d = new XMLHttpRequest();
      (d.responseType = "arraybuffer"),
        (d.onload = function () {
          i.decodeAudioData(
            d.response,
            function (o) {
              var e = i.createGain();
              !0 === r
                ? e.connect(bkcore.Audio._panner)
                : e.connect(i.destination),
                (c.src = o),
                (c.gainNode = e),
                n();
            },
            function (o) {
              console.error("Audio decode failed!", o);
            }
          );
        }),
        d.open("GET", o, !0),
        d.send(null);
    } else
      c.addEventListener(
        "canplay",
        function () {
          c.pause(), (c.currentTime = 0), n();
        },
        !1
      ),
        (c.autoplay = !0),
        (c.loop = u),
        (c.src = o);
    bkcore.Audio.sounds[e] = c;
  }),
  (bkcore.Audio.play = function (o) {
    var e = bkcore.Audio._ctx;
    if (e) {
      var u = e.createBufferSource();
      u.connect(bkcore.Audio.sounds[o].gainNode),
        (u.buffer = bkcore.Audio.sounds[o].src),
        (u.loop = bkcore.Audio.sounds[o].loop),
        (bkcore.Audio.sounds[o].gainNode.gain.value = 1),
        (bkcore.Audio.sounds[o].bufferNode = u),
        u.start ? u.start(0) : u.noteOn(0);
    } else
      bkcore.Audio.sounds[o].currentTime > 0 &&
        (bkcore.Audio.sounds[o].pause(),
        (bkcore.Audio.sounds[o].currentTime = 0)),
        bkcore.Audio.sounds[o].play();
  }),
  (bkcore.Audio.stop = function (o) {
    var e = bkcore.Audio._ctx;
    if (e) {
      if (null !== bkcore.Audio.sounds[o].bufferNode) {
        var u = bkcore.Audio.sounds[o].bufferNode;
        u.stop ? u.stop(e.currentTime) : u.noteOff(e.currentTime);
      }
    } else
      bkcore.Audio.sounds[o].pause(), (bkcore.Audio.sounds[o].currentTime = 0);
  }),
  (bkcore.Audio.volume = function (o, e) {
    bkcore.Audio._ctx
      ? (bkcore.Audio.sounds[o].gainNode.gain.value = e)
      : (bkcore.Audio.sounds[o].volume = e);
  }),
  (bkcore.Audio.setListenerPos = function (o) {
    if (bkcore.Audio._ctx) {
      var e = bkcore.Audio._panner,
        u = o.normalize();
      e.setPosition(
        u.x * bkcore.Audio.posMultipler,
        u.y * bkcore.Audio.posMultipler,
        u.z * bkcore.Audio.posMultipler
      );
    }
  }),
  (bkcore.Audio.setListenerVelocity = function (o) {
    bkcore.Audio._ctx && bkcore.Audio._panner;
  });
