export default {
  path: '/food',
  component: () => import(/* webpackChunkName: 'food' */'@/views/food/index.vue'),
  meta: {
    currentIndex: 1
  }
}
