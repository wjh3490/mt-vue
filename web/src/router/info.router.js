export default {
  path: '/info',
  component: () =>import(/* webpackChunkName: 'info' */'@/views/info/index.vue'),
  meta: {
    currentIndex: 3
  }
}
