<template>
  <div
    class="swiper"
    @click.stop.prevent="$emit('swiper', [], false)"
    ref="mySwiper"
  >
    <div class="title">{{ index }}/{{ swiperList.length }}</div>
    <Swiper :options="swiperOption" ref="mySwiper" class="item">
      <SwiperSlide
        v-for="(img, index) in swiperList"
        :key="index"
        class="swiper-item"
      >
        <img :src="img.bigPicUrl" alt />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
// import 'swiper/css/swiper.css';
// If you use Swiper 6.0.0 or higher
import 'swiper/swiper-bundle.css';

export default {
  name: 'CommentSwiper',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    swiperList: {
      type: Array
    }
  },
  data() {
    const self = this;
    return {
      index: 1,
      swiperOption: {
        on: {
          slideChangeTransitionEnd() {
            self.index = this.realIndex + 1;
          }
        }
      }
    };
  }
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.swiper {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 999;
  background-color: #000;
  .title {
    width: 100%;
    height: 45 / @base;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    line-height: 45 / @base;
    z-index: 99;
    color: #fff;
    font-size: 16 / @base;
  }
  .item {
    width: 100%;
    height: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
