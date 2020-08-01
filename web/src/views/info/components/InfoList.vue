<template functional>
  <div class="activityList">
    <ul>
      <li
        v-for="(item, index) in props.activityList"
        :key="index"
        :style="{ backgroundImage: `url(${item.bgc})` }"
      >
        {{ item.actDesc }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'InfoList',
  props: {
    activityList: {
      type: Array,
      default: () => []
    }
  }
};
</script>
<style scoped lang="less">
@base: 37.5rem;
.info-common (@x,@y) {
  background-size: @x @y;
  padding-left: 24 / @base;
  margin: 18 / @base 0;
}
.activityList {
  ul {
    li {
      // background: left top no-repeat;
      background: url(../../../assets/i4.png) left top no-repeat;
      .info-common(14 / @base, 14 / @base);
      margin: 10 / @base 0;
    }
  }
}
</style>
