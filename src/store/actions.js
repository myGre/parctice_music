const actions = {
  // --------添加一首歌到当前播放歌曲后面--------
  addOnePlay({ commit, state }, play) {
    let sequenceList = state.sequenceList.slice()  // 当前的播放列表
    let playList = state.playList.slice() // 源播放列表
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
      // 当sequenceList只有一条数据时
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
    // 设置当前播放列表
    commit("setPlayList", playList)
    // 设置当前播放歌曲的索引
    commit("setCurrentIndex", currentIndex)
    // 设置全屏播放
    commit("setFullScreen", true)
    // 播放状态
    commit("setPlaying", true)
  },
  // --------覆盖播放全部歌曲--------
  AddPlayList({ commit }, list) {
    commit("setSequenceList", list)
    // 源播放列表
    commit("setPlayList", list)
    // 当前歌曲下标
    commit("setCurrentIndex", 0)
    // 设置当前播放模式：1.顺序播放 2.单曲循环 3.随机播放
    commit("setPlaymode", 1)
    // 设置全屏播放
    commit("setFullScreen", true)
    // 播放状态
    commit("setPlaying", true)
  },
  // --------修改播放模式--------
  updateMode({ commit, state, getters }, mode) {
    // 当前播放对象
    let currentSong = getters.currentSong
    // 随机播放
    if (mode == 2) {
      commit("setSequenceList", shuffle(state.playList))
    } else{
      commit("setSequenceList", state.playList)
    }
    // 继续播放当前歌曲
    let index = findIndex(state.sequenceList, currentSong)
    commit("setCurrentIndex", index)
    commit("setPlaymode", mode)
  },
  // --------删除单首歌曲--------
  delOneSong({ commit, state }, song) {
    let sequenceList = state.sequenceList.slice()  // 当前的播放列表
    let playList = state.playList.slice() // 源播放列表
    let currentIndex = state.currentIndex // 当前播放歌曲的索引
    // 被删除歌曲的索引
    let sequenceIndex = findIndex(sequenceList, song)
    let playListIndex = findIndex(playList, song)

    // 找不到
    if (sequenceIndex < 0 || playListIndex < 0) return

    sequenceList.splice(sequenceIndex, 1)
    playList.splice(playListIndex, 1)

    // 在播放对象前面
    if (sequenceIndex < currentIndex) {
      currentIndex--
    }
    // 在最后一项
    if (sequenceIndex == sequenceList.length - 1) {
      currentIndex = 0
    }
    commit("setSequenceList", sequenceList)
    // 源播放列表
    commit("setPlayList", playList)
    // 当前歌曲下标
    commit("setCurrentIndex", currentIndex)
    // 设置全屏播放
    commit("setFullScreen", true)
    if (sequenceList.length) {
      // 播放状态
      commit("setPlaying", false)
    }

  },
  // --------全部清空--------
  delAllSong({ commit }) {
    commit("setSequenceList", [])
    // 源播放列表
    commit("setPlayList", [])
    // 当前歌曲下标
    commit("setCurrentIndex", 0)
    // 设置全屏播放
    commit("setFullScreen", true)
    // 播放状态
    commit("setPlaying", false)
  }
}
// 随机播放
function shuffle(arr) {
  arr = arr.slice()
  arr.sort((a, b) => {
    return Math.random() - 0.5
  })
  return arr
}
// 判断是否在该list列表下存在，不存在则返回-1
function findIndex(list, song) {
  return list.findIndex(item => item.id === song.id)
}
export default actions