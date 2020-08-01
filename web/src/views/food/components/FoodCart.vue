<template>
  <div>
    <div class="shopcart">
      <div class="shopcart-left" @click="handleVisible">
        <div class="cart">
          <div class="icon" :class="cartBgc"></div>
          <div
            class="count"
            v-show="totalCount"
            :class="{ m: totalCount >= 10, g: totalCount > 99 }"
          >
            {{ totalCount | filterNum }}
          </div>
        </div>

        <div class="delivery-price">
          <p class="total" v-show="totalCount">
            <span>¥</span>
            {{ totalPrice.currentTotalPrice }}
            <span
              class="old"
              v-show="
                totalPrice.oldTotalPrice !== totalPrice.currentTotalPrice &&
                  totalCount
              "
              >¥{{ totalPrice.oldTotalPrice }}</span
            >
          </p>
          <p class="delivet" :class="{ 'count-active': totalCount }">
            另需配送费¥{{ deliveryFee }}
          </p>
        </div>
      </div>

      <div
        class="shopcart-right"
        :style="{
          backgroundColor: payStatus.bgcColor,
          color: totalPrice.currentTotalPrice >= 20 ? '#000' : ''
        }"
      >
        <span>{{ payStatus.payStatus }}</span>
      </div>
    </div>
    <!--  -->
    <food-cart-list :visible="visible" @clearAll="clearAll" />

    <div class="shop-mask" v-show="visible" @click="visible = false"></div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'FoodCart',
  components: {
    FoodCartList: () => import(/* webpackChunkName: 'CartList' */ './FoodCartList')
  },
  props: {
    deliveryFee: Number
  },

  data() {
    return {
      visible: false
    };
  },
  computed: {
    ...mapGetters([
      'totalPrice',
      'totalCount',
      'cartBgc',
      'payStatus',
      'count1'
    ]),
    ...mapState(['selectFoods'])
  },
  methods: {
    clearAll() {
      this.visible = false;
      this.$store.commit('sEmptyCart');
    },
    handleVisible() {
      if (!this.totalCount) return;
      this.visible = !this.visible;
    }
  }
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.shopcart {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 50 / @base;
  display: flex;
  z-index: 102;
  .shopcart-left {
    flex: 1;
    background: #3b3b3c;
    font-size: 0;
    .cart {
      display: inline-block;
      top: -12 / @base;
      left: 15 / @base;
      position: relative;
      z-index: 999;
      .icon {
        width: 50 / @base;
        height: 50 / @base;
        //filter:  grayscale(100%);
        background: url(../../../assets/nocart.png) center no-repeat;
        background-size: 100% 100%;
        &.bgc {
          background-image: url(../../../assets/cart.png);
          background-size: 100% 100%;
        }
      }
      .count {
        width: 30px;
        height: 30px;
        position: absolute;
        right: 0;
        top: 0;
        line-height: 30px;
        background: #fb4e44;
        border-radius: 50%;
        font-size: 20px;
        text-align: center;
        color: #fff;
        transform: scale(0.5) translate(50%, -50%);
        &.m {
          width: 40px;
          border-radius: 16px;
        }
        &.g {
          width: 50px;
        }
      }
    }
    .delivery-price {
      display: inline-block;
      margin-left: 20 / @base;
      vertical-align: top;

      .total {
        font-size: 24 / @base;
        color: #fff;
        span {
          font-size: 16 / @base;
        }
        .old {
          text-decoration: line-through;
          color: #999;
        }
      }
      .delivet {
        font-size: 14 / @base;
        color: #999;
        margin-top: 15 / @base;
        &.count-active {
          font-size: 12 / @base;
          margin-top: 0;
        }
      }
    }
  }
  .shopcart-right {
    flex: 0 0 105 / @base;
    background: #f8c74e;
    color: #999;
    font-size: 16 / @base;
    height: 50 / @base;
    line-height: 50 / @base;
    text-align: center;
  }
}

.shop-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(7, 17, 27, 0.6);
  filter: blur(10 / @base);
  transform: scale(1.2);
}
</style>
