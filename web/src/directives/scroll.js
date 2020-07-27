/*eslint-disable */
let touchstart, touchmove, touchend;
export default {
  inserted(el, binding, vnode) {
    const parentNode = document.getElementById('app');
    let startX, scrollTop;
    touchstart = e => {
      e.stopPropagation();
      startX = e.touches[0].clientX;
      scrollTop = parentNode.scrollTop;
    };

    touchmove = e => {
      const deltaX = e.touches[0].clientX - startX;
      console.log(parentNode.scrollTop);
      parentNode.scrollTop = scrollTop + deltaX;
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
