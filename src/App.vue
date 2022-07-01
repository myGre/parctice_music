<template>
  <nav>
    <my-header></my-header>
    <my-tabBar></my-tabBar>
    <router-view />
  </nav>
  <my-player></my-player>
</template>
<script setup>
import MyHeader from "@/components/Header"
import MyTabBar from "@/components/TabBar"
import MyPlayer from "./components/Player.vue";
</script>
<style lang="scss">
</style>
