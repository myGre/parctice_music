import { getLocal } from "@/assets/js/storage-api"

const state = {
  // 当前播放的列表
  sequenceList: [],
  // 源播放列表
  playList: [],
  // 播放状态
  playing: false,
  // 播放模式：0.顺序播放 1.单曲循环 2.随机播放
  playmode: Number(getLocal("__mode__")) || 0,
  // 全屏播放器/mini播放器
  fullScreen: false,
  // 当前播放歌曲的索引
  currentIndex: 0,
  // 最爱的歌曲列表
  favoriteList: getLocal("___favoriteList__") || [],
  // 历史播放记录
  playHistory: []
}

export default state