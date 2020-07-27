<template functional>
 <div class="info-container">
        <div
          class="info-pic"
          :style="{ backgroundImage: `url(http://p1.meituan.net/waimaipoi/9ad7a7adb47bf70b9b10dc2dcbfd6ab646459.jpg)` }"
        ></div>
        <div class="info-describle">
          
            <div class="info-describle-md">
              <span class="info-describle-minutes">30分钟</span>
              <span class="info-describle-distance">1.8km</span>
              <i class="info-describle-icon"></i>
          </div>
            <div class="info-shop">「杭州日料外卖榜首品牌」「年度高品质商家」。高峰时段运力不足和恶劣天气时，配送费会提价且送达时间误差较大，机智的宝宝请尽量提前下单哦！配送中的订单不可取消，配送进度可直接联系骑手追踪。其他问题可直接致电商家解决哦！</div>

<slot />
         
        </div>
      </div>
</template>

<script>
export default {
  name: 'Info'
};
</script>
<style scoped lang='less'>
@base: 37.5rem;
.info {
  &-container {
    padding-bottom: 20 / @base;
    min-height: 80 / @base;
    position: relative;
    padding-left: 95 / @base;
    padding-top: 5 / @base;
    width: 100%;
    height: 80 / @base;
  }
  &-pic {
    position: absolute;
    left: 10 / @base;
    top: 5 / @base;
    width: 85 / @base;
    height: 64 / @base;
    box-shadow: 0 2 / @base 15 / @base 0 rgba(0, 0, 0, 0.15);
    border-radius: 2 / @base;
    background-size: 85 / @base 64 / @base;
    background-repeat: no-repeat;
  }

  &-shop {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 10 / @base;
    height: 16 / @base;
    line-height: 16 / @base;
  }

  &-describle {
    padding-left: 10 / @base;
    &-md {
      position: relative;
    }
    &-icon {
      position: absolute;
      right: 10 / @base;
      top: 0;
      display: inline-block;
      vertical-align: top;
      width: 50 / @base;
      height: 15 / @base;
      background: url(../assets/icon.png) no-repeat;
      background-size: 50 / @base 15 / @base;
    }
    &-minutes {
      position: relative;
      margin-right: 8.5 / @base;
      &:after {
        content: ' ';
        display: inline-block;
        position: absolute;
        width: 1 / @base;
        height: 12 / @base;
        background-color: #fff;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        right: -4 / @base;
        top: 3 / @base;
      }
    }
  }
}
</style>