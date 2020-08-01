<template>
  <div class="food">
    <div class="main">
      <!--  -->
      <food-nav
        :categoryList="categoryList"
        :typeNum="typeNum"
        :id="id"
        :scrollHeights="scrollHeights"
        @scrollToElement="scrollToElement"
      />
      <!--  -->
      <food-goods
        ref="goods"
        :categoryList="categoryList"
        @handleScroll="handleScroll"
        @getHeight="h => (scrollHeights = h)"
        @handleVisible="
          (t, v) => {
            foodDetails = t;
            visible = v;
          }
        "
      />
    </div>
    <!--  -->
    <food-cart :deliveryFee="deliveryFee" />
    <!--  -->
    <food-detail :foodDetails="foodDetails" :showDetails1="visible">
      <div class="close" @click="visible = false"></div>
    </food-detail>
  </div>
</template>

<script>
/*eslint-disable*/
import { mapGetters } from 'vuex';
import FoodCart from './components/FoodCart';
import FoodGoods from './components/FoodGoods';
import FoodNav from './components/FoodNav';
import { scrollToEase } from '@/utils/scroll';
export default {
  name: 'Food',

  components: {
    FoodCart,
    FoodNav,
    FoodGoods,
    FoodDetail: () => import('./components/FoodDetail')
  },
  data() {
    return {
      categoryList: [],
      scrollHeights: [],
      scrollY: 0,
      foodDetails: {},
      visible: false,
      deliveryFee: 0,
      id: 0,

      scrollTop: 0,
      debundce: false,
      flag: false,
      timeId: null,
      c: 0,
      pre: 0,
      next: 0
    };
  },
  computed: {
    ...mapGetters(['typeNum'])
  },

  created() {
    this.getFoodList();
  },
  mounted() {
    this.goods = this.$refs.goods;
    this.scrollbar = this.$refs.goods.$refs.scrollbar;
  },

  methods: {
    async getFoodList() {
      const {
        status,
        data: { data }
      } = await this.$axios('//localhost:3001/getFood');
      if (status === 200) {
        this.categoryList = data.data.categoryList;
        this.deliveryFee = data.data.shopInfo.deliveryFee;
        this.$store.commit('setMinFee', data.data.shopInfo.minFee);
      }

      this.$nextTick(() => {
        this.goods.getItemHeight();
      });
    },

    handleScroll(e) {
      if (this.debundce) return;

      this.scrollY = e.target.scrollTop;
      const scrollHeights = this.scrollHeights;
      if (this.startY > this.scrollTop) {
        return;
      }
      // if (a >= this.scrollY) {
      //   this.flag = true;
      //   if (this.flag) {
      //     let filterItem = scrollHeights.filter(item => item <= this.scrollY);
      //     this.scrollTop = scrollHeights[filterItem.length];
      //     this.id = filterItem.length - 1;
      //   }
      // }

      // const scrollHeights = this.scrollHeights;

      let filterItem = scrollHeights.filter(item => item <= this.scrollY);
      this.scrollTop = scrollHeights[filterItem.length];
      this.id = filterItem.length - 1;
    },

    scrollToElement(scrollHeights, index) {
      this.debundce = true;
      let scrollTop = this.scrollbar.scrollTop;

      this.id = index;
      this.scrollTop = this.scrollHeights[index + 1];
      this.scrollY = scrollHeights;

      scrollToEase(this.scrollbar, scrollTop, scrollHeights, 200, () => {
        this.timeId = setTimeout(() => (this.debundce = false), 25);
      });
      this.$once('hook:beforeDestroy', () => clearTimeout(this.timeId));
    }
  }
};
</script>
<style scoped lang="less">
@import './index.less';
</style>
