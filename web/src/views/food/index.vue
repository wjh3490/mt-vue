<template>
  <div class="food">
    <div class="main">
      <div class="scroller">
 <div class="left" v-scroll>
        <ul>
          <li
            v-for="(item, index) in categoryList"
            :key="index"
            :class="{ scrollActive: id === index }"
            @click="scrollToElement(scrollHeights[index], index)"
          >
            <img :src="item.iconUrl" alt v-if="index === 0" />
            <span>{{ item.categoryName }}</span>
            <div
              v-if="typeNum[item.tag]"
              class="num"
              :class="{ m: typeNum[item.tag] >= 10, g: typeNum[item.tag] > 99 }"
            >
              {{ typeNum[item.tag] | filterNum }}
            </div>
          </li>
        </ul>
      </div>
        
      </div>
     

      <!-- </div> -->
      <div class="food-right">
        <ul class="out" ref="out" @scroll="handleScroll">
          <li
            v-for="(item, index) in categoryList"
            :key="index"
            class="li"
            :class="{ paddingt: index === 0 }"
            ref="scrollItem"
          >
            <h3 class="title">
              {{ item.categoryName }}
            </h3>
            <ul
              v-for="(item1, index) in item.spuList"
              :key="index"
              class="inner"
            >
              <li
                @click="
                  () => {
                    foodDetails = item1;
                    showDetails1 = true;
                  }
                "
              >
                <div class="pic">
                  <img v-lazy="item1.bigImageUrl" alt />
                </div>
                <div class="des">
                  <div class="p1">{{ item1.spuName }}</div>
                  <div class="p2">{{ item1.spuDesc }}</div>
                  <div class="num">
                    <span>月售 100</span>
                    <span>赞 100</span>
                  </div>
                  <div class="price">
                    <span class="current">¥{{ item1.currentPrice }}</span>
                    <span
                      class="old"
                      v-show="item1.currentPrice !== item1.originPrice"
                      >¥{{ item1.originPrice }}</span
                    >
                    <!-- ********* -->
                    <count
                      :currentPrice="item1.currentPrice"
                      :originPrice="item1.originPrice"
                      :spuId="item1.spuId"
                      :tag="item.tag"
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
          </li>
        </ul>
        <!-- <div class="title_bar" ref="fixedTop"> -->
        <!-- {{ fixedTitle }} -->
        <!-- </div> -->
      </div>
    </div>
    <!-- <div class="food-left"> -->

    <!-- /////////////// -->
    <cart :deliveryFee="deliveryFee" />

    <detail :foodDetails="foodDetails" :showDetails1="showDetails1">
      <div class="close" @click="showDetails1 = false"></div>
    </detail>
  </div>
</template>

<script>
/*eslint-disable*/
import { mapGetters } from 'vuex';
import TWEEN from 'tween.js';
import Count from './components/Count';
import Cart from './components/Cart';
import Detail from './components/Detail';
import { scrollToEase } from '@/utils/scroll';
import scroll from '@/directives/scroll';
export default {
  name: 'Food',
  directives: { scroll },
  components: {
    Count,
    Cart,
    Detail
  },
  data() {
    return {
      categoryList: [],
      scrollHeights: [],
      scrollY: 0,
      foodDetails: {},
      showDetails1: false,
      deliveryFee: 0,
      diff: -1,
      id: 0,
      a: false
    };
  },
  computed: {
    ...mapGetters(['typeNum'])
  },
  watch: {},
  created() {
    this.getFoodList();
  },
  activated() {
    this.$refs.out.scrollTop = this.scrollY;
  },
  mounted: function() {},
  methods: {
    async getFoodList() {
      const {
        status,
        data: { data }
      } = await this.$axios('//localhost:3001/getFood');
      if (status === 200) {
        console.log(data);
        this.categoryList = data.data.categoryList;
        this.deliveryFee = data.data.shopInfo.deliveryFee;
        this.$store.commit('setMinFee', data.data.shopInfo.minFee);
      }

      this.$nextTick(() => {
        this.getScroll();
        // this.initScroll();
      });
    },
    scrollIndex() {
      let scrollHeights = this.scrollHeights;

      for (let i = 0; i < scrollHeights.length; i++) {
        let startHeight = scrollHeights[i];
        let endHeight = scrollHeights[i + 1];
        // this.diff = endHeight - this.scrollY;

        if (
          !endHeight ||
          (this.scrollY >= startHeight && this.scrollY < endHeight)
        ) {
          return i;
        }
      }
      return 0;
    },
    getScroll() {
      let height = 0;
      let liList = this.$refs.scrollItem;
      this.scrollHeights.push(height);
      for (var i = 0; i < liList.length; i++) {
        height += liList[i].clientHeight;
        this.scrollHeights.push(height);
      }
    },
    handleScroll(e) {
      this.scrollY = Math.abs(Math.round(e.target.scrollTop));

      if (!this.a) {
        this.id = this.scrollIndex(); //./.
      }

      this.a = false;
    },

    scrollToElement(scrollHeights, index) {
      let scrollTop = this.$refs.out.scrollTop;
      scrollToEase(this.$refs.out, scrollTop, scrollHeights);
    }
  }
};
</script>
<style scoped lang="less">
@import './index.less';
</style>
