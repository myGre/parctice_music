<template>
  <div class="playlist" @click.stop="hide" v-show="showSongList">
    <div class="list-wrapper" @click.stop>
      <div class="list-header">
        <h1 class="title">
          <i class="icon"></i>
          <span class="text">顺序播放</span>
          <span class="clear" @click.stop="showMyconfirm">
            <i class="icon-clear"></i>
          </span>
        </h1>
      </div>
      <my-scroll class="list-content" ref="scrollRef">
        <transition-group ref="playListRef" tag="ul" name="list">
          <li class="item" v-for="(song, index) in playList" :key="index" @click.stop="tebItem(song)">
            <i class="current" :class="playSong(song)"></i>
            <span class="text" :class="{ color: currentSong.id === song.id }">{{ song.name }}</span>
            <span class="favorite">
              <i v-show="currentSong.id === song.id" :class="favoriteIcon"></i>
            </span>
            <span class="delete" @click.stop="deleteSong(song)">
              <i class="icon-delete"></i>
            </span>
          </li>
        </transition-group>
      </my-scroll>
      <div class="list-footer" @click.stop="hide">
        <span>关闭</span>
      </div>
    </div>
    <!-- 弹窗组件 -->
    <my-confirmFade ref="confirmRef" title="是否全部删除" confirmRbtn="清空" @confirm="clearAll"></my-confirmFade>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import MyScroll from "@/components/base/Scroll.vue"
import { computed, ref, nextTick, watch } from 'vue';
import MyConfirmFade from "@/components/base/ConfirmFade.vue"
import useFavorite from '@/assets/js/useFavorite';

const store = useStore()
const playList = computed(() => store.state.playList) // 当前播放列表
const sequenceList = computed(() => store.state.sequenceList) // 源播放列表
const currentSong = computed(() => store.getters.currentSong) // 当前播放歌曲

// hooks
const { favoriteIcon, addOrremoveFavorite } = useFavorite()

const scrollRef = ref(null)
const playListRef = ref(null)
const showSongList = ref(false)
const confirmRef = ref(null)
function playSong(song) {
  if (currentSong.value.id === song.id) return 'icon-play'
}
watch(currentSong, (newSong) => {
  if (newSong.length > 0) {
    scrollToCurrent()
  }
})

// 显示弹窗组件
function showMyconfirm() {
  confirmRef.value.show()
}

// 切换歌曲
function tebItem(song) {
  const index = sequenceList.value.findIndex(item => item.id === song.id)
  store.commit("setCurrentIndex", index);
  store.commit("setPlaying", true)
}
// 删除单首歌曲
function deleteSong(song) {
  store.dispatch("delOneSong", song)
}
// 全部清空
function clearAll(params) {
  store.dispatch("delAllSong")
}
// 置顶当前播放歌曲
function scrollToCurrent() {
  const songId = currentSong.value.id
  const index = playList.value.findIndex(item => item.id === songId)

  const tageEl = playListRef.value.$el.children[index]
  scrollRef.value.scroll.scrollToElement(tageEl, 300)
}
// 歌曲列表的显隐
async function show() {
  showSongList.value = true;
  await nextTick()
  // 等页面加载完成后在scrollToCurrent
  scrollRef.value.scroll.refresh();
  scrollToCurrent();
}
// 关闭歌曲显示
function hide() {
  showSongList.value = false;
}
defineExpose({
  show
})
</script>

<style lang="scss" scoped>
.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;

  &.list-fade-enter-active,
  &.list-fade-leave-active {
    transition: opacity 0.3s;

    .list-wrapper {
      transition: all 0.3s;
    }
  }

  &.list-fade-enter-from,
  &.list-fade-leave-to {
    opacity: 0;

    .list-wrapper {
      transform: translate(0, 100%);
    }
  }

  .list-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 210;
    width: 100%;
    background-color: $color-highlight-background;

    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;

      .title {
        display: flex;
        align-items: center;

        .icon {
          margin-right: 10px;
          font-size: 24px;
          color: $color-theme-d;
        }

        .text {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-l;
        }

        .clear {
          @include extend-click();

          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }

    .list-content {
      position: relative;
      max-height: 280px;
      overflow: hidden;

      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;

        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-small;
          color: $color-theme-d;
        }

        .text {
          flex: 1;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text-l;

          &.color {
            color: rgb(255, 255, 255);
          }
        }

        .favorite {
          @include extend-click();
          margin-right: 15px;
          font-size: $font-size-small;
          color: $color-theme;

          .icon-favorite {
            color: $color-sub-theme;
          }
        }

        .delete {
          @include extend-click();
          font-size: $font-size-small;
          color: $color-theme;

          &.disable {
            color: $color-theme-d;
          }
        }
      }
    }

    .list-add {
      width: 140px;
      margin: 20px auto 30px auto;

      .add {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid $color-text-l;
        border-radius: 100px;
        color: $color-text-l;

        .icon-add {
          margin-right: 5px;
          font-size: $font-size-small-s;
        }

        .text {
          font-size: $font-size-small;
        }
      }
    }

    .list-footer {
      text-align: center;
      line-height: 60px;
      background: $color-background;
      font-size: $font-size-medium-x;
      color: $color-text-l;
    }
  }
}
</style>