const mutations = {
  // 当前播放列表
  setSequenceList(state, list){
    state.sequenceList = list
  },
  // 源播放列表
  setPlayList(state, list) {
    state.playList = list
  },
  // 播放状态
  setPlaying(state, play){
    state.playing = play
  },
  // 播放模式：0.顺序播放 1.单曲循环 2.随机播放
  setPlaymode(state, mode){
    state.playmode = mode
  },
  // 全屏播放器/mini播放器
  setFullScreen(state, screen){
    state.fullScreen = screen
  },
  // 当前播放歌曲的索引
  setCurrentIndex(state, index){
    state.currentIndex = index
  },
  // 最爱的歌曲列表
  setFavoriteList(state, list){
    state.favoriteList = list
  },
  // 历史播放记录
  setPlayHistory(state, list){
    state.playHistory = list
  }
}

export default mutations