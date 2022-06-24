<template>
  <div class="header">
    <span class="icon"></span>
    <h1 class="text">music_partice</h1>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.header{
  height: 44px;
  text-align: center;
  color: $color-theme;
  font-size: 0;
  .icon{
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 32px;
    margin-top: 6px;
    @include bg-image("../assets/images/logo");
    background-size: cover;
  }
  .text{
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: $font-size-large;

  }
}
</style>