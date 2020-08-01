<template>
  <transition name="fold">
    <div class="list" v-show="visible">
      <header>
        <span class="list-cart">购物车</span>
        <span class="empty fr" @click="$emit('clearAll')">清空</span>
      </header>
      <div class="cart-list">
        <ul>
          <li v-for="(item, index) in selectFoods" :key="index">
            <div class="food-name">
              <div class="food-item">{{ item.spuName }}</div>
              <div class="food-price">
                ¥{{ (item.currentPrice * item.count).toFixed(2) }}
              </div>
            </div>
            <div class="foodnum">
              <count
                :currentPrice="item.currentPrice"
                :originPrice="item.originPrice"
                :spuId="item.spuId"
                :tag="item.tag"
                :spuName="item.spuName"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'FoodCartList',
  props: {
    visible: Boolean
  },
  computed: {
    ...mapState(['selectFoods'])
  }
};
</script>
<style scoped lang="less">
@base: 37.5rem;
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
</style>
