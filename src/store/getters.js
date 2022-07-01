const getters = {
  // 当前播放歌曲的对象
  currentSong(state) {
    return state.sequenceList[state.currentIndex] || {}
  }
}

export default getters