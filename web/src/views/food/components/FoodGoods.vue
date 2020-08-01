<template>
  <div class="food-right">
    <ul class="out" ref="scrollbar" @scroll="$emit('handleScroll', $event)" v-scroll>
      <li
        v-for="(item, index) in categoryList"
        :key="index"
        class="li"
        :class="{ paddingt: index === 0 }"
        ref="scrollItem"
      >
        <h3 class="title">
          {{ item.categoryName }}
        </h3>

        <food-goods-items :list="item.spuList" v-on="$listeners" />
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */

import FoodGoodsItems from './FoodGoodsItems';
import scroll from '@/directives/scroll.js'
export default {
  name: 'FoodGoods',
  components: { FoodGoodsItems },
  directives: {scroll},
  props: {
    categoryList: Array
  },
  data() {
    return {
      scrollHeights: []
    };
  },
  methods: {
    getItemHeight() {
      let height = 0;
      let liList = this.$refs.scrollItem;
      this.scrollHeights.push(height);
      for (let i = 0, length = liList.length; i < length; i++) {
        height += liList[i].clientHeight;
        this.scrollHeights.push(height);
      }
      this.$emit('getHeight', this.scrollHeights);
    }
  }
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.overflow() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.food-right {
  width: 100%;
  flex: 1;
  overflow: hidden;
  flex: 1 1;
  display: flex;
  .out {
    flex: 1 1;

    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    -webkit-scroll-behavior: smooth;
    position: relative;
    transition: all 0.5s;
    width: 100%;
    padding-bottom: 160 / @base;
    li {
      min-height: calc(100% + 1px);
    }

    .title {
      position: sticky;
      top: 0px;
      z-index: 99;
      width: 100%;
      height: 36 / @base;
      line-height: 36 / @base;
      padding-left: 10 / @base;
      font-size: 12 / @base;
      background-color: #fff;
      color: #333333;
    }
  }
}
</style>
