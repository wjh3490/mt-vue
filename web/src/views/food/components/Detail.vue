<template>
  <transition name="scale">
    <div class="details" v-show="showDetails1" :key="foodDetails.spuId">
      <div class="details-item">
        <div class="details-top">
          <img v-lazy="foodDetails.bigImageUrl" />
        </div>
        <div class="details-foot">
          <div class="detail-desc">
            <p>{{ foodDetails.spuName }}</p>
            <div class="num">
              <span class="month">月售{{ foodDetails.saleVolume }}</span>
              <span>赞{{ foodDetails.praiseNum }}</span>
            </div>
            <div class="spuDesc">{{ foodDetails.spuDesc }}</div>
          </div>
          <div class="details-price">
            <div class="price">
              <div class="left">¥{{ foodDetails.currentPrice }}</div>
              <div
                class="right"
                v-show="!count1[foodDetails.spuId]"
                @click="toggleStatus"
              >
                加入购物车
              </div>
              <Count
                v-show="count1[foodDetails.spuId]"
                :currentPrice="foodDetails.currentPrice"
                :originPrice="foodDetails.originPrice"
                :spuId="foodDetails.spuId"
                :tag="foodDetails.tag"
                :spuName="foodDetails.spuName"
              ></Count>
            </div>
          </div>
          <slot></slot>
          <!-- <div class="close" @click="closeDetails"></div> -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import Count from './Count'
export default {
  name: 'Detail',
  components: {
    Count
  },
  props: {
    foodDetails: {
      type: Object
    },
    showDetails1: {
      type: Boolean
    }
  },
  data () {
    return {
      toggleShow: false
    }
  },
  computed: {
    ...mapGetters(['count1'])
  },

  methods: {
    // closeDetails () {
    //   this.$emit('close', false)
    // },
    toggleStatus () {
      this.$store.commit('addCart', {
        currentPrice: this.foodDetails.currentPrice,
        originPrice: this.foodDetails.originPrice,
        spuId: this.foodDetails.spuId,
        tag: this.foodDetails.tag,
        spuName: this.foodDetails.spuName
      })
      this.toggleShow = !this.toggleShow
    }
  }
}
</script>
<style scoped lang="less">
@base: 37.5rem;
.overflow() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.details {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20 / @base) brightness(100%);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  &.scale-enter {
    .details-item {
      transform: scale(0.2);
    }
  }
  &.scale-enter-active {
    transition: all 1s;
    .details-item {
      transition: all 0.2s;
    }
  }
  .details-item {
    width: 315 / @base;
    height: 440 / @base;
    border-radius: 8 / @base;
    padding-bottom: 40 / @base;
    overflow: hidden;
    .details-top {
      height: 236 / @base;
    }
    .details-foot {
      .detail-desc {
        padding: 0 17 / @base;
        padding-top: 10 / @base;
        height: 100 / @base;
        overflow-y: scroll;
        background-color: #fff;
        -webkit-overflow-scrolling: touch;
        p {
          .overflow();
          font-size: 16 / @base;
          font-weight: bolder;
        }
        .num {
          font-size: 11 / @base;
          color: #666;
          display: inline-block;
          margin: 5 / @base 0;
          .month {
            margin-right: 20 / @base;
          }
        }
        .spuDesc {
          font-size: 11 / @base;
          color: #666;
          margin-top: 10 / @base;
          margin-bottom: 16 / @base;
        }
      }
      .details-price {
        background-color: #fafafa;
        padding: 8 / @base 17 / @base;
        border-radius: 0 0 10 / @base 10 / @base;
        .price {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          .left {
            color: #fb4e44;
            font-size: 24 / @base;
          }
          .right {
            width: 90 / @base;
            height: 25 / @base;
            background: #ffd161;
            border-radius: 25 / @base;
            line-height: 25 / @base;
            text-align: center;
            font-size: 12 / @base;
          }
        }
      }
      // .close {
      //   width: 40 / @base;
      //   height: 40 / @base;
      //   border-radius: 50%;
      //   background: url(../../assets/close.png) center no-repeat;
      //   background-size: 100%;
      //   margin: 0 auto;
      //   margin-top: 15 / @base;
      // }
    }
  }
}

// .scale-enter {
//   transform: scale(0.2);
//   .details-item {
//     color: red;
//   }
// }
// .scale-enter-active {
//   transition: all 1000s;
//   .details-item {
//   }
// }
</style>
