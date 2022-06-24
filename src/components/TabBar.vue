<template>
  <div class="tab-bar">
    <router-link  class="tab-item" v-for="item in tabs" :key="item.path" :to="item.path">
      <span class="tab-link">{{ item.name }}</span>
    </router-link>
  </div>
</template>

<script setup>
  const tabs = [
    {
      name: "推荐",
      path: "/recommend"
    },
    {
      name: "歌手",
      path: "/singer"
    },
    {
      name: "排行",
      path: "/toplist"
    },
    {
      name: "搜索",
      path: "/search"
    }
  ]
</script>

<style lang="scss" scoped>
.tab-bar{
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;
  .tab-item{
    flex: 1;
    text-align: center;
    .tab-link{
      padding: 5px;
      color: $color-text-l;
      
    }
    &.router-link-active{
      .tab-link{
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
      }
    }
  }
}

</style>  