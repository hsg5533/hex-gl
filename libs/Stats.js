var Stats = function () {
  var e = Date.now(),
    t = e,
    n = 0,
    i = 1e3,
    l = 0,
    a = 0,
    d = 1e3,
    s = 0,
    o = 0,
    r = 0,
    p = document.createElement("div");
  (p.id = "stats"),
    p.addEventListener(
      "mousedown",
      function (e) {
        e.preventDefault(), m(++r % 2);
      },
      !1
    ),
    (p.style.cssText = "width:80px;opacity:0.9;cursor:pointer");
  var c = document.createElement("div");
  (c.id = "fps"),
    (c.style.cssText =
      "padding:0 0 3px 3px;text-align:left;background-color:#002"),
    p.appendChild(c);
  var h = document.createElement("div");
  (h.id = "fpsText"),
    (h.style.cssText =
      "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px"),
    (h.innerHTML = "FPS"),
    c.appendChild(h);
  var $ = document.createElement("div");
  for (
    $.id = "fpsGraph",
      $.style.cssText =
        "position:relative;width:74px;height:30px;background-color:#0ff",
      c.appendChild($);
    74 > $.children.length;

  ) {
    var f = document.createElement("span");
    (f.style.cssText =
      "width:1px;height:30px;float:left;background-color:#113"),
      $.appendChild(f);
  }
  var x = document.createElement("div");
  (x.id = "ms"),
    (x.style.cssText =
      "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none"),
    p.appendChild(x);
  var v = document.createElement("div");
  (v.id = "msText"),
    (v.style.cssText =
      "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px"),
    (v.innerHTML = "MS"),
    x.appendChild(v);
  var g = document.createElement("div");
  for (
    g.id = "msGraph",
      g.style.cssText =
        "position:relative;width:74px;height:30px;background-color:#0f0",
      x.appendChild(g);
    74 > g.children.length;

  )
    ((f = document.createElement("span")).style.cssText =
      "width:1px;height:30px;float:left;background-color:#131"),
      g.appendChild(f);
  var m = function (e) {
    switch ((r = e)) {
      case 0:
        (c.style.display = "block"), (x.style.display = "none");
        break;
      case 1:
        (c.style.display = "none"), (x.style.display = "block");
    }
  };
  return {
    domElement: p,
    setMode: m,
    begin: function () {
      e = Date.now();
    },
    end: function () {
      var r = Date.now();
      (i = Math.min(i, (n = r - e))),
        (l = Math.max(l, n)),
        (v.textContent = n + " MS (" + i + "-" + l + ")");
      var p = Math.min(30, 30 - 30 * (n / 200));
      return (
        (g.appendChild(g.firstChild).style.height = p + "px"),
        o++,
        r > t + 1e3 &&
          ((d = Math.min(d, (a = Math.round((1e3 * o) / (r - t))))),
          (s = Math.max(s, a)),
          (h.textContent = a + " FPS (" + d + "-" + s + ")"),
          (p = Math.min(30, 30 - 30 * (a / 100))),
          ($.appendChild($.firstChild).style.height = p + "px"),
          (t = r),
          (o = 0)),
        r
      );
    },
    update: function () {
      e = this.end();
    },
  };
};
