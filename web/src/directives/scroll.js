/*eslint-disable */
let touchstart, touchmove, touchend;
export default {
  inserted(el, binding, vnode) {
    const parentNode = document.getElementById('app');

    let startY, scrollTop;
    touchstart = e => {
      e.stopPropagation();
      startY = e.touches[0].clientY;
      scrollTop = parentNode.scrollTop;
    };

    touchmove = e => {
      const deltaY = e.touches[0].clientY - startY;
      if ((deltaY > 0 || deltaY <= 0) && scrollTop >= 170) return;
      if (Math.abs(deltaY) >= 170) return;
      parentNode.scrollTop = scrollTop + -deltaY;
    };

    touchend = e => {};

    eventListener('addEventListener', el);
  },

  unbind(el) {
    eventListener('removeEventListener', el);
  }
};

function eventListener(name, el) {
  el[name]('touchstart', touchstart, false);
  el[name]('touchmove', touchmove, false);
  el[name]('touchend', touchend, false);
}
