<template>
  <div>
    <ul v-for="(item1, index) in list" :key="index" class="inner">
      <li @click="$emit('handleVisible', item1, true)">
        <div class="pic">
          <img v-lazy="item1.bigImageUrl" alt />
        </div>
        <div class="des">
          <div class="p1">{{ item1.spuName }}</div>
          <div class="p2">{{ item1.spuDesc }}</div>
          <div class="num">
            <span>月 售 100</span>
            <span>赞 100</span>
          </div>
          <div class="price">
            <span class="current">¥{{ item1.currentPrice }}</span>
            <span class="old" v-show="item1.currentPrice !== item1.originPrice"
              >¥{{ item1.originPrice }}</span
            >
            <!--  -->
            <count
              :currentPrice="item1.currentPrice"
              :originPrice="item1.originPrice"
              :spuId="item1.spuId"
              :tag="item1.tag"
              :spuName="item1.spuName"
            />
          </div>
          <div class="discount">
            <span
              v-for="(item2, index) in item1.skuList"
              :key="index"
              v-show="item2.skuPromotionInfo"
              >{{ item2.skuPromotionInfo }}</span
            >
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FoodGoodsItem',
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
.overflow() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.inner {
  li {
    position: relative;
    padding: 0 10 / @base 22 / @base 93 / @base;
  }
  .des {
    min-height: 82 / @base;
    .p1 {
      .overflow();
      font-size: 16 / @base;
      width: 190 / @base;
    }
    .p2 {
      width: 190 / @base;
      .overflow();
      margin-bottom: 3 / @base;
      line-height: 15 / @base;
      font-size: 11 / @base;
      color: #666666;
      word-break: break-all;
    }
  }
  .pic {
    display: inline-block;
    border: none;
    width: 75 / @base;
    height: 75 / @base;
    flex: 0 0 auto;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-top: 3.5 / @base;
    position: absolute;
    left: 10 / @base;
    top: 0;
  }
  img {
    display: inline-block;
    border: none;
    width: 75 / @base;
    height: 75 / @base;

    flex: 0 0 auto;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .num {
    margin-bottom: 3 / @base;
    height: 15 / @base;
    line-height: 15 / @base;
    position: relative;
    width: 100%;
    font-size: 11 / @base;
    color: #666;
  }
  .price {
    position: relative;
    .current {
      height: 21.5 / @base;
      line-height: 21.5 / @base;
      display: inline-block;
      color: #fb4e44;
      font-size: 18 / @base;
      font-family: 'PingFangSC-Medium', 'Hiragino Sans GB', Arial, Helvetica,
        '\5B8B\4F53', sans-serif;
      vertical-align: middle;
    }
    .old {
      margin-left: 4 / @base;
      display: inline-block;
      font-size: 11 / @base;
      line-height: 13.5 / @base;
      height: 13.5 / @base;
      color: #a9a9a9;
      text-decoration: line-through;
      vertical-align: middle;
    }
  }

  .discount {
    span {
      display: inline-block;
      vertical-align: middle;
      color: #fb4e44;
      font-size: 10 / @base;
      padding: 0 5 / @base;
      height: 15 / @base;
      line-height: 15 / @base;
      box-sizing: border-box;
      position: relative;
      margin-right: 3 / @base;
      border: 1 / @base solid #fb4e44;
    }
  }
}
</style>
