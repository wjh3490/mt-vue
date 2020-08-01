import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const routerList = [];
function importAll(route) {
  route.keys().forEach(k => {
    return routerList.push(route(k).default);
  });
}

importAll(require.context('.', true, /\.router\.js/));

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/food'
    },

    ...routerList
  ]
});
