<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script setup>
import { useScroll } from "@/assets/js/useScroll"
const props = defineProps({
  probeType: {
    type: Number,
    default: 1
  }
})
const emit = defineEmits(["scroll"])

const { rootRef, scroll } = useScroll(props, emit)

// 暴露srcoll给父组件用
defineExpose({
  scroll,
})
</script>

<style lang="scss" scoped>

</style>