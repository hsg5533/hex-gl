var bkcore = bkcore || {};
(bkcore.hexgl = bkcore.hexgl || {}),
  (bkcore.hexgl.Ladder = {}),
  (bkcore.hexgl.Ladder.global = {}),
  (bkcore.hexgl.Ladder.load = function (e) {
    var r = encodeURIComponent(window.location.href);
    bkcore.Utils.request(
      "nothing",
      !1,
      function (r) {
        try {
          (bkcore.Ladder.global = JSON.parse(r.responseText)),
            e && e.call(window);
        } catch (a) {
          console.warn("Unable to load ladder. " + a);
        }
      },
      { u: r }
    );
  }),
  (bkcore.hexgl.Ladder.displayLadder = function (e, r, a, o) {
    var d = document.getElementById(e);
    if (
      void 0 == d ||
      void 0 == bkcore.Ladder.global[r] ||
      !bkcore.Ladder.global[r][a] == void 0
    ) {
      console.warn("Undefined ladder.");
      return;
    }
    var l = bkcore.Ladder.global[r][a],
      n = "";
    l.length;
    for (var c = 0; c < l.length - 1; c++) {
      var b = bkcore.Timer.msToTime(l[c].score);
      n +=
        '<span class="ladder-row"><b>' +
        (c + 1) +
        ". " +
        l[c].name +
        "</b><i>" +
        b.m +
        "'" +
        b.s +
        "''" +
        b.ms +
        "</i></span>";
    }
    d.innerHTML = n;
  });
