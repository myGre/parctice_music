<template>
  <div class="mini-player">
    <div class="cd-wrapper">
      <div class="cd" :style="cdStyle">
        <img :src="currentSong.al.picUrl" @click.stop="switchPlay()" />
      </div>
    </div>
    <div class="slider-wrapper">
      <h2 class="name">{{ currentSong.al.name }}</h2>
      <p class="desc">{{ handle(currentSong) }}</p>
    </div>
    <!-- 进度条圈圈 -->
    <div class="control">
      <my-progressCircle :radius="32" :progress="progress">
        <i class="icon-mini" :class="miniIconStyle" @click.stop="playState"></i>
      </my-progressCircle>
    </div>
    <div class="control" @click="showPlayList">
      <i class="icon-playlist"></i>
    </div>
    <my-playList ref="playListRef"></my-playList>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import MyProgressCircle from '@/components/play/ProgressCircle'
import MyPlayList from "./PlayList.vue"

const playListRef = ref(null)
const store = useStore()
const props = defineProps(["cdStyle", "playState", "handle", "progress", "switchPlay"])

const currentSong = computed(() => store.getters.currentSong)
const playing = computed(() => store.state.playing)

const miniIconStyle = computed(() => {
  return playing.value ? "icon-pause-mini" : "icon-play-mini"
})

// 显示歌曲列表
function showPlayList(params) {
  playListRef.value.show()
}
</script>

<style lang="scss" scoped>
.mini-player {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 180;
  width: 100%;
  height: 60px;
  background: $color-highlight-background;

  .cd-wrapper {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;

    .cd {
      position: relative;
      height: 100%;
      width: 100%;
      animation: rotate 10s linear infinite;
      overflow: hidden;
      border-radius: 50%;

      img {
        position: absolute;
        width: 130%;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
      }
    }
  }

  .slider-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;

    .name {
      margin-bottom: 2px;
      @include no-wrap();
      font-size: $font-size-medium;
      color: $color-text;
    }

    .desc {
      @include no-wrap();
      font-size: $font-size-small;
      color: $color-text-d;
    }
  }

  .control {
    flex: 0 0 30px;
    width: 30px;
    padding: 0 10px;

    .icon-mini {
      position: absolute;
      left: 0;
      top: 0;
      color: $color-theme-d;
      font-size: 32px;
    }

    .icon-playlist {
      position: relative;
      top: -2px;
      font-size: 28px;
      color: $color-theme-d;
    }
  }

  &.mini-enter-active,
  &.mini-leave-active {
    transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
  }

  &.mini-enter-from,
  &.mini-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
}
</style>