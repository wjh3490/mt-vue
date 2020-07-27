export default {
  path: '/comment',
  component: () => import(/* webpackChunkName: 'comment' */'@/views/comment/index.vue'),
  meta: {
    currentIndex: 2
  }
}
