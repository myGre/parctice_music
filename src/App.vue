<template>
  <nav>
    <my-header></my-header>
  </nav>
  <my-tabBar></my-tabBar>
  <router-view/>
</template>
<script setup>
  import MyHeader from "@/components/Header"
  import MyTabBar from "@/components/TabBar"
</script>
<style lang="scss">
</style>
