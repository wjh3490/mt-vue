// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store.js';
import * as filters from './filters';

import './style/base.css';
import './utils/flexible';

import axios from 'axios';

import VueLazyLoad from 'vue-lazyload';

Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: require('./assets/lazy.png'),
  loading: require('./assets/lazy.png'),
  attempt: 2
})
// 设置基路径
// axios.defaults.baseURL =
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
// 设置全局 filters

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
new Vue({
  render: h => h(App),
  store,
  router,
  components: { App }
}).$mount('#app');

