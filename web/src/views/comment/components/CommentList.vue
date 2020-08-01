<template functional>
  <div class="comment-list">
    <ul>
      <li v-for="(item, index) in props.list" :key="index" class="clearfix">
        <div class="comment-left fl">
          <img
            :src="item.userPicUrl ? item.userPicUrl : props.defaultAvatar"
            alt
          />
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
              >
                <img
                  @click="listeners.swiper(item.pictures, true)"
                  :src="item1.bigPicUrl"
                  class="imgs"
                />
              </li>
            </ul>
          </div>
          <div class="label">{{ item.label }}</div>
          <div class="shopReply">{{ item.shopReply }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CommentList',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    defaultAvatar: {
      type: String,
      default: require('../../../assets/uerpic.png')
    }
  }
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.comment-list {
  ul {
    padding-left: 15 / @base;
    background-color: #fff;
    // margin-bottom: 40/@base;
    li {
      padding: 15 / @base 15 / @base 10 / @base 0;
      overflow: hidden;
      background-color: #fff;
      position: relative;
    }
  }
  .comment-left {
    width: 15%;
    img {
      width: 40 / @base;
      height: 40 / @base;
      border-radius: 50%;
    }
  }
  .comment-right {
    width: 85%;
    header {
      line-height: 15 / @base;
      .name {
        color: #2f2f2f;
        font-size: 16 / @base;
      }
      .time {
        font-size: 12 / @base;
        color: #898989;
      }
    }
    .deliveryTime {
      color: #666;
      font-size: 12 / @base;
      line-height: 12 / @base;
      margin-top: 7 / @base;
    }
    .content {
      font-size: 14 / @base;
      line-height: 20 / @base;
      color: #2f2f2f;
      padding-top: 14 / @base;
      padding-bottom: 8p;
    }
    .pictures {
      img {
        width: 80 / @base;
        height: 80 / @base;
        float: left;
        margin-right: 5 / @base;
        margin-bottom: 5 / @base;
      }
    }
    .label {
      margin: 4 / @base 0;
      font-size: 12 / @base;
      padding: 5 / @base 8 / @base;
    }
    .shopReply {
      background: #f4f4f4;

      font-size: 12 / @base;
      color: #666;
    }
  }
}
</style>
