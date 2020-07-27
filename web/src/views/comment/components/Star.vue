<template>
  <div>
    <span
      v-for="(item, index) in list"
      :key="index"
      :class="item"
      @click="fn(index)"
    ></span>
    <!-- <p v-html="com"></p> -->
  </div>
</template>

<script>
export default {
  props: {
    comRate: {
      type: Number
    }
  },
  data() {
    return {
      id: -1,
      count: 3.6 /* 可以修改初始的评分 */
    };
  },
  methods: {
    fn(index) {
      this.id = index + 1;
    }
  },
  computed: {
    list() {
      let score = this.comRate || this.id;
      let arr = [];

      let newScore = Math.floor(score * 2) / 2;
      let remainder = newScore % 1 !== 0;
      let allCount = Math.floor(newScore);

      for (let i = 0; i < allCount; i++) arr.push('on');
      if (remainder) arr.push('half');
      while (arr.length < 5) arr.push('off');

      return arr;
    }
    // com () {
    //   let a = ['差', '一般', '还行', '好', '很棒']
    //   return a.filter((item, index) => this.id === index + 1).toString()
    // }
  }
};
</script>
<style scoped lang="less">
@base: 37.5rem;
span {
  display: inline-block;
  width: 16 / @base;
  height: 16 / @base;
  background: url(../../../assets/star.png) 1 / @base 0 / @base no-repeat;
  background-size: 100%;
  &.on {
    background: url(../../../assets/star.png) 1 / @base 0 / @base no-repeat;
    background-size: 100%;
  }
  &.off {
    background: url(../../../assets/star.png) 1 / @base -32 / @base no-repeat;
    background-size: 100%;
  }
  &.half {
    background: url(../../../assets/star.png) 1 / @base -16 / @base no-repeat;
    background-size: 100%;
  }
}
</style>
