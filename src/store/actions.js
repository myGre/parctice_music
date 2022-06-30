const actions = {
  // --------添加一首歌到当前播放歌曲后面--------
  addOnePlay({ commit, state }, play) {
    let sequenceList = state.sequenceList  // 当前的播放列表
    let playList = state.playList // 源播放列表
    let currentIndex = state.currentIndex // 当前播放歌曲的索引
    // 判断该歌曲是否存在于sequenceList列表
    let sequenceIndex = findIndex(sequenceList, play)
    // 添加到当前播放歌曲后面
    sequenceList.splice(currentIndex + 1, 0, play)
    // 不存在
    if (sequenceIndex < 0) {
      currentIndex++
      // 添加到源播放列表
      playList.unshift(play)
      if (sequenceList.length == 1) {
        currentIndex = 0
      }
    } else {
      // 在当前播放歌曲前面
      if (sequenceIndex < currentIndex) {
        sequenceList.splice(sequenceIndex, 1)
      }
      // 在当前播放歌曲后面
      if (sequenceIndex > currentIndex) {
        sequenceList.splice(sequenceIndex + 1, 1)
        currentIndex++
      }
    }
    // 设置当前播放列表
    commit("setSequenceList", sequenceList)
    // 设置当前播放歌曲的索引
    commit("setCurrentIndex", currentIndex)
    // 设置当前播放模式：1.顺序播放 2.单曲循环 3.随机播放
    commit("setClaymode", 1)
    // 设置全屏播放
    commit("setFullScreen", true)
    // 播放状态
    commit("setPlaying", true)
  },
  // --------覆盖播放全部歌曲--------
  AddPlayList({ commit }, list) {
    commit("setSequenceList", list)
  },
  // --------修改播放模式--------
  updateMode({ commit, state }, mode) {
    let sequenceList = state.sequenceList  // 当前的播放列表
    let playList = state.playList // 源播放列表
    let currentIndex = state.currentIndex // 当前播放歌曲的索引
    // 顺序播放
    if (mode == 1) {

    }
    // 单曲循环
    if (mode == 2) {

    }
    // 随机播放
    if (mode == 3) {

    }
  },
  // --------删除单首歌曲--------
  delOneSong({ commit, state }, song) {
    let sequenceList = state.sequenceList  // 当前的播放列表
    let playList = state.playList // 源播放列表
    let currentIndex = state.currentIndex // 当前播放歌曲的索引
    // 被删除歌曲的索引
    let sequenceIndex = findIndex(sequenceList, song)
    let playListIndex = findIndex(playList, song)


  },
  // --------全部清空--------
  delAllSong({ commit }){
    // 设置当前播放列表
    commit("setSequenceList", [])
  }
}

// 随机播放
function shuffle(arr) {
  arr.sort((a, b) =>{
    return Math.random() - 0.5
  })
  return arr
}

// 判断是否在该list列表下存在，不存在则返回-1
function findIndex(list, song) {
  return list.findIndex(item => item.id === song.id)
}
export default actions