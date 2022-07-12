<template>
  <div class="recommend" v-loading="loading">
    <my-scroll class="recommend-content">
      <div>
        <!-- 轮播 -->
        <div class="silder-wrapper">
          <div class="slider-content">
            <my-slider v-if="sliders.length" :sliders="sliders"></my-slider>
          </div>
        </div>
        <div class="recommend-list">
          <h2 class="list-title">热门推荐歌单</h2>
          <ul>
            <li class="recommend-item" @click="getPlayListDetail(item)" v-for="item in playlist" :key="item.id">
              <div class="icon">
                <img v-img-lazy="item.coverImgUrl" alt="" style="width: 60px; height: 60px" />
              </div>
              <p class="text">
                <span class="name">{{ item.name }}</span>
                <span class="description">{{ item.description }}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </my-scroll>
  </div>
  <router-view v-slot="{ Component }">
    <transition name="slide" appear>
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import { getBanners, getPlaylist, getPlayDetail } from "@/service/recommend";
// 回滚动画插件
import MyScroll from "@/components/base/Scroll.vue";
// 轮播图插件
import MySlider from "@/components/base/Slider.vue";
import { computed, onMounted, ref } from "vue";
import { get } from "@/service/base";
import { setSesion } from "@/assets/js/storage-api";
import { useRouter } from "vue-router"

const router = useRouter()
// 轮播数据
let sliders = ref([]);
// 推荐歌单
const playlist = ref([]);
// 获取歌单详情
function getPlayListDetail(item) {
  // 歌单详情信息
  const detaillObj = {
    imgUrl: item.coverImgUrl,
    id: item.id,
    name: item.name,
  };
  setSesion("__plauListDetaill__", detaillObj);
  router.push({
    path: `/recommend/${item.id}`,
  });
}
// 自定义过渡动画,为TRUE时开启loading
const loading = computed(() => !sliders.value.length > 0 || !playlist.value.length > 0)
onMounted(async () => {
  // 获取轮播图数据
  const result = await getBanners();
  if (result.code == 200) {
    sliders.value = result.banners;
  }
  // 推荐歌单
  const result1 = await getPlaylist();
  playlist.value = result1.playlists;
});
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  overflow: scroll;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
    }

    .recommend-item {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      padding: 0 20px 20px 20px;

      .icon {
        flex: 0 0 60px;
        width: 60px;
        padding-right: 20px;
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        font-size: $font-size-medium;

        .name {
          margin-bottom: 10px;
          color: $color-text-ll;
        }

        .description {
          @include no-wrap();
          color: $color-text-d;
        }
      }
    }
  }
}
</style>