<template>
 <div class="swiper-container">
            <ul class="swiper-main" ref="swiper" @transitionend='handleTransitionEnd'>
              <li class="swiper-item" v-for="(item, index) in activityList" :key="index">
                <i :style="{ backgroundImage: `url(${item.iconUrl})` }"></i>
                <span>666666</span>
              </li>
            </ul>
          </div>
</template>

<script>
const PERSENT = 100 / 3;

export default {
  name: 'Swiper',
  props: ['activityList'],
  data() {
    return {
      index: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.animate();
    });
  },
  methods: {
    animate() {
      this.$refs.swiper.offsetWidth; // 重绘和回流
      setInterval(() => {
        this.index++;
        console.log(this.$refs.swiper);
        this.$refs.swiper.style.transition = 'all .5s';
        this.$refs.swiper.style.transform = `translateY(${-this.index *
          PERSENT}%)`;
      }, 2000);
    },
    handleTransitionEnd() {
      if (this.index >= this.activityList.length - 1) {
        this.index = 0;
        this.$refs.swiper.style.transition = 'none';
        this.$refs.swiper.style.transform = 'translateY(0)';
      }
    }
  }
};
</script>
<style scoped lang='less'>
@base: 37.5rem;
.swiper {
  &-container {
    position: relative;
    height: 20 / @base;
    border-radius: 0 1 / @base 1 / @base 0;
    margin-top: 10 / @base;
    overflow: hidden;
    &:after {
      position: absolute;
      content: ' ';
      width: 5 / @base;
      height: 9 / @base;
      right: 10 / @base;
      top: 2 / @base;
      background: url(../assets/p3.png) center no-repeat;
      background-size: 5 / @base 9 / @base;
    }
  }
  &-item {
    height: 20 / @base;
    padding: 0 30 / @base 0 0zred;
    white-space: nowrap;
    i {
      display: inline-block;
      vertical-align: middle;
      width: 15 / @base;
      height: 15 / @base;
      background-size: 15 / @base 15 / @base;
      background-repeat: no-repeat;
    }
    span {
      line-height: 15 / @base;
      display: inline-block;
      vertical-align: middle;
      font-size: 12 / @base;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-left: 6 / @base;
    }
  }
}
</style>