var Detector = {
  canvas: !!window.CanvasRenderingContext2D,
  webgl: (function () {
    try {
      return (
        !!window.WebGLRenderingContext &&
        !!document.createElement("canvas").getContext("experimental-webgl")
      );
    } catch (e) {
      return !1;
    }
  })(),
  workers: !!window.Worker,
  fileapi: window.File && window.FileReader && window.FileList && window.Blob,
  getWebGLErrorMessage: function () {
    var e = document.createElement("div");
    return (
      (e.id = "webgl-error-message"),
      (e.style.fontFamily = "monospace"),
      (e.style.fontSize = "13px"),
      (e.style.fontWeight = "normal"),
      (e.style.textAlign = "center"),
      (e.style.background = "#fff"),
      (e.style.color = "#000"),
      (e.style.padding = "1.5em"),
      (e.style.width = "400px"),
      (e.style.margin = "5em auto 0"),
      this.webgl ||
        (e.innerHTML = window.WebGLRenderingContext
          ? 'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />\nFind out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
          : 'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>\nFind out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'),
      e
    );
  },
  addGetWebGLMessage: function (e) {
    var t, r, o;
    (t = void 0 !== (e = e || {}).parent ? e.parent : document.body),
      (r = void 0 !== e.id ? e.id : "oldie"),
      ((o = Detector.getWebGLErrorMessage()).id = r),
      t.appendChild(o);
  },
};
