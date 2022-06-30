const getters = {
  // 当前播放歌曲的对象
  currentSong(state) {
    return state.sequenceList(currentIndex)
  }
}

export default getters