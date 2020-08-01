<template>
  <div class="scroller">
    <div class="navbar-container" ref="scrollbar" v-scroll>
      <ul class="navbar-main" ref="scrollItem">
        <li
          v-for="(item, index) in categoryList"
          :key="index"
          :class="{ scrollActive: id === index }"
          class="navbar-item"
          @click="handleScroll(scrollHeights[index], index, item.tag)"
        >
          <img :src="item.iconUrl" alt v-if="index === 0" class="navbar-pic" />
          <span class="navbar-category-name">{{ item.categoryName }}</span>
          <div
            v-if="typeNum[item.tag]"
            class="navbar-num"
            :class="{
              m: typeNum[item.tag] >= 10,
              g: typeNum[item.tag] > 99
            }"
          >
            {{ typeNum[item.tag] | filterNum }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import scroll from '@/directives/scroll.js'
export default {
  name: 'FoodNav',
  directives: {scroll},
  props: {
    typeNum: Object,
    categoryList: Array,
    scrollHeights: Array,
    id: Number
  },
  data() {
    return {
      active: 'act17'
    };
  },
  watch: {
    active() {
      this.adjust();
    },
    id(val) {
      this.active = this.categoryList[val].tag;
    }
  },
  mounted() {},
  methods: {
    adjust() {
      //
      this.$nextTick(() => {
        const active = this.active;
        const viewportSize = this.$refs.scrollbar.clientHeight;
        const itemsEle = this.$refs.scrollItem;

        const scrollerSize = itemsEle.clientHeight;
        const maxTranslate = scrollerSize - viewportSize;
        const middleTranslate = viewportSize / 2;

        const items = itemsEle.children;

        let size = 0;
        this.categoryList.every((label, index) => {
          if (label.tag === active) {
            size += items[index]['clientHeight'] / 2;
            return false;
          }

          size += items[index]['clientHeight'];
          return true;
        });

        let translate = size - middleTranslate;
        translate = Math.min(maxTranslate, Math.max(0, translate));
        this.$refs.scrollbar.scrollTo({
          top: translate,
          behavior: 'smooth'
        });
      });
    },
    handleScroll(height, index, tag) {
      this.$emit('scrollToElement', height, index);
      this.active = tag;
    }
  }
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.scroller {
  height: 100%;
  width: 80px;
  overflow: hidden;
}
.navbar {
  &-container {
    overflow: scroll;
    height: 100%;
    padding-right: 6 / @base;
    -webkit-overflow-scrolling: touch;
    box-sizing: content-box;
    width: 80 / @base;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-user-select: none;
    flex: 0 0 auto;
  }
  &-item {
    min-height: calc(100% + 1px);
    overflow: hidden;
    padding: 10 / @base;
    box-sizing: border-box;
    min-height: 49 / @base;
    color: #666666;
    font-size: 14 / @base;
    text-align: left;
    padding-top: 9 / @base;
    padding-bottom: 22 / @base;
    font-size: 0;
    background-color: #f5f5f5;
    position: relative;
    &.scrollActive {
      background-color: #fff;
      color: #333333;
      font-weight: bold;
    }
  }

  &-pic {
    width: 15 / @base;
    height: 15 / @base;
    margin-right: 3 / @base;
    position: relative;
    display: inline-block;
    vertical-align: top;
  }
  &-category-name {
    font-size: 13 / @base;
  }
  &-num {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
    background-color: #fb4e44;
    font-size: 20px;
    text-align: center;
    line-height: 24px;
    border-radius: 50%;
    transform: scale(0.5) translate(50%, -50%);

    // padding: 2 / @base;
    &.m {
      width: 36px;
      border-radius: 12px;
    }
    &.g {
      width: 48px;
      border-radius: 12px;
    }
  }
}
</style>
