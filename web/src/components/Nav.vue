<template functional>
 <nav class="nav-container">
      <ul class="nav-main">
        <li v-for="(item, index) in props.navList" :key="index" class="nav-item">
          <router-link :to="item.link" class="nav-link">{{ item.name }}</router-link>
        </li>
      </ul>
    </nav>
</template>

<script>
export default {
  props: ['navList']
};
</script>
<style scoped lang='less'>
@base: 37.5rem;
.nav- {
  &container {
    position: sticky;
    top: 0;
    z-index: 100;
    background: #fff;
  }
  &main {
    display: flex;
    height: 40 / @base;
    min-height: 40 / @base;
  }
  &item {
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
    text-align: center;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }
  &link {
    display: inline-block;
    font-size: 16 / @base;
    text-align: center;
    line-height: 40 / @base;
  }
}
</style>