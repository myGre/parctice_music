<template>
  <div class="singer-detail">
    <my-musiclist :title="title" :imgUrl="imgUrl" :songList="songList"></my-musiclist>
  </div>
</template>

<script setup>
import MyMusiclist from "@/components/base/musicList.vue";
import { getArtists } from "@/service/singer";
import { computed, onMounted, ref } from "@vue/runtime-core";
import { getLocal } from "@/assets/js/storage-api"

// 歌手详细信息
const detaillObj = computed(()=>{
  return getLocal("__detaillObj__") || []
})
// 歌曲列表
const songList = ref([])
const title = computed(()=>{
  return detaillObj.value.name
})
// 背景图
const imgUrl = computed(()=>{
  return detaillObj.value.imgUrl
})
onMounted( async() => {
  const result = await getArtists(detaillObj.value)
  songList.value = result.hotSongs
});
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
  z-index: 1;
}
</style>