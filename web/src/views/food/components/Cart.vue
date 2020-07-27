<template>
  <div>
    <div class="shopcart">
      <div class="shopcart-left" @click="isShowCart">
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
    <transition name="fold">
      <div class="list" v-show="listShow">
        <header>
          <span class="list-cart">购物车</span>
          <span class="empty fr" @click="emptyCart">清空</span>
        </header>
        <div class="cart-list">
          <ul>
            <li
              v-for="(item, index) in selectFoods"
              :key="index"
            >
              <div class="food-name">
                <div class="food-item">{{ item.spuName }}</div>
                <div class="food-price">
                  ¥{{ (item.currentPrice * item.count).toFixed(2) }}
                </div>
              </div>
              <div class="foodnum">
                <Count
                  :currentPrice="item.currentPrice"
                  :originPrice="item.originPrice"
                  :spuId="item.spuId"
                  :tag="item.tag"
                  :spuName="item.spuName"
                ></Count>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>

    <div
      class="shop-mask"
      v-show="listShow"
      @click="isShowCartList = true"
    ></div>
  </div>
</template>

<script>
import Count from './Count.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Cart',
  components: {
    Count
  },
  props: {
    deliveryFee: {
      type: Number
    }
  },

  data () {
    return {
      isShowCartList: true
    }
  },
  computed: {
    listShow () {
      if (!this.totalCount) {
        return false
      }
      return !this.isShowCartList
    },
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
    // listShow () {
    //   if (!this.totalCount) {
    //     return false
    //   }
    //   return !this.isShowCartList
    // },
    // isShowMask () {
    //   this.isShowCartList = true
    // },
    emptyCart () {
      this.$store.commit('sEmptyCart')
      this.isShowCartList = false
    },
    isShowCart () {
      if (this.totalCount) {
        this.isShowCartList = !this.isShowCartList
      }
    }
  }
}
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

.list {
  position: fixed;
  width: 100%;
  bottom: 50 / @base;
  font-size: 12 / @base;
  z-index: 101;
  left: 0;
  header {
    line-height: 30 / @base;
    height: 30 / @base;

    background: #f4f4f4;
    padding: 4 / @base 15 / @base;
    .empty {
      background: url(../../../assets/icon2.png) left center no-repeat;
      background-size: 13 / @base 15 / @base;
      padding-left: 20 / @base;
    }
  }
  .cart-list {
    background-color: #fff;
    li {
      font-size: 16 / @base;
      padding: 14 / @base 0 / @base;
      margin: 0 15 / @base;
      .foodnum {
        position: relative;
      }
      .food-name {
        display: flex;
        position: relative;
        .food-price {
          position: absolute;
          right: 100 / @base;
        }
        .food-item {
          width: 120 / @base;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
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

.fold-enter-active,
.fold-leave-active {
  transition: all 0.2s ease;
}

.fold-enter,
.fold-leave-to {
  transform: translate3d(0, 100%, 0);
}
</style>
