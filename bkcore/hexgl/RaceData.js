var bkcore = bkcore || {};
(bkcore.hexgl = bkcore.hexgl || {}),
  (bkcore.hexgl.RaceData = function (t, e, s) {
    (this.track = t),
      (this.mode = e),
      (this.shipControls = s),
      (this.rate = 2),
      (this.rateState = 1),
      (this.data = []),
      (this.last = -1),
      (this.seek = 0),
      (this._p = new THREE.Vector3()),
      (this._pp = new THREE.Vector3()),
      (this._np = new THREE.Vector3()),
      (this._q = new THREE.Quaternion()),
      (this._pq = new THREE.Quaternion()),
      (this._nq = new THREE.Quaternion());
  }),
  (bkcore.hexgl.RaceData.prototype.tick = function (t) {
    if (1 == this.rateState) {
      var e = this.shipControls.getPosition(),
        s = this.shipControls.getQuaternion();
      this.data.push([t, e.x, e.y, e.z, s.x, s.y, s.z, s.w]), ++this.last;
    } else this.rateState == this.rate && (this.rateState = 0);
    this.rate++;
  }),
  (bkcore.hexgl.RaceData.prototype.applyInterpolated = function (t) {
    for (; this.seek < this.last && this.data[this.seek + 1][0] < t; )
      ++this.seek;
    var e = this.data[this.seek];
    if (
      (this._pp.set(e[1], e[2], e[3]),
      this._pq.set(e[4], e[5], e[6], e[7]),
      this.seek < 0)
    ) {
      console.warn("Bad race data.");
      return;
    }
    (this.seek == this.last || 0 == this.seek) &&
      this.shipControls.teleport(this._pp, this._pq);
    var s = this.data[this.seek + 1];
    this._np.set(s[1], s[2], s[3]), this._nq.set(s[4], s[5], s[6], s[7]);
    var i = (t - e[0]) / (s[0] - e[0]);
    this._p.copy(this._pp).lerpSelf(this._np, i),
      this._q.copy(this._pq).slerpSelf(this._nq, i),
      this.shipControls.teleport(this._p, this._q);
  }),
  (bkcore.hexgl.RaceData.prototype.reset = function () {
    this.seek = 0;
  }),
  (bkcore.hexgl.RaceData.prototype.export = function () {
    return this.data;
  }),
  (bkcore.hexgl.RaceData.prototype.import = function (t) {
    (this.data = t), (this.last = this.data.length - 1), console.log(this.data);
  });
