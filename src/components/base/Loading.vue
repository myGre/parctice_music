<template>
  <div class="loading">
    <div class="loading-content">
      <img src="@/assets/images/loading.gif" alt="" style="width: 24px; height: 24px;" />
      <p class="desc">正在加载中...</p>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  .loading-content {
    text-align: center;
    .desc {
      line-height: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
    }
  }
}
</style>