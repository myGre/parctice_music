<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100">
      <circle class="progress-background" cx="50" cy="50" r="50" fill="transparent" />

      <circle class="progress-bar" cx="50" cy="50" r="50" fill="transparent" :stroke-dasharray="dasharray"
        :stroke-dashoffset="dashoffset" />
    </svg>
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue';


const props = defineProps({
  radius: {
    type: Number,
    default: 100
  },
  progress: {
    type: Number,
    default: 0
  },
})
const dasharray = Math.PI * 2 * 50 // 小圆圈的周长

const dashoffset = computed(() => {
  return (1 - props.progress) * dasharray
})
</script>

<style lang="scss" scoped>
.progress-circle {
  position: relative;

  circle {
    stroke-width: 8px;
    transform-origin: center;

    &.progress-background {
      transform: scale(0.9);
      stroke: $color-sub-theme;
    }

    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: $color-theme;
    }
  }
}
</style>