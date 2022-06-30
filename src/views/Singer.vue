<template>
  <div class="singer" v-loading="!singers.length > 0">
    <my-singerList
      :singers="singers"
      :arrStr="arrSingerCharCode"
      @select="getSinger"
    ></my-singerList>
    <router-view v-slot="{ Component }" >
      <transition name="slide" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import MySingerList from "@/components/singerList.vue";
import { getSingerList } from "@/service/singer";
import { computed, onMounted, ref } from "vue";
import { getSesion, setSesion } from "@/assets/js/storage-api";
import { useRouter } from "vue-router";

const router = useRouter();
// 全部歌手列表
const singers = ref([]);
const arrSingerCharCode = computed(() => {
  let arr = ["热"];
  for (let i = 65; i < 91; i++) {
    arr.push(String.fromCharCode(i));
  }
  return arr;
});
function getSinger(item) {
  // 歌手详情信息
  const detaillObj = {
    imgUrl: item.img1v1Url,
    id: item.id,
    name: item.name,
  };
  setSesion("__detaillObj__", detaillObj);
  router.push({
    path: `/singer/${item.id}`,
  });
}
onMounted(async () => {
  const singer = getSesion("__singerList__");
  if (singer) {
    singers.value = singer;
  } else {
    const result = await getSingerList(arrSingerCharCode.value);
    singers.value = result;
    setSesion("__singerList__", result);
  }
});
</script>

<style lang="scss" scoped>
.singer {
  width: 100%;
  position: fixed;
  bottom: 0;
  top: 88px;
}
</style>