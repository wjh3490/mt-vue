<template>
  <div class="commnet" @scroll="scrollValue" ref="comment">
    <!--  -->
    <comment-rate :commentRate="rateList" />

    <div class="line"></div>
    <!--  -->
    <comment-label :list="commentLabels" />
    <!--  -->
    <comment-list :list="list" @swiper="swiper" />
    <!--  -->
    <comment-swiper
      v-if="visibleSwiper"
      :swiperList="swiperList"
      @swiper="swiper"
    />
  </div>
</template>

<script>
import CommentRate from './components/CommentRate';
import CommentSwiper from './components/CommentSwiper';
import CommentLabel from './components/CommentLabel';
import CommentList from './components/CommentList';
export default {
  name: 'Comment',
  components: {
    CommentRate,
    CommentLabel,
    CommentList,
    CommentSwiper
  },
  data() {
    return {
      rateList: {
        deliveryScore: '',
        shopScore: '',
        qualityScore: '',
        packScore: ''
      },

      list: [],
      commentLabels: [],
      // 保存 滚动的状态
      scrollValueStatus: 0,
      visibleSwiper: false,
      swiperList: [],
      comment: JSON.parse(localStorage.getItem('comment'))
    };
  },

  created() {
    this.getCommentList();
  },
  activated() {
    this.$refs.comment.scrollTop = this.scrollValueStatus;
  },
  methods: {
    async getCommentList() {
      const {
        status,
        data: { data }
      } = await this.$axios('//localhost:3001/getComment');
      if (status === 200) {
        const {
          deliveryScore,
          list,
          packScore,
          qualityScore,
          shopScore,
          commentLabels
        } = data.data;

        this.rateList = {
          deliveryScore,
          packScore,
          qualityScore,
          shopScore
        };
        this.list = list;
        this.commentLabels = commentLabels;
      }
    },
    scrollValue(e) {
      this.scrollValueStatus = e.target.scrollTop;
    },
    swiper(p, b) {
      if (p) this.swiperList = p;
      this.visibleSwiper = b;
    }
    // pSwiper(flag) {
    //   this.visibleSwiper = flag;
    // }
  }
};
</script>
<style scoped lang="less">
@import './index.less';
</style>
