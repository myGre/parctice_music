const state = {
  // 当前播放的列表
  sequenceList: [],
  // 源播放列表
  playList: [],
  // 播放状态
  playing: false,
  // 播放模式：1.顺序播放 2.单曲循环 3.随机播放
  playmode: 1,
  // 全屏播放器/mini播放器
  fullScreen: false,
  // 当前播放歌曲的索引
  currentIndex: 0,
  // 最爱的歌曲列表
  favoriteList: [],
  // 历史播放记录
  playHistory: []
}

export default state