<template>
  <div id="app">
    <header>
      <div class="return">
        <i></i>
      </div>
<Info>
  <Swiper :activityList='activityList' />
</Info>
      <!-- <div class="shop">
        <div
          class="home-pic"
          :style="{ backgroundImage: `url(http://p1.meituan.net/waimaipoi/9ad7a7adb47bf70b9b10dc2dcbfd6ab646459.jpg)` }"
        ></div>
        <div class="home-right">
          <div class="right-top">
            <div class="km">
              <span class="minutes">30分钟</span>
              <span class="distance">1.8km</span>
              <i></i>
            </div>
            <div class="inform">「杭州日料外卖榜首品牌」「年度高品质商家」。高峰时段运力不足和恶劣天气时，配送费会提价且送达时间误差较大，机智的宝宝请尽量提前下单哦！配送中的订单不可取消，配送进度可直接联系骑手追踪。其他问题可直接致电商家解决哦！</div>
          </div>
          <div class="home-swiper">
            <ul ref="ul">
              <li v-for="(item, index) in activityList" :key="index">
                <i :style="{ backgroundImage: `url(${item.iconUrl})` }"></i>
                <span>666666</span>
              </li>
            </ul>
          </div>
        </div>
      </div> -->
    </header>


<NavBase :navList='navList' />
   
    <transition :name="slide">
      <keep-alive>
        <router-view class="Router"></router-view>
      </keep-alive>
    </transition>

  </div>
</template>

<script>
/*eslint-disable*/
import NavBase from '@/components/Nav.vue';
import Info from '@/components/Info.vue';
import Swiper from '@/components/Swiper.vue';
export default {
  name: 'App',
  components: { NavBase, Info, Swiper },
  data() {
    return {
      shopPic: '',
      bulletin: '',
      activityList: [
        {
          iconUrl:
            'http://p0.meituan.net/activityconfig/6087b33fd42d14fd94e899084aaef56d1720.png'
        },
        {
          iconUrl:
            'http://p0.meituan.net/activityconfig/3da2d9c7a4ddf89e4e71cfdfff168c391088.png'
        },
        {
          iconUrl:
            'http://p0.meituan.net/activityconfig/6087b33fd42d14fd94e899084aaef56d1720.png'
        }
      ],
      index: 0,
      id: 1,
      oldId: '',
      slide: 'slide-left',
      navList: [
        { name: '点菜', link: '/food' },
        { name: '评价', link: '/comment' },
        { name: '商家', link: '/info' }
      ]
    };
  },
  watch: {
    $route(to, from) {
      this.oldId = this.id;
      this.id = to.meta.currentIndex;
      if (this.id > this.oldId) {
        this.slide = 'slide-left';
      } else {
        this.slide = 'slide-right';
      }
    }
  },

  // mounted() {
  //   this.$nextTick(() => {
  //     this.animate1();
  //   });
  // },
  // // computed: {
  // //   categoryList() {
  // //     return this.$store.state.foodInfo;
  // //   }
  // // },
  // methods: {
  //   animate1() {
  //     this.$refs.ul.offsetWidth; // 重绘和回流
  //     setInterval(() => {
  //       this.index++;
  //       this.$refs.ul.style.transition = 'all .5s';
  //       this.$refs.ul.style.transform = `translateY(${-this.index * PERSENT}%)`;
  //     }, 2000);

  //     this.$refs.ul.addEventListener('transitionend', this.transitionEnd);
  //   },
  //   transitionEnd() {
  //     if (this.index >= this.activityList.length - 1) {
  //       this.index = 0;
  //       this.$refs.ul.style.transition = 'none';
  //       this.$refs.ul.style.transform = 'translateY(0)';
  //     }
  //   }
  // }
};
</script>

<style lang="less" scope>
@base: 37.5rem;
#app {
  // width: 100%;
  // height: 100%;
  font-size: 12 / @base;
  height: 100%;
}

// .home {
// font-size: 12 / @base;
// position: fixed;
// top: 0;
// left: 0;
// right: 0;
// }
.router-link-active {
  font-weight: bolder;
  color: #333333;
  border-bottom: solid 2 / @base #ffd300;
}
header {
  background-color: rgb(46, 47, 59);
  color: #fff;
  .return {
    height: 50 / @base;
    i {
      display: inline-block;
      width: 40 / @base;
      height: 50 / @base;
      background: url(./assets/p3.png) center no-repeat;
      background-size: 20% 30%;
      transform: rotate(180deg);
    }
  }
  .shop {
    padding-bottom: 20 / @base;
    min-height: 80 / @base;
    position: relative;
    padding-left: 95 / @base;
    padding-top: 5 / @base;
    width: 100%;
    height: 80 / @base;
    .home-pic {
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
    .home-right {
      padding-left: 10 / @base;
      height: 75 / @base;
      .km {
        position: relative;
        padding-bottom: 5 / @base;
        .minutes {
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
        i {
          position: absolute;
          right: 10 / @base;
          top: 0;
          display: inline-block;
          vertical-align: top;
          width: 50 / @base;
          height: 15 / @base;
          background: url(./assets/icon.png) no-repeat;
          background-size: 50 / @base 15 / @base;
        }
      }
      .inform {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 10 / @base;
        height: 16 / @base;
        line-height: 16 / @base;
      }
    }
    .home-swiper {
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
        background: url(./assets/p3.png) center no-repeat;
        background-size: 5 / @base 9 / @base;
      }
      ul {
        li {
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
    }
  }
}

// .view {
//   position: absolute;
//   top: 173 / @base;
//   bottom: 0;
//   right: 0;
//   left: 0;
//   overflow: hidden;
// }

.Router {
  position: absolute;
  /* height: 100%; */
  width: 100%;
  transition: all 0.5s linear;
  // z-index: -2;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-100% 0);
}
</style>
