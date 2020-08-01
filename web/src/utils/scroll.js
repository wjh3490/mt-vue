export function scrollToEase(el, start, to, duration = 200, callback) {
  const change = to - start;

  const increment = 20;
  let currentTime = 0;

  var animate = function() {
    currentTime += increment;
    var val = easeOutQuart(currentTime, start, change, duration);
    el.scrollTop = val;

    if (currentTime < duration) {
      requestAnimFrame(animate);
    } else {
      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  };
  animate();
}
var requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function easeOutQuart(t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}
