<template>
  <div id="app">
    <header>
      <div class="return"><i></i></div>
      <!--  -->
      <app-info>
        <!--  -->
        <app-swiper :activityList="activityList" />
      </app-info>
    </header>
    <!--  -->
    <app-nav :navList="navList" />

    <div>
      <transition :name="slide">
        <keep-alive>
          <router-view  class="Router"/>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import AppNav from '@/components/AppNav.vue';
import AppInfo from '@/components/AppInfo.vue';
import AppSwiper from '@/components/AppSwiper.vue';
export default {
  name: 'App',
  components: { AppNav, AppInfo, AppSwiper },
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
  }
};
</script>

<style lang="less" scope>
@base: 37.5rem;
#app {
  // width: 100%;
  // height: 100%;
  height: 100vh;
  width: 100vw;
  font-size: 12 / @base;
  overflow-x: hidden;
  overflow-y: auto;
}

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

// .Router {
//   position: absolute;
//   transition: all 0.5s linear;
// }

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
