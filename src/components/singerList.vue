<template>
  <my-scroll
    class="singer-list"
    :probeType="3"
    @scroll="onScroll"
    ref="scrollRef"
  >
    <ul class="view-scroll" ref="groupRef">
      <li class="group" v-for="groub in singers" :key="groub.tag">
        <h2 class="title">{{ groub.tag }}</h2>
        <ul>
          <li class="item" v-for="item in groub.artists" :key="item.id" @click="singer(item)">
            <div class="avatar">
              <img v-img-lazy="item.picUrl" alt="" />
            </div>
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 吸顶栏 -->
    <div class="fixed" v-if="fixedTag" :style="fixedStyle">
      <h2 class="fixed-title">{{ fixedTag }}</h2>
    </div>
    <!-- 侧边栏 -->
    <div class="shortcut">
      <ul>
        <li
          class="item"
          v-for="(item, index) in arrStr"
          :key="index"
          :class="{ current: currentIndex === index }"
          :data-index = "index"
          @touchstart.prevent.stop="onShortcutTargeEl"
          @touchmove.prevent.stop="onShortcutTargeElMove"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </my-scroll>
</template>

<script setup>
import useFixed from "@/assets/js/useFixed";
import useShortcut from "@/assets/js/useShortcut";
import MyScroll from "@/components/base/Scroll.vue";
import { computed, ref } from "vue";
const emit = defineEmits(["select"])
const props = defineProps({
  singers: {
    type: Array,
    require: true,
  },
  arrStr: {
    type: Array,
    require: true,
  },
});
function singer(item){
  emit("select", item)
}
const { onScroll, groupRef, fixedTag, fixedStyle, currentIndex } =
  useFixed(props);
const { scrollRef, onShortcutTargeEl, onShortcutTargeElMove } = useShortcut(groupRef);
</script>

<style lang="scss" scoped>
.singer-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .group {
    padding-bottom: 30px;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        position: relative;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        img {
          position: absolute;
          width: 130%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  // 吸顶
  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
  // 侧边栏
  .shortcut {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        // 高亮当前区间的字母高亮
        color: $color-theme;
      }
    }
  }
}
</style>