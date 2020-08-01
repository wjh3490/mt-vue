<template>
  <div class="btn clearfix">
    <div class="left fl" v-if="count1[spuId]">
      <span
        class="del"
        @click.stop.prevent="
          delCart({
            spuId
          })
        "
      ></span>
      <span class="center fr" ref="span">{{ count1[spuId] }}</span>
    </div>
    <span
      class="add"
      @click.stop.prevent="
        addCart({
          currentPrice,
          originPrice,
          spuId,
          tag,
          spuName
        })
      "
    ></span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'Count',
  props: {
    currentPrice: Number,
    originPrice: Number,
    spuId: Number,
    tag: String,
    spuName: String
  },
  computed: {
    ...mapGetters(['count1'])
  },
  methods: {
    ...mapMutations(['addCart', 'delCart'])
  }
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.common(@url) {
  background: url(@url);
  border-radius: 50%;
  display: inline-block;
  height: 25 / @base;
  width: 25 / @base;
  background-size: 100% 100%;
  border: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}
.btn {
  position: absolute;
  right: 0;
  bottom: -2 / @base;
  height: 25 / @base;
  // width: 80 / @base;
  .add {
    .common('../assets/add.png');
    float: right;
  }
  .del {
    .common('../assets/del.png');
  }
  .center {
    padding: 0 10 / @base;
    text-align: center;
    color: #333333;
    font-size: 16 / @base;
  }
}
</style>
