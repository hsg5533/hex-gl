(function () {
  var e, t;
  (e = (function () {
    function e() {}
    return (
      (e.createNormalMaterial = function (e) {
        var t, n, r, l, a;
        return (
          null == e && (e = {}),
          null == e.ambient && (e.ambient = 4473924),
          null == e.normalScale && (e.normalScale = 1),
          null == e.reflectivity && (e.reflectivity = 0.9),
          null == e.shininess && (e.shininess = 42),
          null == e.metal && (e.metal = !1),
          (l = e.perPixel ? "normalV" : "normal"),
          (r = bkcore.threejs.Shaders[l]),
          ((a = THREE.UniformsUtils.clone(r.uniforms)).enableDiffuse.value =
            !0),
          (a.enableSpecular.value = !0),
          (a.enableReflection.value = !!e.cube),
          (a.tNormal.texture = e.normal),
          (a.tDiffuse.texture = e.diffuse),
          (a.tSpecular.texture = e.specular),
          a.uAmbientColor.value.setHex(e.ambient),
          a.uAmbientColor.value.convertGammaToLinear(),
          (a.uNormalScale.value = e.normalScale),
          null != e.cube &&
            ((a.tCube.texture = e.cube),
            (a.uReflectivity.value = e.reflectivity)),
          (n = {
            fragmentShader: r.fragmentShader,
            vertexShader: r.vertexShader,
            uniforms: a,
            lights: !0,
            fog: !1,
          }),
          ((t = new THREE.ShaderMaterial(n)).perPixel = !0),
          (t.metal = e.metal),
          t
        );
      }),
      (e.projectOnScreen = function (e, t) {
        var n, r, l;
        return (
          (l = new THREE.Matrix4()).multiply(
            t.matrixWorldInverse,
            e.matrixWorld
          ),
          l.multiply(t.projectionMatrix, l),
          (n = l.n44),
          (r = new THREE.Vector3(l.n14 / n, l.n24 / n, l.n34 / n))
            .multiplyScalar(0.5)
            .addScalar(0.5)
        );
      }),
      (e.URLParameters = null),
      (e.getURLParameter = function (e) {
        if (null == this.URLParameters) {
          var t;
          (this.URLParameters = {}),
            window.location.href.replace(
              /[?&]+([^=&]+)=([^&]*)/gi,
              ((t = this),
              function (e, n, r) {
                return (t.URLParameters[n] = r);
              })
            );
        }
        return this.URLParameters[e];
      }),
      (e.getOffsetTop = function (e) {
        var t;
        if (((t = e.offsetTop), e.offsetParent))
          for (; (e = e.offsetParent); ) t += e.offsetTop;
        return t;
      }),
      (e.scrollTo = function (e) {
        return window.scroll(0, this.getOffsetTop(document.getElementById(e)));
      }),
      (e.updateClass = function (e, t, n) {
        var r;
        return null == (r = document.getElementById(e))
          ? void 0
          : n
          ? r.classList.add(t)
          : r.classList.remove(t);
      }),
      (e.request = function (e, t, n, r) {
        var l, a, u, i, o, c, s;
        if (
          ((l = [
            function () {
              return new XMLHttpRequest();
            },
            function () {
              return new ActiveXObject("Msxml2.XMLHTTP");
            },
            function () {
              return new ActiveXObject("Msxml3.XMLHTTP");
            },
            function () {
              return new ActiveXObject("Microsoft.XMLHTTP");
            },
          ]),
          null !=
            (c = (a = function () {
              var e, t, n, r, a;
              for (
                n = !1, t = r = 0, a = l.length;
                0 <= a ? r <= a : r >= a;
                t = 0 <= a ? ++r : --r
              ) {
                try {
                  n = l[t]();
                } catch (u) {
                  e = u;
                  continue;
                }
                break;
              }
              return n;
            })()))
        ) {
          if (((i = null != t ? "POST" : "GET"), (o = "o=bk"), null != r))
            for (u in r)
              (s = r[u]), (o += "&" + u + "=" + s), null != t && (e += "?" + o);
          return (
            c.open(i, e, !0),
            null != t &&
              c.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded"
              ),
            (c.onreadystatechange = function () {
              if (4 === c.readyState && (200 === c.status || 304 === c.status))
                return "function" == typeof n ? n(c) : void 0;
            }),
            c.send(o),
            c
          );
        }
      }),
      (e.isTouchDevice = function () {
        return (
          "ontouchstart" in window ||
          navigator.MaxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0
        );
      }),
      e
    );
  })()),
    (t = null != t ? t : this).bkcore || (t.bkcore = {}),
    (t.bkcore.Utils = e);
}).call(this);
