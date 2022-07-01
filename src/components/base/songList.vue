<template>
  <ul class="song-list">
    <li class="item" v-for="item in songList" :key="item.id" @click="getSong(item)">
      <div class="content">
        <h3 class="name">{{ item.name }}</h3>
        <p class="desc">{{ handle(item) }}</p>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";

const store = useStore()
const props = defineProps(["songList"]);
const handle = (item)=>{
  return item.ar
    .map((songObj) => {
      return songObj.name;
    })
    .join("/");
};
function getSong(item) {
  store.dispatch("addOnePlay", item)
}
</script>

<style lang="scss" scoped>
.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        @include no-wrap();
        color: $color-text-ll;
      }
      .desc {
        @include no-wrap();
        margin-top: 4px;
        color: $color-text-d;
      }
    }
  }
}
</style>