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

const { rootRef } = useScroll(props)
</script>

<style lang="scss" scoped>

</style>