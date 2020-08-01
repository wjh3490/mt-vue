<template functional>
  <div class="cate">
    <ul class="clearfix">
      <li class="fl" v-for="(item, index) in props.list" :key="index">
        {{ item.content }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CommentLabel',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.cate {
  ul {
    padding: 15 / @base 14 / @base 5 / @base 14 / @base;
    background: #fff;
    margin-top: 10 / @base;
    color: #666;
    position: relative;
    li {
      padding: 0 12 / @base;
      height: 26 / @base;
      line-height: 24 / @base;
      margin: 0 10 / @base 10 / @base 0;
      font-size: 13 / @base;
      text-align: center;
      color: #666;
      border: 1 / @base solid #bbb;
      border-radius: 25 / @base;
      &:nth-child(1) {
        background: #fffbf1;
        color: #ffb000;
        border: 1 / @base solid #ffb000;
      }
      &.activeRete {
        background: #fffbf1;
        color: #ffb000;
        border: 1 / @base solid #ffb000;
      }
    }
  }
}
</style>
