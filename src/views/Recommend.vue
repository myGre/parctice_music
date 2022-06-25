<template>
  <div class="recommend">
    <!-- 轮播 -->
    <my-slider v-if="sliders.length" :sliders=sliders></my-slider>
  </div>
</template>

<script setup>
import { getBanners } from "@/service/recommend"
import MySlider from "@/components/Slider.vue"
import { onMounted, ref } from "vue";

let sliders = ref([])
onMounted( async() => {
  // 获取轮播图
  const result = await getBanners()
  if (result.code == 200) {
   sliders.value = result.banners
  }
});
</script>

<style lang="scss" scoped>
.recommend{
}
</style>