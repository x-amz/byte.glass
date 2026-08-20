// The corner clock: the current unix time, four bytes, base-256 encoded.
// The mapping matches swift-base256-blob exactly — high nibble = left dot
// column, low nibble = right, most significant bit at the top.
(function () {
  var el = document.getElementById('clock');
  if (!el) return;
  function enc(b) {
    var hi = b >> 4, lo = b & 15, o = 0;
    if (hi & 8) o |= 0x01;  // dot 1
    if (hi & 4) o |= 0x02;  // dot 2
    if (hi & 2) o |= 0x04;  // dot 3
    if (hi & 1) o |= 0x40;  // dot 7
    if (lo & 8) o |= 0x08;  // dot 4
    if (lo & 4) o |= 0x10;  // dot 5
    if (lo & 2) o |= 0x20;  // dot 6
    if (lo & 1) o |= 0x80;  // dot 8
    return String.fromCodePoint(0x2800 + o);
  }
  function tick() {
    var t = Math.floor(Date.now() / 1000);
    el.textContent = [t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, t & 255].map(enc).join('');
  }
  tick();
  if (!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    setInterval(tick, 1000);
  }
})();
