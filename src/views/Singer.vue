<template>
  <div class="singer">
    <my-singerList :singers="singers"></my-singerList>
  </div>
</template>

<script setup>
import MySingerList from "@/components/singerList.vue"
import { getSingerList } from "@/service/singer"
import { computed, onMounted, ref } from "vue"
// 全部歌手列表
const singers = ref([])
const arrSingerCharCode = computed(()=> {
  let arr = ["热"]
  for (let i = 65; i < 91; i++){
    arr.push(String.fromCharCode(i))
  }
  return arr
})
onMounted(async()=>{
  const result = await getSingerList(arrSingerCharCode.value)
  singers.value = result
})
</script>

<style lang="scss" scoped>

</style>