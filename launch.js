(function () {
  var t, e, n, o, r, l, i, c, s, a, u;
  for (
    a = 0,
      t = function (t) {
        return document.getElementById(t);
      },
      l = function (e, n, o, r) {
        var l, i;
        return (
          (l = new bkcore.hexgl.HexGL({
            document: document,
            width: window.innerWidth,
            height: window.innerHeight,
            container: t("main"),
            overlay: t("overlay"),
            gameover: t("step-5"),
            quality: n,
            difficulty: 0,
            hud: 1 === o,
            controlType: e,
            godmode: r,
            track: "Cityscape",
          })),
          (window.hexGL = l),
          (i = t("progressbar")),
          l.load({
            onLoad: function () {
              return (
                console.log("LOADED."),
                l.init(),
                (t("step-3").style.display = "none"),
                (t("step-4").style.display = "block"),
                l.start()
              );
            },
            onError: function (t) {
              return console.error("Error loading " + t + ".");
            },
            onProgress: function (t, e, n) {
              return (
                console.log(
                  "LOADED " +
                    e +
                    " : " +
                    n +
                    " ( " +
                    t.loaded +
                    " / " +
                    t.total +
                    " )."
                ),
                (i.style.width = "" + (t.loaded / t.total) * 100 + "%")
              );
            },
          })
        );
      },
      c = bkcore.Utils.getURLParameter,
      i = [
        [
          "controlType",
          ["KEYBOARD", "TOUCH", "LEAP MOTION CONTROLLER", "GAMEPAD"],
          (n = bkcore.Utils.isTouchDevice() ? 1 : 0),
          n,
          "Controls: ",
        ],
        ["quality", ["LOW", "MID", "HIGH", "VERY HIGH"], 3, 3, "Quality: "],
        ["hud", ["OFF", "ON"], 1, 1, "HUD: "],
        ["godmode", ["OFF", "ON"], 0, 1, "Godmode: "],
      ],
      s = function (e) {
        var n, o, r;
        return (
          (e[3] = null != (r = c(e[0])) ? r : e[2]),
          (n = t("s-" + e[0])),
          (o = function () {
            return (n.innerHTML = e[4] + e[1][e[3]]);
          })(),
          (n.onclick = function () {
            return o((e[3] = (e[3] + 1) % e[1].length));
          })
        );
      },
      u = i.length;
    a < u;
    a++
  )
    s((e = i[a]));
  (t("step-2").onclick = function () {
    return (
      (t("step-2").style.display = "none"),
      (t("step-3").style.display = "block"),
      l(i[0][3], i[1][3], i[2][3], i[3][3])
    );
  }),
    (t("step-5").onclick = function () {
      return window.location.reload();
    }),
    (t("s-credits").onclick = function () {
      return (
        (t("step-1").style.display = "none"),
        (t("credits").style.display = "block")
      );
    }),
    (t("credits").onclick = function () {
      return (
        (t("step-1").style.display = "block"),
        (t("credits").style.display = "none")
      );
    }),
    (r = function () {
      var t, e;
      (e = null), (t = document.createElement("canvas"));
      try {
        e = t.getContext("webgl");
      } catch (n) {}
      if (null == e)
        try {
          e = t.getContext("experimental-webgl");
        } catch (o) {}
      return null != e;
    })()
      ? (t("start").onclick = function () {
          return (
            (t("step-1").style.display = "none"),
            (t("step-2").style.display = "block"),
            (t("step-2").style.backgroundImage =
              "url(css/help-" + i[0][3] + ".png)")
          );
        })
      : (((o = t("start")).innerHTML = "WebGL is not supported!"),
        (o.onclick = function () {
          return (window.location.href = "http://get.webgl.org/");
        }));
}).call(this);
