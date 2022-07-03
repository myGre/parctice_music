<template>
  <div class="progress-bar" @click="OnClik">
    <!-- 播放进度条容器 -->
    <div class="bar-inner" 
    ref="progressWidthRef" 
    @touchstart.stop="OnTouchStart"
    @touchmove.stop="OnTouchMove" 
    @touchend.stop="OnTouchEnd"
    >
      <!-- 实际播放进度条 -->
      <div class="progress" :style="progressStyle" ref="progressRef"></div>
      <div class="progress-btn-wrapper" :style="btnStyle">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';

const emit = defineEmits(["progressMove", "progressEnd"])
const touch = {} // 记录touch移动位置
const btnWidth = 16 // 小球的宽度
const offset = ref(0) // 当前进度
const maxWidth = ref(0) // 总宽度
const progressWidthRef = ref(null) // 进度条容器节点
const progressRef = ref(null) // 实际进度条
const props = defineProps({
  progress: {
    type: Number,
    default: 0
  }
})
watch(() => props.progress, (newProgress) => {
  // 当前时长 / 总时长 = 当前宽度 / 总宽度
  // 总宽度 = 进度条长度 - 小球宽度
  offset.value = newProgress * maxWidth.value
})

// 手指触摸时
function OnTouchStart(e) {
  touch.x1 = e.touches[0].pageX; // 手指落下时X坐标的位置
  touch.duration = progressRef.value.clientWidth // 初始进度条的位置
}
// 手指触摸移动时
function OnTouchMove(e) {
  // 计算x坐标差值
  const difference = e.touches[0].pageX - touch.x1
  const temp = touch.duration + difference // 触摸后x坐标位置
  // 限制范围
  offset.value = Math.max(0, Math.min(temp, maxWidth.value))
  // 给父组件计算currentTime
  const progress = offset.value / maxWidth.value
  emit("progressMove", progress)
}
// 手指离开时
function OnTouchEnd(e) {
  // 给父组件计算currentTime
  const progress = offset.value / maxWidth.value
  emit("progressEnd", progress)
}
// 点击进度条
function OnClik(e) {
  const offsetWidth = Math.min(e.offsetX, maxWidth.value)
  const progress = offsetWidth / maxWidth.value
  emit("progressEnd", progress)
}
const progressStyle = computed(() => `width: ${offset.value}px;`)
const btnStyle = computed(() => `transform: translate(${offset.value}px, 0);`)
onMounted(() => {
  maxWidth.value = progressWidthRef.value.clientWidth - btnWidth
})
</script>

<style lang="scss" scoped>
.progress-bar {
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);

    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>