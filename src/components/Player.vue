<template>
  <div class="player" v-if="playList.length">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img />
      </div>
      <div class="top">
        <div class="back" @click="geBack">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{ currentSong.name }}</h1>
        <h2 class="subtitle">{{ handle(currentSong) }}</h2>
      </div>
      <div class="middle">
        <div class="middle-l">
          <div class="cd-wrapper playing" :style="cdStyle">
            <div class="cd">
              <img class="image" :src="currentSong.al.picUrl" />
            </div>
          </div>
          <div class="playing-lyric-wrapper">
            <div class="playing-lyric">歌词占位</div>
          </div>
        </div>
        <!-- middle-r -->
      </div>
      <div class="bottom">
        <div class="dot-wrapper">
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <div class="progress-wrapper">
          <span class="time time-l">播放当前时长</span>
          <div class="progress-bar-wrapper">进度条占位</div>
          <span class="time time-r">播放总时长</span>
        </div>
        <div class="operators">
          <div class="icon i-left">
            <i class="icon-sequence"></i>
          </div>
          <div class="icon i-left">
            <i class="icon-prev"></i>
          </div>
          <div class="icon i-center" @click="playState">
            <i :class="playStyly"></i>
          </div>
          <div class="icon i-right">
            <i class="icon-next"></i>
          </div>
          <div class="icon i-right">
            <i class="icon-not-favorite"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <audio ref="audioRef"></audio>
</template>

<script setup>

import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { getSong } from "@/service/player"

const store = useStore()
// 正在播放列表
const sequenceList = computed(() => store.state.sequenceList)
// 源播放列表
const playList = computed(() => store.state.playList)
// 播放状态
const playing = computed(() => store.state.playing)
// 全局控件
const fullScreen = computed(() => store.state.fullScreen)
// 正在播放的歌曲对象
const currentSong = computed(() => store.getters.currentSong)
const currentIndex = computed(() => store.getters.currentIndex)
const playStyly = computed(() => {
  return playing.value ? "icon-pause" : "icon-play"
})
const audioRef = ref(null)
function geBack() {
  store.commit("setFullScreen", false)
}
const handle = (item) => {
  return item.ar
    .map((songObj) => {
      return songObj.name;
    })
    .join("/");
};
// CD样式
const cdStyle = computed(()=>{
  return {
    animationPlayState: playing.value ? "running" : "paused"
  }
})
// 播放状态
function playState() {
  store.commit("setPlaying", !playing.value)
}
watch(playing, (newPlaying) => {
  let audio = audioRef.value
  if (newPlaying) {
    audio.play()
  } else {
    audio.pause()
  }
})
watch(currentSong, async (newSong) => {
  if (!newSong.id) return
  let { data } = await getSong(newSong.id)
  let url = data[0].url
  // 没有版权
  if (!url) {
    // 播放下一首歌曲
    store.commit("setCurrentIndex", currentIndex++)
    // 如果为最后一首
    if (currentIndex === sequenceList.value.length - 1) {
      store.commit("setCurrentIndex", 0)
    }
  }
  let audio = audioRef.value
  audio.src = url
  audio.play()
})
onMounted(() => {
  // console.log(store);
})
</script>

<style lang="scss" scoped>
.player {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;

  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);

      img {
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .top {
      position: relative;
      margin-bottom: 25px;

      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
      }

      .icon-back {
        display: block;
        padding: 9px;
        font-size: $font-size-large-x;
        color: $color-theme;
        transform: rotate(-90deg);
      }

      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }

      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }

    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;

        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;
          overflow: hidden;
          height: 100%;
          border-radius: 50%;
          border: 10px solid rgba(255, 255, 255, 0.1);

          &.playing {
            animation: rotate 20s linear infinite;
          }

          .cd {
            width: 100%;

            img {
              position: absolute;
              left: 50%;
              top: 50%;
              height: 100%;
              box-sizing: border-box;
              transform: translate(-50%, -50%);
            }
          }
        }

        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;

          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }

      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;

          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;

            &.current {
              color: $color-text;
            }
          }

          .pure-music {
            padding-top: 50%;
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;

      .dot-wrapper {
        text-align: center;
        font-size: 0;

        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;

          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }

      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;

        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 40px;
          line-height: 30px;
          width: 40px;

          &.time-l {
            text-align: left;
          }

          &.time-r {
            text-align: right;
          }
        }

        .progress-bar-wrapper {
          flex: 1;
        }
      }

      .operators {
        display: flex;
        align-items: center;

        .icon {
          flex: 1;
          color: $color-theme;

          &.disable {
            color: $color-theme-d;
          }

          i {
            font-size: 30px;
          }
        }

        .i-left {
          text-align: right;
        }

        .i-center {
          padding: 0 20px;
          text-align: center;

          i {
            font-size: 40px;
          }
        }

        .i-right {
          text-align: left;
        }

        .icon-favorite {
          color: $color-theme;
        }
      }
    }

    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.6s;

      .middle-l,
      .top,
      .bottom {
        transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
      }
    }

    &.normal-enter-from,
    &.normal-leave-to {
      opacity: 0;

      .top {
        transform: translate3d(0, -100px, 0);
      }

      .bottom {
        transform: translate3d(0, 100px, 0);
      }

      .middle-l {
        transform: scale(0);
      }
    }
  }
}
</style>