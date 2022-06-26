<template>
  <div class="slider" ref="rootRef">
    <div class="slider-group">
      <div class="slider-page" v-for="item in sliders" :key="item.encodeId">
        <img :src="item.imageUrl" alt="">
      </div>
    </div>
    <div class="dost-wrapper">
      <span class="dot" v-for="(item, index) in sliders " :key="index" :class="{ active: index === currentPageIndex }"> </span>
    </div>
  </div>
</template>

<script setup>
import {useSlider} from '@/assets/js/useSlider'
const props = defineProps({
  sliders: {
    type: Array,
    require: true
  }
});
const { rootRef, currentPageIndex } = useSlider();
</script>

<style lang="scss" scoped>
.slider{
  min-height: 1px;
  font-size: 0;
  touch-action: pan-y;
  position: relative;
  .slider-group{
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-page{
      display: inline-block;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      overflow: hidden;
      img{
        display: inline-block;
        width: 100%;
      }
    }
  }
  .dost-wrapper{
    position: absolute;
    left: 50%;
    bottom: 10px;
    // line-height: 10px;
    transform: translateX(-50%);
    .dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin: 0 4px;
      transform: translateZ(1px);
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>