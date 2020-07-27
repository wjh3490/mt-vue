<template>
  <div class="commnet" @scroll="scrollValue" ref="comment">
    <div class="rate">
      <div class="rate-left">
        <h3>{{ shopScore }}</h3>
        <span>商家评分</span>
      </div>
      <div class="rate-mid">
        <div class="top t1">
          <div class="wei">口味</div>
          <Star class="star" :comRate="+qualityScore"></Star>
          <div class="num">{{ qualityScore }}</div>
        </div>
        <div class="foot">
          <div class="top">
            <div class="wei">包装</div>
            <Star class="star" :comRate="+packScore"></Star>
            <div class="num">{{ packScore }}</div>
          </div>
        </div>
      </div>
      <div class="rate-right">
        <h3>{{ deliveryScore }}</h3>
        <span>配送评分</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="cate">
      <ul class="clearfix">
        <li class="fl" v-for="(item, index) in commentLabels" :key="index">
          {{ item.content }}
        </li>
      </ul>
    </div>

    <div class="comment-list">
      <ul>
        <li v-for="(item, index) in list" :key="index" class="clearfix">
          <div class="comment-left fl">
            <img :src="item.userPicUrl ? item.userPicUrl : uerPic" alt />
          </div>
          <div class="comment-right fl">
            <header class="clearfix">
              <span class="name">{{ item.userName }}</span>
              <span class="time fr">{{ item.commentTime }}</span>
            </header>
            <div class="deliveryTime">{{ item.deliveryTime }}</div>
            <div class="content">{{ item.content }}</div>
            <div class="pictures">
              <ul class="clearfix" v-if="item.pictures.length !== 0">
                <li
                  v-for="(item1, index) in item.pictures"
                  :key="index"
                  class="fl"
                  @click="showSwiper(item.pictures)"
                >
                  <img :src="item1.bigPicUrl" alt class="imgs" />
                </li>
              </ul>
            </div>
            <div class="label">{{ item.label }}</div>
            <div class="shopReply">{{ item.shopReply }}</div>
          </div>
        </li>
      </ul>
    </div>
    <!--  -->
    <Swiper
      v-if="isShowSwiper"
      :swiperList="swiperList"
      @pSwiper="pSwiper"
    ></Swiper>
  </div>
</template>

<script >
import Star from './components/Star.vue';
import Swiper from './components/Swiper';
export default {
  data () {
    return {
      deliveryScore: '',
      integratedScore: '',
      list: [],
      packScore: '',
      qualityScore: '',
      shopScore: '',
      commentLabels: [],
      uerPic: require('../../assets/uerpic.png'),
      // 保存 滚动的状态
      scrollValueStatus: 0,
      isShowSwiper: false,
      swiperList: [],
      comment: JSON.parse(localStorage.getItem('comment'))
    }
  },
  components: {
    Star,
    Swiper
  },
  created () {
    this.getCommentList()
  },
  activated () {
    this.$refs.comment.scrollTop = this.scrollValueStatus
  },
  methods: {
    async getCommentList () {
      const {
        status,
        data: { data }
      } = await this.$axios('//localhost:3001/getComment')
      if (status === 200) {
        const {
          deliveryScore,
          integratedScore,
          list,
          packScore,
          qualityScore,
          shopScore,
          commentLabels
        } = data.data

        this.deliveryScore = deliveryScore
        this.integratedScore = integratedScore
        this.list = list
        this.packScore = packScore
        this.qualityScore = qualityScore
        this.shopScore = shopScore
        this.commentLabels = commentLabels
      }
    },
    scrollValue (e) {
      this.scrollValueStatus = e.target.scrollTop
    },
    showSwiper (img) {
      if (img) {
        this.swiperList = img
        this.isShowSwiper = true
      }
    },
    pSwiper (flag) {
      this.isShowSwiper = flag
    }
  }
}
</script>
<style scoped lang="less">
@import './index.less';
</style>
