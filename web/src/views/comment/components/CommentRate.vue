<template>
  <div class="rate">
    <div class="rate-left">
      <h3>{{ commentRate.shopScore }}</h3>
      <span>商家评分</span>
    </div>
    <div class="rate-mid">
      <div class="top t1">
        <div class="wei">口味</div>
        <comment-rate-star class="star" :comRate="+commentRate.qualityScore" />
        <div class="num">{{ commentRate.qualityScore }}</div>
      </div>
      <div class="foot">
        <div class="top">
          <div class="wei">包装</div>
          <comment-rate-star class="star" :comRate="+commentRate.packScore" />
          <div class="num">{{ commentRate.packScore }}</div>
        </div>
      </div>
    </div>
    <div class="rate-right">
      <h3>{{ commentRate.deliveryScore }}</h3>
      <span>配送评分</span>
    </div>
  </div>
</template>

<script>
import CommentRateStar from './CommentRateStar.vue';
export default {
  name: 'CommentRate',
  props: {
    commentRate: Object
  },
  components: { CommentRateStar }
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.rate {
  display: flex;
  margin-bottom: 10 / @base;
  padding: 15 / @base 0;
  position: relative;
  .rate-left {
    padding: 0 6%;

    flex: 0 0 auto;
    h3 {
      color: #ffb000;
      font-size: 27 / @base;
    }
    span {
      font-size: 12 / @base;
      color: #ccc;
    }
  }
  .rate-mid {
    flex: 1 1 auto;
    padding-left: 0;
    padding: 0 6%;

    flex: 0 0 auto;
    height: 50 / @base;
    // width: 220/@base;
    &::after {
      content: '';
      height: 50 / @base;
      width: 1 / @base;
      right: 100 / @base;
      top: 50%;
      transform: translateY(-50%);
      background-color: #e4e4e4;

      position: absolute;
    }
    .top {
      display: flex;
      &.t1 {
        margin: 3 / @base 0 10 / @base;
      }
      .star {
        margin: 0 5 / @base;
      }
      .wei {
        color: #666;
      }
      .num {
        color: #ffb000;
      }
    }
  }
  .rate-right {
    padding: 0 6%;

    flex: 0 0 auto;
    h3 {
      color: #999;
      font-size: 27 / @base;
    }
    span {
      font-size: 12 / @base;
      color: #ccc;
    }
  }
}
</style>
