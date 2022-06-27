<template>
  <div class="singer-list">
    <ul class="view-scroll">
      <li class="group" v-for="groub in singers" :key="groub.tag">
        <h2 class="title">{{ groub.tag }}</h2>
        <ul>
          <li class="item" v-for="item in groub.artists" :key="item.id">
            <div class="avatar">
              <img v-img-lazy="item.picUrl" alt="" />
            </div>
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps(["singers"]);
</script>

<style lang="scss" scoped>
.singer-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .group {
    padding-bottom: 30px;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        position: relative;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        img {
          position: absolute;
          width: 130%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
}
</style>