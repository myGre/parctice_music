<template>
  <my-scroll class="singer-list" :probeType="3" @scroll="onScroll">
    <ul class="view-scroll" ref="groupRef">
      <li class="group" v-for="groub in singers" :key="groub.tag">
        <h2 class="title">{{ groub.tag }}</h2>
        <ul>
          <li class="item" v-for="item in groub.artists" :key="item.id">
            <div class="avatar">
              <img v-img-lazy="item.picUrl" alt="" />
            </div>
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="fixed" v-if="fixedTag">
      <h2 class="fixed-title">{{ fixedTag }}</h2>
    </div>
  </my-scroll>
</template>

<script setup>
import useFixed from '@/assets/js/useFixed'
import MyScroll from "@/components/base/Scroll.vue";
import { computed, ref } from "vue";
const scrollY = ref(0)
const props = defineProps({
  singers: {
    type: Array,
    require: true,
  },
});
const { onScroll, groupRef, fixedTag } = useFixed(props)
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
}
</style>