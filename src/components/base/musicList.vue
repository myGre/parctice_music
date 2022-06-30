<template>
  <div class="music-list">
    <!-- 返回按钮 -->
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <!-- 标题 -->
    <h1 class="title">{{ title }}</h1>
    <!-- 背景图 -->
    <div class="bg-image" :style="bgImageStyle()" ref="imgRef">
      <div class="play-btn-wrapper">
        <div class="play-btn" :style="playBtnStyle" v-if="songList.length">
          <i class="icon-play"></i>
          <span class="text">顺序播放全部</span>
        </div>
      </div>
      <!-- 遮罩层 -->
      <div class="filter" :style="filterStyle"></div>
    </div>
    <!-- 歌曲列表 -->
    <my-scroll
      class="list"
      :probeType="3"
      :style="songListStyle"
      @scroll="onscroll"
    >
      <div class="song-list-wrapper" v-loading="loading">
        <my-songlist :songList="songList"></my-songlist>
      </div>
    </my-scroll>
  </div>
</template>

<script setup>
import MyScroll from "@/components/base/Scroll.vue";
import MySonglist from "@/components/base/songList.vue";
import { useRouter } from "vue-router"
const { onMounted, ref, computed } = require("@vue/runtime-core");
const router = useRouter()
const props = defineProps({
  imgUrl: String,
  title: String,
  songList: {
    type: Array,
    default: [],
  },
  loading: {
    type: Boolean,
    default: true,
  },
});
// 触摸滑动的距离
const scrollY = ref(0);
const imgRef = ref(0);
// 图片的高度
const styleHeight = ref();
// 歌曲列表的最大top
const maxSongListTop = ref({});

function bgImageStyle() {
  // 歌曲列表height
  let height = "40%";
  let zIndex = 0;
  // 缩放比例
  let scale = 1;
  if (scrollY.value > maxSongListTop.value) {
    height = "40px";
    zIndex = 1;
  }
  if (scrollY.value < 0) {
    // transform: scale(xx)
    // xx = scrollY.value == 背景放大的量
    scale = scale + -scrollY.value / styleHeight.value;
  }
  return {
    backgroundImage: `url(${props.imgUrl})`,
    height,
    zIndex,
    transform: `scale(${scale})`,
  };
}
// 全局播放按钮
const playBtnStyle = computed(() => {
  let display = "block";
  if (scrollY.value > maxSongListTop.value) {
    display = "none";
  }
  return {
    display,
  };
});
// 歌曲列表top值
const songListStyle = computed(() => {
  return {
    top: `${styleHeight.value}px`,
  };
});

// 遮罩层背景层滤镜
const filterStyle = computed(() => {
  let blur = 0;
  if (scrollY.value) {
    blur = Math.min(scrollY.value / 25, 15);
  }
  return {
    backdropFilter: `blur(${blur}px)`,
  };
});
function onscroll(pos) {
  scrollY.value = -pos.y;
}
// 返回按钮
function goBack() {
  router.go(-1)
}
onMounted(() => {
  styleHeight.value = imgRef.value.clientHeight; // imgRef节点的高度
  maxSongListTop.value = styleHeight.value - 40;
});
</script>

<style lang="scss" scoped>
.music-list {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 40%;
    transform-origin: top;
    background-size: cover;
    z-index: 0;
    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    .song-list-wrapper {
      padding: 20px 30px;
      min-height: 350px;
      background: $color-background;
    }
  }
}
</style>