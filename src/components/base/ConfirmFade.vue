<template>
  <!-- 定位到body位置 -->
  <teleport to='body'>
    <transition name="confirm-fade">
      <div class="confirm" v-show="isShow">
        <div class="confirm-wrapper">
          <div class="confirm-content">
            <p class="text">{{ title }}</p>

            <div class="operate">
              <div class="operate-btn left" @click.stop="cancel">{{ confirmLbtn }}</div>
              <div class="operate-btn" @click.stop="confirm">{{ confirmRbtn }}</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref } from 'vue';


const isShow = ref(false)
const emit = defineEmits(['confirm', 'cancel'])
const props = defineProps({
  title: {
    type: String,
    default: "是否全部删除"
  },
  confirmRbtn: {
    type: String,
    default: "确定"
  },
  confirmLbtn: {
    type: String,
    default: "取消"
  },
})

function show() {
  isShow.value = true
}
function hide() {
  isShow.value = false
}
// 确定
function confirm() {
  emit("confirm")
  hide()
}
// 取消
function cancel() {
  hide()
}

defineExpose({
  show
})
</script>

<style lang="scss" scoped>
.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 998;
  background-color: $color-background-d;

  &.confirm-fade-enter-active {
    animation: confirm-fadein 0.3s;

    .confirm-content {
      animation: confirm-zoom-in 0.3s;
    }
  }

  &.confirm-fade-leave-active {
    animation: confirm-fadeout 0.3s;

    .confirm-content {
      animation: confirm-zoom-out 0.3s;
    }
  }

  .confirm-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;

    .confirm-content {
      width: 270px;
      border-radius: 13px;
      background: $color-highlight-background;

      .text {
        padding: 19px 15px;
        line-height: 22px;
        text-align: center;
        font-size: $font-size-large;
        color: $color-text-l;
      }

      .operate {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: $font-size-large;

        .operate-btn {
          flex: 1;
          line-height: 22px;
          padding: 10px 0;
          border-top: 1px solid $color-background-d;
          color: $color-text-l;

          &.left {
            border-right: 1px solid $color-background-d;
            color: $color-text;
          }
        }
      }
    }
  }
}

@keyframes confirm-fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes confirm-fadeout {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes confirm-zoom-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes confirm-zoom-out {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}
</style>